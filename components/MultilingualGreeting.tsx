"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState, useEffect } from "react";

interface MultilingualGreetingProps {
  onComplete?: () => void;
}

// Language dataset with unique 'n' characters from different scripts
const words = [
  { text: "Hello", n: "n" },
  { text: "Hola", n: "ñ" },
  { text: "Bonjour", n: "n" },
  { text: "Ciao", n: "n" },
  { text: "Hallo", n: "n" },
  { text: "Olá", n: "n" },
  { text: "Hallå", n: "n" },
  { text: "Privet", n: "н" },
  { text: "Zdravstvuyte", n: "н" },
  { text: "Dobar dan", n: "н" },
  { text: "Cześć", n: "ń" },
  { text: "Ahoj", n: "ň" },
  { text: "Yassas", n: "ν" },
  { text: "Gamarjoba", n: "ნ" },
  { text: "Barev", n: "ն" },
  { text: "Konnichiwa", n: "ん" },
  { text: "Ni Hao", n: "n" },
  { text: "Annyeong", n: "ㄴ" },
  { text: "Sawasdee", n: "น" },
  { text: "Mingalaba", n: "န" },
  { text: "Suostei", n: "ន" },
  { text: "Sain uu", n: "н" },
  { text: "Namaste", n: "न" },
  { text: "Nomoshkar", n: "ন" },
  { text: "Vanakkam", n: "ன" },
  { text: "Namaskaram", n: "ന" },
  { text: "Sat Sri Akaal", n: "ਨ" },
  { text: "Namaskaram", n: "న" },
  { text: "Ayubowan", n: "න" },
  { text: "Marhaba", n: "ن" },
  { text: "Shalom", n: "נ" },
  { text: "Salaam", n: "ن" },
  { text: "Salam", n: "ن" },
  { text: "Jambo", n: "n" },
  { text: "Sawubona", n: "n" },
  { text: "Nno", n: "ṇ" },
];

const WORD_DURATION = 200; // 0.2s per word - slower for readability

export const MultilingualGreeting: React.FC<MultilingualGreetingProps> = ({
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const currentWord = words[currentIndex];

  // Delay showing greeting to allow smooth layout animation
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through words, then land on "Hello"
  useEffect(() => {
    if (isComplete || !showGreeting) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= words.length) {
          // Cycle complete - go back to "Hello" (index 0) and mark complete
          setIsComplete(true);
          clearInterval(timer);
          
          // Wait 0.5s on "Hello Neon." then trigger onComplete
          setTimeout(() => {
            onComplete?.();
          }, 500);
          
          return 0; // Back to "Hello"
        }
        return next;
      });
    }, WORD_DURATION);

    return () => clearInterval(timer);
  }, [isComplete, onComplete, showGreeting]);

  return (
    <>
      {/* Custom strong pulse animation for the dot */}
      <style jsx global>{`
        @keyframes strongPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 0 0 10px #DC2626, 0 0 20px #DC2626, 0 0 30px #DC2626;
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
            text-shadow: 0 0 5px #DC2626;
          }
        }
        .red-pulse-dot {
          animation: strongPulse 0.4s ease-in-out infinite;
          color: #DC2626 !important;
        }
      `}</style>
      
      <motion.div
        className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LayoutGroup>
          <div className="flex items-baseline text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter">
            {/* Part 1: The Greeting (animated with auto-width) */}
            <AnimatePresence mode="popLayout">
              {showGreeting && (
                <motion.div 
                  key="greeting-container"
                  className="relative h-[1.2em] overflow-hidden mr-4"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={currentIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="flex items-center text-slate-900 dark:text-white whitespace-nowrap"
                    >
                      {currentWord.text}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Part 2: "Neo" + shape-shifting n + dot (uses layoutId for smooth animation) */}
            <motion.div
              layoutId="neon-brand"
              layout
              className="flex items-baseline text-slate-900 dark:text-white"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span>Neo</span>
              
              {/* Shape-shifting 'n' */}
              <motion.span 
                key={currentWord.n}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="inline-block min-w-[0.5em]"
              >
                {currentWord.n}
              </motion.span>

              {/* The Dot (strong red pulsing -> green on complete) */}
              <span
                className={`inline-block ${
                  isComplete
                    ? "text-[#22c55e] transition-colors duration-300" // Neon green when complete
                    : "red-pulse-dot" // Strong red pulsing during cycle
                }`}
              >
                .
              </span>
            </motion.div>
          </div>
        </LayoutGroup>
      </motion.div>
    </>
  );
};

export default MultilingualGreeting;
