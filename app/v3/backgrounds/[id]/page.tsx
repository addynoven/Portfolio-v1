"use client";

import { useParams, notFound } from "next/navigation";
import { lazy, Suspense, useEffect, useState } from "react";
import { useLanguage } from "@/context/v3/language-context";
import { ArrowLeft, Minimize2 } from "lucide-react";
import Link from "next/link";

/* ── Lazy-load backgrounds ───────────────────────────────────────── */
const BoidsSwarmBg = lazy(() => import("@/app/v3/backgrounds/BoidsSwarmBg"));
const FlowFieldBg = lazy(() => import("@/app/v3/backgrounds/FlowFieldBg"));
const GameOfLifeBg = lazy(() => import("@/app/v3/backgrounds/GameOfLifeBg"));
const GravityWellBg = lazy(
	() => import("@/app/v3/backgrounds/GravityWellBg"),
);
const PhaseDriftTopologyBg = lazy(
	() => import("@/app/v3/backgrounds/PhaseDriftTopologyBg"),
);
const TemporalMemoryFieldBg = lazy(
	() => import("@/app/v3/backgrounds/TemporalMemoryFieldBg"),
);
const ThunderRootBg = lazy(
	() => import("@/app/v3/backgrounds/ThunderRootBg"),
);
const VoronoiBg = lazy(() => import("@/app/v3/backgrounds/VoronoiBg"));
const WaveFunctionCollapseBg = lazy(
	() => import("@/app/v3/backgrounds/WaveFunctionCollapseBg"),
);
const WaveFunctionCollapseBgV2 = lazy(
	() => import("@/app/v3/backgrounds/WaveFunctionCollapseBgV2"),
);
const WaveFunctionCollapseBgV3 = lazy(
	() => import("@/app/v3/backgrounds/WaveFunctionCollapseBgV3"),
);
const WaveFunctionCollapseBgV4 = lazy(
	() => import("@/app/v3/backgrounds/WaveFunctionCollapseBgV4"),
);
const WaveFunctionCollapseBgV5 = lazy(
	() => import("@/app/v3/backgrounds/WaveFunctionCollapseBgV5"),
);
const WaveFunctionCollapseBgV6 = lazy(
	() => import("@/app/v3/backgrounds/WaveFunctionCollapseBgV6"),
);

/* ── Background registry ─────────────────────────────────────────── */
interface BgEntry {
	name: string;
	description: { en: string; jp: string };
	tags: string[];
	render: () => React.ReactNode;
}

const BG_MAP: Record<string, BgEntry> = {
	"boids-swarm": {
		name: "Boids Swarm",
		description: {
			en: "Flocking simulation inspired by Craig Reynolds' Boids algorithm. Each particle follows three simple rules — alignment, cohesion, and separation — producing emergent swarm behavior.",
			jp: "Craig ReynoldsのBoidsアルゴリズムに着想を得た群れシミュレーション。各パーティクルは整列・結合・分離の3つのルールに従い、創発的な群れの動きを生み出します。",
		},
		tags: ["Canvas", "Simulation", "Interactive", "Emergent"],
		render: () => <BoidsSwarmBg className="w-full h-full" />,
	},
	"flow-field": {
		name: "Flow Field",
		description: {
			en: "Particles trace paths through a mathematically generated vector field built from layered sine/cosine functions.",
			jp: "レイヤー化されたsin/cos関数で生成されたベクターフィールドをパーティクルがトレースします。",
		},
		tags: ["Canvas", "Generative", "Particles", "Math"],
		render: () => <FlowFieldBg className="w-full h-full" theme="aurora" />,
	},
	"game-of-life": {
		name: "Game of Life",
		description: {
			en: "Conway's Game of Life with smooth brightness interpolation between cell states.",
			jp: "セル状態間の滑らかな輝度補間を備えたコンウェイのライフゲーム。",
		},
		tags: ["Canvas", "Cellular Automata", "Simulation"],
		render: () => <GameOfLifeBg className="w-full h-full" />,
	},
	"gravity-well": {
		name: "Gravity Well",
		description: {
			en: "Particles orbit around wandering gravity wells that drift across the canvas. Mouse cursor acts as an additional attractor/repeller.",
			jp: "キャンバス上を漂う重力井戸の周りをパーティクルが周回します。マウスカーソルが追加のアトラクター/リペラーとして機能します。",
		},
		tags: ["Canvas", "Physics", "Interactive", "Particles"],
		render: () => <GravityWellBg className="w-full h-full" />,
	},
	"phase-drift": {
		name: "Phase Drift Topology",
		description: {
			en: "2,500 particles driven by a 2D Perlin noise field with phase drifting, creating evolving topological flow patterns.",
			jp: "位相ドリフトのある2Dパーリンノイズフィールドによって駆動される2,500のパーティクル。進化するトポロジカルなフローパターンを生成します。",
		},
		tags: ["Canvas", "Perlin Noise", "Generative", "Interactive"],
		render: () => <PhaseDriftTopologyBg className="w-full h-full" />,
	},
	"temporal-memory": {
		name: "Temporal Memory Field",
		description: {
			en: "A grid-based memory vector field where 400 agents move and write directional traces, creating emergent path-like patterns.",
			jp: "400のエージェントが移動し方向性トレースを書き込むグリッドベースのメモリベクターフィールド。創発的なパスパターンを生成します。",
		},
		tags: ["Canvas", "Emergent", "Interactive", "Vector Field"],
		render: () => <TemporalMemoryFieldBg className="w-full h-full" />,
	},
	"thunder-root": {
		name: "Thunder Root",
		description: {
			en: "Generative branching tree growth animation inspired by plum blossom patterns.",
			jp: "梅の花のパターンに着想を得た生成的な枝分かれツリー成長アニメーション。",
		},
		tags: ["Canvas", "Generative", "Organic", "Recursive"],
		render: () => <ThunderRootBg className="w-full h-full" init={5} />,
	},
	voronoi: {
		name: "Voronoi Diagram",
		description: {
			en: "Dual-layer Voronoi tessellation built from scratch with Sutherland-Hodgman polygon clipping.",
			jp: "Sutherland-Hodgmanポリゴンクリッピングでゼロから構築したデュアルレイヤーボロノイテッセレーション。",
		},
		tags: ["Canvas", "Math", "Interactive", "Computational Geometry"],
		render: () => <VoronoiBg className="w-full h-full" />,
	},
	"wfc-v1": {
		name: "Wave Function Collapse V1",
		description: {
			en: "Procedural pattern generation using the Wave Function Collapse algorithm.",
			jp: "波動関数崩壊アルゴリズムによる手続き型パターン生成。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		render: () => <WaveFunctionCollapseBg className="w-full h-full" />,
	},
	"wfc-v2": {
		name: "Wave Function Collapse V2",
		description: {
			en: "Second iteration with refined tile sets and improved visual output.",
			jp: "洗練されたタイルセットと改善されたビジュアル出力の第2イテレーション。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		render: () => <WaveFunctionCollapseBgV2 className="w-full h-full" />,
	},
	"wfc-v3": {
		name: "Wave Function Collapse V3",
		description: {
			en: "Third iteration exploring alternative tile geometries with the WFC algorithm.",
			jp: "WFCアルゴリズムで代替タイルジオメトリを探求する第3イテレーション。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		render: () => <WaveFunctionCollapseBgV3 className="w-full h-full" />,
	},
	"wfc-v4": {
		name: "Wave Function Collapse V4",
		description: {
			en: "Fourth iteration with advanced constraint rules and richer tile diversity.",
			jp: "高度な制約ルールと豊かなタイル多様性を備えた第4イテレーション。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		render: () => <WaveFunctionCollapseBgV4 className="w-full h-full" />,
	},
	"wfc-v5": {
		name: "Wave Function Collapse V5",
		description: {
			en: "Fifth iteration focusing on color palette variations and visual refinement.",
			jp: "カラーパレットのバリエーションとビジュアルリファインメントに焦点を当てた第5イテレーション。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		render: () => <WaveFunctionCollapseBgV5 className="w-full h-full" />,
	},
	"wfc-v6": {
		name: "Wave Function Collapse V6",
		description: {
			en: "Latest iteration — optimized performance, refined aesthetics, and polished constraint propagation.",
			jp: "最新イテレーション — 最適化されたパフォーマンス、洗練されたエステティクス、磨かれた制約伝播。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		render: () => <WaveFunctionCollapseBgV6 className="w-full h-full" />,
	},
};

/* ── Loading skeleton ────────────────────────────────────────────── */
function FullScreenSkeleton() {
	return (
		<div className="flex-1 flex items-center justify-center bg-foreground/5 animate-pulse">
			<div className="w-10 h-10 rounded-full border-2 border-foreground/20 border-t-accent animate-spin" />
		</div>
	);
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function BackgroundViewPage() {
	const params = useParams<{ id: string }>();
	const { t } = useLanguage();
	const [showInfo, setShowInfo] = useState(true);

	const entry = BG_MAP[params.id];

	// Auto-hide the top bar after 4 seconds
	useEffect(() => {
		const timer = setTimeout(() => setShowInfo(false), 4000);
		return () => clearTimeout(timer);
	}, []);

	if (!entry) {
		notFound();
	}

	return (
		<div className="fixed inset-0 z-[60] bg-background flex flex-col isolate">
			{/* ── Top bar ── */}
			<div
				className={`relative z-[10] flex items-center justify-between px-4 sm:px-6 py-3 border-b border-foreground/10 bg-background/95 backdrop-blur-md shadow-sm transition-all duration-500 ${
					showInfo
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-full pointer-events-none"
				}`}
				onMouseEnter={() => setShowInfo(true)}
			>
				<div className="flex items-center gap-4 min-w-0">
					<Link
						href="/v3/backgrounds"
						className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity shrink-0"
					>
						<ArrowLeft className="w-3.5 h-3.5" />
						{t({ en: "Back", jp: "戻る" })}
					</Link>
					<div className="min-w-0">
						<h1 className="text-sm sm:text-base font-bold font-mono truncate">
							{entry.name}
						</h1>
						<p className="text-[10px] font-mono opacity-50 truncate hidden sm:block">
							{t(entry.description)}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{entry.tags.map((tag) => (
						<span
							key={tag}
							className="hidden md:inline text-[9px] font-mono tracking-wider uppercase opacity-30 px-2 py-0.5 rounded-md border border-foreground/10"
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			{/* ── Hover zone to re-show the bar ── */}
			{!showInfo && (
				<div
					className="absolute top-0 left-0 right-0 h-12 z-[11] cursor-pointer"
					onMouseEnter={() => setShowInfo(true)}
				/>
			)}

			{/* ── Background render area ── */}
			<div
				className="flex-1 relative overflow-hidden isolate"
				style={{ zIndex: 0 }}
				onClick={() => setShowInfo((p) => !p)}
			>
				<Suspense fallback={<FullScreenSkeleton />}>
					{entry.render()}
				</Suspense>
			</div>
		</div>
	);
}
