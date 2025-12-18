"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import DiscordStatus from "@/components/DiscordStatus";

// Dynamic import for GitHubCalendar to avoid SSR issues
const GitHubContributions = dynamic(
  () => import("@/components/GitHubContributions"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-32 flex items-center justify-center text-slate-600 dark:text-white/40">
        Loading contributions...
      </div>
    )
  }
);

// Bento Card wrapper component - renders instantly
const BentoCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 1, y: 0 }}
    animate={{ opacity: 1, y: 0 }}
    className={`
      relative overflow-hidden rounded-2xl
      bg-slate-100/80 dark:bg-white/5
      backdrop-blur-xl
      border border-slate-200 dark:border-white/10
      p-5
      ${className}
    `}
  >
    {children}
  </motion.div>
);

// Local Time Widget
const LocalTime = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
      setDate(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "short",
          timeZone: "Asia/Kolkata",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1">
        Local Time (IST)
      </span>
      <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{time}</span>
      <span className="text-sm text-slate-600 dark:text-white/60">{date}</span>
    </div>
  );
};

// Coding Stats Widget (LIVE from WakaTime API + GitHub API)
interface GithubStatsData {
  totalContributions: number;
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  currentStreak: number;
  year: number;
  languageBreakdown?: LanguageData[];
  isLoading: boolean;
}

interface CodingStatsProps {
  githubStats: GithubStatsData;
}

const CodingStats = ({ githubStats }: CodingStatsProps) => {
  const [wakatimeStats, setWakatimeStats] = useState({
    totalHuman: "20+ hrs",
    topLanguage: "TypeScript",
    isLoading: true,
  });

  useEffect(() => {
    const fetchWakatime = async () => {
      try {
        const res = await fetch("/api/wakatime");
        const data = await res.json();
        setWakatimeStats({
          totalHuman: data.totalHuman || "20+ hrs",
          topLanguage: data.topLanguage || "TypeScript",
          isLoading: false,
        });
      } catch {
        setWakatimeStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchWakatime();
  }, []);

  const displayStats = [
    { 
      label: "This Week", 
      value: wakatimeStats.isLoading ? "..." : wakatimeStats.totalHuman, 
      icon: "⌨️" 
    },
    { 
      label: "Top Language", 
      value: wakatimeStats.topLanguage, 
      icon: "💙" 
    },
    { 
      label: `${githubStats.year} Contributions`, 
      value: githubStats.isLoading ? "..." : `${githubStats.totalContributions}+`, 
      icon: "🔥" 
    },
    { 
      label: "Projects Built", 
      value: githubStats.isLoading ? "..." : `${githubStats.totalRepos}`, 
      icon: "🏗️" 
    },
    { 
      label: "Repositories", 
      value: githubStats.isLoading ? "..." : `${githubStats.totalRepos}`, 
      icon: "📁" 
    },
    { 
      label: "Total Stars", 
      value: githubStats.isLoading ? "..." : `${githubStats.totalStars}`, 
      icon: "⭐" 
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {displayStats.map((stat, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-lg">{stat.icon}</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</span>
          <span className="text-xs text-slate-500 dark:text-white/50">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

// Languages Breakdown Widget (receives data from parent)
interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

interface LanguagesBreakdownProps {
  languages: LanguageData[];
  isLoading: boolean;
}

const LanguagesBreakdown = ({ languages, isLoading }: LanguagesBreakdownProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-24 text-slate-500 dark:text-white/40">
        Loading languages...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Stacked Bar */}
      <div className="h-4 rounded-full overflow-hidden flex bg-slate-200 dark:bg-white/10">
        {languages.map((lang, i) => (
          <div
            key={i}
            className="h-full transition-all duration-500"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {languages.slice(0, 8).map((lang, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-xs text-slate-600 dark:text-white/60 truncate">
              {lang.name}
            </span>
            <span className="text-xs font-medium text-slate-900 dark:text-white ml-auto">
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
const OnekoToggle = () => {
  const [catEnabled, setCatEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("oneko-enabled");
    if (stored !== null) {
      setCatEnabled(stored === "true");
    }
  }, []);

  const toggleCat = () => {
    const newValue = !catEnabled;
    setCatEnabled(newValue);
    localStorage.setItem("oneko-enabled", String(newValue));
    // Dispatch custom event to notify Oneko component
    window.dispatchEvent(new CustomEvent("oneko-toggle", { detail: newValue }));
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider">
        Companion
      </span>
      <button
        onClick={toggleCat}
        className={`
          flex items-center gap-3 p-3 rounded-xl transition-all duration-150
          ${catEnabled 
            ? "bg-UserAccent/20 border border-UserAccent/30" 
            : "bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
          }
        `}
      >
        <span className="text-2xl">🐱</span>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-slate-900 dark:text-white">Oneko Cat</span>
          <span className="text-xs text-slate-500 dark:text-white/50">
            {catEnabled ? "Following cursor" : "Click to enable"}
          </span>
        </div>
        {/* Snappy toggle switch with CSS transitions instead of spring */}
        <div
          className={`
            ml-auto w-10 h-6 rounded-full relative transition-colors duration-150
            ${catEnabled ? "bg-UserAccent" : "bg-slate-300 dark:bg-white/20"}
          `}
        >
          <div
            className={`
              absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-150
              ${catEnabled ? "left-5" : "left-1"}
            `}
          />
        </div>
      </button>
    </div>
  );
};

// Dev Identity Card
const DevIdentity = () => {
  const identity = [
    { label: "OS", value: "Arch Linux 🐧" },
    { label: "Editor", value: "Neovim + VSCode" },
    { label: "Shell", value: "Fish 🐟" },
    { label: "Theme", value: "Tokyo Night" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1">
        Dev Setup
      </span>
      {identity.map((item, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-white/50">{item.label}</span>
          <span className="text-slate-900 dark:text-white font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

const ActivityDashboard = memo(function ActivityDashboard() {
  const [githubStats, setGithubStats] = useState<GithubStatsData>({
    totalContributions: 0,
    totalCommits: 0,
    totalRepos: 0,
    totalStars: 0,
    currentStreak: 0,
    year: new Date().getFullYear(),
    languageBreakdown: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await fetch("/api/github-stats");
        const data = await res.json();
        console.log("GitHub Stats received:", data);
        setGithubStats({
          totalContributions: data.totalContributions || 0,
          totalCommits: data.totalCommits || 0,
          totalRepos: data.totalRepos || 0,
          totalStars: data.totalStars || 0,
          currentStreak: data.currentStreak || 0,
          year: data.year || new Date().getFullYear(),
          languageBreakdown: data.languageBreakdown || [],
          isLoading: false,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setGithubStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchGithub();
  }, []);

  return (
    <section className="py-20 xl:py-32 relative z-20">
      <div className="container mx-auto px-4">
        {/* Section Title - renders instantly */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Live <span className="text-UserAccent">Activity</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 max-w-2xl mx-auto">
            Real-time stats and status — because static portfolios are boring
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {/* Discord Status - Large */}
          <BentoCard className="md:col-span-2 lg:col-span-2" delay={0.1}>
            <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider mb-3 block">
              Discord Presence
            </span>
            <DiscordStatus />
          </BentoCard>

          {/* Local Time */}
          <BentoCard delay={0.2}>
            <LocalTime />
          </BentoCard>

          {/* Oneko Toggle */}
          <BentoCard delay={0.3}>
            <OnekoToggle />
          </BentoCard>

          {/* GitHub Calendar - Full Width */}
          <BentoCard className="md:col-span-2 lg:col-span-4 p-4" delay={0.4}>
            <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider mb-2 block">
              GitHub Contributions
            </span>
            <GitHubContributions username="addynoven" />
          </BentoCard>

          {/* Coding Stats */}
          <BentoCard className="md:col-span-1 lg:col-span-2" delay={0.5}>
            <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider mb-3 block">
              Coding Stats
            </span>
            <CodingStats githubStats={githubStats} />
          </BentoCard>

          {/* Dev Identity */}
          <BentoCard className="md:col-span-1 lg:col-span-2" delay={0.6}>
            <DevIdentity />
          </BentoCard>

          {/* Languages Breakdown - Full Width */}
          <BentoCard className="md:col-span-2 lg:col-span-4" delay={0.7}>
            <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider mb-3 block">
              Languages Breakdown
            </span>
            <LanguagesBreakdown languages={githubStats.languageBreakdown || []} isLoading={githubStats.isLoading} />
          </BentoCard>
        </div>
      </div>
    </section>
  );
});

export default ActivityDashboard;
