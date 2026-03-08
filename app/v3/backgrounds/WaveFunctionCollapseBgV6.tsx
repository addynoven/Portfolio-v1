"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface WaveFunctionCollapseBgV6Props {
	className?: string;
}

// --- WFC Types ---
interface ColorTile {
	id: number;
	edges: number[];
	hue: number;
	saturation: number;
	lightness: number;
	weight: number;
}

interface ColorCell {
	collapsed: boolean;
	options: number[];
	tileId: number;
	fadeIn: number;
}

// --- Boids Types ---
class Boid {
	x: number;
	y: number;
	z: number;
	vx: number;
	vy: number;
	speedMult: number;
	alpha: number;
	size: number;
	hueOffset: number;
	wingAngle: number;
	wingSpeed: number;

	constructor(x: number, y: number, z: number, speedMult: number) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.speedMult = speedMult;
		const angle = Math.random() * Math.PI * 2;
		this.vx = Math.cos(angle) * 1.5 * this.speedMult;
		this.vy = Math.sin(angle) * 1.5 * this.speedMult;
		this.alpha = 0.4 + this.z * 0.6; // We will adjust alpha dynamically in render based on theme
		this.size = 2 + this.z * 3; // larger birds
		this.hueOffset = Math.random() * 40 - 20;
		this.wingAngle = Math.random() * Math.PI * 2;
		this.wingSpeed = 0.15 + Math.random() * 0.1;
	}
}

export default function WaveFunctionCollapseBgV6({
	className,
}: WaveFunctionCollapseBgV6Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme, resolvedTheme } = useTheme();

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		// --- Unified Configuration ---
		const currentTheme = resolvedTheme || theme;
		const isLight = currentTheme === "light";

		// WFC Config
		const WFC_CELL_SIZE = 80; // slightly larger for background biome
		const FADE_SPEED = 0.015;
		const COLLAPSE_SPEED = 3;

		// GoL Config
		const GOL_CELL_SIZE = 30;
		const GOL_TICK_RATE = 100; // ms per tick

		// Boids Config
		const MAX_BOIDS = 120;
		const VIEW_RADIUS = 150;
		const BASE_SPEED = 2.0;

		// ----------------------------------------------------
		// Context State Variables
		// ----------------------------------------------------
		let width = 0,
			height = 0;
		let wfcCols = 0,
			wfcRows = 0;
		let golCols = 0,
			golRows = 0;

		// Animation Loop Variables
		let animationId = 0;
		let frameCount = 0;
		let globalTime = 0;
		let lastGolTick = 0;

		// Interaction State
		let mouseX = -1000;
		let mouseY = -1000;

		// --- Data structures ---
		let wfcCells: ColorCell[] = [];
		let wfcTiles: ColorTile[] = [];
		let uncollapsedIndices = new Set<number>();
		let propagationStack: number[] = [];
		let isComplete = false;
		let completeHoldTimer = 0;

		let golGrid: number[][] = [];
		let boids: Boid[] = [];

		// --- WFC Logic & Palettes ---
		const palettes = [
			{ hue: 230, sat: 40, light: isLight ? 94 : 12 }, // indigo ish
			{ hue: 260, sat: 35, light: isLight ? 92 : 15 }, // soft violet
			{ hue: 200, sat: 30, light: isLight ? 95 : 10 }, // dark teal
			{ hue: 280, sat: 25, light: isLight ? 93 : 18 }, // muted purple
			{ hue: 210, sat: 45, light: isLight ? 96 : 8 }, // midnight blue / soft sky
			{ hue: 320, sat: 20, light: isLight ? 94 : 14 }, // dusky rose
		];

		const tilePrototypes = [
			{ edges: [0, 0, 0, 0], weight: 3 },
			{ edges: [1, 1, 1, 1], weight: 2 },
			{ edges: [2, 2, 2, 2], weight: 1 },
			{ edges: [0, 1, 0, 1], weight: 4 },
			{ edges: [1, 0, 1, 0], weight: 4 },
			{ edges: [0, 0, 1, 1], weight: 5 },
			{ edges: [1, 1, 0, 0], weight: 5 },
			{ edges: [0, 1, 1, 0], weight: 5 },
			{ edges: [1, 0, 0, 1], weight: 5 },
			{ edges: [0, 0, 0, 1], weight: 3 },
			{ edges: [1, 0, 0, 0], weight: 3 },
			{ edges: [0, 1, 0, 0], weight: 3 },
			{ edges: [0, 0, 1, 0], weight: 3 },
		];

		function generateWfcTiles() {
			wfcTiles = [];
			tilePrototypes.forEach((proto) => {
				const edgeSum = proto.edges.reduce((a, b) => a + b, 0);
				const paletteIdx = edgeSum % palettes.length;
				const pal = palettes[paletteIdx];
				wfcTiles.push({
					id: wfcTiles.length,
					edges: [...proto.edges],
					hue: pal.hue + (Math.random() * 20 - 10),
					saturation: pal.sat + (Math.random() * 10 - 5),
					lightness: pal.light + (Math.random() * 4 - 2),
					weight: proto.weight,
				});
			});
		}

		function resetWfc() {
			wfcCells = [];
			propagationStack = [];
			uncollapsedIndices.clear();

			for (let i = 0; i < wfcCols * wfcRows; i++) {
				wfcCells[i] = {
					collapsed: false,
					options: Array.from({ length: wfcTiles.length }, (_, k) => k),
					tileId: -1,
					fadeIn: 0,
				};
				uncollapsedIndices.add(i);
			}
			isComplete = false;
			completeHoldTimer = 0;
		}

		function handleContradiction(idx: number) {
			const cx = idx % wfcCols;
			const cy = Math.floor(idx / wfcCols);
			const radius = 3;
			for (let y = cy - radius; y <= cy + radius; y++) {
				for (let x = cx - radius; x <= cx + radius; x++) {
					if (x >= 0 && x < wfcCols && y >= 0 && y < wfcRows) {
						const i = x + y * wfcCols;
						wfcCells[i].collapsed = false;
						wfcCells[i].options = Array.from(
							{ length: wfcTiles.length },
							(_, k) => k,
						);
						wfcCells[i].tileId = -1;
						wfcCells[i].fadeIn = 0;
						uncollapsedIndices.add(i);
					}
				}
			}
			propagationStack = [];
		}

		function collapseWfc() {
			if (isComplete) return;

			if (propagationStack.length > 0) {
				let budget = 4;
				while (propagationStack.length > 0 && budget > 0) {
					budget--;
					const idx = propagationStack.pop()!;
					const cell = wfcCells[idx];
					const opts = cell.options;
					if (opts.length === 0) {
						handleContradiction(idx);
						return;
					}

					const x = idx % wfcCols;
					const y = Math.floor(idx / wfcCols);
					const offsets = [
						{ dx: 0, dy: -1, dir: 0 },
						{ dx: 1, dy: 0, dir: 1 },
						{ dx: 0, dy: 1, dir: 2 },
						{ dx: -1, dy: 0, dir: 3 },
					];

					for (const off of offsets) {
						const nx = x + off.dx;
						const ny = y + off.dy;
						if (nx >= 0 && nx < wfcCols && ny >= 0 && ny < wfcRows) {
							const nIdx = nx + ny * wfcCols;
							const neighbor = wfcCells[nIdx];
							if (!neighbor.collapsed) {
								const prevLen = neighbor.options.length;
								const matchDir = (off.dir + 2) % 4;
								const allowed = new Set<number>();
								opts.forEach((o) => allowed.add(wfcTiles[o].edges[off.dir]));
								neighbor.options = neighbor.options.filter((o) =>
									allowed.has(wfcTiles[o].edges[matchDir]),
								);
								if (neighbor.options.length === 0) {
									handleContradiction(nIdx);
									return;
								}
								if (neighbor.options.length !== prevLen) {
									propagationStack.push(nIdx);
								}
							}
						}
					}
				}
				return;
			}

			if (uncollapsedIndices.size === 0) {
				isComplete = true;
				return;
			}

			let minEntropy = Infinity;
			let candidates: number[] = [];
			for (const idx of uncollapsedIndices) {
				const len = wfcCells[idx].options.length;
				if (len === 0) {
					handleContradiction(idx);
					return;
				}
				if (len < minEntropy) {
					minEntropy = len;
					candidates = [idx];
				} else if (len === minEntropy) {
					candidates.push(idx);
				}
			}

			const chosen = candidates[Math.floor(Math.random() * candidates.length)];
			const cell = wfcCells[chosen];

			let totalW = 0;
			cell.options.forEach((o) => (totalW += wfcTiles[o].weight));
			let r = Math.random() * totalW;
			let selected = cell.options[0];
			for (const o of cell.options) {
				r -= wfcTiles[o].weight;
				if (r <= 0) {
					selected = o;
					break;
				}
			}

			cell.collapsed = true;
			cell.options = [selected];
			cell.tileId = selected;
			cell.fadeIn = 0;
			uncollapsedIndices.delete(chosen);
			propagationStack.push(chosen);

			// Boid spawning logic: occasionally spawn a bird from a collapsing biome tile
			if (boids.length < MAX_BOIDS && Math.random() < 0.2) {
				const cx = (chosen % wfcCols) * WFC_CELL_SIZE + WFC_CELL_SIZE / 2;
				const cy =
					Math.floor(chosen / wfcCols) * WFC_CELL_SIZE + WFC_CELL_SIZE / 2;
				spawnBoid(cx, cy);
			}
		}

		// --- Game of Life Logic ---
		function resetGol() {
			golGrid = new Array(golCols)
				.fill(null)
				.map(() => new Array(golRows).fill(0));
			// Give initial random seeds to GoL grid so birds have something to react to immediately
			for (let i = 0; i < golCols; i++) {
				for (let j = 0; j < golRows; j++) {
					if (Math.random() > 0.95) golGrid[i][j] = 1;
				}
			}
		}

		function tickGol() {
			const next = new Array(golCols)
				.fill(null)
				.map(() => new Array(golRows).fill(0));
			let aliveCount = 0;

			for (let i = 0; i < golCols; i++) {
				for (let j = 0; j < golRows; j++) {
					const state = golGrid[i][j];
					let sum = 0;
					for (let di = -1; di < 2; di++) {
						for (let dj = -1; dj < 2; dj++) {
							if (di === 0 && dj === 0) continue;
							const col = (i + di + golCols) % golCols;
							const row = (j + dj + golRows) % golRows;
							sum += golGrid[col][row];
						}
					}

					let nextState = state;
					if (state === 0 && sum === 3) nextState = 1;
					else if (state === 1 && (sum < 2 || sum > 3)) nextState = 0;

					next[i][j] = nextState;
					if (nextState === 1) aliveCount++;
				}
			}
			golGrid = next;
			// Respawn seeds if too few
			if (aliveCount < 5) {
				for (let i = 0; i < 10; i++) {
					golGrid[Math.floor(Math.random() * golCols)][
						Math.floor(Math.random() * golRows)
					] = 1;
				}
			}
		}

		function handleMouseDraw(e: MouseEvent) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			const x = Math.floor(mouseX / GOL_CELL_SIZE);
			const y = Math.floor(mouseY / GOL_CELL_SIZE);
			const brushSize = 2; // Paint a small cluster
			for (let i = -brushSize; i <= brushSize; i++) {
				for (let j = -brushSize; j <= brushSize; j++) {
					const col = x + i;
					const row = y + j;
					if (col >= 0 && col < golCols && row >= 0 && row < golRows) {
						if (Math.random() > 0.3) {
							golGrid[col][row] = 1;
						}
					}
				}
			}
		}

		// --- Boids Logic ---
		function spawnBoid(x: number, y: number) {
			const z = Math.random();
			const speedMult = 0.5 + z * 0.5;
			boids.push(new Boid(x, y, z, speedMult));
		}

		// Base boid update logic combining Cohesion, Separation, Alignment + GoL + WFC
		function updateBoids() {
			for (let i = 0; i < boids.length; i++) {
				const b = boids[i];

				let aliX = 0,
					aliY = 0;
				let sepX = 0,
					sepY = 0;
				let cohX = 0,
					cohY = 0;
				let count = 0;

				for (let j = 0; j < boids.length; j++) {
					if (i === j) continue;
					const other = boids[j];
					const dx = other.x - b.x;
					const dy = other.y - b.y;
					const distSq = dx * dx + dy * dy;

					// Only interact with birds somewhat in the same z-plane
					if (Math.abs(b.z - other.z) > 0.4) continue;

					if (distSq < VIEW_RADIUS * VIEW_RADIUS) {
						aliX += other.vx;
						aliY += other.vy;
						cohX += other.x;
						cohY += other.y;
						if (distSq < 50 * 50) {
							const dist = Math.sqrt(distSq);
							sepX += (b.x - other.x) / (dist || 0.1);
							sepY += (b.y - other.y) / (dist || 0.1);
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

					cohX = cohX / count - b.x;
					cohY = cohY / count - b.y;
					const cohLen = Math.sqrt(cohX * cohX + cohY * cohY);
					if (cohLen > 0) {
						cohX = (cohX / cohLen) * BASE_SPEED;
						cohY = (cohY / cohLen) * BASE_SPEED;
					}

					b.vx += aliX * 0.04 + sepX * 0.06 + cohX * 0.02;
					b.vy += aliY * 0.04 + sepY * 0.06 + cohY * 0.02;
				}

				// 1. WFC Biome Influence (Wind/Flow)
				const cellX = Math.floor(b.x / WFC_CELL_SIZE);
				const cellY = Math.floor(b.y / WFC_CELL_SIZE);
				if (cellX >= 0 && cellX < wfcCols && cellY >= 0 && cellY < wfcRows) {
					const wfcIdx = cellX + cellY * wfcCols;
					const cell = wfcCells[wfcIdx];
					if (cell && cell.tileId !== -1) {
						const tile = wfcTiles[cell.tileId];
						// Wind blows based on biome color (hue)
						const windAngle = (tile.hue / 360) * Math.PI * 2 + globalTime;
						b.vx += Math.cos(windAngle) * 0.03;
						b.vy += Math.sin(windAngle) * 0.03;
					}
				}

				// 2. Game of Life Influence
				// Boids look for nearby active GoL cells and are attracted to them (like food/warmth)
				const gX = Math.floor(b.x / GOL_CELL_SIZE);
				const gY = Math.floor(b.y / GOL_CELL_SIZE);
				let foundGol = false;
				let golAttractX = 0,
					golAttractY = 0;

				// Check local 5x5 GoL neighborhood roughly
				for (let di = -2; di <= 2; di++) {
					for (let dj = -2; dj <= 2; dj++) {
						const checkX = gX + di;
						const checkY = gY + dj;
						if (
							checkX >= 0 &&
							checkX < golCols &&
							checkY >= 0 &&
							checkY < golRows
						) {
							if (golGrid[checkX][checkY] === 1) {
								golAttractX += checkX * GOL_CELL_SIZE + GOL_CELL_SIZE / 2;
								golAttractY += checkY * GOL_CELL_SIZE + GOL_CELL_SIZE / 2;
								foundGol = true;
							}
						}
					}
				}

				if (foundGol) {
					// Move toward GoL center
					const dx = golAttractX - b.x;
					const dy = golAttractY - b.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist > 0) {
						b.vx += (dx / dist) * 0.15;
						b.vy += (dy / dist) * 0.15;
					}
				}

				// Mouse shear force (also a secondary interaction)
				const mDx = b.x - mouseX;
				const mDy = b.y - mouseY;
				const mDistSq = mDx * mDx + mDy * mDy;
				if (mDistSq < 200 * 200) {
					const mDist = Math.sqrt(mDistSq);
					const force = (200 - mDist) / 200;
					const angle = Math.atan2(mDy, mDx);
					// scatter away from direct mouse pointer
					b.vx += Math.cos(angle) * force * 0.5;
					b.vy += Math.sin(angle) * force * 0.5;
				}

				// Limit speed
				const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
				const maxS = 4.0 * b.speedMult;
				if (speed > maxS) {
					b.vx = (b.vx / speed) * maxS;
					b.vy = (b.vy / speed) * maxS;
				} else if (speed < 1.0) {
					// Keep them moving
					b.vx = (b.vx / speed) * 1.0;
					b.vy = (b.vy / speed) * 1.0;
				}

				b.x += b.vx;
				b.y += b.vy;

				// Wrap around
				if (b.x < -50) b.x = width + 50;
				if (b.x > width + 50) b.x = -50;
				if (b.y < -50) b.y = height + 50;
				if (b.y > height + 50) b.y = -50;

				// Animation
				b.wingAngle += b.wingSpeed * (speed / 2);
			}
		}

		// --- Core Master Loop ---
		function updateState(timestamp: number) {
			frameCount++;
			globalTime += 0.002;

			// WFC Update
			if (!isComplete) {
				if (frameCount % COLLAPSE_SPEED === 0) collapseWfc();
			} else {
				completeHoldTimer++;
				if (completeHoldTimer > 600) {
					// Soft wash-out and restart WFC logic
					let faded = 0;
					for (let i = 0; i < wfcCells.length && faded < 3; i++) {
						const rIdx = (completeHoldTimer * 7 + i * 13) % wfcCells.length;
						if (wfcCells[rIdx].tileId !== -1) {
							wfcCells[rIdx].fadeIn -= 0.01;
							if (wfcCells[rIdx].fadeIn <= 0) {
								wfcCells[rIdx].tileId = -1;
								wfcCells[rIdx].collapsed = false;
								wfcCells[rIdx].options = Array.from(
									{ length: wfcTiles.length },
									(_, k) => k,
								);
								wfcCells[rIdx].fadeIn = 0;
								uncollapsedIndices.add(rIdx);
								faded++;
							}
						}
					}
					if (uncollapsedIndices.size >= wfcCols * wfcRows * 0.4) {
						isComplete = false;
						completeHoldTimer = 0;
						propagationStack = [];
					}
				}
			}

			// GoL Update
			if (timestamp - lastGolTick > GOL_TICK_RATE) {
				tickGol();
				lastGolTick = timestamp;
			}

			// Boids Update
			updateBoids();
		}

		function renderBackground() {
			ctx.clearRect(0, 0, width, height);

			// Render subtle biome tiles if in light mode or for texture
			for (let i = 0; i < wfcCells.length; i++) {
				const cell = wfcCells[i];
				if (cell.tileId !== -1) {
					if (cell.fadeIn < 1) cell.fadeIn += FADE_SPEED;
					const tile = wfcTiles[cell.tileId];
					const x = (i % wfcCols) * WFC_CELL_SIZE;
					const y = Math.floor(i / wfcCols) * WFC_CELL_SIZE;

					// Very subtle fill
					const opacity = isLight ? 0.4 : 0.1;
					ctx.fillStyle = `hsla(${tile.hue}, ${tile.saturation}%, ${tile.lightness}%, ${cell.fadeIn * opacity})`;
					ctx.fillRect(x, y, WFC_CELL_SIZE, WFC_CELL_SIZE);
				}
			}

			// Render 2D Birds
			ctx.lineJoin = "round";
			ctx.lineCap = "round";

			for (const b of boids) {
				const dirAngle = Math.atan2(b.vy, b.vx);
				const wingOscillation = Math.sin(b.wingAngle) * 0.5; // wing flapping amount

				// Determine color based on biome or theme
				const baseHue = isLight ? 210 : 200;
				// Make birds contrast depending on lightness
				if (isLight) {
					ctx.strokeStyle = `rgba(0, 0, 0, ${b.alpha})`; // Pure black in light mode
				} else {
					ctx.strokeStyle = `hsla(${baseHue + b.hueOffset}, 80%, 80%, ${b.alpha})`;
				}

				ctx.lineWidth = b.size * 0.6;

				ctx.save();
				ctx.translate(b.x, b.y);
				ctx.rotate(dirAngle);

				// Draw Bird 'V' shape
				// center is nose
				ctx.beginPath();
				// left wing
				ctx.moveTo(-b.size * 2, -b.size - wingOscillation * b.size * 2);
				ctx.lineTo(b.size, 0); // nose
				// right wing
				ctx.lineTo(-b.size * 2, b.size + wingOscillation * b.size * 2);
				ctx.stroke();
				ctx.restore();
			}
		}

		function animate(timestamp: number) {
			if (!document.hidden) {
				updateState(timestamp);
				renderBackground();
			}
			animationId = requestAnimationFrame(animate);
		}

		// --- Setup & Handlers ---
		function setup() {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;

			// Setup Grid Sizes
			wfcCols = Math.ceil(width / WFC_CELL_SIZE) + 1;
			wfcRows = Math.ceil(height / WFC_CELL_SIZE) + 1;

			golCols = Math.ceil(width / GOL_CELL_SIZE);
			golRows = Math.ceil(height / GOL_CELL_SIZE);

			generateWfcTiles();
			resetWfc();
			resetGol();

			// Create initial birds
			boids = [];
			for (let i = 0; i < 30; i++) {
				spawnBoid(Math.random() * width, Math.random() * height);
			}

			cancelAnimationFrame(animationId);
			animationId = requestAnimationFrame(animate);
		}

		const handleResize = () => setup();
		const handleMouseMove = (e: MouseEvent) => handleMouseDraw(e);

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);

		setup();

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [theme, resolvedTheme]);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				zIndex: 0,
				display: "block",
			}}
		/>
	);
}
