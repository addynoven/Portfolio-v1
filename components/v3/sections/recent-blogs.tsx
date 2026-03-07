import Link from "next/link";
import { posts } from "@/content/v3/blogs";

export default function RecentBlogs() {
    // Show up to 3 most recent posts
    const recentPosts = posts.slice(0, 3);

    if (recentPosts.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center p-12 rounded-2xl text-center"
                style={{ background: "var(--card)", border: "1px dashed var(--card-border)" }}
            >
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl font-mono select-none"
                    style={{
                        background: "var(--c0)",
                        color: "var(--accent)",
                        border: "1px solid var(--card-border)",
                    }}
                >
                    ✍
                </div>
                <p className="text-base font-bold mb-1">No posts yet</p>
                <p className="text-sm font-mono opacity-65 max-w-xs leading-relaxed">
                    Writing is in progress. Check back soon.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {recentPosts.map((post) => (
                <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col p-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent no-underline"
                    style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
                >
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <p className="text-base font-bold font-mono group-hover:text-accent transition-colors duration-200">
                            {post.title}
                        </p>
                        <span className="shrink-0 text-xs font-mono opacity-50 flex items-center gap-1.5 mt-0.5">
                            {post.date}
                        </span>
                    </div>

                    <p className="text-sm font-mono leading-relaxed opacity-75 mb-5 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-mono px-2 py-0.5 rounded-full select-none"
                                    style={{ background: "var(--c0)", color: "var(--muted)" }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Read →
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export function RecentBlogsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="p-5 rounded-xl flex flex-col gap-3"
                    style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
                >
                    <div className="h-4 w-3/4 rounded bg-foreground/8 mb-1" />
                    <div className="h-3 w-full rounded bg-foreground/8" />
                    <div className="h-3 w-5/6 rounded bg-foreground/8 mb-3" />
                    <div className="flex gap-2">
                        <div className="h-5 w-16 rounded-full bg-foreground/8" />
                        <div className="h-5 w-20 rounded-full bg-foreground/8" />
                    </div>
                </div>
            ))}
        </div>
    );
}



