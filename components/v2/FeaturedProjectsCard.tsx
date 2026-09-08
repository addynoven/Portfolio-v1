"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowUpRightFromSquare, FaChevronLeft, FaChevronRight, FaShieldHalved, FaGem } from "react-icons/fa6";

const PROJECTS = [
  {
    title: "SecureShare",
    description: "End-to-end encrypted file sharing platform with modern UI/UX.",
    image: "/assets/work/secureshare.png",
    href: "https://github.com/addynoven/SecureShare",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    badge: "E2E Encrypted",
    icon: FaShieldHalved,
    gradient: "from-[#131b26] to-[#1f162e]",
  },
  {
    title: "RI Store",
    description: "Premium jewelry e-commerce platform with elegant design.",
    image: "/assets/work/ristore.png",
    href: "https://github.com/addynoven/ri-store",
    tech: ["React", "Node.js", "MongoDB"],
    badge: "E-Commerce",
    icon: FaGem,
    gradient: "from-[#2a1c12] to-[#3a2f1c]",
  },
  {
    title: "NeonFlix",
    description: "Modern video streaming and media browsing platform.",
    image: "/assets/work/neonflix.png",
    href: "https://github.com/addynoven",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    badge: "Streaming",
    icon: FaShieldHalved,
    gradient: "from-[#0a1c18] to-[#11382e]",
  },
];

export default function FeaturedProjectsCard() {
  const [page, setPage] = useState(0);
  const totalPages = 2;

  const currentProjects = page === 0 
    ? [PROJECTS[0], PROJECTS[1]] 
    : [PROJECTS[2], PROJECTS[0]];

  return (
    <section 
      className="col-span-12 md:col-span-12 lg:col-span-4 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-3.5 backdrop-blur-md flex flex-col justify-between shadow-lg min-h-[220px]"
      data-purpose="featured-projects-card"
      id="projects"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
          // FEATURED PROJECTS
        </span>
        <a 
          href="https://github.com/addynoven" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[9px] text-[#00FF87] hover:underline flex items-center gap-1 font-medium"
        >
          <span>View all</span>
          <FaArrowRight className="text-[7px]" />
        </a>
      </div>

      {/* 2 Projects Side-by-Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {currentProjects.map((project) => {
          const Icon = project.icon;
          return (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#0a1010] border border-[#142320] hover:border-[#204036] transition flex flex-col justify-between group h-full"
            >
              {/* Preview Thumbnail Container */}
              <div className={`h-14 rounded-lg bg-gradient-to-tr ${project.gradient} border border-white/10 p-1.5 relative overflow-hidden mb-1.5 flex flex-col justify-between`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-red-400" />
                    <div className="w-1 h-1 rounded-full bg-yellow-400" />
                    <div className="w-1 h-1 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[7px] font-mono text-[#00FF87] uppercase tracking-wider">{project.badge}</span>
                </div>
                <div className="w-full h-6 rounded bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="text-[10px] text-[#00FF87]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-white group-hover:text-[#00FF87] transition">
                    {project.title}
                  </h4>
                  <FaArrowUpRightFromSquare className="text-[7px] text-[#697d7a]" />
                </div>
                <p className="text-[8px] text-[#718784] mt-0.5 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-[7px] px-1 py-0.2 rounded bg-[#0e1615] border border-[#182a26] text-[#869b97]">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom Pagination Controls */}
      <div className="flex items-center justify-center gap-2 pt-1.5 border-t border-[#121f1c]">
        <button 
          onClick={() => setPage(page === 0 ? 1 : 0)} 
          className="text-[#526462] hover:text-white text-[9px]"
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </button>
        <div className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${page === 0 ? "bg-[#00FF87]" : "bg-[#1e2f2b]"}`} />
          <span className={`w-1.5 h-1.5 rounded-full ${page === 1 ? "bg-[#00FF87]" : "bg-[#1e2f2b]"}`} />
        </div>
        <button 
          onClick={() => setPage(page === 0 ? 1 : 0)} 
          className="text-[#526462] hover:text-white text-[9px]"
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
