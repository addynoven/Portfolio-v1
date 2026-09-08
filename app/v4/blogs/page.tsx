"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/v4/constants";
import { FiArrowRight } from "react-icons/fi";

const CATEGORIES = ["All", "Philosophy", "Engineering", "Backend"];

export default function V4BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = BLOG_POSTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm">
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
          Blogs
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-lg leading-relaxed">
          Essays on interface ergonomics, systems architecture, micro-luminescence, and why code boundaries matter.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs List Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60 shadow-sm">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/v4/blogs/${post.slug}`}
            className="group py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 -mx-3 px-3 rounded-xl"
          >
            <div className="flex flex-col pr-4">
              <h2 className="text-[15px] font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-neutral-400">
              <span>{post.date}</span>
              <FiArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:group-hover:text-white transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
