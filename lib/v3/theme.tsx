"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

/* ── Types & constants ────────────────────────────────────── */
export type Mode = "dark" | "light";
export type Scheme = "neon";
export const SCHEMES: Scheme[] = ["neon"];

export const SCHEME_META: Record<Scheme, { label: string; dark: string; light: string }> = {
    neon: { label: "Neon", dark: "#00f5a0", light: "#00d68f" },
};

/* ── Context ────────────────────────────────────────────────── */
interface ThemeCtx {
    mode: Mode;
    scheme: Scheme;
    mounted: boolean;
    setMode: (m: Mode) => void;
}

const ThemeContext = createContext<ThemeCtx>({
    mode: "light", scheme: "neon", mounted: false,
    setMode: () => { },
});

/* ── Provider ───────────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme, resolvedTheme } = useNextTheme();
    const [mounted, setMounted] = useState(false);

    // Initial mount to read local storage for scheme
    useEffect(() => {
        setMounted(true);
    }, []);

    // Apply scheme to DOM whenever it changes
    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute("data-scheme", "neon");
        }
    }, [mounted]);

    const setMode = (m: Mode) => {
        setTheme(m);
    };

    // Use resolvedTheme (or theme as fallback) to determine the current mode
    const mode = (resolvedTheme || theme || "light") as Mode;

    return (
        <ThemeContext.Provider value={{ mode, scheme: "neon", mounted, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

/** Hook — use anywhere to read or change the theme */
export const useTheme = () => useContext(ThemeContext);

