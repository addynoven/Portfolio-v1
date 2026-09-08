"use client";

import Image from "next/image";
import { FaBolt } from "react-icons/fa6";

export default function CurrentMoodCard() {
  return (
    <section 
      className="col-span-12 md:col-span-6 lg:col-span-3 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-4 backdrop-blur-md flex flex-col justify-between relative overflow-hidden shadow-lg min-h-[300px]"
      data-purpose="current-mood-card"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
          // CURRENT MOOD
        </span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0c221b] border border-[#184435] text-[9px] font-medium text-[#00FF87] glow-green-tag">
          <FaBolt className="text-[8px]" />
          <span>Flow State</span>
        </div>
      </div>

      {/* Manga / Anime Character Visual Area with Sparkles */}
      <div className="relative w-full h-36 flex items-center justify-center my-1 overflow-hidden rounded-lg bg-gradient-to-b from-[#0e1715]/40 to-black/70 group">
        {/* Floating Sparkle Stars */}
        <span className="absolute top-2 left-6 text-white text-[10px] opacity-70 animate-pulse">✦</span>
        <span className="absolute top-6 right-7 text-[#00FF87] text-xs opacity-65 animate-ping">✦</span>
        <span className="absolute bottom-5 left-8 text-white text-[8px] opacity-50">✦</span>
        <span className="absolute top-10 left-12 text-white text-[8px] opacity-40">✧</span>

        {/* Anime Character Artwork with scanline and grayscale styling */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <Image
            src="/photo.jpg"
            alt="Aditya anime mood"
            width={144}
            height={144}
            className="w-full h-full object-cover rounded-full grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
          <div 
            className="absolute inset-0 rounded-full pointer-events-none opacity-25"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 51%)",
              backgroundSize: "100% 4px",
            }}
          />
        </div>
      </div>

      {/* Bottom Mood Quote */}
      <div className="pt-2 border-t border-[#121f1c] text-center">
        <p className="text-[10px] text-[#c6d7d4] italic">
          &ldquo;Deep in flow &amp; building cool stuff.&rdquo;{" "}
          <span className="text-[#00FF87] font-sans not-italic font-semibold">— Aditya</span>
        </p>
      </div>
    </section>
  );
}
