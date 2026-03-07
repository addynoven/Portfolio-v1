"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazyRenderProps {
  children: ReactNode;
  className?: string;
  /** Root margin for intersection observer (default: "100px" - preload slightly before visible) */
  rootMargin?: string;
  /** Keep rendered after first view (default: false - unmount when out of view) */
  keepMounted?: boolean;
  /** Placeholder to show while not rendered */
  placeholder?: ReactNode;
}

/**
 * LazyRender - Only renders children when the component is in/near the viewport.
 * Uses IntersectionObserver to detect visibility and unmounts heavy components when off-screen.
 * This is critical for performance with heavy WebGL/Three.js/Canvas components.
 */
export function LazyRender({
  children,
  className = "",
  rootMargin = "100px",
  keepMounted = false,
  placeholder = null,
}: LazyRenderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible) {
          setHasBeenVisible(true);
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  // Determine if we should render children
  const shouldRender = keepMounted ? hasBeenVisible : isVisible;

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : placeholder}
    </div>
  );
}

export default LazyRender;
