"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaArrowRight, FaDownload, FaStar, FaFire } from "react-icons/fa6";

interface HeroProfileCardProps {
  onContactClick?: () => void;
}

export default function HeroProfileCard({ onContactClick }: HeroProfileCardProps) {
  return (
    <section 
      className="col-span-12 lg:col-span-5 relative rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-4.5 backdrop-blur-md flex flex-col justify-between overflow-hidden group shadow-lg min-h-[300px]"
      data-purpose="hero-profile-card"
    >
      {/* Planetary Rim Graphic inside Hero Card */}
      <div 
        className="absolute -top-24 -right-16 w-[380px] h-[380px] pointer-events-none z-0 select-none overflow-hidden opacity-75"
        style={{
          maskImage: "radial-gradient(circle at 62% 38%, black 42%, rgba(0, 0, 0, 0.85) 60%, transparent 80%)",
        }}
      >
        <Image
          src="/v2/planet.png"
          alt="Cosmic planet horizon"
          width={380}
          height={380}
          className="w-full h-full object-cover rounded-full contrast-125 brightness-105 transform rotate-45 scale-105 filter drop-shadow-[0_0_35px_rgba(0,255,135,0.3)]"
          priority
        />
      </div>

      {/* Top Status Row */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
          // DEVELOPER × PROBLEM SOLVER
        </span>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0c221b] border border-[#184435] text-[9px] font-medium text-[#00FF87] glow-green-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
          <span>Available for work</span>
        </div>
      </div>

      {/* Headline & Bio Area with Script Flourish */}
      <div className="relative z-10 mt-2">
        <h1 className="text-[28px] md:text-[32px] font-extrabold tracking-tight text-white leading-[1.1]">
          Hi, I&apos;m<br />
          Aditya <span className="text-[#00FF87] text-glow">Sahu</span>
        </h1>
        <p className="text-[11px] font-semibold text-[#00FF87] mt-1 tracking-wide">
          Full-Stack Engineer &amp; Systems Designer
        </p>
        <p className="text-[10px] text-[#7a918e] mt-2 leading-relaxed max-w-[275px]">
          Bridging the gap between distributed backend logic and responsive frontend aesthetics. Building systems you can reason about under pressure.
        </p>

        {/* Handwritten rotated slogan flourish */}
        <div className="absolute right-2 top-2 font-script text-[#00FF87] text-[22px] font-bold -rotate-12 leading-none text-right select-none drop-shadow-[0_0_8px_rgba(0,255,135,0.4)] pointer-events-none">
          Build<br />Learn<br />Ship<br />Repeat
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 my-3 relative z-10">
        <a
          href="mailto:dmcbaditya@gmail.com"
          onClick={onContactClick}
          className="h-7 px-3.5 rounded-full bg-[#00FF87] text-black font-bold text-xs flex items-center gap-1.5 glow-green-btn hover:bg-[#1aff96] transition-transform active:scale-95"
        >
          <span>Let&apos;s Talk</span>
          <FaArrowRight className="text-[10px]" />
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="h-7 px-3 rounded-full bg-[#0c1413] border border-[#1b2f2a] text-[11px] font-medium text-[#c0d3d0] hover:border-[#27443e] hover:text-white flex items-center gap-1.5 transition"
        >
          <FaDownload className="text-[10px] text-[#708481]" />
          <span>Download Resume</span>
        </a>
      </div>

      {/* Bottom Telemetry & Socials Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#121f1c] relative z-10">
        <div className="flex items-center gap-2.5 text-xs text-[#708481]">
          <a href="https://github.com/addynoven" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/addynoven" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/addynoven" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="X (Twitter)">
            <FaXTwitter />
          </a>
          <a href="mailto:dmcbaditya@gmail.com" className="hover:text-white transition" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        {/* Telemetry Pill Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#091110] border border-[#152622] text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span className="font-bold text-white">699+</span>
            <span className="text-[8px] text-[#697d7a]">Commits</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#091110] border border-[#152622] text-[9px]">
            <FaStar className="text-[9px] text-yellow-400" />
            <span className="font-bold text-white">30</span>
            <span className="text-[8px] text-[#697d7a]">Repos</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#091110] border border-[#152622] text-[9px]">
            <FaFire className="text-[9px] text-orange-400" />
            <span className="font-bold text-white">7 Days</span>
            <span className="text-[8px] text-[#697d7a]">Streak</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#091110] border border-[#152622] text-[9px]">
            <span className="text-[9px] text-[#00FF87]">▲</span>
            <span className="font-bold text-white">2026</span>
            <span className="text-[8px] text-[#697d7a]">Since</span>
          </div>
        </div>
      </div>
    </section>
  );
}
