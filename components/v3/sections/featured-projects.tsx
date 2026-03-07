import { projects } from "@/app/v3/constants";
import { Icons } from "@/components/v3/ui/icons";

export default function FeaturedProjects() {
    // Show up to 4 projects
    const featuredProjects = projects.slice(0, 4);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
                <div
                    key={project.name}
                    className="group flex flex-col p-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent"
                    style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
                >
                    {/* header row — name + wip + stars */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                        <p className="text-base font-bold font-mono group-hover:text-accent transition-colors duration-200">
                            {project.name}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                            {project.wip && (
                                <span className="text-sm font-mono px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 select-none">
                                    WIP
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-sm font-mono opacity-75">
                                <Icons.Star className="w-4 h-4" /> {project.stars}
                            </span>
                        </div>
                    </div>

                    {/* description */}
                    <p className="text-sm font-mono leading-relaxed opacity-75 flex-1 mb-4">
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
            ))}
        </div>
    );
}



