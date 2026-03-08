import type { Metadata } from "next";
import { JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/v3/layout/navbar";
import Footer from "@/components/v3/layout/footer";
import { ThemeProvider } from "@/lib/v3/theme";
import ThunderRootBg from "@/components/v3/layout/thunder-root-bg";
import { METADATA } from "@/app/v3/constants";
import { LanguageProvider } from "@/context/v3/language-context";
import { LenisProvider } from "@/components/v3/lenis-provider";
import MusicWrapper from "@/components/v3/layout/music-wrapper";

/* ── Fonts ── */
const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrainsMono",
	display: "swap",
});

const caveat = Caveat({
	subsets: ["latin"],
	variable: "--font-caveat",
	display: "swap",
});

export const metadata: Metadata = {
	title: `${METADATA.name} — Portfolio`,
	description: METADATA.ogDescription.en,
	openGraph: {
		title: METADATA.name,
		description: METADATA.ogDescription.en,
		type: "website",
		images: [
			{
				url: "/v3/images/og-main.png",
				width: 1200,
				height: 630,
				alt: `${METADATA.name} Portfolio Banner`,
			},
		],
	},
	icons: {
		icon: [
			{
				url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%234ade80"><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/></circle></svg>',
				type: "image/svg+xml",
			},
		],
	},
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${jetbrainsMono.variable} ${caveat.variable} min-h-screen bg-background text-foreground font-sans selection:bg-accent/30`}
		>
			<ThemeProvider>
				<LanguageProvider>
					<MusicWrapper>
						<LenisProvider>
							<div className="relative z-10 bg-background">
								<Navbar />
								<ThunderRootBg className="!fixed !inset-0 !w-screen !h-screen z-0 pointer-events-none" />
								<main className="flex-1 relative z-[1] bg-transparent">
									{children}
								</main>
								<Footer />
							</div>
						</LenisProvider>
					</MusicWrapper>
				</LanguageProvider>
			</ThemeProvider>
		</div>
	);
}
