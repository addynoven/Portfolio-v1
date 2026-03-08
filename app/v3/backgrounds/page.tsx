"use client";

import { useState, lazy, Suspense, useCallback } from "react";
import { useLanguage } from "@/context/v3/language-context";
import { Play, Square, ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ── Lazy-load backgrounds ───────────────────────────────────────── */
const BoidsSwarmBg = lazy(() => import("@/app/v3/backgrounds/BoidsSwarmBg"));
const FlowFieldBg = lazy(() => import("@/app/v3/backgrounds/FlowFieldBg"));
const GameOfLifeBg = lazy(() => import("@/app/v3/backgrounds/GameOfLifeBg"));
const GravityWellBg = lazy(() => import("@/app/v3/backgrounds/GravityWellBg"));
const PhaseDriftTopologyBg = lazy(
	() => import("@/app/v3/backgrounds/PhaseDriftTopologyBg"),
);
const TemporalMemoryFieldBg = lazy(
	() => import("@/app/v3/backgrounds/TemporalMemoryFieldBg"),
);
const ThunderRootBg = lazy(() => import("@/app/v3/backgrounds/ThunderRootBg"));
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

/* ── Component registry ──────────────────────────────────────────── */
interface BgItem {
	id: string;
	name: string;
	description: { en: string; jp: string };
	tags: string[];
	preview: string;
	render: () => React.ReactNode;
}

const BG_ITEMS: BgItem[] = [
	{
		id: "boids-swarm",
		name: "Boids Swarm",
		description: {
			en: "Flocking simulation inspired by Craig Reynolds' Boids algorithm. Each particle follows three simple rules — alignment, cohesion, and separation — producing emergent swarm behavior. Mouse interaction affects nearby particles.",
			jp: "Craig ReynoldsのBoidsアルゴリズムに着想を得た群れシミュレーション。各パーティクルは整列・結合・分離の3つのルールに従い、創発的な群れの動きを生み出します。マウスで近くのパーティクルに影響を与えられます。",
		},
		tags: ["Canvas", "Simulation", "Interactive", "Emergent"],
		preview: "/v3/images/previews/boids-swarm.png",
		render: () => <BoidsSwarmBg className="w-full h-full" />,
	},
	{
		id: "flow-field",
		name: "Flow Field",
		description: {
			en: "Particles trace paths through a mathematically generated vector field built from layered sine/cosine functions. The field evolves over time, creating organic flowing patterns. Supports multiple color themes.",
			jp: "レイヤー化されたsin/cos関数で生成されたベクターフィールドをパーティクルがトレースします。フィールドは時間とともに進化し、有機的な流れるパターンを作り出します。複数のカラーテーマに対応。",
		},
		tags: ["Canvas", "Generative", "Particles", "Math"],
		preview: "/v3/images/previews/flow-field.png",
		render: () => <FlowFieldBg className="w-full h-full" theme="aurora" />,
	},
	{
		id: "game-of-life",
		name: "Game of Life",
		description: {
			en: "Conway's Game of Life with smooth brightness interpolation between cell states. Runs the simulation at 10 fps for computation but renders at 60 fps for buttery smooth fade-in/fade-out transitions. Auto-reseeds when the pattern stabilizes.",
			jp: "セル状態間の滑らかな輝度補間を備えたコンウェイのライフゲーム。計算は10fpsで実行しつつ、60fpsでレンダリングすることで滑らかなフェードイン/アウト遷移を実現。パターンが安定すると自動的にリシードされます。",
		},
		tags: ["Canvas", "Cellular Automata", "Simulation"],
		preview: "/v3/images/previews/game-of-life.png",
		render: () => <GameOfLifeBg className="w-full h-full" />,
	},
	{
		id: "gravity-well",
		name: "Gravity Well",
		description: {
			en: "Particles orbit around wandering gravity wells that drift across the canvas. Particle hue shifts from cool to hot based on velocity. Mouse cursor acts as an additional attractor/repeller for interactive control.",
			jp: "キャンバス上を漂う重力井戸の周りをパーティクルが周回します。速度に応じてパーティクルの色相がクールからホットに変化。マウスカーソルが追加のアトラクター/リペラーとして機能し、インタラクティブに操作できます。",
		},
		tags: ["Canvas", "Physics", "Interactive", "Particles"],
		preview: "/v3/images/previews/gravity-well.png",
		render: () => <GravityWellBg className="w-full h-full" />,
	},
	{
		id: "phase-drift",
		name: "Phase Drift Topology",
		description: {
			en: "2,500 particles driven by a 2D Perlin noise field with phase drifting, creating evolving topological flow patterns. Mouse proximity influences nearby particles, distorting the noise field locally.",
			jp: "位相ドリフトのある2Dパーリンノイズフィールドによって駆動される2,500のパーティクル。進化するトポロジカルなフローパターンを生成します。マウスの近接が近くのパーティクルに影響を与え、ノイズフィールドを局所的に歪めます。",
		},
		tags: ["Canvas", "Perlin Noise", "Generative", "Interactive"],
		preview: "/v3/images/previews/phase-drift.png",
		render: () => <PhaseDriftTopologyBg className="w-full h-full" />,
	},
	{
		id: "temporal-memory",
		name: "Temporal Memory Field",
		description: {
			en: "A grid-based memory vector field where 400 agents move and write directional traces. Agents are influenced by the accumulated field data, creating emergent path-like patterns. Mouse injects directional energy into the field.",
			jp: "400のエージェントが移動し方向性トレースを書き込むグリッドベースのメモリベクターフィールド。蓄積されたフィールドデータによってエージェントが影響を受け、創発的なパスパターンを生成します。マウスでフィールドにエネルギーを注入できます。",
		},
		tags: ["Canvas", "Emergent", "Interactive", "Vector Field"],
		preview: "/v3/images/previews/temporal-memory.png",
		render: () => <TemporalMemoryFieldBg className="w-full h-full" />,
	},
	{
		id: "thunder-root",
		name: "Thunder Root",
		description: {
			en: "Generative branching tree growth animation inspired by plum blossom patterns. Branches fork recursively from seed points with randomized angles, drawn organically over time with varying opacity and thickness.",
			jp: "梅の花のパターンに着想を得た生成的な枝分かれツリー成長アニメーション。シードポイントからランダムな角度で再帰的に枝分かれし、不透明度と太さを変えながら有機的に描画されます。",
		},
		tags: ["Canvas", "Generative", "Organic", "Recursive"],
		preview: "/v3/images/previews/thunder-root.png",
		render: () => <ThunderRootBg className="w-full h-full" init={5} />,
	},
	{
		id: "voronoi",
		name: "Voronoi Diagram",
		description: {
			en: "Dual-layer Voronoi tessellation built from scratch with Sutherland-Hodgman polygon clipping. Macro cells have colored fills while micro-particles drift and connect with proximity lines. Mouse repels nearby Voronoi seeds.",
			jp: "Sutherland-Hodgmanポリゴンクリッピングでゼロから構築したデュアルレイヤーボロノイテッセレーション。マクロセルは色付き塗りつぶし、マイクロパーティクルはドリフトして近接ラインで接続されます。マウスで近くのボロノイシードを反発させます。",
		},
		tags: ["Canvas", "Math", "Interactive", "Computational Geometry"],
		preview: "/v3/images/previews/voronoi.png",
		render: () => <VoronoiBg className="w-full h-full" />,
	},
	{
		id: "wfc-v1",
		name: "Wave Function Collapse V1",
		description: {
			en: "Procedural pattern generation using the Wave Function Collapse algorithm. Tiles with edge-matching rules collapse one at a time via constraint propagation, creating seamless procedural patterns that fade in.",
			jp: "波動関数崩壊アルゴリズムによる手続き型パターン生成。エッジマッチングルールを持つタイルが制約伝播により1つずつ崩壊し、フェードインするシームレスな手続き型パターンを生成します。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		preview: "/v3/images/previews/wfc-v1.png",
		render: () => <WaveFunctionCollapseBg className="w-full h-full" />,
	},
	{
		id: "wfc-v2",
		name: "Wave Function Collapse V2",
		description: {
			en: "Second iteration of the WFC algorithm with refined tile sets and improved visual output. Explores different tile configurations for varied procedural aesthetics.",
			jp: "WFCアルゴリズムの第2イテレーション。洗練されたタイルセットと改善されたビジュアル出力。異なるタイル構成による多様な手続き型エステティクスを探求します。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		preview: "/v3/images/previews/wfc-v2.png",
		render: () => <WaveFunctionCollapseBgV2 className="w-full h-full" />,
	},
	{
		id: "wfc-v3",
		name: "Wave Function Collapse V3",
		description: {
			en: "Third iteration exploring hexagonal or alternative tile geometries with the WFC algorithm, pushing the boundaries of procedural generation.",
			jp: "WFCアルゴリズムで六角形や代替タイルジオメトリを探求する第3イテレーション。手続き型生成の限界に挑戦します。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		preview: "/v3/images/previews/wfc-v3.png",
		render: () => <WaveFunctionCollapseBgV3 className="w-full h-full" />,
	},
	{
		id: "wfc-v4",
		name: "Wave Function Collapse V4",
		description: {
			en: "Fourth iteration with advanced constraint rules and richer tile diversity for more complex procedural patterns.",
			jp: "高度な制約ルールと豊かなタイル多様性を備えた第4イテレーション。より複雑な手続き型パターンを生成します。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		preview: "/v3/images/previews/wfc-v4.png",
		render: () => <WaveFunctionCollapseBgV4 className="w-full h-full" />,
	},
	{
		id: "wfc-v5",
		name: "Wave Function Collapse V5",
		description: {
			en: "Fifth iteration focusing on color palette variations and visual refinement of the wave function collapse output.",
			jp: "カラーパレットのバリエーションと波動関数崩壊出力のビジュアルリファインメントに焦点を当てた第5イテレーション。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		preview: "/v3/images/previews/wfc-v5.png",
		render: () => <WaveFunctionCollapseBgV5 className="w-full h-full" />,
	},
	{
		id: "wfc-v6",
		name: "Wave Function Collapse V6",
		description: {
			en: "Latest iteration combining lessons from all previous versions — optimized performance, refined aesthetics, and polished constraint propagation.",
			jp: "過去のすべてのバージョンの教訓を統合した最新イテレーション — 最適化されたパフォーマンス、洗練されたエステティクス、磨かれた制約伝播。",
		},
		tags: ["Canvas", "Algorithm", "Procedural", "WFC"],
		preview: "/v3/images/previews/wfc-v6.png",
		render: () => <WaveFunctionCollapseBgV6 className="w-full h-full" />,
	},
];

/* ── Preview skeleton ────────────────────────────────────────────── */
function LivePreviewSkeleton() {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-foreground/5 animate-pulse">
			<div className="w-8 h-8 rounded-full border-2 border-foreground/20 border-t-accent animate-spin" />
		</div>
	);
}

/* ── Single background card ──────────────────────────────────────── */
function BgCard({ item }: { item: BgItem }) {
	const { t } = useLanguage();
	const [isLive, setIsLive] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleLive = useCallback(() => setIsLive((p) => !p), []);
	const toggleExpand = useCallback(() => setIsExpanded((p) => !p), []);

	return (
		<>
			{/* ── Fullscreen overlay ── */}
			{isExpanded && (
				<div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
					<div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10">
						<div>
							<h3 className="text-lg font-bold font-mono">{item.name}</h3>
							<p className="text-xs font-mono opacity-50">
								{t({
									en: "Full-screen preview — move your mouse to interact",
									jp: "フルスクリーンプレビュー — マウスを動かしてインタラクト",
								})}
							</p>
						</div>
						<button
							onClick={toggleExpand}
							className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors text-sm font-mono cursor-pointer"
						>
							<Minimize2 className="w-4 h-4" />
							{t({ en: "Close", jp: "閉じる" })}
						</button>
					</div>
					<div className="flex-1 relative">
						<Suspense fallback={<LivePreviewSkeleton />}>
							{item.render()}
						</Suspense>
					</div>
				</div>
			)}

			{/* ── Card ── */}
			<div
				className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
				style={{
					background: "var(--v3-card)",
					border: "1px solid var(--v3-card-border)",
					borderRadius: "var(--card-radius)",
				}}
			>
				{/* ── Preview area ── */}
				<div className="relative w-full aspect-video overflow-hidden rounded-t-[inherit] bg-background">
					{isLive ? (
						<Suspense fallback={<LivePreviewSkeleton />}>
							<div className="absolute inset-0">{item.render()}</div>
						</Suspense>
					) : (
						<Image
							src={item.preview}
							alt={`${item.name} preview`}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						/>
					)}

					{/* ── Gradient overlay on image ── */}
					{!isLive && (
						<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					)}

					{/* ── Action buttons ── */}
					<div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
						<button
							onClick={toggleLive}
							className={`w-9 h-9 flex items-center justify-center rounded-xl backdrop-blur-md border transition-all duration-200 hover:scale-110 cursor-pointer ${
								isLive
									? "bg-accent/20 border-accent/30 text-accent"
									: "bg-background/70 border-foreground/10"
							}`}
							aria-label={isLive ? "Stop live preview" : "Start live preview"}
							title={
								isLive
									? t({ en: "Stop preview", jp: "プレビュー停止" })
									: t({ en: "Live preview", jp: "ライブプレビュー" })
							}
						>
							{isLive ? (
								<Square className="w-3.5 h-3.5" />
							) : (
								<Play className="w-3.5 h-3.5" />
							)}
						</button>
						<button
							onClick={() => {
								if (!isLive) setIsLive(true);
								setIsExpanded(true);
							}}
							className="w-9 h-9 flex items-center justify-center rounded-xl bg-background/70 backdrop-blur-md border border-foreground/10 transition-all duration-200 hover:scale-110 cursor-pointer"
							aria-label="Fullscreen"
							title={t({ en: "Fullscreen", jp: "全画面" })}
						>
							<Maximize2 className="w-3.5 h-3.5" />
						</button>
					</div>

					{/* ── Live indicator ── */}
					{isLive && (
						<div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/20 backdrop-blur-md border border-accent/30">
							<span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
							<span className="text-[10px] font-mono uppercase tracking-widest text-accent">
								Live
							</span>
						</div>
					)}
				</div>

				{/* ── Info ── */}
				<div className="p-5 flex flex-col gap-3 flex-1">
					<h3 className="text-base font-bold font-mono group-hover:text-accent transition-colors duration-200">
						{item.name}
					</h3>
					<p className="text-xs font-mono opacity-60 leading-relaxed">
						{t(item.description)}
					</p>
					<div className="flex flex-wrap gap-1.5 mt-auto pt-2">
						{item.tags.map((tag) => (
							<span
								key={tag}
								className="text-[10px] font-mono tracking-wider uppercase opacity-40 px-2 py-0.5 rounded-md border border-foreground/10"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

/* ── Page component ──────────────────────────────────────────────── */
export default function BackgroundsShowcase() {
	const { t } = useLanguage();

	return (
		<main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 mt-8 mb-24">
			{/* ── Back nav ── */}
			<Link
				href="/v3"
				className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity mb-8"
			>
				<ArrowLeft className="w-3.5 h-3.5" />
				{t({ en: "Back to Home", jp: "ホームに戻る" })}
			</Link>

			{/* ── Header ── */}
			<div className="mb-10">
				<h1 className="text-3xl sm:text-4xl font-bold">
					{t({
						en: "Background Components",
						jp: "バックグラウンドコンポーネント",
					})}
				</h1>
				<p
					className="text-base font-mono mt-2 leading-relaxed max-w-2xl"
					style={{ color: "var(--muted)" }}
				>
					{t({
						en: `A collection of ${BG_ITEMS.length} custom-built canvas backgrounds — from physics simulations to procedural generation algorithms. Each is interactive and adapts to light/dark themes.`,
						jp: `物理シミュレーションから手続き型生成アルゴリズムまで、${BG_ITEMS.length}個のカスタムCanvasバックグラウンドのコレクション。すべてインタラクティブで、ライト/ダークテーマに対応しています。`,
					})}
				</p>
				<div className="flex items-center gap-3 mt-4">
					<span className="text-[10px] font-mono tracking-widest uppercase opacity-40 px-2.5 py-1 rounded-lg border border-foreground/10">
						{BG_ITEMS.length} {t({ en: "components", jp: "コンポーネント" })}
					</span>
					<span className="text-[10px] font-mono tracking-widest uppercase opacity-40 px-2.5 py-1 rounded-lg border border-foreground/10">
						canvas
					</span>
					<span className="text-[10px] font-mono tracking-widest uppercase opacity-40 px-2.5 py-1 rounded-lg border border-foreground/10">
						{t({ en: "interactive", jp: "インタラクティブ" })}
					</span>
				</div>
			</div>

			{/* ── Grid ── */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{BG_ITEMS.map((item) => (
					<BgCard key={item.id} item={item} />
				))}
			</div>
		</main>
	);
}
