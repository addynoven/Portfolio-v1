"use client";

import { useState } from "react";
import { FaArrowRight, FaCode, FaLayerGroup, FaUserGroup, FaBookOpen } from "react-icons/fa6";
import BentoModal from "./BentoModal";
import TechStackCard from "./TechStackCard";

export default function AboutMeCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section 
        className="col-span-12 md:col-span-12 lg:col-span-4 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-3.5 backdrop-blur-md flex flex-col justify-between shadow-lg min-h-[220px]"
        data-purpose="about-me-card"
        id="about"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
            // ABOUT ME
          </span>
          <button 
            onClick={() => setModalOpen(true)}
            className="text-[9px] text-[#00FF87] hover:underline flex items-center gap-1 font-medium"
          >
            <span>More about me</span>
            <FaArrowRight className="text-[7px]" />
          </button>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-white leading-snug">
            Building scalable systems &amp; elegant digital products.
          </h3>
          <p className="text-[9px] text-[#718784] mt-1 leading-relaxed">
            I specialize in API design, system architecture, and modular monoliths. I enjoy working at the intersection of performance, developer experience, and clean design. Currently focused on building real-world projects and exploring AI/ML integrations.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-2 gap-1.5 mt-2 pt-1.5 border-t border-[#121f1c]">
          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#091110] border border-[#152622]">
            <FaCode className="text-[#00FF87] text-[11px] shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-white leading-none">Clean Code</p>
              <p className="text-[7.5px] text-[#697d7a] mt-0.5">Maintainable</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#091110] border border-[#152622]">
            <FaLayerGroup className="text-[#00FF87] text-[11px] shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-white leading-none">Scalable Systems</p>
              <p className="text-[7.5px] text-[#697d7a] mt-0.5">Production Ready</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#091110] border border-[#152622]">
            <FaUserGroup className="text-[#00FF87] text-[11px] shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-white leading-none">User Focused</p>
              <p className="text-[7.5px] text-[#697d7a] mt-0.5">Real World Impact</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#091110] border border-[#152622]">
            <FaBookOpen className="text-[#00FF87] text-[11px] shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-white leading-none">Lifelong Learner</p>
              <p className="text-[7.5px] text-[#697d7a] mt-0.5">Always Exploring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Story Modal */}
      <BentoModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        title="About Aditya Sahu"
        description="Engineering background, career path, and systems design philosophy"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min text-white">
          <div className="md:col-span-2 bg-[#0f141c] rounded-2xl p-6 border border-white/10 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-3">// My Story</h2>
            <div className="space-y-3 text-sm text-[#c6d7d4] leading-relaxed">
              <p>
                I am a software engineer based in India with a deep passion for building scalable, high-throughput, and user-centric systems. With a background in backend architecture and a keen eye for clean aesthetics, I bridge the gap between complex logic and seamless user experiences.
              </p>
              <p>
                My philosophy centers around <span className="text-[#00FF87] font-semibold">clarity over cleverness</span>. I believe in modular monoliths, black-box integration testing, and architecture that you can reason about under pressure.
              </p>
            </div>
          </div>

          <div className="bg-[#0f141c] rounded-2xl p-6 border border-white/10 shadow-sm">
            <span className="text-[#00FF87] uppercase tracking-widest text-[10px] font-mono font-bold block mb-3">// Core Principles</span>
            <ul className="space-y-2.5 text-sm text-[#c6d7d4]">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
                Feature-Driven Architecture
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
                Strict Type Boundaries
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
                Predictable REST &amp; Event APIs
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
                Integration-First Testing
              </li>
            </ul>
          </div>
        </div>
      </BentoModal>
    </>
  );
}
