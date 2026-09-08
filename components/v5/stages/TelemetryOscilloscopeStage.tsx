"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, Cpu, Server, Zap, BarChart2 } from "lucide-react";

export default function TelemetryOscilloscopeStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [load, setLoad] = useState<number>(145000); // 145k req/s default
  const rafRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  // Computed metrics based on load
  const p99 = (6.2 + (load / 500000) * 4.8).toFixed(1); // 6.2ms to 11.0ms
  const goroutines = Math.floor(1200 + (load / 500000) * 3400);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid background lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      phaseRef.current += 0.04 * (load / 100000);

      // Primary Telemetry Waveform
      ctx.beginPath();
      ctx.lineWidth = 3;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#00f0ff");
      gradient.addColorStop(0.5, "#3d34ff");
      gradient.addColorStop(1, "#ff00ea");
      ctx.strokeStyle = gradient;

      const centerY = height / 2;
      const amplitude = 45 + (load / 500000) * 60;
      const frequency = 0.008;

      for (let x = 0; x < width; x++) {
        // Compose multiple sine waves + micro jitter for telemetry look
        const jitter = (Math.sin(x * 0.05 + phaseRef.current * 3) * 6 * (load / 300000));
        const y =
          centerY +
          Math.sin(x * frequency + phaseRef.current) * amplitude +
          Math.sin(x * frequency * 2.3 - phaseRef.current * 1.5) * (amplitude * 0.35) +
          jitter;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glowing pulse line underneath
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#00f0ff";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Secondary reference baseline
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      for (let x = 0; x < width; x += 4) {
        const y = centerY + Math.sin(x * frequency * 0.5 + phaseRef.current * 0.7) * (amplitude * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [load]);

  return (
    <section
      data-section-id="ping-telemetry"
      data-accent="#3d34ff"
      data-cursor-label="METRICS"
      className="relative w-full min-h-screen bg-[#050508] py-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-t border-white/10"
    >
      <div className="max-w-[1240px] w-full mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#3d34ff]" />
              <span className="font-mono text-xs tracking-[0.25em] text-[#3d34ff] uppercase">
                02 / HIGH-CONCURRENCY INFRASTRUCTURE
              </span>
            </div>
            <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-tight text-white">
              Ping — Live Cluster Telemetry Engine
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-white/50">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              CLUSTER HEALTHY
            </span>
            <span>GO 1.24 · REDIS CLUSTER</span>
          </div>
        </div>

        {/* Interactive Oscilloscope & Control Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Waveform Console */}
          <div className="lg:col-span-8 relative rounded-2xl bg-[#0a0a10] border border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between font-mono text-xs text-white/60 mb-4 z-10">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00f0ff]" /> REAL-TIME WEBSOCKET THROUGHPUT OSCILLOSCOPE
              </span>
              <span className="text-[#ff00ea] font-medium">BUFFER: 0 GOROUTINE LEAKS</span>
            </div>

            {/* Canvas waveform */}
            <div className="relative w-full h-[260px] sm:h-[300px] my-2">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="absolute top-3 left-4 font-mono text-[11px] text-white/40">
                P99 LATENCY: <span className="text-white font-bold">{p99} ms</span>
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-[11px] text-white/40">
                SAMPLING RATE: 200 Hz
              </div>
            </div>

            {/* Interactive Load Slider */}
            <div className="mt-6 pt-6 border-t border-white/10 z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white/60">SIMULATE CONCURRENCY LOAD:</span>
                <span className="text-[#00f0ff] font-bold">
                  {(load / 1000).toFixed(0)}k REQ / SEC
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={load}
                onChange={(e) => setLoad(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
              <div className="flex justify-between font-mono text-[10px] text-white/30">
                <span>10k req/s (Idle)</span>
                <span>250k req/s (Standard Peak)</span>
                <span>500k req/s (Stress Test)</span>
              </div>
            </div>
          </div>

          {/* Telemetry Metric Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex-1 rounded-2xl bg-[#0a0a10] border border-white/10 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white/50 mb-2">
                <span className="font-mono text-xs">P99 LATENCY CEILING</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-mono font-medium text-white">
                  {p99} <span className="text-sm text-white/40">ms</span>
                </div>
                <p className="text-xs text-white/50 mt-1">Guaranteed P99 &lt; 12ms across high load</p>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-300"
                  style={{ width: `${(Number(p99) / 12) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex-1 rounded-2xl bg-[#0a0a10] border border-white/10 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white/50 mb-2">
                <span className="font-mono text-xs">ACTIVE GOROUTINES</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-mono font-medium text-white">
                  {goroutines.toLocaleString()}
                </div>
                <p className="text-xs text-white/50 mt-1">Zero leak worker channel pool multiplexer</p>
              </div>
              <div className="font-mono text-[10px] text-emerald-400 mt-2">
                • 0 GC pauses &gt; 1.2ms
              </div>
            </div>

            <div className="flex-1 rounded-2xl bg-[#0a0a10] border border-white/10 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white/50 mb-2">
                <span className="font-mono text-xs">CONNECTION RE-USE</span>
                <Server className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-mono font-medium text-white">
                  99.4<span className="text-sm text-white/40">%</span>
                </div>
                <p className="text-xs text-white/50 mt-1">Reduced connection churn via channel multiplexing</p>
              </div>
              <div className="font-mono text-[10px] text-purple-400 mt-2">
                • Redis Hash Pipeline Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
