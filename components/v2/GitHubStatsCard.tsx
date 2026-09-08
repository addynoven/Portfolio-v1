"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaGithub, FaFire, FaExternalLinkAlt } from "react-icons/fa";

interface LanguageBreakdown {
  name: string;
  percentage: number;
  color: string;
}

interface GitHubStats {
  totalContributions: number;
  totalRepos: number;
  currentStreak: number;
  year: number;
  languageBreakdown: LanguageBreakdown[];
  isLoading: boolean;
  error: string | null;
}

// Generate static visual heatmap pattern for aesthetic density
const HEATMAP_COLS = 16;
const HEATMAP_ROWS = 4;
const HEATMAP_LEVELS = [
  "bg-emerald-500/10 dark:bg-emerald-500/10",
  "bg-emerald-500/30 dark:bg-emerald-500/30",
  "bg-emerald-500/60 dark:bg-emerald-500/60",
  "bg-emerald-400 dark:bg-emerald-400",
];

const getHeatmapCell = (col: number, row: number) => {
  const seed = (col * 7 + row * 13) % 17;
  if (seed < 5) return HEATMAP_LEVELS[0];
  if (seed < 10) return HEATMAP_LEVELS[1];
  if (seed < 14) return HEATMAP_LEVELS[2];
  return HEATMAP_LEVELS[3];
};

const GitHubStatsCard = () => {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 699,
    totalRepos: 30,
    currentStreak: 7,
    year: new Date().getFullYear(),
    languageBreakdown: [
      { name: "TypeScript", percentage: 45, color: "#3178c6" },
      { name: "JavaScript", percentage: 25, color: "#f1e05a" },
      { name: "Python", percentage: 18, color: "#3572A5" },
      { name: "Go", percentage: 12, color: "#00ADD8" },
    ],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/github-stats");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStats({
          totalContributions: data.totalContributions || 699,
          totalRepos: data.totalRepos || 30,
          currentStreak: data.currentStreak || 7,
          year: data.year || new Date().getFullYear(),
          languageBreakdown: data.languageBreakdown?.length
            ? data.languageBreakdown.slice(0, 4)
            : [
                { name: "TypeScript", percentage: 45, color: "#3178c6" },
                { name: "JavaScript", percentage: 25, color: "#f1e05a" },
                { name: "Python", percentage: 18, color: "#3572A5" },
                { name: "Go", percentage: 12, color: "#00ADD8" },
              ],
          isLoading: false,
          error: null,
        });
      } catch {
        setStats((prev) => ({ ...prev, isLoading: false }));
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="h-full flex flex-col justify-between p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FaGithub className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
          <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-white">@addynoven</span>
        </div>
        <a
          href="https://github.com/addynoven"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-UserAccent transition-colors"
          title="Open GitHub profile"
        >
          <FaExternalLinkAlt className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Main Metrics */}
      <div className="flex items-baseline justify-between my-auto py-1">
        <div>
          <div className="flex items-baseline gap-1">
            <CountUp
              end={stats.totalContributions}
              duration={1.8}
              className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight"
            />
            <span className="text-UserAccent text-xs font-bold">+</span>
          </div>
          <p className="text-[9px] text-slate-500 dark:text-gray-400">commits in {stats.year}</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-xs font-bold text-orange-500 font-mono">
            <FaFire className="w-3 h-3 text-orange-400" />
            <span>{stats.currentStreak} days</span>
          </div>
          <span className="text-[9px] text-slate-500 dark:text-gray-400">{stats.totalRepos} repositories</span>
        </div>
      </div>

      {/* Mini Heatmap Visualization */}
      <div className="py-1">
        <div className="flex gap-[3px] justify-between">
          {Array.from({ length: HEATMAP_COLS }).map((_, col) => (
            <div key={col} className="flex flex-col gap-[3px]">
              {Array.from({ length: HEATMAP_ROWS }).map((_, row) => (
                <div
                  key={row}
                  className={`w-2 h-2 rounded-[2px] ${getHeatmapCell(col, row)} transition-colors duration-300`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Language Breakdown Bar */}
      <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-white/5">
        <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-white/10">
          {stats.languageBreakdown.map((lang) => (
            <div
              key={lang.name}
              style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
              className="h-full"
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[8px] text-slate-500 dark:text-gray-400 font-mono">
          {stats.languageBreakdown.slice(0, 3).map((lang) => (
            <span key={lang.name} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsCard;
