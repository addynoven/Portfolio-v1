import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Premium section-aware custom cursor.
 * 
 * Replaces the native cursor with a dynamic element that changes shape, size,
 * and appearance based on the current section and hovered elements.
 * 
 * - Default: Small solid dot of the section's accent color.
 * - Section Label: Expands to a glassy ring with the label inside.
 * - Button Hover: Expands to a solid accent-colored circle with dark text.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [accent, setAccent] = useState('#ffffff');
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor so coordinates reflect the center of the dot
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    let rafId = 0;
    let currentSectionId: string | null = null;
    let currentHoverEl: HTMLElement | null = null;
    let mouseX = -1;
    let mouseY = -1;

    const detect = (x: number, y: number) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const el = document.elementFromPoint(x, y) as HTMLElement | null;
        if (!el) return;

        const sectionEl = el.closest<HTMLElement>('[data-section-id]');
        const sectionId = sectionEl?.dataset.sectionId ?? null;

        if (sectionId !== currentSectionId) {
          currentSectionId = sectionId;
          setAccent(sectionEl?.dataset.accent ?? '#ffffff');
        }

        const hoverEl = el.closest<HTMLElement>(
          'a, button, [data-cursor="hover"], [data-cursor-label]'
        );
        const actualHover =
          hoverEl && hoverEl !== sectionEl && !hoverEl.hasAttribute('data-section-id')
            ? hoverEl
            : null;

        if (actualHover !== currentHoverEl) {
          currentHoverEl = actualHover;
        }

        if (currentHoverEl) {
          setIsHovering(true);
          setIsActive(true);
          setLabel(currentHoverEl.dataset.cursorLabel ?? 'CLICK');
        } else if (sectionEl?.dataset.cursorLabel) {
          setIsHovering(false);
          setIsActive(true);
          setLabel(sectionEl.dataset.cursorLabel);
        } else {
          setIsHovering(false);
          setIsActive(false);
          setLabel('');
        }
      });
    };

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
      detect(e.clientX, e.clientY);
    };

    // Re-check section under the cursor whenever the page scrolls
    const handleScroll = () => {
      if (mouseX < 0) return;
      detect(mouseX, mouseY);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const size = isActive ? 80 : 16;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 will-change-transform flex items-center justify-center"
      >
        <div
          className="rounded-full flex items-center justify-center overflow-hidden"
          style={{
            width: size,
            height: size,
            backgroundColor: isActive ? (isHovering ? accent : 'rgba(255,255,255,0.05)') : accent,
            border: `1px solid ${isActive && !isHovering ? accent : 'transparent'}`,
            backdropFilter: isActive && !isHovering ? 'blur(8px)' : 'none',
            WebkitBackdropFilter: isActive && !isHovering ? 'blur(8px)' : 'none',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border 0.4s ease, backdrop-filter 0.4s ease',
            color: isHovering ? '#000000' : '#ffffff',
          }}
        >
          <span
            className="font-mono text-[11px] tracking-[0.2em] font-bold uppercase whitespace-nowrap"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
