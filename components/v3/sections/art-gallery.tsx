"use client";

import { GALLERY } from "@/app/v3/constants";
import { useCallback, useEffect, useState, useRef } from "react";
import Skeleton from "@/components/v3/ui/skeleton";
import { Icons } from "@/components/v3/ui/icons";

interface Piece {
    src: string;
    title: string;
    medium: string;
    year: string;
}

/* ── Gallery Image with lazy-load state ─────────────────────── */
function GalleryImage({ piece, onClick }: { piece: Piece; onClick: () => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // If the image is already in browser cache, it might not fire the onLoad event
    // after React attaches the event listener. Check it manually on mount.
    useEffect(() => {
        if (imgRef.current?.complete && imgRef.current.naturalHeight > 0) {
            setIsLoading(false);
        }
    }, [piece.src]);

    return (
        <div
            className="break-inside-avoid mb-3 group relative overflow-hidden rounded-xl cursor-pointer bg-foreground/5 select-none min-h-[120px]"
            onContextMenu={(e) => e.preventDefault()}
            onClick={onClick}
        >
            {/* Wait to remove skeleton until not loading. */}
            {isLoading && (
                <div className="absolute inset-0 z-10 w-full h-full animate-pulse bg-foreground/5 rounded-xl" />
            )}

            {!isError ? (
                <img
                    ref={imgRef}
                    src={piece.src}
                    alt={piece.title}
                    loading="lazy"
                    draggable={false}
                    className={`w-full object-cover transition-all duration-500 group-hover:scale-[1.04] ${isLoading ? "opacity-0" : "opacity-100 h-auto"}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => { setIsLoading(false); setIsError(true); }}
                />
            ) : (
                <div className="w-full min-h-[120px] flex items-center justify-center text-foreground/20 italic text-xs">
                    Failed to load
                </div>
            )}

            {!isLoading && !isError && (
                <div
                    className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}
                >
                    <p className="text-white text-sm font-bold leading-tight select-none">{piece.title}</p>
                    <p className="text-white/60 text-[11px] font-mono select-none">
                        {piece.medium} · {piece.year}
                    </p>
                </div>
            )}
        </div>
    );
}

/* ── Lightbox ────────────────────────────────────────────────── */
function Lightbox({
    piece, index, total, onClose, onPrev, onNext,
}: {
    piece: Piece; index: number; total: number;
    onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setIsLoading(true);
        if (imgRef.current?.complete && imgRef.current.naturalHeight > 0) {
            setIsLoading(false);
        }
    }, [piece.src]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handler);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handler);
        };
    }, [onClose, onNext, onPrev]);

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
            onContextMenu={(e) => e.preventDefault()}
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-101"
                aria-label="Close"
            >
                <Icons.Close className="w-5 h-5" />
            </button>

            <div className="absolute top-5 left-5 text-xs font-mono text-white/40 select-none">
                {index + 1} / {total}
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-3 sm:left-6 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-101"
                aria-label="Previous"
            >
                <Icons.ChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-3 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-101"
                aria-label="Next"
            >
                <Icons.ChevronRight className="w-5 h-5" />
            </button>

            <div
                className="flex flex-col items-center gap-4 max-w-4xl p-10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full flex justify-center">
                    {isLoading && <div className="absolute inset-0 w-full max-w-lg aspect-3/4 animate-pulse bg-foreground/5 rounded-xl m-auto" />}
                    <img
                        ref={imgRef}
                        src={piece.src}
                        alt={piece.title}
                        className={`max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl transition-opacity duration-300 select-none ${isLoading ? "opacity-0 invisible" : "opacity-100"}`}
                        draggable={false}
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
                <div className="text-center select-none">
                    <p className="text-white font-bold text-lg leading-tight">{piece.title}</p>
                    <p className="text-white/40 text-sm font-mono mt-1">
                        {piece.medium} · {piece.year}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Gallery client shell ────────────────────────────────────── */
export default function ArtGallery() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const open = (i: number) => setSelectedIdx(i);
    const close = useCallback(() => setSelectedIdx(null), []);
    const prev = useCallback(
        () => setSelectedIdx((i) => (i !== null ? (i - 1 + GALLERY.length) % GALLERY.length : 0)),
        []
    );
    const next = useCallback(
        () => setSelectedIdx((i) => (i !== null ? (i + 1) % GALLERY.length : 0)),
        []
    );

    return (
        <>
            {/* Masonry grid via CSS columns */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                {GALLERY.map((piece, i) => (
                    <GalleryImage key={i} piece={piece} onClick={() => open(i)} />
                ))}
            </div>

            {/* Lightbox */}
            {selectedIdx !== null && (
                <Lightbox
                    piece={GALLERY[selectedIdx]}
                    index={selectedIdx}
                    total={GALLERY.length}
                    onClose={close}
                    onPrev={prev}
                    onNext={next}
                />
            )}
        </>
    );
}



