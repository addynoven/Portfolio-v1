// ── Skill Groups (categorised, text-pill style) ──────────────── */
export const skillGroups = [
    {
        label: { en: "Languages", jp: "言語" },
        items: ["C", "C++", "JavaScript", "TypeScript", "Dart", "SQL"],
    },
    {
        label: { en: "Frontend", jp: "フロントエンド" },
        items: ["Flutter", "React", "Next.js", "shadcn/ui", "Tailwind CSS"],
    },
    {
        label: { en: "Backend", jp: "バックエンド" },
        items: ["Express.js", "Node.js"],
    },
    {
        label: { en: "Database", jp: "データベース" },
        items: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma"],
    },
    {
        label: { en: "Tools & Infra", jp: "ツール・インフラ" },
        items: ["Docker", "Git", "Linux", "Postman"],
    },
]

// ── Social / Connection links ─────────────────────────────── */
export const socials = [
    {
        platform: "GitHub",
        handle: "addynoven",
        url: "https://github.com/addynoven",
    },
    {
        platform: "Twitter",
        handle: "@addynoven",
        url: "https://x.com/addynoven",
    },
    {
        platform: "LinkedIn",
        handle: "aditya-sahu",
        url: "https://www.linkedin.com/in/aditya-sahu-34350b193/",
    },
    {
        platform: "Email",
        handle: "addynoven@gmail.com",
        url: "mailto:addynoven@gmail.com",
    },
]

// ── Experience ────────────────────────────────────────────── */
export const experience = [
    {
        role: {
            en: "Software Developer Intern",
            jp: "ソフトウェア開発インターン"
        },
        company: "Neocap",
        location: {
            en: "Remote",
            jp: "リモート"
        },
        start: "Sep 2025",
        end: "Dec 2025",
        description: {
            en: "Developed and maintained full-stack features using Node.js and React.js, enhancing team productivity and user experience. Designed and implemented an internal dashboard to streamline team management, improving operational efficiency.",
            jp: "Node.jsとReact.jsを使用してフルスタック機能を開発・保守し、チームの生産性とユーザーエクスペリエンスを向上させました。チーム管理を合理化するための内部ダッシュボードを設計・実装し、業務効率を改善しました。"
        },
        tags: ["React.js", "Node.js", "shadcn/ui", "Tailwind CSS"],
    }
];

// ── Featured Projects ─────────────────────────────────────── */
export const projects = [
    {
        name: "Chai-Chan",
        description: {
            en: "A GPT-style AI chatbot powered by Ollama local models, featuring MongoDB-backed persistent storage, user-based authentication, and secure token visualization. making it a fully-featured, self-hosted AI chat platform.",
            jp: "Ollamaローカルモデルを搭載したGPTスタイルのAIチャットボット。MongoDBによる永続ストレージ、ユーザー認証、安全なトークン可視化機能を備え、フル機能のセルフホスト型AIチャットプラットフォームを実現しています。"
        },
        tags: ["Node.js", "MongoDB", "React", "shadcn/ui"],
        repoUrl: "https://github.com/addynoven/Chai-Chan",
        liveUrl: "",
        stars: 1,
        wip: true,
        category: {
            en: "Backend",
            jp: "バックエンド"
        },
        image: "/v3/projects/chai-chan.webp",
    },
    {
        name: "Task Manager",
        description: {
            en: "A task manager built with Flutter and Firebase, featuring task management, user-based authentication, and real-time updates. Supports multi-scheme theming, offline backup, Notification system, task sharing, and more.",
            jp: "FlutterとFirebaseで構築されたタスクマネージャー。タスク管理、ユーザー認証、リアルタイム更新機能を備えています。マルチスキームテーマ、オフラインバックアップ、通知システム、タスク共有などをサポートしています。"
        },
        tags: ["Flutter", "Firebase", "Dart"],
        repoUrl: "https://github.com/addynoven/task-manager",
        liveUrl: "https://github.com/addynoven/simple-task-manager-app",
        stars: 1,
        wip: true,
        category: {
            en: "Mobile App",
            jp: "モバイルアプリ"
        },
        image: "/v3/projects/any_task.webp",
    },
    {
        name: "Portfolio",
        description: {
            en: "This personal portfolio built with Next.js showcases multi-scheme theming, a live GitHub contribution graph, and a blog engine. Fully typed with TypeScript and styled using Tailwind CSS for a modern, responsive UI.",
            jp: "Next.jsで構築されたこの個人ポートフォリオは、マルチスキームテーマ、ライブGitHubコントリビューショングラフ、ブログエンジンを紹介しています。TypeScriptでフルタイピングされ、Tailwind CSSを使用してモダンでレスポンシブなUIを実現しています。"
        },
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        repoUrl: "https://github.com/addynoven/portfolio",
        liveUrl: "https://musha.vercel.app/",
        stars: 1,
        wip: false,
        category: {
            en: "Web App",
            jp: "ウェブアプリ"
        },
        image: "/v3/projects/portfolio.webp",
    },
];

// ── Education ─────────────────────────────────────────────── */
export const education = [
    {
        degree: "BCA",
        school: "",
        location: {
            en: "India",
            jp: "インド"
        },
        start: "2025",
        end: "2028",
        current: true,
    },
]

// ── Quotes (cycling) ─────────────────────────────────────── */
export const QUOTES = [
    { 
        text: {
            en: "The best error message is the one that never shows up.",
            jp: "最良のエラーメッセージは、決して表示されないものである。"
        },
        author: "Thomas Fuchs" 
    },
    { 
        text: {
            en: "Simplicity is the soul of efficiency.",
            jp: "シンプルさは効率の本質である。"
        },
        author: "Austin Freeman" 
    },
    { 
        text: {
            en: "First, solve the problem. Then, write the code.",
            jp: "まず問題を解決せよ。その後でコードを書け。"
        },
        author: "John Johnson" 
    },
    { 
        text: {
            en: "Code is like humor. When you have to explain it, it's bad.",
            jp: "コードはユーモアのようなものだ。説明しなければならないようなら、それは悪いコードだ。"
        },
        author: "Cory House" 
    },
    { 
        text: {
            en: "Make it work, make it right, make it fast.",
            jp: "まず動かせ。次に正しくせよ。そして速くせよ。"
        },
        author: "Kent Beck" 
    },
    { 
        text: {
            en: "Truth can only be found in one place: the code.",
            jp: "真実は唯一の場所にしかない。それはコードの中だ。"
        },
        author: "Robert C. Martin" 
    },
];

// ── Site Metadata (Single Source of Truth) ────────────────── */
export const METADATA = {
    name: "Neon",
    role: {
        en: "software engineer",
        jp: "ソフトウェアエンジニア"
    },
    location: {
        en: "india",
        jp: "インド"
    },
    bio: {
        en: `I build things that actually work in the real world — sharp, fast, and user-friendly. 
Mostly focused on AI now, experimenting with models, fine-tuning, and pushing practical features into real products. 
Still love understanding how systems fit together, from backend design to deployment.`,
        jp: `現実世界で実際に機能する、シャープで高速、そしてユーザーフレンドリーなものを構築しています。
現在は主にAIに注力しており、モデルの実験やファインチューニング、実用的な機能を実際のプロダクトに導入することに取り組んでいます。
バックエンドの設計からデプロイまで、システムがどのように組み合わさるかを理解することに情熱を注いでいます。`
    },
    bioTagline: {
        en: "Backend by trade, full-stack by passion.",
        jp: "職業はバックエンド、情熱はフルスタック。"
    },
    username: "addynoven",
    ogDescription: {
        en: "Software engineer from India. Backend by trade, full-stack by passion.",
        jp: "インド出身のソフトウェアエンジニア。職業はバックエンド、情熱はフルスタック。"
    },
    bannerPath: "/v3/images/banner-neon.jpg",
    bannerVideoPath: "/v3/images/banner.mp4",
    footerBio: {
        en: "Full stack developer based in India. 🇮🇳\nBuilding efficient backend systems and elegant UI/UX.",
        jp: "インドを拠点に活動するフルスタック開発者。🇮🇳\n効率的なバックエンドシステムと洗練されたUI/UXを構築しています。"
    },
}




