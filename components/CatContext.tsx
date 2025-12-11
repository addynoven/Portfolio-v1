"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface CatContextType {
  // Terminal state
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  
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
  setSpeechMessage: (msg: string | null) => void;
  
  // Cat state
  isPetting: boolean;
  setIsPetting: (petting: boolean) => void;
  isScrollingFast: boolean;
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
  const [currentSection, setCurrentSection] = useState("home");
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(true); // Default true, check localStorage
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number } | null>(null);
  const [speechMessage, setSpeechMessage] = useState<string | null>(null);
  const [isPetting, setIsPetting] = useState(false);
  const [isScrollingFast, setIsScrollingFast] = useState(false);

  // Check if user has seen tour
  useEffect(() => {
    const seen = localStorage.getItem("neko-tour-seen");
    if (!seen) {
      setHasSeenTour(false);
      // Start tour after a delay
      setTimeout(() => {
        setIsTourActive(true);
        setSpeechMessage("Welcome! I'm Neko! 🐱");
      }, 2000);
    }
  }, []);

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

  const value: CatContextType = {
    isTerminalOpen,
    setIsTerminalOpen,
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
  };

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};

export default CatContext;
