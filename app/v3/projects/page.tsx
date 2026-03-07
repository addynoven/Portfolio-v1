import Link from "next/link";
import Image from "next/image";
import { projects } from "@/app/v3/constants";
import { Icons } from "@/components/v3/ui/icons";

/* ─────────────────────────────────────────────────────────────
   PLACEHOLDER — shown when projects array is empty
───────────────────────────────────────────────────────────── */
function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl select-none"
                style={{ background: "var(--card)", border: "1px dashed var(--card-border)" }}
            >
                <span className="font-mono" style={{ color: "var(--accent)" }}>_</span>
            </div>
            <p className="text-lg font-bold mb-2">Nothing here yet</p>
            <p className="text-base font-mono opacity-65 max-w-xs leading-relaxed">
                Projects are being built in the dark. Check back soon or watch GitHub for updates.
            </p>
            <a
                href="https://github.com/addynoven"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono transition-all duration-150 hover:-translate-y-px"
                style={{ background: "var(--card)", border: "1px solid var(--card-border)", color: "var(--muted)" }}
            >
                <Icons.GitHub className="w-4 h-4" />
                @addynoven
            </a>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   SKELETON CARD
───────────────────────────────────────────────────────────── */
function SkeletonCard() {
    return (
        <div
            className="rounded-2xl overflow-hidden animate-pulse"
            style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
        >
            <div className="h-48 w-full" style={{ background: "var(--c0)" }} />
            <div className="p-5">
                <div className="h-4 w-1/2 rounded-full mb-3" style={{ background: "var(--c0)" }} />
                <div className="h-3 w-3/4 rounded-full mb-2" style={{ background: "var(--c0)" }} />
                <div className="h-3 w-2/3 rounded-full" style={{ background: "var(--c0)" }} />
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: typeof projects[0] }) {
    // Image click priority: live site → github repo → no link at all
    const imageHref = project.liveUrl || project.repoUrl || null;

    // Shared inner content for the image thumbnail
    const imageInner = (
        <>
            <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            {/* top-right badges */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
                {project.wip && (
                    <span className="text-sm font-mono font-semibold px-2.5 py-0.5 rounded-full select-none bg-yellow-500/90 text-yellow-950">
                        WIP
                    </span>
                )}
                <span
                    className="text-sm font-mono px-2.5 py-0.5 rounded-full select-none"
                    style={{ background: "var(--accent)", color: "var(--card)" }}
                >
                    {project.category}
                </span>
            </div>

            {/* star count bottom-left */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-sm font-mono">
                <Icons.Star className="w-4 h-4 text-yellow-400" />
                <span>{project.stars}</span>
            </div>
        </>
    );

    const thumbClass = "relative h-48 w-full overflow-hidden";
    const thumbStyle = { background: "var(--c0)" };

    return (
        <div
            className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
        >
            {/* ── Thumbnail — liveUrl → repoUrl → non-clickable ── */}
            {imageHref ? (
                <a
                    href={imageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${thumbClass} block cursor-pointer`}
                    style={thumbStyle}
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    {imageInner}
                </a>
            ) : (
                <div className={thumbClass} style={thumbStyle}>
                    {imageInner}
                </div>
            )}

            {/* ── Card Body ── */}
            <div className="flex flex-col flex-1 p-5">
                {/* title */}
                <p className="text-base font-bold font-mono mb-2.5 group-hover:text-accent transition-colors duration-200">
                    {project.name}
                </p>

                {/* description */}
                <p className="text-sm font-mono leading-relaxed flex-1 opacity-75 mb-4">
                    {project.description}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-sm font-mono px-2.5 py-0.5 rounded-full select-none"
                            style={{ background: "var(--c0)", color: "var(--muted)" }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* ── Action buttons ── */}
                <div
                    className="flex items-center gap-2 pt-4"
                    style={{ borderTop: "1px solid var(--card-border)" }}
                >
                    {/* GitHub */}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-mono transition-all duration-150 hover:-translate-y-px hover:text-accent hover:border-accent/40"
                            style={{
                                background: "var(--c0)",
                                border: "1px solid var(--card-border)",
                                color: "var(--muted)",
                            }}
                        >
                            <Icons.GitHub className="w-4 h-4 shrink-0" />
                            GitHub
                        </a>
                    )}

                    {/* Live View */}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-mono transition-all duration-150 hover:-translate-y-px"
                            style={{
                                background: "var(--accent)",
                                border: "1px solid transparent",
                                color: "var(--card)",
                            }}
                        >
                            <Icons.External className="w-4 h-4 shrink-0" />
                            Live View
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export const metadata = {
    title: "Projects — Aditya",
    description: "A collection of things I've built — CLI tools, web apps, backend services and more.",
};

export default function ProjectsPage() {
    const hasProjects = projects.length > 0;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-24">

            {/* ── Header ── */}
            <div className="mb-10">
                {/* breadcrumb */}
                <div className="flex items-center gap-2 text-sm font-mono mb-4">
                    <Link href="/v3" className="opacity-65 hover:opacity-90 transition-opacity">home</Link>
                    <span className="opacity-65">/</span>
                    <span className="opacity-65">projects</span>
                </div>

                <h1 className="text-4xl font-bold mb-2">Projects</h1>
                <p className="text-base font-mono opacity-70">
                    Things I&apos;ve built — tools, services, experiments.
                </p>

                {/* stats row */}
                <div className="flex items-center gap-6 mt-5">
                    <div className="flex items-center gap-1.5 text-sm font-mono opacity-75">
                        <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
                        {projects.length} project{projects.length !== 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-mono opacity-60">
                        <Icons.Star className="w-4 h-4 text-yellow-400" />
                        {projects.reduce((acc, p) => acc + p.stars, 0)} total stars
                    </div>
                    {projects.some(p => p.wip) && (
                        <div className="flex items-center gap-1.5 text-sm font-mono opacity-75">
                            <span className="w-2 h-2 rounded-full bg-yellow-400" />
                            {projects.filter(p => p.wip).length} in progress
                        </div>
                    )}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="mb-8" style={{ borderTop: "1px solid var(--card-border)" }} />

            {/* ── Grid or Empty ── */}
            {hasProjects ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </div>
            ) : (
                <>
                    {/* skeleton placeholders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {[0, 1, 2].map(i => <SkeletonCard key={i} />)}
                    </div>
                    <EmptyState />
                </>
            )}

            {/* ── Footer CTA ── */}
            {hasProjects && (
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
                    style={{ borderTop: "1px solid var(--card-border)" }}>
                    <p className="text-base font-mono opacity-65">
                        More open-source work on GitHub →
                    </p>
                    <a
                        href="https://github.com/addynoven"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono transition-all duration-150 hover:-translate-y-px"
                        style={{ background: "var(--card)", border: "1px solid var(--card-border)", color: "var(--muted)" }}
                    >
                        <Icons.GitHub className="w-4 h-4" />
                        @addynoven
                    </a>
                </div>
            )}
        </div>
    );
}



