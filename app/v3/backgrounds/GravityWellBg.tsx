'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

function setupCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  const W   = canvas.offsetWidth;
  const H   = canvas.offsetHeight;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  return { W, H, ctx };
}

// ── Gravity well — wanders slowly, pulls everything toward it ─────────────────
interface Well {
  x:   number;
  y:   number;
  vx:  number;   // slow drift velocity
  vy:  number;
  mass: number;  // controls pull strength
}

// ── Particle — has position, velocity, age, color ────────────────────────────
interface Particle {
  x:   number;
  y:   number;
  vx:  number;
  vy:  number;
  age: number;
  life: number;
  hue: number;   // shifts with speed — slow=cold, fast=hot
}

interface GravityBackgroundProps {
  className?:     string;
  opacity?:       number;
  /** Number of wandering gravity wells (default 3) */
  wellCount?:     number;
  /** Number of particles (default 700) */
  particleCount?: number;
  /** Mouse well strength. Positive = attract, negative = repel (default -18) */
  mouseStrength?: number;
}

export default function GravityBackground({
  className,
  opacity       = 1,
  wellCount     = 3,
  particleCount = 700,
  mouseStrength = -18,  // repel by default — push particles away like breath on glass
}: GravityBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let { W, H, ctx } = setupCanvas(canvas);

    // ── Mouse well — updated via event listener ───────────────────────────────
    const mouse = { x: -9999, y: -9999, active: false };

    function onMouseMove(e: MouseEvent) {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x      = e.clientX - rect.left;
      mouse.y      = e.clientY - rect.top;
      mouse.active = true;
    }
    function onMouseLeave() { mouse.active = false; }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // ── Spawn wells — placed thoughtfully around the canvas ──────────────────
    function spawnWell(i: number, total: number): Well {
      // Spread wells across canvas using golden angle — avoids clustering
      const angle = (i / total) * Math.PI * 2 * 1.618;
      const r     = Math.min(W, H) * (0.2 + Math.random() * 0.25);
      return {
        x:    W / 2 + Math.cos(angle) * r,
        y:    H / 2 + Math.sin(angle) * r,
        vx:   (Math.random() - 0.5) * 0.25,   // very slow drift
        vy:   (Math.random() - 0.5) * 0.25,
        mass: 280 + Math.random() * 200,
      };
    }

    // ── Spawn particle — random position, small orbital velocity ─────────────
    function spawnParticle(): Particle {
      // Give particles a slight tangential velocity so they orbit rather than
      // fall straight in — this is what creates the beautiful spiral arms
      const x  = Math.random() * W;
      const y  = Math.random() * H;
      const speed = 0.4 + Math.random() * 0.8;
      const ang   = Math.random() * Math.PI * 2;
      return {
        x, y,
        vx:   Math.cos(ang) * speed,
        vy:   Math.sin(ang) * speed,
        age:  Math.random() * 80,   // stagger ages so canvas fills immediately
        life: 180 + Math.random() * 240,
        hue:  220,
      };
    }

    const wells     = Array.from({ length: wellCount },     (_, i) => spawnWell(i, wellCount));
    const particles = Array.from({ length: particleCount }, spawnParticle);

    // Paint deep space background once
    const spaceBg = isDark ? 'rgb(4, 6, 14)' : 'rgb(245, 245, 250)';
    const spaceBgFade = isDark ? 'rgba(4, 6, 14, 0.055)' : 'rgba(245, 245, 250, 0.055)';
    ctx.fillStyle = spaceBg;
    ctx.fillRect(0, 0, W, H);

    // ── Physics constants ─────────────────────────────────────────────────────
    const G          = 1;        // gravitational constant (tuned for beauty)
    const MIN_DIST   = 18;       // softening — prevents infinite force at r→0
    const MAX_SPEED  = 6.5;      // terminal velocity
    const DAMPING    = 0.995;    // tiny drag so particles don't accelerate forever

    let rafId = 0;

    function frame() {
      // ── Fade trails — the heart of the visual ────────────────────────────
      // Low alpha = long glowing trails like orbital streaks in astrophotography
      ctx.fillStyle = spaceBgFade;
      ctx.fillRect(0, 0, W, H);

      // ── Drift wells — bounce off virtual walls ────────────────────────────
      for (const w of wells) {
        w.x += w.vx;
        w.y += w.vy;
        // Soft bounce — wells drift back when they near the edge
        if (w.x < W * 0.1)  w.vx += 0.02;
        if (w.x > W * 0.9)  w.vx -= 0.02;
        if (w.y < H * 0.1)  w.vy += 0.02;
        if (w.y > H * 0.9)  w.vy -= 0.02;
        // Cap well speed
        w.vx = Math.max(-0.4, Math.min(0.4, w.vx));
        w.vy = Math.max(-0.4, Math.min(0.4, w.vy));
      }

      // ── Update + draw each particle ───────────────────────────────────────
      for (const p of particles) {
        let ax = 0;
        let ay = 0;

        // ── Gravity from each well — F = G·M / r² ────────────────────────
        for (const w of wells) {
          const dx   = w.x - p.x;
          const dy   = w.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const r    = Math.max(dist, MIN_DIST);
          const F    = (G * w.mass) / (r * r);
          ax += (dx / dist) * F;
          ay += (dy / dist) * F;
        }

        // ── Mouse well ────────────────────────────────────────────────────
        if (mouse.active) {
          const dx     = mouse.x - p.x;
          const dy     = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          const dist   = Math.sqrt(distSq);
          const radius = 160;   // influence radius in px

          if (dist < radius && dist > 0.1) {
            // Smooth falloff: peaks at mid-range, zero at edge and at center.
            // This prevents the explosion at r→0 that was killing particles.
            // Shape: (dist/radius) × (1 - dist/radius)² — bell curve peaking ~r/3
            const t  = dist / radius;
            const F  = mouseStrength * t * (1 - t) * (1 - t) * 2.8;
            ax += (dx / dist) * F;
            ay += (dy / dist) * F;
          }
        }

        // ── Integrate velocity ─────────────────────────────────────────────
        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;

        // Clamp to terminal velocity
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          p.vx = (p.vx / spd) * MAX_SPEED;
          p.vy = (p.vy / spd) * MAX_SPEED;
        }

        const prevX = p.x;
        const prevY = p.y;
        p.x  += p.vx;
        p.y  += p.vy;
        p.age++;

        // ── Color by velocity — the physics beauty ────────────────────────
        // Slow particles: deep blue (220°) — cold, drifting in space
        // Fast particles: white-hot (60°)  — slingshot around a well
        // This mirrors real stellar physics: accretion jets are white-hot,
        // outer halos are cold and blue
        const normalizedSpeed = Math.min(spd / MAX_SPEED, 1);
        const hue    = 220 - normalizedSpeed * 160;   // 220 blue → 60 yellow-white
        const sat    = 40 + normalizedSpeed * 60;      // more saturated when fast
        const bright = isDark
          ? 45 + normalizedSpeed * 55      // brighter when fast (dark bg)
          : 25 + normalizedSpeed * 30;     // darker tones on light bg

        // Fade in at birth, fade out at end of life
        const lifeFraction = p.age / p.life;
        const fadeIn  = Math.min(1, p.age / 30);
        const fadeOut = lifeFraction > 0.8 ? 1 - (lifeFraction - 0.8) / 0.2 : 1;
        const alpha   = fadeIn * fadeOut * (0.3 + normalizedSpeed * 0.55);

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${bright}%, ${alpha})`;
        ctx.lineWidth   = 0.5 + normalizedSpeed * 0.7;
        ctx.stroke();

        // ── Respawn when aged out or escaped canvas ───────────────────────
        if (
          p.age >= p.life ||
          p.x < -20 || p.x > W + 20 ||
          p.y < -20 || p.y > H + 20
        ) {
          Object.assign(p, spawnParticle());
        }
      }

      // ── Draw subtle well indicators — barely visible gravitational lensing ──
      for (const w of wells) {
        const r  = Math.sqrt(w.mass) * 0.35;
        const grd = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, r);
        grd.addColorStop(0,   isDark ? 'rgba(120, 160, 255, 0.12)' : 'rgba(40, 80, 180, 0.12)');
        grd.addColorStop(0.4, isDark ? 'rgba(80,  120, 220, 0.04)' : 'rgba(30, 60, 160, 0.06)');
        grd.addColorStop(1,   'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(w.x, w.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas) return;
        ({ W, H, ctx } = setupCanvas(canvas));
        ctx.fillStyle = spaceBg;
        ctx.fillRect(0, 0, W, H);
        particles.forEach((_, i) => { particles[i] = spawnParticle(); });
      }, 250);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [wellCount, particleCount, mouseStrength, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position:   'absolute',
        inset:       0,
        width:      '100%',
        height:     '100%',
        display:    'block',
        opacity,
        zIndex:      0,
        cursor:     'none',
      }}
    />
  );
}
