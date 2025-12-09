"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { FullScreenScramble } from "./FullScreenScramble";
import { Scrambler } from "@/lib/scramble-utils";
import { DissolveTransition } from "./DissolveTransition";
import { MultilingualGreeting } from "./MultilingualGreeting";

// Phases (sequential, no overlap issues):
// 1. chaos: Full screen scrambled text
// 2. concentrate: "NEONVERSE" forms in center
// 3. brand: "NEONVERSE" -> "NEON" 
// 4. neonDot: "NEON" -> "Neon." (proper casing transition)
// 5. greeting: Multilingual greeting cycle "Hello Neon." with shape-shifting n
// 6. logoFading: "Neon." fades out (solid bg still visible)
// 7. dissolving: Dissolve effect plays ON TOP of solid bg
// 8. done: Loader completely removed
type Phase = "chaos" | "concentrate" | "brand" | "neonDot" | "greeting" | "logoFading" | "dissolving" | "done";

const LoadingScreen = () => {
  const { theme } = useTheme();
  const [phase, setPhase] = useState<Phase>("chaos");
  const [displayText, setDisplayText] = useState("");
  const scramblerRef = useRef<Scrambler | null>(null);

  // Callbacks for phase transitions
  const handleGreetingComplete = () => {
    setPhase("logoFading");
    // After 1s fade, start dissolving
    setTimeout(() => setPhase("dissolving"), 1000);
  };

  useEffect(() => {
    // Initialize Scrambler
    scramblerRef.current = new Scrambler((text) => setDisplayText(text));

    // TIMELINE - Clear sequential phases
    // 0s: Chaos starts
    
    // 2.0s: Start forming "NEONVERSE"
    const timer1 = setTimeout(() => {
      setPhase("concentrate");
      scramblerRef.current?.setText("NEONVERSE", 60);
    }, 2000);

    // 4.0s: Shrink to "NEON"
    const timer2 = setTimeout(() => {
      setPhase("brand");
      scramblerRef.current?.setText("NEON", 60);
    }, 4000);

    // 5.0s: Transition to "Neon." (proper casing)
    const timer3 = setTimeout(() => {
      setPhase("neonDot");
    }, 5000);

    // 6.0s: Start multilingual greeting cycle (Neon. moves to make space)
    const timer4 = setTimeout(() => {
      setPhase("greeting");
    }, 6000);

    // Note: logoFading and dissolving are triggered by callbacks, not fixed timers

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleDissolveComplete = () => {
    setPhase("done");
  };

  // Don't render anything after done
  if (phase === "done") return null;

  const showSolidBg = true;
  const showScrambledLogo = phase === "concentrate" || phase === "brand";
  const showNeonDot = phase === "neonDot";
  const showGreeting = phase === "greeting";
  const showLogoFading = phase === "logoFading";
  const showDissolve = phase === "dissolving";

  return (
    <>
      {/* Solid Background - ALWAYS visible until done (prevents FOUC) */}
      {showSolidBg && (
        <div className="fixed inset-0 z-[99] bg-white dark:bg-[#0a0a0a]">
          {/* Background Chaos */}
          <AnimatePresence>
            {phase === "chaos" && <FullScreenScramble />}
          </AnimatePresence>
        </div>
      )}

      {/* Central Text - Scrambled Logo (NEONVERSE -> NEON) */}
      <AnimatePresence>
        {showScrambledLogo && (
          <motion.div
            key="scrambled-logo"
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 dark:text-white"
            >
              {displayText}
              <span className="text-UserAccent inline-block animate-pulse">.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Neon. Phase - Shows "Neon." centered, then animates position for greeting */}
      <AnimatePresence>
        {showNeonDot && (
          <motion.div
            key="neon-dot-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            <motion.div
              layoutId="neon-brand"
              className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 dark:text-white"
            >
              Neon<span className="text-UserAccent">.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multilingual Greeting Phase - Neon. slides right to make space */}
      <AnimatePresence>
        {showGreeting && (
          <MultilingualGreeting onComplete={handleGreetingComplete} />
        )}
      </AnimatePresence>

      {/* Logo Fading Phase - shows "Neon." fading on solid bg */}
      {showLogoFading && (
        <motion.div
          className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 dark:text-white">
            Neon<span className="text-[#22c55e]">.</span>
          </div>
        </motion.div>
      )}

      {/* Dissolve Transition - ON TOP of solid bg, dissolves organically */}
      <DissolveTransition 
        isActive={showDissolve} 
        duration={5000}
        onComplete={handleDissolveComplete}
      />
    </>
  );
};

export default LoadingScreen;
