import { useEffect, useRef, useState } from 'react';

/**
 * Fixed vertical scroll progress indicator on the right edge.
 * Replaces the native scrollbar (hidden in index.css) with an awwwards-style
 * thin rail + traveling dot + percentage label.
 */
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const scrollable =
        (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const p = Math.max(0, Math.min(1, window.scrollY / scrollable));
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      if (dotRef.current) dotRef.current.style.top = `${p * 100}%`;
      setPercent(Math.round(p * 100));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 right-5 md:right-8 -translate-y-1/2 z-[90] flex flex-col items-center gap-4"
    >
      {/* Rail */}
      <div className="relative w-[1px] h-[40vh] bg-white/10">
        {/* Fill — scales vertically with scroll */}
        <div
          ref={fillRef}
          className="absolute top-0 left-0 w-full h-full bg-white origin-top"
          style={{ transform: 'scaleY(0)' }}
        />
        {/* Traveling dot */}
        <div
          ref={dotRef}
          className="absolute left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ top: '0%' }}
        />
      </div>

      {/* Percent label */}
      <span className="font-mono text-[9px] tracking-[0.3em] text-white/60 tabular-nums">
        {percent.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
