"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const PersonalityCard = () => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 group h-full"
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

      {/* Arrow Button */}
      <div className="absolute bottom-2 right-2 bg-white text-black p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20">
        <FaArrowRight className="w-2.5 h-2.5" />
      </div>

      {/* Mood Text */}
      <div className="absolute bottom-2 left-2 z-20">
        <p className="text-[8px] text-gray-400 font-mono uppercase tracking-widest">Mood</p>
        <p className="text-xs font-bold text-white italic">"Building cool stuff."</p>
      </div>
    </motion.div>
  );
};

export default PersonalityCard;
