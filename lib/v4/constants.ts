export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "UI/UX" | "CLI & Tools" | "Open Source";
  description: string;
  detailedDescription?: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  heroImage?: string;
  stats?: { label: string; value: string }[];
  features?: string[];
  featured?: boolean;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: "Navigation" | "Animation" | "Cards & Layout" | "Inputs & Effects";
  description: string;
  installCommand: string;
  codeSnippet: string;
  tags: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tableOfContents: { id: string; title: string }[];
  content: string[];
}

export interface PullRequest {
  id: string;
  title: string;
  repo: string;
  url: string;
  date: string;
  status: "merged" | "open";
}

export interface LearningLog {
  id: string;
  number: string;
  title?: string;
  date?: string;
  points: {
    text: string;
    highlight?: string;
    link?: { label: string; url: string };
  }[];
}


export const PROFILE = {
  name: "Aditya Sahu",
  domain: "aditya.dev",
  tagline: "Design Engineer & Full Stack Developer",
  status: "Available for Q3/Q4 engineering roles & consulting",
  heroHeading: "Designing & Engineering Digital Experiences",
  heroBio:
    "Crafting high-velocity web applications, modular system architectures, and pixel-precise interactive UI components with obsessive care for performance and craft.",
  email: "dmcbaditya@gmail.com",
  github: "https://github.com/addynoven",
  twitter: "https://x.com/addynoven",
  linkedin: "https://www.linkedin.com/in/aditya-sahu-34350b193/",
  peerlist: "https://peerlist.io",
  avatar: "/photo.jpg",
};

export const PROJECTS: Project[] = [
  {
    id: "great-ui",
    title: "Great UI",
    subtitle: "Open-source React UI Component Library",
    category: "UI/UX",
    featured: true,
    description: "Accessible, pixel-perfect Tailwind CSS components designed to empower rapid engineering.",
    detailedDescription: [
      "Great UI is a design-engineer-focused React component ecosystem crafted for founders and frontend teams who demand fluid animations, high-contrast aesthetics, and first-class keyboard navigation.",
      "Engineered without bloated runtime dependencies, every primitive compiles to native CSS variables with zero-overhead layout thrashing.",
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix Primitives"],
    liveUrl: "https://great-ui.com",
    githubUrl: "https://github.com/addynoven/great-ui",
    stats: [
      { label: "Stars", value: "2.4k+" },
      { label: "Weekly Downloads", value: "18k" },
      { label: "Components", value: "48+" },
    ],
    features: [
      "Dynamic cursor-tracking radial luminescence for dark-mode containers",
      "Sub-millisecond keyboard focus navigation across all dropdowns & drawers",
      "Accessible ARIA landmarks audited against WCAG AAA contrast standards",
      "Single-line CLI distribution with automated shadcn/ui compatible registry",
    ],
  },
  {
    id: "ping",
    title: "Ping",
    subtitle: "Real-Time Infrastructure Health Monitor",
    category: "Full Stack",
    featured: true,
    description: "Global edge latency telemetry and incident triage dashboard for high-throughput distributed microservices.",
    detailedDescription: [
      "Ping delivers sub-second anomaly detection across globally distributed edge regions, compiling WebSocket streams into adaptive SVG heatmaps with zero UI lockup.",
      "Designed around integration-first resiliency with automated circuit breakers and SMS/Slack notification webhooks.",
    ],
    techStack: ["Next.js", "Node.js", "Redis Pub/Sub", "Go", "Tailwind CSS"],
    liveUrl: "https://ping.dev",
    githubUrl: "https://github.com/addynoven/ping",
    stats: [
      { label: "P99 Latency", value: "<12ms" },
      { label: "Uptime Monitored", value: "99.99%" },
      { label: "Active Nodes", value: "450+" },
    ],
    features: [
      "Distributed ping daemon written in Go capturing TCP/HTTP probes across 14 edge regions",
      "Real-time event fanout via Redis cluster backplanes into streaming client WebSockets",
      "Interactive time-slice scrubbing with canvas-accelerated frame rendering",
    ],
  },
  {
    id: "dropx",
    title: "DropX",
    subtitle: "Ephemeral Peer-to-Peer File Exchange",
    category: "Full Stack",
    featured: true,
    description: "Encrypted direct browser-to-browser asset delivery pipeline utilizing WebRTC data channels.",
    detailedDescription: [
      "DropX facilitates instantaneous, zero-storage peer transfers of multi-gigabyte media assets with end-to-end ChaCha20 encryption directly in the browser.",
    ],
    techStack: ["TypeScript", "WebRTC", "Web Crypto API", "Next.js"],
    liveUrl: "https://dropx.app",
    githubUrl: "https://github.com/addynoven/dropx",
    stats: [
      { label: "Max File Transfer", value: "10GB+" },
      { label: "Signaling Speed", value: "80ms" },
      { label: "Server Storage", value: "0 MB" },
    ],
    features: [
      "Zero central cloud persistence—transfers occur strictly device-to-device",
      "Hardware-accelerated client chunking via Web Workers and ArrayBuffer slices",
      "Adaptive retry channels recovering lost packets during momentary network switchovers",
    ],
  },
  {
    id: "codereview-graph",
    title: "CodeReview Graph",
    subtitle: "AST Dependency Knowledge Explorer",
    category: "CLI & Tools",
    featured: false,
    description: "Semantic AST dependency graph generator enabling developers to trace ripple effects across refactors in real time.",
    detailedDescription: [
      "Parses multi-language monorepos into directed acyclic dependency trees, identifying cyclical imports and unreferenced modules.",
    ],
    techStack: ["TypeScript", "Node.js", "Graphviz", "Babel AST"],
    githubUrl: "https://github.com/addynoven/codereview-graph",
    stats: [
      { label: "Parse Rate", value: "10k files/s" },
      { label: "Cycle Detection", value: "100%" },
    ],
    features: [
      "Fast traversal algorithms pinpointing dead entry points across large monolithic packages",
      "Interactive graph exports rendering SVG node diagrams directly into CLI or HTML reports",
    ],
  },
  {
    id: "omnix",
    title: "Omnix CLI",
    subtitle: "Developer Workflow Automation Suite",
    category: "CLI & Tools",
    featured: false,
    description: "Lightning-fast terminal toolkit for git branch orchestration, environment secret synchronization, and task scheduling.",
    detailedDescription: [
      "Omnix CLI unifies branch management, worktree coordination, and local environment secrets into an instant, single-binary Rust executable.",
      "Features interactive fuzzy pickers, automatic git stashing, and parallel script execution with low-latency terminal multiplexing.",
    ],
    techStack: ["Rust", "Shell", "Linux"],
    githubUrl: "https://github.com/addynoven/omnix",
    stats: [
      { label: "Binary Size", value: "4.2 MB" },
      { label: "Execution", value: "Instant" },
    ],
    features: [
      "Parallel task orchestration with streaming terminal multiplexing",
      "Secure key vault integration utilizing native OS keychains",
    ],
  },
];

export const COMPONENTS_CATALOG: ComponentItem[] = [
  {
    id: "staggered-transition",
    name: "Staggered Transition",
    category: "Animation",
    description: "Cascading entry animation for list items and grids with configurable damping and directional offsets.",
    installCommand: "pnpm dlx @great-ui/cli add staggered-transition",
    codeSnippet: `import { motion } from "framer-motion";

export function StaggerContainer({ children, stagger = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}`,
    tags: ["Framer Motion", "Layout", "Performance"],
  },
  {
    id: "floating-dock-menu",
    name: "Floating Dock Menu",
    category: "Navigation",
    description: "Fixed bottom frosted-glass navigation bar with spring-magnified icon hover dynamics and tooltips.",
    installCommand: "pnpm dlx @great-ui/cli add floating-dock",
    codeSnippet: `<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-surface-elevated/80 backdrop-blur-xl border border-surface-border shadow-2xl">
  {items.map((item) => (
    <DockItem key={item.id} {...item} />
  ))}
</div>`,
    tags: ["Navigation", "Glassmorphism", "Micro-interaction"],
  },
  {
    id: "word-focus",
    name: "Word Focus",
    category: "Animation",
    description: "Kinetic typography effect highlighting words sequentially or on cursor proximity for editorial headers.",
    installCommand: "pnpm dlx @great-ui/cli add word-focus",
    codeSnippet: `export function WordFocus({ text }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap gap-x-2">
      {words.map((word, i) => (
        <span key={i} className="transition-all duration-300 hover:text-primary text-text-muted">
          {word}
        </span>
      ))}
    </span>
  );
}`,
    tags: ["Typography", "Interactivity", "Editorial"],
  },
  {
    id: "spotlight-card",
    name: "Spotlight Card",
    category: "Cards & Layout",
    description: "Interactive card surface featuring a mouse-reactive radial gradient illuminating borders and textures.",
    installCommand: "pnpm dlx @great-ui/cli add spotlight-card",
    codeSnippet: `export function SpotlightCard({ children, className }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", \`\${e.clientX - rect.left}px\`);
    e.currentTarget.style.setProperty("--mouse-y", \`\${e.clientY - rect.top}px\`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-xl border border-surface-border bg-surface-elevated p-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 radial-spotlight" />
      {children}
    </div>
  );
}`,
    tags: ["CSS Variables", "Interactive", "Micro-luminescence"],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "thoughts-on-design-and-engineering",
    title: "Thoughts on Design & Engineering",
    excerpt: "Why the boundary between designers and systems engineers is collapsing into single cohesive craftspeople.",
    category: "Philosophy",
    date: "Sep 2026",
    readTime: "5 min read",
    tableOfContents: [
      { id: "the-great-convergence", title: "The Great Convergence" },
      { id: "clarity-over-cleverness", title: "Clarity Over Cleverness" },
      { id: "building-at-the-boundary", title: "Building at the Boundary" },
    ],
    content: [
      "Software architecture and user experience were traditionally treated as disconnected domains—one concerned with relational integrity and throughput, the other with aesthetic proportion and affordances.",
      "In modern high-velocity product development, that separation produces friction. A database query's latency directly dictates whether an interface feels instantaneous or sluggish. A UI component's animation frame curve communicates system stability as much as any uptime metric.",
      "True design engineering treats every layer—from database indexes to CSS border gradients—as parts of the same holistic medium.",
    ],
  },
  {
    slug: "building-high-velocity-micro-interactions",
    title: "Building High-Velocity Micro-Interactions",
    excerpt: "Engineering tactile web feedback with 60 FPS spring physics and zero runtime overhead.",
    category: "Engineering",
    date: "Aug 2026",
    readTime: "7 min read",
    tableOfContents: [
      { id: "physics-over-durations", title: "Physics Over Durations" },
      { id: "hardware-compositing", title: "Hardware Compositing" },
      { id: "the-cost-of-runtimes", title: "The Cost of Runtimes" },
    ],
    content: [
      "Duration-based transitions often feel robotic because physical matter doesn't accelerate in linear cubic-bezier steps.",
      "By adopting spring mass, stiffness, and damping parameters, interface elements respond dynamically to the user's velocity without jarring stops.",
    ],
  },
  {
    slug: "postgres-vs-mongo-two-years-in-production",
    title: "PostgreSQL vs MongoDB: Two Years in Production",
    excerpt: "Pragmatic lessons learned choosing relational guarantees over flexible document schemas in production systems.",
    category: "Backend",
    date: "Jun 2026",
    readTime: "9 min read",
    tableOfContents: [
      { id: "the-premature-flexibility-trap", title: "The Premature Flexibility Trap" },
      { id: "transactions-that-matter", title: "Transactions That Matter" },
      { id: "the-verdict", title: "The Verdict" },
    ],
    content: [
      "Document databases promise rapid prototyping without migrations. In practice, schema discipline is simply deferred to application logic where it is harder to enforce.",
      "PostgreSQL with structured relational migrations provides predictable indexing, strict typing, and rock-solid ACID guarantees under pressure.",
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    company: "Neocap",
    period: "2024 — Present",
    location: "Remote",
    description:
      "Spearheaded full-stack platform integrations, authored reusable component systems, and tuned backend query performance for distributed services.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "Open Source Contributor & Designer",
    company: "Independent",
    period: "2023 — Present",
    location: "Global",
    description:
      "Created Great UI primitives, contributed to developer tooling CLI suites, and built real-time WebRTC telemetry prototypes.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Go", "WebRTC"],
  },
];

export const DIGITAL_GARDEN = [
  {
    title: "First-Principles Software Architecture",
    topic: "Systems",
    note: "Derive abstractions only when duplication genuinely impedes refactoring, not as anticipatory defense.",
  },
  {
    title: "The Aesthetics of Restraint",
    topic: "Design",
    note: "Dark minimalism thrives on razor-sharp luminance differentials and deliberate empty space.",
  },
  {
    title: "Integration-First Testing Strategy",
    topic: "Quality",
    note: "Black-box behavioral module validation catches the real bugs that unit tests miss.",
  },
];

export const GEAR = [
  { category: "Hardware", item: "Custom Linux Devstation (Arch Linux / Fedora)" },
  { category: "Display", item: "4K IPS Color-Calibrated Reference Panel" },
  { category: "Input", item: "Split Ergonomic Mechanical Keyboard (Gateron Oil Kings)" },
  { category: "Terminal", item: "Ghostty / Alacritty + Tmux + JetBrains Mono" },
  { category: "Editor", item: "Neovim / VS Code with minimal monochrome themes" },
];

export const RECENT_PRS: PullRequest[] = [
  {
    id: "pr-1",
    title: "chore: bump React and ReactDOM to v19.2.5",
    repo: "OWASP/Nest",
    url: "https://github.com/OWASP/Nest/pull/4618",
    date: "Jul 2026",
    status: "merged",
  },
  {
    id: "pr-2",
    title: "fix: improve popover focus management and keyboard trapping",
    repo: "shadcn/ui",
    url: "https://github.com/shadcn-ui/ui",
    date: "Jun 2026",
    status: "merged",
  },
  {
    id: "pr-3",
    title: "update volunteer roster, revise social media links, and refresh event records",
    repo: "OWASP/www-chapter-vit-bhopal-university",
    url: "https://github.com/OWASP/www-chapter-vit-bhopal-university/pull/12",
    date: "Jul 2026",
    status: "merged",
  },
  {
    id: "pr-4",
    title: "feat: add Floating Dock Menu with spring physics and circular scroll indicator",
    repo: "addynoven/great-ui",
    url: "https://github.com/addynoven/great-ui",
    date: "Aug 2026",
    status: "merged",
  },
  {
    id: "pr-5",
    title: "docs: clarify useActionState optimistic state rollback lifecycle",
    repo: "facebook/react",
    url: "https://github.com/facebook/react",
    date: "May 2026",
    status: "merged",
  },
];

export const LEARNING_LOGS: LearningLog[] = [
  {
    id: "log-058",
    number: "Grind Log #058",
    points: [
      {
        text: "Added the Floating Dock Menu component to ",
        highlight: "GreatUI",
        link: { label: "Floating Dock Menu", url: "/v4/components" },
      },
      {
        text: "Calibrated circular SVG progress tracking against document height with zero jank on mobile viewports.",
      },
    ],
  },
  {
    id: "log-057",
    number: "Grind Log #057",
    points: [
      {
        text: "Benchmarked PostgreSQL JSONB indexing vs Redis hashes for ephemeral telemetry caching.",
      },
      {
        text: "Reduced connection churn by pooling WebSocket clients through Go channel multiplexers.",
      },
    ],
  },
  {
    id: "log-056",
    number: "Grind Log #056",
    points: [
      {
        text: "Refactored WebRTC peer streaming chunk size down to 64KB for optimal TCP backpressure handling.",
      },
    ],
  },
  {
    id: "log-055",
    number: "Grind Log #055",
    points: [
      {
        text: "Audited CSS variable generation against WCAG AAA contrast guidelines across light & dark themes.",
      },
    ],
  },
];

