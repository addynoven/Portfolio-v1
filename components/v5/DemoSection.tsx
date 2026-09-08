import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameScrubSection from './FrameScrubSection';
import type { SectionConfig } from '@/lib/v5/sections';

gsap.registerPlugin(ScrollTrigger);

interface DemoSectionProps {
  config: SectionConfig;
  /** 1-based section index used in the big marginal number */
  index: number;
}

export default function DemoSection({ config, index }: DemoSectionProps) {
  return (
    <section
      data-section-id={config.id}
      data-accent={config.theme.accent}
      data-cursor-label={config.cursorLabel}
      className="relative"
    >
      {config.variant === 'cinematic' && <CinematicVariant config={config} index={index} />}
      {config.variant === 'poster' && <PosterVariant config={config} index={index} />}
      {config.variant === 'spotlight' && <SpotlightVariant config={config} index={index} />}
    </section>
  );
}

/* ---------- Cinematic — bottom-left heading, full-bleed canvas ---------- */
function CinematicVariant({ config, index }: { config: SectionConfig; index: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  // The text block that receives the 3D tilt parallax
  const textBlockRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entry animations
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const chars = headingRef.current?.querySelectorAll('[data-char]');
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.012,
            scrollTrigger: { trigger: root, start: 'top 70%', toggleActions: 'play none none none' },
          },
        );
      }
      gsap.fromTo(
        [eyebrowRef.current, paragraphRef.current, indexRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: 'top 70%', toggleActions: 'play none none none' },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  // Mouse parallax — 3D tilt on the text block
  useEffect(() => {
    const el = textBlockRef.current;
    if (!el) return;

    const qx  = gsap.quickTo(el, 'x',       { duration: 0.9, ease: 'power3.out' });
    const qy  = gsap.quickTo(el, 'y',       { duration: 0.9, ease: 'power3.out' });
    const qrx = gsap.quickTo(el, 'rotateX', { duration: 0.9, ease: 'power3.out' });
    const qry = gsap.quickTo(el, 'rotateY', { duration: 0.9, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 → 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      qx(nx * 14);
      qy(ny * 8);
      qrx(-ny * 5);
      qry(nx * 7);
    };

    const handleLeave = () => { qx(0); qy(0); qrx(0); qry(0); };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const { theme } = config;

  return (
    <div ref={rootRef}>
      <FrameScrubSection
        framePathPrefix={`./sections/${config.folder}/frame_`}
        totalFrames={config.frames}
        padLength={config.padLength}
        scrollHeight={config.scrollHeight}
        bgColor={theme.bg}
        zoom={config.zoom}
        loops={config.loops}
        framesStep={config.framesStep}
        extension={config.extension}
        edgeFades={false}
      >
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${theme.accent}22 0%, transparent 60%)` }}
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        <span
          ref={indexRef}
          className="absolute top-[12%] right-[5%] font-mono leading-none font-light pointer-events-none select-none"
          style={{
            fontSize: 'clamp(6rem,14vw,12rem)',
            color: theme.accent,
            opacity: 0.18,
            letterSpacing: '-0.05em',
          }}
        >
          {index.toString().padStart(2, '0')}
        </span>

        <div ref={eyebrowRef} className="absolute top-[12%] left-[5%] z-10 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[1px]" style={{ backgroundColor: theme.accent }} />
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: theme.accent }}
            >
              {config.eyebrow}
            </p>
          </div>
        </div>

        {/* Perspective wrapper so rotateX/Y give true 3D depth */}
        <div
          className="absolute bottom-[14%] left-[5%] right-[5%] z-10 pointer-events-none"
          style={{ perspective: '800px' }}
        >
          <div ref={textBlockRef} className="max-w-[880px]" style={{ willChange: 'transform' }}>
            <h2
              ref={headingRef}
              className="font-sans font-medium leading-[0.95] tracking-tight text-white overflow-hidden"
              style={{
                fontSize: 'clamp(2.5rem,7vw,6.5rem)',
                textShadow: '0 4px 32px rgba(0,0,0,0.8)',
              }}
            >
              {config.heading.split('').map((ch, i) => (
                <span
                  key={i}
                  data-char
                  className="inline-block"
                  style={{ whiteSpace: ch === ' ' ? 'pre' : undefined }}
                >
                  {ch}
                </span>
              ))}
            </h2>

            <p
              ref={paragraphRef}
              className="mt-6 max-w-[520px] text-[clamp(0.95rem,1.2vw,1.125rem)] leading-relaxed"
              style={{ color: theme.textMuted, textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
            >
              {config.paragraph}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 right-[5%] z-10 pointer-events-none flex items-center gap-3">
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: theme.textMuted }}
          >
            Scroll
          </p>
          <div className="w-8 h-[1px]" style={{ backgroundColor: theme.accent, opacity: 0.5 }} />
        </div>
      </FrameScrubSection>
    </div>
  );
}

/* ---------- Poster — centered split headline that slams in opposite directions ---------- */
function PosterVariant({ config, index }: { config: SectionConfig; index: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  // Scroll-triggered entry animations
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { x: '-40%', opacity: 0, filter: 'blur(12px)' },
        {
          x: '0%',
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: { trigger: root, start: 'top 60%', toggleActions: 'play none none none' },
        },
      );
      gsap.fromTo(
        line2Ref.current,
        { x: '40%', opacity: 0, filter: 'blur(12px)' },
        {
          x: '0%',
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power4.out',
          delay: 0.1,
          scrollTrigger: { trigger: root, start: 'top 60%', toggleActions: 'play none none none' },
        },
      );
      gsap.fromTo(
        [eyebrowRef.current, paragraphRef.current, indexRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: { trigger: root, start: 'top 60%', toggleActions: 'play none none none' },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  // Mouse parallax — opposing shift on the two headline lines
  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!l1 || !l2) return;

    const ql1 = gsap.quickTo(l1, 'x', { duration: 1.0, ease: 'power3.out' });
    const ql2 = gsap.quickTo(l2, 'x', { duration: 1.0, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 → 1
      ql1(nx * 22);   // line 1 drifts right with mouse
      ql2(-nx * 22);  // line 2 opposes — widens the split at extremes
    };

    // On leave, snap lines back to their scroll-animated position
    const handleLeave = () => { ql1(0); ql2(0); };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const { theme } = config;
  const [l1, l2] = config.headingLines ?? [config.heading, ''];

  return (
    <div ref={rootRef}>
      <FrameScrubSection
        framePathPrefix={`./sections/${config.folder}/frame_`}
        totalFrames={config.frames}
        padLength={config.padLength}
        scrollHeight={config.scrollHeight}
        bgColor={theme.bg}
        zoom={config.zoom}
        loops={config.loops}
        framesStep={config.framesStep}
        extension={config.extension}
        edgeFades={false}
      >
        {/* Heavy central vignette so centered text is readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.75) 75%)`,
          }}
        />

        {/* Corner eyebrow */}
        <div ref={eyebrowRef} className="absolute top-[10%] left-[5%] z-10 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-[1px]" style={{ backgroundColor: theme.accent }} />
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: theme.accent }}
            >
              {config.eyebrow}
            </p>
          </div>
        </div>

        {/* Corner index */}
        <span
          ref={indexRef}
          className="absolute top-[10%] right-[5%] font-mono leading-none font-light pointer-events-none select-none"
          style={{
            fontSize: 'clamp(3rem,6vw,5rem)',
            color: theme.accent,
            letterSpacing: '-0.05em',
          }}
        >
          /{index.toString().padStart(2, '0')}
        </span>

        {/* Centered poster headline — lines drift apart/together on mouse move */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 pointer-events-none overflow-hidden">
          <h2
            className="font-sans font-medium leading-[0.9] tracking-tight text-white text-center w-full"
            style={{
              fontSize: 'clamp(3rem,10vw,9rem)',
              textShadow: '0 4px 48px rgba(0,0,0,0.9)',
            }}
          >
            <span ref={line1Ref} className="block" style={{ willChange: 'transform' }}>
              {l1}
            </span>
            {l2 && (
              <span
                ref={line2Ref}
                className="block italic"
                style={{
                  color: theme.accent,
                  willChange: 'transform',
                }}
              >
                {l2}
              </span>
            )}
          </h2>

          <p
            ref={paragraphRef}
            className="mt-10 text-center max-w-[540px] text-[clamp(0.95rem,1.2vw,1.125rem)] leading-relaxed"
            style={{ color: theme.textMuted, textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
          >
            {config.paragraph}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-2">
          <div className="w-[1px] h-12" style={{ backgroundColor: theme.accent, opacity: 0.5 }} />
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: theme.textMuted }}
          >
            Scroll
          </p>
        </div>
      </FrameScrubSection>
    </div>
  );
}

/* ---------- Spotlight — canvas only visible inside a cursor-following circle ---------- */
function SpotlightVariant({ config, index }: { config: SectionConfig; index: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  // Text card gets a counter-parallax against the mask, adding depth
  const textCardRef = useRef<HTMLDivElement>(null);

  // Spotlight mask + scroll-driven radius
  useEffect(() => {
    const mask = maskRef.current;
    const root = rootRef.current;
    if (!mask || !root) return;

    const smooth = { mx: 50, my: 50, radius: 30 };
    const target = { mx: 50, my: 50, radius: 30 };
    const scrollState = { base: 30, hoverBoost: 0 };

    const writeMask = () => {
      const inner = Math.max(0, smooth.radius - 4);
      const g = `radial-gradient(circle at ${smooth.mx}% ${smooth.my}%, transparent 0%, transparent ${inner}%, #000 ${smooth.radius}%)`;
      mask.style.maskImage = g;
      mask.style.webkitMaskImage = g;
    };

    writeMask();

    let rafId = 0;
    const tick = () => {
      target.radius = scrollState.base + scrollState.hoverBoost;
      smooth.mx += (target.mx - smooth.mx) * 0.18;
      smooth.my += (target.my - smooth.my) * 0.18;
      smooth.radius += (target.radius - smooth.radius) * 0.12;
      writeMask();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const scrollTrigger = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: self => {
        const p = self.progress;
        const shape = p < 0.5 ? p * 2 : 1 - (p - 0.5) * 1.4;
        scrollState.base = 22 + shape * 48;
      },
    });

    const handleMove = (e: MouseEvent) => {
      const rect = mask.getBoundingClientRect();
      const within =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (within) {
        target.mx = ((e.clientX - rect.left) / rect.width) * 100;
        target.my = ((e.clientY - rect.top) / rect.height) * 100;
        scrollState.hoverBoost = 14;
      } else {
        scrollState.hoverBoost = 0;
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      scrollTrigger.kill();
    };
  }, []);

  // Scroll entry animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, paragraphRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root, start: 'top 70%', toggleActions: 'play none none none' },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  // Mouse parallax — text card drifts slightly opposite the spotlight for depth
  useEffect(() => {
    const card = textCardRef.current;
    if (!card) return;

    const qx = gsap.quickTo(card, 'x', { duration: 1.1, ease: 'power3.out' });
    const qy = gsap.quickTo(card, 'y', { duration: 1.1, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      // Move opposite the spotlight: creates impression spotlight is on a layer behind text
      qx(-nx * 10);
      qy(-ny * 7);
    };

    const handleLeave = () => { qx(0); qy(0); };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const { theme } = config;

  return (
    <div ref={rootRef}>
      <FrameScrubSection
        framePathPrefix={`./sections/${config.folder}/frame_`}
        totalFrames={config.frames}
        padLength={config.padLength}
        scrollHeight={config.scrollHeight}
        bgColor={theme.bg}
        zoom={config.zoom}
        loops={config.loops}
        framesStep={config.framesStep}
        extension={config.extension}
        edgeFades={false}
      >
        {/* Mask overlay — blacks out everything except a cursor-following disc */}
        <div
          ref={maskRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: theme.bg,
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, transparent 0%, transparent 36%, #000 40%)',
            maskImage:
              'radial-gradient(circle at 50% 50%, transparent 0%, transparent 36%, #000 40%)',
          }}
        />

        {/* Text card with counter-parallax against the spotlight */}
        <div
          ref={textCardRef}
          className="absolute top-[10%] left-[5%] z-10 max-w-[380px] pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-[1px]" style={{ backgroundColor: theme.accent }} />
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: theme.accent }}
            >
              {config.eyebrow}
            </p>
          </div>
          <h2
            ref={headingRef}
            className="font-sans font-medium leading-[1] tracking-tight text-white mb-5"
            style={{ fontSize: 'clamp(2rem,3.5vw,3rem)' }}
          >
            {config.heading}
          </h2>
          <p
            ref={paragraphRef}
            className="text-[0.95rem] leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            {config.paragraph}
          </p>
        </div>

        <div className="absolute bottom-8 right-[5%] z-10 pointer-events-none flex items-center gap-3">
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: theme.textMuted }}
          >
            Move cursor
          </p>
          <div className="w-8 h-[1px]" style={{ backgroundColor: theme.accent, opacity: 0.5 }} />
        </div>

        <span
          className="absolute bottom-[8%] right-[5%] font-mono leading-none font-light pointer-events-none select-none z-0"
          style={{
            fontSize: 'clamp(6rem,14vw,12rem)',
            color: theme.accent,
            opacity: 0.25,
            letterSpacing: '-0.05em',
          }}
        >
          {index.toString().padStart(2, '0')}
        </span>
      </FrameScrubSection>
    </div>
  );
}
