"use client";

import { IconType } from "react-icons";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiPostman,
  SiExpress,
  SiGo,
} from "react-icons/si";

export interface TechItem {
  icon: IconType;
  label: string;
  color?: string;
  className?: string;
}

export const techCategories: Record<string, TechItem[]> = {
  summary: [
    { icon: FaReact, label: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, label: "Next.js", className: "text-slate-900 dark:text-white" },
    { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
    { icon: FaNodeJs, label: "Node.js", color: "#339933" },
    { icon: SiGo, label: "Go", color: "#00ADD8" },
    { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
    { icon: SiRedis, label: "Redis", color: "#DC382D" },
    { icon: FaDocker, label: "Docker", color: "#2496ED" },
  ],
  frontend: [
    { icon: FaReact, label: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, label: "Next.js", className: "text-slate-900 dark:text-white" },
    { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
    { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
    { icon: FaHtml5, label: "HTML5", color: "#E34F26" },
    { icon: FaCss3Alt, label: "CSS3", color: "#1572B6" },
  ],
  backend: [
    { icon: FaNodeJs, label: "Node.js", color: "#339933" },
    { icon: SiExpress, label: "Express", className: "text-slate-900 dark:text-white" },
    { icon: SiGo, label: "Go", color: "#00ADD8" },
    { icon: FaPython, label: "Python", color: "#3776AB" },
  ],
  database: [
    { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
    { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
    { icon: SiRedis, label: "Redis", color: "#DC382D" },
    { icon: SiPrisma, label: "Prisma", className: "text-slate-900 dark:text-white" },
  ],
  tools: [
    { icon: FaDocker, label: "Docker", color: "#2496ED" },
    { icon: FaGitAlt, label: "Git", color: "#F05032" },
    { icon: FaLinux, label: "Linux", color: "#FCC624" },
    { icon: SiPostman, label: "Postman", color: "#FF6C37" },
  ],
};

interface TechStackCardProps {
  category?: "summary" | "frontend" | "backend" | "database" | "tools";
  showLabel?: boolean;
}

const TechStackCard = ({ category = "summary", showLabel = false }: TechStackCardProps) => {
  const items = techCategories[category] || techCategories.summary;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <div
          key={tech.label}
          className={`flex items-center gap-1.5 rounded-lg bg-slate-200 dark:bg-[#252525] border border-slate-300/40 dark:border-white/5 hover:scale-105 transition-all ${
            showLabel ? "px-2.5 py-1.5" : "w-6 h-6 justify-center"
          }`}
          title={tech.label}
        >
          <tech.icon
            className={`w-3.5 h-3.5 flex-shrink-0 ${tech.className || ""}`}
            style={tech.color ? { color: tech.color } : undefined}
          />
          {showLabel && (
            <span className="text-[11px] font-medium text-slate-700 dark:text-gray-300">
              {tech.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TechStackCard;
