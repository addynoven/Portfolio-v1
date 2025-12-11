import { useState, useEffect } from "react";

// Default accent color
export const DEFAULT_ACCENT = "#00ff99";
export const DEFAULT_ACCENT_HOVER = "#00e187";

// Helper to get the current accent color from CSS variable
export const getAccentColor = (): string => {
  if (typeof window === "undefined") return DEFAULT_ACCENT;
  const computed = getComputedStyle(document.documentElement).getPropertyValue("--user-accent").trim();
  // Ensure we always return a valid hex color
  return computed && computed.startsWith("#") && computed.length >= 4 ? computed : DEFAULT_ACCENT;
};

// React hook that updates when accent color changes
export const useAccentColor = (): string => {
  // Initialize with default to avoid hydration issues
  const [color, setColor] = useState<string>(DEFAULT_ACCENT);

  useEffect(() => {
    // Get initial color from CSS after mount
    const initialColor = getAccentColor();
    setColor(initialColor);

    // Listen for storage events (color command saves to localStorage)
    const handleStorage = () => {
      setColor(getAccentColor());
    };

    // Also create a custom event listener for immediate updates
    const handleColorChange = () => {
      setColor(getAccentColor());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("accent-color-change", handleColorChange);

    // Poll for changes (backup for same-tab updates)
    const interval = setInterval(() => {
      const newColor = getAccentColor();
      if (newColor !== color) {
        setColor(newColor);
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("accent-color-change", handleColorChange);
      clearInterval(interval);
    };
  }, [color]);

  return color;
};
