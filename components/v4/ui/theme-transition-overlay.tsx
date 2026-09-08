"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface TransitionState {
  x: number;
  y: number;
  targetTheme: "light" | "dark";
}

export default function V4ThemeTransitionOverlay() {
  const { setTheme } = useTheme();
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleTransition = (e: Event) => {
      const event = e as CustomEvent<TransitionState>;
      setTransition(event.detail);

      // Switch theme when expanding circle covers screen
      setTimeout(() => {
        setTheme(event.detail.targetTheme);
      }, 500);

      // Cleanup overlay
      setTimeout(() => {
        setTransition(null);
      }, 1100);
    };

    window.addEventListener("v4-theme-transition", handleTransition);
    return () =>
      window.removeEventListener("v4-theme-transition", handleTransition);
  }, [mounted, setTheme]);

  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          className="fixed inset-0 z-[99999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {/* Blur + desaturation layer */}
          <motion.div
            className="absolute inset-0 backdrop-blur-xl backdrop-grayscale-[0.5] bg-black/5 dark:bg-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />

          {/* Expanding circle from click origin */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: transition.x,
              top: transition.y,
              backgroundColor:
                transition.targetTheme === "light" ? "#f9fafb" : "#0a0a0a",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ width: 0, height: 0 }}
            animate={{ width: "300vmax", height: "300vmax" }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.25, 1, 0.5, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
