"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/lib/v4/constants";
import { ProjectModal } from "@/components/v4/ui/project-modal";
import { FiGrid, FiList, FiArrowUpRight, FiSearch } from "react-icons/fi";

const CATEGORIES = ["All", "Full Stack", "UI/UX", "CLI & Tools", "Open Source"];

export default function V4ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header & Controls Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
              Projects
            </h1>
            <p className="mt-1 text-sm text-neutral-500 max-w-md">
              A curated catalog of open-source tools, component libraries, and full-stack systems.
            </p>
          </div>

          {/* View Switcher: Grid vs List */}
          <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-[#181818]">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              }`}
              aria-label="Grid view"
            >
              <FiGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              }`}
              aria-label="List view"
            >
              <FiList className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-48">
            <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 rounded-lg border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:border-neutral-800 dark:bg-[#181818] dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === "grid" ? (
        <div className="flex flex-col gap-4 w-full">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-5 sm:p-6 flex flex-col gap-4 cursor-pointer group shadow-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-800"
            >
              {/* Aspect ratio preview block */}
              <div className="flex aspect-[16/9] w-full flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800/60 dark:bg-[#0f0f0f]">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                    {project.title}
                  </span>
                  <span className="rounded bg-neutral-200 px-1.5 py-0.5 dark:bg-neutral-800">
                    {project.category}
                  </span>
                </div>
                <div className="my-auto py-2 text-center">
                  <h3 className="font-serif text-2xl text-neutral-900 dark:text-white">
                    {project.subtitle}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <h4 className="text-[16px] font-medium text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="shrink-0 pl-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-[#181818] group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors">
                    <FiArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-4 sm:p-6 flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60 shadow-sm">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="py-3.5 flex items-center justify-between gap-4 cursor-pointer group hover:bg-neutral-50 dark:hover:bg-neutral-900/30 px-3 rounded-xl transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[15px] font-medium text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 truncate mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex items-center gap-1">
                  {project.techStack.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-1.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <FiArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
