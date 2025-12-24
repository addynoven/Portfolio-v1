"use client";

import BentoCard from "./BentoCard";
import { cn } from "@/lib/utils";

interface IntroCardProps {
  colSpan?: 1 | 2 | 3 | 4;
  className?: string;
}

const IntroCard = ({ colSpan = 2, className }: IntroCardProps) => {
  return (
    <BentoCard colSpan={colSpan} rowSpan={1} className={cn("flex flex-col justify-center", className)}>
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
