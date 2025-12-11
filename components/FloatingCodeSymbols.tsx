"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

// Generate symbols on client only to avoid hydration mismatch


const FloatingCodeSymbols = () => {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([]);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only generate random symbols on client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const isMobile = window.innerWidth < 768;
    // Reduce count on mobile
    const count = isMobile ? 8 : 25;
    
    // Generate here instead of helper function to easy access count
    const generated: FloatingSymbol[] = [];
    for (let i = 0; i < count; i++) {
        generated.push({
            id: i,
            symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
            x: 5 + Math.random() * 90,
            startY: 100 + Math.random() * 20,
            size: 0.6 + Math.random() * 0.8,
            duration: 12 + Math.random() * 15,
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
      <>
          {symbols.map((sym) => (
            <motion.div
              key={sym.id}
              className="absolute font-mono font-bold select-none"
              style={{
                left: `${sym.x}%`,
                fontSize: `${sym.size}rem`,
                textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
              }}
              initial={{
                top: `${sym.startY}%`,
                opacity: 0,
                rotate: sym.rotation,
                x: 0,
              }}
              animate={{
                top: "-15%",
                opacity: [0, 0.35, 0.35, 0.2, 0],
                rotate: [sym.rotation, sym.rotation + 20, sym.rotation - 10, sym.rotation + 15],
                x: [0, sym.drift, sym.drift * 0.5, sym.drift * 1.5],
              }}
              transition={{
                duration: sym.duration,
                delay: sym.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="text-UserAccent/30 dark:text-UserAccent/25">
                {sym.symbol}
              </span>
            </motion.div>
          ))}
          
          {/* Glowing orbs */}
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)",
              left: "10%",
              top: "20%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
              right: "15%",
              bottom: "30%",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
    </div>
  );
};

export default FloatingCodeSymbols;
