"use client";

import { cn } from "@/lib/utils";

interface WaterFillEffectProps {
  isActive: boolean;
  tiltY?: number;
  className?: string;
}

/**
 * Shared water wave fill effect component
 * Used by Nav links and Button components
 */
const WaterFillEffect = ({ isActive, tiltY = 0, className }: WaterFillEffectProps) => {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 transition-all duration-500 ease-out overflow-hidden",
        isActive ? "h-full" : "h-0",
        className
      )}
      style={{
        transform: `skewY(${tiltY * 0.3}deg)`,
      }}
    >
      {/* Primary wave */}
      <svg
        className="absolute top-0 left-0 w-[200%] h-6 -translate-y-[85%]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          animation: "wave 1.5s linear infinite",
        }}
      >
        <path
          d="M0,60 C100,90 200,30 300,60 C400,90 500,30 600,60 C700,90 800,30 900,60 C1000,90 1100,30 1200,60 L1200,120 L0,120 Z"
          className="fill-UserAccent"
        />
      </svg>
      
      {/* Secondary wave for depth */}
      <svg
        className="absolute top-0 left-0 w-[200%] h-5 -translate-y-[70%] opacity-60"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          animation: "wave 2s linear infinite reverse",
        }}
      >
        <path
          d="M0,50 C150,80 250,20 400,50 C550,80 650,20 800,50 C950,80 1050,20 1200,50 L1200,120 L0,120 Z"
          className="fill-UserAccent"
        />
      </svg>
      
      {/* Solid fill body */}
      <div className="absolute inset-0 top-2 bg-UserAccent" />
    </div>
  );
};

export default WaterFillEffect;
