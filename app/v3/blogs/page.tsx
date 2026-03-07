import { Suspense } from "react";
import "./blog.css";
import Link from "next/link";
import { posts } from "@/content/v3/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog — Aditya",
    description: "Thoughts, write-ups & dev notes from Aditya.",
};

/* ── Blog Card ────────────────────────────────────────────── */
function BlogCard({ post }: { post: (typeof posts)[number] }) {
    return (
        <Link
            href={`/blogs/${post.slug}`}
            className="blog-card group flex items-start gap-6 py-8 px-1 no-underline"
            style={{ borderBottom: "1px solid var(--card-border)" }}
        >
            {/* Left: text */}
            <div className="flex-1 min-w-0">
                {/* tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-sm font-mono px-2.5 py-0.5 rounded-full select-none"
                            style={{
                                background: "var(--c0)",
                                color: "var(--muted)",
                                border: "1px solid var(--card-border)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* title */}
                <h2
                    className="text-xl font-bold leading-snug mb-2 transition-colors duration-150 group-hover:text-accent"
                    style={{ color: "var(--foreground)" }}
                >
                    {post.title}
                </h2>

                {/* excerpt */}
                <p
                    className="text-base font-mono leading-relaxed line-clamp-2 mb-4"
                    style={{ color: "var(--muted)" }}
                >
                    {post.excerpt}
                </p>

                {/* meta */}
                <div
                    className="flex items-center gap-3 text-sm font-mono"
                    style={{ color: "var(--muted)" }}
                >
                    <span>{post.date}</span>
                    <span className="opacity-60">·</span>
                    <span>{post.readTime}</span>
                    <span className="opacity-60">·</span>
                    <span
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1"
                        style={{ color: "var(--accent)" }}
                    >
                        Read →
                    </span>
                </div>
            </div>

            {/* Right: cover image (if present) */}
            {post.cover && (
                <div className="shrink-0 w-28 h-20 sm:w-36 sm:h-24 rounded-lg overflow-hidden bg-foreground/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            )}
        </Link>
    );
}

/* ── Blog list skeleton ───────────────────────────────────── */
function BlogListSkeleton() {
    return (
        <div className="animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-start gap-6 py-8 px-1"
                    style={{ borderBottom: "1px solid var(--card-border)" }}
                >
                    <div className="flex-1 space-y-3">
                        <div className="flex gap-1.5">
                            <div className="h-5 w-14 rounded-full bg-foreground/8" />
                            <div className="h-5 w-18 rounded-full bg-foreground/8" />
                        </div>
                        <div className="h-5 w-3/4 rounded bg-foreground/8" />
                        <div className="h-4 w-full rounded bg-foreground/8" />
                        <div className="h-4 w-2/3 rounded bg-foreground/8" />
                        <div className="flex gap-3">
                            <div className="h-3 w-20 rounded bg-foreground/8" />
                            <div className="h-3 w-16 rounded bg-foreground/8" />
                        </div>
                    </div>
                    <div className="shrink-0 w-28 h-20 sm:w-36 sm:h-24 rounded-lg bg-foreground/8" />
                </div>
            ))}
        </div>
    );
}

/* ── Blog post list content ───────────────────────────────── */
function BlogPostList() {
    return posts.length > 0 ? (
        <div>
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    ) : (
        <div className="flex flex-col items-center text-center py-32">
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-xl font-mono select-none"
                style={{
                    background: "var(--card)",
                    border: "1px dashed var(--card-border)",
                    color: "var(--accent)",
                }}
            >
                ✍
            </div>
            <p className="text-lg font-bold mb-2">No posts yet</p>
            <p className="text-base font-mono opacity-65 max-w-xs leading-relaxed">
                Writing is in progress. Check back soon.
            </p>
        </div>
    );
}

/* ── Page (Server Component) ──────────────────────────────── */
export default function BlogPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-24">
            {/* Header */}
            <div className="mb-2">
                <div className="flex items-center gap-2 text-sm font-mono mb-4">
                    <Link href="/v3" className="opacity-65 hover:opacity-90 transition-opacity">
                        home
                    </Link>
                    <span>/</span>
                    <span className="opacity-65">blog</span>
                </div>
                <h1 className="text-4xl font-bold mb-1">Blog</h1>
                <p className="text-base font-mono opacity-70">
                    Thoughts, write-ups &amp; dev notes ·{" "}
                    {posts.length} post{posts.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Divider */}
            <div className="mt-8" style={{ borderTop: "1px solid var(--card-border)" }} />

            {/* Post list — wrapped in Suspense */}
            <Suspense fallback={<BlogListSkeleton />}>
                <BlogPostList />
            </Suspense>
        </main>
    );
}



