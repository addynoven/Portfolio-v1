interface SkillGroupProps {
    label: string;
    items: string[];
}

// ── Individual pill ───────────────────────────────────────────
const Pill = ({ name }: { name: string }) => (
    <span
        className="
            inline-flex items-center px-3.5 py-1.5
            rounded-lg text-sm font-mono select-none cursor-default
            border transition-all duration-200
            text-foreground/80
            hover:-translate-y-px hover:border-accent/60 hover:bg-accent/5 hover:text-accent
        "
        style={{
            background: "var(--card)",
            borderColor: "var(--card-border)",
        }}
    >
        {name}
    </span>
);

// ── Group: label + pills ──────────────────────────────────────
const SkillGroup = ({ label, items }: SkillGroupProps) => (
    <div className="flex flex-col gap-3">
        {/* section label */}
        <p
            className="text-sm font-mono tracking-widest uppercase select-none"
            style={{ color: "var(--muted)" }}
        >
            {label}
        </p>

        {/* pills */}
        <div className="flex flex-wrap gap-2">
            {items.map(item => (
                <Pill key={item} name={item} />
            ))}
        </div>
    </div>
);

// ── Main export ───────────────────────────────────────────────
interface SkillGroupsProps {
    groups: SkillGroupProps[];
}

export default function SkillGroups({ groups }: SkillGroupsProps) {
    return (
        <div className="flex flex-col gap-7">
            {groups.map(group => (
                <SkillGroup key={group.label} label={group.label} items={group.items} />
            ))}
        </div>
    );
}


