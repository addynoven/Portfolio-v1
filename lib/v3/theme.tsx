"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

/* ── Types & constants ────────────────────────────────────── */
export type Mode = "dark" | "light";
export type Scheme = "blue" | "emerald" | "purple" | "rose" | "amber" | "cyan" | "neon";

export const SCHEMES: Scheme[] = ["blue", "emerald", "purple", "rose", "amber", "cyan", "neon"];

export const SCHEME_META: Record<Scheme, { label: string; dark: string; light: string }> = {
    blue: { label: "Blue", dark: "#58a6ff", light: "#0969da" },
    emerald: { label: "Emerald", dark: "#3fb950", light: "#1a7f37" },
    purple: { label: "Purple", dark: "#a371f7", light: "#8250df" },
    rose: { label: "Rose", dark: "#f78166", light: "#cf222e" },
    amber: { label: "Amber", dark: "#d29922", light: "#bf8700" },
    cyan: { label: "Cyan", dark: "#39d0d6", light: "#0598bc" },
    neon: { label: "Neon", dark: "#00f5a0", light: "#00d68f" },
};

/* ── Context ────────────────────────────────────────────────── */
interface ThemeCtx {
    mode: Mode;
    scheme: Scheme;
    mounted: boolean;
    setMode: (m: Mode) => void;
    setScheme: (s: Scheme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
    mode: "light", scheme: "neon", mounted: false,
    setMode: () => { }, setScheme: () => { },
});

/* ── Provider ───────────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme, resolvedTheme } = useNextTheme();
    const [scheme, setSchemeState] = useState<Scheme>("neon");
    const [mounted, setMounted] = useState(false);

    // Initial mount to read local storage for scheme
    useEffect(() => {
        const savedScheme = localStorage.getItem("theme-scheme") as Scheme | null;
        if (savedScheme) setSchemeState(savedScheme);
        setMounted(true);
    }, []);

    // Apply scheme to DOM whenever it changes
    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute("data-scheme", scheme);
        }
    }, [scheme, mounted]);

    const setMode = (m: Mode) => {
        setTheme(m);
    };

    const setScheme = (s: Scheme) => {
        setSchemeState(s);
        localStorage.setItem("theme-scheme", s);
    };

    // Use resolvedTheme (or theme as fallback) to determine the current mode
    const mode = (resolvedTheme || theme || "light") as Mode;

    return (
        <ThemeContext.Provider value={{ mode, scheme, mounted, setMode, setScheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/** Hook — use anywhere to read or change the theme */
export const useTheme = () => useContext(ThemeContext);

