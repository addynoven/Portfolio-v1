"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Stair animation variants
const StairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
};

const reverseIndex = (index: number) => {
  const totalStairs = 6;
  return totalStairs - index - 1;
};

const LoadingScreen = () => {
  const [phase, setPhase] = useState<"loading" | "stairs" | "done">("loading");

  useEffect(() => {
    // Phase 1: Show loading screen for 2 seconds
    const loadingTimer = setTimeout(() => {
      setPhase("stairs");
    }, 2000);

    // Phase 2: Show stairs animation, then done
    const stairsTimer = setTimeout(() => {
      setPhase("done");
    }, 3000); // 2s loading + 1s stairs

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(stairsTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {/* Phase 1: Loading Screen */}
      {phase === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-white"
            >
              Neon<span className="text-UserAccent">.</span>
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-UserAccent rounded-full"
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-sm"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Phase 2: Stair Transition */}
      {phase === "stairs" && (
        <motion.div
          key="stairs"
          className="fixed inset-0 z-[100] flex pointer-events-none"
        >
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: reverseIndex(index) * 0.1,
              }}
              className="h-full w-full bg-white relative"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
