"use client";

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-white/10 dark:bg-primary/50 backdrop-blur-md border border-slate-200 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFullscreen ? "Exit fullscreen (F11)" : "Enter fullscreen (F11)"}
    >
      {isFullscreen ? (
        <Minimize className="w-5 h-5 text-slate-700 dark:text-white/70 group-hover:text-UserAccent transition-colors" />
      ) : (
        <Maximize className="w-5 h-5 text-slate-700 dark:text-white/70 group-hover:text-UserAccent transition-colors" />
      )}
    </button>
  );
};

export default FullscreenToggle;
