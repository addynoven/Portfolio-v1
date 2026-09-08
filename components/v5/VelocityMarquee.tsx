import { ReactNode, useEffect, useRef } from 'react';

interface VelocityMarqueeProps {
  items: string[];
  /** Diagonal rotation in degrees. Awwwards-style tapes use ±8–14. */
  angle?: number;
  /** Base drift velocity in px/frame. Marquee keeps moving even when idle. */
  baseSpeed?: number;
  /** Multiplier applied to scroll velocity. Higher = more reactive. */
  scrollBoost?: number;
  /** Tape background colour */
  bg?: string;
  /** Text colour */
  fg?: string;
  /** Vertical padding in px */
  paddingY?: number;
  /** Optional separator between items */
  separator?: ReactNode;
}

/**
 * Horizontal tape whose x-offset is driven by (a) a constant base drift plus
 * (b) the page's scroll velocity. Scrolling down adds forward motion;
 * scrolling up reverses it. Classic Truck'N Roll / Awwwards pattern.
 */
export default function VelocityMarquee({
  items,
  angle = 0,
  baseSpeed = 0.4,
  scrollBoost = 0.35,
  bg = '#3d34ff',
  fg = '#efe9df',
  paddingY = 28,
  separator,
}: VelocityMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0; // smoothed scroll delta (per frame)
    let rafId = 0;

    const tick = () => {
      const curY = window.scrollY;
      const delta = curY - lastScrollY;
      lastScrollY = curY;

      // EMA smoothing so velocity decays naturally after scroll stops
      velocity = velocity * 0.85 + delta * 0.15;

      // Base drift + scroll-velocity contribution.
      // Scroll DOWN (positive delta) → tape moves RIGHT-to-LEFT faster.
      // Scroll UP (negative delta) → tape reverses direction briefly.
      offset += baseSpeed + velocity * scrollBoost;

      // Seamless loop: track holds 2 copies of content side by side, so wrap
      // after one full copy's width has scrolled past.
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (offset >= halfWidth) offset -= halfWidth;
        else if (offset < 0) offset += halfWidth;
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [baseSpeed, scrollBoost]);

  // Duplicate items so when the track scrolls one full copy width, there's
  // still content on screen
  const content = [...items, ...items];

  return (
    <div
      ref={rootRef}
      data-section-id="velocity-marquee"
      data-accent={fg}
      data-cursor-label="DRIFT"
      className="relative w-full overflow-hidden select-none"
      style={{ transform: `rotate(${angle}deg)`, backgroundColor: bg }}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-12 md:gap-20 whitespace-nowrap will-change-transform"
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
      >
        {content.map((item, i) => (
          <div key={i} className="flex items-center gap-12 md:gap-20 shrink-0">
            <span
              className="font-sans font-extrabold italic tracking-tight leading-none"
              style={{
                fontSize: 'clamp(3rem,7.5vw,7rem)',
                color: fg,
              }}
            >
              {item}
            </span>
            {separator ?? (
              <span
                className="shrink-0"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '9999px',
                  backgroundColor: fg,
                  opacity: 0.8,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
