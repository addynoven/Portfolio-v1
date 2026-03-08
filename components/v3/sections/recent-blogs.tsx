"use client";

import Link from "next/link";
import { posts } from "@/content/v3/blogs";
import { useLanguage } from "@/context/v3/language-context";

export default function RecentBlogs() {
	const { language } = useLanguage();
	const recentPosts = posts.slice(0, 3);

	if (recentPosts.length === 0) {
		return (
			<div
				className="flex flex-col items-center justify-center p-12 text-center"
				style={{
					background: "var(--v3-card)",
					border: "1px dashed var(--v3-card-border)",
					borderRadius: "var(--card-radius)",
				}}
			>
				<div
					className="w-12 h-12 flex items-center justify-center mb-4 text-xl font-mono select-none"
					style={{
						background: "var(--v3-bg)",
						color: "var(--accent)",
						border: "1px solid var(--v3-card-border)",
						borderRadius: "12px",
					}}
				>
					✍
				</div>
				<p className="text-base font-bold mb-1">
					{language === "jp" ? "まだ投稿がありません" : "No posts yet"}
				</p>
				<p className="text-sm font-mono opacity-65 max-w-xs leading-relaxed">
					{language === "jp" 
						? "執筆中です。もうしばらくお待ちください。" 
						: "Writing is in progress. Check back soon."}
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-5">
			{recentPosts.map((post) => (
				<Link
					key={post.slug}
					href={`/v3/blogs/${post.slug}`}
					className="group relative flex flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent no-underline notch-tr"
					style={{
						background: "var(--v3-card)",
						border: "1px solid var(--v3-card-border)",
						borderRadius: "var(--card-radius)",
					}}
				>
					{/* ── Floating arrow button (top-right) ── */}
					<span
						className="absolute -top-3.5 -right-3.5 w-8 h-8 flex items-center justify-center transition-all duration-200 z-10 group-hover:scale-110"
						style={{
							background: "var(--accent)",
							borderRadius: "10px",
							color: "var(--v3-card)",
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7 17L17 7M17 7H7M17 7v10"
							/>
						</svg>
					</span>

					<div className="flex items-start justify-between gap-4 mb-2">
						<p className="text-base font-bold font-mono group-hover:text-accent transition-colors duration-200">
							{post.title}
						</p>
						{/* ── Date pill ── */}
						<span
							className="shrink-0 text-xs font-mono px-2.5 py-1 select-none"
							style={{
								background: "var(--v3-bg)",
								border: "1px solid var(--v3-card-border)",
								borderRadius: "10px",
								color: "var(--v3-muted)",
							}}
						>
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
						<span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
							{language === "jp" ? "読む" : "Read"} →
						</span>
					</div>
				</Link>
			))}
		</div>
	);
}

export function RecentBlogsSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-5 animate-pulse">
			{Array.from({ length: 3 }).map((_, i) => (
				<div
					key={i}
					className="p-5 flex flex-col gap-3"
					style={{
						background: "var(--v3-card)",
						border: "1px solid var(--v3-card-border)",
						borderRadius: "var(--card-radius)",
					}}
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
