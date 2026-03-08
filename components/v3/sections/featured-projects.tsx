"use client";

import { projects } from "@/app/v3/constants";
import { Icons } from "@/components/v3/ui/icons";
import { useLanguage } from "@/context/v3/language-context";

export default function FeaturedProjects() {
	const { t } = useLanguage();
	const featuredProjects = projects.slice(0, 4);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
			{featuredProjects.map((project) => (
				<div
					key={project.name}
					className="group relative flex flex-col transition-all duration-200 hover:-translate-y-1 notch-tr"
					style={{
						background: "var(--v3-card)",
						border: "1px solid var(--v3-card-border)",
						borderRadius: "var(--card-radius)",
					}}
				>
					{/* ── Floating arrow button (top-right corner) ── */}
					{(project.liveUrl || project.repoUrl) && (
						<a
							href={project.liveUrl || project.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="absolute -top-3.5 -right-3.5 w-9 h-9 flex items-center justify-center transition-all duration-200 z-10 group-hover:scale-110 group-hover:-translate-y-0.5"
							style={{
								background: "var(--v3-card)",
								border: "1px solid var(--v3-card-border)",
								borderRadius: "10px",
								color: "var(--v3-muted)",
							}}
							aria-label={project.liveUrl ? "Live View" : "GitHub"}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-4 h-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M7 17L17 7M17 7H7M17 7v10"
								/>
							</svg>
						</a>
					)}

					{/* ── Card content ── */}
					<div className="p-5 flex flex-col flex-1">
						{/* Name + stars */}
						<div className="flex items-start justify-between gap-2 mb-2.5">
							<p className="text-base font-bold font-mono group-hover:text-accent transition-colors duration-200">
								{project.name}
							</p>
							<div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 px-2 py-0.5 rounded-md border border-card-border">
                                    {t(project.category)}
                                </span>
								{project.wip && (
									<span
										className="text-xs font-mono px-2 py-0.5 select-none"
										style={{
											background: "rgba(234,179,8,.1)",
											color: "#eab308",
											border: "1px solid rgba(234,179,8,.2)",
											borderRadius: "8px",
										}}
									>
										WIP
									</span>
								)}
								<span className="flex items-center gap-1 text-sm font-mono opacity-75">
									<Icons.Star className="w-4 h-4" /> {project.stars}
								</span>
							</div>
						</div>

						{/* Description */}
						<p className="text-sm font-mono leading-relaxed opacity-75 flex-1 mb-4">
							{t(project.description)}
						</p>

						{/* ── Floating pill tags (overlapping the bottom border) ── */}
						<div className="flex flex-wrap gap-1.5 mb-4">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="text-xs font-mono px-2.5 py-1 select-none"
									style={{
										background: "var(--v3-card)",
										border: "1px solid var(--v3-card-border)",
										borderRadius: "10px",
										color: "var(--v3-muted)",
									}}
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* ── Action bar ── */}
					<div
						className="flex items-center gap-2 px-5 py-3"
						style={{ borderTop: "1px solid var(--v3-card-border)" }}
					>
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-mono transition-all duration-150 hover:-translate-y-px hover:text-accent hover:border-accent/40"
								style={{
									background: "var(--v3-bg)",
									border: "1px solid var(--v3-card-border)",
									borderRadius: "10px",
									color: "var(--v3-muted)",
								}}
							>
								<Icons.GitHub className="w-4 h-4 shrink-0" />
								GitHub
							</a>
						)}
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-mono transition-all duration-150 hover:-translate-y-px"
								style={{
									background: "var(--accent)",
									border: "1px solid transparent",
									borderRadius: "10px",
									color: "var(--v3-card)",
								}}
							>
								<Icons.External className="w-4 h-4 shrink-0" />
								Live View
							</a>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
