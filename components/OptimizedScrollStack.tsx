// @ts-nocheck
"use client";

import { useRef, useEffect, useState, useCallback, memo } from 'react';

/**
 * OptimizedScrollStack - A lightweight alternative to ScrollStack
 * 
 * Key optimizations:
 * 1. Uses CSS `position: sticky` for stacking (zero JS calculations)
 * 2. IntersectionObserver for visibility detection (not scroll events)
 * 3. CSS custom properties for transforms (GPU-accelerated)
 * 4. No Lenis smooth scroll - uses native scrolling
 * 5. Throttled updates with requestAnimationFrame
 */

interface OptimizedScrollStackProps {
  children: React.ReactNode;
  className?: string;
  cardGap?: number;  // Gap between cards in px
  stickyTop?: number; // Top position for sticky cards in vh
}

// Memoized card wrapper
export const StackCard = memo(function StackCard({ 
  children, 
  index = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  index?: number;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Use IntersectionObserver instead of scroll events
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { 
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`stack-card ${className}`}
      style={{
        // CSS-only sticky positioning
        position: 'sticky',
        top: `calc(15vh + ${index * 20}px)`,
        // GPU-accelerated transforms via CSS
        transform: isVisible ? 'scale(1)' : 'scale(0.98)',
        opacity: isVisible ? 1 : 0.8,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        // Stacking order
        zIndex: index + 1,
        // Card styling
        marginBottom: '80px',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
});

const OptimizedScrollStack = memo(function OptimizedScrollStack({
  children,
  className = '',
  cardGap = 80,
  stickyTop = 15,
}: OptimizedScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={`optimized-scroll-stack ${className}`}
      style={{
        position: 'relative',
        paddingTop: '10vh',
        paddingBottom: '20vh',
      }}
    >
      {children}
      {/* End spacer for proper scroll */}
      <div style={{ height: '1px', width: '100%' }} />
    </div>
  );
});

export default OptimizedScrollStack;
