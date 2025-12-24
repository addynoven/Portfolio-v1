"use client";

import { useState } from "react";
import BentoCard from "./BentoCard";
import { FaCopy, FaCheck } from "react-icons/fa";

const ContactCard = () => {
  const [copied, setCopied] = useState(false);
  const email = "adityasahu0605@gmail.com";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-between">
      <div>
        <span className="text-lg md:text-xl text-slate-800 dark:text-white font-medium block mb-2">
          Have a project in mind?
        </span>
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white text-sm hover:bg-slate-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all w-fit"
      >
        {copied ? (
          <>
            <FaCheck className="w-3 h-3" />
            Copied!
          </>
        ) : (
          <>
            <FaCopy className="w-3 h-3" />
            Copy email
          </>
        )}
      </button>
    </BentoCard>
  );
};

export default ContactCard;
