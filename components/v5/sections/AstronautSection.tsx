import FrameScrubSection from '../FrameScrubSection';

/** Section 1 — Astronaut floating in a neon galactic ocean. 672 frames, slow meditative drift. */
export default function AstronautSection() {
  return (
    <FrameScrubSection
      framePathPrefix="./sections/section1/frame_"
      totalFrames={672}
      scrollHeight="500vh"
      bgColor="#0a0514"
    >
      <div className="absolute top-10 left-[5%] z-10 pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
          01 — The Human Element
        </p>
      </div>

      <div className="absolute bottom-[14%] left-0 z-10 pointer-events-none w-full">
        <div className="relative left-[5%] max-w-[640px]">
          <div className="absolute -inset-6 bg-gradient-to-r from-black/60 via-black/30 to-transparent blur-sm" />
          <div className="relative">
            <h2
              className="text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-tight text-white"
              style={{ textShadow: '0 2px 28px rgba(0,0,0,0.85)' }}
            >
              Beyond<br />The Atmosphere
            </h2>
            <p
              className="mt-5 text-[clamp(0.95rem,1.3vw,1.1rem)] text-white/70 leading-relaxed max-w-[460px]"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.95)' }}
            >
              Every mission begins with a person. We design habitats that remember who they're built for.
            </p>
          </div>
        </div>
      </div>
    </FrameScrubSection>
  );
}
