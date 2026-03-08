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

type Pt = [number, number];

// ── Half-plane clip (Sutherland-Hodgman) ─────────────────────────────────────
function clipByBisector(poly: Pt[], ax: number, ay: number, bx: number, by: number): Pt[] {
  if (!poly.length) return [];
  const mx = (ax+bx)/2, my = (ay+by)/2, nx = bx-ax, ny = by-ay;
  const inside = (px: number, py: number) => (px-mx)*nx+(py-my)*ny < 0;
  const intersect = (p1: Pt, p2: Pt): Pt => {
    const dx=p2[0]-p1[0], dy=p2[1]-p1[1], d=dx*nx+dy*ny;
    if (Math.abs(d)<1e-10) return p1;
    const t=((mx-p1[0])*nx+(my-p1[1])*ny)/d;
    return [p1[0]+t*dx, p1[1]+t*dy];
  };
  const out: Pt[] = [];
  for (let i=0; i<poly.length; i++) {
    const c=poly[i], n=poly[(i+1)%poly.length];
    const ci=inside(c[0],c[1]), ni=inside(n[0],n[1]);
    if (ci) out.push(c);
    if (ci!==ni) out.push(intersect(c,n));
  }
  return out;
}

function cellPoly(seeds: Pt[], i: number, W: number, H: number): Pt[] {
  const p=2;
  let poly: Pt[] = [[-p,-p],[W+p,-p],[W+p,H+p],[-p,H+p]];
  for (let j=0; j<seeds.length; j++) {
    if (j===i) continue;
    poly = clipByBisector(poly, seeds[i][0],seeds[i][1], seeds[j][0],seeds[j][1]);
    if (!poly.length) break;
  }
  return poly;
}

function tracePoly(ctx: CanvasRenderingContext2D, poly: Pt[]) {
  if (poly.length < 3) return;
  ctx.beginPath();
  ctx.moveTo(poly[0][0], poly[0][1]);
  for (let k=1; k<poly.length; k++) ctx.lineTo(poly[k][0], poly[k][1]);
  ctx.closePath();
}

// Very washed-out pastels — matching the reference image's muted tones
const MACRO_HUES = [10, 35, 55, 170, 200, 215, 265, 310];

function macroColor(hue: number, dist: number, maxD: number, isDark: boolean): string {
  const t     = Math.min(dist/maxD, 1);
  if (isDark) {
    // Rich jewel tones on dark background
    const light = 25 + t*12;   // 25% center → 37% edge
    const sat   = 45 + t*20;   // 45% center → 65% edge
    return `hsl(${hue},${sat}%,${light}%)`;
  }
  // Washed-out pastels on light background
  const light = 90 - t*12;   // 90% center → 78% edge
  const sat   = 28 + t*18;   // 28% center → 46% edge — very washed out
  return `hsl(${hue},${sat}%,${light}%)`;
}

interface MicroSeed {
  x: number; y: number;
  vx: number; vy: number;
  macroIdx: number;
}

interface VoronoiBackgroundProps {
  className?:     string;
  opacity?:       number;
  macroCount?:    number;
  microCount?:    number;
  mouseStrength?: number;
}

export default function VoronoiBackground({
  className,
  opacity       = 1,
  macroCount    = 8,
  microCount    = 420,
  mouseStrength = 1.1,
}: VoronoiBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let { W, H, ctx } = setupCanvas(canvas);

    const mouse = { x: -9999, y: -9999, active: false };
    const onMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const r = canvasRef.current.getBoundingClientRect();
      mouse.x = e.clientX-r.left; mouse.y = e.clientY-r.top; mouse.active = true;
    };
    const onMouseLeave = () => { mouse.active = false; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // ── Macro seeds — static once built ──────────────────────────────────────
    let macroSeeds: Pt[] = [];
    let macroHues:  number[] = [];

    // Offscreen canvas that holds the pre-rendered macro crack lines
    // Redrawn only when W/H changes — zero cost per animation frame
    const crackCanvas  = document.createElement('canvas');
    const crackCtx     = crackCanvas.getContext('2d')!;

    function buildMacro() {
      macroSeeds = [];
      macroHues  = [];
      for (let i=0; i<macroCount; i++) {
        const angle = (i/macroCount)*Math.PI*2*1.618;
        const r     = Math.min(W,H)*(0.14+Math.random()*0.32);
        macroSeeds.push([
          W/2+Math.cos(angle)*r+(Math.random()-0.5)*W*0.28,
          H/2+Math.sin(angle)*r+(Math.random()-0.5)*H*0.28,
        ]);
        macroHues.push(MACRO_HUES[i%MACRO_HUES.length]+(Math.random()-0.5)*15);
      }

      // Render macro cracks to offscreen canvas — done ONCE
      crackCanvas.width  = W;
      crackCanvas.height = H;
      crackCtx.clearRect(0,0,W,H);
      crackCtx.lineJoin  = 'round';
      crackCtx.lineCap   = 'round';
      crackCtx.lineWidth = 3.2;
      crackCtx.strokeStyle = isDark ? 'rgba(200, 190, 220, 0.6)' : 'rgba(12, 6, 22, 0.9)';
      for (let i=0; i<macroSeeds.length; i++) {
        const poly = cellPoly(macroSeeds, i, W, H);
        tracePoly(crackCtx, poly);
        crackCtx.stroke();
      }
    }

    // ── Micro seeds ───────────────────────────────────────────────────────────
    function nearestMacro(x: number, y: number): number {
      let best=Infinity, idx=0;
      for (let m=0; m<macroSeeds.length; m++) {
        const dx=macroSeeds[m][0]-x, dy=macroSeeds[m][1]-y;
        const d=dx*dx+dy*dy;
        if (d<best) { best=d; idx=m; }
      }
      return idx;
    }

    function makeMicros(): MicroSeed[] {
      return Array.from({length: microCount}, () => {
        const x=20+Math.random()*(W-40), y=20+Math.random()*(H-40);
        return { x, y, vx:(Math.random()-0.5)*0.18, vy:(Math.random()-0.5)*0.18, macroIdx: nearestMacro(x,y) };
      });
    }

    // Pre-extract Pt[] for fast polygon computation
    let microPts: Pt[] = [];
    let micros: MicroSeed[] = [];

    function initMicros() {
      micros   = makeMicros();
      microPts = micros.map(s => [s.x, s.y]);
    }

    buildMacro();
    initMicros();

    // ── Render ────────────────────────────────────────────────────────────────
    const maxD = Math.min(W,H)*0.42;

    function render() {
      ctx.clearRect(0,0,W,H);

      // Update microPts from live positions
      for (let i=0; i<micros.length; i++) {
        microPts[i][0] = micros[i].x;
        microPts[i][1] = micros[i].y;
      }

      // Pass 1: fill micro cells
      for (let i=0; i<micros.length; i++) {
        const poly = cellPoly(microPts, i, W, H);
        if (poly.length < 3) continue;
        const ms  = micros[i];
        const mac = macroSeeds[ms.macroIdx];
        const dx  = ms.x-mac[0], dy = ms.y-mac[1];
        const dist = Math.sqrt(dx*dx+dy*dy);
        ctx.fillStyle = macroColor(macroHues[ms.macroIdx], dist, maxD, isDark);
        tracePoly(ctx, poly);
        ctx.fill();
      }

      // Pass 2: thin micro strokes
      ctx.lineWidth   = 0.65;
      ctx.strokeStyle = isDark ? 'rgba(200,190,220,0.18)' : 'rgba(50,30,70,0.28)';
      ctx.lineJoin    = 'round';
      for (let i=0; i<micros.length; i++) {
        const poly = cellPoly(microPts, i, W, H);
        if (poly.length < 3) continue;
        tracePoly(ctx, poly);
        ctx.stroke();
      }

      // Pass 3: blit pre-rendered macro cracks — zero compute cost
      ctx.drawImage(crackCanvas, 0, 0);
    }

    // ── Physics ───────────────────────────────────────────────────────────────
    const MOUSE_R=155, WALL=15;
    let frameCount=0;

    function update() {
      frameCount++;
      for (const s of micros) {
        if (mouse.active) {
          const dx=s.x-mouse.x, dy=s.y-mouse.y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if (dist<MOUSE_R && dist>0.5) {
            const t=dist/MOUSE_R;
            const F=mouseStrength*t*(1-t)*(1-t)*3.2;
            s.vx+=(dx/dist)*F; s.vy+=(dy/dist)*F;
          }
        }
        if (s.x<WALL) s.vx+=0.05; if (s.x>W-WALL) s.vx-=0.05;
        if (s.y<WALL) s.vy+=0.05; if (s.y>H-WALL) s.vy-=0.05;
        s.vx*=0.97; s.vy*=0.97;
        const spd=Math.sqrt(s.vx*s.vx+s.vy*s.vy);
        if (spd>1.6) { s.vx=s.vx/spd*1.6; s.vy=s.vy/spd*1.6; }
        s.x+=s.vx; s.y+=s.vy;
      }
      // Cheap macro reassignment every 40 frames
      if (frameCount%40===0) {
        for (const s of micros) s.macroIdx = nearestMacro(s.x, s.y);
      }
    }

    const TARGET_MS=1000/22;
    let lastTime=0, rafId=0;
    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      if (now-lastTime < TARGET_MS) return;
      lastTime = now;
      update();
      render();
    }
    rafId = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas) return;
        ({ W, H, ctx } = setupCanvas(canvas));
        buildMacro();
        initMicros();
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
  }, [macroCount, microCount, mouseStrength, isDark]);

  return (
    <canvas ref={canvasRef} className={className}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%',
        display:'block', opacity, zIndex:0, pointerEvents:'auto' }} />
  );
}
