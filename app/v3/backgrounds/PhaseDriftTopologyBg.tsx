'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface PhaseDriftTopologyBgProps {
  className?: string;
}

export default function PhaseDriftTopologyBg({ className }: PhaseDriftTopologyBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const CONFIG = {
      particleCount: 2500,
      noiseScale: 0.002,
      phase1: 0.25,
      phase2: 0.60,
      mouseInfluence: 0.08,
    };

    let width = 0, height = 0;
    let particles: PDParticle[] = [];
    let time = 0;
    const mouse = { x: -9999, y: -9999 };

    // --- Noise Module ---
    const perm = new Uint8Array(512);
    const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];

    function seedNoise() {
      for (let i = 0; i < 256; i++) perm[i] = i;
      for (let i = 0; i < 256; i++) {
        const j = Math.floor(Math.random() * 256);
        const tmp = perm[i]; perm[i] = perm[j]; perm[j] = tmp;
        perm[i + 256] = perm[i];
      }
    }

    function dot(g: number[], x: number, y: number) { return g[0] * x + g[1] * y; }

    function noise(x: number, y: number): number {
      let X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
      const u = fade(x), v = fade(y);
      const n00 = dot(grad3[perm[X + perm[Y]] % 12], x, y);
      const n01 = dot(grad3[perm[X + perm[Y + 1]] % 12], x, y - 1);
      const n10 = dot(grad3[perm[X + 1 + perm[Y]] % 12], x - 1, y);
      const n11 = dot(grad3[perm[X + 1 + perm[Y + 1]] % 12], x - 1, y - 1);
      return 0.5 + 0.5 * (n00 + u * (n10 - n00) + v * (n01 - n00) + u * (v * (n11 - n01 + n00 - n10) + n10 - n00));
    }

    // --- Particle Class ---
    class PDParticle {
      x: number = 0;
      y: number = 0;
      vx = 0;
      vy = 0;
      phase = 0;
      life: number;
      baseColor: number;

      constructor(randomizePos = true) {
        this.life = Math.random();
        this.baseColor = isDark
          ? (Math.random() > 0.8 ? 255 : 200)   // white/light gray on dark bg
          : (Math.random() > 0.8 ? 20  : 60);   // near-black/dark gray on light bg
        if (randomizePos) this.respawn();
      }

      respawn() {
        let attempts = 0;
        while (attempts < 8) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          const n = noise(this.x * CONFIG.noiseScale, this.y * CONFIG.noiseScale + time * 0.0001);
          if (n > CONFIG.phase1) break;
          attempts++;
        }
      }

      update() {
        if (isNaN(this.x) || isNaN(this.y)) { this.respawn(); return; }

        const nVal = noise(this.x * CONFIG.noiseScale, this.y * CONFIG.noiseScale + time * 0.0001);
        let targetVx = 0, targetVy = 0;
        let friction = 0.95;

        if (nVal < CONFIG.phase1) {
          this.phase = 0;
          targetVx = (Math.random() - 0.5) * 0.1;
          targetVy = (Math.random() - 0.5) * 0.1;
          friction = 0.90;
        } else if (nVal < CONFIG.phase2) {
          this.phase = 1;
          const angle = nVal * Math.PI * 8;
          targetVx = Math.cos(angle) * 1.8;
          targetVy = Math.sin(angle) * 1.8;
          friction = 0.96;
        } else {
          this.phase = 2;
          if (Math.random() < 0.3) {
            const angle = nVal * Math.PI * 18 + time * 0.2;
            targetVx = Math.cos(angle) * 4;
            targetVy = Math.sin(angle) * 4;
            friction = 0.98;
          } else {
            const angle = nVal * Math.PI * 8;
            targetVx = Math.cos(angle) * 2.5;
            targetVy = Math.sin(angle) * 2.5;
            friction = 0.97;
          }
        }

        this.vx += (targetVx - this.vx) * 0.05;
        this.vy += (targetVy - this.vy) * 0.05;

        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle + Math.PI / 2) * force * CONFIG.mouseInfluence * 5;
          this.vy += Math.sin(angle + Math.PI / 2) * force * CONFIG.mouseInfluence * 5;
        }

        this.vx *= friction;
        this.vy *= friction;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        this.life += 0.01;
      }

      draw() {
        if (this.phase === 0 && Math.random() > 0.4) return;
        let alpha = 0;
        let size = 1.0;

        if (this.phase === 0) { alpha = 0.12; size = 0.8; }
        else if (this.phase === 1) { alpha = 0.35; size = 1.2; }
        else { alpha = 0.8; size = 1.6; }

        alpha *= (0.7 + 0.3 * Math.sin(this.life));

        ctx.fillStyle = `rgba(${this.baseColor}, ${this.baseColor}, ${this.baseColor}, ${alpha})`;
        ctx.beginPath();
        ctx.rect(this.x, this.y, size, size);
        ctx.fill();
      }
    }

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      seedNoise();
      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new PDParticle(true));
      }
    }

    let animationId = 0;

    function animate() {
      ctx.fillStyle = isDark ? '#030303' : '#f5f5f8';
      ctx.fillRect(0, 0, width, height);
      time += 0.5 + Math.sin(time * 0.005) * 0.3;

      for (const p of particles) {
        p.update();
        p.draw();
      }
      animationId = requestAnimationFrame(animate);
    }

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1, display: 'block' }}
    />
  );
}
