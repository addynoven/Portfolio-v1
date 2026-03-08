"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
    setMode: (m: Mode) => void;
    setScheme: (s: Scheme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
    mode: "dark", scheme: "neon",
    setMode: () => { }, setScheme: () => { },
});

/* ── Helpers ────────────────────────────────────────────────── */
function applyToDOM(mode: Mode, scheme: Scheme) {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.setAttribute("data-scheme", scheme);
}

/* ── Provider ───────────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<Mode>("dark");
    const [scheme, setSchemeState] = useState<Scheme>("neon");

    // On mount: read saved prefs or fall back to system
    useEffect(() => {
        const savedMode = localStorage.getItem("theme-mode") as Mode | null;
        const savedScheme = localStorage.getItem("theme-scheme") as Scheme | null;
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const m = savedMode ?? (systemDark ? "dark" : "light");
        const s = savedScheme ?? "neon";

        setModeState(m as Mode);
        setSchemeState(s as Scheme);
        applyToDOM(m as Mode, s as Scheme);
    }, []);

    const setMode = (m: Mode) => {
        setModeState(m);
        localStorage.setItem("theme-mode", m);
        applyToDOM(m, scheme);
    };

    const setScheme = (s: Scheme) => {
        setSchemeState(s);
        localStorage.setItem("theme-scheme", s);
        applyToDOM(mode, s);
    };

    return (
        <ThemeContext.Provider value={{ mode, scheme, setMode, setScheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/** Hook — use anywhere to read or change the theme */
export const useTheme = () => useContext(ThemeContext);

