"use client";

import React from "react";
import { useLanguage } from "@/context/v3/language-context";
import { cn } from "@/lib/utils";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-border select-none w-[70px] h-[30px] animate-pulse" />
    );
  }

  return (
    <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-border select-none">
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-1 text-[10px] font-bold rounded-md transition-all duration-200",
          language === "en"
            ? "bg-foreground text-background shadow-sm"
            : "text-foreground/70 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        )}
      >
        EN
      </button>
      <div className="w-[1px] h-3 bg-border" />
      <button
        onClick={() => setLanguage("jp")}
        className={cn(
          "px-2 py-1 text-[10px] font-bold rounded-md transition-all duration-200",
          language === "jp"
            ? "bg-foreground text-background shadow-sm"
            : "text-foreground/70 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        )}
      >
        JP
      </button>
    </div>
  );
};

export default LanguageToggle;
