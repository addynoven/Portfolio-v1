"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpeechBubbleProps {
  message: string | null;
  position: { x: number; y: number };
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ message, position }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 10 }}
        className="fixed z-[10000] pointer-events-none"
        style={{
          left: position.x - 60,
          top: position.y - 50,
        }}
      >
        <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-xl text-sm font-medium shadow-lg border border-UserAccent/30 max-w-[150px] text-center">
          {message}
          {/* Speech bubble tail */}
          <div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid white",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpeechBubble;
