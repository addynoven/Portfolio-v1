"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/v4/constants";
import { SpotlightCard } from "../ui/spotlight-card";
import { FiMail, FiCheck, FiCopy } from "react-icons/fi";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-col gap-4">
      <SpotlightCard className="p-6 sm:p-8 text-center flex flex-col items-center">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--status-active)] shadow-[0_0_10px_rgba(34,197,94,0.6)] mb-3" />
        <h2 className="font-serif text-2xl sm:text-3xl text-[var(--on-surface)] font-medium mb-2 tracking-tight">
          Let’s build something enduring
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mb-6 leading-relaxed">
          Open for select engineering roles, consulting on high-performance React architectures, or system design.
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href={`mailto:${PROFILE.email}`}
            className="px-5 py-2.5 rounded-full bg-[var(--primary)] text-[var(--on-primary)] text-xs font-medium hover:opacity-90 transition-all shadow-[0_0_16px_rgba(255,255,255,0.15)] active:scale-95 flex items-center gap-2"
          >
            <FiMail className="w-3.5 h-3.5" />
            <span>Send an Email</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-4 py-2.5 rounded-full bg-[var(--surface-container)] text-[var(--on-surface)] text-xs font-mono hover:bg-[var(--surface-container-high)] transition-all border border-[var(--surface-border)] active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <FiCheck className="w-3.5 h-3.5 text-[var(--status-active)]" />
                <span>Copied to clipboard</span>
              </>
            ) : (
              <>
                <FiCopy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{PROFILE.email}</span>
              </>
            )}
          </button>
        </div>
      </SpotlightCard>
    </section>
  );
}
