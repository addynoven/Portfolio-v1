"use client";

import BentoCard from "./BentoCard";
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const socials = [
  { icon: FaTwitter, href: "https://twitter.com/addynoven", label: "Twitter" },
  { icon: FaGithub, href: "https://github.com/addynoven", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/addynoven", label: "LinkedIn" },
  { icon: FaEnvelope, href: "mailto:adityasahu0605@gmail.com", label: "Email" },
  { icon: SiLeetcode, href: "https://leetcode.com/addynoven", label: "LeetCode" },
];

const HorizontalSocialBar = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-white/10 hover:scale-110 transition-all duration-300"
          aria-label={social.label}
        >
          <social.icon className="w-4 h-4 text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors" />
        </a>
      ))}
    </div>
  );
};

export default HorizontalSocialBar;
