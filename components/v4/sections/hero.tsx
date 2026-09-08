"use client";

import React from "react";
import { PROFILE } from "@/lib/v4/constants";
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: FiGithub, label: "GitHub", href: PROFILE.github, external: true },
  { icon: FiTwitter, label: "Twitter", href: PROFILE.twitter, external: true },
  { icon: FiLinkedin, label: "LinkedIn", href: PROFILE.linkedin, external: true },
  { icon: FiMail, label: "Email", href: `mailto:${PROFILE.email}`, external: false },
];

export function Hero() {
  return (
    <div
      data-section="Home"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm"
    >
      {/* Status Pill & Role */}
      <div className="flex flex-wrap items-center justify-between w-full gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-[#181818] text-xs font-mono text-neutral-600 dark:text-neutral-400"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span>Available for work</span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xs font-mono text-neutral-400 dark:text-neutral-500"
        >
          {PROFILE.tagline}
        </motion.span>
      </div>

      {/* Author Name & Editorial Title */}
      <div className="mt-5 flex flex-col gap-2">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2"
        >
          {PROFILE.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal leading-[1.2] tracking-normal"
        >
          {PROFILE.heroHeading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-2 text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl"
        >
          {PROFILE.heroBio}
        </motion.p>
      </div>

      {/* Social Badges / Connect Pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-6 flex flex-wrap items-center gap-2.5"
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#181818] dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 transition-colors shadow-sm group"
          >
            <link.icon className="w-3.5 h-3.5" />
            <span>{link.label}</span>
            {link.external && (
              <FiArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
            )}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
