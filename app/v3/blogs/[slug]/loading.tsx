import "../blog.css";

/* ── Route-level streaming skeleton ─────────────────────────
   Next.js shows this instantly while the server streams the
   real BlogPostPage. Automatically picked up from loading.tsx.
─────────────────────────────────────────────────────────────── */
export default function BlogPostLoading() {
    return (
        <div className="blog-post-page">
            {/* Sticky top bar skeleton */}
            <div className="blog-topbar">
                <div className="h-5 w-20 rounded bg-foreground/8 animate-pulse" />
                <div className="h-4 w-48 rounded bg-foreground/8 animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="blog-post-scroll">
                <div className="blog-post-inner blog-content animate-pulse">
                    {/* Title */}
                    <div className="h-9 rounded-lg bg-foreground/8 w-3/4 mb-4" />
                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                        <div className="h-5 w-16 rounded-full bg-foreground/8" />
                        <div className="h-5 w-20 rounded-full bg-foreground/8" />
                        <div className="h-5 w-14 rounded-full bg-foreground/8" />
                    </div>
                    {/* Date */}
                    <div className="h-4 w-44 rounded bg-foreground/8 mb-8" />
                    {/* Divider */}
                    <div className="h-px bg-foreground/8 mb-8" />
                    {/* Body lines */}
                    {[100, 95, 88, 100, 72, 90, 83, 100, 65, 92, 78, 88].map((w, i) => (
                        <div
                            key={i}
                            className="h-4 rounded bg-foreground/8 mb-3"
                            style={{ width: `${w}%` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
