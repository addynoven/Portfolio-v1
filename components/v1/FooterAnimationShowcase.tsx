"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSiteName } from "@/hooks/useSiteName";

// Animation phases for the mini showcase
type MiniPhase = "scramble" | "neonverse" | "neon" | "letterChange" | "final" | "pause";

// Scramble characters (subset of the main animation)
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*んñнν";

const FooterAnimationShowcase = () => {
  const siteName = useSiteName(false); // Get first name only
  const [phase, setPhase] = useState<MiniPhase>("scramble");
  const [displayText, setDisplayText] = useState("");
  const [letterStep, setLetterStep] = useState(0);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate scrambled text
  const generateScramble = (length: number) => {
    return Array.from({ length }, () =>
      scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
    ).join("");
  };

  // Main animation loop
  useEffect(() => {
    let mounted = true;

    const runAnimation = async () => {
      if (!mounted) return;

      // Phase 1: Scramble (0.8s)
      setPhase("scramble");
      scrambleIntervalRef.current = setInterval(() => {
        setDisplayText(generateScramble(8));
      }, 50);

      await new Promise((r) => setTimeout(r, 800));
      if (!mounted) return;
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

      // Phase 2: NAMEVERSE (1s)
      setPhase("neonverse");
      setDisplayText(siteName.toUpperCase() + "VERSE");

      await new Promise((r) => setTimeout(r, 1000));
      if (!mounted) return;

      // Phase 3: NAME uppercase (0.8s)
      setPhase("neon");
      setDisplayText(siteName.toUpperCase());

      await new Promise((r) => setTimeout(r, 800));
      if (!mounted) return;

      // Phase 4: Letter-by-letter change
      setPhase("letterChange");
      setLetterStep(0);

      // Animate each letter of the name
      for (let i = 1; i <= siteName.length; i++) {
        await new Promise((r) => setTimeout(r, 300));
        if (!mounted) return;
        setLetterStep(i);
      }

      // Phase 5: Final name (1s)
      setPhase("final");
      setDisplayText(siteName);

      await new Promise((r) => setTimeout(r, 1000));
      if (!mounted) return;

      // Phase 6: Pause before loop (1.5s)
      setPhase("pause");

      await new Promise((r) => setTimeout(r, 1500));
      if (!mounted) return;

      // Loop
      runAnimation();
    };

    runAnimation();

    return () => {
      mounted = false;
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    };
  }, [siteName]); // Re-run when siteName changes

  // Render the appropriate phase
  const renderContent = () => {
    switch (phase) {
      case "scramble":
        return (
          <motion.span
            key="scramble"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-slate-400 dark:text-slate-500"
          >
            {displayText}
          </motion.span>
        );

      case "neonverse":
        return (
          <motion.span
            key="neonverse"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="font-black tracking-tight text-slate-700 dark:text-white"
          >
            {displayText}
            <span className="text-UserAccent">.</span>
          </motion.span>
        );

      case "neon":
        return (
          <motion.span
            key="neon"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="font-black tracking-tight text-slate-700 dark:text-white"
          >
            {displayText}
            <span className="text-UserAccent">.</span>
          </motion.span>
        );

      case "letterChange":
        // Generate uppercase and formatted versions dynamically
        const upperLetters = siteName.toUpperCase().split('');
        const formattedLetters = siteName.split('').map((c, i) => 
          i === 0 ? c.toUpperCase() : c.toLowerCase()
        );
        return (
          <motion.span
            key="letterChange"
            className="font-black tracking-tight"
          >
            {upperLetters.map((letter, i) => (
              <motion.span
                key={i}
                className={
                  i < letterStep
                    ? "text-slate-700 dark:text-white"
                    : i === letterStep - 1
                    ? "text-UserAccent"
                    : "text-slate-700 dark:text-white"
                }
                animate={
                  i === letterStep - 1
                    ? { y: [0, -2, 0], scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ duration: 0.2 }}
              >
                {i < letterStep ? formattedLetters[i] : letter}
              </motion.span>
            ))}
            <span className="text-UserAccent">.</span>
          </motion.span>
        );

      case "final":
      case "pause":
        return (
          <motion.span
            key="final"
            initial={{ opacity: 1 }}
            animate={phase === "pause" ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
            transition={phase === "pause" ? { duration: 1.5, repeat: Infinity } : {}}
            className="font-black tracking-tight text-slate-700 dark:text-white"
          >
            {siteName}<span className="text-UserAccent">.</span>
          </motion.span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center h-10 overflow-hidden">
      <div className="text-lg sm:text-xl">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
};

export default FooterAnimationShowcase;
