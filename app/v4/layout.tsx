import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { V4ThemeProvider } from "@/lib/v4/theme";
import { Navbar } from "@/components/v4/layout/navbar";
import { FloatingDock } from "@/components/v4/layout/floating-dock";
import { Footer } from "@/components/v4/layout/footer";
import V4ThemeTransitionOverlay from "@/components/v4/ui/theme-transition-overlay";
import { PROFILE } from "@/lib/v4/constants";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.tagline}`,
  description: PROFILE.heroBio,
  openGraph: {
    title: `${PROFILE.name} — Portfolio V4`,
    description: PROFILE.heroBio,
    type: "website",
  },
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} font-sans min-h-screen selection:bg-[var(--surface-container-high)] selection:text-[var(--primary)]`}
    >
      <V4ThemeProvider>
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 sm:px-0 py-4 sm:py-6 gap-4">
          <Navbar />
          <main className="flex flex-1 flex-col gap-4 w-full">
            {children}
          </main>
          <Footer />
        </div>
        <FloatingDock />
        <V4ThemeTransitionOverlay />
      </V4ThemeProvider>
    </div>
  );
}
