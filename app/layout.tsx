import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import type { Metadata, Viewport } from "next";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-jetbrainsMono",
	display: "swap",
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
					{children}
				</ThemeProvider>
				<ServiceWorkerRegistration />
			</body>
		</html>
	);
}
