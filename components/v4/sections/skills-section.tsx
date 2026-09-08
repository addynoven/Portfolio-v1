"use client";

import React from "react";
import { SpotlightCard } from "../ui/spotlight-card";

const SKILL_CATEGORIES = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Go", "C/C++", "SQL", "HTML/CSS"],
  },
  {
    category: "Frontend & UI",
    skills: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion", "Radix UI", "WebRTC"],
  },
  {
    category: "Backend & Systems",
    skills: ["Node.js", "Express", "REST APIs", "Redis", "PostgreSQL", "Prisma", "MongoDB"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Docker", "Git", "Linux (Arch/Fedora)", "Postman", "CI/CD Actions"],
  },
];

export function SkillsSection() {
  return (
    <section className="flex flex-col gap-4 mb-16">
      <h2 className="text-xl font-medium tracking-tight text-[var(--on-surface)]">
        Technical Competencies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <SpotlightCard key={idx} className="p-4 flex flex-col justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
              {cat.category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface-container)] text-[var(--on-surface)] border border-[var(--surface-border-subtle)] hover:border-[var(--text-muted)]/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
