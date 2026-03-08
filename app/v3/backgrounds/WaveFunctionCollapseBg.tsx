'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface WaveFunctionCollapseBgProps {
  className?: string;
}

interface WFCTile {
  id: number;
  edges: number[];
  rotation: number;
  type: string;
  weight: number;
}

interface WFCCell {
  collapsed: boolean;
  options: number[];
  error: boolean;
  opacity: number;
}

interface FadingCell {
  index: number;
  opacity: number;
}

export default function WaveFunctionCollapseBg({ className }: WaveFunctionCollapseBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const CELL_SIZE = 80;
    const COLOR_LINE   = isDark ? 'rgba(168, 192, 255, 0.3)'  : 'rgba(50, 80, 180, 0.35)';
    const COLOR_ERROR  = isDark ? 'rgba(168, 192, 255, 0.05)' : 'rgba(50, 80, 180, 0.05)';
    const COLOR_CURSOR = isDark ? 'rgba(168, 192, 255, 0.6)'  : 'rgba(50, 80, 180, 0.6)';
    const LINE_WIDTH = 2;

    let width = 0, height = 0, cols = 0, rows = 0;
    let virtualWidth = 0, virtualHeight = 0;

    let cells: WFCCell[] = [];
    let tiles: WFCTile[] = [];
    let uncollapsedIndices = new Set<number>();
    let propagationStack: number[] = [];

    let activeCell: number | null = null;
    let lastActiveCell: number | null = null;
    let cursorTimer = 0;

    const baseThinkingDuration = 40;
    let interactionTime = 0;

    let isComplete = false;
    let completeTimer = 0;

    let fadingCells: FadingCell[] = [];

    let cameraX = 0, cameraY = 0;
    let targetCamX = 0, targetCamY = 0;
    let animationId = 0;

    // --- Tile Definitions ---
    const tilePrototypes = [
      { edges: [0, 0, 0, 0], type: 'blank', weight: 1 },
      { edges: [1, 1, 1, 1], type: 'cross', weight: 5 },
      { edges: [1, 0, 1, 0], type: 'line', weight: 5 },
      { edges: [1, 1, 0, 0], type: 'corner', weight: 5 },
      { edges: [1, 1, 1, 0], type: 't', weight: 4 },
      { edges: [1, 0, 0, 0], type: 'end', weight: 2 },
    ];

    function rotateEdges(edges: number[], numRotations: number): number[] {
      const e = [...edges];
      for (let i = 0; i < numRotations; i++) {
        e.unshift(e.pop()!);
      }
      return e;
    }

    function generateTiles() {
      tiles = [];
      tilePrototypes.forEach((proto) => {
        let rotations = 4;
        if (proto.type === 'blank' || proto.type === 'cross') rotations = 1;
        if (proto.type === 'line') rotations = 2;

        for (let r = 0; r < rotations; r++) {
          const newEdges = rotateEdges(proto.edges, r);
          tiles.push({
            id: tiles.length,
            edges: newEdges,
            rotation: r,
            type: proto.type,
            weight: proto.weight,
          });
        }
      });
    }

    function resetSimulation() {
      cells = [];
      fadingCells = [];
      propagationStack = [];
      uncollapsedIndices.clear();
      activeCell = null;
      lastActiveCell = null;

      for (let i = 0; i < cols * rows; i++) {
        cells[i] = {
          collapsed: false,
          options: Array.from({ length: tiles.length }, (_, k) => k),
          error: false,
          opacity: 1,
        };
        uncollapsedIndices.add(i);
      }
      isComplete = false;
      completeTimer = 0;
    }

    function triggerError(index: number) {
      const cx = index % cols;
      const cy = Math.floor(index / cols);
      const radius = 6;

      for (let y = cy - radius; y <= cy + radius; y++) {
        for (let x = cx - radius; x <= cx + radius; x++) {
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            const cellIdx = x + y * cols;
            if (cells[cellIdx].collapsed) {
              cells[cellIdx].error = true;
              fadingCells.push({ index: cellIdx, opacity: 1.0 });
            }
          }
        }
      }
      propagationStack = [];
      activeCell = null;
    }

    function update() {
      const timeSinceInteraction = Date.now() - interactionTime;
      const isActive = timeSinceInteraction < 2000;
      const currentThinkingDuration = isActive ? 20 : baseThinkingDuration;
      const propagationBudget = isActive ? 3 : 1;

      if (activeCell !== null) {
        const cx = (activeCell % cols) * CELL_SIZE + CELL_SIZE / 2;
        const cy = Math.floor(activeCell / cols) * CELL_SIZE + CELL_SIZE / 2;
        targetCamX = -cx + width / 2;
        targetCamY = -cy + height / 2;
      }

      cameraX += (targetCamX - cameraX) * 0.005;
      cameraY += (targetCamY - cameraY) * 0.005;

      if (isComplete) {
        completeTimer++;
        if (completeTimer > 200) resetSimulation();
        return;
      }

      if (fadingCells.length > 0) {
        const fadeSpeed = isActive ? 0.1 : 0.02;
        for (let i = fadingCells.length - 1; i >= 0; i--) {
          const item = fadingCells[i];
          item.opacity -= fadeSpeed;
          if (item.opacity <= 0) {
            const idx = item.index;
            cells[idx].collapsed = false;
            cells[idx].options = Array.from({ length: tiles.length }, (_, k) => k);
            cells[idx].error = false;
            cells[idx].opacity = 1;
            uncollapsedIndices.add(idx);
            fadingCells.splice(i, 1);
          }
        }
        return;
      }

      if (propagationStack.length > 0) {
        let budget = propagationBudget;
        while (propagationStack.length > 0 && budget > 0) {
          budget--;
          const currentIdx = propagationStack.pop()!;
          const currentCell = cells[currentIdx];
          const curOptions = currentCell.options;

          if (curOptions.length === 0) { triggerError(currentIdx); return; }

          const x = currentIdx % cols;
          const y = Math.floor(currentIdx / cols);
          const offsets = [
            { dx: 0, dy: -1, dir: 0 }, { dx: 1, dy: 0, dir: 1 },
            { dx: 0, dy: 1, dir: 2 }, { dx: -1, dy: 0, dir: 3 },
          ];

          for (let i = 0; i < offsets.length; i++) {
            const neighborX = x + offsets[i].dx;
            const neighborY = y + offsets[i].dy;
            if (neighborX >= 0 && neighborX < cols && neighborY >= 0 && neighborY < rows) {
              const neighborIdx = neighborX + neighborY * cols;
              const neighbor = cells[neighborIdx];
              if (!neighbor.collapsed) {
                const originalLen = neighbor.options.length;
                const direction = offsets[i].dir;
                const matchDirection = (direction + 2) % 4;
                const allowedConnectors = new Set<number>();
                curOptions.forEach(optIdx => allowedConnectors.add(tiles[optIdx].edges[direction]));
                neighbor.options = neighbor.options.filter(optIdx => {
                  const connector = tiles[optIdx].edges[matchDirection];
                  return allowedConnectors.has(connector);
                });
                if (neighbor.options.length === 0) { triggerError(neighborIdx); return; }
                if (neighbor.options.length !== originalLen) {
                  propagationStack.push(neighborIdx);
                }
              }
            }
          }
        }
        return;
      }

      if (activeCell === null) {
        if (uncollapsedIndices.size === 0) {
          isComplete = true;
          return;
        }

        let minEntropy = Infinity;
        let candidates: number[] = [];
        for (const idx of uncollapsedIndices) {
          const len = cells[idx].options.length;
          if (len === 0) { triggerError(idx); return; }
          if (len < minEntropy) { minEntropy = len; candidates = [idx]; }
          else if (len === minEntropy) { candidates.push(idx); }
        }

        if (lastActiveCell !== null && candidates.length < 300) {
          const lx = lastActiveCell % cols;
          const ly = Math.floor(lastActiveCell / cols);
          let bestCandidate = candidates[0];
          let minDist = Infinity;
          const step = Math.ceil(candidates.length / 20);
          for (let i = 0; i < candidates.length; i += step) {
            const c = candidates[i];
            const cx = c % cols;
            const cy = Math.floor(c / cols);
            const dist = Math.abs(cx - lx) + Math.abs(cy - ly);
            if (dist < minDist) { minDist = dist; bestCandidate = c; }
          }
          activeCell = bestCandidate;
        } else {
          activeCell = candidates[Math.floor(Math.random() * candidates.length)];
        }

        lastActiveCell = activeCell;
        cursorTimer = currentThinkingDuration;
        return;
      }

      if (cursorTimer > 0) { cursorTimer--; return; }

      const cell = cells[activeCell];
      cell.collapsed = true;
      uncollapsedIndices.delete(activeCell);

      if (cell.options.length > 0) {
        let totalWeight = 0;
        cell.options.forEach(opt => totalWeight += tiles[opt].weight);
        let r = Math.random() * totalWeight;
        let selected = cell.options[0];
        for (const opt of cell.options) {
          r -= tiles[opt].weight;
          if (r <= 0) { selected = opt; break; }
        }
        cell.options = [selected];
      } else {
        triggerError(activeCell);
        return;
      }

      propagationStack.push(activeCell);
      activeCell = null;
    }

    function drawTile(tileIndex: number, x: number, y: number) {
      const tile = tiles[tileIndex];
      if (tile.type === 'blank') return;

      ctx.save();
      ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);

      ctx.strokeStyle = COLOR_LINE;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = 'round';

      ctx.beginPath();
      if (tile.type === 'corner') {
         let e1 = -1, e2 = -1;
         for (let i = 0; i < 4; i++) {
            if (tile.edges[i]) {
                if (e1 === -1) e1 = i;
                else e2 = i;
            }
         }
         const px1 = e1 === 1 ? CELL_SIZE/2 : e1 === 3 ? -CELL_SIZE/2 : 0;
         const py1 = e1 === 2 ? CELL_SIZE/2 : e1 === 0 ? -CELL_SIZE/2 : 0;
         const px2 = e2 === 1 ? CELL_SIZE/2 : e2 === 3 ? -CELL_SIZE/2 : 0;
         const py2 = e2 === 2 ? CELL_SIZE/2 : e2 === 0 ? -CELL_SIZE/2 : 0;
         ctx.moveTo(px1, py1);
         ctx.quadraticCurveTo(0, 0, px2, py2);
      } else {
        if (tile.edges[0]) { ctx.moveTo(0, 0); ctx.lineTo(0, -CELL_SIZE / 2); }
        if (tile.edges[1]) { ctx.moveTo(0, 0); ctx.lineTo(CELL_SIZE / 2, 0); }
        if (tile.edges[2]) { ctx.moveTo(0, 0); ctx.lineTo(0, CELL_SIZE / 2); }
        if (tile.edges[3]) { ctx.moveTo(0, 0); ctx.lineTo(-CELL_SIZE / 2, 0); }
      }
      ctx.stroke();

      if (tile.type === 'end') {
        ctx.fillStyle = COLOR_LINE;
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function draw() {
      ctx.fillStyle = isDark ? '#050505' : '#f8f8fa';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cameraX, cameraY);

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.opacity <= 0) continue;

        const x = (i % cols) * CELL_SIZE;
        const y = Math.floor(i / cols) * CELL_SIZE;

        if (fadingCells.length > 0 && cell.error) {
          ctx.globalAlpha = cell.opacity || 0;
          const fadeObj = fadingCells.find(f => f.index === i);
          if (fadeObj) ctx.globalAlpha = fadeObj.opacity;
        } else {
          ctx.globalAlpha = 1;
        }

        if (cell.error) {
          ctx.fillStyle = isDark
            ? `rgba(168, 192, 255, ${ctx.globalAlpha * 0.05})`
            : `rgba(50, 80, 180, ${ctx.globalAlpha * 0.05})`;
          ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        }

        if (cell.collapsed && cell.options.length > 0) {
          drawTile(cell.options[0], x, y);
        } else if (i === activeCell && cursorTimer > 0) {
          const randomOpt = cell.options[Math.floor(Math.random() * cell.options.length)];
          ctx.globalAlpha = 0.5;
          drawTile(randomOpt, x, y);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = COLOR_CURSOR;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
        } else {
          if (cell.options.length < tiles.length) {
            ctx.fillStyle = isDark ? `rgba(0, 243, 255, 0.05)` : `rgba(0, 100, 200, 0.08)`;
            ctx.fillRect(x + CELL_SIZE / 2 - 2, y + CELL_SIZE / 2 - 2, 4, 4);
          }
        }
      }
      ctx.restore();
    }

    function loop() {
      if (!document.hidden) {
        update();
        draw();
      }
      animationId = requestAnimationFrame(loop);
    }

    function setup() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      virtualWidth = width * 1.5;
      virtualHeight = height * 1.5;
      cols = Math.ceil(virtualWidth / CELL_SIZE);
      rows = Math.ceil(virtualHeight / CELL_SIZE);
      cameraX = -(virtualWidth - width) / 2;
      cameraY = -(virtualHeight - height) / 2;
      targetCamX = cameraX;
      targetCamY = cameraY;
      generateTiles();
      resetSimulation();
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    };

    const handleMouseMove = () => { interactionTime = Date.now(); };
    const handleMouseDown = () => { interactionTime = Date.now(); };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    setup();
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
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
