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

// ── Pure-math flow angle — no library needed ──────────────────────────────────
// Combines several sine/cosine waves at different frequencies and phases.
// Each point in space gets a direction. Particles follow that direction.
// Adding `t` (time) makes the field slowly evolve — living, breathing motion.
function flowAngle(x: number, y: number, t: number, scale: number): number {
  const s = scale;
  return (
    Math.sin(x * s       + t * 0.25) * Math.PI * 2 +
    Math.cos(y * s       + t * 0.18) * Math.PI      +
    Math.sin((x + y) * s * 0.6 + t * 0.12) * Math.PI * 0.5
  );
}

interface Particle {
  x:    number;
  y:    number;
  age:  number;
  life: number;   // max age before respawn
  hue:  number;
  speed: number;
}

interface FlowFieldBackgroundProps {
  className?:    string;
  opacity?:      number;
  /** 'ice' | 'aurora' | 'smoke' | 'gold' */
  theme?:        'ice' | 'aurora' | 'smoke' | 'gold';
  particleCount?: number;
  speed?:        number;
}

const THEMES = {
  ice:    { hueBase: 195, hueRange: 30,  sat: '60%', darkBg: '8, 12, 22',    lightBg: '240, 244, 250' },
  aurora: { hueBase: 140, hueRange: 80,  sat: '70%', darkBg: '4, 10, 18',    lightBg: '238, 248, 242' },
  smoke:  { hueBase: 220, hueRange: 20,  sat: '8%',  darkBg: '10, 10, 14',   lightBg: '242, 242, 246' },
  gold:   { hueBase: 35,  hueRange: 25,  sat: '65%', darkBg: '14, 10, 4',    lightBg: '252, 248, 240' },
};

export default function FlowFieldBackground({
  className,
  opacity       = 1,
  theme         = 'ice',
  particleCount = 900,
  speed         = 1,
}: FlowFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme: siteTheme, resolvedTheme: resolvedSiteTheme } = useTheme();
  const isDark = (resolvedSiteTheme || siteTheme) !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let { W, H, ctx } = setupCanvas(canvas);

    const t       = THEMES[theme];
    const bg      = isDark ? t.darkBg : t.lightBg;
    const particleLightness = isDark ? '75%' : '35%';
    const scale   = 0.0018;      // spatial frequency of the flow field
    let   time    = 0;
    let   rafId   = 0;

    // ── Spawn a particle at a random position ────────────────────────────────
    function spawn(): Particle {
      return {
        x:     Math.random() * W,
        y:     Math.random() * H,
        age:   0,
        life:  120 + Math.random() * 180,
        hue:   t.hueBase + (Math.random() - 0.5) * t.hueRange,
        speed: (0.6 + Math.random() * 0.8) * speed,
      };
    }

    // Pre-fill particles spread across the whole canvas
    const particles: Particle[] = Array.from({ length: particleCount }, spawn);

    // Paint the background once
    ctx.fillStyle = `rgb(${bg})`;
    ctx.fillRect(0, 0, W, H);

    function frame() {
      time += 0.005;

      // ── Fade trail — semi-transparent fill each frame ─────────────────────
      // This is what creates the glowing trail effect.
      // Lower alpha = longer trails. Higher = shorter, crisper.
      ctx.fillStyle = `rgba(${bg}, 0.04)`;
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const angle = flowAngle(p.x, p.y, time, scale);
        const vx    = Math.cos(angle) * p.speed;
        const vy    = Math.sin(angle) * p.speed;

        const prevX = p.x;
        const prevY = p.y;
        p.x  += vx;
        p.y  += vy;
        p.age++;

        // ── Fade in / fade out over particle lifetime ─────────────────────
        const lifeFraction = p.age / p.life;
        const fadeIn  = Math.min(1, p.age / 20);
        const fadeOut = lifeFraction > 0.75 ? 1 - (lifeFraction - 0.75) / 0.25 : 1;
        const alpha   = fadeIn * fadeOut * 0.55;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `hsla(${p.hue}, ${t.sat}, ${particleLightness}, ${alpha})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();

        // Respawn if out of bounds or aged out
        if (
          p.age >= p.life  ||
          p.x < -10 || p.x > W + 10 ||
          p.y < -10 || p.y > H + 10
        ) {
          Object.assign(p, spawn());
        }
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
        ctx.fillStyle = `rgb(${bg})`;
        ctx.fillRect(0, 0, W, H);
        // Respawn all particles within new bounds
        particles.forEach((p, i) => { particles[i] = spawn(); });
      }, 250);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [theme, particleCount, speed, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position:      'absolute',
        inset:          0,
        width:         '100%',
        height:        '100%',
        display:       'block',
        opacity,
        zIndex:         0,
        pointerEvents: 'none',
      }}
    />
  );
}
