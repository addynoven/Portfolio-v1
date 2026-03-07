import type { BlogPost } from "./index";

// export const post1: BlogPost = {
//     slug: "why-i-reach-for-rust",
//     title: "Why I Reach for Rust Even When It's Overkill",
//     excerpt:
//         "Some tools just feel right. After two years of writing Rust in my spare time, I can't go back to languages that don't make me think about ownership.",
//     date: "Feb 20, 2026",
//     readTime: "6 min read",
//     tags: ["Rust", "Low-level", "Opinion"],
//     content: `# Why I Reach for Rust Even When It's Overkill

// I'm going to be honest with you: most of my side projects don't *need* Rust. A Python script would've done the job in a quarter of the time. But I still reach for Rust — and here's why that's not as irrational as it sounds.

// ## The Ownership Model Changes How You Think

// The borrow checker is famously brutal to beginners. I spent three weeks fighting it before I had my first "aha" moment. But once it clicks, something strange happens: you start *thinking differently* about code even in other languages.

// When I write Python now, I'm mentally annotating lifetimes. When I write TypeScript, I notice when I'm mutating shared state carelessly. Rust didn't just teach me Rust — it made me a better programmer in every language I touch.

// \`\`\`rust
// fn process(data: &Vec<String>) -> Vec<String> {
//     data.iter()
//         .filter(|s| !s.is_empty())
//         .map(|s| s.to_uppercase())
//         .collect()
// }
// \`\`\`

// No hidden copies. No surprise mutations. The compiler enforces your intent.

// ## The Error Messages Are Actually Good

// This sounds like a trivial thing to praise, but Rust's error messages are *insanely* good. They don't just tell you what went wrong — they explain *why* and suggest a fix. Half the time the fix is exactly right.

// Compare that to a segfault at runtime (C), a confusing traceback (Python), or "Cannot read properties of undefined" (JavaScript). Rust catches these at compile time and explains them clearly.

// ## The Performance Ceiling Is Real

// I built a log parser for a side project. The Python version took ~8 seconds on a 500MB log file. The Rust version: 0.4 seconds. Same algorithm, just compiled.

// For a CLI tool or a small server that's under constant load, that difference isn't academic — it's the difference between a tool people actually use and one they abandon.

// ## When I Don't Use Rust

// To be fair: I don't use Rust for everything.

// - **CRUD apps?** Next.js or a simple Node backend.
// - **Quick data analysis?** Python every time.
// - **Prototyping a new idea?** TypeScript — I need to iterate fast.

// Rust is the right tool when performance matters, when you're building something that has to run reliably without babysitting, or when you just want to write something that feels *crafted*.

// ## The Community Keeps Me Coming Back

// The Rust community is genuinely one of the best I've encountered in open source. Questions are answered thoughtfully, crates are well-documented, and the RFC process means language changes are deliberate and explained.

// If you haven't tried Rust yet, you don't have to use it for something serious. Build a CLI tool. Write a simple file sorter. Fight the borrow checker for a weekend. You'll come out the other side a better programmer regardless of whether you ever ship Rust in production.
// `,
// };

export const post2: BlogPost = {
    slug: "postgres-vs-mongo-two-years",
    title: "PostgreSQL vs MongoDB: What Two Years of Pain Taught Me",
    excerpt:
        "I've shipped production systems with both. Here's when each one is actually the right choice — and when you'll regret picking the wrong one.",
    date: "Mar 5, 2026",
    readTime: "8 min read",
    tags: ["PostgreSQL", "MongoDB", "Backend", "Databases"],
    content: `# PostgreSQL vs MongoDB: What Two Years of Pain Taught Me

I've heard the debate a thousand times: *"just use Postgres"* vs *"Mongo scales better"*. Both camps are wrong in interesting ways. After running both in production (sometimes at the same time, which is its own kind of pain), here's my honest take.

## The Real Difference Isn't Documents vs Tables

People frame this as a philosophical debate about data modeling. It's not. The real difference is **when your schema becomes clear to you**.

- **Postgres**: Your schema is defined upfront. It's rigid. This is a feature, not a bug — it forces you to think about your data model before you've painted yourself into a corner.
- **MongoDB**: Your schema is enforced by the application. This feels flexible until you have six versions of the same field name in production and no idea which documents have which shape.

## Where Mongo Actually Wins

I'm not here to bash MongoDB. There are real scenarios where it's the better choice:

**1. Truly variable schemas.** If you're storing user-uploaded form data where every form has different fields, document storage is genuinely natural.

**2. High write throughput on denormalized data.** MongoDB's write performance on a single collection with no joins can be faster because there's nothing to lock.

**3. Rapid early iteration.** When you're in the "I don't know what my data looks like yet" phase, Mongo's flexibility lets you move fast.

\`\`\`json
{
  "_id": "abc123",
  "type": "user_action",
  "payload": {
    "action": "click",
    "element": "#cta-button",
    "timestamp": 1706000000
  }
}
\`\`\`

That kind of heterogeneous event data is genuinely comfortable in Mongo.

## Where Postgres Wins (Most of the Time)

**1. Joins exist for a reason.** The moment you need data from two collections in MongoDB, you're either denormalizing everything (duplicating data, consistency nightmare) or using \`$lookup\` (which is just a worse JOIN).

**2. Transactions are real.** Mongo added multi-document transactions, but they're slower and more complex to use than Postgres transactions.

**3. The query planner is genius.** Postgres's query planner has been refined for decades. I've seen it rewrite a query I wrote badly into something optimal I wouldn't have thought of.

**4. JSON support.** Here's the kicker: Postgres has \`jsonb\` columns. You can store documents *inside* a relational database and query them with operators. It's the best of both worlds when you need it.

\`\`\`sql
SELECT user_id, metadata->>'plan' as plan
FROM users
WHERE metadata @> '{"verified": true}'
  AND created_at > NOW() - INTERVAL '30 days';
\`\`\`

## My Actual Decision Framework

| Situation | My Choice |
|---|---|
| Standard web app with relations | Postgres |
| Event/log ingestion pipeline | Mongo (or ClickHouse) |
| Don't know schema yet | Start Postgres, migrate later |
| Geospatial queries | Postgres (PostGIS) |
| Full-text search is primary concern | Postgres (or Elasticsearch) |
| Need to move fast, schema unclear | Mongo, with the explicit plan to revisit |

## The Lesson

Most "Mongo vs Postgres" debates are really "I'm making a decision I can't easily reverse and I'm scared." Pick Postgres by default. If you hit a genuine need for document storage, you'll know it — it won't be a guess.
`,
};

export const post4: BlogPost = {
    slug: "building-portfolio-nextjs",
    title: "Building a Modern Portfolio with Next.js & TypeScript",
    excerpt:
        "What goes into building a high-performance portfolio in 2026? A deep dive into the stack, the design choices, and the lessons learned along the way.",
    date: "Mar 1, 2026",
    readTime: "5 min read",
    tags: ["Next.js", "TypeScript", "UI/UX"],
    content: `# Building a Modern Portfolio with Next.js & TypeScript

Building a portfolio is a rite of passage for every developer. But it's also a trap. You can spend months tweaking the CSS and never actually ship anything.

For this version of my portfolio, I had three goals:
1. **Performance**: It has to be fast.
2. **Type Safety**: No more "undefined is not a function" in production.
3. **Aesthetics**: It should look like I care about design.

## The Stack

- **Next.js**: For the best DX and performance.
- **TypeScript**: Because I can't imagine writing JS without it anymore.
- **Tailwind CSS**: For rapid UI development.
- **Shadcn/UI**: For accessible, beautiful components.

## The Design Process

I went with a "Terminal meets Pinterest" aesthetic. Dark mode by default, lots of monospaced fonts, but with modern grid layouts and smooth transitions.

## Lessons Learned

Don't overcomplicate it. Your portfolio is a tool to show what you can do, not a playground for every new library you find on Twitter.

Stay tuned for more updates as I add more features!
`,
};

export const post3: BlogPost = {
    slug: "self-taught-to-intern",
    title: "Self-Taught to Intern: What Actually Helped",
    excerpt:
        "No CS degree. No bootcamp. Here's the actual path I took, what worked, what was a complete waste of time, and what I'd do differently.",
    date: "Dec 3, 2025",
    readTime: "7 min read",
    tags: ["Career", "Self-taught", "Learning"],
    content: `# Self-Taught to Intern: What Actually Helped

I started learning to code at 19 with a YouTube tutorial on HTML. Eight months later I landed my first frontend internship. No degree, no bootcamp, no connections. Here's an honest account of what actually moved the needle.

## What I Got Wrong First

The first 6 months I basically just watched tutorials. I'd watch someone build a to-do app, feel like I understood it, then try to build something and freeze completely.

**Tutorial hell is real.** You feel productive but you're not learning — you're pattern-matching. The moment you have to make a decision the tutorial didn't cover, you're stuck.

## The Shift That Changed Everything

I stopped asking "what should I learn?" and started asking "what do I want to build?"

I wanted to build a Discord bot for my friend group. So I learned Node.js to build it. I wanted to store settings across restarts, so I learned SQLite. The bot got slow, so I learned basic caching. The bot had downtime, so I learned how to run it on a cheap VPS and keep it alive with \`pm2\`.

That one project taught me more than 6 months of tutorials. And at the end I had something *real* I had built and used every day.

## What I'd Actually Recommend

**1. Build things that itch you.** Not tutorial projects. Things you actually want to exist. The motivation difference is enormous.

**2. Read code obsessively.** Pick a library you use. Open its source on GitHub. Start from the entry point and follow the breadcrumbs. This is how you learn what "good code" looks like.

**3. Solve real problems on the internet.** Find an open GitHub issue in a project you use. Even just reading the discussion teaches you how engineers think. When you can close one, do it.

**4. Write about what you learn.** Not for an audience — for yourself. Explaining something forces you to understand it. I kept a private Obsidian doc of things I learned each week. Reviewing it months later was like finding buried treasure.

**5. Get early feedback.** Share your code with someone more experienced, even in a Discord server. One critical code review taught me more about clean code than two months of reading books.

## On the Internship Application

When I applied, my GitHub had maybe 15 projects. Most were small. But they were *real* — things I actually built for a reason, not "Todo App Tutorial CRUD".

In my interview, they asked me to walk through a project I was proud of. I talked about the Discord bot and the problems I'd solved. They didn't care that I didn't have a degree. They cared that I could think through a problem and had actually shipped something.

## The Uncomfortable Truth

There's no shortcut. The self-taught path takes longer than a CS degree in some ways, and shorter in others. You'll spend a lot of time feeling lost and stupid. That feeling is the learning.

The people who make it are not the ones who are naturally talented — they're the ones who kept building things when it felt pointless. Keep building.
`,
};