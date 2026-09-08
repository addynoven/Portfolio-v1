import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Classic cartoon iris-in. As you scroll through the pinned phase, a circular
 * mask opens from a dot into a full-screen reveal of the final CTA. After the
 * iris opens, natural scroll flows into a small footer.
 *
 * Think: "That's all, folks!" — but the reveal goes IN, not out.
 */
export default function IrisOutro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mask = maskRef.current;
    const cta = ctaRef.current;
    const title = titleRef.current;
    const dot = dotRef.current;
    if (!section || !mask || !cta || !title || !dot) return;

    const smooth = { radius: 0 };
    const target = { radius: 0 };

    const writeMask = () => {
      const r = smooth.radius;
      const inner = Math.max(0, r - 3);
      // Transparent HOLE in the centre grows outward; #000 ring stays opaque.
      // Because the div has `bg-black`, the opaque ring shows black, and the
      // transparent centre masks the bg out — revealing the content beneath.
      const g = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${inner}%, #000 ${r}%)`;
      mask.style.maskImage = g;
      mask.style.webkitMaskImage = g;
    };

    writeMask();

    let rafId = 0;
    const tick = () => {
      smooth.radius += (target.radius - smooth.radius) * 0.16;
      writeMask();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Scrub-drive the iris-opening across the pinned phase
    const trigger = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: 'top top',
      end: '+=180%',
      scrub: 0.4,
      onUpdate: self => {
        const p = self.progress;
        // 0 → 90 (circle grows to cover the viewport corners, diagonal is ~70%)
        target.radius = p * 90;

        // CTA + title fade in during the middle third
        const contentReveal = Math.max(0, Math.min(1, (p - 0.25) / 0.55));
        cta.style.opacity = contentReveal.toString();
        title.style.transform = `translateY(${(1 - contentReveal) * 40}px)`;
        title.style.opacity = contentReveal.toString();

        // Center dot fades out as soon as the iris starts opening
        const dotFade = 1 - Math.max(0, Math.min(1, p / 0.12));
        dot.style.opacity = dotFade.toString();
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      trigger.kill();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        data-section-id="iris-outro"
        data-accent="#ffffff"
        data-cursor-label="END"
        className="relative w-full h-screen overflow-hidden"
      >
        {/* The CTA content, sitting behind the mask — reveals as iris opens */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140120] via-black to-[#0a0014] flex flex-col items-center justify-center px-8">
          {/* Soft vignette so the outside black mask blends smoothly */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 80%)',
            }}
          />

          <p className="font-mono text-[10px] tracking-[0.4em] text-white/50 uppercase mb-6">
            Aditya Sahu · Full-Stack & Systems Designer
          </p>

          <h2
            ref={titleRef}
            className="font-sans font-medium text-white text-center leading-[0.9] tracking-tight"
            style={{
              fontSize: 'clamp(3rem,10vw,9rem)',
              willChange: 'transform, opacity',
            }}
          >
            Let's Build<span className="text-[#ff4fd8]">.</span>
          </h2>

          <div
            ref={ctaRef}
            className="mt-12 flex flex-col items-center gap-6"
            style={{ willChange: 'opacity' }}
          >
            <p className="text-center max-w-[500px] text-[clamp(0.95rem,1.1vw,1.05rem)] text-white/70 leading-relaxed">
              You just explored production systems, component architectures, and scroll-driven interactive experiences. Building high-velocity products or resilient distributed backends? Let's connect.
            </p>

            <a
              href="mailto:dmcbaditya@gmail.com"
              data-cursor="hover"
              data-cursor-label="WRITE"
              className="group inline-flex items-stretch gap-[1px]"
            >
              <div className="flex items-center px-8 py-5 bg-white text-black transition-all duration-300 group-hover:bg-[#ff4fd8] group-hover:text-white">
                <span className="font-mono text-[11px] tracking-[0.15em] font-bold">
                  GET IN TOUCH
                </span>
              </div>
              <div className="flex items-center px-5 py-5 bg-white text-black transition-all duration-300 group-hover:bg-[#ff4fd8] group-hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </a>

            <button
              data-cursor="hover"
              data-cursor-label="REWIND"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 font-mono text-[11px] tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase border-b border-white/20 pb-1"
            >
              Back to the top
            </button>
          </div>
        </div>

        {/* Iris mask — black curtain with a transparent hole that grows with scroll. */}
        <div
          ref={maskRef}
          className="absolute inset-0 pointer-events-none bg-black"
          style={{
            maskImage:
              'radial-gradient(circle at 50% 50%, transparent 0%, transparent 0%, #000 0%)',
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, transparent 0%, transparent 0%, #000 0%)',
          }}
        />

        {/* Center dot — cartoon "starting point". Fades out as iris opens. */}
        <div
          ref={dotRef}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </section>

      {/* Small footer that flows in after the pinned iris phase */}
      <footer
        data-section-id="footer"
        data-accent="#ffffff"
        data-cursor-label=""
        className="relative w-full bg-black border-t border-white/10 py-10"
      >
        <div className="w-[90%] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
            © 2026 — Aditya Sahu (@addynoven)
          </p>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
            <a
              href="https://github.com/addynoven"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="VIEW"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/addynoven"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="VIEW"
              className="hover:text-white transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="mailto:dmcbaditya@gmail.com"
              data-cursor="hover"
              data-cursor-label="WRITE"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
