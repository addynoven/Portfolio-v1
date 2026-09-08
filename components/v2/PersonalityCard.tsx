"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const PersonalityCard = () => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 group h-full shadow-sm hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300"
    >
      {/* Background Image */}
      <Image
        src="/photo.jpg"
        alt="Profile"
        fill
        className="object-cover object-top opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
      />

      {/* Scanline Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.15))`,
          backgroundSize: "100% 4px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

      {/* Waveform / Status at top */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 bg-UserAccent h-2 animate-pulse" />
          <span className="w-0.5 bg-UserAccent h-3 animate-bounce" />
          <span className="w-0.5 bg-UserAccent h-1.5 animate-pulse" />
          <span className="w-0.5 bg-UserAccent h-2.5 animate-bounce" />
        </div>
        <span className="text-[8px] font-mono text-gray-300">flow state</span>
      </div>

      {/* Mood Text */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
        <div>
          <p className="text-[8px] text-gray-400 font-mono uppercase tracking-widest">Current State</p>
          <p className="text-xs font-bold text-white italic">&ldquo;Deep in flow &amp; building cool stuff.&rdquo;</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalityCard;
