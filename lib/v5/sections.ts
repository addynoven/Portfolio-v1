export interface SectionTheme {
  bg: string;
  accent: string;
  textMuted: string;
}

export type SectionVariant = 'cinematic' | 'poster' | 'spotlight';

export interface SectionConfig {
  id: string;
  folder: string;
  frames: number;
  padLength: number;
  scrollHeight: string;
  zoom: number;
  /** Number of times the frame clip cycles across the section scroll. Default 1. */
  loops?: number;
  /** Display every Nth source frame. Use >1 to subsample dense clips to save bandwidth & memory. */
  framesStep?: number;
  /** File extension on disk (no dot). Default 'jpg'. */
  extension?: string;
  variant: SectionVariant;
  theme: SectionTheme;
  eyebrow: string;
  heading: string;
  /** Used only for `poster` variant — split-line support for dramatic enters */
  headingLines?: [string, string];
  paragraph: string;
  cursorLabel: string;
  /** Optional pull-quote shown on the interstitial that follows this section */
  pullQuote?: string;
}

const MIN_VH = 220;
const MAX_VH = 800;
const FRAMES_PER_VH = 0.55;

const computeScrollHeight = (frames: number, step = 1, loops = 1): string => {
  const effective = Math.ceil(frames / step) * loops;
  const ideal = effective / FRAMES_PER_VH;
  const clamped = Math.max(MIN_VH, Math.min(MAX_VH, Math.round(ideal)));
  return `${clamped}vh`;
};

export const SECTIONS: SectionConfig[] = [
  {
    id: 'great-ui',
    folder: 'section1',
    frames: 501,
    framesStep: 3, // 167 effective frames preloaded (67% bandwidth saved)
    padLength: 4,
    extension: 'avif',
    scrollHeight: computeScrollHeight(501, 3),
    zoom: 1.15,
    variant: 'cinematic',
    theme: { bg: '#0a0418', accent: '#3dffa7', textMuted: 'rgba(255,255,255,0.6)' },
    eyebrow: '01 — Design Engineering',
    heading: 'GreatUI Component Ecosystem',
    paragraph:
      'Accessible, high-contrast React 19 component ecosystem. Engineered with Tailwind CSS, custom CSS variable compilation, and zero-layout-shift primitives. 2.4k+ stars, 48+ primitives.',
    cursorLabel: 'GREATUI',
    pullQuote: 'Craft is what happens when velocity meets uncompromising precision.',
  },
  {
    id: 'ping',
    folder: 'section2',
    frames: 501,
    framesStep: 3, // 167 effective frames preloaded
    padLength: 4,
    extension: 'avif',
    scrollHeight: computeScrollHeight(501, 3),
    zoom: 1.1,
    variant: 'poster',
    theme: { bg: '#0c0606', accent: '#ff4fd8', textMuted: 'rgba(255,255,255,0.55)' },
    eyebrow: '02 — Distributed Systems',
    heading: 'Ping: Edge Telemetry Engine',
    headingLines: ['Ping: Edge', 'Telemetry'],
    paragraph:
      'Distributed latency monitoring daemon written in Go with Redis Pub/Sub cluster fan-out and real-time streaming WebSockets across 14 edge regions. P99 latency < 12ms under heavy load.',
    cursorLabel: 'TELEMETRY',
    pullQuote: 'Build systems you can reason about under pressure.',
  },
  {
    id: 'dropx',
    folder: 'section3',
    frames: 501,
    framesStep: 3, // 167 effective frames preloaded
    padLength: 4,
    extension: 'avif',
    scrollHeight: computeScrollHeight(501, 3),
    zoom: 1.02,
    variant: 'spotlight',
    theme: { bg: '#050a0f', accent: '#7ad9ff', textMuted: 'rgba(255,255,255,0.55)' },
    eyebrow: '03 — Networking & P2P',
    heading: 'DropX: Encrypted P2P Exchange',
    paragraph:
      'Direct browser-to-browser encrypted media exchange pipeline over WebRTC data channels. Hardware-accelerated client chunking with Web Workers and ChaCha20 encryption. Zero cloud storage required.',
    cursorLabel: 'STREAM',
    pullQuote: 'The fastest database is the one you never have to store.',
  },
  {
    id: 'modular-monolith',
    folder: 'section4',
    frames: 241,
    framesStep: 2, // 121 effective frames preloaded
    padLength: 4,
    extension: 'avif',
    scrollHeight: computeScrollHeight(241, 2, 2),
    zoom: 1.1,
    loops: 2,
    variant: 'cinematic',
    theme: { bg: '#1a0824', accent: '#ffb347', textMuted: 'rgba(255,255,255,0.65)' },
    eyebrow: '04 — Architecture Philosophy',
    heading: 'Feature-Driven Modular Monolith',
    paragraph:
      'Clarity over cleverness. Domain co-location over fragmented top-level layers. Self-contained feature modules, black-box integration-first test suites, and predictable boundary design.',
    cursorLabel: 'SYSTEMS',
    pullQuote: 'If something fails, I find it HERE — not scattered across 100 files.',
  },
  {
    id: 'telemetry-benchmark',
    folder: 'section5',
    frames: 501,
    framesStep: 3, // 167 effective frames preloaded
    padLength: 4,
    extension: 'avif',
    scrollHeight: computeScrollHeight(501, 3),
    zoom: 1.05,
    variant: 'spotlight',
    theme: { bg: '#0a141c', accent: '#ffd58a', textMuted: 'rgba(255,255,255,0.65)' },
    eyebrow: '05 — Production Benchmarks',
    heading: 'PostgreSQL JSONB vs Redis Hashes',
    paragraph:
      'Empirical telemetry caching benchmarks under high concurrent writes. Reduced connection churn by pooling WebSocket clients through Go channel multiplexers and sub-millisecond query planning.',
    cursorLabel: 'BENCHMARK',
  },
];
