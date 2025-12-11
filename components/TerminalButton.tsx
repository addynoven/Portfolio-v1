"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTerminal, FiX } from "react-icons/fi";
import Terminal from "./Terminal";
import { useCat } from "./CatContext";

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
  const { setIsTerminalOpen } = useCat();
  
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

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-UserAccent/20 border border-UserAccent text-UserAccent flex items-center justify-center shadow-lg hover:bg-UserAccent hover:text-primary transition-all duration-300"
            aria-label="Open Terminal"
            title="Open Terminal (~ or F2)"
          >
            <FiTerminal className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
      <TerminalModal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
};

export default TerminalButton;
