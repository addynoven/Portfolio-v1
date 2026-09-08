import FrameScrubSection from './FrameScrubSection';

export default function WhaleScrubSection() {
  return (
    <FrameScrubSection
      framePathPrefix="./sections/whale/frame_"
      totalFrames={180}
      framesStep={2}
      padLength={4}
      scrollHeight="300vh"
      bgColor="#020d1a"
    >
      {/* Label top-left */}
      <div className="absolute top-10 left-[5%] z-10 pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[#4fc3f7] uppercase">
          Distributed Systems & Architecture
        </p>
      </div>

      {/* Headline with dark scrim for readability over bright glow */}
      <div className="absolute bottom-[12%] left-0 z-10 pointer-events-none w-full">
        <div className="relative left-[5%] max-w-[560px]">
          <div className="absolute -inset-6 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-sm blur-sm" />
          <div className="relative">
            <h2
              className="text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)' }}
            >
              Scale That<br />Defies Failure
            </h2>
            <p
              className="mt-4 text-[clamp(0.9rem,1.4vw,1.1rem)] text-white/70 leading-relaxed max-w-[420px]"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,1)' }}
            >
              High-concurrency backends, low-latency telemetry pipelines, and resilient modular monoliths engineered for zero dropped frames.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-[5%] z-10 pointer-events-none flex items-center gap-3">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</p>
        <div className="w-8 h-[1px] bg-white/20" />
      </div>
    </FrameScrubSection>
  );
}
