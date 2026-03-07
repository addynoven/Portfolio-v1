// app/api/github/commits/route.ts

import { NextResponse } from "next/server";

// Cache the API route response for 1 hour at the Next.js server level.
// Combined with the 5-min browser localStorage cache, GitHub is hit very rarely.
export const revalidate = 3600;

export async function GET() {
    const query = `
    query {
      user(login: "addynoven") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        // Cache the upstream GitHub response for 1 hour
        next: { revalidate: 3600 },
    });

    const json = await res.json();

    if (!json.data || !json.data.user) {
        console.error("GitHub API Error or Missing Token:", json.errors || "No data returned");
        return NextResponse.json([], {
            headers: {
                "Cache-Control": "no-store",
            },
        });
    }

    const days =
        json.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
            (week: { contributionDays: { contributionCount: number; date: string }[] }) =>
                week.contributionDays
        );

    const formatted = days.map((day: { contributionCount: number; date: string }) => ({
        count: day.contributionCount,
        date: day.date,
    }));

    return NextResponse.json(formatted, {
        headers: {
            // Also tell CDN/browsers to cache for 1h, stale-while-revalidate for 24h
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}


