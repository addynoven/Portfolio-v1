import * as allPosts from "./posts";

// ── BlogPost type ─────────────────────────────────────────────
// Keep this shape stable — a future dashboard will write to this
// same structure, just sourced from a DB/API instead of constants.
export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;         // display string e.g. "Feb 20, 2026"
    readTime: string;     // e.g. "6 min read"
    tags: string[];
    cover?: string;       // optional cover image URL
    content: string;      // raw Markdown (README-style)
}

// ── Posts registry ────────────────────────────────────────────
// To add a new post: export a new BlogPost object in posts.ts and it will be autoloaded here.
export const posts: BlogPost[] = (Object.values(allPosts) as BlogPost[]).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// ── Helpers ───────────────────────────────────────────────────
export function getPostBySlug(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return posts.map((p) => p.slug);
}
