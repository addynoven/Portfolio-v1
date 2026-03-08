'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface WaveFunctionCollapseBgV3Props {
  className?: string;
}

// ── WFC V3: Terrain Map Builder ──
// Uses WFC to procedurally build a glowing isometric-style terrain map.
// Tile types: water, land, coast, mountain, forest — each with distinct
// edge-matching rules so the map looks coherent as it builds.

interface TerrainTile {
  id: number;
  edges: number[];       // [top, right, bottom, left] — edge types for matching
  type: string;          // terrain type
  weight: number;
}

interface MapCell {
  collapsed: boolean;
  options: number[];
  tileId: number;
  fadeIn: number;
}

export default function WaveFunctionCollapseBgV3({ className }: WaveFunctionCollapseBgV3Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const CELL = 28;
    const COLLAPSE_PER_FRAME = 2;

    let width = 0, height = 0, cols = 0, rows = 0;
    let cells: MapCell[] = [];
    let tiles: TerrainTile[] = [];
    let uncollapsed = new Set<number>();
    let propStack: number[] = [];
    let animId = 0;
    let frame = 0;
    let done = false;
    let holdTimer = 0;
    let time = 0;
    let lastCollapsed: number | null = null;

    // ── Edge types ──
    // 0 = water edge
    // 1 = coast/shore edge
    // 2 = land/grass edge
    // 3 = dense/forest edge
    // 4 = highland edge
    // Matching: neighbors must share edge value at touching sides

    const protos = [
      // Water tiles
      { edges: [0, 0, 0, 0], type: 'deep_water', weight: 8 },
      { edges: [0, 0, 1, 0], type: 'coast_s', weight: 3 },
      { edges: [0, 0, 0, 1], type: 'coast_e', weight: 3 },
      { edges: [1, 0, 0, 0], type: 'coast_n', weight: 3 },
      { edges: [0, 1, 0, 0], type: 'coast_w', weight: 3 },
      { edges: [1, 0, 1, 0], type: 'coast_ns', weight: 2 },
      { edges: [0, 1, 0, 1], type: 'coast_ew', weight: 2 },
      { edges: [1, 1, 0, 0], type: 'coast_nw', weight: 2 },
      { edges: [0, 1, 1, 0], type: 'coast_sw', weight: 2 },
      { edges: [0, 0, 1, 1], type: 'coast_se', weight: 2 },
      { edges: [1, 0, 0, 1], type: 'coast_ne', weight: 2 },
      // Land tiles
      { edges: [1, 1, 1, 1], type: 'shore', weight: 4 },
      { edges: [2, 1, 2, 1], type: 'land_strip_h', weight: 3 },
      { edges: [1, 2, 1, 2], type: 'land_strip_v', weight: 3 },
      { edges: [2, 2, 1, 1], type: 'land_corner_se', weight: 2 },
      { edges: [1, 2, 2, 1], type: 'land_corner_ne', weight: 2 },
      { edges: [1, 1, 2, 2], type: 'land_corner_nw', weight: 2 },
      { edges: [2, 1, 1, 2], type: 'land_corner_sw', weight: 2 },
      { edges: [2, 2, 2, 2], type: 'grass', weight: 10 },
      { edges: [2, 2, 2, 1], type: 'land_edge_w', weight: 3 },
      { edges: [2, 2, 1, 2], type: 'land_edge_s', weight: 3 },
      { edges: [2, 1, 2, 2], type: 'land_edge_e', weight: 3 },
      { edges: [1, 2, 2, 2], type: 'land_edge_n', weight: 3 },
      // Forest / dense areas
      { edges: [2, 2, 3, 2], type: 'forest_edge_s', weight: 2 },
      { edges: [2, 3, 2, 2], type: 'forest_edge_e', weight: 2 },
      { edges: [3, 2, 2, 2], type: 'forest_edge_n', weight: 2 },
      { edges: [2, 2, 2, 3], type: 'forest_edge_w', weight: 2 },
      { edges: [3, 3, 3, 3], type: 'forest', weight: 5 },
      { edges: [3, 3, 2, 2], type: 'forest_corner_se', weight: 2 },
      { edges: [2, 3, 3, 2], type: 'forest_corner_ne', weight: 2 },
      { edges: [2, 2, 3, 3], type: 'forest_corner_nw', weight: 2 },
      { edges: [3, 2, 2, 3], type: 'forest_corner_sw', weight: 2 },
      // Highland / peaks
      { edges: [3, 3, 4, 3], type: 'highland_s', weight: 1 },
      { edges: [3, 4, 3, 3], type: 'highland_e', weight: 1 },
      { edges: [4, 3, 3, 3], type: 'highland_n', weight: 1 },
      { edges: [3, 3, 3, 4], type: 'highland_w', weight: 1 },
      { edges: [4, 4, 4, 4], type: 'peak', weight: 2 },
      { edges: [4, 4, 3, 3], type: 'peak_corner_se', weight: 1 },
      { edges: [3, 4, 4, 3], type: 'peak_corner_ne', weight: 1 },
      { edges: [3, 3, 4, 4], type: 'peak_corner_nw', weight: 1 },
      { edges: [4, 3, 3, 4], type: 'peak_corner_sw', weight: 1 },
    ];

    function genTiles() {
      tiles = protos.map((p, i) => ({
        id: i,
        edges: [...p.edges],
        type: p.type,
        weight: p.weight,
      }));
    }

    // ── Color mapping for terrain ──
    function getTerrainStyle(type: string, alpha: number): { fill: string; glow?: string } {
      const a = alpha;
      if (isDark) {
        if (type === 'deep_water')       return { fill: `rgba(10, 25, 60, ${a * 0.7})`,    glow: `rgba(30, 80, 180, ${a * 0.15})` };
        if (type.startsWith('coast'))    return { fill: `rgba(20, 50, 100, ${a * 0.6})`,   glow: `rgba(60, 140, 220, ${a * 0.12})` };
        if (type === 'shore')            return { fill: `rgba(40, 70, 110, ${a * 0.5})`,   glow: `rgba(80, 160, 220, ${a * 0.1})` };
        if (type === 'grass')            return { fill: `rgba(20, 60, 40, ${a * 0.55})`,   glow: `rgba(40, 160, 80, ${a * 0.12})` };
        if (type.startsWith('land'))     return { fill: `rgba(25, 55, 45, ${a * 0.5})`,    glow: `rgba(50, 140, 70, ${a * 0.1})` };
        if (type === 'forest')           return { fill: `rgba(12, 40, 25, ${a * 0.65})`,   glow: `rgba(20, 120, 50, ${a * 0.15})` };
        if (type.startsWith('forest'))   return { fill: `rgba(15, 45, 30, ${a * 0.55})`,   glow: `rgba(30, 110, 55, ${a * 0.12})` };
        if (type === 'peak')             return { fill: `rgba(45, 40, 55, ${a * 0.7})`,    glow: `rgba(120, 100, 180, ${a * 0.2})` };
        if (type.startsWith('highland')) return { fill: `rgba(35, 35, 50, ${a * 0.6})`,    glow: `rgba(100, 90, 160, ${a * 0.15})` };
        if (type.startsWith('peak'))     return { fill: `rgba(40, 38, 52, ${a * 0.65})`,   glow: `rgba(110, 95, 170, ${a * 0.18})` };
        return { fill: `rgba(20, 20, 30, ${a * 0.3})` };
      }
      // Light mode — brighter, saturated terrain
      if (type === 'deep_water')       return { fill: `rgba(60, 120, 200, ${a * 0.5})`,   glow: `rgba(80, 150, 230, ${a * 0.12})` };
      if (type.startsWith('coast'))    return { fill: `rgba(90, 160, 220, ${a * 0.45})`,  glow: `rgba(100, 180, 240, ${a * 0.1})` };
      if (type === 'shore')            return { fill: `rgba(140, 190, 220, ${a * 0.4})`,  glow: `rgba(160, 200, 230, ${a * 0.08})` };
      if (type === 'grass')            return { fill: `rgba(60, 160, 80, ${a * 0.4})`,    glow: `rgba(80, 190, 100, ${a * 0.1})` };
      if (type.startsWith('land'))     return { fill: `rgba(70, 150, 90, ${a * 0.35})`,   glow: `rgba(90, 170, 110, ${a * 0.08})` };
      if (type === 'forest')           return { fill: `rgba(30, 110, 50, ${a * 0.5})`,    glow: `rgba(40, 140, 65, ${a * 0.12})` };
      if (type.startsWith('forest'))   return { fill: `rgba(40, 120, 60, ${a * 0.4})`,    glow: `rgba(50, 140, 70, ${a * 0.1})` };
      if (type === 'peak')             return { fill: `rgba(120, 100, 150, ${a * 0.5})`,  glow: `rgba(150, 130, 190, ${a * 0.15})` };
      if (type.startsWith('highland')) return { fill: `rgba(110, 95, 140, ${a * 0.45})`,  glow: `rgba(140, 120, 175, ${a * 0.12})` };
      if (type.startsWith('peak'))     return { fill: `rgba(115, 98, 145, ${a * 0.48})`,  glow: `rgba(145, 125, 185, ${a * 0.14})` };
      return { fill: `rgba(180, 180, 190, ${a * 0.2})` };
    }

    function reset() {
      cells = [];
      propStack = [];
      uncollapsed.clear();
      lastCollapsed = null;
      for (let i = 0; i < cols * rows; i++) {
        cells[i] = {
          collapsed: false,
          options: Array.from({ length: tiles.length }, (_, k) => k),
          tileId: -1,
          fadeIn: 0,
        };
        uncollapsed.add(i);
      }
      done = false;
      holdTimer = 0;
    }

    // ── WFC Core ──

    function propagate() {
      let budget = 8;
      while (propStack.length > 0 && budget > 0) {
        budget--;
        const idx = propStack.pop()!;
        const cell = cells[idx];
        if (cell.options.length === 0) { fixConflict(idx); return; }

        const x = idx % cols, y = Math.floor(idx / cols);
        const dirs = [
          { dx: 0, dy: -1, d: 0 }, { dx: 1, dy: 0, d: 1 },
          { dx: 0, dy: 1, d: 2 },  { dx: -1, dy: 0, d: 3 },
        ];

        for (const dir of dirs) {
          const nx = x + dir.dx, ny = y + dir.dy;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
          const nIdx = nx + ny * cols;
          const nb = cells[nIdx];
          if (nb.collapsed) continue;
          const prevLen = nb.options.length;
          const matchD = (dir.d + 2) % 4;
          const allowed = new Set<number>();
          cell.options.forEach(o => allowed.add(tiles[o].edges[dir.d]));
          nb.options = nb.options.filter(o => allowed.has(tiles[o].edges[matchD]));
          if (nb.options.length === 0) { fixConflict(nIdx); return; }
          if (nb.options.length !== prevLen) propStack.push(nIdx);
        }
      }
    }

    function collapseOne() {
      if (done) return;
      if (propStack.length > 0) { propagate(); return; }
      if (uncollapsed.size === 0) { done = true; return; }

      // Lowest entropy
      let minE = Infinity;
      let cands: number[] = [];
      for (const idx of uncollapsed) {
        const len = cells[idx].options.length;
        if (len === 0) { fixConflict(idx); return; }
        if (len < minE) { minE = len; cands = [idx]; }
        else if (len === minE) cands.push(idx);
      }

      // Prefer cells near the last collapsed one for a "spreading" effect
      let chosen: number;
      if (lastCollapsed !== null && cands.length < 500) {
        const lx = lastCollapsed % cols, ly = Math.floor(lastCollapsed / cols);
        let best = cands[0], bestD = Infinity;
        for (const c of cands) {
          const d = Math.abs(c % cols - lx) + Math.abs(Math.floor(c / cols) - ly);
          if (d < bestD) { bestD = d; best = c; }
        }
        chosen = best;
      } else {
        chosen = cands[Math.floor(Math.random() * cands.length)];
      }

      const cell = cells[chosen];
      // Weighted pick
      let tw = 0;
      cell.options.forEach(o => tw += tiles[o].weight);
      let r = Math.random() * tw;
      let sel = cell.options[0];
      for (const o of cell.options) {
        r -= tiles[o].weight;
        if (r <= 0) { sel = o; break; }
      }

      cell.collapsed = true;
      cell.options = [sel];
      cell.tileId = sel;
      cell.fadeIn = 0;
      uncollapsed.delete(chosen);
      lastCollapsed = chosen;
      propStack.push(chosen);
    }

    function fixConflict(idx: number) {
      const cx = idx % cols, cy = Math.floor(idx / cols);
      const rad = 2;
      for (let y = cy - rad; y <= cy + rad; y++) {
        for (let x = cx - rad; x <= cx + rad; x++) {
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            const i = x + y * cols;
            cells[i].collapsed = false;
            cells[i].options = Array.from({ length: tiles.length }, (_, k) => k);
            cells[i].tileId = -1;
            cells[i].fadeIn = 0;
            uncollapsed.add(i);
          }
        }
      }
      propStack = [];
    }

    // ── Rendering ──

    function draw() {
      time += 0.003;
      ctx.clearRect(0, 0, width, height);

      // Draw each collapsed cell as terrain
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.tileId === -1) continue;

        if (cell.fadeIn < 1) cell.fadeIn = Math.min(1, cell.fadeIn + 0.025);

        const x = (i % cols) * CELL;
        const y = Math.floor(i / cols) * CELL;
        const tile = tiles[cell.tileId];
        const style = getTerrainStyle(tile.type, cell.fadeIn);

        // Base fill
        ctx.fillStyle = style.fill;
        ctx.fillRect(x, y, CELL, CELL);

        // Soft glow overlay
        if (style.glow) {
          const cx = x + CELL / 2;
          const cy = y + CELL / 2;
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, CELL * 0.9);
          grad.addColorStop(0, style.glow);
          grad.addColorStop(1, isDark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(x - CELL * 0.2, y - CELL * 0.2, CELL * 1.4, CELL * 1.4);
        }

        // Subtle inner detail based on type
        drawTerrainDetail(tile.type, x, y, cell.fadeIn);
      }

      // Draw the collapse frontier — glowing edge where map is still building
      drawFrontier();

      // Subtle water shimmer for water tiles
      drawWaterShimmer();
    }

    function drawTerrainDetail(type: string, x: number, y: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;

      if (type === 'deep_water') {
        // Tiny wave lines
        const waveY = y + CELL / 2 + Math.sin(time * 3 + x * 0.05) * 2;
        ctx.strokeStyle = isDark ? 'rgba(60, 120, 200, 0.15)' : 'rgba(40, 90, 180, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + 4, waveY);
        ctx.quadraticCurveTo(x + CELL / 2, waveY - 2, x + CELL - 4, waveY);
        ctx.stroke();
      }

      if (type === 'grass') {
        // Tiny grass dots
        ctx.fillStyle = isDark ? 'rgba(60, 180, 80, 0.12)' : 'rgba(40, 140, 60, 0.2)';
        for (let d = 0; d < 3; d++) {
          const gx = x + 5 + (d * 8) + Math.sin(time + d) * 1;
          const gy = y + 8 + (d * 6);
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (type === 'forest') {
        // Tiny tree shapes
        ctx.fillStyle = isDark ? 'rgba(20, 140, 50, 0.2)' : 'rgba(20, 110, 45, 0.3)';
        const tx = x + CELL / 2;
        const ty = y + CELL / 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty - 5);
        ctx.lineTo(tx - 4, ty + 3);
        ctx.lineTo(tx + 4, ty + 3);
        ctx.closePath();
        ctx.fill();
      }

      if (type === 'peak') {
        // Mountain triangle
        ctx.fillStyle = isDark ? 'rgba(160, 140, 220, 0.2)' : 'rgba(120, 100, 180, 0.3)';
        const mx = x + CELL / 2;
        const my = y + CELL / 2;
        ctx.beginPath();
        ctx.moveTo(mx, my - 6);
        ctx.lineTo(mx - 5, my + 4);
        ctx.lineTo(mx + 5, my + 4);
        ctx.closePath();
        ctx.fill();
        // Snow cap
        ctx.fillStyle = isDark ? 'rgba(200, 210, 240, 0.15)' : 'rgba(180, 190, 220, 0.25)';
        ctx.beginPath();
        ctx.moveTo(mx, my - 6);
        ctx.lineTo(mx - 2, my - 2);
        ctx.lineTo(mx + 2, my - 2);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    function drawFrontier() {
      // Draw a soft glow around cells that are at the boundary of collapsed/uncollapsed
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].tileId !== -1) continue;
        const x = (i % cols), y = Math.floor(i / cols);

        // Check if any neighbor is collapsed
        let hasCollapsedNeighbor = false;
        const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            if (cells[nx + ny * cols].tileId !== -1) {
              hasCollapsedNeighbor = true;
              break;
            }
          }
        }

        if (hasCollapsedNeighbor) {
          const px = x * CELL + CELL / 2;
          const py = y * CELL + CELL / 2;
          const pulse = 0.4 + 0.6 * Math.sin(time * 5 + i * 0.5);
          const entropy = cells[i].options.length / tiles.length;
          const brightness = (1 - entropy) * 0.3 * pulse;

          const grad = ctx.createRadialGradient(px, py, 0, px, py, CELL * 0.7);
          grad.addColorStop(0, isDark ? `rgba(100, 180, 255, ${brightness})` : `rgba(40, 100, 200, ${brightness})`);
          grad.addColorStop(1, isDark ? 'rgba(100, 180, 255, 0)' : 'rgba(40, 100, 200, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, CELL * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawWaterShimmer() {
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.tileId === -1) continue;
        const tile = tiles[cell.tileId];
        if (tile.type !== 'deep_water' && !tile.type.startsWith('coast')) continue;

        const x = (i % cols) * CELL;
        const y = Math.floor(i / cols) * CELL;
        const shimmerX = x + CELL / 2 + Math.sin(time * 2 + i * 0.7) * (CELL * 0.3);
        const shimmerY = y + CELL / 2 + Math.cos(time * 1.5 + i * 0.5) * (CELL * 0.2);

        ctx.fillStyle = isDark
          ? `rgba(80, 160, 255, ${cell.fadeIn * 0.08})`
          : `rgba(40, 100, 200, ${cell.fadeIn * 0.12})`;
        ctx.beginPath();
        ctx.arc(shimmerX, shimmerY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function update() {
      frame++;

      if (done) {
        holdTimer++;
        if (holdTimer > 500) {
          // Slowly dissolve and rebuild
          const perFrame = 3;
          let faded = 0;
          for (let i = 0; i < cells.length && faded < perFrame; i++) {
            const rIdx = (holdTimer * 11 + i * 7) % cells.length;
            if (cells[rIdx].tileId !== -1) {
              cells[rIdx].fadeIn -= 0.008;
              if (cells[rIdx].fadeIn <= 0) {
                cells[rIdx].tileId = -1;
                cells[rIdx].collapsed = false;
                cells[rIdx].options = Array.from({ length: tiles.length }, (_, k) => k);
                cells[rIdx].fadeIn = 0;
                uncollapsed.add(rIdx);
                faded++;
              }
            }
          }
          if (uncollapsed.size >= cols * rows * 0.6) {
            done = false;
            holdTimer = 0;
            propStack = [];
            lastCollapsed = null;
          }
        }
        return;
      }

      for (let c = 0; c < COLLAPSE_PER_FRAME; c++) {
        collapseOne();
      }
    }

    function loop() {
      if (!document.hidden) {
        update();
        draw();
      }
      animId = requestAnimationFrame(loop);
    }

    function setup() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      genTiles();
      reset();
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
      cancelAnimationFrame(animId);
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
