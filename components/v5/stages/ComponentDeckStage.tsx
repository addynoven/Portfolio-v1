"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Layers, Sparkles, Check, Copy, ExternalLink, Code2, ShieldCheck } from "lucide-react";

export default function ComponentDeckStage() {
  const [clicked, setClicked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const copyCommand = () => {
    navigator.clipboard.writeText("npx great-ui@latest add button");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      data-section-id="greatui-deck"
      data-accent="#00f0ff"
      data-cursor-label="EXPLORE"
      className="relative w-full min-h-screen bg-black py-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-t border-white/10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ff00ea]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Context & Architectural Specs */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#00f0ff]" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#00f0ff] uppercase">
              01 / COMPONENT ARCHITECTURE
            </span>
          </div>

          <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-tight text-white">
            GreatUI — React 19 Design Engine
          </h2>

          <p className="text-[15px] text-white/70 leading-relaxed">
            An open-source, zero-runtime React 19 component ecosystem designed with strict accessible primitives, sub-millisecond paint budgets, and CAD-grade micro-interactions.
          </p>

          <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10 font-mono text-xs">
            <div>
              <div className="text-white/40 mb-1">STARS & ADOPTION</div>
              <div className="text-white font-medium text-sm">2,400+ GitHub Stars</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">ACCESSIBILITY</div>
              <div className="text-white font-medium text-sm">WCAG 2.1 AAA Compliant</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">RUNTIME OVERHEAD</div>
              <div className="text-white font-medium text-sm">0 KB Runtime (CSS-native)</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">FRAMEWORK</div>
              <div className="text-white font-medium text-sm">React 19 Server Actions</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={copyCommand}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/60" />}
              <span>npx great-ui@latest add button</span>
            </button>
            <a
              href="https://github.com/addynoven"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: 3D Perspective Exploded Card Deck */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 relative h-[520px] sm:h-[580px] w-full flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {/* Layer 1: Ground Layer - Token Variables & Metadata */}
          <motion.div
            animate={{
              rotateX: -mousePos.y * 12,
              rotateY: mousePos.x * 16,
              x: mousePos.x * -10,
              y: mousePos.y * -10 - 40,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute w-[88%] sm:w-[82%] h-[340px] rounded-2xl bg-[#080808]/90 border border-white/10 p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between"
            style={{
              transform: "translateZ(-80px)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
            }}
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
              <span className="flex items-center gap-1.5 text-[#00f0ff]">
                <Layers className="w-3.5 h-3.5" /> LAYER 01 // TOKENS & ATOMIC ENGINE
              </span>
              <span>ARIA 1.2</span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-[10px] text-white/60">
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                <span className="text-white/30 block">--radius</span>
                <span className="text-white">0.75rem</span>
              </div>
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                <span className="text-white/30 block">--spring</span>
                <span className="text-white">cubic-bezier(0.16, 1, 0.3, 1)</span>
              </div>
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                <span className="text-white/30 block">--backdrop</span>
                <span className="text-white">blur(40px)</span>
              </div>
            </div>

            <div className="font-mono text-[10px] text-white/30 truncate">
              [SHADOW-TREE]: root &gt; component-context &gt; focus-visible-ring &gt; dispatchEvent()
            </div>
          </motion.div>

          {/* Layer 2: Middle Layer - Active Code / Syntax View */}
          <motion.div
            animate={{
              rotateX: -mousePos.y * 14,
              rotateY: mousePos.x * 18,
              x: mousePos.x * 5,
              y: mousePos.y * 5,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute w-[92%] sm:w-[86%] h-[350px] rounded-2xl bg-[#0f0f0f]/90 border border-white/15 p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
            style={{
              transform: "translateZ(0px)",
              boxShadow: "0 20px 40px -15px rgba(0, 240, 255, 0.15)",
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-white/50">GreatButton.tsx</span>
              </div>
              <span className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-wider">
                LAYER 02 // COMPILED PRIMITIVE
              </span>
            </div>

            <div className="font-mono text-xs text-white/70 space-y-1 my-auto">
              <p><span className="text-purple-400">export function</span> <span className="text-blue-400">GreatButton</span>(&#123; children, variant = <span className="text-emerald-300">"cyber"</span> &#125;) &#123;</p>
              <p className="pl-4"><span className="text-purple-400">const</span> [isHovered, setIsHovered] = <span className="text-yellow-300">useHapticHover</span>();</p>
              <p className="pl-4"><span className="text-purple-400">return</span> (</p>
              <p className="pl-8 text-white/90">&lt;<span className="text-cyan-400">motion.button</span> <span className="text-emerald-300">whileHover</span>=&#123;&#123; scale: 1.04 &#125;&#125; <span className="text-emerald-300">whileTap</span>=&#123;&#123; scale: 0.96 &#125;&#125;&gt;</p>
              <p className="pl-12 text-white/50">&#123;children&#125;</p>
              <p className="pl-8">&lt;/<span className="text-cyan-400">motion.button</span>&gt;</p>
              <p className="pl-4">);</p>
              <p>&#125;</p>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-white/40 pt-2 border-t border-white/5">
              <span>TYPESCRIPT 5.7+</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ZERO VULNERABILITIES
              </span>
            </div>
          </motion.div>

          {/* Layer 3: Top Layer - Live Interactive Component Specimen */}
          <motion.div
            animate={{
              rotateX: -mousePos.y * 16,
              rotateY: mousePos.x * 20,
              x: mousePos.x * 15,
              y: mousePos.y * 15 + 40,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 240 }}
            className="absolute w-[96%] sm:w-[90%] h-[330px] rounded-2xl bg-[#141414]/95 border border-[#00f0ff]/30 p-8 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
            style={{
              transform: "translateZ(80px)",
              boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 240, 255, 0.25)",
            }}
          >
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="font-mono text-[10px] tracking-widest text-[#00f0ff] uppercase">
                LAYER 03 // LIVE SPECIMEN
              </span>
            </div>

            <p className="text-center font-mono text-xs text-white/60 max-w-[280px]">
              Click the specimen below to test reactive micro-motion & haptic audio feedback.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setClicked(!clicked)}
              className="relative group px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-wider text-black bg-gradient-to-r from-[#00f0ff] via-[#60efff] to-[#ff00ea] shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <span>{clicked ? "INTERACTION TRIGGERED" : "INITIALIZE COMPONENT"}</span>
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              </div>
            </motion.button>

            {clicked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-4 py-1.5 rounded-full"
              >
                Zero layout shift · 60fps render confirmed
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
