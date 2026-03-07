"use client";

import { useEffect, useRef, useState } from "react";
import { SCHEME_META, SCHEMES, useTheme, type Mode, type Scheme } from "@/lib/v3/theme";

export default function ThemeToggle() {
    const { mode, scheme, setMode, setScheme } = useTheme();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const accentColor = mode === "dark" ? SCHEME_META[scheme].dark : SCHEME_META[scheme].light;

    return (
        <div ref={wrapperRef} className="relative">
            {/* Trigger */}
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-150 text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                aria-label="Theme settings"
            >
                {/* live accent dot */}
                <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: accentColor }}
                />
                <span>Theme</span>
            </button>

            {/* Panel */}
            {open && (
                <div
                    className="absolute right-0 top-[calc(100%+10px)] w-60 rounded-2xl p-5 z-50 shadow-2xl"
                    style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
                >
                    {/* ── Mode ── */}
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-2 select-none"
                        style={{ color: "var(--muted)" }}>
                        Mode
                    </p>
                    <div className="flex gap-2 mb-5">
                        {(["light", "dark"] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-150 ${mode === m
                                        ? "bg-foreground text-background"
                                        : "bg-foreground/5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground"
                                    }`}
                            >
                                {m === "light" ? "☀ Light" : "☾ Dark"}
                            </button>
                        ))}
                    </div>

                    {/* ── Color Scheme ── */}
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-3 select-none"
                        style={{ color: "var(--muted)" }}>
                        Color Scheme
                    </p>
                    <div className="grid grid-cols-6 gap-2.5">
                        {SCHEMES.map(s => {
                            const color = mode === "dark" ? SCHEME_META[s].dark : SCHEME_META[s].light;
                            const isActive = scheme === s;
                            return (
                                <button
                                    key={s}
                                    title={SCHEME_META[s].label}
                                    onClick={() => setScheme(s)}
                                    className={`w-7 h-7 rounded-full transition-all duration-150 ${isActive
                                            ? "ring-2 ring-offset-2 scale-110"
                                            : "hover:scale-110 opacity-70 hover:opacity-100"
                                        }`}
                                    style={{
                                        backgroundColor: color,
                                        ...(isActive ? { ringColor: color, outlineColor: color } : {}),
                                        boxShadow: isActive ? `0 0 0 2px var(--card), 0 0 0 4px ${color}` : undefined,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* scheme name label */}
                    <p className="text-[11px] font-mono mt-3 select-none text-center"
                        style={{ color: "var(--muted)" }}>
                        {SCHEME_META[scheme].label}
                    </p>
                </div>
            )}
        </div>
    );
}



