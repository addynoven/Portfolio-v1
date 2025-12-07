"use client";

import { motion } from "framer-motion";
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
  const handleSlideChange = (swiper: any) => {
    const currentlyIndex = swiper.realIndex;
    setProject(projects[currentlyIndex]);
  };
  return (
    <motion.section
      id="work"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.4, ease: "easeIn", delay: 0.4 },
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center py-16 xl:py-24"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex fex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline number of the project we are currently user is viewing */}
              <div className="text-8xl leading-none text-transparent text-outline ">
                {Project.num}
              </div>
              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none text-slate-900 dark:text-white group-hover:bg-UserAccent transition-all duration-500 capitalize">
                {Project.category} project
              </h2>
              {/* project description */}
              <p className="text-slate-600 dark:text-white/60 text-lg">{Project.description}</p>
              {/* project stack */}
              <ul className="flex gap-4">
                {Project.Stack.map((stack, index) => {
                  return (
                    <li key={stack.name} className="  text-xl text-UserAccent">
                      {stack.name}
                      {index !== Project.Stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* Border line */}
              <div className="border-b border-slate-200 dark:border-white/20"></div>
              {/* button */}
              <div className="flex items-center gap-4">
                {/* live project link */}
                <Link href={Project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-slate-100 dark:bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-slate-700 dark:text-white text-3xl group-hover:text-UserAccent transition-all duration-500" />
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
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-slate-100 dark:bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-slate-700 dark:text-white text-3xl group-hover:text-UserAccent transition-all duration-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-white/80 text-sm bg-black/80 p-2">
                          Github project
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerGroup={1}
              className="h-[350px] sm:h-[450px] xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[300px] sm:h-[400px] xl:h-[460px] relative group flex justify-center items-center bg-pink-50/20 rounded-lg overflow-hidden">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="w-full h-full relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="object-cover"
                          fill
                          sizes="100%"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider button */}
              <WorkSliderBtns
                containerStyle="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-UserAccent hover:bg-UserAccent-hover text-primary w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
