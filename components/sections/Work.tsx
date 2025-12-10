"use client";

import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import SplitText from "@/components/reactbits/SplitText";
import Aurora from "@/components/reactbits/Aurora";
import Squares from "@/components/reactbits/Squares";
import Waves from "@/components/reactbits/Waves";
import { projects } from "@/lib/data";

const Work = () => {
  return (
    <motion.section
      id="work"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-16 xl:py-24 overflow-hidden"
    >
      {/* Aurora Background for entire section */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#00ff99", "#0a2a1a", "#00d4aa", "#1a1a2e"]}
          speed={2}
          blur={120}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl xl:text-5xl font-bold mb-4">
            <SplitText text="My Work" stagger={0.08} delay={0.2} />
          </h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ maxWidth: "200px" }}
          />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line (visible on xl screens) */}
          <div className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-UserAccent/50 via-UserAccent/20 to-transparent -translate-x-1/2 z-10" />

          {/* Projects */}
          <div className="space-y-20 xl:space-y-32">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={project.num}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  {/* Full-width project card with glass effect */}
                  <div className="relative rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 p-6 xl:p-10 overflow-hidden">
                    {/* Dynamic Background Effect based on project index */}
                    <div className="absolute inset-0 z-0">
                      {index === 0 && (
                        <Squares 
                          direction="diagonal"
                          speed={0.3}
                          borderColor="rgba(0, 255, 153, 0.15)"
                          squareSize={50}
                          hoverFillColor="rgba(0, 255, 153, 0.1)"
                        />
                      )}
                      {index === 1 && (
                        <Waves 
                          lineColor="rgba(0, 255, 153, 0.3)"
                          backgroundColor="transparent"
                          waveSpeedX={0.02}
                          waveSpeedY={0.01}
                          waveAmpX={40}
                          waveAmpY={20}
                          friction={0.9}
                          tension={0.01}
                          maxCursorMove={120}
                          xGap={12}
                          yGap={36}
                        />
                      )}
                      {index === 2 && (
                        <Squares 
                          direction="right"
                          speed={0.2}
                          borderColor="rgba(0, 255, 153, 0.12)"
                          squareSize={40}
                          hoverFillColor="rgba(0, 255, 153, 0.08)"
                        />
                      )}
                    </div>
                    
                    <div className={`flex flex-col xl:flex-row items-center gap-8 xl:gap-20 ${
                      isEven ? "" : "xl:flex-row-reverse"
                    }`}>
                      
                      {/* Image Container */}
                      <motion.div 
                        className="w-full xl:w-[45%] relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative h-[280px] sm:h-[350px] xl:h-[400px] rounded-xl overflow-hidden group shadow-2xl">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Project Number Badge */}
                          <motion.div 
                            className="absolute top-4 left-4 z-20 w-14 h-14 rounded-full bg-UserAccent/90 backdrop-blur-sm flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            <span className="text-xl font-bold text-primary">{project.num}</span>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Timeline Dot (visible on xl screens) - positioned in the gap */}
                      <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-UserAccent border-4 border-slate-100 dark:border-[#1c1c22] z-20 shadow-lg shadow-UserAccent/30" />

                      {/* Project Info */}
                      <motion.div 
                        className={`w-full xl:w-[45%] relative z-10 ${isEven ? "xl:text-left xl:pl-4" : "xl:text-right xl:pr-4"}`}
                        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {/* Category Badge */}
                        <motion.span 
                          className="inline-block px-4 py-2 rounded-full bg-UserAccent/10 text-UserAccent text-sm font-medium mb-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {project.category} Project
                        </motion.span>

                        {/* Title */}
                        <h3 className="text-3xl xl:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-slate-600 dark:text-white/60 text-lg mb-6 ${isEven ? "" : "xl:ml-auto"}`} style={{ maxWidth: "400px" }}>
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className={`flex flex-wrap gap-3 mb-8 ${isEven ? "" : "xl:justify-end"}`}>
                          {project.Stack.map((stack, stackIndex) => (
                            <motion.span
                              key={stack.name}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 text-sm font-medium border border-slate-200/50 dark:border-white/10"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.4 + stackIndex * 0.05 }}
                              whileHover={{ 
                                scale: 1.05, 
                                backgroundColor: "rgba(0, 255, 153, 0.1)",
                                borderColor: "rgba(0, 255, 153, 0.3)"
                              }}
                            >
                              {stack.name}
                            </motion.span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex gap-4 ${isEven ? "" : "xl:justify-end"}`}>
                          <Link href={project.live}>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <motion.div 
                                    className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center group cursor-pointer border border-slate-200/50 dark:border-white/10"
                                    whileHover={{ 
                                      scale: 1.1, 
                                      rotate: 5,
                                      borderColor: "rgba(0, 255, 153, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <BsArrowUpRight className="text-slate-700 dark:text-white text-xl group-hover:text-UserAccent transition-colors duration-300" />
                                  </motion.div>
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
                                  <motion.div 
                                    className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center group cursor-pointer border border-slate-200/50 dark:border-white/10"
                                    whileHover={{ 
                                      scale: 1.1, 
                                      rotate: -5,
                                      borderColor: "rgba(0, 255, 153, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <BsGithub className="text-slate-700 dark:text-white text-xl group-hover:text-UserAccent transition-colors duration-300" />
                                  </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">GitHub Repo</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
