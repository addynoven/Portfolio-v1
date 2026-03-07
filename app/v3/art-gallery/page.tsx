import { Suspense } from "react";
import type { Metadata } from "next";
import ArtGallery from "@/components/v3/sections/art-gallery";
import { GALLERY } from "@/app/v3/constants";

export const metadata: Metadata = {
    title: "Art Gallery — Aditya",
    description: "Digital art, sketches and creative experiments.",
};

/* ── Masonry skeleton shown while ArtGallery hydrates ───────── */
function GallerySkeleton() {
    // Simulate the masonry column layout
    const fakePieces = [
        "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]",
        "aspect-[5/4]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]",
        "aspect-[3/4]", "aspect-square", "aspect-[5/4]", "aspect-[3/4]",
    ];

    return (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 animate-pulse">
            {fakePieces.map((aspect, i) => (
                <div
                    key={i}
                    className={`break-inside-avoid mb-3 rounded-xl ${aspect}`}
                    style={{ background: "var(--c0)" }}
                />
            ))}
        </div>
    );
}

/* ── Page (Server Component) ─────────────────────────────────── */
export default function ArtPage() {
    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-24">
            {/* Header — rendered immediately, no waiting */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold">Art Gallery</h1>
                <p className="text-base font-mono mt-1" style={{ color: "var(--muted)" }}>
                    digital art · sketches · experiments ·{" "}
                    <span>{GALLERY.length} pieces</span>
                </p>
            </div>

            {/* Gallery streams in behind a suspense boundary */}
            <Suspense fallback={<GallerySkeleton />}>
                <ArtGallery />
            </Suspense>
        </main>
    );
}



