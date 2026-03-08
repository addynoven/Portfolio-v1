"use client";

import { usePathname } from "next/navigation";
// Replace next/link with standard anchors to prevent theme state leaks between radically different domains
import { cn } from "@/lib/utils";

const versions = [
  { label: "V1", href: "/v1", color: "text-UserAccent" },
  { label: "V2", href: "/v2", color: "text-UserAccent" },
  { label: "V3", href: "/v3", color: "text-accent" }, // V3 uses accent variable
];

export function VersionSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const currentVersion = pathname.startsWith("/v3") ? "V3" : pathname.startsWith("/v2") ? "V2" : pathname.startsWith("/v1") ? "V1" : "V2";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[10px] uppercase tracking-widest text-slate-500 hidden sm:inline-block">
        {pathname.startsWith("/v3") && pathname.includes("jp") ? "バージョン切り替え" : "Switch version"}
      </span>
      <div className="flex items-center gap-1 p-1 bg-white/5 dark:bg-white/5 backdrop-blur-md rounded-lg border border-slate-200/10 dark:border-white/5 shadow-2xl">
        {versions.map((ver) => {
          const isActive = currentVersion === ver.label;
          return (
            <a
              key={ver.label}
              href={ver.href}
              className={cn(
                "px-3 py-1 text-[10px] font-bold rounded-md transition-all duration-300",
                isActive 
                  ? "bg-UserAccent/20 text-UserAccent border border-UserAccent shadow-[0_0_10px_rgba(0,255,153,0.1)]" 
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white/5"
              )}
            >
              {ver.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
