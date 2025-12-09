"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSectionTransition } from "./SectionTransitionContext";

const SectionStairTransition = () => {
  const { theme } = useTheme();
  const { isTransitioning, completeTransition } = useSectionTransition();
  const [phase, setPhase] = useState<"idle" | "closing" | "opening">("idle");

  useEffect(() => {
    if (isTransitioning && phase === "idle") {
      // Start closing animation (stairs slide down)
      setPhase("closing");
    }
  }, [isTransitioning, phase]);

  const handleClosingComplete = () => {
    // Once fully covered, complete the transition (scroll) and start opening
    completeTransition();
    setPhase("opening");
  };

  const handleOpeningComplete = () => {
    // Animation fully done
    setPhase("idle");
  };

  if (phase === "idle") return null;

  const totalStairs = 6;
  const reverseIndex = (index: number) => totalStairs - index - 1;

  return (
    <div className="fixed inset-0 z-40 flex pointer-events-none">
      {[...Array(totalStairs)].map((_, index) => (
        <motion.div
          key={index}
          className="h-full w-full relative"
          style={{
            backgroundColor:
              theme === "light"
                ? `hsl(0, 0%, ${100 - index * 5}%)`
                : `hsl(240, 10%, ${4 + index * 4}%)`,
          }}
          initial={{ y: phase === "closing" ? "-100%" : "0%" }}
          animate={{ y: phase === "closing" ? "0%" : "-100%" }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: reverseIndex(index) * 0.1,
          }}
          onAnimationComplete={
            index === 0
              ? phase === "closing"
                ? handleClosingComplete
                : handleOpeningComplete
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default SectionStairTransition;
