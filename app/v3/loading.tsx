/* ── / (home) loading skeleton ────────────────────────────────
   Shown by Next.js streaming while the home page renders.
   Mirrors the real page layout: banner → avatar → content area.
─────────────────────────────────────────────────────────────── */
export default function HomeLoading() {
	return (
		<div className="pb-24 animate-pulse">
			{/* ── Banner skeleton ── */}
			<div className="sm:hidden w-full -mt-16 h-72 bg-foreground/8" />
			<div className="hidden sm:block w-full px-6 pt-6">
				<div className="max-w-5xl mx-auto h-60 rounded-2xl bg-foreground/8" />
			</div>

			{/* ── Content area ── */}
			<div className="max-w-5xl mx-auto px-4 sm:px-6">
				{/* Avatar + name */}
				<div className="flex gap-4 items-end -mt-20 sm:-mt-14 pl-2">
					<div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-foreground/8 border-4 border-background shrink-0" />
					<div className="mb-2 space-y-2">
						<div className="h-8 w-36 rounded-lg bg-foreground/8" />
						<div className="h-4 w-52 rounded bg-foreground/8" />
					</div>
				</div>

				<div className="flex gap-10 mt-12">
					{/* Sidebar skeleton */}
					<div className="hidden lg:flex flex-col gap-3 w-44 shrink-0">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="h-8 rounded-lg bg-foreground/8" />
						))}
					</div>

					{/* Main content */}
					<main className="flex-1 min-w-0 space-y-14">
						{/* Bio */}
						<section className="space-y-3">
							<div className="h-4 w-full rounded bg-foreground/8" />
							<div className="h-4 w-5/6 rounded bg-foreground/8" />
							<div className="h-4 w-4/6 rounded bg-foreground/8" />
							<div className="flex gap-2 mt-5">
								{["w-20", "w-28", "w-16", "w-24"].map((w, i) => (
									<div
										key={i}
										className={`h-8 ${w} rounded-full bg-foreground/8`}
									/>
								))}
							</div>
						</section>

						{/* GitHub contributions */}
						<section>
							<div className="h-6 w-36 rounded-lg bg-foreground/8 mb-4" />
							<div
								className="rounded-2xl p-4 w-full"
								style={{
									background: "var(--card)",
									border: "1px dashed var(--card-border)",
								}}
							>
								<div className="flex gap-1">
									{Array.from({ length: 40 }).map((_, wi) => (
										<div key={wi} className="flex flex-col gap-1">
											{Array.from({ length: 7 }).map((_, di) => (
												<div
													key={di}
													className="w-3 h-3 rounded-sm"
													style={{ background: "var(--c0)", opacity: 0.5 }}
												/>
											))}
										</div>
									))}
								</div>
							</div>
						</section>

						{/* Experience */}
						<section>
							<div className="h-6 w-28 rounded-lg bg-foreground/8 mb-5" />
							<div className="space-y-5">
								{Array.from({ length: 3 }).map((_, i) => (
									<div key={i} className="flex gap-4">
										<div className="w-10 h-10 rounded-full bg-foreground/8 shrink-0" />
										<div className="flex-1 space-y-2">
											<div className="h-4 w-1/3 rounded bg-foreground/8" />
											<div className="h-3 w-1/2 rounded bg-foreground/8" />
											<div className="h-3 w-2/3 rounded bg-foreground/8" />
										</div>
									</div>
								))}
							</div>
						</section>

						{/* Skills */}
						<section>
							<div className="h-6 w-16 rounded-lg bg-foreground/8 mb-6" />
							<div className="flex flex-wrap gap-2">
								{[
									62, 78, 54, 85, 70, 56, 88, 65, 73, 50, 82, 60, 76, 68, 58,
									80, 72, 64,
								].map((w, i) => (
									<div
										key={i}
										className="h-7 rounded-full bg-foreground/8"
										style={{ width: `${w}px` }}
									/>
								))}
							</div>
						</section>

						{/* Projects */}
						<section>
							<div className="h-6 w-20 rounded-lg bg-foreground/8 mb-5" />
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{Array.from({ length: 4 }).map((_, i) => (
									<div
										key={i}
										className="rounded-xl p-5"
										style={{
											background: "var(--card)",
											border: "1px solid var(--card-border)",
										}}
									>
										<div className="h-4 w-1/2 rounded bg-foreground/8 mb-3" />
										<div className="h-3 w-full rounded bg-foreground/8 mb-2" />
										<div className="h-3 w-3/4 rounded bg-foreground/8 mb-4" />
										<div className="flex gap-1.5">
											<div className="h-5 w-14 rounded-full bg-foreground/8" />
											<div className="h-5 w-16 rounded-full bg-foreground/8" />
										</div>
									</div>
								))}
							</div>
						</section>
					</main>
				</div>
			</div>
		</div>
	);
}
