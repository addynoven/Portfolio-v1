"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GraduationCap, Award, User, MapPin, Globe, Sparkles } from "lucide-react";
import { Education as educationData, About as aboutData } from "@/lib/data";

// Lazy load photo
const Photo = dynamic(
  () => import("@/components/v1/Photo"),
  { ssr: false }
);

const AboutMe = memo(function AboutMe() {
  return (
    <section id="about" className="relative scroll-mt-24 w-full z-20">
      <div className="w-full">
        {/* Section Header */}
        <motion.div
          className="mb-12 xl:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-UserAccent/10 flex items-center justify-center text-UserAccent">
              <User className="w-4 h-4" />
            </div>
            <span className="text-UserAccent font-mono text-sm tracking-wider uppercase">
              Biography & Credentials
            </span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            About <span className="text-UserAccent">Me</span>
          </h2>
          <div
            className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full"
            style={{ maxWidth: "200px" }}
          />
        </motion.div>

        {/* Bio + Photo Card */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-14 mb-16">
          {/* Photo on Left */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-UserAccent/30 to-transparent blur-xl -z-10" />
              <Photo />
            </div>
          </motion.div>

          {/* Bio Narrative on Right */}
          <motion.div
            className="flex-1 max-w-2xl text-center xl:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-UserAccent/10 text-UserAccent text-xs font-mono mb-4 border border-UserAccent/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Stack & Applied AI Engineer</span>
            </div>

            <h3 className="text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Building systems that are <span className="text-UserAccent">fast</span>,{" "}
              <span className="text-UserAccent">resilient</span>, and{" "}
              <span className="text-UserAccent">user-centric</span>.
            </h3>

            <p className="text-slate-600 dark:text-white/80 text-base leading-relaxed mb-4">
              I am a software developer with a strong foundation in systems programming and full-stack web architecture, combined with a background in Artificial Intelligence & Data Analytics. My core engineering philosophy focuses on building clear, predictable modular applications that scale under real-world load.
            </p>

            <p className="text-slate-600 dark:text-white/80 text-base leading-relaxed mb-6">
              From architecting e-commerce platforms with sub-second LCP to fine-tuning machine learning vision models achieving 99% accuracy, I love diving deep into the entire lifecycle—from low-level performance tuning to seamless user interfaces.
            </p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <span className="text-xs text-slate-500 dark:text-white/50 block font-mono">Location</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-UserAccent" /> Bhopal, India
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <span className="text-xs text-slate-500 dark:text-white/50 block font-mono">Status</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-UserAccent animate-pulse" /> Available
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <span className="text-xs text-slate-500 dark:text-white/50 block font-mono">Languages</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-UserAccent" /> English, Hindi
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education & Certifications Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-UserAccent/10 flex items-center justify-center text-UserAccent">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Education & <span className="text-UserAccent">Certifications</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {educationData.items.map((item, idx) => {
              const isDegree = item.degree.includes("MCA") || item.degree.includes("BCA");

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-UserAccent/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-UserAccent font-medium">
                        {item.duration}
                      </span>
                      {isDegree && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-UserAccent/10 text-UserAccent border border-UserAccent/20">
                          Degree
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {item.degree}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-white/60">
                      {item.institution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default AboutMe;
