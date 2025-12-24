"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  image: string;
  href: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "SecureShare",
    description: "End-to-end encrypted file sharing platform",
    image: "/assets/work/secureshare.png",
    href: "https://github.com/addynoven/SecureShare",
    tech: ["Next.js", "TypeScript", "Prisma"],
  },
  {
    title: "RI Store",
    description: "Premium jewelry e-commerce platform",
    image: "/assets/work/ristore.png",
    href: "https://github.com/addynoven/ri-store",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Portfolio V2",
    description: "Modern bento-grid portfolio design",
    image: "/photo.jpg",
    href: "/",
    tech: ["Next.js", "Tailwind", "Framer"],
  },
];

const ProjectCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % projects.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const project = projects[current];

  return (
    <div
      className="relative h-full overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/5 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <span className="text-[8px] uppercase tracking-widest text-gray-500">Featured Projects</span>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-UserAccent hover:text-black transition-all"
          >
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
          </a>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
              <p className="text-xs text-gray-400 mb-2">{project.description}</p>
              <div className="flex gap-1.5 flex-wrap">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-1.5 mt-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current ? "bg-UserAccent w-4" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
