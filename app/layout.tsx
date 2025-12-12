import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TerminalButton from "@/components/TerminalButton";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SectionTransitionProvider } from "@/components/SectionTransitionContext";
import SectionStairTransition from "@/components/SectionStairTransition";
import Oneko from "@/components/Oneko";
import { CatProvider } from "@/components/CatContext";

import type { Metadata } from "next";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-jetbrainsMono",
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

// Loading screen is controlled via terminal command: 'loading on' or 'loading off'
const SHOW_LOADING_SCREEN = true;

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
						{SHOW_LOADING_SCREEN && <LoadingScreen />}
						<Header />
						<StairTransition />
						<SectionStairTransition />
						<PageTransition>{children}</PageTransition>
						<Footer />
						<TerminalButton />
						<Oneko />
					</SectionTransitionProvider>
					</CatProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
