"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiCheckCircle, FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: string;
  number: string;
  date: string;
  points: {
    text: string;
    highlight?: string;
    link?: { label: string; url: string };
  }[];
}

const LOGS: LogEntry[] = [
  {
    id: "log-58",
    number: "Grind Log #058",
    date: "September 1, 2026",
    points: [
      {
        text: "Added the Floating Dock Menu component to ",
        highlight: "GreatUI",
        link: { label: "Floating Dock Menu", url: "/v4/components" },
      },
      {
        text: "Made a few more components for ",
        highlight: "GreatUI.",
      },
    ],
  },
  {
    id: "log-57",
    number: "Grind Log #057",
    date: "August 28, 2026",
    points: [
      {
        text: "Benchmarked PostgreSQL JSONB indexing vs Redis hashes for ephemeral telemetry caching.",
      },
      {
        text: "Reduced connection churn by pooling WebSocket clients through Go channel multiplexers.",
      },
    ],
  },
  {
    id: "log-56",
    number: "Grind Log #056",
    date: "August 24, 2026",
    points: [
      {
        text: "Refactored WebRTC peer streaming chunk size down to 64KB for optimal TCP backpressure handling.",
      },
      {
        text: "Isolated audio player playback context strictly within V3 layout.",
      },
    ],
  },
  {
    id: "log-55",
    number: "Grind Log #055",
    date: "August 20, 2026",
    points: [
      {
        text: "Audited CSS variable generation against WCAG AAA contrast guidelines across light & dark themes.",
      },
      {
        text: "Integrated Instrument Serif publication hierarchy across all markdown readers.",
      },
    ],
  },
];

// Fixed 45 bars — heights are absolute pixel values, never change
const TOTAL_BARS = 45;
const BAR_HEIGHTS = [
  12, 16, 14, 18, 22, 15, 20, 25, 28, 24,
  30, 35, 32, 28, 36, 40, 38, 44, 42, 48,
  52, 58, 54, 46, 42, 38, 34, 30, 26, 22,
  25, 20, 18, 24, 28, 22, 19, 16, 14, 18,
  15, 12, 14, 16, 12,
];

const ACTIVE_HEIGHT = 58;
const BAR_WIDTH = 4;
const CONTAINER_HEIGHT = 72; // fixed px — all bars align to bottom within this

export function LearningLog() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Map each log to a specific bar index on the timeline
  const logBarPositions = [21, 17, 13, 8];
  const activeBarIndex = logBarPositions[currentIndex] ?? 21;
  const currentLog = LOGS[currentIndex];

  const handlePrev = () => {
    if (currentIndex < LOGS.length - 1) {
      setDirection(-1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex > 0) {
      setDirection(1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      data-section="Logs"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm font-sans"
    >
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          Learning Log
        </h2>
      </div>

      {/* Log Content Card — locked fixed height so card size NEVER shifts */}
      <div className="w-full font-sans mb-6 h-[148px] sm:h-[134px] relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentLog.id}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full flex flex-col justify-start"
          >
            <span className="text-sm font-bold tracking-wide text-neutral-900 dark:text-neutral-100 select-none mb-2 block">
              {currentLog.number}
            </span>

            <div className="flex flex-col gap-2.5">
              {currentLog.points.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
                >
                  <FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <div>
                    <span>{point.text}</span>
                    {point.highlight && (
                      <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {point.highlight}
                      </strong>
                    )}
                    {point.link && (
                      <span>
                        :{" "}
                        <Link
                          href={point.link.url}
                          className="inline font-medium text-rose-500 hover:text-rose-600 hover:underline dark:text-rose-400 dark:hover:text-rose-300"
                        >
                          {point.link.label}
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Bar Scrubber Section */}
      <div className="flex w-full flex-col gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
        {/* Date header with prev/next buttons */}
        <div className="flex w-full items-center justify-between px-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex === LOGS.length - 1}
            className="shrink-0 cursor-pointer rounded-xl border border-neutral-200 p-2 text-neutral-500 transition-all hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 active:scale-90"
            title="Previous Day"
          >
            <FiArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex flex-1 h-6 items-center justify-center font-mono select-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentLog.date}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="text-center text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
              >
                {currentLog.date}
              </motion.span>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === 0}
            className="shrink-0 cursor-pointer rounded-xl border border-neutral-200 p-2 text-neutral-500 transition-all hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 active:scale-90"
            title="Next Day"
          >
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Frequency Bars — FIXED SIZE container, bars align to bottom */}
        <div className="w-full px-0 mt-2">
          <div className="flex w-full flex-col items-center">
            <div
              className="relative flex w-full items-end justify-center overflow-hidden select-none"
              style={{
                height: `${CONTAINER_HEIGHT}px`,
                WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              }}
            >
              <div className="flex items-end gap-[3px]" style={{ height: `${CONTAINER_HEIGHT}px` }}>
                {Array.from({ length: TOTAL_BARS }).map((_, idx) => {
                  const isActive = idx === activeBarIndex;
                  const height = isActive ? ACTIVE_HEIGHT : BAR_HEIGHTS[idx];
                  const logMatchIdx = logBarPositions.indexOf(idx);

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (logMatchIdx !== -1) {
                          setDirection(logMatchIdx > currentIndex ? -1 : 1);
                          setCurrentIndex(logMatchIdx);
                        }
                      }}
                      className="group flex items-end justify-center border-0 bg-transparent p-0 outline-none cursor-pointer"
                      style={{ width: `${BAR_WIDTH * 2}px`, height: `${CONTAINER_HEIGHT}px` }}
                      title={logMatchIdx !== -1 ? LOGS[logMatchIdx].date : `Day #${idx + 1}`}
                    >
                      <motion.span
                        className={`block rounded-t-full ${
                          isActive
                            ? "bg-red-500 dark:bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                            : logMatchIdx !== -1
                            ? "bg-neutral-400 dark:bg-neutral-500 group-hover:bg-neutral-600 dark:group-hover:bg-neutral-300"
                            : "bg-neutral-300/40 dark:bg-neutral-700/30 group-hover:bg-neutral-400 dark:group-hover:bg-neutral-600"
                        }`}
                        style={{ width: `${BAR_WIDTH}px` }}
                        animate={{ height }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote below the scrubber */}
        <div className="mt-4 flex flex-col items-center justify-center text-center w-full">
          <p className="text-xs italic text-neutral-500 dark:text-neutral-400 font-serif text-[13px]">
            &ldquo;Life is Enjoy&rdquo;
          </p>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <span>— Mahan Admi (WanderDa)</span>
            <FiArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
