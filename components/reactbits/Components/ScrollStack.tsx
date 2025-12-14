// @ts-nocheck
"use client";

import { useLayoutEffect, useRef, useCallback, memo } from 'react';

/**
 * OPTIMIZED ScrollStack - Performance-focused rewrite
 * 
 * Key optimizations vs original:
 * 1. Throttled scroll updates (every 2 frames instead of every frame)
 * 2. Cached DOM reads - no getBoundingClientRect in scroll handler
 * 3. Reduced transform complexity - only essential transforms
 * 4. No Lenis by default - native scroll for better performance
 * 5. GPU-accelerated with will-change hints
 * 6. Batch DOM updates
 */

const scrollStackCardStyle = {
  position: 'relative' as const,
  width: '100%',
  minHeight: '20rem',
  marginTop: '2rem',
  marginBottom: '2rem',
  padding: '3rem',
  borderRadius: '40px',
  boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box' as const,
  transformOrigin: 'top center',
  willChange: 'transform',
  backfaceVisibility: 'hidden' as const,
  overflow: 'hidden' as const,
};

export const ScrollStackItem = memo(function ScrollStackItem({ children, itemClassName = '' }) {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()} style={scrollStackCardStyle}>
      {children}
    </div>
  );
});

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  disableSmooth?: boolean;
}

const ScrollStack = memo(function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete = undefined,
  disableSmooth = false,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cachedOffsetsRef = useRef<number[]>([]);
  const lastScrollRef = useRef(0);
  const frameCountRef = useRef(0);
  const endPositionRef = useRef(0);

  // Throttled scroll handler - runs every 2nd frame
  const handleScroll = useCallback(() => {
    frameCountRef.current++;
    
    // Skip every other frame for performance
    if (frameCountRef.current % 2 !== 0) {
      animationFrameRef.current = requestAnimationFrame(handleScroll);
      return;
    }

    const scrollTop = useWindowScroll ? window.scrollY : (scrollerRef.current?.scrollTop || 0);
    
    // Skip if scroll hasn't changed significantly
    if (Math.abs(scrollTop - lastScrollRef.current) < 1) {
      animationFrameRef.current = requestAnimationFrame(handleScroll);
      return;
    }
    lastScrollRef.current = scrollTop;

    const containerHeight = useWindowScroll ? window.innerHeight : (scrollerRef.current?.clientHeight || 0);
    const stackPositionPx = parseFloat(stackPosition) / 100 * containerHeight;
    const scaleEndPositionPx = parseFloat(scaleEndPosition) / 100 * containerHeight;

    // Batch read all card positions first (avoid layout thrashing)
    const cards = cardsRef.current;
    const offsets = cachedOffsetsRef.current;

    // Batch write all transforms
    let transforms: string[] = [];
    
    cards.forEach((card, i) => {
      if (!card || offsets[i] === undefined) return;

      const cardTop = offsets[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endPositionRef.current - containerHeight / 2;

      // Progress calculation
      let scaleProgress = 0;
      if (scrollTop >= triggerStart && scrollTop <= triggerEnd) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop > triggerEnd) {
        scaleProgress = 1;
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? (i * rotationAmount * scaleProgress) : 0;

      // Pin calculation
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      // Single transform string - minimal operations
      const transform = `translate3d(0, ${Math.round(translateY)}px, 0) scale(${scale.toFixed(3)})${rotation ? ` rotate(${rotation.toFixed(1)}deg)` : ''}`;
      
      // Direct style update (batched in single frame)
      card.style.transform = transform;
    });

    animationFrameRef.current = requestAnimationFrame(handleScroll);
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    useWindowScroll,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Query cards once
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    // Set up cards
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.zIndex = String(i + 1);
    });

    // Cache initial positions ONCE (this is the key optimization)
    const scrollTop = useWindowScroll ? window.scrollY : scroller.scrollTop;
    cachedOffsetsRef.current = cards.map((card) => {
      if (useWindowScroll) {
        const rect = card.getBoundingClientRect();
        return rect.top + scrollTop;
      } else {
        return card.offsetTop;
      }
    });

    // Cache end position
    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scroller.querySelector('.scroll-stack-end');
    if (endElement) {
      if (useWindowScroll) {
        const rect = endElement.getBoundingClientRect();
        endPositionRef.current = rect.top + scrollTop;
      } else {
        endPositionRef.current = (endElement as HTMLElement).offsetTop;
      }
    }

    // Start animation loop (native scroll, no Lenis)
    animationFrameRef.current = requestAnimationFrame(handleScroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      cardsRef.current = [];
      cachedOffsetsRef.current = [];
    };
  }, [
    itemDistance,
    useWindowScroll,
    handleScroll,
  ]);

  const scrollerStyle = useWindowScroll ? {} : {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    overflowY: 'auto' as const,
    overflowX: 'visible' as const,
    WebkitOverflowScrolling: 'touch' as const,
  };

  const innerStyle = {
    paddingTop: '20vh',
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',
    paddingBottom: '10rem',
    minHeight: '100vh',
  };

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef} style={scrollerStyle}>
      <div className="scroll-stack-inner" style={innerStyle}>
        {children}
        <div className="scroll-stack-end" style={{ width: '100%', height: '1px' }} />
      </div>
    </div>
  );
});

export default ScrollStack;
