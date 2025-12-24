"use client";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

const techStack = [
  { icon: FaReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", color: undefined, className: "text-slate-800 dark:text-white" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: FaNodeJs, label: "Node.js", color: "#339933" },
];

const TechStackCard = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((tech) => (
        <div
          key={tech.label}
          className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#252525] flex items-center justify-center hover:scale-110 transition-transform"
          title={tech.label}
        >
          <tech.icon 
            className={`w-3.5 h-3.5 ${(tech as any).className || ''}`}
            style={tech.color ? { color: tech.color } : undefined} 
          />
        </div>
      ))}
    </div>
  );
};

export default TechStackCard;
