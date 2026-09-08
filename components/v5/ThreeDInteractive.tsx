import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Grid,
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Game-dev themed WebGL break. A populated scene instead of a single blob:
 * central distorted sphere, orbiting primitive "props" (cartridge, gem,
 * controller d-pad, torus knot) each with its own material + float cadence,
 * plus a perspective grid floor for depth.
 */
export default function ThreeDInteractive() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, subRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.15,
          scrollTrigger: { trigger: root, start: 'top 65%', toggleActions: 'play none none reverse' },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-section-id="3d-blob"
      data-accent="#ff4fd8"
      data-cursor-label="PULL"
      className="relative w-full h-screen bg-[#050014] overflow-hidden pointer-events-auto"
    >
      {/* Canvas fills the section */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.4, 5.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <fog attach="fog" args={['#050014', 5, 14]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <directionalLight position={[-5, -2, -3]} intensity={0.7} color="#ff4fd8" />
          <pointLight position={[0, 3, 0]} intensity={1.2} color="#7ad9ff" distance={12} />
          <Environment preset="night" />

          {/* Perspective grid floor */}
          <Grid
            position={[0, -2.4, 0]}
            args={[30, 30]}
            cellSize={0.6}
            cellThickness={0.6}
            cellColor="#2a1550"
            sectionSize={3}
            sectionThickness={1}
            sectionColor="#ff4fd8"
            fadeDistance={16}
            fadeStrength={1.4}
            infiniteGrid
          />

          {/* Central distorted sphere — original interaction preserved */}
          <Blob />

          {/* Game-dev props orbiting the blob */}
          <Cartridge position={[-2.6, 0.8, -0.4]} color="#3dffa7" />
          <Gem position={[2.8, 0.2, -0.2]} color="#ffb347" />
          <DPad position={[-2.0, -1.2, 0.8]} />
          <KnotProp position={[2.2, -1.0, 0.6]} color="#7ad9ff" />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Eyebrow */}
      <div className="absolute top-[10%] left-[5%] z-10 pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-8 h-[1px] bg-[#ff4fd8]" />
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#ff4fd8] uppercase">
            04 — SHADER TELEMETRY LAB
          </p>
        </div>
      </div>

      {/* Heading + copy */}
      <div className="absolute bottom-[14%] left-[5%] right-[5%] z-10 pointer-events-none max-w-[820px]">
        <h2
          ref={headingRef}
          className="font-sans font-medium leading-[0.95] tracking-tight text-white"
          style={{ fontSize: 'clamp(2.5rem,7vw,6rem)', textShadow: '0 4px 32px rgba(0,0,0,0.8)' }}
        >
          Built for speed.<br />
          <span className="italic text-[#ff4fd8]">Simulated live.</span>
        </h2>
        <p
          ref={subRef}
          className="mt-6 max-w-[520px] text-[clamp(0.95rem,1.2vw,1.125rem)] text-white/70 leading-relaxed"
        >
          Zero prerenders or video assets. Hardware-accelerated WebGL distorted shaders simulating event turbulence, message queue buffers, and backpressure dynamics in real time.
        </p>
      </div>

      <div className="absolute bottom-8 right-[5%] z-10 pointer-events-none flex items-center gap-3">
        <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Move cursor · scroll down
        </p>
        <div className="w-8 h-[1px] bg-[#ff4fd8] opacity-50" />
      </div>
    </section>
  );
}

/* ---------- Central distorted sphere ---------- */
function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.Material>(null);
  const { viewport } = useThree();
  const [hovering, setHovering] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  useFrame((_, delta) => {
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * Math.min(delta * 5, 1);
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * Math.min(delta * 5, 1);
    const m = meshRef.current;
    if (m) {
      m.rotation.y += delta * 0.18;
      m.rotation.x = mouseRef.current.y * 0.35;
      m.position.x = mouseRef.current.x * viewport.width * 0.08;
      m.position.y = mouseRef.current.y * viewport.height * 0.08;
    }
    const mat = matRef.current as unknown as { distort: number; speed: number } | null;
    if (mat) {
      const targetDistort = hovering ? 0.55 : 0.35;
      mat.distort += (targetDistort - mat.distort) * Math.min(delta * 4, 1);
      mat.speed = 2.5;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          ref={matRef as never}
          color="#ff4fd8"
          emissive="#7a0f57"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.4}
          distort={0.35}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

/* ---------- Game cartridge — slanted box with label stripe ---------- */
function Cartridge({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.2}>
      <group position={position} rotation={[0.2, 0.4, 0.1]}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[1.1, 1.4, 0.25]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.3} />
        </mesh>
        {/* Top label stripe */}
        <mesh position={[0, 0.45, 0.13]}>
          <boxGeometry args={[0.9, 0.25, 0.02]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.7}
          />
        </mesh>
        {/* Bottom connector teeth */}
        <mesh position={[0, -0.62, 0]}>
          <boxGeometry args={[0.9, 0.12, 0.2]} />
          <meshStandardMaterial color="#333" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------- Pixel-style emissive gem ---------- */
function Gem({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.8} rotationIntensity={2.0} floatIntensity={1.0}>
      <mesh position={position} rotation={[0.3, 0.2, 0]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          roughness={0.15}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

/* ---------- D-pad — four-arm plus shape ---------- */
function DPad({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2.4} rotationIntensity={1.1} floatIntensity={1.3}>
      <group position={position} rotation={[0.4, 0.3, 0.2]}>
        <mesh>
          <boxGeometry args={[1.1, 0.32, 0.24]} />
          <meshStandardMaterial color="#222" roughness={0.55} metalness={0.35} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.1, 0.32, 0.24]} />
          <meshStandardMaterial color="#222" roughness={0.55} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.13]}>
          <boxGeometry args={[0.28, 0.28, 0.04]} />
          <meshStandardMaterial
            color="#ff4fd8"
            emissive="#ff4fd8"
            emissiveIntensity={0.6}
            roughness={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------- Torus knot — a little physics-party accent ---------- */
function KnotProp({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.3} rotationIntensity={1.6} floatIntensity={1.5}>
      <mesh position={position} scale={0.5}>
        <torusKnotGeometry args={[0.8, 0.28, 128, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.55}
        />
      </mesh>
    </Float>
  );
}
