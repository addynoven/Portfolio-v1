"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import BentoCard from "./BentoCard";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeCard = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Use resolvedTheme for accurate current theme (handles 'system' value)
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  // Use resolvedTheme for display (handles 'system' properly)
  const isDark = resolvedTheme === "dark";

  return (
    <BentoCard 
      colSpan={1} 
      rowSpan={1} 
      className="flex items-center justify-center cursor-pointer"
      onClick={toggleTheme}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-[#252525] flex items-center justify-center pointer-events-none">
        {!mounted ? (
          // Placeholder during SSR to prevent hydration mismatch
          <div className="w-5 h-5" />
        ) : isDark ? (
          <FaMoon className="w-5 h-5 text-yellow-400" />
        ) : (
          <FaSun className="w-5 h-5 text-yellow-500" />
        )}
      </div>
    </BentoCard>
  );
};

export default ThemeCard;
