"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { PROFILE } from "@/lib/v4/constants";
import { FiArrowRight } from "react-icons/fi";

export function Footer() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as "HH:MM GMT+5:30" or "IST"
      const timeFormatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTimeString(`${timeFormatter.format(now)} GMT+5:30`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      data-section="Connect"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 mb-20 flex flex-col gap-6 p-6 sm:px-8 sm:py-6 w-full shadow-sm"
    >
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-0 w-full">
        {/* Left column */}
        <div className="flex flex-col gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <p>
            Designed &amp; Developed by{" "}
            <span className="font-medium text-neutral-900 dark:text-white">
              {PROFILE.name}
            </span>
          </p>
          <p className="text-xs">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-1.5 text-left text-sm text-neutral-500 sm:text-right dark:text-neutral-400">
          <div className="flex items-center gap-2 sm:justify-end">
            <span>Visitors</span>
            <Link href="/v4/stats" className="group flex items-center gap-1.5">
              <span className="font-medium text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                #13477
              </span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-300 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-700">
                <FiArrowRight className="w-3 h-3 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
              </div>
            </Link>
          </div>
          <p className="font-mono text-xs text-neutral-400">
            Jaipur, India {timeString || "20:06 GMT+5:30"}
          </p>
        </div>
      </div>

      {/* Version Switcher Row */}
      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
          <a href={PROFILE.twitter} target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Twitter</a>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-neutral-900 dark:hover:text-white transition-colors">Email</a>
        </div>
        <VersionSwitcher />
      </div>
    </footer>
  );
}
