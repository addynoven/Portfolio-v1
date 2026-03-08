// app/api/github/commits/route.ts

import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
    if (!process.env.GITHUB_TOKEN) {
        return NextResponse.json([], { headers: { "Cache-Control": "no-store" } });
    }

    const query = `
    query {
      user: user(login: "addynoven") {
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
        next: { revalidate: 3600 },
    });

    const json = await res.json();

    if (!json.data || !json.data.user) {
        return NextResponse.json([], { headers: { "Cache-Control": "no-store" } });
    }

    const days = json.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week: any) => week.contributionDays
    );

    const formatted = days.map((day: any) => ({
        count: day.contributionCount,
        date: day.date,
    }));

    return NextResponse.json(formatted, {
        headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
