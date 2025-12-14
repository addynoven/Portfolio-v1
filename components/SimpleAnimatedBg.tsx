"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface SimpleAnimatedBgProps {
  className?: string;
  // Different patterns
  variant?: "gradient" | "dots" | "grid" | "glow";
}

/**
 * Simple animated background using Framer Motion CSS animations.
 * Designed for low-end devices - no WebGL, no heavy calculations.
 */
const SimpleAnimatedBg = memo(function SimpleAnimatedBg({ 
  className = "",
  variant = "gradient"
}: SimpleAnimatedBgProps) {
  
  if (variant === "dots") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-UserAccent" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        {/* Subtle moving glow */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-UserAccent/10 blur-[100px]"
          animate={{
            x: ["-20%", "80%", "-20%"],
            y: ["-20%", "60%", "-20%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Static grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-UserAccent" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-UserAccent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Animated pulsing glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-UserAccent/15 blur-[60px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[80px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[150px] h-[150px] rounded-full bg-UserAccent/10 blur-[50px] -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  // Default: gradient
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-UserAccent/10 via-transparent to-cyan-500/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Static corner accents */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-UserAccent/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
    </div>
  );
});

export default SimpleAnimatedBg;
