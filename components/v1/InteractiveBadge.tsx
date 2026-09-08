"use client";

import { memo } from "react";
import Lanyard from "@/components/reactbits/Components/Lanyard";
import BadgeCard from "@/components/v1/BadgeCard";
import { cn } from "@/lib/utils";
import { usePerformance } from "@/hooks/usePerformance";
import { Sparkles, Move3d } from "lucide-react";

interface InteractiveBadgeProps {
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  avatarUrl?: string;
  className?: string;
}

const InteractiveBadge = memo(function InteractiveBadge({
  name = "Neon Stain",
  title = "Full Stack Developer",
  handle = "neonstain",
  status = "Available",
  avatarUrl = "/photo.jpg",
  className,
}: InteractiveBadgeProps) {
  const { isLowEnd, hasGPU } = usePerformance();
  const showStaticFallback = isLowEnd || !hasGPU;

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="badge"
      className={cn(
        "relative scroll-mt-24 w-full flex flex-col items-center justify-center py-12 overflow-hidden",
        className
      )}
    >
      {/* Section Title & Micro Badge */}
      <div className="text-center mb-6 z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 shadow-lg mb-3">
          <Sparkles className="w-3.5 h-3.5 text-UserAccent" />
          <span className="text-xs font-mono font-medium text-UserAccent uppercase tracking-wider">
            Interactive 3D Artifact
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Developer <span className="text-UserAccent">Access Pass</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60 flex items-center justify-center gap-2 font-mono">
          <Move3d className="w-4 h-4 text-UserAccent animate-pulse" />
          <span>{showStaticFallback ? "VIP Pass (GPU unavailable)" : "Click & drag anywhere to swing badge with physics"}</span>
        </p>
      </div>

      {/* 3D Physics Scene or Fallback */}
      <div className="w-full flex justify-center items-center relative z-10">
        {showStaticFallback ? (
          <div className="my-6 transform hover:scale-105 transition-transform duration-300">
            <BadgeCard
              name={name}
              title={title}
              handle={handle}
              status={status}
              avatarUrl={avatarUrl}
              onContactClick={scrollToContact}
            />
          </div>
        ) : (
          <Lanyard
            position={[0, -0.4, 7.5]}
            fov={30}
            cardWidth={2.1}
            cardHeight={3.15}
            bandColor="#00ff99"
            stringLength={1.8}
            cardContent={
              <BadgeCard
                name={name}
                title={title}
                handle={handle}
                status={status}
                avatarUrl={avatarUrl}
                onContactClick={scrollToContact}
              />
            }
          />
        )}
      </div>
    </section>
  );
});

export default InteractiveBadge;
