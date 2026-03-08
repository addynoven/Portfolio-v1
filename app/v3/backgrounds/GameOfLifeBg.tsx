'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface GameOfLifeBgProps {
  className?: string;
}

export default function GameOfLifeBg({ className }: GameOfLifeBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // ── Config ──
    const CELL_SIZE = 24;                // px per cell — smaller = denser
    const GAP = 1;                       // gap between cells
    const FILL = CELL_SIZE - GAP * 2;    // actual drawn square size
    const FADE_IN_SPEED = 0.06;          // how fast cells light up
    const FADE_OUT_SPEED = 0.025;        // how fast cells dim (slower = smoother trails)
    const SPAWN_CHANCE = 0.82;           // chance a cell starts dead (lower = more alive initially)
    const STABLE_LIMIT = 50;
    const TICK_FPS = 10;                 // simulation ticks per second
    const DRAW_FPS = 60;                 // rendering fps for smooth fading

    // Colors
    const ALIVE_R = isDark ? 0 : 0;
    const ALIVE_G = isDark ? 133 : 102;
    const ALIVE_B = isDark ? 255 : 204;

    let width = 0, height = 0, cols = 0, rows = 0;
    // alive[i][j] = 0 or 1  (Game of Life binary state)
    // brightness[i][j] = 0..1  (visual brightness, fades smoothly)
    let alive: number[][] = [];
    let brightness: number[][] = [];
    let animationId = 0;
    let stableTicks = 0;
    let lastTickTime = 0;
    const tickInterval = 1000 / TICK_FPS;

    function createGrid(c: number, r: number): number[][] {
      return Array.from({ length: c }, () => new Float64Array(r) as unknown as number[]);
    }

    function randomize() {
      stableTicks = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          alive[i][j] = Math.random() > SPAWN_CHANCE ? 1 : 0;
          brightness[i][j] = alive[i][j] ? Math.random() * 0.5 : 0;
        }
      }
    }

    function countNeighbors(x: number, y: number): number {
      let sum = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const col = (x + i + cols) % cols;
          const row = (y + j + rows) % rows;
          sum += alive[col][row];
        }
      }
      return sum;
    }

    function tick() {
      const next = createGrid(cols, rows);
      let changed = false;
      let aliveCount = 0;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const state = alive[i][j];
          const n = countNeighbors(i, j);
          let nextState = state;

          if (state === 0 && n === 3) {
            nextState = 1;
          } else if (state === 1 && (n < 2 || n > 3)) {
            nextState = 0;
          }

          next[i][j] = nextState;
          if (nextState === 1) aliveCount++;
          if (nextState !== state) changed = true;
        }
      }
      alive = next;

      if (!changed || aliveCount === 0) {
        stableTicks++;
      } else {
        stableTicks = 0;
      }

      if (stableTicks > STABLE_LIMIT) {
        randomize();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Smoothly fade brightness toward target
          const target = alive[i][j];
          if (target === 1) {
            brightness[i][j] = Math.min(1, brightness[i][j] + FADE_IN_SPEED);
          } else {
            brightness[i][j] = Math.max(0, brightness[i][j] - FADE_OUT_SPEED);
          }

          const b = brightness[i][j];
          if (b < 0.01) continue; // skip invisible cells

          const x = i * CELL_SIZE + GAP;
          const y = j * CELL_SIZE + GAP;

          ctx.fillStyle = `rgba(${ALIVE_R},${ALIVE_G},${ALIVE_B},${b * 0.85})`;
          ctx.fillRect(x, y, FILL, FILL);
        }
      }
    }

    function animate(timestamp: number) {
      // Tick the simulation at TICK_FPS
      if (timestamp - lastTickTime >= tickInterval) {
        tick();
        lastTickTime = timestamp;
      }

      // Draw every frame for smooth fading
      draw();

      animationId = requestAnimationFrame(animate);
    }

    function setup() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / CELL_SIZE);
      rows = Math.ceil(height / CELL_SIZE);
      alive = createGrid(cols, rows);
      brightness = createGrid(cols, rows);
      randomize();
      cancelAnimationFrame(animationId);
      lastTickTime = 0;
      animate(0);
    }

    const handleResize = () => setup();

    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.floor(e.clientX / CELL_SIZE);
      const y = Math.floor(e.clientY / CELL_SIZE);
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const col = x + i;
          const row = y + j;
          if (col >= 0 && col < cols && row >= 0 && row < rows) {
            alive[col][row] = 1;
            stableTicks = 0;
          }
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const x = Math.floor(e.clientX / CELL_SIZE);
      const y = Math.floor(e.clientY / CELL_SIZE);
      // Spawn a glider-like pattern
      const offsets = [[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1]];
      for (const [dx, dy] of offsets) {
        const col = x + dx, row = y + dy;
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
          alive[col][row] = 1;
          stableTicks = 0;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    setup();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
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
