"use client";

import { memo, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Layers, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import QrCodePopup from "@/components/v1/QrCodePopup";

interface WorkProps {
  limit?: number;
  isPage?: boolean;
}

const CATEGORIES = ["All", "Full Stack", "AI/ML", "CLI & Tools", "Mobile"] as const;

// Spotlight Featured Card for the Flagship Project
const SpotlightCard = memo(function SpotlightCard({
  project,
}: {
  project: (typeof projects)[0];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 overflow-hidden hover:border-UserAccent/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-UserAccent/5 mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Project Preview */}
        <div className="lg:col-span-7 relative h-[260px] sm:h-[320px] lg:h-full min-h-[280px] overflow-hidden bg-slate-200 dark:bg-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Spotlight tag */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-UserAccent/40 text-UserAccent text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flagship Project</span>
          </div>

          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-UserAccent">
            {project.num}
          </div>
        </div>

        {/* Right: Project Details */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-UserAccent/10 text-UserAccent border border-UserAccent/20">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-UserAccent transition-colors">
              {project.title}
            </h3>

            <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.Stack.map((stack) => (
                <span
                  key={stack.name}
                  className="px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-white/80 text-xs font-mono font-medium border border-slate-300/40 dark:border-white/10"
                >
                  {stack.name}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-white/5">
            <div className="flex items-center gap-3">
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-UserAccent text-primary hover:bg-UserAccent/90 font-bold text-xs transition-all shadow-md hover:shadow-UserAccent/20"
                >
                  <span>Live Preview</span>
                  <BsArrowUpRight className="text-xs" />
                </Link>
              )}

              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-white/80 hover:text-UserAccent hover:border-UserAccent/40 font-medium text-xs transition-all border border-slate-300/40 dark:border-white/10"
                >
                  <BsGithub className="text-sm" />
                  <span>Source</span>
                </Link>
              )}
            </div>

            {project.live && <QrCodePopup url={project.live} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Standard Grid Project Card
const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 overflow-hidden hover:border-UserAccent/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-UserAccent/5"
    >
      <div>
        {/* Project Thumbnail */}
        <div className="relative h-[200px] w-full overflow-hidden bg-slate-200 dark:bg-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-UserAccent">
            {project.num}
          </div>

          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/70 backdrop-blur-md border border-UserAccent/30 text-UserAccent">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-UserAccent transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-white/70 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.Stack.map((stack) => (
              <span
                key={stack.name}
                className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-300/40 dark:border-white/10"
              >
                {stack.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Links Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {project.live && (
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-UserAccent/10 text-UserAccent hover:bg-UserAccent hover:text-primary font-medium text-xs transition-all border border-UserAccent/20">
                      <span>Live Demo</span>
                      <BsArrowUpRight className="text-xs" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/95 border border-UserAccent/40 text-white shadow-xl rounded-lg px-3 py-1.5">
                    <p className="text-xs m-0 font-medium">Open Live Deployment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          )}

          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-white/80 hover:text-UserAccent hover:border-UserAccent/40 font-medium text-xs transition-all border border-slate-300/40 dark:border-white/10">
                      <BsGithub className="text-sm" />
                      <span>Source</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/95 border border-UserAccent/40 text-white shadow-xl rounded-lg px-3 py-1.5">
                    <p className="text-xs m-0 font-medium">View Source Code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          )}
        </div>

        {project.live && <QrCodePopup url={project.live} />}
      </div>
    </motion.div>
  );
});

const Work = memo(function Work({ limit, isPage = false }: WorkProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === "CLI & Tools" && (p.category.includes("CLI") || p.category.includes("Package") || p.category.includes("Tools"))) ||
          (selectedCategory === "Full Stack" && p.category.includes("Full Stack"))
      );
    }
    return result;
  }, [selectedCategory]);

  const showSpotlight = selectedCategory === "All" && filteredProjects.length > 0;
  const spotlightProject = showSpotlight ? filteredProjects[0] : null;
  const gridProjects = showSpotlight ? filteredProjects.slice(1) : filteredProjects;

  return (
    <section id="work" className="relative scroll-mt-24 w-full">
      {/* Section Header */}
      <motion.div
        className="mb-8 xl:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-UserAccent/10 flex items-center justify-center text-UserAccent">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-UserAccent font-mono text-sm tracking-wider uppercase">
            Engineering Portfolio
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold mb-2 text-slate-900 dark:text-white">
              Featured <span className="text-UserAccent">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-white/60 max-w-xl text-sm sm:text-base">
              Production web applications, full-stack architectures, published CLI packages, and applied AI systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center flex-wrap gap-2 pt-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-all duration-300 ${
                    isActive
                      ? "bg-UserAccent text-primary font-bold shadow-[0_0_15px_rgba(0,255,153,0.25)]"
                      : "bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full mt-4"
          style={{ maxWidth: "200px" }}
        />
      </motion.div>

      {/* Flagship Spotlight Card */}
      {spotlightProject && <SpotlightCard project={spotlightProject} />}

      {/* Symmetrical Grid (2 columns on md, 3 columns on lg/xl) */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {gridProjects.map((project, index) => (
            <ProjectCard
              key={project.num + project.title}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
});

export default Work;