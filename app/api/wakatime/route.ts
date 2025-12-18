import { NextResponse } from "next/server";
import { getCachedData } from "@/lib/redis";

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

// Fallback data when API key is missing or API fails
const FALLBACK_DATA: WakaTimeStats = {
  totalSeconds: 0,
  totalHuman: "20+ hrs",
  dailyAverage: "3+ hrs",
  topLanguage: "TypeScript",
  topLanguagePercent: 82,
  isLoading: false,
  error: null,
};

async function fetchWakaTimeStats(): Promise<WakaTimeStats> {
  if (!WAKATIME_API_KEY) {
    console.error("❌ WakaTime API Error: API key not configured in environment variables");
    return { ...FALLBACK_DATA, error: "WakaTime API key not configured" };
  }

  try {
    // Fetch last 7 days stats using 'current' user (API key determines the user)
    const statsRes = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/last_7_days`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
        },
      }
    );

    if (!statsRes.ok) {
      const errorText = await statsRes.text();
      console.error("❌ WakaTime API Error:", statsRes.status, errorText);
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

    console.log("✅ WakaTime API Success:", {
      totalHuman: result.totalHuman,
      dailyAverage: result.dailyAverage,
      topLanguage: result.topLanguage,
    });

    return result;
  } catch (error) {
    console.error("❌ WakaTime API Error:", error);
    return FALLBACK_DATA;
  }
}

export async function GET() {
  const data = await getCachedData("wakatime-stats", fetchWakaTimeStats, 3600);
  return NextResponse.json(data);
}
