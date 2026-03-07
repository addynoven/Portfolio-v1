import { notFound } from "next/navigation";
import { Suspense } from "react";
import { marked } from "marked";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/content/v3/blogs";
import "../blog.css";
import StickyTopbar from "./sticky-topbar";

/* ── Configure marked (server-side only) ─────────────────── */
marked.setOptions({ gfm: true, breaks: false });

/* ── Static params — pre-render all known slugs ──────────── */
export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Per-page metadata ───────────────────────────────────── */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Not Found" };
    return {
        title: `${post.title} — Aditya`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
        },
    };
}

/* ── Article body (streamed in its own Suspense boundary) ── */
async function ArticleBody({ slug }: { slug: string }) {
    const post = getPostBySlug(slug);
    if (!post) notFound();

    // marked.parse can be awaited (async mode) — keeps this async-component friendly
    const rawHtml = await marked.parse(post.content);
    // Strip the first <h1>…</h1> from the markdown – we render the title separately above
    const html = rawHtml.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, "");

    return (
        <article className="blog-content">
            {/* ── Meta header ── */}
            <div className="mb-8">
                <h1
                    className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
                    style={{ color: "var(--foreground)" }}
                >
                    {post.title}
                </h1>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-sm font-mono px-2.5 py-0.5 rounded-full select-none"
                            style={{
                                background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                                color: "var(--accent)",
                                border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div
                    className="flex items-center gap-3 text-sm font-mono"
                    style={{ color: "var(--muted)" }}
                >
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                </div>

                {/* cover image */}
                {post.cover && (
                    <div className="mt-6 rounded-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.cover}
                            alt={post.title}
                            className="w-full max-h-80 object-cover"
                        />
                    </div>
                )}

                <div
                    className="mt-8"
                    style={{ borderTop: "1px solid var(--card-border)" }}
                />
            </div>

            {/* ── Rendered markdown ── */}
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </article>
    );
}

/* ── Skeleton shown while streaming ─────────────────────── */
function ArticleSkeleton() {
    return (
        <div className="blog-content animate-pulse">
            {/* title */}
            <div className="h-9 rounded-lg bg-foreground/8 w-3/4 mb-4" />
            <div className="flex gap-2 mb-4">
                <div className="h-5 w-16 rounded-full bg-foreground/8" />
                <div className="h-5 w-20 rounded-full bg-foreground/8" />
            </div>
            <div className="h-4 w-40 rounded bg-foreground/8 mb-8" />
            <div className="border-t border-card-border mb-8" />
            {/* body lines */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 rounded bg-foreground/8 mb-3"
                    style={{ width: `${70 + Math.random() * 28}%` }}
                />
            ))}
        </div>
    );
}

/* ── Page ────────────────────────────────────────────────── */
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    return (
        <div className="blog-post-page">
            {/* ── Sticky top bar (Client Component for scroll behavior) ── */}
            <StickyTopbar title={post.title} />

            {/* ── Scrollable content with streaming ── */}
            <div className="blog-post-scroll">
                <div className="blog-post-inner">
                    <Suspense fallback={<ArticleSkeleton />}>
                        <ArticleBody slug={slug} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
