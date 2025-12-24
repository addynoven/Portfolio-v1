"use client";

import Image from "next/image";
import ProjectCard from "./ProjectCard";
import TechStackCard from "./TechStackCard";
import BentoCard from "./BentoCard";
import MapCard from "./MapCard";
import PersonalityCard from "./PersonalityCard";
import IntroCard from "./IntroCard";
import HorizontalSocialBar from "./HorizontalSocialBar";
import GitHubStatsCard from "./GitHubStatsCard";
import ProjectCarousel from "./ProjectCarousel";
import { FaArrowRight, FaMoon, FaSun, FaPlus } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const BentoGrid = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };


  return (
    <div className="h-screen overflow-hidden bg-slate-100 dark:bg-[#0a0a0a] p-2 md:p-3 flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full gap-2">
        
        {/* Header */}
        <div className="flex items-center justify-between px-1 flex-shrink-0">
          <h1 className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-white">
            Aditya<span className="text-UserAccent">.</span>
          </h1>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="w-8 h-8 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 flex items-center justify-center hover:scale-105 transition-transform"
          >
            {mounted && (resolvedTheme === "dark" ? <FaMoon className="w-3.5 h-3.5 text-yellow-400" /> : <FaSun className="w-3.5 h-3.5 text-yellow-500" />)}
          </button>
        </div>

        {/* === ROW 1: Intro | Map | Photo (3 columns) === */}
        <div className="grid grid-cols-3 gap-2" style={{ height: '38%' }}>
          <IntroCard colSpan={1} className="p-4" />
          <MapCard />
          <PersonalityCard />
        </div>

        {/* === ROW 2: GitHub | Placeholder | Project Carousel | Stack === */}
        <div className="grid grid-cols-5 gap-2 overflow-hidden" style={{ height: '24%' }}>
          {/* Column 1: GitHub Stats (single full-height card) */}
          <BentoCard colSpan={1} rowSpan={1} className="h-full min-h-0 overflow-hidden">
            <GitHubStatsCard />
          </BentoCard>

          {/* Column 2: Placeholder (will be replaced later) */}
          <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-between p-3 h-full min-h-0 overflow-hidden">
            <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500">Coming Soon</span>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-2xl">🚧</span>
            </div>
          </BentoCard>

          {/* Column 3-4: Project Carousel (spans 2 columns) */}
          <div className="col-span-2 h-full min-h-0 overflow-hidden">
            <ProjectCarousel />
          </div>

          {/* Column 5: Stack I Use (with + to open modal) */}
          <BentoCard 
            colSpan={1} 
            rowSpan={1} 
            className="flex flex-col justify-between p-3 h-full min-h-0 overflow-hidden"
            modalContent={
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold block mb-3">Frontend</span>
                  <div className="flex flex-wrap gap-2">
                    <TechStackCard />
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold block mb-3">Backend</span>
                  <div className="flex flex-wrap gap-2">
                    <TechStackCard />
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold block mb-3">Database</span>
                  <div className="flex flex-wrap gap-2">
                    <TechStackCard />
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold block mb-3">Tools</span>
                  <div className="flex flex-wrap gap-2">
                    <TechStackCard />
                  </div>
                </div>
              </div>
            }
            modalTitle="My Tech Stack"
            modalDescription="Technologies I work with"
          >
            <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500">Stack I use</span>
            <div className="flex-1 flex items-center justify-center">
              <TechStackCard />
            </div>
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-UserAccent flex items-center justify-center">
                <FaPlus className="w-2.5 h-2.5 text-black" />
              </div>
            </div>
          </BentoCard>
        </div>

        {/* === ROW 3: Photo | About (2 cols) | SecureShare | RI Store | Stack+Resume === */}
        <div className="grid grid-cols-6 gap-2" style={{ height: '28%' }}>
          {/* Photo/Anime */}
          <BentoCard colSpan={1} rowSpan={1} className="p-0 overflow-hidden relative group">
            <Image src="/photo.jpg" alt="Profile" fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </BentoCard>

          {/* About (spans 2 columns) */}
          <BentoCard 
            colSpan={2} 
            rowSpan={1} 
            className="col-span-2 flex flex-col justify-between p-3"
            modalContent={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">
                {/* Row 1: What I'm about (2 cols) + What I do best (1 col) */}
                <div className="md:col-span-2 bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                  <h2 className="text-2xl font-bold text-white mb-4">What I'm about?</h2>
                  <div className="space-y-4">
                    <div>
                      <span className="text-UserAccent uppercase tracking-widest text-[10px] font-bold block mb-2">My Story</span>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        I am a software engineer based in India with a deep passion for building scalable and user-centric applications. 
                        With a background in backend development and a love for frontend aesthetics, I aim to bridge the gap between complex logic and beautiful interfaces.
                      </p>
                    </div>
                    <div>
                      <span className="text-UserAccent uppercase tracking-widest text-[10px] font-bold block mb-2">What I Do Now</span>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Currently I'm a Full Stack Developer building <span className="text-white underline underline-offset-2 decoration-UserAccent">cool stuff</span> and improving my skills every day.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold block mb-3">What I Do Best</span>
                  <h3 className="text-xl font-bold text-white mb-4">Full Stack</h3>
                  <p className="text-gray-400 text-sm mb-4">Building end-to-end solutions with modern technologies.</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-UserAccent" />
                      System Architecture & API Design
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-UserAccent" />
                      Responsive & Interactive Frontend
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-UserAccent" />
                      Database Management
                    </li>
                  </ul>
                </div>

                {/* Row 2: Experience (2 cols) + Stack I use (1 col) */}
                <div className="md:col-span-2 bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                  <span className="text-UserAccent uppercase tracking-widest text-[10px] font-bold block mb-4">Experience</span>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-white">Full Stack Developer</p>
                        <p className="text-xs text-gray-500 italic">Self-employed / Freelance</p>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">2022 — Present</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold block mb-3">Stack I Use</span>
                  <div className="flex flex-wrap gap-3">
                    <TechStackCard />
                  </div>
                </div>
              </div>
            }
          >
            <div>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500 block">About</span>
              <p className="text-sm text-slate-800 dark:text-white font-medium leading-relaxed mt-1">
                Passionate about building products and enjoy solving problems.
              </p>
            </div>
          </BentoCard>

          {/* Projects */}
          <ProjectCard title="SecureShare" image="/assets/work/secureshare.png" href="https://github.com/addynoven/SecureShare" />
          <ProjectCard title="RI Store" image="/assets/work/ristore.png" href="https://github.com/addynoven/ri-store" />

          {/* Stack + Resume */}
          <div className="flex flex-col gap-2">
            <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-center p-2 flex-1">
              <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500 block mb-1">Stack I use</span>
              <TechStackCard />
            </BentoCard>
            <a href="/resume.pdf" target="_blank" className="rounded-xl bg-UserAccent p-2 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer flex-1">
              <span className="text-[10px] font-medium text-black">View Resume</span>
              <FaArrowRight className="w-3 h-3 text-black" />
            </a>
          </div>
        </div>

        {/* Social Bar */}
        <div className="flex-shrink-0 flex items-center justify-between">
          <HorizontalSocialBar />
          
          {/* Version Badge */}
          <div className="flex items-center gap-3 text-gray-500">
            <span className="text-xs">Made with 💚 by Aditya</span>
            <div className="flex items-center gap-1">
              <a 
                href="/v1" 
                className="px-2 py-1 text-[10px] font-medium rounded-md bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all"
              >
                V1
              </a>
              <span className="px-2 py-1 text-[10px] font-medium rounded-md bg-UserAccent/20 text-UserAccent border border-UserAccent/30">
                V2
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
