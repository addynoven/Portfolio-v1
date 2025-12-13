"use client";

import { useState, useEffect, useRef, memo } from "react";
import { useAccentColor } from "@/lib/accentColor";

const codeSymbols = [
  "</>", "{}", "()", "[]", "=>", "&&",
  "const", "async", "React", "Node",
  "<div>", "npm", "API", "function",
];

interface FloatingSymbol {
  id: number;
  symbol: string;
  x: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  drift: number;
}

// Helper to convert hex to rgb
const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "34, 197, 94";
};

// Pure CSS animated floating symbol - NO React re-renders
const FloatingSymbol = memo(function FloatingSymbol({ 
  sym, 
  accentRgb 
}: { 
  sym: FloatingSymbol; 
  accentRgb: string;
}) {
  return (
    <div
      className="floating-symbol absolute font-mono font-bold select-none text-UserAccent/30 dark:text-UserAccent/25"
      style={{
        left: `${sym.x}%`,
        fontSize: `${sym.size}rem`,
        textShadow: `0 0 20px rgba(${accentRgb}, 0.5)`,
        animationDuration: `${sym.duration}s`,
        animationDelay: `${sym.delay}s`,
        // CSS custom properties for unique drift per element
        '--start-y': `${sym.startY}%`,
        '--rotation': `${sym.rotation}deg`,
        '--drift': `${sym.drift}px`,
      } as React.CSSProperties}
    >
      {sym.symbol}
    </div>
  );
});

const FloatingCodeSymbols = memo(function FloatingCodeSymbols() {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([]);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const accentColor = useAccentColor();
  const accentRgb = hexToRgb(accentColor);

  useEffect(() => {
    setIsClient(true);
    const isMobile = window.innerWidth < 768;
    // Reduced count for better performance
    const count = isMobile ? 6 : 15;
    
    const generated: FloatingSymbol[] = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        x: 5 + Math.random() * 90,
        startY: 100 + Math.random() * 20,
        size: 0.6 + Math.random() * 0.8,
        duration: 15 + Math.random() * 10, // Slower for less CPU
        delay: Math.random() * -15,
        rotation: Math.random() * 40 - 20,
        drift: (Math.random() - 0.5) * 30,
      });
    }
    setSymbols(generated);
  }, []);

  if (!isClient) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* CSS Keyframes - GPU accelerated, no React re-renders */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            top: var(--start-y, 100%);
            opacity: 0;
            transform: translateX(0) rotate(var(--rotation, 0deg));
          }
          10% {
            opacity: 0.35;
          }
          80% {
            opacity: 0.2;
          }
          100% {
            top: -15%;
            opacity: 0;
            transform: translateX(var(--drift, 0px)) rotate(calc(var(--rotation, 0deg) + 15deg));
          }
        }
        .floating-symbol {
          animation: floatUp linear infinite;
          will-change: transform, opacity;
        }
        
        @keyframes pulseOrb {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2) translate(30px, -20px);
            opacity: 0.5;
          }
        }
        .glow-orb {
          animation: pulseOrb 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .glow-orb-2 {
          animation: pulseOrb 10s ease-in-out infinite reverse;
        }
      `}</style>

      {symbols.map((sym) => (
        <FloatingSymbol key={sym.id} sym={sym} accentRgb={accentRgb} />
      ))}
      
      {/* Glowing orbs - CSS animated */}
      <div
        className="glow-orb absolute w-64 h-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${accentRgb}, 0.15) 0%, transparent 70%)`,
          left: "10%",
          top: "20%",
        }}
      />
      <div
        className="glow-orb glow-orb-2 absolute w-48 h-48 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${accentRgb}, 0.1) 0%, transparent 70%)`,
          right: "15%",
          bottom: "30%",
        }}
      />
    </div>
  );
});

export default FloatingCodeSymbols;
