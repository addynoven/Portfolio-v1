"use client";

import React, { useMemo } from "react";
import { PROFILE } from "@/lib/v4/constants";

export function GitHubHeatmap() {
  // Generate deterministic pattern of contribution levels
  const weeks = useMemo(() => {
    const data: number[][] = [];
    let seed = 42;
    const lcg = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let w = 0; w < 44; w++) {
      const week: number[] = [];
      for (let d = 0; d < 7; d++) {
        const rand = lcg();
        if (rand < 0.25) week.push(0);
        else if (rand < 0.55) week.push(1);
        else if (rand < 0.8) week.push(2);
        else if (rand < 0.94) week.push(3);
        else week.push(4);
      }
      data.push(week);
    }
    return data;
  }, []);

  const colorMap = [
    "bg-[var(--surface-container-high)]/40",
    "bg-[#0e4429]",
    "bg-[#006d32]",
    "bg-[#26a641]",
    "bg-[#39d353]",
  ];

  return (
    <div
      data-section="GitHub"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm"
    >
      {/* Header */}
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          GitHub
        </h2>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2"
        >
          <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
            1,666 contributions
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-300 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-700">
            <span className="text-xs text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">↗</span>
          </div>
        </a>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[580px] flex flex-col gap-1.5">
          {/* Months label */}
          <div className="flex text-[10px] font-mono text-[var(--text-muted)] justify-between pl-6 pr-2">
            <span>Sep</span>
            <span>Nov</span>
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
          </div>

          <div className="flex items-start gap-1.5">
            {/* Days label */}
            <div className="flex flex-col justify-between h-[78px] text-[9px] font-mono text-[var(--text-muted)] pr-1 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Matrix */}
            <div className="flex gap-[3px] flex-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-2.5 h-2.5 rounded-[2px] transition-transform duration-200 hover:scale-125 ${colorMap[level]}`}
                      title={`Active day`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Strip */}
      <div className="flex items-center justify-around pt-4 mt-3 border-t border-[var(--surface-border-subtle)] bg-[var(--surface-container-lowest)]/40 rounded-lg">
        <a
          href={PROFILE.twitter}
          target="_blank"
          rel="noreferrer"
          className="py-1 px-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          X (Twitter)
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="py-1 px-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="py-1 px-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={PROFILE.peerlist}
          target="_blank"
          rel="noreferrer"
          className="py-1 px-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          Peerlist
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="py-1 px-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          Email
        </a>
      </div>
    </div>
  );
}
