"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyTopbar({ title }: { title: string }) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Only hide if we have scrolled down past 50px (so it doesn't flicker at the top)
            if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`blog-topbar transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
        >
            <Link
                href="/blogs"
                className="blog-back-btn flex items-center gap-1.5 font-mono text-sm"
                style={{ color: "var(--muted)" }}
                aria-label="Back to blog"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                <span>blog</span>
            </Link>

            <span
                className="blog-topbar-title"
                aria-hidden="true"
            >
                {title}
            </span>
        </div>
    );
}
