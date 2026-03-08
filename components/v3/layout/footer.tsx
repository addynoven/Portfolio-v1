"use client";

import Link from "next/link";
import { socials, METADATA } from "@/app/v3/constants";
import { Icons } from "@/components/v3/ui/icons";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { useLanguage } from "@/context/v3/language-context";
import FooterAnimation from "./footer-animation";

const PAGES = [
	{ href: "/", label: { en: "Home", jp: "ホーム" } },
	{ href: "/v3/projects", label: { en: "Projects", jp: "プロジェクト" } },
	{ href: "/v3/blogs", label: { en: "Blog", jp: "ブログ" } },
];

export default function Footer() {
	const year = new Date().getFullYear();
	const { t, language } = useLanguage();

	return (
		<footer className="relative mt-24 mb-0 max-w-5xl mx-auto px-4 sm:px-6">
			{/* gradient fade from page bg into footer */}
			<div className="absolute -top-16 left-0 right-0 h-16 pointer-events-none" />

			<div
				className="bg-card border p-1"
				style={{
					borderColor: "var(--v3-card-border)",
					borderRadius: "var(--card-radius)",
					borderStyle: "dashed",
				}}
			>
				<div className="max-w-5xl mx-auto px-6 py-12">
					{/* ── Main row ──────────────────────── */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
						{/* Brand */}
						<div className="col-span-1">
							<div className="flex justify-start">
								<FooterAnimation />
							</div>
							<p className="text-base font-mono mt-2 leading-relaxed opacity-70 whitespace-pre-line">
								{t(METADATA.footerBio)}
							</p>
						</div>

						{/* Pages */}
						<div>
							<p
								className="text-sm font-mono tracking-widest uppercase mb-4 select-none"
								style={{ color: "var(--v3-muted)" }}
							>
								{language === "jp" ? "ページ" : "Pages"}
							</p>
							<ul className="flex flex-col gap-2.5">
								{PAGES.map(({ href, label }) => (
									<li key={href}>
										<Link
											href={href}
											className="text-base font-mono opacity-65 hover:opacity-100 transition-opacity duration-150 hover:text-accent"
										>
											{t(label)}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Connect */}
						<div>
							<p
								className="text-sm font-mono tracking-widest uppercase mb-4 select-none"
								style={{ color: "var(--v3-muted)" }}
							>
								{language === "jp" ? "つながる" : "Connect"}
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
						style={{ borderTop: "1px solid var(--v3-card-border)" }}
					>
						<p
							className="text-sm font-mono select-none"
							style={{ color: "var(--v3-muted)" }}
						>
							© {year} {t(METADATA.name)} · All rights reserved
						</p>

							<VersionSwitcher />
					</div>
				</div>
			</div>
		</footer>
	);
}
