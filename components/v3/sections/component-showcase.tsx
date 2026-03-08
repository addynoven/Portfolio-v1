"use client";

import { useLanguage } from "@/context/v3/language-context";
import Image from "next/image";
import Link from "next/link";

/* ── Featured backgrounds to show on the homepage ────────────────── */
const FEATURED = [
	{
		id: "boids-swarm",
		name: "Boids Swarm",
		preview: "/v3/images/previews/boids-swarm.png",
		tags: ["Simulation", "Interactive"],
	},
	{
		id: "flow-field",
		name: "Flow Field",
		preview: "/v3/images/previews/flow-field.png",
		tags: ["Generative", "Particles"],
	},
	{
		id: "voronoi",
		name: "Voronoi Diagram",
		preview: "/v3/images/previews/voronoi.png",
		tags: ["Math", "Interactive"],
	},
	{
		id: "gravity-well",
		name: "Gravity Well",
		preview: "/v3/images/previews/gravity-well.png",
		tags: ["Physics", "Interactive"],
	},
	{
		id: "wfc-v1",
		name: "Wave Function Collapse",
		preview: "/v3/images/previews/wfc-v1.png",
		tags: ["Algorithm", "Procedural"],
	},
	{
		id: "thunder-root",
		name: "Thunder Root",
		preview: "/v3/images/previews/thunder-root.png",
		tags: ["Generative", "Organic"],
	},
];

/* ── Main showcase section (homepage preview) ────────────────────── */
export default function ComponentShowcase() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
			{FEATURED.map((item) => (
				<Link
					key={item.id}
					href="/v3/backgrounds"
					className="group relative overflow-hidden rounded-xl aspect-video"
					style={{
						background: "var(--v3-card)",
						border: "1px solid var(--v3-card-border)",
					}}
				>
					<Image
						src={item.preview}
						alt={`${item.name} preview`}
						fill
						className="object-cover transition-all duration-500 group-hover:scale-[1.04]"
						sizes="(max-width: 640px) 50vw, 33vw"
					/>
					<div
						className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
						style={{
							background:
								"linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
						}}
					>
						<p className="text-white text-xs font-bold font-mono truncate leading-tight">
							{item.name}
						</p>
						<div className="flex gap-1 mt-1">
							{item.tags.map((tag) => (
								<span
									key={tag}
									className="text-[9px] font-mono uppercase tracking-wider text-white/60"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}

export function ComponentShowcaseSkeleton() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="rounded-xl bg-foreground/8 aspect-video" />
			))}
		</div>
	);
}
