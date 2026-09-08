"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, HardDrive, Lock, Cpu, Globe2, RefreshCw, Send, CheckCircle2, ArrowRight } from "lucide-react";

interface PayloadOption {
  id: string;
  name: string;
  size: string;
  bytes: number;
  type: string;
}

const PAYLOAD_OPTIONS: PayloadOption[] = [
  { id: "video", name: "4K RAW Cine Footage", size: "2.4 GB", bytes: 2400000000, type: "video/quicktime" },
  { id: "database", name: "PostgreSQL Database Dump", size: "850 MB", bytes: 850000000, type: "application/sql" },
  { id: "kernel", name: "Kernel Source Archive", size: "140 MB", bytes: 140000000, type: "application/x-tar" },
];

export default function P2PTunnelStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPayload, setSelectedPayload] = useState<PayloadOption>(PAYLOAD_OPTIONS[0]);
  const [transferState, setTransferState] = useState<"idle" | "handshake" | "streaming" | "completed">("idle");
  const [progress, setProgress] = useState<number>(0);
  const [speedMBps, setSpeedMBps] = useState<number>(0);
  const [packetsSent, setPacketsSent] = useState<number>(0);
  const rafRef = useRef<number>(0);

  // Particles for canvas packet flow
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    speed: number;
    size: number;
    hue: number;
    alpha: number;
    hash: string;
  }>>([]);

  const startTransfer = () => {
    if (transferState === "streaming" || transferState === "handshake") return;
    setTransferState("handshake");
    setProgress(0);
    setPacketsSent(0);
    setSpeedMBps(0);

    setTimeout(() => {
      setTransferState("streaming");
    }, 600);
  };

  const resetTransfer = () => {
    setTransferState("idle");
    setProgress(0);
    setSpeedMBps(0);
    setPacketsSent(0);
  };

  // Progress simulation
  useEffect(() => {
    if (transferState !== "streaming") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTransferState("completed");
          setSpeedMBps(0);
          return 100;
        }
        const delta = Math.random() * 3.5 + 2.5;
        const next = Math.min(100, prev + delta);
        setSpeedMBps(Math.floor(780 + Math.random() * 190)); // ~780-970 MB/s direct LAN
        setPacketsSent((p) => p + Math.floor(Math.random() * 120 + 80));
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [transferState]);

  // Canvas visualizer for peer tunnel stream
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

    const randomHashes = ["0x7A4F", "0xB39E", "0x5D21", "0xFA10", "0x89C2", "0x44D9"];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const yMid = height / 2;
      const xStart = width * 0.12;
      const xEnd = width * 0.88;

      // Draw baseline conduit pipe
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 2;
      ctx.moveTo(xStart, yMid);
      ctx.lineTo(xEnd, yMid);
      ctx.stroke();

      // Outer glow pulse
      ctx.beginPath();
      ctx.strokeStyle = transferState === "streaming" 
        ? "rgba(0, 240, 255, 0.25)" 
        : "rgba(61, 52, 255, 0.12)";
      ctx.lineWidth = 14;
      ctx.moveTo(xStart, yMid);
      ctx.lineTo(xEnd, yMid);
      ctx.stroke();

      // Spawn packets if streaming or ambient
      const spawnRate = transferState === "streaming" ? 0.6 : 0.08;
      if (Math.random() < spawnRate) {
        particlesRef.current.push({
          x: xStart,
          y: yMid + (Math.random() - 0.5) * 16,
          speed: transferState === "streaming" ? Math.random() * 9 + 8 : Math.random() * 3 + 2,
          size: transferState === "streaming" ? Math.random() * 4 + 3 : 2,
          hue: transferState === "streaming" ? 175 + Math.random() * 50 : 220,
          alpha: 1,
          hash: randomHashes[Math.floor(Math.random() * randomHashes.length)],
        });
      }

      // Update & render particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.speed;

        if (p.x >= xEnd) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Render micro packet hash tag occasionally
        if (transferState === "streaming" && i % 3 === 0) {
          ctx.font = "16px monospace";
          ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
          ctx.fillText(p.hash, p.x - 14, p.y - 12);
        }
      }

      // Peer Alpha Endpoint Beacon (Left)
      ctx.fillStyle = "#00f0ff";
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(xStart, yMid, 8, 0, Math.PI * 2);
      ctx.fill();

      // Peer Beta Endpoint Beacon (Right)
      ctx.fillStyle = transferState === "completed" ? "#00ff66" : "#3d34ff";
      ctx.shadowColor = transferState === "completed" ? "#00ff66" : "#3d34ff";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(xEnd, yMid, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [transferState]);

  return (
    <section
      data-section-id="p2p-tunnel"
      data-accent="#00f0ff"
      data-cursor-label="TRANSFER"
      className="relative w-full min-h-screen bg-black py-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-t border-white/10"
    >
      {/* Ambient Radial Mesh Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#3d34ff]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header telemetry tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#00f0ff] uppercase mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <span>STAGE 03C // DISTRIBUTED P2P PIPELINE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans uppercase">
              DROPX: ZERO-KNOWLEDGE P2P MESH
            </h2>
            <p className="text-neutral-400 mt-2 max-w-2xl text-sm md:text-base">
              Direct peer-to-peer browser transport engineered with WebRTC SCTP DataChannels. Zero intermediate cloud storage, chunked via parallel WebWorkers, and authenticated via ChaCha20-Poly1305.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>ChaCha20-Poly1305</span>
            </div>
            <div className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span>0 KB Stored</span>
            </div>
          </div>
        </div>

        {/* Interactive P2P Transmission Stage Card */}
        <div className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          {/* Top Panel Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                {transferState === "idle" && "ICE Candidate Paired • Standing By"}
                {transferState === "handshake" && "SCTP DTLS 1.3 Handshake In Progress..."}
                {transferState === "streaming" && "Active Direct Blast: Transferring 64KB Chunks"}
                {transferState === "completed" && "Payload Verified • 100% SHA-256 Match"}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 font-mono text-xs">
              <div>
                <span className="text-neutral-500">SPEED: </span>
                <span className="text-[#00f0ff] font-bold">{speedMBps} MB/s</span>
              </div>
              <div>
                <span className="text-neutral-500">PACKETS: </span>
                <span className="text-white">{packetsSent.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-neutral-500">RELAY: </span>
                <span className="text-green-400">Direct Host (No TURN)</span>
              </div>
            </div>
          </div>

          {/* Node Topology Visualizer */}
          <div className="relative my-8">
            <div className="flex justify-between items-center mb-3 px-4">
              {/* Peer Alpha Badge */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00f0ff]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase">Peer Alpha (Local)</div>
                  <div className="text-[11px] font-mono text-neutral-500">Chrome 124 / MacOS ARM64</div>
                </div>
              </div>

              {/* Protocol Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-neutral-400">
                <span>WebRTC DataChannel</span>
                <ArrowRight className="w-3 h-3 text-[#00f0ff]" />
                <span>Zero Server Relays</span>
              </div>

              {/* Peer Beta Badge */}
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase">Peer Beta (Remote)</div>
                  <div className="text-[11px] font-mono text-neutral-500">Firefox 125 / Linux x86_64</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3d34ff]">
                  <HardDrive className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Canvas Conduit Stream */}
            <div className="relative w-full h-32 md:h-40 rounded-xl bg-black/60 border border-white/5 overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Transfer state overlay text in canvas */}
              {transferState === "streaming" && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="font-mono text-sm tracking-widest text-[#00f0ff]/80 uppercase bg-black/60 px-4 py-1.5 rounded-full border border-[#00f0ff]/30 backdrop-blur-md">
                    STREAMING CHUNKS • {progress.toFixed(0)}%
                  </div>
                </div>
              )}
            </div>

            {/* Real-time Progress Bar */}
            <div className="mt-4 w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#00f0ff] via-[#3d34ff] to-[#ff00ea] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Interactive Controller & Payload Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-white/5">
            {/* Payload Selector */}
            <div className="lg:col-span-2 space-y-3">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Select Test Payload To Transmit</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PAYLOAD_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    disabled={transferState === "streaming"}
                    onClick={() => {
                      setSelectedPayload(item);
                      resetTransfer();
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedPayload.id === item.id
                        ? "bg-[#00f0ff]/10 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                    } ${transferState === "streaming" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="text-xs font-semibold font-mono truncate">{item.name}</div>
                    <div className="text-[11px] font-mono text-neutral-500 mt-1 flex justify-between">
                      <span>{item.size}</span>
                      <span className="text-[#00f0ff] font-bold">Direct P2P</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger Buttons */}
            <div className="flex flex-col justify-end gap-3">
              {transferState === "idle" && (
                <button
                  onClick={startTransfer}
                  className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-semibold font-mono text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 cursor-pointer active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Blast Payload ({selectedPayload.size})</span>
                </button>
              )}

              {transferState === "handshake" && (
                <button
                  disabled
                  className="w-full py-3.5 px-6 rounded-xl bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-wait"
                >
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Negotiating ICE SDP...</span>
                </button>
              )}

              {transferState === "streaming" && (
                <button
                  disabled
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00f0ff]/20 to-[#3d34ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-wait"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                  <span>Transferring ({progress.toFixed(0)}%)</span>
                </button>
              )}

              {transferState === "completed" && (
                <div className="flex gap-2">
                  <button
                    onClick={resetTransfer}
                    className="flex-1 py-3 px-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green-500/30 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reset Tunnel</span>
                  </button>
                  <button
                    onClick={startTransfer}
                    className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    <span>Send Again</span>
                  </button>
                </div>
              )}

              {/* Protocol footnote */}
              <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5 justify-center">
                <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                <span>WebWorker MT Chunking (64KB Chunks)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture Specs Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl border border-white/5 bg-neutral-950/40">
            <div className="text-[11px] font-mono text-neutral-500 uppercase">Transport Protocol</div>
            <div className="text-sm font-mono font-bold text-white mt-1">WebRTC DataChannel</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">SCTP over DTLS 1.3 tunnel</div>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-neutral-950/40">
            <div className="text-[11px] font-mono text-neutral-500 uppercase">Intermediate Server Storage</div>
            <div className="text-sm font-mono font-bold text-green-400 mt-1">0.00 Megabytes</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Pure RAM ring-buffer streaming</div>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-neutral-950/40">
            <div className="text-[11px] font-mono text-neutral-500 uppercase">Encryption Cipher</div>
            <div className="text-sm font-mono font-bold text-white mt-1">ChaCha20-Poly1305</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Hardware-accelerated SIMD</div>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-neutral-950/40">
            <div className="text-[11px] font-mono text-neutral-500 uppercase">Transfer Line-Rate</div>
            <div className="text-sm font-mono font-bold text-[#00f0ff] mt-1">Up to 950 MB/s</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Direct LAN socket throughput</div>
          </div>
        </div>
      </div>
    </section>
  );
}
