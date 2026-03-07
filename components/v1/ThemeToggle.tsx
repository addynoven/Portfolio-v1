"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
        <span className="w-5 h-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-UserAccent hover:bg-UserAccent/10 transition-all duration-300"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <FiSun className="w-5 h-5 text-UserAccent" />
      ) : (
        <FiMoon className="w-5 h-5 text-UserAccent" />
      )}
    </button>
  );
};

export default ThemeToggle;
