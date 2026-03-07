/* ── /projects loading skeleton ─────────────────────────────
   Next.js renders this instantly while ProjectsPage streams.
─────────────────────────────────────────────────────────────── */
export default function ProjectsLoading() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-24 animate-pulse">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-10 rounded bg-foreground/8" />
                <div className="h-3 w-2 rounded bg-foreground/8" />
                <div className="h-3 w-16 rounded bg-foreground/8" />
            </div>

            {/* title */}
            <div className="h-10 w-40 rounded-lg bg-foreground/8 mb-3" />
            <div className="h-4 w-72 rounded bg-foreground/8 mb-5" />

            {/* stats row */}
            <div className="flex gap-6 mb-8">
                <div className="h-4 w-20 rounded bg-foreground/8" />
                <div className="h-4 w-24 rounded bg-foreground/8" />
            </div>

            {/* divider */}
            <div className="h-px bg-foreground/8 mb-8" />

            {/* project cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl overflow-hidden"
                        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
                    >
                        {/* image placeholder */}
                        <div className="h-48 w-full" style={{ background: "var(--c0)" }} />
                        {/* card body */}
                        <div className="p-5 space-y-3">
                            <div className="h-4 w-1/2 rounded-full bg-foreground/8" />
                            <div className="h-3 w-3/4 rounded-full bg-foreground/8" />
                            <div className="h-3 w-2/3 rounded-full bg-foreground/8" />
                            {/* tag chips */}
                            <div className="flex gap-1.5 pt-1">
                                <div className="h-5 w-12 rounded-full bg-foreground/8" />
                                <div className="h-5 w-16 rounded-full bg-foreground/8" />
                                <div className="h-5 w-10 rounded-full bg-foreground/8" />
                            </div>
                            {/* buttons */}
                            <div className="flex gap-2 pt-3 border-t border-foreground/8">
                                <div className="h-9 flex-1 rounded-lg bg-foreground/8" />
                                <div className="h-9 flex-1 rounded-lg bg-foreground/8" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



