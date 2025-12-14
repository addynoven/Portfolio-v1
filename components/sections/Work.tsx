"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub, BsArrowRight } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import QrCodePopup from "@/components/QrCodePopup";

interface WorkProps {
  limit?: number;
  isPage?: boolean;
}

// Simple project card - no heavy effects, just clean CSS
const ProjectCard = memo(function ProjectCard({ 
  project, 
  index, 
  isEven 
}: { 
  project: typeof projects[0]; 
  index: number; 
  isEven: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative bg-white/90 dark:bg-black/85 backdrop-blur-md border border-white/20 rounded-[40px] p-6 xl:p-10 shadow-xl mb-8"
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 z-0 rounded-[40px] overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${
          index % 3 === 0 ? 'from-UserAccent/5 via-transparent to-cyan-500/5' :
          index % 3 === 1 ? 'from-purple-500/5 via-transparent to-UserAccent/5' :
          'from-cyan-500/5 via-transparent to-UserAccent/5'
        }`} />
      </div>

      <div className={`flex flex-col xl:flex-row items-center gap-8 xl:gap-12 relative z-10 ${
        isEven ? "" : "xl:flex-row-reverse"
      }`}>
        
        {/* Image Container */}
        <div className="w-full xl:w-[45%] relative">
          <div className="relative h-[200px] sm:h-[280px] xl:h-[320px] rounded-xl overflow-hidden group shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Project Number Badge */}
            <div className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-UserAccent flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-black">{project.num}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`w-full xl:w-[50%] ${isEven ? "xl:text-left" : "xl:text-right"}`}>
          <div className="backdrop-blur-md bg-white/40 dark:bg-black/30 rounded-2xl p-5 xl:p-6 border border-slate-200/30 dark:border-white/10">
            <span className="inline-block px-3 py-1.5 rounded-full bg-UserAccent/10 text-UserAccent text-sm font-medium mb-3">
              {project.category} Project
            </span>

            <h3 className="text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {project.title}
            </h3>

            <p className={`text-slate-600 dark:text-white/60 text-base mb-4 ${isEven ? "" : "xl:ml-auto"}`} style={{ maxWidth: "380px" }}>
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className={`flex flex-wrap gap-2 mb-5 ${isEven ? "" : "xl:justify-end"}`}>
              {project.Stack.map((stack) => (
                <span
                  key={stack.name}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 text-xs font-medium border border-slate-200/50 dark:border-white/10 hover:border-UserAccent/30 transition-colors"
                >
                  {stack.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-3 ${isEven ? "" : "xl:justify-end"}`}>
              <Link href={project.live}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center group cursor-pointer border border-slate-200/50 dark:border-white/10 hover:border-UserAccent/50 transition-all hover:scale-105">
                        <BsArrowUpRight className="text-slate-700 dark:text-white text-lg group-hover:text-UserAccent transition-colors duration-300" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Live Project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>

              <Link href={project.github}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center group cursor-pointer border border-slate-200/50 dark:border-white/10 hover:border-UserAccent/50 transition-all hover:scale-105">
                        <BsGithub className="text-slate-700 dark:text-white text-lg group-hover:text-UserAccent transition-colors duration-300" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">GitHub Repo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>

              <QrCodePopup url={project.live} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Work = memo(function Work({ limit, isPage = false }: WorkProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section
      id="work"
      className="relative py-16 xl:py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl xl:text-5xl font-bold mb-4">
            {isPage ? "All Projects" : "My Work"}
          </h2>
          <div
            className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full"
            style={{ maxWidth: "200px" }}
          />
        </div>

        {/* Projects Grid - Simple vertical stack */}
        <div className="space-y-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        {!isPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a href="/work" onClick={(e) => { e.preventDefault(); window.location.href = '/work'; }}>
              <Button variant="outline" size="lg" className="group text-lg px-10 py-6 border-UserAccent text-UserAccent hover:bg-UserAccent hover:text-primary">
                View All Projects
                <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        )}

        {/* Back to Home Button (if on dedicated page) */}
        {isPage && (
          <motion.div 
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
              <Button variant="default" size="lg" className="rounded-full shadow-2xl bg-UserAccent text-primary hover:bg-UserAccent/90">
                Back to Home
              </Button>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
});

export default Work;