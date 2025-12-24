"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaGithub, FaFire } from "react-icons/fa";

interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  year: number;
  isLoading: boolean;
  error: string | null;
}

const GitHubStatsCard = () => {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    currentStreak: 0,
    year: new Date().getFullYear(),
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
          totalContributions: data.totalContributions || 0,
          currentStreak: data.currentStreak || 0,
          year: data.year || new Date().getFullYear(),
          isLoading: false,
          error: null,
        });
      } catch {
        setStats((prev) => ({ ...prev, isLoading: false, error: "Failed to load" }));
      }
    };
    fetchStats();
  }, []);

  if (stats.isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-UserAccent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between p-2">
      <div className="flex items-center gap-2">
        <FaGithub className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[8px] uppercase tracking-widest text-gray-500">GitHub</span>
      </div>

      <div className="space-y-1">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CountUp
              end={stats.totalContributions}
              duration={2}
              className="text-xl font-bold text-white"
              enableScrollSpy
              scrollSpyOnce
            />
          </motion.div>
          <p className="text-[8px] text-gray-500">contributions in {stats.year}</p>
        </div>

        <div className="flex items-center gap-1.5 text-[9px]">
          <FaFire className="w-2.5 h-2.5 text-orange-400" />
          <span className="text-gray-400">
            <span className="text-white font-medium">{stats.currentStreak}</span> day streak
          </span>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsCard;
