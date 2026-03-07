"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroTiltCardProps {
  children: ReactNode;
  className?: string;
}

const HeroTiltCard = ({ children, className = "" }: HeroTiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt (max 15 degrees)
    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;

    setTilt({ x: tiltX, y: tiltY });
    
    // Glare follows mouse
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(34, 197, 94, 0.15) 0%, transparent 60%)`,
        }}
      />
      
      {/* Content with slight z-offset for 3D depth */}
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default HeroTiltCard;
