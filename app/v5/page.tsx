"use client";

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/v5/ScrollReveal';
import CustomCursor from '@/components/v5/CustomCursor';
import Interstitial from '@/components/v5/Interstitial';
import Marquee from '@/components/v5/Marquee';
import VelocityMarquee from '@/components/v5/VelocityMarquee';
import HorizontalGallery from '@/components/v5/HorizontalGallery';
import IrisOutro from '@/components/v5/IrisOutro';
import ScrollProgress from '@/components/v5/ScrollProgress';
import SectionReveal, { type ClipStyle } from '@/components/v5/SectionReveal';
import { SECTIONS } from '@/lib/v5/sections';

const GoogleModelViewer = lazy(() => import('@/components/v5/GoogleModelViewer'));
const WhaleScrubSection = lazy(() => import('@/components/v5/WhaleScrubSection'));
const ThreeDInteractive = lazy(() => import('@/components/v5/ThreeDInteractive'));
import ComponentDeckStage from '@/components/v5/stages/ComponentDeckStage';
import TelemetryOscilloscopeStage from '@/components/v5/stages/TelemetryOscilloscopeStage';
import P2PTunnelStage from '@/components/v5/stages/P2PTunnelStage';

const GALLERY_CARDS = SECTIONS.map(s => ({
  id: s.id,
  title: s.heading,
  subtitle: s.paragraph,
  tags: [s.eyebrow.split('—')[1]?.trim() ?? '', s.cursorLabel].filter(Boolean),
  image: `/sections/${s.folder}/frame_0001.${s.extension ?? 'jpg'}`,
  accent: s.theme.accent,
}));

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function NavItem({ text }: { text: string }) {
  const [cycle, setCycle] = useState(0);

  return (
    <a
      href="#"
      className="relative overflow-hidden group flex items-center justify-center py-1"
      onMouseEnter={() => setCycle(c => c + 1)}
      onMouseLeave={() => setCycle(c => c + 1)}
      data-cursor="hover"
      data-cursor-label="VIEW"
    >
      {cycle === 0 ? (
        <span className="block text-white/64 group-hover:text-white transition-colors duration-300">
          {text}
        </span>
      ) : (
        <React.Fragment key={cycle}>
          <span className="block text-white/64 group-hover:text-white transition-colors duration-300 animate-fly-out-up">
            {text}
          </span>
          <span className="absolute block text-white/64 group-hover:text-white transition-colors duration-300 animate-fly-in-up">
            {text}
          </span>
        </React.Fragment>
      )}
    </a>
  );
}

function LazyOnVisible({
  children,
  className,
  fallback,
  rootMargin = '400px 0px',
}: {
  children: React.ReactNode;
  className?: string;
  fallback: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref} className={className}>{visible ? children : fallback}</div>;
}

const HERO_STEP = 2;
const HERO_FRAME_NUMS: number[] = [];
for (let i = 1; i <= 241; i += HERO_STEP) {
  HERO_FRAME_NUMS.push(i);
}
const TOTAL_FRAMES = HERO_FRAME_NUMS.length;
const ZOOM_FACTOR = 1.35;

export default function V5HomePage() {
  const [arrowCycle, setArrowCycle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chunkProgress, setChunkProgress] = useState<number[]>(new Array(8).fill(0));
  const [loadMessages, setLoadMessages] = useState<{ id: number; text: string }[]>([]);
  const nextMsgId = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const requestRef = useRef<number>(null);

  const canvasStopRef = useRef<HTMLDivElement>(null);
  const screen3Ref = useRef<HTMLDivElement>(null);
  const modelViewerRef = useRef<any>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress: screen3Progress } = useScroll({
    target: screen3Ref,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollY, [0, 1800, 2300], [0, 0, -150]);
  const rotateX = useTransform(screen3Progress, [0, 0.8], [15, 0]);
  const screenY = useTransform(screen3Progress, [0, 0.8], [100, 0]);

  // Locomotive Scroll v5 initialization in useEffect (client only)
  useEffect(() => {
    let loco: any;
    let refreshId: number;

    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      const LocomotiveScroll = LocomotiveScrollModule.default;
      loco = new LocomotiveScroll();
      (window as any).loco = loco;
      refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    }).catch(() => {
      // Fallback if locomotive-scroll fails to instantiate
    });

    return () => {
      if (refreshId) clearTimeout(refreshId);
      if (loco) loco.destroy();
    };
  }, []);

  // Scroll-driven 3D model camera animation
  const FRONT_THETA = 270;
  useEffect(() => {
    const unsubscribe = screen3Progress.on('change', progress => {
      if (!modelViewerRef.current) return;

      let theta: number;
      let radius: string;
      let phi: number;

      if (progress < 0.25) {
        const t = progress / 0.25;
        theta = FRONT_THETA;
        radius = `${3.5 + (6 - 3.5) * t}m`;
        phi = 70;
      } else if (progress < 0.75) {
        const t = (progress - 0.25) / 0.5;
        theta = FRONT_THETA + 360 * t;
        radius = `${6 - (6 - 5) * t}m`;
        phi = 70 - (70 - 60) * t;
      } else {
        const t = (progress - 0.75) / 0.25;
        theta = FRONT_THETA + 360;
        radius = `${5 + (4 - 5) * t}m`;
        phi = 60;
      }

      const cameraOrbit = `${theta.toFixed(1)}deg ${phi.toFixed(1)}deg ${radius}`;
      modelViewerRef.current?.setCameraOrbit?.(cameraOrbit);
    });

    return () => unsubscribe();
  }, [screen3Progress]);

  useEffect(() => {
    const spaceImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let cancelled = false;

    const chunkDone  = new Array(8).fill(0);
    const chunkTotal = new Array(8).fill(0);
    const CHUNK_LABELS = ['CORE HERO', 'GREATUI', 'PING MONITOR', 'DROPX P2P', 'TELEMETRY', 'ARCHITECTURE', 'SCALE DIVE', '3D TOPOLOGY'];

    const announced = new Set<number>();
    const addMsg = (text: string) => {
      const id = ++nextMsgId.current;
      setLoadMessages(prev => [...prev.slice(-4), { id, text }]);
      setTimeout(() => setLoadMessages(prev => prev.filter(m => m.id !== id)), 2200);
    };

    addMsg('INITIALIZING...');

    const rafRef = { id: 0 };
    const poll = () => {
      const progress = chunkTotal.map((t, i) =>
        t > 0 ? Math.round((chunkDone[i] / t) * 100) : 0,
      );
      setChunkProgress(progress);
      if (imagesRef.current.length) return;

      chunkTotal.forEach((t, i) => {
        if (t > 0 && chunkDone[i] >= t && !announced.has(i)) {
          announced.add(i);
          addMsg(`${CHUNK_LABELS[i]} — READY`);
        }
      });

      const allDone = chunkTotal.every((t, i) => t > 0 && chunkDone[i] >= t);
      if (!allDone) {
        rafRef.id = requestAnimationFrame(poll);
      }
    };
    rafRef.id = requestAnimationFrame(poll);

    const heroSrc = (idx: number) =>
      `/sections/space/ezgif-frame-${HERO_FRAME_NUMS[idx].toString().padStart(3, '0')}.jpg`;

    const loadHeroFrame = (idx: number) =>
      new Promise<void>(resolve => {
        const img = new Image();
        spaceImages[idx] = img;
        const done = () => {
          if (!cancelled) {
            chunkDone[0]++;
            if (idx === 0 && !imagesRef.current.length) {
              imagesRef.current = spaceImages;
              setIsLoaded(true);
            }
          }
          resolve();
        };
        img.onload = done;
        img.onerror = done;
        img.src = heroSrc(idx);
      });

    function loadQueue(indices: number[], concurrency = 6) {
      let cursor = 0;
      const worker = async () => {
        while (!cancelled && cursor < indices.length) {
          const idx = indices[cursor++];
          await loadHeroFrame(idx);
        }
      };
      for (let i = 0; i < concurrency; i++) worker();
    }

    chunkTotal[0] = TOTAL_FRAMES;
    for (let i = 1; i <= 7; i++) {
      chunkTotal[i] = 1;
      chunkDone[i] = 1;
    }

    loadHeroFrame(0).then(() => {
      if (cancelled) return;
      const startBackgroundLoad = () => {
        loadQueue(Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) => i + 1), 6);
      };
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(startBackgroundLoad, { timeout: 1200 });
      } else {
        globalThis.setTimeout(startBackgroundLoad, 250);
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.id);
    };
  }, []);

  // Canvas drawing — object-fit: cover + zoom
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const images = imagesRef.current;
    if (!canvas || !ctx) return;

    let img = images[index];
    if (!img?.complete || img.naturalWidth === 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (images[i]?.complete && images[i].naturalWidth > 0) {
          img = images[i];
          break;
        }
      }
    }
    if (!img?.complete || img.naturalWidth === 0) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    const zoomedWidth = drawWidth * ZOOM_FACTOR;
    const zoomedHeight = drawHeight * ZOOM_FACTOR;
    const zoomOffsetX = offsetX - (zoomedWidth - drawWidth) / 2;
    const zoomOffsetY = offsetY - (zoomedHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, zoomOffsetX, zoomOffsetY, zoomedWidth, zoomedHeight);
  };

  // Scroll handler — canvas only plays within the Screen 1 pin zone
  useEffect(() => {
    if (!isLoaded) return;

    drawFrame(0);

    const handleScroll = () => {
      const stop = canvasStopRef.current;
      if (!stop) return;

      const rect = stop.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const stopScroll = Math.max(1, absoluteTop - window.innerHeight * 0.1);

      const scrollFraction = Math.max(0, Math.min(1, window.scrollY / stopScroll));
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(scrollFraction * TOTAL_FRAMES));

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    const handleResize = () => drawFrame(currentFrameRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLoaded]);

  // Mouse parallax on canvas
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(canvas, { x: -x, y: -y, duration: 0.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
          <div className="text-[9px] font-mono tracking-[0.3em] mb-6 text-white/30">LOADING SEQUENCE</div>
          <div className="text-5xl font-mono tabular-nums mb-6">
            {chunkProgress[0] ?? 0}%
          </div>
          <div className="w-56 h-[1px] bg-white/10 overflow-hidden mb-16">
            <div
              className="h-full bg-white transition-all duration-200 ease-out"
              style={{ width: `${chunkProgress[0] ?? 0}%` }}
            />
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
            <AnimatePresence>
              {loadMessages.map((msg: { id: number; text: string }) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 0.45, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5 }}
                  className="text-[9px] font-mono tracking-[0.25em] text-white whitespace-nowrap"
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <CustomCursor />
      <ScrollProgress />

      <div
        className="relative w-full bg-black text-white font-sans"
        style={{ clipPath: 'inset(0)' }}
      >
        {/* Fixed space canvas — visible only during Screen 1 pin zone */}
        <div
          className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden bg-black"
          data-section-id="space"
          data-accent="#ffffff"
          data-cursor-label="DRIFT"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full will-change-transform"
            style={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 pointer-events-none" />
        </div>

        {/* Fixed header */}
        <motion.header
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-20 w-[90%] flex items-center justify-between pointer-events-auto py-4 md:py-6 lg:py-8"
        >
          <a href="#" className="flex items-center gap-3 font-mono tracking-widest text-sm" data-cursor="hover" data-cursor-label="HOME">
            <span className="font-bold text-white tracking-[0.2em]">ADITYA SAHU</span>
            <span className="text-white/40 text-xs tracking-normal">/ 05</span>
          </a>

          <nav className="hidden lg:flex items-stretch bg-[#1A1A1A]/40 backdrop-blur-[80px]">
            <div className="flex items-center justify-between px-6 font-mono text-xs tracking-[-0.01em] w-[480px]">
              <NavItem text="SYSTEMS" />
              <NavItem text="PROJECTS" />
              <NavItem text="ARCHITECTURE" />
              <NavItem text="PHILOSOPHY" />
              <NavItem text="CONTACT" />
            </div>
            <a
              href="mailto:dmcbaditya@gmail.com"
              className="bg-white text-black px-6 py-5 font-mono text-xs leading-4 font-bold tracking-[-0.01em] hover:bg-gray-200 transition-colors w-[148px] flex items-center justify-center text-center"
              data-cursor="hover"
              data-cursor-label="CONNECT"
            >
              LET'S TALK
            </a>
          </nav>
        </motion.header>

        <div className="relative z-10 w-full pointer-events-none">
          {/* ─── SCREEN 1 — Pinned hero, 250vh scroll space for the space frames ─── */}
          <div className="h-[250vh] w-full relative">
            <div className="sticky top-0 h-screen w-[90%] mx-auto flex flex-col justify-between py-8 md:py-12 lg:py-16 pb-8">
              {/* Top HUD Telemetry Ribbon */}
              <div className="pt-12 md:pt-14 flex items-center justify-between pointer-events-auto border-b border-white/5 pb-3">
                <div className="flex items-center gap-3 font-mono text-[11px] text-white/60 tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                  <span className="text-white/90 font-semibold">SYS_CLK: ACTIVE</span>
                  <span className="text-white/20">•</span>
                  <span className="hidden sm:inline text-white/50">LEO-241 SCRUB BUFFER // 120 FPS</span>
                </div>
                <div className="hidden md:flex items-center gap-4 font-mono text-[11px] text-white/50 tracking-wider">
                  <span>REGION: US-EAST-1</span>
                  <span className="text-white/20">|</span>
                  <span className="text-emerald-400 font-semibold">P99 &lt; 12MS</span>
                  <span className="text-white/20">|</span>
                  <span className="text-white/80">LAT 37.77° N, LON 122.41° W</span>
                </div>
              </div>

              <main className="flex-1 w-full pointer-events-auto flex flex-col md:grid md:grid-cols-12 md:grid-rows-[1fr_auto] gap-y-8 md:gap-y-0 md:gap-x-8 py-6">
                <div className="md:row-start-2 md:col-start-1 md:col-span-8 flex items-end">
                  <Reveal delay={0.2}>
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[#00f0ff] tracking-widest uppercase">
                        <span>PRAGMATIC BACKEND SYSTEMS</span>
                      </div>
                      <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-medium tracking-tight text-white whitespace-nowrap">
                        Crafting Resilient<br />
                        Distributed Systems.
                      </h1>
                    </div>
                  </Reveal>
                </div>

                <div className="md:row-start-1 md:col-start-8 md:col-span-5 flex flex-col justify-center items-start md:items-end text-left md:text-right">
                  <Reveal delay={0.3}>
                    <p className="text-[clamp(1rem,1.6vw,1.375rem)] text-white/64 leading-[1.3] font-normal max-w-[460px]">
                      Full-Stack Developer & Pragmatic Backend System Designer. Engineering high-concurrency microservices, modular monoliths, and interactive web craft with zero fluff.{' '}
                      <span className="font-semibold text-white">Scroll the architecture.</span>
                    </p>
                  </Reveal>
                </div>

                <div className="md:row-start-2 md:col-start-8 md:col-span-5 flex items-end justify-start md:justify-end">
                  <Reveal delay={0.4}>
                    <div
                      className="flex items-stretch gap-1 group cursor-pointer"
                      onClick={() => {
                        window.scrollTo({ top: window.innerHeight * 2.2, behavior: 'smooth' });
                      }}
                      onMouseEnter={() => setArrowCycle(c => c + 1)}
                      onMouseLeave={() => setArrowCycle(c => c + 1)}
                      data-cursor="hover"
                      data-cursor-label="EXPLORE"
                    >
                      <div className="flex items-center px-8 py-5 bg-white/8 backdrop-blur-[80px] group-hover:bg-white transition-colors duration-300">
                        <span className="font-mono text-[12px] tracking-[-0.01em] text-white/90 group-hover:text-black transition-colors duration-300">
                          EXPLORE SYSTEMS
                        </span>
                      </div>
                      <div className="relative flex items-center justify-center px-6 bg-white/8 backdrop-blur-[80px] group-hover:bg-white transition-colors duration-300 overflow-hidden">
                        {arrowCycle === 0 ? (
                          <ArrowRight className="w-5 h-5 text-white/90 group-hover:text-black transition-colors duration-300" />
                        ) : (
                          <React.Fragment key={arrowCycle}>
                            <ArrowRight className="w-5 h-5 text-white/90 group-hover:text-black transition-colors duration-300 animate-fly-out" />
                            <ArrowRight className="absolute w-5 h-5 text-white/90 group-hover:text-black transition-colors duration-300 animate-fly-in" />
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </main>

              {/* Bottom HUD Telemetry Status */}
              <div className="flex items-center justify-between font-mono text-[10px] text-white/40 tracking-widest uppercase border-t border-white/5 pt-3">
                <div className="flex items-center gap-3">
                  <span>INDEX: 01 // ORBITAL SCRUB</span>
                  <span className="text-white/20">/</span>
                  <span className="text-[#00f0ff]">3 BESPOKE LABS BELOW</span>
                </div>
                <div className="hidden sm:block">
                  <span>MODULAR MONOLITH • INTEGRATION-FIRST • ZERO VENDOR LOCK-IN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas stop marker — space animation completes exactly here */}
          <div ref={canvasStopRef} />

          {/* ─── SCREEN 2 — Opaque section ─── */}
          <div
            className="relative w-full bg-black pointer-events-auto"
            data-section-id="screen2"
            data-accent="#ffffff"
            data-cursor-label="READ"
          >
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

            <div className="w-[90%] mx-auto py-24 md:py-32 lg:py-40">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={3}
                blurStrength={4}
                textClassName="text-[clamp(2rem,4.5vw,4rem)] leading-[1.1] font-medium tracking-tight text-white w-full"
              >
                Clarity Over Cleverness. Control Over Convention. Feature-Driven Architecture Engineered To Handle High-Concurrency Telemetry And Scale Without Friction.
              </ScrollReveal>

              <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                <Reveal delay={0.1} className="md:col-span-4 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center font-mono text-xs font-bold text-white">
                      01
                    </div>
                    <span className="font-mono text-xs tracking-widest text-white/40 uppercase">ARCHITECTURE</span>
                  </div>
                  <h3 className="text-xl font-medium text-white">Feature-Driven<br />Modular Monolith</h3>
                  <p className="text-[15px] text-white/80 leading-relaxed">
                    Co-located modules with predictable boundaries. If something fails, you find it immediately — not across 100 scattered layer files. MVP-first, evolve as the system demands.
                  </p>
                </Reveal>

                <Reveal delay={0.2} className="md:col-span-4 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center font-mono text-xs font-bold text-white">
                      02
                    </div>
                    <span className="font-mono text-xs tracking-widest text-white/40 uppercase">ENGINEERING</span>
                  </div>
                  <h3 className="text-xl font-medium text-white">Pragmatic<br />Distributed Systems</h3>
                  <p className="text-[15px] text-white/80 leading-relaxed">
                    Real-time event pipelines with Go, WebSocket pooling, and MQTT fan-out. Low-latency telemetry caching with PostgreSQL JSONB and Redis hashes benchmarked at P99 &lt; 12ms.
                  </p>
                </Reveal>

                <Reveal delay={0.3} className="md:col-span-4 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center font-mono text-xs font-bold text-white">
                      03
                    </div>
                    <span className="font-mono text-xs tracking-widest text-white/40 uppercase">FRONTEND</span>
                  </div>
                  <h3 className="text-xl font-medium text-white">Interactive Craft<br />& Component Systems</h3>
                  <p className="text-[15px] text-white/80 leading-relaxed">
                    Fluid 60fps scroll canvas mechanics, React 19 component library design (GreatUI, 2.4k+ stars), and subtle micro-interactions built for speed, accessibility, and zero dropped frames.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* ─── WHALE SCRUB SECTION ─── */}
        <div data-section-id="whale" data-accent="#4fc3f7" data-cursor-label="DIVE">
          <LazyOnVisible fallback={<div className="h-[300vh] bg-[#020d1a]" />}>
            <Suspense fallback={<div className="h-[300vh] bg-[#020d1a]" />}>
              <WhaleScrubSection />
            </Suspense>
          </LazyOnVisible>
        </div>

        {/* ─── VELOCITY MARQUEE BLOCK ─── */}
        <div className="pointer-events-auto relative bg-black py-32 md:py-48 overflow-hidden">
          <div className="absolute inset-0 flex flex-col gap-8 md:gap-12 justify-center">
            <VelocityMarquee
              items={[
                'ADITYA SAHU',
                'MODULAR MONOLITH',
                'P99 < 12MS',
                'GO & TYPESCRIPT',
                'REDIS & POSTGRES',
                'EVENT PIPELINES',
              ]}
              angle={-6}
              baseSpeed={0.35}
              scrollBoost={0.4}
              bg="#3d34ff"
              fg="#efe9df"
            />
            <VelocityMarquee
              items={[
                'CLARITY OVER CLEVERNESS',
                'HIGH CONCURRENCY',
                'GREATUI REACT 19',
                'ZERO FLUFF',
                'DISTRIBUTED SYSTEMS',
                'FAIL FAST',
              ]}
              angle={5}
              baseSpeed={-0.3}
              scrollBoost={-0.42}
              bg="#0a0a0a"
              fg="#ff4fd8"
            />
          </div>
          <div className="h-[52vh] md:h-[60vh]" />
        </div>

        {/* ─── MARQUEE ─── */}
        <div className="pointer-events-auto">
          <Marquee
            items={['PRAGMATIC ARCHITECTURE', 'FEATURE-DRIVEN', 'LOW LATENCY', 'FAIL FAST', 'STRUCTURED LOGS', 'TYPE-SAFE']}
            accent="#ffffff"
            drift={800}
          />
        </div>

        {/* ─── HORIZONTAL GALLERY ─── */}
        <div className="pointer-events-auto">
          <HorizontalGallery
            eyebrow="ENGINEERING SHOWCASE — PINNED HORIZONTAL"
            heading="Production Systems & Architectural Studies"
            cards={GALLERY_CARDS}
          />
        </div>

        {/* ─── 3 BESPOKE INTERACTIVE ENGINEERING STAGES (ZERO REPETITIVE TEMPLATES) ─── */}
        <div className="pointer-events-auto">
          {/* Stage 3A: GreatUI Component Deck (3D Exploded Perspective & Specimen Sandbox) */}
          <SectionReveal clipStyle="swipe-up">
            <ComponentDeckStage />
          </SectionReveal>

          {/* Interstitial Bridge 01 */}
          <Interstitial
            variant="scramble"
            number="02"
            nextLabel="PING TELEMETRY OSCILLOSCOPE"
            quote="P99 Latency Is Not A Metric You Hope For. It Is An Invariant You Engineer With Microsecond Channel Multiplexing."
            accent="#00f0ff"
            nextImage="/sections/earth/frame_0001.jpg"
          />

          {/* Stage 3B: Ping Live Telemetry Oscilloscope (Realtime Canvas & Load Concurrency Slider) */}
          <SectionReveal clipStyle="inset-expand">
            <TelemetryOscilloscopeStage />
          </SectionReveal>

          {/* Interstitial Bridge 02 */}
          <Interstitial
            variant="door"
            number="03"
            nextLabel="DROPX ZERO-KNOWLEDGE P2P"
            quote="Zero Server Storage. Zero Central Relays. Direct In-Browser Cryptographic Pipes Over WebRTC SCTP."
            accent="#3d34ff"
            nextImage="/sections/nebula/frame_0001.jpg"
          />

          {/* Stage 3C: DropX WebRTC P2P Mesh Tunnel (Direct Packet Stream & Encrypted Payload Transmission) */}
          <SectionReveal clipStyle="circle-expand">
            <P2PTunnelStage />
          </SectionReveal>
        </div>

        {/* ─── WEBGL BLOB ─── */}
        <div className="pointer-events-auto">
          <LazyOnVisible fallback={<div className="h-screen bg-[#050014]" />}>
            <Suspense fallback={<div className="h-screen bg-[#050014]" />}>
              <ThreeDInteractive />
            </Suspense>
          </LazyOnVisible>
        </div>

        {/* ─── SCREEN 3 — 3D Model ─── */}
        <div
          ref={screen3Ref}
          className="w-full h-[300vh] pointer-events-auto relative"
          data-section-id="model"
          data-accent="#ffffff"
          data-cursor-label="ORBIT"
        >
          <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
            <motion.div
              style={{ rotateX, y: screenY, transformOrigin: 'bottom center' }}
              className="w-[80vw] h-[80vh] bg-[#1A1A1A]/40 backdrop-blur-[80px] border border-white/10 flex flex-col items-center justify-center p-8 relative"
            >
              <div className="absolute top-8 left-8 z-10 pointer-events-none flex flex-col gap-2">
                <h3 className="text-[18px] font-sans font-medium text-white uppercase tracking-wide">
                  SYSTEM ARCHITECTURE TOPOLOGY
                </h3>
                <p className="text-[12px] font-sans text-white/64 max-w-[320px]">
                  Interactive 3D representation of resilient modular infrastructure. Scroll to orbit — examine boundaries, service isolation, and cluster topology.
                </p>
              </div>

              <div className="absolute top-8 right-8 z-10 pointer-events-none">
                <table className="font-mono text-[10px] text-white/80 border-separate border-spacing-x-4 border-spacing-y-1">
                  <tbody>
                    <tr><td className="text-right text-white/50">ENGINEER:</td><td className="font-medium text-white">Aditya Sahu (@addynoven)</td></tr>
                    <tr><td className="text-right text-white/50">STACK:</td><td className="font-medium text-white">Go · TypeScript · Next.js</td></tr>
                    <tr><td className="text-right text-white/50">DATA:</td><td className="font-medium text-white">PostgreSQL · Redis Hashes</td></tr>
                    <tr><td className="text-right text-white/50">REALTIME:</td><td className="font-medium text-white">WebSockets · MQTT Pub/Sub</td></tr>
                    <tr><td className="text-right text-white/50">RUNTIME:</td><td className="font-medium text-white">Docker · Linux Systemd</td></tr>
                    <tr><td className="text-right text-white/50">METRICS:</td><td className="font-medium text-white">P99 &lt; 12ms · 60fps Scroll</td></tr>
                    <tr><td className="text-right text-white/50">PARADIGM:</td><td className="font-medium text-white">Modular Monolith</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="w-full h-full flex items-center justify-center">
                <LazyOnVisible className="w-full h-full" fallback={<div className="w-full h-full" />} rootMargin="1600px 0px">
                  <Suspense fallback={<div className="w-full h-full" />}>
                    <GoogleModelViewer
                      ref={modelViewerRef}
                      src="/forest_house.glb"
                      autoRotate={false}
                      cameraControls={true}
                      shadowIntensity={0.5}
                      exposure={1}
                      cameraOrbit="270deg 70deg 3.5m"
                    />
                  </Suspense>
                </LazyOnVisible>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── IRIS OUTRO ─── */}
        <div className="pointer-events-auto">
          <IrisOutro />
        </div>
      </div>
    </>
  );
}
