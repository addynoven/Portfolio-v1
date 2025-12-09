"use client";

import { useEffect, useRef, useCallback } from "react";

interface WaterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface WaterDripCanvasProps {
  isActive: boolean;
  width: number;
  height: number;
  originX: number; // Center X of the nav item
  fillLevel: number; // How full the water was (affects amount)
}

const WaterDripCanvas = ({ isActive, width, height, originX, fillLevel }: WaterDripCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<WaterParticle[]>([]);
  const animationRef = useRef<number>(0);
  const hasSpawnedRef = useRef(false);

  const spawnWaterDrip = useCallback(() => {
    if (fillLevel < 10) return; // Don't spawn if barely filled
    
    const particles: WaterParticle[] = [];
    
    // Number of particles based on fill level (fewer = more realistic)
    const particleCount = Math.max(8, Math.min(25, Math.floor(fillLevel / 5)));
    
    // Create main drip stream
    for (let i = 0; i < particleCount; i++) {
      const delay = i * 0.02;
      const spreadX = (Math.random() - 0.5) * 20;
      
      particles.push({
        x: originX + spreadX,
        y: 0,
        vx: spreadX * 0.1 + (Math.random() - 0.5) * 0.5,
        vy: 1 + Math.random() * 2,
        radius: 2 + Math.random() * 3,
        alpha: 0.7 + Math.random() * 0.3,
        life: 0 - delay * 60, // Staggered spawn
        maxLife: 80 + Math.random() * 40,
      });
    }
    
    // Add some smaller splash particles
    for (let i = 0; i < Math.floor(particleCount / 3); i++) {
      particles.push({
        x: originX + (Math.random() - 0.5) * 30,
        y: 5,
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 3,
        radius: 1 + Math.random() * 1.5,
        alpha: 0.5 + Math.random() * 0.3,
        life: -10 - Math.random() * 20,
        maxLife: 60 + Math.random() * 30,
      });
    }
    
    particlesRef.current = particles;
  }, [originX, fillLevel]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    const gravity = 0.25;
    const airResistance = 0.99;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const particles = particlesRef.current;
      let activeParticles = 0;

      particles.forEach((p) => {
        p.life++;
        
        // Skip if not yet spawned
        if (p.life < 0) {
          activeParticles++;
          return;
        }
        
        // Apply physics
        p.vy += gravity;
        p.vx *= airResistance;
        p.vy *= airResistance;
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Calculate alpha based on life
        const lifeRatio = p.life / p.maxLife;
        const currentAlpha = p.alpha * (1 - lifeRatio * lifeRatio);
        
        // Shrink slightly as it falls
        const currentRadius = p.radius * (1 - lifeRatio * 0.3);
        
        if (p.life < p.maxLife && currentAlpha > 0.01) {
          activeParticles++;
          
          // Draw water particle with gradient for depth
          const gradient = ctx.createRadialGradient(
            p.x - currentRadius * 0.3, 
            p.y - currentRadius * 0.3, 
            0,
            p.x, 
            p.y, 
            currentRadius
          );
          gradient.addColorStop(0, `rgba(74, 222, 128, ${currentAlpha})`);
          gradient.addColorStop(0.5, `rgba(34, 197, 94, ${currentAlpha * 0.9})`);
          gradient.addColorStop(1, `rgba(22, 163, 74, ${currentAlpha * 0.6})`);
          
          ctx.beginPath();
          // Slightly elongated for falling water effect
          ctx.ellipse(
            p.x, 
            p.y, 
            currentRadius * 0.8, 
            currentRadius * (1 + Math.min(p.vy * 0.05, 0.5)), 
            0, 
            0, 
            Math.PI * 2
          );
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Add subtle highlight
          ctx.beginPath();
          ctx.arc(
            p.x - currentRadius * 0.2, 
            p.y - currentRadius * 0.2, 
            currentRadius * 0.3, 
            0, 
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.4})`;
          ctx.fill();
        }
      });

      if (activeParticles > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Clear and reset
        ctx.clearRect(0, 0, width, height);
        particlesRef.current = [];
        hasSpawnedRef.current = false;
      }
    };

    if (isActive && !hasSpawnedRef.current && fillLevel > 0) {
      hasSpawnedRef.current = true;
      spawnWaterDrip();
      animate();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, width, height, fillLevel, spawnWaterDrip]);

  // Reset when not active
  useEffect(() => {
    if (!isActive) {
      hasSpawnedRef.current = false;
    }
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-full left-0 pointer-events-none z-50"
      style={{ width, height }}
    />
  );
};

export default WaterDripCanvas;
