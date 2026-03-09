"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/v3/ui/theme-toggle";
import LanguageToggle from "@/components/v3/ui/language-toggle";
import { useTheme } from "@/lib/v3/theme";
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
    const { mode, mounted, setMode } = useTheme();
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
                        <span style={{ color: "var(--accent)" }}>{language === "jp" ? "技" : "ne"}</span>
                        <span className="text-foreground">{t(METADATA.name).toLowerCase()}</span>
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
                        className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-base transition-all duration-150 text-foreground/60 hover:text-foreground hover:bg-foreground/5 z-[80]"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                    >
                        {open ? (
                            <Icons.Close className="w-6 h-6" />
                        ) : (
                            <Icons.Menu className="w-6 h-6" />
                        )}
                        <span className="text-base font-mono">{open ? (language === "jp" ? "閉じる" : "Close") : (language === "jp" ? "メニュー" : "Menu")}</span>
                    </button>
                </div>
            </div>

            {/* Mobile full-screen menu */}
            <div
                className={`lg:hidden fixed inset-0 z-[70] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
                }`}
                style={{ background: "var(--v3-bg)" }}
            >
                <div className="h-full flex flex-col px-6 pt-24 pb-10 overflow-y-auto">
                    {/* Nav links */}
                    <nav className="flex flex-col gap-4 mb-10">
                        {NAV_LINKS.map(({ href, label }, idx) => (
                            <Link
                                key={href}
                                href={href}
                                className={`text-4xl font-bold font-mono transition-all duration-300 ${
                                    pathname === href ? "text-accent" : "text-foreground/40 hover:text-foreground"
                                }`}
                                style={{ 
                                    transitionDelay: open ? `${idx * 50}ms` : "0ms",
                                    transform: open ? "none" : "translateY(20px)"
                                }}
                            >
                                {t(label)}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto space-y-8">
                        {/* Divider */}
                        <div className="w-full h-px" style={{ background: "var(--v3-card-border)" }} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                             {/* Language & Mode */}
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-mono tracking-widest uppercase mb-3 text-muted">
                                        {language === "jp" ? "言語" : "Language"}
                                    </p>
                                    <LanguageToggle variant="full" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono tracking-widest uppercase mb-3 text-muted">
                                        {language === "jp" ? "モード" : "Mode"}
                                    </p>
                                    <div className="flex gap-2">
                                        {(["light", "dark"] as const).map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setMode(m)}
                                                className={`flex-1 py-3 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
                                                    !mounted
                                                        ? "bg-foreground/5 text-foreground/50"
                                                        : mode === m
                                                            ? "bg-accent text-accent-foreground"
                                                            : "bg-foreground/5 text-foreground/50"
                                                }`}
                                            >
                                                {m === "light" ? (language === "jp" ? "☀ ライト" : "☀ Light") : (language === "jp" ? "☾ ダーク" : "☾ Dark")}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Connections */}
                        <div className="flex items-center gap-3 pt-4">
                            <button
                                onClick={() => {
                                    const RESUME_URL = "";
                                    if (RESUME_URL) window.open(RESUME_URL, "_blank", "noopener,noreferrer");
                                }}
                                className="flex-1 flex justify-center py-3 items-center gap-2 text-sm font-mono bg-accent/10 rounded-xl text-accent font-bold"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                </svg>
                                CV
                            </button>
                            <a href={`https://github.com/${METADATA.username}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center py-3 items-center gap-2 text-sm font-mono bg-foreground/5 rounded-xl text-foreground/70 font-bold">
                                <Icons.GitHub className="w-5 h-5" /> GitHub
                            </a>
                            <a href={`https://x.com/${METADATA.username}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center py-3 items-center gap-2 text-sm font-mono bg-foreground/5 rounded-xl text-foreground/70 font-bold">
                                <Icons.Twitter className="w-5 h-5" /> Twitter
                            </a>
                        </div>
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



