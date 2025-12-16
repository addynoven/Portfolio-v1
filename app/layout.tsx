import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
// Header and Footer are now imported in LayoutWrapper, but we need to remove them from here if they are not used.
// Actually, LayoutWrapper is a default export, let's import it.
import LayoutWrapper from "@/components/LayoutWrapper";
// import Header from "@/components/Header"; // Moved to LayoutWrapper
// import Footer from "@/components/Footer"; // Moved to LayoutWrapper
import TerminalButton from "@/components/TerminalButton";
import LoadingScreenWrapper from "@/components/LoadingScreenWrapper";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SectionTransitionProvider } from "@/components/SectionTransitionContext";
import SectionStairTransition from "@/components/SectionStairTransition";
import Oneko from "@/components/Oneko";
import { CatProvider } from "@/components/CatContext";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { RetroGrid } from "@/components/ui/retro-grid";

import type { Metadata, Viewport } from "next";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-jetbrainsMono",
	display: "swap", // Prevent FOIT (Flash of Invisible Text)
	preload: true,
});

export const metadata: Metadata = {
	title: "Aditya Sahu | Full Stack Developer Portfolio",
	description: "Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered solutions. View my projects and get in touch for collaboration.",
	keywords: ["Full Stack Developer", "React Developer", "Next.js", "Node.js", "MERN Stack", "Web Developer", "Portfolio", "Aditya Sahu", "Neon Stain"],
	authors: [{ name: "Aditya Sahu", url: "https://github.com/addynoven" }],
	creator: "Aditya Sahu",
	openGraph: {
		type: "website",
		locale: "en_US",
		title: "Aditya Sahu | Full Stack Developer Portfolio",
		description: "Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered solutions.",
		siteName: "Neon Stain Portfolio",
		images: [
			{
				url: "/photo.jpg",
				width: 1200,
				height: 630,
				alt: "Aditya Sahu - Full Stack Developer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Aditya Sahu | Full Stack Developer Portfolio",
		description: "Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered solutions.",
		creator: "@addynoven",
		images: ["/photo.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

// Viewport configuration for better mobile performance
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

// Loading screen visibility is controlled via terminal command: 'loading on' or 'loading off'
// The LoadingScreen component reads from localStorage to determine if it should show

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={jetbrainsMono.variable}>
					<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<CatProvider>
					<SectionTransitionProvider>
					<RetroGrid 
						angle={65}
						cellSize={60}
						opacity={0.4}
						lightLineColor="rgba(0, 255, 153, 0.15)"
						darkLineColor="rgba(0, 255, 153, 0.2)"
					/>
						<LoadingScreenWrapper />
						<LayoutWrapper>
							<StairTransition />
							<SectionStairTransition />
							<PageTransition>{children}</PageTransition>
						</LayoutWrapper>
						<TerminalButton />
						<Oneko />
					</SectionTransitionProvider>
					</CatProvider>
				</ThemeProvider>
				<ServiceWorkerRegistration />
			</body>
		</html>
	);
}
