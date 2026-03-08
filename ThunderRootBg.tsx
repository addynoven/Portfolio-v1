'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const r15  = Math.PI / 12;
const r90  = Math.PI / 2;
const r180 = Math.PI;

function polar2cart(x: number, y: number, length: number, rad: number): [number, number] {
  return [x + Math.cos(rad) * length, y + Math.sin(rad) * length];
}

function setupCanvas(canvas: HTMLCanvasElement): { W: number; H: number; ctx: CanvasRenderingContext2D } {
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

interface PlumBackgroundProps {
  init?:       number;
  className?:  string;
  /**
   * ms to wait between each generation burst.
   * 0 = original speed. 40 = calm. 80 = very slow.
   * The entire generation still fires at once — so growth looks
   * natural and organic, just at a slower rhythm.
   */
  frameDelay?: number;
}

export default function PlumBackground({
  init        = 5,
  className,
  frameDelay  = 40,
}: PlumBackgroundProps) {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let { W, H, ctx } = setupCanvas(canvas);
    const len = Math.min(W, H) * 0.014;

    let steps:     Array<() => void> = [];
    let prevSteps: Array<() => void> = [];
    let iterations = 0;
    let rafId      = 0;
    let lastTime   = 0;

    function step(x: number, y: number, rad: number) {
      const length   = Math.random() * len;
      const [nx, ny] = polar2cart(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + Math.random() * r15;
      const rad2 = rad - Math.random() * r15;

      if (nx < -100 || nx > W + 100 || ny < -100 || ny > H + 100) return;

      if (iterations <= init || Math.random() > 0.5)
        steps.push(() => step(nx, ny, rad1));
      if (iterations <= init || Math.random() > 0.5)
        steps.push(() => step(nx, ny, rad2));
    }

    function frame(now: number) {
      // Throttle: only fire a generation burst every `frameDelay` ms.
      // The whole generation still runs at once — that's what keeps
      // the growth feeling natural. We're just slowing the rhythm.
      if (now - lastTime < frameDelay) {
        rafId = requestAnimationFrame(frame);
        return;
      }
      lastTime = now;

      iterations++;
      prevSteps = steps;
      steps     = [];

      if (!prevSteps.length) return; // done — stop RAF

      prevSteps.forEach(fn => fn());
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(rafId);
      iterations = 0;
      lastTime   = 0;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth   = 1;
      ctx.strokeStyle = isDark ? 'rgba(220,220,210,0.35)' : 'rgba(30,30,60,0.3)';

      steps = Math.random() < 0.5
        ? [
            () => step(0, Math.random() * H, 0),
            () => step(W, Math.random() * H, r180),
          ]
        : [
            () => step(Math.random() * W, 0,  r90),
            () => step(Math.random() * W, H, -r90),
          ];

      rafId = requestAnimationFrame(frame);
    }

    start();

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas) return;
        ({ W, H, ctx } = setupCanvas(canvas));
        start();
      }, 250);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark, init, frameDelay]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full block z-0 pointer-events-none opacity-[0.55] dark:opacity-40 ${className || ''}`}
    />
  );
}