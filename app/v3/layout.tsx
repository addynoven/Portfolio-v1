import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/v3/layout/navbar";
import Footer from "@/components/v3/layout/footer";
import { ThemeProvider } from "@/lib/v3/theme";

/* ── Fonts (self-hosted by Next.js, preloaded automatically) ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya — Portfolio",
  description: "Software engineer from India. Backend by trade, full-stack by passion.",
  openGraph: {
    title: "Aditya",
    description: "Software engineer from India.",
    type: "website",
  },
  icons: {
    icon: "/v3/images/favicon_io/favicon.ico",
  },
};

export default function V3Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${inter.variable} ${caveat.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}>
      <ThemeProvider>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        {/* <Footer /> */}
      </ThemeProvider>
    </div>
  );
}



