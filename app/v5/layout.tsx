import type { Metadata } from "next";
import "./globals.css";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export const metadata: Metadata = {
  title: "Aditya Sahu — Design Engineer & Distributed Systems Designer",
  description:
    "A scroll-driven cinematic portfolio for Aditya Sahu (@addynoven), Full-Stack Developer and Pragmatic Backend System Designer. Showcasing GreatUI, Ping, DropX, and distributed architecture.",
  openGraph: {
    title: "Aditya Sahu — Design Engineer & Systems Portfolio (V5)",
    description:
      "A scroll-driven cinematic portfolio where every scroll frame is a rendered moment.",
    type: "website",
  },
};

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v5-root min-h-screen bg-[#050505] text-white selection:bg-[#ff4fd8]/30 selection:text-white">
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
        <VersionSwitcher className="bg-black/70 backdrop-blur-md rounded-xl p-1 border border-white/10 shadow-2xl" />
      </div>
    </div>
  );
}
