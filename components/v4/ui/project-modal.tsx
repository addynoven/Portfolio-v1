"use client";

import React, { useEffect } from "react";
import { Project } from "@/lib/v4/constants";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiGithub, FiCheckCircle } from "react-icons/fi";

interface ProjectModalProps {
  project: Project | null;
  isOpen?: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-elevated)] p-6 sm:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[var(--surface-container)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-container-high)] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <FiX className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div className="flex flex-col gap-2 mb-6 pr-8">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-wider bg-[var(--surface-container)] text-[var(--text-muted)] border border-[var(--surface-border)]">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-wider bg-[var(--status-active)]/10 text-[var(--status-active)] border border-[var(--status-active)]/20">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--primary)]">
                {project.title}
              </h2>
              <p className="text-sm text-[var(--text-muted)]">{project.subtitle}</p>
            </div>

            {/* Stats row if available */}
            {project.stats && project.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-[var(--surface-container-lowest)] border border-[var(--surface-border-subtle)]">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
                      {stat.label}
                    </span>
                    <span className="text-lg font-semibold text-[var(--primary)]">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Description */}
            <div className="space-y-3 text-sm text-[var(--on-surface-variant)] leading-relaxed mb-6">
              {project.detailedDescription && project.detailedDescription.length > 0 ? (
                project.detailedDescription.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <p>{project.description}</p>
              )}
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
                  Key Technical Features
                </h4>
                <div className="space-y-2">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--on-surface)]">
                      <FiCheckCircle className="w-4 h-4 text-[var(--status-active)] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack chips */}
            <div className="mb-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
                Stack & Primitives
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface-container)] text-[var(--text-muted)] border border-[var(--surface-border)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--surface-border)]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)] text-[var(--on-primary)] text-xs font-medium hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  <span>Visit Live Demo</span>
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-container)] text-[var(--on-surface)] text-xs font-medium hover:bg-[var(--surface-container-high)] transition-all border border-[var(--surface-border)] active:scale-95"
                >
                  <FiGithub className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
