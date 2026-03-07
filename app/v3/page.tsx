import { Suspense } from "react";
import dynamic from "next/dynamic";

import ImageWithPlaceholder from "@/components/v3/ui/image-with-placeholder";
import SidebarNav from "@/components/v3/layout/sidebar-nav";
import ExperienceTimeline from "@/components/v3/sections/experience-timeline";
import FeaturedProjects from "@/components/v3/sections/featured-projects";
import SkillGroups from "@/components/v3/sections/skill-badges";
import RecentBlogs, { RecentBlogsSkeleton } from "@/components/v3/sections/recent-blogs";
import { skillGroups } from "@/app/v3/constants";
import Footer from "@/components/v3/layout/footer";
import QuoteRotatorWrapper from "@/components/v3/sections/quote-rotator-wrapper";

/* ── Lazy-loaded client components ─────────────────────── */
const GithubCommits = dynamic(
  () => import("@/components/v3/sections/github-commits"),
  { loading: () => <CommitsSkeleton /> }
);


/* ── Section skeletons ───────────────────────────────────────── */
function CommitsSkeleton() {
  return (
    <div
      className="rounded-2xl p-4 w-full animate-pulse bg-card border border-dashed border-card-border"
    >
      <div className="flex gap-1">
        {Array.from({ length: 40 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, di) => (
              <div
                key={di}
                className="w-3 h-3 rounded-sm"
                style={{ background: "hsl(var(--c0))", opacity: 0.5 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--card-border)", borderLeft: "3px solid var(--c0)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/3 rounded bg-foreground/8" />
              <div className="h-3 w-1/2 rounded bg-foreground/8" />
            </div>
            <div className="h-5 w-24 rounded-full bg-foreground/8" />
          </div>
          <div className="h-3 w-2/3 rounded bg-foreground/8 mt-3" />
        </div>
      ))}
    </div>
  );
}

function SkillsSkeleton() {
  return (
    <div className="space-y-7 animate-pulse">
      {Array.from({ length: 3 }).map((_, gi) => (
        <div key={gi} className="space-y-3">
          <div className="h-3 w-20 rounded bg-foreground/8" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 + gi * 2 }).map((_, i) => (
              <div
                key={i}
                className="h-8 rounded-lg bg-foreground/8"
                style={{ width: `${56 + Math.random() * 36}px` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
        >
          <div className="h-4 w-1/2 rounded bg-foreground/8 mb-3" />
          <div className="h-3 w-full rounded bg-foreground/8 mb-2" />
          <div className="h-3 w-3/4 rounded bg-foreground/8 mb-4" />
          <div className="flex gap-1.5">
            <div className="h-5 w-14 rounded-full bg-foreground/8" />
            <div className="h-5 w-16 rounded-full bg-foreground/8" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <div className="pb-24">

        {/* ── Banner ─────────────────────────────────────────
             Mobile : full-bleed, bleeds behind the sticky navbar
             Desktop: padded rounded card (unchanged)
        ── */}

        {/* Mobile: absolute-height hero block that pulls up behind navbar */}
        <div className="sm:hidden w-full -mt-16 relative h-72">
          <ImageWithPlaceholder
            src="/v3/images/banner.webp"
            alt="Banner"
            fill priority
            containerClassName="w-full h-full"
            className="object-cover select-none"
            sizes="100vw"
            draggable={false}
          />
          {/* bottom fade so avatar text stays readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, var(--background) 100%)",
            }}
          />
        </div>

        {/* Desktop: padded, rounded card inside max-width container */}
        <div className="hidden sm:block w-full px-6 pt-6">
          <div className="max-w-5xl mx-auto h-60 bg-neutral-200 dark:bg-neutral-800 rounded-2xl overflow-hidden relative">
            <ImageWithPlaceholder
              src="/v3/images/banner.webp"
              alt="Banner"
              fill priority
              containerClassName="w-full h-full"
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 1024px"
              draggable={false}
            />
          </div>
        </div>

        {/* ── Content area ──────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Avatar + name — peeks below banner */}
          <div className="flex gap-4 items-end -mt-20 sm:-mt-14 pl-2">
            <div className="w-28 h-28 md:w-36 md:h-36 bg-neutral-300 dark:bg-neutral-800 rounded-full overflow-hidden border-4 border-background shrink-0 relative backdrop-blur-3xl shadow-lg">
              <ImageWithPlaceholder
                src="/photo.jpg"
                alt="Aditya avatar"
                fill preload
                containerClassName="w-full h-full"
                className="object-cover select-none"
                sizes="144px"
                draggable={false}
              />
            </div>
            <div className="mb-2">
              <h1 className="text-3xl font-bold select-none leading-tight">Aditya</h1>
              <p className="text-base font-mono opacity-75 cursor-text mt-0.5">
                {new Date().getFullYear() - 2002} · software engineer · india
              </p>
            </div>
          </div>

          {/* ── Two-column layout (lg+) ─────────────────────── */}
          <div className="flex gap-10 mt-12">

            {/* Left: sticky sidebar */}
            <SidebarNav />

            {/* Right: all sections */}
            <main className="flex-1 min-w-0">

              {/* ── Bio, tags, socials ─────────────────────── */}
              <section id="hero" className="scroll-mt-24">
                <p className="text-lg font-mono opacity-80 leading-relaxed max-w-2xl">
                  I build things that actually work in the real world — sharp, fast, and user-friendly. 
                  Mostly focused on AI now, experimenting with models, fine-tuning, and pushing practical features into real products. 
                  Still love understanding how systems fit together, from backend design to deployment.
                  <br /> <br />
                  <strong>Backend by trade, full-stack by passion.</strong>
                </p>

                {/* role tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  <div className="bg-blue-500/10 text-blue-400 rounded-full px-3.5 py-1.5 text-sm font-bold select-none cursor-pointer transition-all duration-150 hover:bg-blue-500/20">Full Stack</div>
                  <div className="bg-red-500/10    text-red-400    rounded-full px-3.5 py-1.5 text-sm font-bold select-none cursor-pointer transition-all duration-150 hover:bg-red-500/20">Backend</div>
                  <div className="bg-yellow-500/10   text-yellow-400   rounded-full px-3.5 py-1.5 text-sm font-bold select-none cursor-pointer transition-all duration-150 hover:bg-yellow-500/20">Next.js</div>
                  <div className="bg-purple-500/10 text-purple-400 rounded-full px-3.5 py-1.5 text-sm font-bold select-none cursor-pointer transition-all duration-150 hover:bg-purple-500/20">React</div>
                  <div className="bg-green-500/10  text-green-400  rounded-full px-3.5 py-1.5 text-sm font-bold select-none cursor-pointer transition-all duration-150 hover:bg-green-500/20">AI / ML</div>
                </div>
              </section>

              {/* ── GitHub Contributions ───────────────────── */}
              <section id="contributions" className="mt-14 scroll-mt-24">
                <p className="text-2xl font-bold select-none mb-4">Contributions</p>
                <Suspense fallback={<CommitsSkeleton />}>
                  <GithubCommits />
                </Suspense>
              </section>

              {/* ── Quote rotator (client-only, lazy) ──────── */}
              <QuoteRotatorWrapper />

              {/* ── Experience ─────────────────────────────── */}
              <section id="experience" className="mt-14 scroll-mt-24">
                <p className="text-2xl font-bold select-none mb-5">Experience</p>
                <Suspense fallback={<ExperienceSkeleton />}>
                  <ExperienceTimeline />
                </Suspense>
              </section>

              {/* ── Skills (grouped) ──────────────────────── */}
              <section id="skills" className="mt-14 scroll-mt-24">
                <p className="text-2xl font-bold select-none mb-6">Skills</p>
                <Suspense fallback={<SkillsSkeleton />}>
                  <SkillGroups groups={skillGroups} />
                </Suspense>
              </section>

              {/* ── Recent Blogs ───────────────────────────── */}
              <section id="blogs" className="mt-14 scroll-mt-24">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-2xl font-bold select-none">Recent Blogs</p>
                  <a
                    href="/v3/blogs"
                    className="text-sm font-mono text-muted hover:text-accent transition-colors select-none"
                  >
                    view all →
                  </a>
                </div>
                <Suspense fallback={<RecentBlogsSkeleton />}>
                  <RecentBlogs />
                </Suspense>
              </section>

              {/* ── Featured Projects ──────────────────────── */}
              <section id="projects" className="mt-14 scroll-mt-24">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-2xl font-bold select-none">Projects</p>
                  <a
                    href="/v3/projects"
                    className="text-sm font-mono text-muted hover:text-accent transition-colors select-none"
                  >
                    view all →
                  </a>
                </div>
                <Suspense fallback={<ProjectsSkeleton />}>
                  <FeaturedProjects />
                </Suspense>
              </section>

            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}



