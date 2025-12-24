"use client";

import BentoCard from "./BentoCard";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDribbble } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const socials = [
  { icon: FaTwitter, href: "https://twitter.com/addynoven", label: "Twitter" },
  { icon: FaGithub, href: "https://github.com/addynoven", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/addynoven", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/addynoven", label: "LeetCode" },
  { icon: FaDribbble, href: "#", label: "Dribbble" },
  { icon: FaEnvelope, href: "mailto:aditya@example.com", label: "Email" },
];

const SocialsCard = () => {
  return (
    <BentoCard colSpan={1} rowSpan={1} className="p-4">
      <div className="grid grid-cols-3 gap-2 h-full">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-2xl bg-slate-200 dark:bg-[#252525] hover:bg-slate-300 dark:hover:bg-[#333] transition-colors aspect-square"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors" />
          </a>
        ))}
      </div>
    </BentoCard>
  );
};

export default SocialsCard;
