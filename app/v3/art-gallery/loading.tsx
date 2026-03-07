/* ── /art loading skeleton ────────────────────────────────────
   Shown by Next.js streaming while ArtPage renders on the server.
─────────────────────────────────────────────────────────────── */
export default function ArtLoading() {
    const fakePieces = [
        "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]",
        "aspect-[5/4]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]",
        "aspect-[3/4]", "aspect-square", "aspect-[5/4]", "aspect-[3/4]",
    ];

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-24 animate-pulse">
            {/* header */}
            <div className="mb-8">
                <div className="h-9 w-48 rounded-lg bg-foreground/8 mb-2" />
                <div className="h-4 w-72 rounded bg-foreground/8" />
            </div>

            {/* masonry skeleton */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                {fakePieces.map((aspect, i) => (
                    <div
                        key={i}
                        className={`break-inside-avoid mb-3 rounded-xl ${aspect}`}
                        style={{ background: "var(--c0)" }}
                    />
                ))}
            </div>
        </main>
    );
}



