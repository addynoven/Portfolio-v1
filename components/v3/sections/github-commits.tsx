"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/v3/language-context";

/* ── Types ──────────────────────────────────────────────────── */
interface Day {
	count: number;
	date: string;
}
type Week = (Day | null)[];

/* ── Constants ──────────────────────────────────────────────── */
const GITHUB_USERNAME = "addynoven";
const CACHE_KEY = "gh_commits_v3";
const CACHE_TTL = 5 * 60 * 1000;

const DAY_LABELS = {
    en: ["", "Mon", "", "Wed", "", "Fri", ""],
    jp: ["", "月", "", "水", "", "金", ""]
};

const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    jp: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
};

const LEGEND_COUNTS = [0, 1, 3, 7, 12];

// Cell: 13px wide, 3px gap → 16px per column slot
const CELL_SIZE = 13;
const CELL_GAP = 3;
const CELL_SLOT = CELL_SIZE + CELL_GAP; // 16
const DAY_LABEL_W = 28; // day label column width incl margin

/* ── Helpers ────────────────────────────────────────────────── */
function groupIntoWeeks(days: Day[]): Week[] {
	if (!days.length) return [];
	const firstDOW = new Date(days[0].date).getUTCDay(); // 0=Sun
	const weeks: Week[] = [];
	let week: Week = Array(firstDOW).fill(null);
	for (const day of days) {
		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
		week.push(day);
	}
	while (week.length < 7) week.push(null);
	weeks.push(week);
	return weeks;
}

function getMonthLabels(weeks: Week[], monthNames: string[]): { label: string; col: number }[] {
	const out: { label: string; col: number }[] = [];
	let last = -1;
	weeks.forEach((week, col) => {
		const first = week.find(Boolean) as Day | undefined;
		if (!first) return;
		const m = new Date(first.date).getUTCMonth();
		if (m !== last) {
			out.push({ label: monthNames[m], col });
			last = m;
		}
	});
	return out;
}

function heatStyle(count: number | null): React.CSSProperties {
	switch (count) {
		case null:
			return { backgroundColor: "transparent" };
		case 0:
			return { backgroundColor: "hsl(var(--c0))" };
		case 1:
			return { backgroundColor: "var(--c1)" };
		case 2:
			return { backgroundColor: "var(--c2)" };
		case 3:
			return { backgroundColor: "var(--c3)" };
		case 4:
			return { backgroundColor: "var(--c4)" };
		default:
			return { backgroundColor: "var(--c4)" };
	}
}

/* ── Component ──────────────────────────────────────────────── */
export default function GithubCommits({
	initialData = null,
}: {
	initialData?: Day[] | null;
}) {
    const { language } = useLanguage();
    
	const [allWeeks, setAllWeeks] = useState<Week[]>(() => {
		return initialData && initialData.length > 0
			? groupIntoWeeks(initialData)
			: [];
	});

	const [total, setTotal] = useState(() => {
		return initialData && initialData.length > 0
			? initialData.reduce((s, d) => s + d.count, 0)
			: 0;
	});

	// If we have data from the server, we aren't loading
	const [loading, setLoading] = useState(
		!initialData || initialData.length === 0,
	);
	const [maxWeeks, setMaxWeeks] = useState(52);

	// Hydration-safe cache load
	useEffect(() => {
		if (allWeeks.length === 0) {
			try {
				const raw = localStorage.getItem(CACHE_KEY);
				if (raw) {
					const { data, ts } = JSON.parse(raw);
					if (Date.now() - ts < CACHE_TTL && data && data.length > 0) {
						setAllWeeks(groupIntoWeeks(data));
						setTotal(
							data.reduce((acc: number, day: Day) => acc + day.count, 0),
						);
						setLoading(false);
					}
				}
			} catch (e) {}
		}
	}, [allWeeks.length]);

	// Measure available space → how many week columns fit
	const graphRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!graphRef.current) return;
		const ro = new ResizeObserver(([entry]) => {
			const available = entry.contentRect.width - DAY_LABEL_W;
			setMaxWeeks(Math.max(4, Math.floor(available / CELL_SLOT)));
		});
		ro.observe(graphRef.current);
		return () => ro.disconnect();
	}, []);

	// Fetch / cache logic
	useEffect(() => {
		if (!loading || allWeeks.length > 0) return;

		const load = async () => {
			try {
				const res = await fetch("/api/github/commits");
				const data: Day[] = await res.json();

				if (data && data.length > 0) {
					localStorage.setItem(
						CACHE_KEY,
						JSON.stringify({ data, ts: Date.now() }),
					);
					setAllWeeks(groupIntoWeeks(data));
					setTotal(data.reduce((s, d) => s + d.count, 0));
				}
			} catch (e) {
				console.error("Failed to fetch commits:", e);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [loading, allWeeks.length]);

	// Slice most-recent weeks that fit
	const displayWeeks = allWeeks.slice(-maxWeeks);
	const monthLabels = getMonthLabels(displayWeeks, MONTHS[language]);

	const cellStyle = {
		width: CELL_SIZE,
		height: CELL_SIZE,
		borderRadius: 2,
		flexShrink: 0,
	} as const;
	const gapStyle = { gap: CELL_GAP } as const;

	return (
		<div className="w-full">
			{/* header */}
			<p
				className="text-xs font-mono tracking-widest uppercase select-none mb-3"
				style={{ color: "var(--v3-muted)" }}
			>
				GitHub Contributions · @{GITHUB_USERNAME}
			</p>

			{/* card */}
			<div
				className="rounded-2xl p-4 w-full overflow-x-clip bg-card"
				style={{
					border: "1px dashed var(--v3-card-border)",
					borderRadius: "var(--card-radius)",
				}}
			>
				{/* graph inner — observed for width */}
				<div ref={graphRef} className="w-full">
					{loading ? (
						/* skeleton */
						<div className="flex" style={gapStyle}>
							<div
								className="flex flex-col shrink-0"
								style={{
									...gapStyle,
									width: DAY_LABEL_W - CELL_GAP,
									marginRight: CELL_GAP,
								}}
							>
								{DAY_LABELS[language].map((_, i) => (
									<div
										key={i}
										style={{ ...cellStyle, backgroundColor: "transparent" }}
									/>
								))}
							</div>
							{Array.from({ length: Math.max(maxWeeks, 20) }).map((_, wi) => (
								<div key={wi} className="flex flex-col" style={gapStyle}>
									{Array.from({ length: 7 }).map((_, di) => (
										<div
											key={di}
											style={{
												...cellStyle,
												backgroundColor: "hsl(var(--c0))",
												opacity: 0.5,
											}}
											className="animate-pulse"
										/>
									))}
								</div>
							))}
						</div>
					) : (
						<>
							{/* month labels */}
							<div className="flex mb-1" style={{ marginLeft: DAY_LABEL_W }}>
								{monthLabels.map(({ label, col }, i) => {
									const nextCol =
										monthLabels[i + 1]?.col ?? displayWeeks.length;
									return (
										<div
											key={label + col}
											className="text-[10px] font-mono select-none shrink-0 truncate"
											style={{
												width: (nextCol - col) * CELL_SLOT,
												color: "var(--v3-muted)",
											}}
										>
											{label}
										</div>
									);
								})}
							</div>

							{/* day labels + week columns */}
							<div className="flex" style={gapStyle}>
								{/* day labels */}
								<div
									className="flex flex-col shrink-0"
									style={{
										...gapStyle,
										width: DAY_LABEL_W - CELL_GAP,
										marginRight: CELL_GAP,
									}}
								>
									{DAY_LABELS[language].map((label, i) => (
										<div
											key={i}
											className="text-[10px] font-mono select-none flex items-center justify-end"
											style={{ height: CELL_SIZE, color: "var(--v3-muted)" }}
										>
											{label}
										</div>
									))}
								</div>

								{/* weeks */}
								{displayWeeks.map((week, wi) => {
									// Shift tooltip anchor based on column proximity to edges
									const isRightEdge = wi >= displayWeeks.length - 4;
									const isLeftEdge = wi < 4;
									const tooltipPos = isRightEdge
										? "right-0" // pin to right of cell → grows leftward
										: isLeftEdge
											? "left-0" // pin to left of cell → grows rightward
											: "left-1/2 -translate-x-1/2"; // centered (default)

									return (
										<div key={wi} className="flex flex-col" style={gapStyle}>
											{week.map((day, di) => (
												<div
													key={di}
													className="relative group cursor-default"
													style={{
														...cellStyle,
														...heatStyle(day === null ? null : day.count),
													}}
												>
													{day && (
														<div
															className={`absolute z-50 bottom-[calc(100%+6px)] ${tooltipPos} px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity`}
															style={{
																background: "var(--v3-fg)",
																color: "var(--v3-bg)",
															}}
														>
															{day.count} {language === "jp" ? "コントリビューション：" : "on"} {new Date(day.date).toLocaleDateString(language === "jp" ? "ja-JP" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}
														</div>
													)}
												</div>
											))}
										</div>
									);
								})}
							</div>

							{/* footer */}
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3">
								<span
									className="text-xs font-mono select-none"
									style={{ color: "var(--v3-muted)" }}
								>
									{total.toLocaleString()} {language === "jp" ? "過去1年間のコントリビューション" : "contributions in the last year"}
								</span>
								<div
									className="flex items-center gap-1.5 text-xs font-mono select-none"
									style={{ color: "var(--v3-muted)" }}
								>
									<span>{language === "jp" ? "少" : "Less"}</span>
									{LEGEND_COUNTS.map((c) => (
										<div
											key={c}
											style={{
												...heatStyle(c),
												width: 11,
												height: 11,
												borderRadius: 2,
											}}
										/>
									))}
									<span>{language === "jp" ? "多" : "More"}</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
