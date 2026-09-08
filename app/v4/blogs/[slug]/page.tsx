import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS, PROFILE } from "@/lib/v4/constants";
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <article className="flex flex-col gap-4 w-full">
      {/* Back Link Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 px-5 py-3 flex items-center justify-between shadow-sm">
        <Link
          href="/v4/blogs"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors group"
        >
          <FiArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all essays</span>
        </Link>
        <span className="text-xs font-mono text-neutral-400">{post.category}</span>
      </div>

      {/* Main Article Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm">
        {/* Meta header */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mb-3">
          <div className="flex items-center gap-1">
            <FiCalendar className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal leading-tight">
          {post.title}
        </h1>

        <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author row */}
        <div className="flex items-center gap-3 py-4 border-y border-neutral-100 dark:border-neutral-800/60 my-6">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Image
              src={PROFILE.avatar}
              alt={PROFILE.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-neutral-900 dark:text-white">{PROFILE.name}</span>
            <span className="text-[11px] font-mono text-neutral-400">{PROFILE.tagline}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-5 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
          {post.content.map((paragraph, index) => (
            <p key={index} className="leading-7">
              {paragraph}
            </p>
          ))}

          {post.tableOfContents.map((section, idx) => (
            <div key={section.id} id={section.id} className="pt-4">
              <h2 className="font-serif text-2xl text-neutral-900 dark:text-white font-normal mb-2">
                {section.title}
              </h2>
              <p className="leading-7 text-neutral-600 dark:text-neutral-400">
                When designing web surfaces and distributed systems, the primary objective is predictability.
                Users and developers both prize architecture that behaves consistently under stress and degrades gracefully when boundaries are reached.
              </p>
              {idx === 0 && (
                <blockquote className="my-5 pl-4 border-l-2 border-neutral-900 dark:border-white italic font-serif text-lg text-neutral-900 dark:text-neutral-100">
                  &ldquo;Derive abstractions only when duplication actively impedes refactoring—never as speculative defense.&rdquo;
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* More Articles Card */}
      {relatedPosts.length > 0 && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm">
          <h3 className="font-serif text-2xl text-neutral-900 dark:text-white font-normal mb-4">
            More Articles
          </h3>
          <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {relatedPosts.slice(0, 2).map((rel) => (
              <Link
                key={rel.slug}
                href={`/v4/blogs/${rel.slug}`}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-[14.5px] font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-primary transition-colors">
                    {rel.title}
                  </h4>
                  <span className="text-xs font-mono text-neutral-400 mt-0.5 block">
                    {rel.date} • {rel.readTime}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
