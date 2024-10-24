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
    live: "https://github.com/lukecoleman",
    github: "https://github.com/lukecoleman",
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
    live: "https://github.com/lukecoleman",
    github: "https://github.com/lukecoleman",
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
    live: "https://github.com/lukecoleman",
    github: "https://github.com/lukecoleman",
  },
];

const work = () => {
  const [Project, setProject] = useState(projects[0]);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
            <Swiper spaceBetween={30}>
              {projects.map((project, index) => {
                return <SwiperSlide key={index}>slide {index}</SwiperSlide>;
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default work;
