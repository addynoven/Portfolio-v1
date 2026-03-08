'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface BoidsSwarmBgProps {
  className?: string;
}

export default function BoidsSwarmBg({ className }: BoidsSwarmBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const currentTheme = resolvedTheme || theme;

    // --- Configuration ---
    const PARTICLE_COUNT = 200;
    const VIEW_RADIUS = 120;
    const CONNECTION_DIST = 90;
    const BASE_SPEED = 1.5;

    // Theme-based colors
    // Dark mode: light blue, Light mode: primary brand blue
    const particleBaseColor = currentTheme === 'light' ? '0, 133, 255' : '100, 200, 255';
    const connectionOpacity = currentTheme === 'light' ? '0.08' : '0.04';
    const particleAlphaBoost = currentTheme === 'light' ? 0.2 : 0;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationId = 0;

    // Global State Variables
    let flowAngle = 0;
    let targetFlowAngle = 0;
    let lastFlowChange = 0;

    // Interaction
    let mouseX = -1000;
    let mouseY = -1000;

    // --- Particle Class ---
    class Particle {
      x: number;
      y: number;
      z: number;
      isFlocker: boolean;
      size: number;
      alpha: number;
      speedMult: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.z = Math.random();
        this.isFlocker = Math.random() < 0.20;
        this.size = 0.5 + this.z * 1.5;
        this.alpha = (0.1 + this.z * 0.5) + particleAlphaBoost;
        if (this.isFlocker) this.alpha += 0.2;
        this.speedMult = 0.3 + this.z * 0.7;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * BASE_SPEED * this.speedMult;
        this.vy = Math.sin(angle) * BASE_SPEED * this.speedMult;
      }

      update(allParticles: Particle[]) {
        let aliX = 0, aliY = 0;
        let sepX = 0, sepY = 0;
        let cohX = 0, cohY = 0;
        let count = 0;

        for (const other of allParticles) {
          if (other === this) continue;
          const dx = other.x - this.x;
          const dy = other.y - this.y;
          const distSq = dx * dx + dy * dy;
          if (Math.abs(this.z - other.z) > 0.3) continue;

          if (distSq < VIEW_RADIUS * VIEW_RADIUS) {
            aliX += other.vx;
            aliY += other.vy;
            cohX += other.x;
            cohY += other.y;
            if (distSq < 40 * 40) {
              const dist = Math.sqrt(distSq);
              sepX += (this.x - other.x) / (dist || 0.1);
              sepY += (this.y - other.y) / (dist || 0.1);
            }
            count++;
          }
        }

        if (count > 0) {
          aliX /= count;
          aliY /= count;
          const aliLen = Math.sqrt(aliX * aliX + aliY * aliY);
          if (aliLen > 0) {
            aliX = (aliX / aliLen) * BASE_SPEED;
            aliY = (aliY / aliLen) * BASE_SPEED;
          }
          cohX = (cohX / count) - this.x;
          cohY = (cohY / count) - this.y;
          const cohLen = Math.sqrt(cohX * cohX + cohY * cohY);
          if (cohLen > 0) {
            cohX = (cohX / cohLen) * BASE_SPEED;
            cohY = (cohY / cohLen) * BASE_SPEED;
          }

          if (this.isFlocker) {
            this.vx += (aliX * 0.10 + sepX * 0.08 + cohX * 0.05);
            this.vy += (aliY * 0.10 + sepY * 0.08 + cohY * 0.05);
          } else {
            this.vx += (aliX * 0.03 + sepX * 0.05);
            this.vy += (aliY * 0.03 + sepY * 0.05);
          }
        }

        // Global wind
        this.vx += Math.cos(flowAngle) * 0.015;
        this.vy += Math.sin(flowAngle) * 0.015;

        // Cursor shear
        const mDx = this.x - mouseX;
        const mDy = this.y - mouseY;
        const mDistSq = mDx * mDx + mDy * mDy;
        if (mDistSq < 250 * 250) {
          const mDist = Math.sqrt(mDistSq);
          const force = (250 - mDist) / 250;
          const angle = Math.atan2(mDy, mDx);
          const shearForce = 0.15 * force;
          this.vx += Math.sin(angle) * shearForce;
          this.vy -= Math.cos(angle) * shearForce;
        }

        // Limit speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const speedLimitBase = this.isFlocker ? 3.5 : 3.0;
        const maxS = speedLimitBase * this.speedMult;
        if (speed > maxS) {
          this.vx = (this.vx / speed) * maxS;
          this.vy = (this.vy / speed) * maxS;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = `rgba(${particleBaseColor}, ${this.alpha})`;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    function resetFlow() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
      }
    }

    function updateGlobalState() {
      if (Date.now() - lastFlowChange > 20000) {
        targetFlowAngle = (Math.random() - 0.5) * Math.PI;
        lastFlowChange = Date.now();
      }
      flowAngle += (targetFlowAngle - flowAngle) * 0.005;
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      updateGlobalState();

      ctx.strokeStyle = `rgba(${particleBaseColor}, ${connectionOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(particles);
        p.draw(ctx);

        if (p.z > 0.6) {
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            if (other.z > 0.6) {
              const dx = p.x - other.x;
              const dy = p.y - other.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(other.x, other.y);
              }
            }
          }
        }
      }
      ctx.stroke();
      animationId = requestAnimationFrame(animate);
    }

    function setup() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      resetFlow();
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    setup();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1, display: 'block' }}
    />
  );
}
