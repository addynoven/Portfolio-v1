"use client";

import React from "react";
import Image from "next/image";
import { PROFILE, EXPERIENCE, DIGITAL_GARDEN, GEAR, RECENT_PRS } from "@/lib/v4/constants";
import { FiCheck, FiGitMerge, FiArrowUpRight } from "react-icons/fi";

export function V4AboutPage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Bio / Profile Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 shadow-md shrink-0">
            <Image
              src={PROFILE.avatar}
              alt={PROFILE.name}
              fill
              sizes="64px"
              className="object-cover"
            />
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
                {PROFILE.name}
              </h1>
              <span className="w-4 h-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center text-[10px]">
                <FiCheck />
              </span>
            </div>
            <p className="text-sm font-mono text-neutral-500">{PROFILE.tagline}</p>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              ● {PROFILE.status}
            </span>
          </div>
        </div>

        <div className="space-y-3.5 text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            I am a Full Stack Developer moving toward becoming a Pragmatic Backend System Designer.
            My engineering philosophy centers on{" "}
            <strong className="text-neutral-900 dark:text-white font-medium">
              Feature-Driven Modular Monoliths with Integration-First Testing
            </strong>
            .
          </p>
          <p>
            Clarity over cleverness. If something fails, I want to diagnose it immediately within its self-contained feature boundary rather than traversing dozen layers of unnecessary abstraction.
          </p>
        </div>
      </div>

      {/* Experience / Career Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white mb-6">
          Experience
        </h2>

        <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60 w-full">
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-[15px] font-medium text-neutral-900 dark:text-white">
                  {item.role} <span className="text-neutral-400 font-normal">at</span>{" "}
                  <span className="text-neutral-900 dark:text-neutral-100">{item.company}</span>
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  {item.period}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono border border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Source Contributions Card */}
      <div
        id="opensource"
        className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm"
      >
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white mb-6">
          Open Source Contributions
        </h2>

        <div className="flex flex-col gap-2 w-full">
          {RECENT_PRS.map((pr) => (
            <a
              key={pr.id}
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-2 flex items-center justify-between rounded-2xl p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-[#0f0f0f]">
                  <FiGitMerge className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <h4 className="truncate pr-4 text-[14px] font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-primary transition-colors">
                    {pr.title}
                  </h4>
                  <span className="text-[12px] text-neutral-500">
                    {pr.repo} • {pr.date}
                  </span>
                </div>
              </div>
              <FiArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white shrink-0 mr-2" />
            </a>
          ))}
        </div>
      </div>

      {/* Architecture Philosophy Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white mb-6">
          Philosophy & Principles
        </h2>

        <div className="grid grid-cols-1 gap-4 w-full">
          {DIGITAL_GARDEN.map((garden, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-[#181818]/60 flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {garden.title}
                </h4>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  {garden.topic}
                </span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                {garden.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dev Setup & Gear Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white mb-4">
          Gear & Setup
        </h2>

        <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60 w-full text-xs font-mono">
          {GEAR.map((g, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
              <span className="text-neutral-400">{g.category}</span>
              <span className="text-neutral-800 dark:text-neutral-200">{g.item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default V4AboutPage;
