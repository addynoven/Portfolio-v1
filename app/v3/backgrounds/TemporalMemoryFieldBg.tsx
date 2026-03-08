'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface TemporalMemoryFieldBgProps {
  className?: string;
}

export default function TemporalMemoryFieldBg({ className }: TemporalMemoryFieldBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const CONFIG = {
      gridSize: 30,
      decay: 0.98,
      agentCount: 400,
      agentSpeed: 1.5,
      writeStrength: 0.15,
      flowStrength: 0.05,
      mouseRadius: 200,
      mouseStrength: 0.3,
    };

    let width = 0, height = 0;
    let cols = 0, rows = 0;
    let field: TMFVector[] = [];
    let agents: TMFAgent[] = [];
    let animationId = 0;

    const mouse = { x: -1000, y: -1000, active: false, timer: 0 as unknown as ReturnType<typeof setTimeout> };

    class TMFVector {
      x: number;
      y: number;
      constructor(x = 0, y = 0) { this.x = x; this.y = y; }
      add(v: TMFVector) { this.x += v.x; this.y += v.y; }
      mult(n: number) { this.x *= n; this.y *= n; }
      mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
      limit(max: number) {
        const m = this.mag();
        if (m > max && m > 0) this.mult(max / m);
      }
    }

    class TMFAgent {
      pos: TMFVector;
      vel: TMFVector;
      acc: TMFVector;
      size: number;
      alpha: number;

      constructor() {
        this.pos = new TMFVector(Math.random() * width, Math.random() * height);
        this.vel = new TMFVector(Math.random() - 0.5, Math.random() - 0.5);
        this.acc = new TMFVector(0, 0);
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        let col = Math.floor(this.pos.x / CONFIG.gridSize);
        let row = Math.floor(this.pos.y / CONFIG.gridSize);
        col = Math.max(0, Math.min(cols - 1, col));
        row = Math.max(0, Math.min(rows - 1, row));
        const index = col + row * cols;
        const force = field[index];

        if (force) {
          this.acc.x += force.x * CONFIG.flowStrength;
          this.acc.y += force.y * CONFIG.flowStrength;
        }

        this.vel.add(this.acc);
        this.vel.limit(CONFIG.agentSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        if (force) {
          force.x += this.vel.x * CONFIG.writeStrength;
          force.y += this.vel.y * CONFIG.writeStrength;
        }

        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
      }

      draw() {
        ctx.fillStyle = isDark
          ? `rgba(180, 255, 240, ${this.alpha})`
          : `rgba(0, 100, 80, ${this.alpha + 0.1})`;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / CONFIG.gridSize);
      rows = Math.ceil(height / CONFIG.gridSize);

      field = new Array(cols * rows);
      for (let i = 0; i < field.length; i++) {
        field[i] = new TMFVector((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5);
      }

      agents = [];
      for (let i = 0; i < CONFIG.agentCount; i++) {
        agents.push(new TMFAgent());
      }
    }

    function updateField() {
      for (let i = 0; i < field.length; i++) {
        field[i].mult(CONFIG.decay);
        if (isNaN(field[i].x)) field[i] = new TMFVector(0, 0);
      }

      if (mouse.active) {
        const mCol = Math.floor(mouse.x / CONFIG.gridSize);
        const mRow = Math.floor(mouse.y / CONFIG.gridSize);
        const range = Math.ceil(CONFIG.mouseRadius / CONFIG.gridSize);

        for (let y = -range; y <= range; y++) {
          for (let x = -range; x <= range; x++) {
            const c = mCol + x;
            const r = mRow + y;
            if (c >= 0 && c < cols && r >= 0 && r < rows) {
              const index = c + r * cols;
              const cellCenterX = c * CONFIG.gridSize + CONFIG.gridSize / 2;
              const cellCenterY = r * CONFIG.gridSize + CONFIG.gridSize / 2;
              const dx = cellCenterX - mouse.x;
              const dy = cellCenterY - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < CONFIG.mouseRadius) {
                const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
                const strength = force * CONFIG.mouseStrength;
                field[index].x += -dy * 0.01 * strength;
                field[index].y += dx * 0.01 * strength;
              }
            }
          }
        }
      }
    }

    function animate() {
      updateField();
      ctx.clearRect(0, 0, width, height);
      for (const agent of agents) {
        agent.update();
        agent.draw();
      }
      animationId = requestAnimationFrame(animate);
    }

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      clearTimeout(mouse.timer);
      mouse.timer = setTimeout(() => { mouse.active = false; }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouse.timer);
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
