"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SectionTransitionContextType {
  activeSection: string;
  isTransitioning: boolean;
  targetSection: string | null;
  navigateToSection: (targetId: string) => void;
  completeTransition: () => void;
}

const SectionTransitionContext = createContext<SectionTransitionContextType | null>(null);

export const useSectionTransition = () => {
  const context = useContext(SectionTransitionContext);
  if (!context) {
    throw new Error("useSectionTransition must be used within SectionTransitionProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const SectionTransitionProvider = ({ children }: Props) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const navigateToSection = useCallback((targetId: string) => {
    // Don't animate if already on this section
    if (targetId === activeSection) return;
    
    // Start the transition
    setTargetSection(targetId);
    setIsTransitioning(true);
  }, [activeSection]);

  const completeTransition = useCallback(() => {
    if (targetSection) {
      // Scroll to the section
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: "auto" }); // Instant scroll, stair animation provides the transition
      }
      setActiveSection(targetSection);
    }
    setTargetSection(null);
    setIsTransitioning(false);
  }, [targetSection]);

  return (
    <SectionTransitionContext.Provider
      value={{
        activeSection,
        isTransitioning,
        targetSection,
        navigateToSection,
        completeTransition,
      }}
    >
      {children}
    </SectionTransitionContext.Provider>
  );
};
