"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/v3/ui/theme-toggle";
import LanguageToggle from "@/components/v3/ui/language-toggle";
import { useTheme, SCHEMES, SCHEME_META } from "@/lib/v3/theme";
import { Icons } from "@/components/v3/ui/icons";
import { METADATA } from "@/app/v3/constants";
import { useLanguage } from "@/context/v3/language-context";

const NAV_LINKS = [
    { href: "/v3", label: { en: "Home", jp: "ホーム" } },
    { href: "/v3/projects", label: { en: "Projects", jp: "プロジェクト" } },
    { href: "/v3/blogs", label: { en: "Blog", jp: "ブログ" } },
    { href: "/v3/art-gallery", label: { en: "Art Gallery", jp: "アートギャラリー" } },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { mode, scheme, setMode, setScheme } = useTheme();
    const { language, t } = useLanguage();

    // Close menu on route change
    useEffect(() => { setOpen(false); }, [pathname]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open]);

    const getActiveStyles = (href: string) => {
        const isActive = href === "/v3" ? pathname === "/v3" : pathname.startsWith(href);
        return isActive
            ? "bg-accent/10 text-accent font-semibold"
            : "text-foreground/50 hover:text-foreground hover:bg-foreground/5";
    };

    return (
        <header className="sticky top-0 z-50 w-full" style={{ borderBottom: "1px solid var(--v3-card-border)" }}>
            <div className="bg-background">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/v3"
                        className="text-lg font-bold font-mono select-none flex items-center gap-2 hover:opacity-70 transition-opacity"
                    >
                        <span style={{ color: "var(--accent)" }}>{language === "jp" ? "技" : "V"}</span>
                        <span className="text-foreground">{METADATA.name.toLowerCase()}</span>
                    </Link>

                    {/* Desktop: nav links + theme toggle */}
                    <div className="hidden lg:flex items-center gap-1">
                        <nav className="flex items-center gap-1">
                            {NAV_LINKS.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`px-3 py-1.5 rounded-lg text-base transition-all duration-150 font-mono ${getActiveStyles(href)}`}
                                >
                                    {t(label)}
                                </Link>
                            ))}
                        </nav>

                        <div className="w-px h-4 mx-2" style={{ background: "var(--v3-card-border)" }} />

                        {/* Connections */}
                        <div className="flex items-center gap-0.5 mr-2">
                            {/* CV button — add your resume URL to RESUME_URL when ready */}
                            <button
                                onClick={() => {
                                    const RESUME_URL = ""; // TODO: add your resume link here
                                    console.log("CV button clicked", RESUME_URL || "(no URL set yet)");
                                    if (RESUME_URL) window.open(RESUME_URL, "_blank", "noopener,noreferrer");
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-mono font-semibold border transition-all duration-150 text-foreground/60 hover:text-accent hover:border-accent/40 hover:bg-accent/5"
                                style={{ borderColor: "var(--v3-card-border)" }}
                                aria-label="Download CV"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                </svg>
                                CV
                            </button>
                             <a href={`https://github.com/${METADATA.username}`} target="_blank" rel="noopener noreferrer" className="p-2 text-foreground/50 hover:text-accent transition-colors" aria-label="GitHub">
                                <Icons.GitHub className="w-5 h-5" />
                            </a>
                            <a href={`https://x.com/${METADATA.username}`} target="_blank" rel="noopener noreferrer" className="p-2 text-foreground/50 hover:text-accent transition-colors" aria-label="Twitter">
                                <Icons.Twitter className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="flex items-center gap-2">
                             <LanguageToggle />
                             <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile: hamburger button */}
                    <button
                        onClick={() => setOpen(o => !o)}
                        className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-base transition-all duration-150 text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                    >
                        <Icons.Menu open={open} className="w-6 h-6 transition-all duration-200" />
                        <span className="text-base font-mono">{open ? (language === "jp" ? "閉じる" : "Close") : (language === "jp" ? "メニュー" : "Menu")}</span>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            <div
                className={`lg:hidden absolute left-0 right-0 top-full z-50 overflow-hidden transition-all duration-300 ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                style={{ background: "var(--v3-card)", borderBottom: open ? "1px solid var(--v3-card-border)" : "none" }}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">

                    {/* Nav links */}
                    <nav className="flex flex-col gap-1 mb-5">
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`px-3 py-2.5 rounded-xl text-base font-mono transition-all duration-150 ${getActiveStyles(href)}`}
                            >
                                {t(label)}
                            </Link>
                        ))}
                    </nav>

                    {/* Divider */}
                    <div className="mb-4" style={{ borderTop: "1px solid var(--v3-card-border)" }} />

                    {/* Language */}
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-2 select-none" style={{ color: "var(--v3-muted)" }}>
                        {language === "jp" ? "言語" : "Language"}
                    </p>
                    <div className="mb-4">
                        <LanguageToggle />
                    </div>

                    {/* Mode */}
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-2 select-none" style={{ color: "var(--v3-muted)" }}>
                        {language === "jp" ? "モード" : "Mode"}
                    </p>
                    <div className="flex gap-2 mb-4">
                        {(["light", "dark"] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-150 ${mode === m
                                    ? "bg-foreground text-background"
                                    : "bg-foreground/5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground"
                                    }`}
                            >
                                {m === "light" ? (language === "jp" ? "☀ ライト" : "☀ Light") : (language === "jp" ? "☾ ダーク" : "☾ Dark")}
                            </button>
                        ))}
                    </div>

                    {/* Color scheme */}
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-3 select-none" style={{ color: "var(--v3-muted)" }}>
                        {language === "jp" ? "カラースキーム" : "Color Scheme"}
                    </p>
                    <div className="flex gap-2.5 flex-wrap pb-1">
                        {SCHEMES.map(s => {
                            const color = mode === "dark" ? SCHEME_META[s].dark : SCHEME_META[s].light;
                            const isActive = scheme === s;
                            return (
                                <button
                                    key={s}
                                    title={SCHEME_META[s].label}
                                    onClick={() => setScheme(s)}
                                    className="w-8 h-8 rounded-full transition-all duration-150"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: isActive ? `0 0 0 2px var(--v3-card), 0 0 0 4px ${color}` : undefined,
                                        transform: isActive ? "scale(1.15)" : undefined,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Mobile Connections */}
                    <div className="pt-5 mt-5 flex items-center gap-3" style={{ borderTop: "1px solid var(--v3-card-border)" }}>
                        <button
                            onClick={() => {
                                const RESUME_URL = ""; // TODO: add your resume link here
                                console.log("CV button clicked", RESUME_URL || "(no URL set yet)");
                                if (RESUME_URL) window.open(RESUME_URL, "_blank", "noopener,noreferrer");
                            }}
                            className="flex flex-1 justify-center py-2 items-center gap-2 text-base font-mono bg-accent/10 rounded-xl text-accent font-semibold hover:bg-accent/20 transition-all"
                            aria-label="Download CV"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                            </svg>
                            CV
                        </button>
                        <a href={`https://github.com/${METADATA.username}`} target="_blank" rel="noopener noreferrer" className="flex flex-1 justify-center py-2 items-center gap-2 text-base font-mono bg-foreground/5 rounded-xl text-foreground/50 hover:text-accent hover:bg-foreground/10 transition-all">
                            <Icons.GitHub className="w-5 h-5" /> GitHub
                        </a>
                        <a href={`https://x.com/${METADATA.username}`} target="_blank" rel="noopener noreferrer" className="flex flex-1 justify-center py-2 items-center gap-2 text-base font-mono bg-foreground/5 rounded-xl text-foreground/50 hover:text-accent hover:bg-foreground/10 transition-all">
                            <Icons.Twitter className="w-5 h-5" /> Twitter
                        </a>
                    </div>
                </div>
            </div>

            {/* Backdrop — close on tap outside */}
            {open && (
                <div
                    className="lg:hidden fixed inset-0 z-40 top-14"
                    onClick={() => setOpen(false)}
                />
            )}
        </header>
    );
}



