"use client";

import { useState } from "react";
import BentoCard from "./BentoCard";
import { FaCopy, FaCheck, FaEnvelope } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  className?: string;
}

const ContactCard = ({ className }: ContactCardProps) => {
  const [copied, setCopied] = useState(false);
  const email = "dmcbaditya@gmail.com";

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <BentoCard
      colSpan={1}
      rowSpan={1}
      className={cn("flex flex-col justify-between p-3 h-full min-h-0 overflow-hidden", className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500">
          Get in touch
        </span>
        <a
          href={`mailto:${email}`}
          className="text-slate-400 hover:text-UserAccent transition-colors"
          title="Send email"
          onClick={(e) => e.stopPropagation()}
        >
          <FaEnvelope className="w-3 h-3" />
        </a>
      </div>

      <div className="my-auto py-1 space-y-1">
        <div className="flex items-center gap-1.5 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active &amp; taking inquiries</span>
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
          Let&apos;s collaborate.
        </p>
        <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-snug">
          Open for full-time backend / systems engineering roles &amp; freelance.
        </p>
      </div>

      <div className="pt-1">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-200 text-[10px] font-mono hover:border-UserAccent/50 hover:bg-UserAccent/10 hover:text-UserAccent transition-all active:scale-95"
        >
          <span className="truncate">dmcbaditya@gmail.com</span>
          {copied ? (
            <span className="flex items-center gap-1 text-emerald-500 flex-shrink-0 ml-1 font-sans text-[9px] font-bold">
              <FaCheck className="w-2.5 h-2.5" />
              Copied!
            </span>
          ) : (
            <FaCopy className="w-2.5 h-2.5 text-slate-400 flex-shrink-0 ml-1" />
          )}
        </button>
      </div>
    </BentoCard>
  );
};

export default ContactCard;
