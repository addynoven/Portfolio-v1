import { NextResponse } from "next/server";

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

interface WakaTimeStats {
  totalSeconds: number;
  totalHuman: string;
  dailyAverage: string;
  topLanguage: string;
  topLanguagePercent: number;
  isLoading: boolean;
  error: string | null;
}

export async function GET() {
  if (!WAKATIME_API_KEY) {
    return NextResponse.json(
      { error: "WakaTime API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch last 7 days stats using 'current' user (API key determines the user)
    const statsRes = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/last_7_days`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!statsRes.ok) {
      const errorText = await statsRes.text();
      console.error("WakaTime API response:", statsRes.status, errorText);
      throw new Error(`WakaTime API error: ${statsRes.status}`);
    }

    const data = await statsRes.json();
    const stats = data.data;

    const result: WakaTimeStats = {
      totalSeconds: stats.total_seconds || 0,
      totalHuman: stats.human_readable_total || "0 hrs",
      dailyAverage: stats.human_readable_daily_average || "0 hrs",
      topLanguage: stats.languages?.[0]?.name || "TypeScript",
      topLanguagePercent: stats.languages?.[0]?.percent || 0,
      isLoading: false,
      error: null,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("WakaTime API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch WakaTime stats",
        // Fallback data
        totalHuman: "20+ hrs",
        dailyAverage: "3+ hrs",
        topLanguage: "TypeScript",
        topLanguagePercent: 82,
        isLoading: false,
      },
      { status: 200 } // Return 200 with fallback data
    );
  }
}
