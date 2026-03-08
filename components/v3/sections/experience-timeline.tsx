"use client";

import { experience } from "@/app/v3/constants";
import { useLanguage } from "@/context/v3/language-context";

function Tag({ label }: { label: string }) {
	return (
		<span
			className="text-xs font-mono px-2.5 py-1 select-none"
			style={{
				background: "var(--v3-card)",
				border: "1px solid var(--v3-card-border)",
				borderRadius: "10px",
				color: "var(--accent)",
			}}
		>
			{label}
		</span>
	);
}

export default function ExperienceTimeline() {
	const { t, language } = useLanguage();
	return (
		<div className="flex flex-col gap-5">
			{experience.map((item, i) => {
				const isCurrent = item.end === null || item.end === "Present";
				return (
					<div
						key={i}
						className="group relative p-5 transition-all duration-200 hover:-translate-y-px notch-br"
						style={{
							background: "var(--v3-card)",
							border: "1px solid var(--v3-card-border)",
							borderLeft: "3px solid var(--accent)",
							borderRadius: "var(--card-radius)",
						}}
					>
						{/* ── Floating date pill (bottom-right, overlapping border) ── */}
						<span
							className="absolute -bottom-3.5 -right-3.5 text-xs font-mono px-3 py-1 select-none z-10"
							style={{
								background: "var(--v3-card)",
								border: "1px solid var(--v3-card-border)",
								borderRadius: "10px",
								color: "var(--v3-muted)",
							}}
						>
							{item.start} – {item.end ?? (language === "jp" ? "現在" : "Present")}
						</span>

						{/* ── Header row ── */}
						<div className="flex items-start justify-between gap-4 flex-wrap">
							<div>
								<p className="text-base font-bold leading-tight">{t(item.role)}</p>
								<p
									className="text-sm font-mono mt-0.5"
									style={{ color: "var(--v3-muted)" }}
								>
									{item.company}
									{item.location ? ` · ${t(item.location)}` : ""}
								</p>
							</div>

							<div className="flex items-center gap-2 shrink-0">
								{isCurrent && (
									<span
										className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 select-none"
										style={{
											background: "rgba(74,222,128,.1)",
											color: "#4ade80",
											border: "1px solid rgba(74,222,128,.2)",
											borderRadius: "10px",
										}}
									>
										<span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
										{language === "jp" ? "現在" : "Current"}
									</span>
								)}
							</div>
						</div>

						{/* Description */}
						<p className="text-sm font-mono mt-3 leading-relaxed opacity-80">
							{t(item.description)}
						</p>

						{/* Tags */}
						{item.tags.length > 0 && (
							<div className="flex flex-wrap gap-1.5 mt-3">
								{item.tags.map((tag) => (
									<Tag key={tag} label={tag} />
								))}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
