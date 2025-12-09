"use client";

import { useEffect, useRef } from "react";

interface AuroraProps {
  colorStops?: string[];
  speed?: number;
  blur?: number;
  className?: string;
}

const Aurora = ({
  colorStops = ["#00ff99", "#00d4ff", "#8b5cf6", "#00ff99"],
  speed = 4,
  blur = 100,
  className = "",
}: AuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.01 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient blobs
      for (let i = 0; i < colorStops.length; i++) {
        const x = canvas.width * (0.3 + 0.4 * Math.sin(time + i * 2));
        const y = canvas.height * (0.3 + 0.4 * Math.cos(time * 0.7 + i * 1.5));
        const radius = Math.min(canvas.width, canvas.height) * (0.3 + 0.1 * Math.sin(time + i));

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, colorStops[i] + "80");
        gradient.addColorStop(1, colorStops[i] + "00");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [colorStops, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ filter: `blur(${blur}px)`, opacity: 0.6 }}
    />
  );
};

export default Aurora;
