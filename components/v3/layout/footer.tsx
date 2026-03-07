import Link from "next/link";
import { socials } from "@/app/v3/constants";
import { Icons } from "@/components/v3/ui/icons";
import { VersionSwitcher } from "@/components/VersionSwitcher";

const PAGES = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blog" },
    { href: "/art-gallery", label: "Art Gallery" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-24 w-full max-w-5xl mx-auto sm:px-0">
            {/* gradient fade from page bg into footer */}
            <div className="absolute -top-16 left-0 right-0 h-16 pointer-events-none" />

            <div className="rounded-2xl bg-card border border-card-border shadow-sm mb-10 overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 py-12">

                    {/* ── Main row ──────────────────────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

                        {/* Brand */}
                        <div className="col-span-1">
                            <p className="text-2xl font-bold font-mono" style={{ color: "var(--accent)" }}>
                                Aditya
                            </p>
                            {/* <p className="text-base font-mono mt-2 leading-relaxed opacity-70">
                                Backend-focused developer from India.
                                I build systems that are clean, fast, and built to last.
                                Linux, DevOps, and low-level engineering.
                            </p> */}
                            <p className="text-base font-mono mt-2 leading-relaxed opacity-70">
                                Full stack developer from India 🇮🇳.
                                <br />
                                Building efficient backend systems and elegant frontend interfaces.
                            </p>

                            {/* status dot */}
                            <div className="flex items-center gap-2 mt-4">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-mono opacity-70">
                                    open to opportunities
                                </span>
                            </div>
                        </div>

                        {/* Pages */}
                        <div>
                            <p className="text-sm font-mono tracking-widest uppercase mb-4 select-none"
                                style={{ color: "var(--muted)" }}>
                                Pages
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                {PAGES.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="text-base font-mono opacity-65 hover:opacity-100 transition-opacity duration-150 hover:text-accent"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <p className="text-sm font-mono tracking-widest uppercase mb-4 select-none"
                                style={{ color: "var(--muted)" }}>
                                Connect
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                {socials.map(({ platform, handle, url }) => {
                                    const Icon = Icons[platform as keyof typeof Icons];
                                    return (
                                        <li key={platform}>
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-2.5 text-base font-mono opacity-65 hover:opacity-100 transition-all duration-150"
                                            >
                                                <span className="group-hover:text-accent transition-colors">
                                                    {Icon && <Icon className="w-4 h-4" />}
                                                </span>
                                                <span className="group-hover:text-accent transition-colors">
                                                    {handle}
                                                </span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* ── Bottom bar ────────────────────── */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6"
                        style={{ borderTop: "1px solid var(--card-border)" }}
                    >
                        <p className="text-sm font-mono select-none" style={{ color: "var(--muted)" }}>
                            © {year} Aditya · All rights reserved
                        </p>

                        <p className="text-sm font-mono select-none" style={{ color: "var(--muted)" }}>
                            Built with{" "}
                            <span style={{ color: "var(--accent)", cursor: "pointer" }}>Next.js</span>
                            {" · "}TypeScript{" · "}Tailwind CSS
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <VersionSwitcher />
                    </div>

                </div>
            </div>
        </footer>
    );
}



