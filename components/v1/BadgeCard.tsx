"use client";

import { memo } from "react";
import { Cpu, ShieldCheck, Wifi, QrCode } from "lucide-react";

interface BadgeCardProps {
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  avatarUrl?: string;
  onContactClick?: () => void;
}

export const BadgeCard = memo(function BadgeCard({
  name = "Neon Stain",
  title = "Full Stack Developer",
  handle = "neonstain",
  status = "Available",
  avatarUrl = "/photo.jpg",
  onContactClick,
}: BadgeCardProps) {
  return (
    <div
      style={{
        width: "320px",
        height: "480px",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#14141e] via-[#0c0c14] to-[#06060a] border-2 border-UserAccent/60 shadow-[0_0_35px_rgba(0,255,153,0.25)] flex flex-col justify-between p-5 text-white font-mono"
    >
      {/* Holographic background sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-UserAccent/[0.07] to-cyan-400/[0.08] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-UserAccent/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header & Slot */}
      <div className="relative z-10">
        {/* Lanyard punch hole simulation */}
        <div className="w-16 h-3 mx-auto mb-3 rounded-full bg-black/90 border border-white/20 shadow-inner flex items-center justify-center">
          <div className="w-12 h-1 rounded-full bg-white/10" />
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-UserAccent" />
            <span className="text-[11px] font-bold tracking-widest text-UserAccent uppercase">
              VIP PASS // 2026
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
            <Wifi className="w-3 h-3 text-UserAccent animate-pulse" />
            <span>NFC ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Center Profile Info */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto">
        {/* Avatar */}
        <div className="relative mb-3.5">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-UserAccent shadow-[0_0_20px_rgba(0,255,153,0.3)] bg-black/60 relative">
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-black border-2 border-UserAccent flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-UserAccent" />
          </div>
        </div>

        {/* Identity Details */}
        <h3 className="text-xl font-extrabold tracking-tight text-white mb-0.5">
          {name}
        </h3>
        <p className="text-xs text-UserAccent font-medium mb-1 tracking-wide">
          {title}
        </p>
        <span className="text-[11px] text-white/50 tracking-wider">
          @{handle}
        </span>

        {/* Status Pill */}
        <div className="mt-3 px-3 py-1 rounded-full bg-UserAccent/10 border border-UserAccent/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-UserAccent animate-ping" />
          <span className="text-[10px] font-bold text-UserAccent tracking-widest uppercase">
            {status}
          </span>
        </div>
      </div>

      {/* Footer Specs & Barcode */}
      <div className="relative z-10 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] text-white/60 mb-2">
          <div>
            <span className="text-white/40 block text-[9px]">CLEARANCE</span>
            <span className="font-bold text-UserAccent">LEVEL-9</span>
          </div>
          <div>
            <span className="text-white/40 block text-[9px]">SPEC</span>
            <span className="font-bold text-white">SYSTEMS / AI</span>
          </div>
          <div className="text-right">
            <span className="text-white/40 block text-[9px]">ACCESS ID</span>
            <span className="font-bold text-white">#NS-8052</span>
          </div>
        </div>

        {/* Simulated Barcode */}
        <div className="flex items-center justify-between gap-2 pt-1.5 opacity-80">
          <div className="h-6 flex-1 flex items-stretch gap-[2px]">
            {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2].map((w, i) => (
              <div
                key={i}
                className="bg-white/70 rounded-[0.5px]"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <QrCode className="w-6 h-6 text-UserAccent shrink-0" />
        </div>
      </div>
    </div>
  );
});

export default BadgeCard;
