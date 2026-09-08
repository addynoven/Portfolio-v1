"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDocker, 
  FaGitAlt, 
  FaLinux 
} from "react-icons/fa6";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiPostgresql, 
  SiMongodb 
} from "react-icons/si";
import BentoModal from "./BentoModal";
import TechStackCard from "./TechStackCard";

const SKILLS = [
  { label: "TypeScript", icon: SiTypescript, color: "#3178C6", bg: "bg-[#3178c6]/20", border: "border-[#3178c6]/50" },
  { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E", bg: "bg-[#f7df1e]/20", border: "border-[#f7df1e]/50" },
  { label: "Python", icon: FaPython, color: "#EAB308", bg: "bg-yellow-500/20", border: "border-yellow-500/50" },
  { label: "React", icon: FaReact, color: "#00D8FF", bg: "bg-[#00d8ff]/20", border: "border-[#00d8ff]/50" },
  { label: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", bg: "bg-white/10", border: "border-white/30" },
  { label: "Node.js", icon: FaNodeJs, color: "#68A063", bg: "bg-[#68a063]/20", border: "border-[#68a063]/50" },
  { label: "PostgreSQL", icon: SiPostgresql, color: "#336791", bg: "bg-[#336791]/20", border: "border-[#336791]/50" },
  { label: "MongoDB", icon: SiMongodb, color: "#13AA52", bg: "bg-[#13aa52]/20", border: "border-[#13aa52]/50" },
  { label: "Docker", icon: FaDocker, color: "#2496ED", bg: "bg-[#2496ed]/20", border: "border-[#2496ed]/50" },
  { label: "Linux", icon: FaLinux, color: "#FACC15", bg: "bg-yellow-400/20", border: "border-yellow-400/50" },
  { label: "Git", icon: FaGitAlt, color: "#F05032", bg: "bg-[#f05032]/20", border: "border-[#f05032]/50" },
  { label: "Tailwind", icon: SiTailwindcss, color: "#38BDF8", bg: "bg-[#38bdf8]/20", border: "border-[#38bdf8]/50" },
];

export default function TechStackGridCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section 
        className="col-span-12 md:col-span-6 lg:col-span-3 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-3.5 backdrop-blur-md flex flex-col justify-between shadow-lg min-h-[220px]"
        data-purpose="tech-stack-card"
        id="skills"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
            // TECH STACK
          </span>
          <button 
            onClick={() => setModalOpen(true)}
            className="text-[9px] text-[#00FF87] hover:underline flex items-center gap-1 font-medium"
          >
            <span>View all</span>
            <FaArrowRight className="text-[7px]" />
          </button>
        </div>

        {/* 4x3 Grid Skills matching reference */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <div 
                key={skill.label}
                onClick={() => setModalOpen(true)}
                className="flex flex-col items-center gap-0.5 p-1 rounded-lg bg-[#091110] border border-[#152622] hover:border-[#00FF87]/40 transition cursor-pointer group"
                title={skill.label}
              >
                <div className={`w-6 h-6 rounded ${skill.bg} border ${skill.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="text-[12px]" style={{ color: skill.color }} />
                </div>
                <span className="text-[8px] text-[#869b97] truncate max-w-full">{skill.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Categorized Modal */}
      <BentoModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        title="Complete Tech Stack"
        description="Comprehensive breakdown of languages, frameworks, databases, and tooling"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0f141c] rounded-2xl p-4 border border-white/10 shadow-sm">
            <span className="text-[#00FF87] uppercase tracking-widest text-[10px] font-mono font-bold block mb-3">// Frontend</span>
            <TechStackCard category="frontend" showLabel />
          </div>
          <div className="bg-[#0f141c] rounded-2xl p-4 border border-white/10 shadow-sm">
            <span className="text-[#00FF87] uppercase tracking-widest text-[10px] font-mono font-bold block mb-3">// Backend</span>
            <TechStackCard category="backend" showLabel />
          </div>
          <div className="bg-[#0f141c] rounded-2xl p-4 border border-white/10 shadow-sm">
            <span className="text-[#00FF87] uppercase tracking-widest text-[10px] font-mono font-bold block mb-3">// Database</span>
            <TechStackCard category="database" showLabel />
          </div>
          <div className="bg-[#0f141c] rounded-2xl p-4 border border-white/10 shadow-sm">
            <span className="text-[#00FF87] uppercase tracking-widest text-[10px] font-mono font-bold block mb-3">// Tools &amp; Cloud</span>
            <TechStackCard category="tools" showLabel />
          </div>
        </div>
      </BentoModal>
    </>
  );
}
