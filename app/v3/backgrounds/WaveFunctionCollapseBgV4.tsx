'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// ── WFC V4: 3D Terrain Map with React Three Fiber ──
// Uses Wave Function Collapse to procedurally generate a 3D terrain grid.
// Each collapsed tile becomes a 3D block with height, color, and glow
// based on terrain type. The map builds outward infinitely — when complete,
// it dissolves and rebuilds in a continuous loop.

interface WaveFunctionCollapseBgV4Props {
  className?: string;
}

// ── WFC Types ──
interface Tile {
  id: number;
  edges: number[];
  type: string;
  height: number;
  color: THREE.Color;
  emissive: THREE.Color;
  weight: number;
}

interface Cell {
  collapsed: boolean;
  options: number[];
  tileId: number;
  fadeIn: number;
}

// ── Tile definitions ──
const EDGE_WATER = 0;
const EDGE_COAST = 1;
const EDGE_LAND = 2;
const EDGE_FOREST = 3;
const EDGE_PEAK = 4;

const tileProtos = [
  { edges: [0, 0, 0, 0], type: 'water',   height: 0.05, color: [0.04, 0.08, 0.22], emissive: [0.02, 0.06, 0.18], weight: 8 },
  { edges: [0, 0, 1, 0], type: 'coast',   height: 0.08, color: [0.06, 0.12, 0.28], emissive: [0.03, 0.08, 0.2],  weight: 3 },
  { edges: [0, 0, 0, 1], type: 'coast',   height: 0.08, color: [0.06, 0.12, 0.28], emissive: [0.03, 0.08, 0.2],  weight: 3 },
  { edges: [1, 0, 0, 0], type: 'coast',   height: 0.08, color: [0.06, 0.12, 0.28], emissive: [0.03, 0.08, 0.2],  weight: 3 },
  { edges: [0, 1, 0, 0], type: 'coast',   height: 0.08, color: [0.06, 0.12, 0.28], emissive: [0.03, 0.08, 0.2],  weight: 3 },
  { edges: [1, 0, 1, 0], type: 'coast',   height: 0.1,  color: [0.07, 0.14, 0.3],  emissive: [0.04, 0.1, 0.22],  weight: 2 },
  { edges: [0, 1, 0, 1], type: 'coast',   height: 0.1,  color: [0.07, 0.14, 0.3],  emissive: [0.04, 0.1, 0.22],  weight: 2 },
  { edges: [1, 1, 0, 0], type: 'coast',   height: 0.1,  color: [0.07, 0.14, 0.3],  emissive: [0.04, 0.1, 0.22],  weight: 2 },
  { edges: [0, 1, 1, 0], type: 'coast',   height: 0.1,  color: [0.07, 0.14, 0.3],  emissive: [0.04, 0.1, 0.22],  weight: 2 },
  { edges: [0, 0, 1, 1], type: 'coast',   height: 0.1,  color: [0.07, 0.14, 0.3],  emissive: [0.04, 0.1, 0.22],  weight: 2 },
  { edges: [1, 0, 0, 1], type: 'coast',   height: 0.1,  color: [0.07, 0.14, 0.3],  emissive: [0.04, 0.1, 0.22],  weight: 2 },
  { edges: [1, 1, 1, 1], type: 'shore',   height: 0.14, color: [0.1, 0.18, 0.32],  emissive: [0.05, 0.12, 0.25], weight: 4 },
  { edges: [2, 1, 2, 1], type: 'land',    height: 0.2,  color: [0.06, 0.16, 0.1],  emissive: [0.03, 0.1, 0.05],  weight: 3 },
  { edges: [1, 2, 1, 2], type: 'land',    height: 0.2,  color: [0.06, 0.16, 0.1],  emissive: [0.03, 0.1, 0.05],  weight: 3 },
  { edges: [2, 2, 1, 1], type: 'land',    height: 0.18, color: [0.07, 0.15, 0.1],  emissive: [0.03, 0.09, 0.05], weight: 2 },
  { edges: [1, 2, 2, 1], type: 'land',    height: 0.18, color: [0.07, 0.15, 0.1],  emissive: [0.03, 0.09, 0.05], weight: 2 },
  { edges: [1, 1, 2, 2], type: 'land',    height: 0.18, color: [0.07, 0.15, 0.1],  emissive: [0.03, 0.09, 0.05], weight: 2 },
  { edges: [2, 1, 1, 2], type: 'land',    height: 0.18, color: [0.07, 0.15, 0.1],  emissive: [0.03, 0.09, 0.05], weight: 2 },
  { edges: [2, 2, 2, 2], type: 'grass',   height: 0.25, color: [0.05, 0.18, 0.08], emissive: [0.02, 0.1, 0.04],  weight: 10 },
  { edges: [2, 2, 2, 1], type: 'land',    height: 0.22, color: [0.06, 0.17, 0.09], emissive: [0.03, 0.1, 0.04],  weight: 3 },
  { edges: [2, 2, 1, 2], type: 'land',    height: 0.22, color: [0.06, 0.17, 0.09], emissive: [0.03, 0.1, 0.04],  weight: 3 },
  { edges: [2, 1, 2, 2], type: 'land',    height: 0.22, color: [0.06, 0.17, 0.09], emissive: [0.03, 0.1, 0.04],  weight: 3 },
  { edges: [1, 2, 2, 2], type: 'land',    height: 0.22, color: [0.06, 0.17, 0.09], emissive: [0.03, 0.1, 0.04],  weight: 3 },
  { edges: [2, 2, 3, 2], type: 'forest_edge', height: 0.3, color: [0.03, 0.12, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [2, 3, 2, 2], type: 'forest_edge', height: 0.3, color: [0.03, 0.12, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [3, 2, 2, 2], type: 'forest_edge', height: 0.3, color: [0.03, 0.12, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [2, 2, 2, 3], type: 'forest_edge', height: 0.3, color: [0.03, 0.12, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [3, 3, 3, 3], type: 'forest',  height: 0.4,  color: [0.02, 0.1, 0.04],  emissive: [0.01, 0.06, 0.02], weight: 5 },
  { edges: [3, 3, 2, 2], type: 'forest_edge', height: 0.35, color: [0.03, 0.11, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [2, 3, 3, 2], type: 'forest_edge', height: 0.35, color: [0.03, 0.11, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [2, 2, 3, 3], type: 'forest_edge', height: 0.35, color: [0.03, 0.11, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [3, 2, 2, 3], type: 'forest_edge', height: 0.35, color: [0.03, 0.11, 0.05], emissive: [0.01, 0.07, 0.03], weight: 2 },
  { edges: [3, 3, 4, 3], type: 'highland', height: 0.55, color: [0.1, 0.08, 0.14], emissive: [0.06, 0.04, 0.1], weight: 1 },
  { edges: [3, 4, 3, 3], type: 'highland', height: 0.55, color: [0.1, 0.08, 0.14], emissive: [0.06, 0.04, 0.1], weight: 1 },
  { edges: [4, 3, 3, 3], type: 'highland', height: 0.55, color: [0.1, 0.08, 0.14], emissive: [0.06, 0.04, 0.1], weight: 1 },
  { edges: [3, 3, 3, 4], type: 'highland', height: 0.55, color: [0.1, 0.08, 0.14], emissive: [0.06, 0.04, 0.1], weight: 1 },
  { edges: [4, 4, 4, 4], type: 'peak',    height: 0.75, color: [0.14, 0.12, 0.2],  emissive: [0.08, 0.06, 0.15], weight: 2 },
  { edges: [4, 4, 3, 3], type: 'highland', height: 0.6, color: [0.12, 0.1, 0.16],  emissive: [0.07, 0.05, 0.12], weight: 1 },
  { edges: [3, 4, 4, 3], type: 'highland', height: 0.6, color: [0.12, 0.1, 0.16],  emissive: [0.07, 0.05, 0.12], weight: 1 },
  { edges: [3, 3, 4, 4], type: 'highland', height: 0.6, color: [0.12, 0.1, 0.16],  emissive: [0.07, 0.05, 0.12], weight: 1 },
  { edges: [4, 3, 3, 4], type: 'highland', height: 0.6, color: [0.12, 0.1, 0.16],  emissive: [0.07, 0.05, 0.12], weight: 1 },
];

// ── Build tiles once ──
function buildTiles(isDark: boolean): Tile[] {
  // In light mode, brighten colors by a factor so terrain is visible on light bg
  const boost = isDark ? 1 : 2.5;
  return tileProtos.map((p, i) => ({
    id: i,
    edges: [...p.edges],
    type: p.type,
    height: p.height,
    color: new THREE.Color(
      Math.min(1, p.color[0] * boost),
      Math.min(1, p.color[1] * boost),
      Math.min(1, p.color[2] * boost)
    ),
    emissive: new THREE.Color(
      Math.min(1, p.emissive[0] * boost),
      Math.min(1, p.emissive[1] * boost),
      Math.min(1, p.emissive[2] * boost)
    ),
    weight: p.weight,
  }));
}

// ── WFC Engine (runs outside React render) ──
class WFCEngine {
  tiles: Tile[];
  cols: number;
  rows: number;
  cells: Cell[];
  uncollapsed: Set<number>;
  propStack: number[];
  done: boolean;
  holdTimer: number;
  lastCollapsed: number | null;

  constructor(tiles: Tile[], cols: number, rows: number) {
    this.tiles = tiles;
    this.cols = cols;
    this.rows = rows;
    this.cells = [];
    this.uncollapsed = new Set();
    this.propStack = [];
    this.done = false;
    this.holdTimer = 0;
    this.lastCollapsed = null;
    this.reset();
  }

  reset() {
    this.cells = [];
    this.propStack = [];
    this.uncollapsed.clear();
    this.lastCollapsed = null;
    const total = this.cols * this.rows;
    for (let i = 0; i < total; i++) {
      this.cells[i] = {
        collapsed: false,
        options: Array.from({ length: this.tiles.length }, (_, k) => k),
        tileId: -1,
        fadeIn: 0,
      };
      this.uncollapsed.add(i);
    }
    this.done = false;
    this.holdTimer = 0;
  }

  propagate() {
    let budget = 10;
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

    let chosen: number;
    if (this.lastCollapsed !== null && cands.length < 500) {
      const lx = this.lastCollapsed % this.cols;
      const ly = Math.floor(this.lastCollapsed / this.cols);
      let best = cands[0], bestD = Infinity;
      for (const c of cands) {
        const d = Math.abs(c % this.cols - lx) + Math.abs(Math.floor(c / this.cols) - ly);
        if (d < bestD) { bestD = d; best = c; }
      }
      chosen = best;
    } else {
      chosen = cands[Math.floor(Math.random() * cands.length)];
    }

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
    this.lastCollapsed = chosen;
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
      if (this.holdTimer > 300) {
        const perFrame = 4;
        let faded = 0;
        for (let i = 0; i < this.cells.length && faded < perFrame; i++) {
          const rIdx = (this.holdTimer * 11 + i * 7) % this.cells.length;
          if (this.cells[rIdx].tileId !== -1) {
            this.cells[rIdx].fadeIn -= 0.015;
            if (this.cells[rIdx].fadeIn <= 0) {
              this.cells[rIdx].tileId = -1;
              this.cells[rIdx].collapsed = false;
              this.cells[rIdx].options = Array.from({ length: this.tiles.length }, (_, k) => k);
              this.cells[rIdx].fadeIn = 0;
              this.uncollapsed.add(rIdx);
              faded++;
            }
          }
        }
        if (this.uncollapsed.size >= this.cols * this.rows * 0.6) {
          this.done = false;
          this.holdTimer = 0;
          this.propStack = [];
          this.lastCollapsed = null;
        }
      }
      return;
    }
    for (let c = 0; c < 3; c++) {
      this.collapseOne();
    }
  }
}

// ── 3D Terrain Mesh Component ──
function TerrainMesh({ cols, rows, isDark }: { cols: number; rows: number; isDark: boolean }) {
  const tilesData = useMemo(() => buildTiles(isDark), [isDark]);
  const engineRef = useRef<WFCEngine | null>(null);

  if (!engineRef.current) {
    engineRef.current = new WFCEngine(tilesData, cols, rows);
  }

  const total = cols * rows;

  // Instanced mesh refs
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(total * 3), [total]);

  // Geometry and material
  const geo = useMemo(() => {
    const g = new THREE.BoxGeometry(0.9, 1, 0.9);
    return g;
  }, []);

  const mat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: 0.7,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
  }, []);

  useFrame((state) => {
    const engine = engineRef.current!;
    engine.step();

    const mesh = meshRef.current;
    if (!mesh) return;

    const time = state.clock.elapsedTime;

    for (let i = 0; i < total; i++) {
      const cell = engine.cells[i];
      const cx = i % cols;
      const cy = Math.floor(i / cols);

      // Position in grid
      const px = (cx - cols / 2);
      const pz = (cy - rows / 2);

      if (cell.tileId !== -1) {
        // Fade in
        if (cell.fadeIn < 1) cell.fadeIn = Math.min(1, cell.fadeIn + 0.03);

        const tile = tilesData[cell.tileId];
        const breathe = 1 + 0.05 * Math.sin(time * 0.8 + cx * 0.2 + cy * 0.3);
        const h = tile.height * cell.fadeIn * breathe;

        dummy.position.set(px, h / 2 - 0.3, pz);
        dummy.scale.set(1, Math.max(0.01, h), 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        // Water shimmer
        let cR = tile.color.r, cG = tile.color.g, cB = tile.color.b;
        if (tile.type === 'water') {
          const shimmer = 0.02 * Math.sin(time * 2 + cx * 0.5 + cy * 0.3);
          cB += shimmer;
        }

        const fade = cell.fadeIn;
        colorArray[i * 3]     = cR * fade + tile.emissive.r * (1 - fade);
        colorArray[i * 3 + 1] = cG * fade + tile.emissive.g * (1 - fade);
        colorArray[i * 3 + 2] = cB * fade + tile.emissive.b * (1 - fade);
      } else {
        // Hidden — scale to zero
        dummy.position.set(px, -1, pz);
        dummy.scale.set(0.01, 0.01, 0.01);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        colorArray[i * 3]     = 0.02;
        colorArray[i * 3 + 1] = 0.02;
        colorArray[i * 3 + 2] = 0.05;
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    // Update instance colors
    mesh.geometry.setAttribute(
      'color',
      new THREE.InstancedBufferAttribute(colorArray, 3)
    );
    mat.vertexColors = true;
    mat.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geo, mat, total]}>
    </instancedMesh>
  );
}

// ── Main Component ──
export default function WaveFunctionCollapseBgV4({ className }: WaveFunctionCollapseBgV4Props) {
  const COLS = 30;
  const ROWS = 16;
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      <Canvas
        camera={{
          position: [0, 12, 14],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient light for overall visibility */}
        <ambientLight intensity={isDark ? 0.3 : 0.6} color={isDark ? '#4466aa' : '#88aadd'} />

        {/* Main directional light */}
        <directionalLight
          position={[8, 15, 5]}
          intensity={isDark ? 0.5 : 0.8}
          color={isDark ? '#6688cc' : '#aabbee'}
        />

        {/* Subtle rim light from below */}
        <pointLight
          position={[0, -3, 0]}
          intensity={isDark ? 0.15 : 0.25}
          color={isDark ? '#223366' : '#6688bb'}
          distance={30}
        />

        {/* Subtle top highlight */}
        <pointLight
          position={[0, 10, -5]}
          intensity={isDark ? 0.2 : 0.35}
          color={isDark ? '#8899cc' : '#aabbdd'}
          distance={25}
        />

        <TerrainMesh cols={COLS} rows={ROWS} isDark={isDark} />

        {/* Fog for depth */}
        <fog attach="fog" args={[isDark ? '#050810' : '#e8ecf2', 15, 35]} />

        {/* Slow auto-rotate camera */}
        <CameraRig />
      </Canvas>
    </div>
  );
}

// ── Slow orbiting camera ──
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.05;
    const radius = 18;
    const height = 14;
    state.camera.position.x = Math.sin(t) * radius;
    state.camera.position.z = Math.cos(t) * radius;
    state.camera.position.y = height + Math.sin(t * 0.3) * 2;
    state.camera.lookAt(0, -1, 0);
  });

  return null;
}
