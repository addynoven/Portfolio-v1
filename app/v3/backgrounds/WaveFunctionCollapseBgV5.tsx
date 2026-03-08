'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// ── WFC V5: M.C. Escher Impossible Geometry ──
// Uses an Orthographic camera and architectural tiles (blocks, stairs)
// to build an infinite impossible geometry loop where heights are visually ambiguous.
// When the grid fills, it dissolves in a sweep and rebuilds instantly.

interface WaveFunctionCollapseBgV5Props {
  className?: string;
}

// ── Tile definitions ──
// For an Escher effect, we'll use geometric blocks and ramps/stairs.
// Colors are monochromatic, lighting is stark.
// Edge matching must connect paths and heights logically to form loops.

interface Tile {
  id: number;
  edges: number[];    // 0=empty, 1=solid_low, 2=solid_mid, 3=solid_high, 4=stair_up, 5=stair_down
  type: string;
  weight: number;
}

interface Cell {
  collapsed: boolean;
  options: number[];
  tileId: number;
  fadeIn: number;
}

// Simple edge rules for interlocking geometry
const protos = [
  { edges: [0, 0, 0, 0], type: 'empty', weight: 4 },
  
  // Basic platform blocks
  { edges: [1, 1, 1, 1], type: 'platform_low', weight: 4 },
  { edges: [2, 2, 2, 2], type: 'platform_mid', weight: 3 },
  { edges: [3, 3, 3, 3], type: 'platform_high', weight: 3 },
  
  // Pillars/Towers
  { edges: [0, 1, 0, 1], type: 'pillar', weight: 2 },
  { edges: [1, 0, 1, 0], type: 'pillar', weight: 2 },
  
  // Stairs connecting levels (impossible connections happen by wrapping edges)
  { edges: [1, 2, 1, 2], type: 'stair_n', weight: 2 },
  { edges: [2, 1, 2, 1], type: 'stair_e', weight: 2 },
  { edges: [2, 2, 1, 1], type: 'stair_corner', weight: 1 },
  { edges: [1, 1, 2, 2], type: 'stair_corner', weight: 1 },

  // Impossible bridges (connect high to low visually due to orthographic flattening,
  // but logically treated as a bridge)
  { edges: [3, 0, 1, 0], type: 'impossible_bridge_ns', weight: 2 },
  { edges: [0, 3, 0, 1], type: 'impossible_bridge_ew', weight: 2 },

  // Archways
  { edges: [2, 0, 2, 0], type: 'arch_ns', weight: 2 },
  { edges: [0, 2, 0, 2], type: 'arch_ew', weight: 2 },
];

function buildTiles(): Tile[] {
  return protos.map((p, i) => ({
    id: i,
    edges: [...p.edges],
    type: p.type,
    weight: p.weight,
  }));
}

// ── WFC Engine ──
class WFCEngine {
  tiles: Tile[];
  cols: number;
  rows: number;
  cells: Cell[];
  uncollapsed: Set<number>;
  propStack: number[];
  done: boolean;
  holdTimer: number;

  constructor(tiles: Tile[], cols: number, rows: number) {
    this.tiles = tiles;
    this.cols = cols;
    this.rows = rows;
    this.cells = [];
    this.uncollapsed = new Set();
    this.propStack = [];
    this.done = false;
    this.holdTimer = 0;
    this.reset();
  }

  reset() {
    this.cells = [];
    this.propStack = [];
    this.uncollapsed.clear();
    const total = this.cols * this.rows;
    for (let i = 0; i < total; i++) {
        // Force the corners to be empty to start a nice shape
        let forceEmpty = false;
        const x = i % this.cols;
        const y = Math.floor(i / this.cols);
        if ((x < 2 && y < 2) || (x > this.cols - 3 && y > this.rows - 3)) {
            forceEmpty = true;
        }

      this.cells[i] = {
        collapsed: forceEmpty,
        options: forceEmpty ? [0] : Array.from({ length: this.tiles.length }, (_, k) => k),
        tileId: forceEmpty ? 0 : -1,
        fadeIn: 0,
      };
      if (!forceEmpty) this.uncollapsed.add(i);
    }
    this.done = false;
    this.holdTimer = 0;
  }

  propagate() {
    let budget = 12;
    while (this.propStack.length > 0 && budget > 0) {
      budget--;
      const idx = this.propStack.pop()!;
      const cell = this.cells[idx];
      if (cell.options.length === 0) { this.fixConflict(idx); return; }

      const x = idx % this.cols, y = Math.floor(idx / this.cols);
      const dirs = [
        { dx: 0, dy: -1, d: 0 }, { dx: 1, dy: 0, d: 1 },
        { dx: 0, dy: 1, d: 2 },  { dx: -1, dy: 0, d: 3 },
      ];
      for (const dir of dirs) {
        const nx = x + dir.dx, ny = y + dir.dy;
        if (nx < 0 || nx >= this.cols || ny < 0 || ny >= this.rows) continue;
        const nIdx = nx + ny * this.cols;
        const nb = this.cells[nIdx];
        if (nb.collapsed) continue;
        
        const prevLen = nb.options.length;
        const matchD = (dir.d + 2) % 4;
        const allowed = new Set<number>();
        cell.options.forEach(o => allowed.add(this.tiles[o].edges[dir.d]));
        
        nb.options = nb.options.filter(o => allowed.has(this.tiles[o].edges[matchD]));
        
        if (nb.options.length === 0) { this.fixConflict(nIdx); return; }
        if (nb.options.length !== prevLen) this.propStack.push(nIdx);
      }
    }
  }

  collapseOne() {
    if (this.done) return;
    if (this.propStack.length > 0) { this.propagate(); return; }
    if (this.uncollapsed.size === 0) { this.done = true; return; }

    let minE = Infinity;
    let cands: number[] = [];
    for (const idx of this.uncollapsed) {
      const len = this.cells[idx].options.length;
      if (len === 0) { this.fixConflict(idx); return; }
      if (len < minE) { minE = len; cands = [idx]; }
      else if (len === minE) cands.push(idx);
    }

    // Pick pseudorandomly from lowest entropy, favoring center build-out
    let chosen = cands[Math.floor(Math.random() * cands.length)];

    const cell = this.cells[chosen];
    let tw = 0;
    cell.options.forEach(o => tw += this.tiles[o].weight);
    let r = Math.random() * tw;
    let sel = cell.options[0];
    for (const o of cell.options) {
      r -= this.tiles[o].weight;
      if (r <= 0) { sel = o; break; }
    }

    cell.collapsed = true;
    cell.options = [sel];
    cell.tileId = sel;
    cell.fadeIn = 0;
    this.uncollapsed.delete(chosen);
    this.propStack.push(chosen);
  }

  fixConflict(idx: number) {
    const cx = idx % this.cols, cy = Math.floor(idx / this.cols);
    const rad = 2;
    for (let y = cy - rad; y <= cy + rad; y++) {
      for (let x = cx - rad; x <= cx + rad; x++) {
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
          const i = x + y * this.cols;
          this.cells[i].collapsed = false;
          this.cells[i].options = Array.from({ length: this.tiles.length }, (_, k) => k);
          this.cells[i].tileId = -1;
          this.cells[i].fadeIn = 0;
          this.uncollapsed.add(i);
        }
      }
    }
    this.propStack = [];
  }

  step() {
    if (this.done) {
      this.holdTimer++;
      if (this.holdTimer > 150) {
        // Fast sweep dissolve
        let wiped = 0;
        for (let i = 0; i < this.cells.length; i++) {
           if (this.cells[i].tileId !== -1 && this.cells[i].tileId !== 0) {
               this.cells[i].fadeIn -= 0.05;
               if (this.cells[i].fadeIn <= 0) {
                   this.cells[i].tileId = -1;
                   this.cells[i].collapsed = false;
                   this.cells[i].options = Array.from({ length: this.tiles.length }, (_, k) => k);
                   this.cells[i].fadeIn = 0;
                   this.uncollapsed.add(i);
                   wiped++;
               }
           }
        }
        if (wiped >= this.uncollapsed.size && this.uncollapsed.size > (this.cols * this.rows)*0.8) {
           this.reset();
        }
      }
      return;
    }
    for (let c = 0; c < 4; c++) {
      this.collapseOne();
    }
  }
}

// ── Geometry Builders ──
// We construct an InstancedMesh, but since different tiles have entirely different shapes (stairs vs blocks),
// we will have *multiple* InstancedMeshes — one for each core geometric shape.

function EscherMeshes({ cols, rows, engineRef, tilesData }: any) {
    const total = cols * rows;

    // Meshes categories
    const blockRef = useRef<THREE.InstancedMesh>(null);
    const stairXRef = useRef<THREE.InstancedMesh>(null);
    const stairZRef = useRef<THREE.InstancedMesh>(null);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const blockColor = useMemo(() => new Float32Array(total * 3), [total]);
    const stairXColor = useMemo(() => new Float32Array(total * 3), [total]);
    const stairZColor = useMemo(() => new Float32Array(total * 3), [total]);
    
    // Base colors (monochromatic blue-grey/grey)
    const { theme, resolvedTheme } = useTheme();
    const isLight = (resolvedTheme || theme) === 'light';

    const cBase = useMemo(() => new THREE.Color(isLight ? '#d0d8e8' : '#3b4b68'), [isLight]);
    const cHigh = useMemo(() => new THREE.Color(isLight ? '#b0c4de' : '#556b96'), [isLight]);
    const cStair = useMemo(() => new THREE.Color(isLight ? '#e0e6f0' : '#2a374c'), [isLight]);

    const blockGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
    // A stair is approximated by a wedge (composed of a tilted box) for simplicity in instances
    const stairGeo = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-0.5, -0.5);
        shape.lineTo(0.5, -0.5);
        shape.lineTo(0.5, 0.5);
        shape.lineTo(-0.5, -0.5); // Triangle wedge
        
        const extrudeSettings = { depth: 1, bevelEnabled: false };
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geo.center();
        return geo;
    }, []);

    const mat = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.8,
        metalness: 0.1,
        vertexColors: true,
        flatShading: true,
    }), []);

    useFrame((state) => {
        const engine = engineRef.current as WFCEngine;
        if (!engine) return;
        engine.step();

        const time = state.clock.elapsedTime;
        
        // Reset counters for instances
        let bCount = 0;
        let sxCount = 0;
        let szCount = 0;

        for (let i = 0; i < total; i++) {
            const cell = engine.cells[i];
            const cx = i % cols;
            const cy = Math.floor(i / cols);
            
            // Isometric grid positioning
            const px = (cx - cols / 2);
            const pz = (cy - rows / 2);

            let type = 'empty';
            let fade = 0;

            if (cell.tileId !== -1 && cell.tileId !== 0) {
               if (cell.fadeIn < 1) cell.fadeIn = Math.min(1, cell.fadeIn + 0.05);
               type = tilesData[cell.tileId].type;
               fade = cell.fadeIn;
            }

            const yFloat = Math.sin(time*2 + cx*0.1 + cy*0.1) * 0.05; // tiny impossible float

            if (type.startsWith('platform')) {
                let h = type === 'platform_low' ? 0.3 : type === 'platform_mid' ? 1.0 : 2.0;
                let c = type === 'platform_high' ? cHigh : cBase;
                
                // Animate pop-in by scaling up
                dummy.position.set(px, (h/2) - (1-fade)*2 + yFloat, pz);
                dummy.scale.set(0.9, h * fade, 0.9);
                dummy.rotation.set(0,0,0);
                dummy.updateMatrix();
                
                if (blockRef.current) {
                    blockRef.current.setMatrixAt(bCount, dummy.matrix);
                    blockColor[bCount*3] = c.r;
                    blockColor[bCount*3+1] = c.g;
                    blockColor[bCount*3+2] = c.b;
                    bCount++;
                }
            } else if (type === 'pillar') {
                dummy.position.set(px, 1.5 - (1-fade)*3 + yFloat, pz);
                dummy.scale.set(0.3, 3 * fade, 0.3);
                dummy.rotation.set(0,0,0);
                dummy.updateMatrix();
                
                if (blockRef.current) {
                    blockRef.current.setMatrixAt(bCount, dummy.matrix);
                    blockColor[bCount*3] = cHigh.r;
                    blockColor[bCount*3+1] = cHigh.g;
                    blockColor[bCount*3+2] = cHigh.b;
                    bCount++;
                }
            } else if (type === 'stair_e' || type === 'impossible_bridge_ew' || type === 'arch_ew') {
                 // X-axis stair/ramp
                 dummy.position.set(px, 0.5 - (1-fade) + yFloat, pz);
                 dummy.scale.set(1 * fade, 1 * fade, 0.9 * fade);
                 dummy.rotation.set(0, 0, type === 'stair_e' ? 0 : Math.PI); // flip if bridge
                 dummy.updateMatrix();
                 
                 if (stairXRef.current) {
                     stairXRef.current.setMatrixAt(sxCount, dummy.matrix);
                     stairXColor[sxCount*3] = cStair.r;
                     stairXColor[sxCount*3+1] = cStair.g;
                     stairXColor[sxCount*3+2] = cStair.b;
                     sxCount++;
                 }
            } else if (type === 'stair_n' || type === 'impossible_bridge_ns' || type === 'arch_ns' || type === 'stair_corner') {
                 // Z-axis stair/ramp
                 dummy.position.set(px, 0.5 - (1-fade) + yFloat, pz);
                 dummy.scale.set(0.9 * fade, 1 * fade, 1 * fade);
                 dummy.rotation.set(0, Math.PI/2, (type === 'stair_corner') ? Math.PI : 0);
                 dummy.updateMatrix();
                 
                 if (stairZRef.current) {
                     stairZRef.current.setMatrixAt(szCount, dummy.matrix);
                     stairZColor[szCount*3] = cStair.r;
                     stairZColor[szCount*3+1] = cStair.g;
                     stairZColor[szCount*3+2] = cStair.b;
                     szCount++;
                 }
            }
        }

        // Hide unused instances
        dummy.position.set(0,-100,0);
        dummy.scale.set(0,0,0);
        dummy.updateMatrix();
        
        if (blockRef.current) {
            for(let i=bCount; i<total; i++) blockRef.current.setMatrixAt(i, dummy.matrix);
            blockRef.current.instanceMatrix.needsUpdate = true;
            blockRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(blockColor, 3));
        }
        if (stairXRef.current) {
            for(let i=sxCount; i<total; i++) stairXRef.current.setMatrixAt(i, dummy.matrix);
            stairXRef.current.instanceMatrix.needsUpdate = true;
            stairXRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(stairXColor, 3));
        }
        if (stairZRef.current) {
            for(let i=szCount; i<total; i++) stairZRef.current.setMatrixAt(i, dummy.matrix);
            stairZRef.current.instanceMatrix.needsUpdate = true;
            stairZRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(stairZColor, 3));
        }
    });

    return (
        <group>
            <instancedMesh ref={blockRef} args={[blockGeo, mat, total]} castShadow receiveShadow />
            <instancedMesh ref={stairXRef} args={[stairGeo, mat, total]} castShadow receiveShadow />
            <instancedMesh ref={stairZRef} args={[stairGeo, mat, total]} castShadow receiveShadow />
        </group>
    );
}


// ── Main UI ──
export default function WaveFunctionCollapseBgV5({ className }: WaveFunctionCollapseBgV5Props) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted ? (resolvedTheme || theme) === 'light' : false;
  
  const COLS = 18;
  const ROWS = 18;
  const tilesData = useMemo(() => buildTiles(), []);
  const engineRef = useRef<WFCEngine | null>(null);

  if (!engineRef.current) {
    engineRef.current = new WFCEngine(tilesData, COLS, ROWS);
  }

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      {/* 
        CRITICAL FOR ESCHER: Orthographic Camera.
        This forces isometric projection without depth foreshortening,
        making high objects in the front look logically connected lower objects in the back.
      */}
      <Canvas shadows orthographic camera={{ position: [20, 20, 20], zoom: 45, near: -100, far: 500 }} gl={{ antialias: true }}>
        <color attach="background" args={[isLight ? '#f0f6ff' : '#0b1120']} />
        
        <ambientLight intensity={0.4} color="#eef" />
        
        {/* Stark directional light to create hard Escher-like shadow patterns */}
        <directionalLight
          position={[-10, 20, 10]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        
        <directionalLight position={[10, 5, -10]} intensity={0.3} color="#6080b0" />

        <EscherMeshes cols={COLS} rows={ROWS} engineRef={engineRef} tilesData={tilesData} />

        {/* Slow gentle rotation of the entire structure */}
        <Rig />
      </Canvas>
      
      {/* Cinematic vignette overlay */}
      <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] ${isLight ? 'opacity-40' : 'opacity-80'}`} />
    </div>
  );
}

function Rig() {
    useFrame(({ scene, clock }) => {
        // Very slow, infinite continuous rotation 
        // to show off the impossible geometries forming
        scene.rotation.y = clock.elapsedTime * 0.05;
        // Subtle bobbing
        scene.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2 - 2;
    });
    return null;
}
