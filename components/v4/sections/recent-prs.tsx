"use client";

import React from "react";
import Link from "next/link";
import { RECENT_PRS } from "@/lib/v4/constants";
import { FiArrowRight, FiArrowUpRight, FiGitPullRequest, FiGitMerge } from "react-icons/fi";
import { motion } from "framer-motion";

export function RecentPRs() {
  return (
    <div
      data-section="Open Source"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm"
    >
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          Recent Pull Requests
        </h2>
        <Link
          href="/v4/about#opensource"
          className="group flex items-center gap-2"
        >
          <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
            View all
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-300 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-700">
            <FiArrowRight className="w-3 h-3 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {RECENT_PRS.map((pr, idx) => (
          <motion.a
            key={pr.id}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group -mx-2 flex items-center justify-between rounded-2xl p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-[#0f0f0f] transition-transform group-hover:scale-105">
                {pr.status === "merged" ? (
                  <FiGitMerge className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                ) : (
                  <FiGitPullRequest className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                )}
              </div>
              <div className="flex min-w-0 flex-col">
                <h4 className="truncate pr-4 text-[15px] leading-tight font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                  {pr.title}
                </h4>
                <span className="mt-1 truncate text-[13px] text-neutral-500">
                  {pr.repo} • {pr.date}
                </span>
              </div>
            </div>
            <div className="pr-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5">
              <FiArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
