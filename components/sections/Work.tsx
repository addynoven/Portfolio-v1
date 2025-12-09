"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WorkSliderBtns from "@/components/WorkSliderBtns";

import { projects } from "@/lib/data";

const Work = () => {
  const [Project, setProject] = useState(projects[0]);
  const [slideKey, setSlideKey] = useState(0);
  
  const handleSlideChange = (swiper: any) => {
    const currentlyIndex = swiper.realIndex;
    setProject(projects[currentlyIndex]);
    setSlideKey(prev => prev + 1);
  };
  
  return (
    <motion.section
      id="work"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center py-16 xl:py-24"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My Work
          </motion.h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ maxWidth: "200px" }}
          />
        </motion.div>

        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <motion.div 
            className="w-full xl:w-[50%] xl:h-[460px] flex fex-col xl:justify-between order-2 xl:order-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* Animated project number */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`num-${slideKey}`}
                  className="text-8xl leading-none text-transparent text-outline"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  {Project.num}
                </motion.div>
              </AnimatePresence>
              
              {/* Animated project category */}
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={`cat-${slideKey}`}
                  className="text-[42px] font-bold leading-none text-slate-900 dark:text-white capitalize"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {Project.category} project
                </motion.h2>
              </AnimatePresence>
              
              {/* Animated description */}
              <AnimatePresence mode="wait">
                <motion.p 
                  key={`desc-${slideKey}`}
                  className="text-slate-600 dark:text-white/60 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {Project.description}
                </motion.p>
              </AnimatePresence>
              
              {/* Animated stack */}
              <motion.ul 
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {Project.Stack.map((stack, index) => {
                  return (
                    <motion.li 
                      key={stack.name} 
                      className="text-xl text-UserAccent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {stack.name}
                      {index !== Project.Stack.length - 1 && ","}
                    </motion.li>
                  );
                })}
              </motion.ul>
              
              {/* Border line */}
              <motion.div 
                className="border-b border-slate-200 dark:border-white/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
              
              {/* Action buttons */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {/* live project link */}
                <Link href={Project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div 
                          className="w-[70px] h-[70px] rounded-full bg-slate-100 dark:bg-white/5 flex justify-center items-center group cursor-pointer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <BsArrowUpRight className="text-slate-700 dark:text-white text-3xl group-hover:text-UserAccent transition-all duration-500" />
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-white/80 text-sm bg-black/80 p-2">
                          Live project
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/* github project link */}
                <Link href={Project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div 
                          className="w-[70px] h-[70px] rounded-full bg-slate-100 dark:bg-white/5 flex justify-center items-center group cursor-pointer"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <BsGithub className="text-slate-700 dark:text-white text-3xl group-hover:text-UserAccent transition-all duration-500" />
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-white/80 text-sm bg-black/80 p-2">
                          Github project
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full xl:w-[50%]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Swiper
              spaceBetween={30}
              slidesPerGroup={1}
              className="h-[350px] sm:h-[450px] xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <motion.div 
                      className="h-[300px] sm:h-[400px] xl:h-[460px] relative group flex justify-center items-center bg-pink-50/20 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="w-full h-full relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="100%"
                        />
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
              {/* slider button */}
              <WorkSliderBtns
                containerStyle="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-UserAccent hover:bg-UserAccent-hover text-primary w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
