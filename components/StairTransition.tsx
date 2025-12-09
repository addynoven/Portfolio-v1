"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";
import Stair from "./Stair";

const StairTransition = () => {
  const pathname = usePathname();
  const isFirstMount = useRef(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Skip the first mount - LoadingScreen handles the initial animation
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    // Trigger animation on subsequent navigations
    setShouldAnimate(true);
    const timer = setTimeout(() => setShouldAnimate(false), 1500); // Reset after animation completes
    return () => clearTimeout(timer);
  }, [pathname]);

  // Don't render stair animation on initial load
  if (!shouldAnimate) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-[60] flex">
          <Stair />
        </div>
        <motion.div
          className="h-screen w-screen bg-primary fixed top-0 left-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              delay: 1,
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
        />
      </div>
    </AnimatePresence>
  );
};

export default StairTransition;
