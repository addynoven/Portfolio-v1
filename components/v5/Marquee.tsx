import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  items: string[];
  /** Scroll-driven horizontal drift (in px across the whole section scroll). Default 600. */
  drift?: number;
  /** Accent colour for divider dots */
  accent?: string;
}

/**
 * Horizontal text marquee whose x-offset is driven by page scroll.
 * Used as a bridge between content blocks. One screen tall, silent and wide.
 */
export default function Marquee({ items, drift = 600, accent = '#ffffff' }: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -drift,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [drift]);

  // Repeat content enough times to fill any viewport
  const content = [...items, ...items, ...items];

  return (
    <section
      ref={rootRef}
      data-section-id="marquee"
      data-accent={accent}
      data-cursor-label="DRIFT"
      className="relative w-full h-[40vh] bg-black flex items-center overflow-hidden select-none"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />

      <div
        ref={trackRef}
        className="flex items-center gap-10 md:gap-16 whitespace-nowrap will-change-transform"
      >
        {content.map((item, i) => (
          <div key={i} className="flex items-center gap-10 md:gap-16">
            <span
              className="font-sans font-medium tracking-tight text-white"
              style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}
            >
              {item}
            </span>
            <span
              className="block w-3 h-3 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
