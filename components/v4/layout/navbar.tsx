"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useV4Theme } from "@/lib/v4/theme";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/v4" },
  { label: "About", href: "/v4/about" },
  { label: "Projects", href: "/v4/projects" },
  { label: "Components", href: "/v4/components" },
  { label: "Blogs", href: "/v4/blogs" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useV4Theme();

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetTheme = theme === "dark" ? "light" : "dark";
    const event = new CustomEvent("v4-theme-transition", {
      detail: { x: e.clientX, y: e.clientY, targetTheme },
    });
    window.dispatchEvent(event);
  };

  return (
    <header className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/90 backdrop-blur-md flex items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3 w-full shadow-sm transition-colors">
      <nav className="flex flex-wrap items-center gap-4 text-[13px] font-medium sm:gap-6 sm:text-sm">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/v4"
              ? pathname === "/v4"
              : pathname?.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-colors py-0.5 ${
                isActive
                  ? "text-neutral-900 dark:text-white font-medium"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="v4-nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#181818] dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 cursor-pointer shadow-sm overflow-hidden group"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {theme === "dark" ? (
              <FiSun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <FiMoon className="w-3.5 h-3.5 text-indigo-500" />
            )}
          </motion.div>
        </button>
      </div>
    </header>
  );
}
