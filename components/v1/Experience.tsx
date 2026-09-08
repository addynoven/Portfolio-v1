"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Experience as experienceData } from "@/lib/data";

const Experience = memo(function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 w-full">
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
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-UserAccent font-mono text-sm tracking-wider uppercase">
              Career Journey
            </span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Work <span className="text-UserAccent">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 max-w-2xl text-base">
            {experienceData.description}
          </p>
          <div
            className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full mt-4"
            style={{ maxWidth: "200px" }}
          />
        </motion.div>

        {/* Experience Timeline Grid */}
        <div className="relative border-l border-slate-200 dark:border-white/10 ml-3 xl:ml-6 pl-6 xl:pl-10 space-y-10">
          {experienceData.items.map((item, index) => {
            const isCurrent = item.duration.toLowerCase().includes("present");

            return (
              <motion.div
                key={item.company + index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[31px] xl:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 border-UserAccent bg-background flex items-center justify-center shadow-[0_0_12px_rgba(0,255,153,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-UserAccent animate-pulse" />
                </div>

                {/* Experience Card */}
                <div className="p-6 xl:p-8 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-UserAccent/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-UserAccent/5">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {item.position}
                        </h3>
                        <span className="text-UserAccent font-semibold text-lg">
                          @ {item.company}
                        </span>
                        {isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-UserAccent/15 text-UserAccent border border-UserAccent/30">
                            Current Role
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs xl:text-sm text-slate-500 dark:text-white/50 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-UserAccent/80" />
                        <span>{item.duration}</span>
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-UserAccent/80" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-slate-700 dark:text-white/80 text-sm xl:text-base mb-5 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {/* Bullet points */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-2.5 mb-6">
                      {item.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-white/70"
                        >
                          <CheckCircle2 className="w-4 h-4 text-UserAccent shrink-0 mt-0.5" />
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack pills */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50 dark:border-white/5">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-300/40 dark:border-white/10 hover:border-UserAccent/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Experience;
