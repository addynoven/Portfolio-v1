"use client";
import { useEffect, useId, useRef, useState, memo } from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  [key: string]: any;
}

// Pure CSS animated square - NO React re-renders
const AnimatedSquare = memo(function AnimatedSquare({
  x,
  y,
  width,
  height,
  delay,
  duration,
  maxOpacity,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
  maxOpacity: number;
}) {
  return (
    <rect
      className="grid-square"
      width={width - 1}
      height={height - 1}
      x={x * width + 1}
      y={y * height + 1}
      fill="currentColor"
      strokeWidth="0"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        '--max-opacity': maxOpacity,
      } as React.CSSProperties}
    />
  );
});

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: GridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<{ id: number; pos: [number, number] }[]>([]);

  function getPos(): [number, number] {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  function generateSquares(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  }

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <>
      {/* CSS Keyframes - GPU accelerated */}
      <style jsx global>{`
        @keyframes gridSquarePulse {
          0%, 100% { opacity: 0; }
          50% { opacity: var(--max-opacity, 0.5); }
        }
        .grid-square {
          animation: gridSquarePulse ease-in-out infinite;
          will-change: opacity;
        }
      `}</style>
      <svg
        ref={containerRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(({ pos: [posX, posY], id }, index) => (
            <AnimatedSquare
              key={`${posX}-${posY}-${index}`}
              x={posX}
              y={posY}
              width={width}
              height={height}
              delay={index * 0.1}
              duration={duration * 2}
              maxOpacity={maxOpacity}
            />
          ))}
        </svg>
      </svg>
    </>
  );
}

export default GridPattern;
