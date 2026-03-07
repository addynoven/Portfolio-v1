import { experience } from "@/app/v3/constants";

function Tag({ label }: { label: string }) {
    return (
        <span className="text-sm font-mono px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 select-none cursor-pointer">
            {label}
        </span>
    );
}

export default function ExperienceTimeline() {
    return (
        <div className="flex flex-col gap-4">
            {experience.map((item, i) => {
                const isCurrent = item.end === null || item.end === "Present";
                return (
                    <div
                        key={i}
                        className="relative pl-4 rounded-xl p-4 transition-all duration-200 hover:-translate-y-px"
                        style={{
                            background: "var(--card)",
                            border: "1px solid var(--card-border)",
                            borderLeft: "3px solid var(--accent)",
                        }}
                    >
                        {/* header row */}
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                                <p className="text-base font-bold leading-tight">{item.role}</p>
                                <p className="text-sm font-mono mt-0.5" style={{ color: "var(--muted)" }}>
                                    {item.company}
                                    {item.location ? ` · ${item.location}` : ""}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                {isCurrent && (
                                    <span className="flex items-center gap-1.5 text-sm font-mono px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 select-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Current
                                    </span>
                                )}
                                <span className="text-sm font-mono select-none" style={{ color: "var(--muted)" }}>
                                    {item.start} – {item.end ?? "Present"}
                                </span>
                            </div>
                        </div>

                        {/* description */}
                        <p className="text-sm font-mono mt-3 leading-relaxed opacity-80">
                            {item.description}
                        </p>

                        {/* tags */}
                        {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {item.tags.map(tag => <Tag key={tag} label={tag} />)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}



