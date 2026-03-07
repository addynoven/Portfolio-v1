"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface CatContextType {
  // Terminal state
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  
  // Matrix Rain state
  isMatrixActive: boolean;
  setIsMatrixActive: (active: boolean) => void;
  
  // Current section
  currentSection: string;
  setCurrentSection: (section: string) => void;
  
  // Tour state
  isTourActive: boolean;
  setIsTourActive: (active: boolean) => void;
  tourStep: number;
  setTourStep: (step: number) => void;
  hasSeenTour: boolean;
  completeTour: () => void;
  
  // Cat target position (for tour guide)
  targetPosition: { x: number; y: number } | null;
  setTargetPosition: (pos: { x: number; y: number } | null) => void;
  
  // Speech bubble
  speechMessage: string | null;
  setSpeechMessage: React.Dispatch<React.SetStateAction<string | null>>;
  
  // Cat state
  isPetting: boolean;
  setIsPetting: (petting: boolean) => void;
  isScrollingFast: boolean;
  startTour: () => void;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const useCat = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCat must be used within a CatProvider");
  }
  return context;
};

interface CatProviderProps {
  children: ReactNode;
}

export const CatProvider = ({ children }: CatProviderProps) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(true); // Default true, check localStorage
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number } | null>(null);
  const [speechMessage, setSpeechMessage] = useState<string | null>(null);
  const [isPetting, setIsPetting] = useState(false);
  const [isScrollingFast, setIsScrollingFast] = useState(false);

  // Tour is now only triggered from the terminal 'tour' command
  // No auto-start for new users

  // Detect fast scrolling
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
      
      if (scrollSpeed > 50) {
        setIsScrollingFast(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrollingFast(false);
        }, 500);
      }
      
      lastScrollY = currentScrollY;

      // Detect current section
      const sections = ["home", "work", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const completeTour = useCallback(() => {
    setIsTourActive(false);
    setHasSeenTour(true);
    setSpeechMessage(null);
    setTargetPosition(null);
    localStorage.setItem("neko-tour-seen", "true");
  }, []);

  const startTour = useCallback(() => {
    setIsTourActive(true);
    setTourStep(0);
    setHasSeenTour(false);
    setSpeechMessage("Let's go on a tour! 🚀");
    // Don't clear localStorage so it doesn't auto-start on reload, just this session
  }, []);

  const value: CatContextType = {
    isTerminalOpen,
    setIsTerminalOpen,
    isMatrixActive,
    setIsMatrixActive,
    currentSection,
    setCurrentSection,
    isTourActive,
    setIsTourActive,
    tourStep,
    setTourStep,
    hasSeenTour,
    completeTour,
    targetPosition,
    setTargetPosition,
    speechMessage,
    setSpeechMessage,
    isPetting,
    setIsPetting,
    isScrollingFast,
    startTour,
  };

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};

export default CatContext;
