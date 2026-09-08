"use client";

import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/v4/constants";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export function RecentBlogs() {
  return (
    <div
      data-section="Blogs"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm"
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          Blogs
        </h2>
        <Link
          href="/v4/blogs"
          className="group flex items-center gap-2"
        >
          <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
            View all
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-300 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-700">
            <FiArrowRight className="w-3 h-3 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-1 w-full">
        {BLOG_POSTS.map((post) => (
          <motion.div
            key={post.slug}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href={`/v4/blogs/${post.slug}`}
              className="group -mx-3 flex flex-col justify-between rounded-xl px-3 py-3 transition-colors hover:bg-neutral-50 sm:-mx-4 sm:flex-row sm:items-center sm:px-4 sm:py-3.5 dark:hover:bg-neutral-900/50"
            >
              <h3 className="line-clamp-2 text-[15px] font-medium text-neutral-900 sm:pr-4 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                {post.title}
              </h3>
              <div className="mt-1 flex shrink-0 items-center gap-3 text-[13px] text-neutral-500 sm:mt-0 font-mono">
                <span>{post.date}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
