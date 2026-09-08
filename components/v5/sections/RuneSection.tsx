import FrameScrubSection from '../FrameScrubSection';

/** Section 2 — Anime figures casting green rune magic. 240 frames. Static characters, flowing glyphs. */
export default function RuneSection() {
  return (
    <FrameScrubSection
      framePathPrefix="./sections/section2/frame_"
      totalFrames={240}
      scrollHeight="280vh"
      bgColor="#020806"
    >
      <div className="absolute top-10 right-[5%] z-10 pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.25em] text-emerald-200/50 uppercase">
          02 — Harnessed Energy
        </p>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-[5%] z-10 pointer-events-none max-w-[420px]">
        <div className="relative">
          <div className="absolute -inset-8 bg-black/50 blur-2xl" />
          <div className="relative">
            <h2
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-white"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.95)' }}
            >
              Power, precisely placed.
            </h2>
            <p
              className="mt-4 text-[clamp(0.9rem,1.3vw,1.05rem)] text-white/65 leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,1)' }}
            >
              Closed-loop energy systems tuned to the exact draw of a station — nothing wasted, nothing cold.
            </p>
          </div>
        </div>
      </div>
    </FrameScrubSection>
  );
}
