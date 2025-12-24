"use client";

import BentoCard from "./BentoCard";
import { cn } from "@/lib/utils";

interface IntroCardProps {
  colSpan?: 1 | 2 | 3 | 4;
  className?: string;
}

const IntroCard = ({ colSpan = 2, className }: IntroCardProps) => {
  return (
    <BentoCard colSpan={colSpan} rowSpan={1} className={cn("flex flex-col justify-center relative", className)}>
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
        <span className="text-[8px] font-medium text-slate-600 dark:text-gray-300">Available for work</span>
      </div>
      <h1 className="text-xl md:text-2xl font-medium text-slate-800 dark:text-white mb-2">
        Hi, Aditya here —
      </h1>
      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
        {new Date().getFullYear() - 2002} year old software engineer from India 🇮🇳.<br/>{" "}
        <span className="text-slate-800 dark:text-white underline underline-offset-2 decoration-UserAccent">
          Backend by trade,
        </span>{" "}
        full-stack by passion.
      </p>
    </BentoCard>
  );
};

export default IntroCard;
