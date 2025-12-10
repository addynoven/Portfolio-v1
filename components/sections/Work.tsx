"use client";

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
import SplitText from "@/components/reactbits/SplitText";
import Aurora from "@/components/reactbits/Aurora";
import Squares from "@/components/reactbits/Squares";
import Waves from "@/components/reactbits/Waves";
import Threads from "@/components/reactbits/Threads";
import GridPulse from "@/components/reactbits/GridPulse";
import { GridScan } from "@/components/reactbits/GridScan";
import ScrollStack, { ScrollStackItem } from "@/components/reactbits/ScrollStack";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface WorkProps {
  limit?: number;
  isPage?: boolean;
}

const Work = ({ limit, isPage = false }: WorkProps) => {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <motion.section
      id="work"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-16 xl:py-24 min-h-screen"
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
            <SplitText text={isPage ? "All Projects" : "My Work"} stagger={0.08} delay={0.2} />
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

        {/* ScrollStack Container */}
        <ScrollStack
          itemDistance={80}
          itemScale={0.02}
          itemStackDistance={25}
          stackPosition="15%"
          scaleEndPosition="8%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {displayedProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <ScrollStackItem
                key={project.num}
                itemClassName="bg-white/90 dark:bg-black/85 backdrop-blur-md border border-white/20"
              >
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
                    <Threads 
                      color={[0, 1, 0.59]}
                      amplitude={1}
                      distance={0}
                      enableMouseInteraction={true}
                    />
                  )}
                  {index === 3 && (
                    <GridPulse 
                      color="rgba(0, 255, 153, 0.4)"
                      backgroundColor="rgba(0, 0, 0, 0.3)"
                      gridSize={35}
                      speed={1.5}
                      pulseRadius={180}
                    />
                  )}
                  {index === 4 && (
                    <GridScan
                      linesColor="#00ff99"
                      scanColor="#00ff99"
                      scanOpacity={0.6}
                      gridScale={0.15}
                      lineThickness={1.5}
                      scanGlow={0.8}
                      enableWebcam={false}
                      showPreview={false}
                      enablePost={false}
                    />
                  )}
                </div>
                
                <div className={`flex flex-col xl:flex-row items-center gap-8 xl:gap-16 h-full relative z-10 ${
                  isEven ? "" : "xl:flex-row-reverse"
                }`}>
                  
                  {/* Image Container */}
                  <motion.div 
                    className="w-full xl:w-[45%] relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-[200px] sm:h-[280px] xl:h-[320px] rounded-xl overflow-hidden group shadow-2xl">
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
                        className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-UserAccent/90 backdrop-blur-sm flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <span className="text-lg font-bold text-primary">{project.num}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`w-full xl:w-[50%] ${isEven ? "xl:text-left" : "xl:text-right"}`}
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {/* Glassmorphic Container */}
                    <div className="backdrop-blur-md bg-black/40 rounded-2xl p-5 xl:p-6 border border-white/10 shadow-xl">
                      <motion.span 
                        className="inline-block px-3 py-1.5 rounded-full bg-UserAccent/10 text-UserAccent text-sm font-medium mb-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        {project.category} Project
                      </motion.span>

                      {/* Title */}
                      <h3 className="text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-slate-600 dark:text-white/60 text-base mb-4 ${isEven ? "" : "xl:ml-auto"}`} style={{ maxWidth: "380px" }}>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className={`flex flex-wrap gap-2 mb-5 ${isEven ? "" : "xl:justify-end"}`}>
                        {project.Stack.map((stack, stackIndex) => (
                          <motion.span
                            key={stack.name}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 text-xs font-medium border border-slate-200/50 dark:border-white/10"
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
                      <div className={`flex gap-3 ${isEven ? "" : "xl:justify-end"}`}>
                        <Link href={project.live}>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div 
                                  className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center group cursor-pointer border border-slate-200/50 dark:border-white/10"
                                  whileHover={{ 
                                    scale: 1.1, 
                                    rotate: 5,
                                    borderColor: "rgba(0, 255, 153, 0.5)"
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <BsArrowUpRight className="text-slate-700 dark:text-white text-lg group-hover:text-UserAccent transition-colors duration-300" />
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
                                  className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center group cursor-pointer border border-slate-200/50 dark:border-white/10"
                                  whileHover={{ 
                                    scale: 1.1, 
                                    rotate: -5,
                                    borderColor: "rgba(0, 255, 153, 0.5)"
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <BsGithub className="text-slate-700 dark:text-white text-lg group-hover:text-UserAccent transition-colors duration-300" />
                                </motion.div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">GitHub Repo</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
          
          {/* View All Projects Button */}
          {!isPage && (
             <motion.div 
               className="flex justify-center mt-16 pb-16"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
               <Link href="/work">
                 <Button variant="outline" size="lg" className="group text-lg px-8 border-UserAccent text-UserAccent hover:bg-UserAccent hover:text-primary">
                    View All Projects
                    <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
             </motion.div>
          )}

          {/* Back to Home Button (if on dedicated page) */}
          {isPage && (
            <motion.div 
                className="fixed bottom-8 right-8 z-50"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <Link href="/">
                    <Button variant="default" size="lg" className="rounded-full shadow-2xl bg-UserAccent text-primary hover:bg-UserAccent/90">
                        Back to Home
                    </Button>
                </Link>
            </motion.div>
          )}
      </div>
    </motion.section>
  );
};

export default Work;
