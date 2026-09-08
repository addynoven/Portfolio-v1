"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiArrowUp, FiCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingDock() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("Home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (pathname === "/v4/about") setActiveSection("About Me");
    else if (pathname === "/v4/projects") setActiveSection("Projects");
    else if (pathname === "/v4/components") setActiveSection("Components");
    else if (pathname?.startsWith("/v4/blogs")) setActiveSection("Blogs");
    else if (pathname === "/v4/stats") setActiveSection("Stats");
    else setActiveSection("Home");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;
      setScrollProgress(progress);

      if (pathname === "/v4" || pathname === "/v4/") {
        const sections = document.querySelectorAll("[data-section]");
        let current = "Home";
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = section.getAttribute("data-section") || current;
          }
        });
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isScrolled = scrollProgress > 0.05;
  const radius = 6.5;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - scrollProgress * circumference;

  return (
    <motion.aside
      aria-label="Scroll Status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
    >
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 text-neutral-900 border border-neutral-200/80 shadow-xl backdrop-blur-md dark:bg-[#1c1c1c]/90 dark:text-neutral-200 dark:border-neutral-700/80 text-xs font-mono tracking-wide cursor-pointer transition-colors group"
      >
        <AnimatePresence mode="wait">
          {isScrolled ? (
            <motion.div
              key="arrow"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowUp className="w-3.5 h-3.5 text-blue-500 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiCircle className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={activeSection}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="text-[13px] font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors"
          >
            {activeSection}
          </motion.span>
        </AnimatePresence>

        {/* Circular SVG Scroll Progress Indicator */}
        <div className="relative w-4 h-4 flex items-center justify-center ml-0.5">
          <svg className="w-4 h-4 -rotate-90" viewBox="0 0 16 16">
            <circle
              cx="8"
              cy="8"
              r={radius}
              className="text-neutral-200 dark:text-neutral-700/80 stroke-current"
              strokeWidth="1.8"
              fill="transparent"
            />
            <motion.circle
              cx="8"
              cy="8"
              r={radius}
              className="text-blue-500 dark:text-white stroke-current"
              strokeWidth="1.8"
              fill="transparent"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: strokeOffset }}
              transition={{ duration: 0.1, ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.button>
    </motion.aside>
  );
}
