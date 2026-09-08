"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  FaHeart, 
  FaShuffle, 
  FaBackwardStep, 
  FaPlay, 
  FaPause, 
  FaForwardStep, 
  FaRepeat 
} from "react-icons/fa6";
import { useMusic } from "@/context/v3/music-context";

export default function NowPlayingCard() {
  const music = useMusic();
  const [liked, setLiked] = useState(false);
  const [localPlaying, setLocalPlaying] = useState(false);

  const isPlaying = music ? music.isPlaying : localPlaying;

  const handleTogglePlay = () => {
    if (music) {
      music.togglePlay();
    } else {
      setLocalPlaying((prev) => !prev);
    }
  };

  return (
    <section 
      className="col-span-12 md:col-span-6 lg:col-span-3 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-3.5 backdrop-blur-md flex flex-col justify-between shadow-lg min-h-[220px]"
      data-purpose="music-player-card"
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
          // NOW PLAYING
        </span>
        <button 
          onClick={() => setLiked(!liked)} 
          className={`transition hover:scale-110 ${liked ? "text-red-500" : "text-[#00FF87]"}`}
          aria-label="Like track"
        >
          <FaHeart className="text-xs" />
        </button>
      </div>

      {/* Album Art & Track Info */}
      <div className="flex items-center gap-3 my-1.5">
        <div className="w-12 h-12 rounded-xl border border-[#1c3c33] overflow-hidden relative shadow-md shrink-0">
          <Image
            src="/v2/astronaut-lofi.png"
            alt="Midnight Coding Lo-fi Beats"
            width={48}
            height={48}
            className={`w-full h-full object-cover ${isPlaying ? "scale-105" : "scale-100"} transition-transform duration-700`}
          />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white leading-snug">Midnight Coding</h4>
          <p className="text-[9px] text-[#6e827f]">Lo-fi Beats • Flow State</p>
        </div>
      </div>

      {/* Scrub Bar */}
      <div>
        <div className="w-full bg-[#13201d] h-1 rounded-full overflow-hidden mb-1">
          <div className="bg-[#00FF87] h-full w-[62%] rounded-full shadow-[0_0_6px_#00FF87]" />
        </div>
        <div className="flex justify-between text-[8px] font-mono text-[#6e827f]">
          <span>2:34</span>
          <span>4:12</span>
        </div>
      </div>

      {/* Media Controls */}
      <div className="flex items-center justify-between px-1 text-xs text-[#8ca09d]">
        <button className="hover:text-white transition" aria-label="Shuffle">
          <FaShuffle className="text-[10px]" />
        </button>
        <button className="hover:text-white transition" aria-label="Previous track">
          <FaBackwardStep className="text-xs" />
        </button>
        <button 
          onClick={handleTogglePlay}
          className="w-7 h-7 rounded-full bg-[#00FF87] text-black flex items-center justify-center glow-green-btn hover:scale-105 transition active:scale-95"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <FaPause className="text-[10px]" />
          ) : (
            <FaPlay className="text-[10px] ml-0.5" />
          )}
        </button>
        <button className="hover:text-white transition" aria-label="Next track">
          <FaForwardStep className="text-xs" />
        </button>
        <button className="hover:text-white transition" aria-label="Repeat">
          <FaRepeat className="text-[10px]" />
        </button>
      </div>
    </section>
  );
}
