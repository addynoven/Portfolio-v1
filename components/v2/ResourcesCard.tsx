"use client";

import BentoCard from "./BentoCard";
import { FaArrowRight } from "react-icons/fa";

const ResourcesCard = () => {
  return (
    <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-between">
      <div>
        <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 mb-3 block">
          Resources
        </span>
        <p className="text-lg text-slate-800 dark:text-white font-medium leading-snug">
          Resources to speed your workflow
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <a 
          href="/v1/#work"
          className="w-10 h-10 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center hover:bg-slate-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all text-slate-600 dark:text-white"
        >
          <FaArrowRight className="w-4 h-4" />
        </a>
      </div>
    </BentoCard>
  );
};

export default ResourcesCard;
