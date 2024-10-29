"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Frontend",
    title: "Website Development",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
    href: "/work/01",
    image: "/assets/work/thumb1.png",
    Stack: [
      {
        name: "HTML 5",
      },
      {
        name: "CSS 3",
      },
      {
        name: "JavaScript",
      },
      {
        name: "React",
      },
    ],
    live: "https://github.com/Addynoven",
    github: "https://github.com/Addynoven",
  },
  {
    num: "02",
    category: "UI/UX",
    title: "UI/UX Design",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
    href: "/work/02",
    image: "/assets/work/thumb2.png",
    Stack: [
      {
        name: "React",
      },
      {
        name: "Figma",
      },
      {
        name: "Next.js",
      },
      {
        name: "Tailwind CSS",
      },
    ],
    live: "https://github.com/addynoven",
    github: "https://github.com/addynoven",
  },
  {
    num: "03",
    category: "Game",
    title: "Game Development",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
    href: "/work/03",
    image: "/assets/work/thumb3.png",
    Stack: [
      {
        name: "HTML 5",
      },
      {
        name: "CSS 3",
      },
      {
        name: "JavaScript",
      },
      {
        name: "React",
      },
    ],
    live: "https://github.com/addynoven",
    github: "https://github.com/addynoven",
  },
];

const Work = () => {
  const [Project, setProject] = useState(projects[0]);
  const handleSlideChange = (swiper) => {
    const currentlyIndex = swiper.realIndex;
    setProject(projects[currentlyIndex]);
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.4, ease: "easeIn", delay: 2.4 },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
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
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:bg-UserAccent transition-all duration-500 capitalize">
                {Project.category} project
              </h2>
              {/* project description */}
              <p className="text-white/60 text-lg">{Project.description}</p>
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
              <div className="border-b border-white/20"></div>
              {/* button */}
              <div className="flex items-center gap-4">
                {/* live project link */}
                <Link href={Project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-UserAccent transition-all duration-500" />
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
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-UserAccent transition-all duration-500" />
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
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
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
