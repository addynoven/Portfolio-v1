"use client";

import React from "react";
import { EXPERIENCE } from "@/lib/v4/constants";
import { SpotlightCard } from "../ui/spotlight-card";
import { FiBriefcase } from "react-icons/fi";

export function ExperienceSection() {
  return (
    <section className="flex flex-col gap-4 mb-16">
      <div className="flex items-center gap-2">
        <FiBriefcase className="w-4 h-4 text-[var(--text-muted)]" />
        <h2 className="text-xl font-medium tracking-tight text-[var(--on-surface)]">
          Experience & Roles
        </h2>
      </div>

      <div className="space-y-3">
        {EXPERIENCE.map((item, idx) => (
          <SpotlightCard key={idx} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[var(--on-surface)]">
                  {item.role} <span className="text-[var(--text-muted)] font-normal">at</span>{" "}
                  <span className="text-[var(--primary)]">{item.company}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <span>{item.period}</span>
                <span>•</span>
                <span>{item.location}</span>
              </div>
            </div>

            <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed mb-3">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-container)] text-[var(--text-muted)] border border-[var(--surface-border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
