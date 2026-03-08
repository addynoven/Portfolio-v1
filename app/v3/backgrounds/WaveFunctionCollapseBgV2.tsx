'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface WaveFunctionCollapseBgV2Props {
  className?: string;
}

// ── WFC Tile types for color-field generation ──
// Edge values: 0 = dark, 1 = warm, 2 = cool, 3 = accent
// The WFC ensures neighboring tiles share matching edge colors,
// creating smooth organic regions of color that blend together.

interface ColorTile {
  id: number;
  edges: number[]; // [top, right, bottom, left]
  hue: number;     // base hue 0-360
  saturation: number;
  lightness: number;
  weight: number;
}

interface ColorCell {
  collapsed: boolean;
  options: number[];
  tileId: number;    // resolved tile id (-1 if uncollapsed)
  fadeIn: number;     // 0→1 fade-in progress
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function WaveFunctionCollapseBgV2({ className }: WaveFunctionCollapseBgV2Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';
  const isLight = !isDark;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const CELL_SIZE = 10;
    const FADE_SPEED = 0.012;
    const PARTICLE_COUNT = 80;
    const COLLAPSE_SPEED = 3; // frames between collapses

    let width = 0, height = 0, cols = 0, rows = 0;
    let cells: ColorCell[] = [];
    let tiles: ColorTile[] = [];
    let uncollapsedIndices = new Set<number>();
    let propagationStack: number[] = [];
    let particles: Particle[] = [];
    let animationId = 0;
    let frameCount = 0;
    let isComplete = false;
    let completeHoldTimer = 0;
    let globalTime = 0;

    // ── Color palette ──
    // We define tile prototypes with edge-color compatibility.
    // Edge values determine which tiles can sit next to each other.
    // Colors: deep indigo, soft teal, warm violet, muted rose
    const palettes = [
      { hue: 230, sat: 40, light: 12 },  // deep indigo
      { hue: 260, sat: 35, light: 15 },  // soft violet
      { hue: 200, sat: 30, light: 10 },  // dark teal
      { hue: 280, sat: 25, light: 18 },  // muted purple
      { hue: 210, sat: 45, light: 8 },   // midnight blue
      { hue: 320, sat: 20, light: 14 },  // dusky rose
    ];

    // Edge compatibility: tiles with matching edge values can be adjacent
    // 0=dark, 1=mid, 2=light
    const tilePrototypes = [
      { edges: [0, 0, 0, 0], weight: 3 },
      { edges: [1, 1, 1, 1], weight: 2 },
      { edges: [2, 2, 2, 2], weight: 1 },
      { edges: [0, 1, 0, 1], weight: 4 },
      { edges: [1, 0, 1, 0], weight: 4 },
      { edges: [0, 0, 1, 1], weight: 5 },
      { edges: [1, 1, 0, 0], weight: 5 },
      { edges: [0, 1, 1, 0], weight: 5 },
      { edges: [1, 0, 0, 1], weight: 5 },
      { edges: [0, 0, 0, 1], weight: 3 },
      { edges: [1, 0, 0, 0], weight: 3 },
      { edges: [0, 1, 0, 0], weight: 3 },
      { edges: [0, 0, 1, 0], weight: 3 },
      { edges: [1, 1, 1, 0], weight: 2 },
      { edges: [0, 1, 1, 1], weight: 2 },
      { edges: [1, 0, 1, 1], weight: 2 },
      { edges: [1, 1, 0, 1], weight: 2 },
      { edges: [0, 2, 1, 0], weight: 2 },
      { edges: [2, 0, 0, 1], weight: 2 },
      { edges: [1, 0, 2, 0], weight: 2 },
      { edges: [0, 1, 0, 2], weight: 2 },
    ];

    function generateTiles() {
      tiles = [];
      tilePrototypes.forEach((proto) => {
        // Assign a color from the palette based on edge sum (creates color variation)
        const edgeSum = proto.edges.reduce((a, b) => a + b, 0);
        const paletteIdx = edgeSum % palettes.length;
        const pal = palettes[paletteIdx];

        tiles.push({
          id: tiles.length,
          edges: [...proto.edges],
          hue: pal.hue + (Math.random() * 20 - 10),
          saturation: pal.sat + (Math.random() * 10 - 5),
          lightness: pal.light + (Math.random() * 4 - 2),
          weight: proto.weight,
        });
      });
    }

    function resetSimulation() {
      cells = [];
      propagationStack = [];
      uncollapsedIndices.clear();
      particles = [];

      for (let i = 0; i < cols * rows; i++) {
        cells[i] = {
          collapsed: false,
          options: Array.from({ length: tiles.length }, (_, k) => k),
          tileId: -1,
          fadeIn: 0,
        };
        uncollapsedIndices.add(i);
      }
      isComplete = false;
      completeHoldTimer = 0;
      generateParticles();
    }

    function generateParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        spawnParticle();
      }
    }

    function spawnParticle() {
      particles.push({
        x: Math.random() * (cols * CELL_SIZE),
        y: Math.random() * (rows * CELL_SIZE),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15 - 0.1, // slight upward drift
        life: 0,
        maxLife: 300 + Math.random() * 400,
        size: 1 + Math.random() * 2.5,
        hue: 200 + Math.random() * 120,
      });
    }

    // ── WFC Core Logic ──

    function collapse() {
      if (isComplete) return;

      // Propagation first
      if (propagationStack.length > 0) {
        let budget = 4;
        while (propagationStack.length > 0 && budget > 0) {
          budget--;
          const idx = propagationStack.pop()!;
          const cell = cells[idx];
          const opts = cell.options;
          if (opts.length === 0) { handleContradiction(idx); return; }

          const x = idx % cols;
          const y = Math.floor(idx / cols);
          const offsets = [
            { dx: 0, dy: -1, dir: 0 },
            { dx: 1, dy: 0, dir: 1 },
            { dx: 0, dy: 1, dir: 2 },
            { dx: -1, dy: 0, dir: 3 },
          ];

          for (const off of offsets) {
            const nx = x + off.dx;
            const ny = y + off.dy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
              const nIdx = nx + ny * cols;
              const neighbor = cells[nIdx];
              if (!neighbor.collapsed) {
                const prevLen = neighbor.options.length;
                const matchDir = (off.dir + 2) % 4;
                const allowed = new Set<number>();
                opts.forEach(o => allowed.add(tiles[o].edges[off.dir]));
                neighbor.options = neighbor.options.filter(o =>
                  allowed.has(tiles[o].edges[matchDir])
                );
                if (neighbor.options.length === 0) { handleContradiction(nIdx); return; }
                if (neighbor.options.length !== prevLen) {
                  propagationStack.push(nIdx);
                }
              }
            }
          }
        }
        return;
      }

      // Pick lowest entropy cell
      if (uncollapsedIndices.size === 0) {
        isComplete = true;
        return;
      }

      let minEntropy = Infinity;
      let candidates: number[] = [];
      for (const idx of uncollapsedIndices) {
        const len = cells[idx].options.length;
        if (len === 0) { handleContradiction(idx); return; }
        if (len < minEntropy) { minEntropy = len; candidates = [idx]; }
        else if (len === minEntropy) { candidates.push(idx); }
      }

      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      const cell = cells[chosen];

      // Weighted random selection
      let totalW = 0;
      cell.options.forEach(o => totalW += tiles[o].weight);
      let r = Math.random() * totalW;
      let selected = cell.options[0];
      for (const o of cell.options) {
        r -= tiles[o].weight;
        if (r <= 0) { selected = o; break; }
      }

      cell.collapsed = true;
      cell.options = [selected];
      cell.tileId = selected;
      cell.fadeIn = 0;
      uncollapsedIndices.delete(chosen);
      propagationStack.push(chosen);
    }

    function handleContradiction(idx: number) {
      // Soft reset: uncollapse a small radius around the contradiction
      const cx = idx % cols;
      const cy = Math.floor(idx / cols);
      const radius = 3;
      for (let y = cy - radius; y <= cy + radius; y++) {
        for (let x = cx - radius; x <= cx + radius; x++) {
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            const i = x + y * cols;
            cells[i].collapsed = false;
            cells[i].options = Array.from({ length: tiles.length }, (_, k) => k);
            cells[i].tileId = -1;
            cells[i].fadeIn = 0;
            uncollapsedIndices.add(i);
          }
        }
      }
      propagationStack = [];
    }

    // ── Rendering ──

    function getCellColor(tileId: number, alpha: number): string {
      const tile = tiles[tileId];
      return `hsla(${tile.hue}, ${tile.saturation}%, ${tile.lightness}%, ${alpha})`;
    }

    function draw() {
      globalTime += 0.005;

      // Clear with transparent to let the footer bg show through
      ctx.clearRect(0, 0, width, height);

      /* 
      // Draw color field - REMOVED AS PER USER REQUEST (Too grid-like)
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.tileId === -1) continue;

        // Smooth fade in
        if (cell.fadeIn < 1) {
          cell.fadeIn = Math.min(1, cell.fadeIn + FADE_SPEED);
        }

        const x = (i % cols) * CELL_SIZE;
        const y = Math.floor(i / cols) * CELL_SIZE;

        // Breathing alpha effect
        const breathe = 0.6 + 0.2 * Math.sin(globalTime * 2 + x * 0.01 + y * 0.008);
        const alpha = cell.fadeIn * breathe;

        // Draw as soft circular glow blob — no boxes
        const tile = tiles[cell.tileId];
        const cx = x + CELL_SIZE / 2;
        const cy = y + CELL_SIZE / 2;
        const radius = CELL_SIZE * 0.6;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${tile.hue}, ${tile.saturation + 10}%, ${tile.lightness + 8}%, ${alpha * 0.8})`);
        grad.addColorStop(0.5, `hsla(${tile.hue}, ${tile.saturation}%, ${tile.lightness}%, ${alpha * 0.35})`);
        grad.addColorStop(1, `hsla(${tile.hue}, ${tile.saturation - 5}%, ${tile.lightness - 3}%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      */

      // Draw particles
      drawParticles();
    }

    function drawParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Gentle drift influenced by nearby collapsed cell colors
        const cellX = Math.floor(p.x / CELL_SIZE);
        const cellY = Math.floor(p.y / CELL_SIZE);
        if (cellX >= 0 && cellX < cols && cellY >= 0 && cellY < rows) {
          const cIdx = cellX + cellY * cols;
          if (cells[cIdx].tileId !== -1) {
            const tile = tiles[cells[cIdx].tileId];
            // Particles drift in the direction of the hue gradient
            const angle = (tile.hue / 360) * Math.PI * 2 + globalTime;
            p.vx += Math.cos(angle) * 0.003;
            p.vy += Math.sin(angle) * 0.003;
          }
        }

        // Dampen velocity
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;

        // Life cycle alpha
        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1
          ? lifeRatio / 0.1
          : lifeRatio > 0.8
            ? (1 - lifeRatio) / 0.2
            : 1;

        // Draw particle as soft glow dot
        const a = alpha * 0.35;
        // In light mode with multiply blend, we need darker, more saturated colors to be visible.
        // In dark mode with screen blend, we need lighter, glowing colors.
        const lightness = isLight ? 40 : 70;
        const saturation = isLight ? 80 : 60;
        
        ctx.fillStyle = `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft outer glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glowGrad.addColorStop(0, `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${a * 0.3})`);
        glowGrad.addColorStop(1, `hsla(${p.hue}, ${saturation}%, ${lightness}%, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles & respawn
        if (p.life >= p.maxLife || p.x < -50 || p.x > cols * CELL_SIZE + 50 || p.y < -50 || p.y > rows * CELL_SIZE + 50) {
          particles.splice(i, 1);
          spawnParticle();
        }
      }
    }

    function update() {
      frameCount++;

      if (isComplete) {
        completeHoldTimer++;
        // Hold completed state for a while, then slowly restart
        if (completeHoldTimer > 600) {
          // Gradual dissolve: start fading cells one by one
          const fadePerFrame = 2;
          let faded = 0;
          for (let i = 0; i < cells.length && faded < fadePerFrame; i++) {
            const rIdx = (completeHoldTimer * 7 + i * 13) % cells.length; // pseudo-random order
            if (cells[rIdx].tileId !== -1) {
              cells[rIdx].fadeIn -= 0.01;
              if (cells[rIdx].fadeIn <= 0) {
                cells[rIdx].tileId = -1;
                cells[rIdx].collapsed = false;
                cells[rIdx].options = Array.from({ length: tiles.length }, (_, k) => k);
                cells[rIdx].fadeIn = 0;
                uncollapsedIndices.add(rIdx);
                faded++;
              }
            }
          }
          if (uncollapsedIndices.size >= cols * rows * 0.5) {
            isComplete = false;
            completeHoldTimer = 0;
            propagationStack = [];
          }
        }
        return;
      }

      // Collapse a few cells per frame for smooth build-up
      if (frameCount % COLLAPSE_SPEED === 0) {
        collapse();
      }
    }

    function loop() {
      if (!document.hidden) {
        update();
        draw();
      }
      animationId = requestAnimationFrame(loop);
    }

    function setup() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cols = Math.ceil(width / CELL_SIZE) + 1;
      rows = Math.ceil(height / CELL_SIZE) + 1;
      generateTiles();
      resetSimulation();
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    };

    window.addEventListener('resize', handleResize);

    setup();
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, display: 'block' }}
    />
  );
}
