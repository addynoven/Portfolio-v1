import { NextResponse } from "next/server";
import { getCachedData } from "@/lib/redis";

const GITHUB_USERNAME = "addynoven";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Language colors based on GitHub's linguist
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Lua: "#000080",
  Dart: "#00B4AB",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Scala: "#c22d40",
  R: "#198CE7",
  Julia: "#a270ba",
  Zig: "#ec915c",
  Nix: "#7e7eff",
  Astro: "#ff5a03",
  MDX: "#083fa1",
};

function getLanguageColor(language: string): string {
  return languageColors[language] || "#8b949e";
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubGraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        totalRepositoryContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
      repositories: {
        totalCount: number;
        nodes: {
          name: string;
          stargazerCount: number;
          primaryLanguage: { name: string } | null;
        }[];
      };
      followers: {
        totalCount: number;
      };
    };
  };
}

// Fallback data when token is missing or API fails
const FALLBACK_DATA = {
  totalContributions: 699,
  totalCommits: 650,
  totalPRs: 30,
  totalIssues: 19,
  totalRepos: 30,
  totalStars: 15,
  followers: 50,
  currentStreak: 7,
  year: new Date().getFullYear(),
  topLanguages: ["TypeScript", "JavaScript", "Python"],
  languageBreakdown: [
    { name: "TypeScript", percentage: 45, color: "#3178c6" },
    { name: "JavaScript", percentage: 25, color: "#f1e05a" },
    { name: "Python", percentage: 15, color: "#3572A5" },
    { name: "CSS", percentage: 10, color: "#563d7c" },
    { name: "HTML", percentage: 5, color: "#e34c26" },
  ],
  isLoading: false,
  error: null as string | null,
};

async function fetchGitHubStats() {
  if (!GITHUB_TOKEN) {
    console.error("❌ GitHub API Error: GITHUB_TOKEN not configured");
    return { ...FALLBACK_DATA, error: "Token not configured - showing fallback data" };
  }

  try {
    const currentYear = new Date().getFullYear();
    const startOfYear = `${currentYear}-01-01T00:00:00Z`;
    const endOfYear = `${currentYear}-12-31T23:59:59Z`;

    // Use GitHub GraphQL API for accurate contribution data
    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalRepositoryContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
            totalCount
            nodes {
              name
              stargazerCount
              primaryLanguage {
                name
              }
            }
          }
          followers {
            totalCount
          }
        }
      }
    `;

    const graphqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: GITHUB_USERNAME,
          from: startOfYear,
          to: endOfYear,
        },
      }),
    });

    if (!graphqlRes.ok) {
      const errorText = await graphqlRes.text();
      console.error("❌ GitHub GraphQL Error:", graphqlRes.status, errorText);
      throw new Error(`GitHub GraphQL error: ${graphqlRes.status}`);
    }

    const data: GitHubGraphQLResponse = await graphqlRes.json();
    const user = data.data.user;
    const contributions = user.contributionsCollection;
    const repos = user.repositories;

    // Calculate top languages with percentages using REST API for bytes
    const languageBytes: Record<string, number> = {};

    // Fetch language stats for each repo (limit to top 30 repos to avoid rate limits)
    const reposToFetch = repos.nodes.slice(0, 30);

    await Promise.all(
      reposToFetch.map(async (repo) => {
        try {
          const langRes = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
            {
              headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          );

          if (langRes.ok) {
            const langs = await langRes.json();
            Object.entries(langs).forEach(([lang, bytes]) => {
              languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number);
            });
          }
        } catch {
          // Skip this repo if there's an error
        }
      })
    );

    // Calculate total bytes and percentages
    const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);

    const languageBreakdown = Object.entries(languageBytes)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8); // Top 8 languages

    const topLanguages = languageBreakdown.map((l) => l.name);

    // Calculate total stars
    const totalStars = repos.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0);

    // Calculate current streak
    const today = new Date();
    const allDays = contributions.contributionCalendar.weeks
      .flatMap((week) => week.contributionDays)
      .filter((day) => new Date(day.date) <= today) // Filter out future dates
      .reverse();

    // Check if today (element 0) has contributions
    const latestDay = allDays[0];
    const createdToday = latestDay?.contributionCount > 0;
    
    // If no contributions today, start checking from yesterday (index 1) which is effectively "previous active day" candidate
    // Actually, following the logic: if we didn't contribute today, we shouldn't punish the streak yet.
    // So we assume the streak is valid up to yesterday.
    const daysToCheck = createdToday ? allDays : allDays.slice(1);
    
    let currentStreak = 0;
    for (const day of daysToCheck) {
      if (day.contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    const result = {
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalCommits: contributions.totalCommitContributions,
      totalPRs: contributions.totalPullRequestContributions,
      totalIssues: contributions.totalIssueContributions,
      totalRepos: repos.totalCount,
      totalStars,
      followers: user.followers.totalCount,
      currentStreak,
      year: currentYear,
      topLanguages,
      languageBreakdown,
      isLoading: false,
      error: null,
    };

    console.log("✅ GitHub Stats Success:", {
      totalContributions: result.totalContributions,
      currentStreak: result.currentStreak,
    });

    return result;
  } catch (error) {
    console.error("❌ GitHub Stats Error:", error);
    return FALLBACK_DATA;
  }
}

// Set to false to disable caching for debugging
const CACHE_ENABLED = true;

export async function GET() {
  if (!CACHE_ENABLED) {
    const data = await fetchGitHubStats();
    return NextResponse.json(data);
  }

  const data = await getCachedData("github-stats-v1", fetchGitHubStats, 3600);
  return NextResponse.json(data);
}
