import { GALLERY } from "@/app/v3/constants";

export default function FeaturedArt() {
    // Show up to 4 preview pieces
    const previewPieces = GALLERY.slice(0, 4);

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previewPieces.map((piece, i) => (
                    <div
                        key={i}
                        className="group relative overflow-hidden rounded-xl bg-foreground/5 aspect-square"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={piece.src}
                            alt={piece.title}
                            loading="lazy"
                            draggable={false}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.04]"
                        />
                        <div
                            className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
                        >
                            <p className="text-white text-xs font-bold truncate leading-tight">{piece.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function FeaturedArtSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-foreground/8 aspect-square" />
            ))}
        </div>
    );
}



