"use client";

import BentoCard from "./BentoCard";
import { cn } from "@/lib/utils";

interface IntroCardProps {
  colSpan?: 1 | 2 | 3 | 4;
  className?: string;
}

const IntroCard = ({ colSpan = 2, className }: IntroCardProps) => {
  return (
    <BentoCard colSpan={colSpan} rowSpan={1} className={cn("flex flex-col justify-between p-5 relative", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-mono">
          Identity &amp; Role
        </span>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">Available for work</span>
        </div>
      </div>

      <div className="my-auto py-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hi, I&apos;m Aditya Sahu
        </h1>
        <p className="text-xs md:text-sm font-semibold text-UserAccent mt-1">
          Full-Stack Engineer &amp; Systems Designer
        </p>
        <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mt-2 max-w-lg">
          Bridging the gap between distributed backend logic and responsive frontend aesthetics. Building systems you can reason about under pressure.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-mono text-slate-600 dark:text-gray-300">
          ⚡ Modular Monoliths
        </span>
        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-mono text-slate-600 dark:text-gray-300">
          🛠️ Go &amp; TypeScript
        </span>
        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-mono text-slate-600 dark:text-gray-300">
          💾 Postgres &amp; Redis
        </span>
      </div>
    </BentoCard>
  );
};

export default IntroCard;
