import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type InterstitialVariant = 'quote' | 'wordwall' | 'scramble' | 'door';

interface InterstitialProps {
  variant: InterstitialVariant;
  /** Two-digit section number, e.g. "02" */
  number: string;
  /** Short title for the UPCOMING section */
  nextLabel: string;
  /** Pull-quote from the section that just ended */
  quote: string;
  /** Accent colour to tint the number + divider */
  accent: string;
  /** Cursor label while hovering the panel */
  cursorLabel?: string;
  /** Optional path to a still of the upcoming section, used as a dim backdrop */
  nextImage?: string;
}

/** Dim image teaser — blurred, accent-washed, sits behind the interstitial content */
function NextTeaser({ src, accent }: { src?: string; accent: string }) {
  if (!src) return null;
  return (
    <>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(28px) saturate(1.15)',
          transform: 'scale(1.15)',
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${accent}33 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
    </>
  );
}

export default function Interstitial(props: InterstitialProps) {
  if (props.variant === 'wordwall') return <WordWallInterstitial {...props} />;
  if (props.variant === 'scramble') return <ScrambleInterstitial {...props} />;
  if (props.variant === 'door') return <DoorInterstitial {...props} />;
  return <QuoteInterstitial {...props} />;
}

/* ---------- Variant A — QuoteBridge (number slam + pull quote) ---------- */
function QuoteInterstitial({
  number,
  nextLabel,
  quote,
  accent,
  cursorLabel = 'NEXT',
  nextImage,
}: InterstitialProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        numberRef.current,
        { x: '-100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: root, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      );
      gsap.fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      );
      gsap.fromTo(
        nextRef.current,
        { x: '100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power4.out',
          scrollTrigger: { trigger: root, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-section-id={`interstitial-${number}`}
      data-accent={accent}
      data-cursor-label={cursorLabel}
      className="relative w-full min-h-[70vh] bg-black flex items-center overflow-hidden"
    >
      <NextTeaser src={nextImage} accent={accent} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />

      <div className="relative z-10 w-[90%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-20">
        <div
          ref={numberRef}
          data-scroll
          data-scroll-speed="-0.4"
          className="md:col-span-5 font-mono font-light leading-[0.85] tracking-tighter select-none"
          style={{ fontSize: 'clamp(6rem,16vw,14rem)', color: accent }}
        >
          {number}
        </div>

        <div className="md:col-span-7 flex flex-col gap-8">
          <p
            ref={quoteRef}
            className="font-sans font-medium italic text-white leading-[1.1]"
            style={{ fontSize: 'clamp(1.4rem,2.8vw,2.4rem)' }}
          >
            “{quote}”
          </p>

          <div ref={nextRef} className="flex items-center gap-4">
            <span className="block w-16 h-[1px]" style={{ backgroundColor: accent }} />
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
              Next — <span style={{ color: accent }}>{nextLabel}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Variant B — WordWall (hoverable grid of related words) ---------- */
function WordWallInterstitial({
  number,
  nextLabel,
  quote,
  accent,
  cursorLabel = 'SCAN',
  nextImage,
}: InterstitialProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Derive a wall of words — split the quote + pad with related words
  const base = quote
    .replace(/[“”".,]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0);
  const padding = ['//', '—', '01', '02', '03', '04', '05', 'ENTER', 'HOLD', 'LISTEN', 'AGAIN', 'SOON', '★', '◇', '◎'];
  const words: string[] = [];
  for (let i = 0; i < 48; i++) {
    words.push(i % 3 === 2 ? padding[i % padding.length] : base[i % base.length]);
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const nodes = root.querySelectorAll('[data-wall-word]');
      gsap.fromTo(
        nodes,
        { y: 20, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: { amount: 1.1, from: 'random' },
          scrollTrigger: { trigger: root, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-section-id={`interstitial-${number}`}
      data-accent={accent}
      data-cursor-label={cursorLabel}
      className="relative w-full min-h-[70vh] bg-black py-20 overflow-hidden"
    >
      <NextTeaser src={nextImage} accent={accent} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />

      {/* Corner frame info */}
      <div className="absolute top-8 left-[5%] pointer-events-none z-10">
        <div className="flex items-center gap-3">
          <span className="block w-8 h-[1px]" style={{ backgroundColor: accent }} />
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>
            /{number} — INDEX
          </p>
        </div>
      </div>
      <div className="absolute top-8 right-[5%] pointer-events-none z-10">
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Next · <span style={{ color: accent }}>{nextLabel}</span>
        </p>
      </div>

      <div className="relative z-10 w-[90%] mx-auto h-full flex items-center">
        <div className="flex flex-wrap gap-x-6 gap-y-3 leading-none">
          {words.map((w, i) => (
            <span
              key={i}
              data-wall-word
              className="font-sans font-medium tracking-tight cursor-pointer transition-colors duration-300"
              style={{
                fontSize: 'clamp(1.4rem,3.2vw,3rem)',
                color: 'rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = accent;
                gsap.to(e.currentTarget, {
                  scale: 1.08,
                  y: -4,
                  duration: 0.3,
                  ease: 'power3.out',
                });
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.12)';
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  duration: 0.4,
                  ease: 'power3.out',
                });
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Variant C — Scramble (title glitches into place) ---------- */
function ScrambleInterstitial({
  number,
  nextLabel,
  quote,
  accent,
  cursorLabel = 'DECODE',
  nextImage,
}: InterstitialProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(nextLabel);

  useEffect(() => {
    const root = rootRef.current;
    const title = titleRef.current;
    if (!root || !title) return;

    const target = nextLabel.toUpperCase();
    const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>?#*';
    let frame = 0;
    let rafId = 0;
    let stopRef = { current: false };

    const scramble = () => {
      const DURATION = 55; // frames
      const REVEAL_START = 15;
      const tick = () => {
        if (stopRef.current) return;
        frame++;
        const out = target
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            const revealAt = REVEAL_START + i * 2;
            if (frame >= revealAt) return ch;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join('');
        setDisplayText(out);
        if (frame < DURATION) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplayText(target);
        }
      };
      tick();
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 75%',
      onEnter: () => {
        frame = 0;
        stopRef.current = false;
        scramble();
      },
      onLeaveBack: () => {
        stopRef.current = true;
        setDisplayText(nextLabel.toUpperCase());
      },
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: { trigger: root, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      );
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: { trigger: root, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      );
    }, root);

    return () => {
      stopRef.current = true;
      cancelAnimationFrame(rafId);
      trigger.kill();
      ctx.revert();
    };
  }, [nextLabel]);

  return (
    <section
      ref={rootRef}
      data-section-id={`interstitial-${number}`}
      data-accent={accent}
      data-cursor-label={cursorLabel}
      className="relative w-full min-h-[70vh] bg-black flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      <NextTeaser src={nextImage} accent={accent} />
      {/* Crosshair frame corners */}
      <CrossCorner position="top-left" accent={accent} />
      <CrossCorner position="top-right" accent={accent} />
      <CrossCorner position="bottom-left" accent={accent} />
      <CrossCorner position="bottom-right" accent={accent} />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase mb-6">
          INCOMING · CH{number}
        </p>

        <h2
          ref={titleRef}
          className="font-mono font-medium text-white text-center leading-[1] tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem,7vw,6rem)',
            textShadow: '0 4px 32px rgba(0,0,0,0.8)',
          }}
        >
          {displayText}
        </h2>

        <div
          ref={barRef}
          className="mt-10 h-[1px] w-[min(30vw,300px)] origin-left"
          style={{ backgroundColor: accent }}
        />

        <p
          ref={quoteRef}
          className="mt-10 max-w-[540px] px-6 text-center text-[clamp(0.95rem,1.1vw,1.05rem)] italic text-white/70 leading-relaxed"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
        >
          “{quote}”
        </p>
      </div>
    </section>
  );
}

/* ---------- Variant D — Door (two panels split apart, revealing the next section) ---------- */
function DoorInterstitial({
  number,
  nextLabel,
  quote,
  accent,
  cursorLabel = 'ENTER',
  nextImage,
}: InterstitialProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const inner = innerRef.current;
    if (!root || !left || !right || !inner) return;

    const ctx = gsap.context(() => {
      // Doors start closed (cover screen), scrub apart as user scrolls through
      gsap.fromTo(
        left,
        { xPercent: 0 },
        {
          xPercent: -100,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        right,
        { xPercent: 0 },
        {
          xPercent: 100,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
      // Inner content zooms in slightly as doors open
      gsap.fromTo(
        inner,
        { scale: 0.92, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'center center',
            scrub: 0.6,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-section-id={`interstitial-${number}`}
      data-accent={accent}
      data-cursor-label={cursorLabel}
      className="relative w-full h-[100vh] bg-black overflow-hidden"
    >
      {/* Inner "room" behind the doors — uses a blurred still of the next
          section so opening the doors reveals an actual preview of what's coming */}
      <div
        ref={innerRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-8 z-0 overflow-hidden"
      >
        <NextTeaser src={nextImage} accent={accent} />
        <div className="relative z-10 flex flex-col items-center">
          <p
            className="font-mono text-[10px] tracking-[0.35em] uppercase mb-5"
            style={{ color: accent }}
          >
            CH /{number} · NOW ENTERING
          </p>
          <h2
            className="font-sans font-medium text-white text-center leading-[0.9] tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem,8vw,6.5rem)',
              textShadow: '0 4px 32px rgba(0,0,0,0.8)',
            }}
          >
            {nextLabel}
          </h2>
          <p className="mt-8 max-w-[520px] text-center text-[clamp(0.95rem,1.1vw,1.05rem)] italic text-white/70 leading-relaxed" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
            “{quote}”
          </p>
          <div
            className="mt-10 w-[1px] h-12"
            style={{ backgroundColor: accent, opacity: 0.6 }}
          />
        </div>
      </div>

      {/* Left door panel */}
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-black z-10 will-change-transform border-r"
        style={{ borderColor: `${accent}66` }}
      >
        <div
          data-scroll
          data-scroll-speed="0.2"
          className="absolute top-8 left-8 font-mono font-light leading-none select-none"
          style={{
            fontSize: 'clamp(4rem,8vw,7rem)',
            color: accent,
            letterSpacing: '-0.05em',
            opacity: 0.45,
          }}
        >
          {number}
        </div>
        <div className="absolute bottom-8 right-6 flex items-center gap-3">
          <div className="w-8 h-[1px]" style={{ backgroundColor: accent }} />
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
            OPENING
          </p>
        </div>
      </div>

      {/* Right door panel */}
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-black z-10 will-change-transform border-l"
        style={{ borderColor: `${accent}66` }}
      >
        <div className="absolute top-8 right-8 flex items-center gap-3">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
            SCROLL
          </p>
          <div className="w-8 h-[1px]" style={{ backgroundColor: accent }} />
        </div>
        <div
          className="absolute bottom-8 left-6 font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: accent }}
        >
          → {nextLabel}
        </div>
      </div>
    </section>
  );
}

function CrossCorner({
  position,
  accent,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  accent: string;
}) {
  const classes = {
    'top-left': 'top-6 left-6 border-t border-l',
    'top-right': 'top-6 right-6 border-t border-r',
    'bottom-left': 'bottom-6 left-6 border-b border-l',
    'bottom-right': 'bottom-6 right-6 border-b border-r',
  }[position];
  return (
    <span
      className={`absolute w-6 h-6 pointer-events-none ${classes}`}
      style={{ borderColor: accent, opacity: 0.6 }}
    />
  );
}
