/* ── /v3/backgrounds loading skeleton ──────────────────────────
   Shown by Next.js streaming while BackgroundsPage renders.
─────────────────────────────────────────────────────────────── */
export default function BackgroundsLoading() {
	return (
		<main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-24 animate-pulse">
			{/* header */}
			<div className="mb-10">
				<div className="h-9 w-64 rounded-lg bg-foreground/8 mb-2" />
				<div className="h-4 w-96 rounded bg-foreground/8" />
			</div>

			{/* grid skeleton */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 9 }).map((_, i) => (
					<div
						key={i}
						className="rounded-2xl overflow-hidden"
						style={{
							background: "var(--v3-card)",
							border: "1px solid var(--v3-card-border)",
						}}
					>
						<div className="w-full aspect-video bg-foreground/5" />
						<div className="p-5 space-y-3">
							<div className="h-5 w-32 rounded bg-foreground/10" />
							<div className="h-3 w-full rounded bg-foreground/5" />
							<div className="h-3 w-3/4 rounded bg-foreground/5" />
							<div className="flex gap-2 mt-2">
								<div className="h-5 w-14 rounded bg-foreground/5" />
								<div className="h-5 w-18 rounded bg-foreground/5" />
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
