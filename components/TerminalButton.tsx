"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTerminal, FiX, FiArrowUp } from "react-icons/fi";
import Terminal from "./Terminal";
import MatrixRain from "./MatrixRain";
import { useCat } from "./CatContext";
import Magnet from "@/components/reactbits/Animations/Magnet";

// DevTools detection Easter egg
const useDevToolsDetection = () => {
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [hasShownMessage, setHasShownMessage] = useState(false);

  useEffect(() => {
    const threshold = 160;
    
    const detect = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if ((widthThreshold || heightThreshold) && !devToolsOpen) {
        setDevToolsOpen(true);
        if (!hasShownMessage) {
          // Console Easter egg
          console.log(
            "%c👀 I see you're inspecting...",
            "font-size: 24px; font-weight: bold; color: #00ff99;"
          );
          console.log(
            "%cCurious mind, are we? I like that! 💚",
            "font-size: 16px; color: #00ff99;"
          );
          console.log(
            "%c💡 Tip: Try 'devtools' command in the terminal!",
            "font-size: 14px; color: #3b82f6;"
          );
          console.log(
            "%c" +
              "    _   __                    _____ __        _     \n" +
              "   / | / /__  ____  ____     / ___// /_____ _(_)___ \n" +
              "  /  |/ / _ \\/ __ \\/ __ \\    \\__ \\/ __/ __ `/ / __ \\\n" +
              " / /|  /  __/ /_/ / / / /   ___/ / /_/ /_/ / / / / /\n" +
              "/_/ |_/\\___/\\____/_/ /_/   /____/\\__/\\__,_/_/_/ /_/ ",
            "color: #00ff99; font-family: monospace;"
          );
          setHasShownMessage(true);
        }
      } else if (!widthThreshold && !heightThreshold) {
        setDevToolsOpen(false);
      }
    };

    // Check on resize
    window.addEventListener("resize", detect);
    // Initial check
    detect();

    return () => window.removeEventListener("resize", detect);
  }, [devToolsOpen, hasShownMessage]);

  return devToolsOpen;
};

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalModal = ({ isOpen, onClose }: TerminalModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative pointer-events-auto w-full max-w-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <span>ESC to close | ~ or F2 to toggle</span>
                <FiX className="text-xl" />
              </button>
              {/* Terminal */}
              <Terminal />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Terminal Toggle Button Component
const TerminalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get cat context for syncing terminal state
  const { setIsTerminalOpen, isMatrixActive, setIsMatrixActive } = useCat();
  
  // Use ref to access setIsMatrixActive in effects without dependency issues
  const setIsMatrixActiveRef = React.useRef(setIsMatrixActive);
  setIsMatrixActiveRef.current = setIsMatrixActive;
  
  // Initialize DevTools detection
  useDevToolsDetection();

  // Sync modal state with cat context
  useEffect(() => {
    setIsTerminalOpen(isModalOpen);
  }, [isModalOpen, setIsTerminalOpen]);

  // Show button after scrolling
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Keyboard shortcut: ~ (tilde) or F2 to toggle terminal
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // F2 key or ~ (tilde) key
      if (e.key === "F2" || e.key === "~" || (e.shiftKey && e.key === "`")) {
        e.preventDefault();
        setIsModalOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // Stop matrix rain when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setIsMatrixActiveRef.current(false);
    }
  }, [isModalOpen]);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    // Stop matrix rain when terminal closes
    setIsMatrixActiveRef.current(false);
  }, []);

  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain isActive={isMatrixActive} />
      
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Back to Top Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed bottom-8 right-24 z-50"
            >
              <Magnet strength={0.4}>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="block"
                  aria-label="Back to Top"
                  title="Back to Top"
                >
                  <div
                    className="relative w-12 h-12 rounded-full border-2 border-UserAccent overflow-hidden"
                    style={{
                      transform: 'scale(1.1)',
                      boxShadow: '0 0 20px rgba(var(--accent-rgb), 0.4)',
                    }}
                  >
                    {/* Wave water fill effect - always filled */}
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      {/* Wave SVG pattern */}
                      <svg
                        className="absolute top-0 left-0 w-[200%] h-6 -translate-y-[90%]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        style={{
                          animation: 'socialWave 1.5s linear infinite',
                        }}
                      >
                        <path
                          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
                          className="fill-UserAccent"
                        />
                      </svg>
                      {/* Solid fill below the wave */}
                      <div className="absolute inset-0 top-3 bg-UserAccent" />
                    </div>

                    {/* Icon */}
                    <span className="absolute inset-0 flex items-center justify-center z-10 text-xl text-primary">
                      <FiArrowUp />
                    </span>
                  </div>
                </button>
              </Magnet>
            </motion.div>
            
            {/* Terminal Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <Magnet strength={0.4}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="block"
                  aria-label="Open Terminal"
                  title="Open Terminal (~ or F2)"
                >
                  <div
                    className="relative w-12 h-12 rounded-full border-2 border-UserAccent overflow-hidden"
                    style={{
                      transform: 'scale(1.1)',
                      boxShadow: '0 0 20px rgba(var(--accent-rgb), 0.4)',
                    }}
                  >
                    {/* Wave water fill effect - always filled */}
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      {/* Wave SVG pattern */}
                      <svg
                        className="absolute top-0 left-0 w-[200%] h-6 -translate-y-[90%]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        style={{
                          animation: 'socialWave 1.5s linear infinite',
                        }}
                      >
                        <path
                          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
                          className="fill-UserAccent"
                        />
                      </svg>
                      {/* Solid fill below the wave */}
                      <div className="absolute inset-0 top-3 bg-UserAccent" />
                    </div>

                    {/* Icon */}
                    <span className="absolute inset-0 flex items-center justify-center z-10 text-xl text-primary">
                      <FiTerminal />
                    </span>
                  </div>
                </button>
              </Magnet>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <TerminalModal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
};

export default TerminalButton;
