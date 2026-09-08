"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function V4ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme: setNextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme: Theme = mounted && resolvedTheme === "light" ? "light" : "dark";

  const setTheme = (next: Theme) => {
    setNextTheme(next);
  };

  const toggleTheme = () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    setNextTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, setTheme }}>
      <div
        className={`v4-root min-h-screen transition-colors duration-200 ${
          currentTheme === "light"
            ? "v4-light bg-[#f9fafb] text-neutral-900"
            : "dark bg-[#0a0a0a] text-neutral-100"
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useV4Theme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useV4Theme must be used within V4ThemeProvider");
  }
  return ctx;
}
