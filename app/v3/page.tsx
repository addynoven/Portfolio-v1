"use client";

import { Suspense } from "react";
import { useLanguage } from "@/context/v3/language-context";
import ImageWithPlaceholder from "@/components/v3/ui/image-with-placeholder";
import SidebarNav from "@/components/v3/layout/sidebar-nav";
import ExperienceTimeline from "@/components/v3/sections/experience-timeline";
import FeaturedProjects from "@/components/v3/sections/featured-projects";
import SkillGroups from "@/components/v3/sections/skill-badges";
import RecentBlogs, { RecentBlogsSkeleton } from "@/components/v3/sections/recent-blogs";
import { skillGroups, METADATA } from "@/app/v3/constants";
import QuoteRotatorWrapper from "@/components/v3/sections/quote-rotator-wrapper";
import AnimatedAvatar from "@/components/v3/ui/animated-avatar";
import GithubCommits from "@/components/v3/sections/github-commits";

/* ── Section skeletons (local for now) ──────────────────────────────── */
function CommitsSkeleton() {
  return (
    <div className="rounded-2xl p-4 w-full animate-pulse bg-card border border-dashed border-card-border">
      <div className="flex gap-1">
        {Array.from({ length: 40 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, di) => (
              <div key={di} className="w-3 h-3 rounded-sm bg-foreground/10" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="pb-20">
      {/* ── Banner ────────────────────────────────────────── */}
      <div className="relative h-[250px] sm:h-[300px] w-full overflow-hidden bg-muted">
        {METADATA.bannerVideoPath ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ objectPosition: "50% 65%" }}
          >
            <source src={METADATA.bannerVideoPath} type="video/mp4" />
          </video>
        ) : (
          <ImageWithPlaceholder
            src={METADATA.bannerPath}
            alt="Banner"
            fill
            preload
            containerClassName="w-full h-full"
            className="object-cover object-top select-none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Avatar + name — peeks below banner */}
        <div className="flex gap-4 items-end -mt-20 sm:-mt-14 pl-2 relative z-20">
          <div className="shrink-0 relative">
            <AnimatedAvatar />
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold select-none leading-tight">
              {METADATA.name}
            </h1>
            <p className="text-base font-mono opacity-75 cursor-text mt-0.5">
              {new Date().getFullYear() - 2002} · {t(METADATA.role)} · {t(METADATA.location)}
            </p>
          </div>
        </div>

        {/* ── Two-column layout (lg+) ─────────────────────── */}
        <div className="flex items-start gap-10 mt-12">
          {/* Left: sticky sidebar */}
          <div className="hidden lg:block shrink-0 sticky top-24 h-fit">
             <SidebarNav />
          </div>

          {/* Right: all sections */}
          <main className="flex-1 min-w-0">
            {/* ── Bio ─────────────────────── */}
            <section id="hero" className="scroll-mt-24 v3-glass p-6 sm:p-8 rounded-2xl">
              <p className="text-lg font-mono opacity-80 leading-relaxed max-w-2xl whitespace-pre-line">
                {t(METADATA.bio)}
              </p>
              <p className="mt-4 text-sm font-mono tracking-wider uppercase opacity-50 flex items-center gap-2">
                <span className="w-1.5 h-px bg-current" />
                {t(METADATA.bioTagline)}
              </p>
            </section>

            {/* ── GitHub Contributions ─────────────────────── */}
            <section id="commits" className="mt-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold lowercase tracking-tight">
                  {language === "jp" ? "コントリビューション" : "Contributions"}
                </h2>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <Suspense fallback={<CommitsSkeleton />}>
                <GithubCommits />
              </Suspense>
            </section>

            {/* ── Projects ─────────────────────────────────── */}
            <section id="projects" className="mt-16 scroll-mt-24">
              <div className="flex items-center justify-between mb-8 group/title">
                <h2 className="text-xl font-bold lowercase tracking-tight">
                  {language === "jp" ? "プロジェクト" : "Projects"}
                </h2>
                <div className="h-px flex-1 mx-4 bg-border/50 group-hover/title:bg-accent/30 transition-colors" />
              </div>
              <FeaturedProjects />
            </section>

            {/* ── Skills ───────────────────────────────────── */}
            <section id="skills" className="mt-16 scroll-mt-24 v3-glass p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-xl font-bold lowercase tracking-tight">
                    {language === "jp" ? "スキル" : "Skills"}
                </h2>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <SkillGroups groups={skillGroups} />
            </section>

            {/* ── Experience ───────────────────────────────── */}
            <section id="experience" className="mt-16 scroll-mt-24">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-xl font-bold lowercase tracking-tight">
                    {language === "jp" ? "経歴" : "Experience"}
                </h2>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <ExperienceTimeline />
            </section>

            {/* ── Blogs ────────────────────────────────────── */}
            <section id="blogs" className="mt-16 scroll-mt-24">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-xl font-bold lowercase tracking-tight">
                    {language === "jp" ? "最近の投稿" : "Recent Posts"}
                </h2>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <Suspense fallback={<RecentBlogsSkeleton />}>
                <RecentBlogs />
              </Suspense>
            </section>

            <div className="mt-20 flex justify-center">
              <QuoteRotatorWrapper />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}



