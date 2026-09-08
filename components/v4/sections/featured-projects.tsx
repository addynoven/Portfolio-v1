"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "@/lib/v4/constants";
import { ProjectModal } from "../ui/project-modal";
import { FiArrowRight, FiArrowUpRight, FiCheck, FiCopy, FiTerminal } from "react-icons/fi";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);

  const heroProject = PROJECTS.find((p) => p.id === "great-ui") || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => p.id !== heroProject.id).slice(0, 2);

  const commands: Record<PackageManager, string> = {
    pnpm: "pnpm dlx great-ui@latest add",
    npm: "npx great-ui@latest add",
    yarn: "yarn dlx great-ui@latest add",
    bun: "bunx great-ui@latest add",
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(commands[pm]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-section="Projects"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm"
    >
      {/* Header */}
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          Projects
        </h2>
        <Link
          href="/v4/projects"
          className="group flex items-center gap-2"
        >
          <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
            View all
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-300 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-700">
            <FiArrowRight className="w-3 h-3 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
          </div>
        </Link>
      </div>

      <div className="flex w-full flex-col gap-6">
        {/* Featured Hero Project: Great UI */}
        <div
          onClick={() => setSelectedProject(heroProject)}
          className="group flex w-full cursor-pointer flex-col gap-3 text-left focus:outline-none"
        >
          {/* Card Preview surface */}
          <div className="flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 p-5 transition-colors group-hover:border-neutral-300 sm:p-6 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-800">
            {/* Top row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="font-mono text-xs font-semibold tracking-wider text-neutral-700 dark:text-neutral-300">
                  GREAT-UI
                </span>
              </div>
              <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                v1.2.0 • MIT
              </span>
            </div>

            {/* Center interactive banner */}
            <div className="flex flex-col items-center justify-center text-center my-auto py-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 dark:text-white font-normal mb-1">
                Open-source React UI Component Library
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
                Tailwind CSS primitives crafted for micro-animations and developer experience.
              </p>

              {/* Package Manager Tabbed CLI box */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-4 w-full max-w-sm rounded-xl border border-neutral-200/80 bg-white/80 p-2 text-left shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-black/60"
              >
                <div className="flex items-center justify-between border-b border-neutral-200/60 pb-1.5 dark:border-neutral-800">
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pkg) => (
                      <button
                        key={pkg}
                        type="button"
                        onClick={() => setPm(pkg)}
                        className={`rounded px-1.5 py-0.5 transition-colors cursor-pointer ${
                          pm === pkg
                            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black font-semibold"
                            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white cursor-pointer"
                  >
                    {copied ? (
                      <FiCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                    ) : (
                      <FiCopy className="w-3 h-3 shrink-0" />
                    )}
                    <span className="font-mono text-[10px] inline-block w-[38px] text-left">{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="pt-2 font-mono text-[11px] text-neutral-800 dark:text-neutral-200 truncate flex items-center gap-1.5 h-7">
                  <span className="text-neutral-400 select-none">$</span>
                  <span className="truncate">{commands[pm]}</span>
                </div>
              </div>
            </div>

            {/* Bottom tags */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 font-mono text-[10px] text-neutral-500">
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 dark:border-neutral-800 dark:bg-neutral-900">
                Swipe Theme
              </span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 dark:border-neutral-800 dark:bg-neutral-900">
                Word Focus
              </span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 dark:border-neutral-800 dark:bg-neutral-900">
                Floating Dock
              </span>
            </div>
          </div>

          {/* Project Details Below Image */}
          <div className="flex w-full items-center justify-between gap-3 px-1">
            <div className="flex flex-col">
              <h3 className="text-[15px] font-medium text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                {heroProject.title}
              </h3>
              <p className="mt-0.5 text-[14px] text-neutral-500">
                {heroProject.subtitle}
              </p>
            </div>
            {heroProject.liveUrl && (
              <a
                href={heroProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/link inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 transition-all hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                aria-label={`Visit ${heroProject.title}`}
              >
                <FiArrowUpRight className="w-4 h-4 text-neutral-500 group-hover/link:text-neutral-900 dark:text-neutral-400 dark:group-hover/link:text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col gap-2.5 cursor-pointer text-left"
            >
              <div className="flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 p-4 transition-colors group-hover:border-neutral-300 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-800">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                    {project.title}
                  </span>
                  <span>{project.category}</span>
                </div>
                <div className="my-auto py-2">
                  <p className="font-serif text-lg text-neutral-800 dark:text-neutral-200 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-[12px] text-neutral-500 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>
                <FiArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
