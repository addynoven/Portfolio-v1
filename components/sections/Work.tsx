"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub, BsArrowRight } from "react-icons/bs";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
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

// Icon component for timeline elements
const ProjectIcon = memo(function ProjectIcon({ num }: { num: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-UserAccent rounded-full">
      <span className="text-sm font-bold text-black">{num}</span>
    </div>
  );
});

// Project card content
const ProjectContent = memo(function ProjectContent({
  project,
}: {
  project: (typeof projects)[0];
}) {
  return (
    <div className="relative">
      {/* Image */}
      <div className="relative h-[180px] rounded-xl overflow-hidden mb-4 shadow-lg group">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Category */}
      <span className="inline-block px-3 py-1 rounded-full bg-UserAccent/10 text-UserAccent text-xs font-medium mb-2">
        {project.category}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-white/60 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.Stack.slice(0, 4).map((stack) => (
          <span
            key={stack.name}
            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80 text-xs font-medium border border-slate-200/50 dark:border-white/5"
          >
            {stack.name}
          </span>
        ))}
        {project.Stack.length > 4 && (
          <span className="px-2 py-0.5 rounded-md bg-UserAccent/10 text-UserAccent text-xs font-medium">
            +{project.Stack.length - 4}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Link href={project.live} target="_blank">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center cursor-pointer border border-slate-200/50 dark:border-white/10 hover:border-UserAccent/50 hover:bg-UserAccent/10 transition-all">
                  <BsArrowUpRight className="text-slate-700 dark:text-white text-lg" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black/95 border border-UserAccent/40 text-white shadow-xl rounded-lg px-3 py-1.5">
                <p className="text-xs m-0 font-medium">Live Project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>

        <Link href={project.github} target="_blank">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center cursor-pointer border border-slate-200/50 dark:border-white/10 hover:border-UserAccent/50 hover:bg-UserAccent/10 transition-all">
                  <BsGithub className="text-slate-700 dark:text-white text-lg" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black/95 border border-UserAccent/40 text-white shadow-xl rounded-lg px-3 py-1.5">
                <p className="text-xs m-0 font-medium">GitHub Repo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>

        <QrCodePopup url={project.live} />
      </div>
    </div>
  );
});

const Work = memo(function Work({ limit, isPage = false }: WorkProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="relative py-16 xl:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-12 xl:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl xl:text-5xl font-bold mb-4">
            {isPage ? "All Projects" : "My Work"}
          </h2>
          <div
            className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full"
            style={{ maxWidth: "200px" }}
          />
        </motion.div>

        {/* Vertical Timeline */}
        <VerticalTimeline
          lineColor="#22c55e"
          animate={true}
          layout="2-columns"
        >
          {displayedProjects.map((project, index) => (
            <VerticalTimelineElement
              key={project.num}
              visible={true}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "1.5rem",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(255, 255, 255, 0.9)",
              }}
              iconStyle={{
                background: "var(--accent)",
                boxShadow: "0 0 0 4px var(--accent), inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
              }}
              icon={<ProjectIcon num={project.num} />}
            >
              <ProjectContent project={project} />
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {/* View All Projects CTA */}
        {!isPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 xl:mt-16 text-center"
          >
            <a
              href="/work"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/work";
              }}
            >
              <Button
                variant="outline"
                size="lg"
                className="group text-lg px-10 py-6 border-UserAccent text-UserAccent hover:bg-UserAccent hover:text-primary"
              >
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
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
            >
              <Button
                variant="default"
                size="lg"
                className="rounded-full shadow-2xl bg-UserAccent text-primary hover:bg-UserAccent/90"
              >
                Back to Home
              </Button>
            </a>
          </motion.div>
        )}
      </div>

      {/* Custom styles for timeline */}
      <style jsx global>{`
        /* Force timeline line to be visible */
        .vertical-timeline {
          position: relative !important;
        }
        .vertical-timeline::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 4px !important;
          height: 100% !important;
          background: #22c55e !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 0 !important;
        }
        
        /* Mobile: line on left */
        @media only screen and (max-width: 1169px) {
          .vertical-timeline::before {
            left: 18px !important;
            transform: none !important;
          }
        }
        
        /* Light mode content cards */
        .vertical-timeline-element-content {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
        }
        
        /* Dark mode content cards */
        .dark .vertical-timeline-element-content {
          background: rgba(0, 0, 0, 0.85) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(10px) !important;
        }
        .dark .vertical-timeline-element-content-arrow {
          border-right-color: rgba(0, 0, 0, 0.85) !important;
        }
        
        /* Icon styling */
        .vertical-timeline-element-icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 0 0 4px #22c55e, 
                      0 0 15px rgba(34, 197, 94, 0.5),
                      inset 0 2px 0 rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </section>
  );
});

export default Work;