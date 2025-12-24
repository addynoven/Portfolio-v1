"use client";

import Image from "next/image";
import ProjectCard from "./ProjectCard";
import TechStackCard from "./TechStackCard";
import BentoCard from "./BentoCard";
import MapCard from "./MapCard";
import PersonalityCard from "./PersonalityCard";
import HorizontalSocialBar from "./HorizontalSocialBar";
import { FaArrowRight, FaTwitter, FaGithub, FaLinkedin, FaMoon, FaSun, FaCopy, FaCheck, FaPlus } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const BentoGrid = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("adityasahu0605@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-100 dark:bg-[#0a0a0a] p-2 md:p-3 flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full gap-2">
        
        {/* Header */}
        <div className="flex items-center justify-between px-1 flex-shrink-0">
          <h1 className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-white">
            Aditya<span className="text-UserAccent">.</span>
          </h1>
          <div className="flex items-center gap-1.5 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[8px] font-medium text-slate-600 dark:text-gray-300">Available for work</span>
          </div>
        </div>

        {/* === ROW 1: Intro | Map | Photo (3 columns) === */}
        <div className="grid grid-cols-3 gap-2" style={{ height: '38%' }}>
          <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-center p-4">
            <h1 className="text-xl md:text-2xl font-medium text-slate-800 dark:text-white mb-2">
              Hi, I'm Aditya —
            </h1>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
              Full Stack Developer, currently building{" "}
              <span className="text-slate-800 dark:text-white underline underline-offset-2 decoration-UserAccent">cool stuff</span>{" "}
              based in India.
            </p>
          </BentoCard>
          <MapCard />
          <PersonalityCard />
        </div>

        {/* === ROW 2: Resources/Contact | Theme+Stack+Resume | About (2 cols) | Socials === */}
        <div className="grid grid-cols-5 gap-2" style={{ height: '28%' }}>
          {/* Column 1: Resources (top) + Contact (bottom) */}
          <div className="flex flex-col gap-2">
            <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-between p-3 flex-1">
              <div>
                <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500 block">Resources</span>
                <p className="text-xs text-slate-800 dark:text-white font-medium mt-1">Resources to workflow</p>
              </div>
              <div className="flex justify-end">
                <a href="/v1/#work" className="w-6 h-6 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-white">
                  <FaPlus className="w-2 h-2" />
                </a>
              </div>
            </BentoCard>
            <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-between p-3 flex-1">
              <span className="text-xs text-slate-800 dark:text-white font-medium">Have a project in mind?</span>
              <button onClick={copyEmail} className="flex items-center gap-1 px-2 py-1 rounded-full border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white text-[10px] w-fit">
                {copied ? <><FaCheck className="w-2 h-2" /> Copied!</> : <><FaCopy className="w-2 h-2" /> Copy email</>}
              </button>
            </BentoCard>
          </div>

          {/* Column 2: Theme+Stack (75%) + Resume (25%) */}
          <div className="flex flex-col gap-2">
            <BentoCard colSpan={1} rowSpan={1} className="flex flex-col justify-between p-3" style={{ flex: '3' }}>
              <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
                <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-[#252525] flex items-center justify-center">
                  {mounted && (resolvedTheme === "dark" ? <FaMoon className="w-3 h-3 text-yellow-400" /> : <FaSun className="w-3 h-3 text-yellow-500" />)}
                </div>
                <span className="text-xs text-slate-600 dark:text-gray-400">Theme</span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500 block mb-1">Stack I use</span>
                <TechStackCard />
              </div>
            </BentoCard>
            <a href="/resume.pdf" target="_blank" className="rounded-xl bg-UserAccent p-2 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer" style={{ flex: '1' }}>
              <span className="text-xs font-medium text-black">View Resume</span>
              <FaArrowRight className="w-3 h-3 text-black" />
            </a>
          </div>

          {/* Column 3-4: About (spans 2 columns) */}
          <BentoCard colSpan={2} rowSpan={1} className="col-span-2 flex flex-col justify-between p-4">
            <div>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 dark:text-gray-500 block">About</span>
              <p className="text-base md:text-lg text-slate-800 dark:text-white font-medium leading-relaxed mt-2">
                Passionate about building products and enjoy solving problems.
              </p>
            </div>
            <div className="flex justify-end">
              <a href="/v1/#about" className="w-7 h-7 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                <FaArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </BentoCard>

          {/* Column 5: Socials (compact) */}
          <BentoCard colSpan={1} rowSpan={1} className="flex items-center justify-center gap-2 p-3">
            {[FaTwitter, FaGithub, FaLinkedin].map((Icon, i) => (
              <div key={i} className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#252525] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <Icon className="w-3 h-3 text-slate-600 dark:text-gray-400" />
              </div>
            ))}
          </BentoCard>
        </div>

        {/* === ROW 3: Photo | About (2 cols) | SecureShare | RI Store | Stack+Resume === */}
        <div className="grid grid-cols-6 gap-2" style={{ height: '24%' }}>
          {/* Photo/Anime */}
          <BentoCard colSpan={1} rowSpan={1} className="p-0 overflow-hidden relative group">
            <Image src="/photo.jpg" alt="Profile" fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </BentoCard>

          {/* About (spans 2 columns) */}
          <BentoCard colSpan={2} rowSpan={1} className="col-span-2 flex flex-col justify-between p-3">
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
        <div className="flex-shrink-0">
          <HorizontalSocialBar />
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
