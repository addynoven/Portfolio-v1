"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiTrendingUp, FiTrendingDown, FiArrowRight } from "react-icons/fi";

interface StatItem {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
}

const STATS_CARDS: StatItem[] = [
  {
    label: "TOTAL VISITORS",
    value: "13,477",
  },
  {
    label: "TODAY",
    value: "26",
    change: "36.8%",
    trend: "up",
  },
  {
    label: "LAST 7 DAYS",
    value: "240",
    change: "10.8%",
    trend: "down",
  },
  {
    label: "LAST 30 DAYS",
    value: "3,339",
    change: "18.0%",
    trend: "down",
  },
];

const BLOG_VIEWS = [
  {
    title: "Why and How I Created GreatUI",
    views: "115 views",
    slug: "why-and-how-i-created-greatui",
  },
  {
    title: "Setting up a Telegram Bot That Commits Your Daily Logs to GitHub",
    views: "151 views",
    slug: "setting-up-telegram-bot-daily-logs",
  },
  {
    title: "Building an Interactive 3D Phone with TailwindCSS & Motion.dev",
    views: "380 views",
    slug: "building-interactive-3d-phone",
  },
  {
    title: "Managing Multiple GitHub Accounts on One Machine",
    views: "259 views",
    slug: "managing-multiple-github-accounts",
  },
  {
    title: "Thoughts on Design & Engineering",
    views: "420 views",
    slug: "thoughts-on-design-and-engineering",
  },
  {
    title: "PostgreSQL vs MongoDB: Two Years in Production",
    views: "512 views",
    slug: "postgres-vs-mongo-two-years-in-production",
  },
];

export default function V4StatsPage() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // SVG Chart points for 30 days
  // Smooth curve simulation peaking at ~900 and ~600
  const currentDays = [
    12, 18, 25, 20, 30, 45, 60, 40, 35, 55,
    80, 110, 95, 140, 120, 210, 180, 920, 600, 80,
    650, 420, 110, 85, 70, 90, 65, 80, 110, 140
  ];
  
  const previousDays = [
    8, 14, 20, 15, 22, 35, 45, 30, 25, 40,
    60, 85, 70, 100, 90, 130, 110, 310, 240, 60,
    380, 260, 90, 60, 50, 65, 45, 60, 80, 95
  ];

  const svgWidth = 560;
  const svgHeight = 180;
  const maxVal = 1200;

  const currentPath = currentDays
    .map((val, idx) => {
      const x = (idx / (currentDays.length - 1)) * svgWidth;
      const y = svgHeight - (val / maxVal) * svgHeight;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const previousPath = previousDays
    .map((val, idx) => {
      const x = (idx / (previousDays.length - 1)) * svgWidth;
      const y = svgHeight - (val / maxVal) * svgHeight;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Overview Card */}
      <div
        data-section="Overview"
        className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm"
      >
        <h1 className="mb-2 font-serif text-4xl leading-tight tracking-tight text-neutral-900 sm:text-5xl dark:text-white font-normal">
          Stats
        </h1>
        <p className="mb-6 max-w-xl text-[14.5px] text-neutral-500">
          A real-time overview of the traffic on this portfolio. Powered by PostHog
        </p>

        {/* 2x2 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {STATS_CARDS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-[#0f0f0f]"
            >
              <span className="text-[11px] font-mono font-medium tracking-wider text-neutral-500 uppercase">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white font-sans">
                  {stat.value}
                </span>
                {stat.change && (
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-mono font-medium ${
                      stat.trend === "up"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <FiTrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <FiTrendingDown className="w-3.5 h-3.5" />
                    )}
                    <span>{stat.change}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Comparison Card */}
      <div
        data-section="Traffic Comparison"
        className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm"
      >
        <h2 className="mb-6 font-serif text-2xl tracking-wide text-neutral-900 dark:text-white font-normal">
          Daily Traffic (Last 30 Days vs Previous 30 Days)
        </h2>

        {/* Chart Area */}
        <div className="flex w-full items-stretch pt-2">
          {/* Y Axis */}
          <div className="flex flex-col justify-between pr-3 text-[11px] font-mono text-neutral-400 select-none pb-4">
            <span>1200</span>
            <span>600</span>
            <span>0</span>
          </div>

          {/* SVG Canvas */}
          <div className="relative flex-1 w-full overflow-hidden pb-4">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-neutral-300 dark:border-neutral-800 w-full" />
              <div className="border-b border-dashed border-neutral-300 dark:border-neutral-800 w-full" />
              <div className="border-b border-neutral-300 dark:border-neutral-800 w-full" />
            </div>

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-48 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Previous 30 days (dashed curve) */}
              <path
                d={previousPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="text-neutral-400 dark:text-neutral-600"
              />

              {/* Current 30 days (solid white/black curve) */}
              <path
                d={currentPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-neutral-900 dark:text-neutral-100"
              />

              {/* Peak marker dots */}
              {currentDays.map((val, idx) => {
                if (val > 500) {
                  const x = (idx / (currentDays.length - 1)) * svgWidth;
                  const y = svgHeight - (val / maxVal) * svgHeight;
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="4"
                      className="fill-neutral-900 dark:fill-white stroke-white dark:stroke-black stroke-2"
                    />
                  );
                }
                return null;
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-5 text-xs font-mono text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 w-full">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-neutral-900 dark:bg-white" />
            <span>Last 30 Days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-b border-dashed border-neutral-400 dark:border-neutral-500" />
            <span>Previous 30 Days</span>
          </div>
        </div>
      </div>

      {/* Blog Views Card */}
      <div
        data-section="Blog Views"
        className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm"
      >
        <h2 className="mb-4 font-serif text-2xl tracking-wide text-neutral-900 dark:text-white font-normal">
          Blog Views
        </h2>

        <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60 w-full">
          {BLOG_VIEWS.map((blog) => (
            <Link
              key={blog.title}
              href="/v4/blogs"
              className="group py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 -mx-2 px-2 rounded-xl transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
            >
              <span className="text-[14.5px] font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-primary transition-colors truncate">
                {blog.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-neutral-400">
                {blog.views}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
