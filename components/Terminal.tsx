"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface TerminalLine {
  type: "system" | "input" | "output" | "error";
  text: string;
  color?: "green" | "blue" | "yellow" | "pink" | "red" | "cyan";
}

const COMMANDS = [
  "help", "about", "neofetch", "skills", "projects", "contact", "social", "kitty", "clear",
  "reload", "exit", "color", "reset", "theme", "goto", "ls", "open", "whoami", "date",
  "sudo", "matrix", "devtools", "tour", "loading"
];

import { useCat } from "./CatContext";

export default function Terminal() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { startTour } = useCat();

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - (rect.left + rect.width / 2);
    const posY = e.clientY - (rect.top + rect.height / 2);
    x.set(posX);
    y.set(posY);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: "Welcome to neon@portfolio!" },
    { type: "system", text: "Type 'help' for commands. Tab for autocomplete." },
  ]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Helper to update accent color
  const updateAccentColor = (hex: string) => {
    document.documentElement.style.setProperty('--user-accent', hex);
    // Also update Tailwind's UserAccent if using CSS variables
    const root = document.documentElement;
    root.style.setProperty('--tw-text-opacity', '1');
    // Store for persistence
    localStorage.setItem('portfolio-accent-color', hex);
    // Dispatch custom event for components using useAccentColor hook
    window.dispatchEvent(new CustomEvent('accent-color-change'));
  };

  // Load saved color on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('portfolio-accent-color');
    if (savedColor) {
      updateAccentColor(savedColor);
    }
  }, []);

  const handleCommand = (cmd: string): TerminalLine[] => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(' ');
    const command = args[0];

    // Help command
    if (command === "help")
      return [
        { type: "output", color: "yellow", text: "📚 Available Commands:" },
        { type: "output", color: "cyan", text: "─────────────────────────────" },
        { type: "output", color: "green", text: "  ℹ️  Info Commands:" },
        { type: "output", color: "cyan", text: "    about, neofetch, skills, projects, contact, social" },
        { type: "output", color: "green", text: "  🎨  Customization:" },
        { type: "output", color: "cyan", text: "    color <hex>  - change accent color (e.g., color #ff6b6b)" },
        { type: "output", color: "cyan", text: "    reset        - restore default color" },
        { type: "output", color: "cyan", text: "    theme        - toggle light/dark mode" },
        { type: "output", color: "green", text: "  🧭  Navigation:" },
        { type: "output", color: "cyan", text: "    goto <section> - scroll to section (home/work/contact)" },
        { type: "output", color: "cyan", text: "    ls             - list sections" },
        { type: "output", color: "cyan", text: "    open <link>    - open github/linkedin/twitter" },
        { type: "output", color: "green", text: "  ⚙️  System:" },
        { type: "output", color: "cyan", text: "    reload, exit, clear, date, whoami" },
        { type: "output", color: "cyan", text: "    loading        - toggle loading screen on/off" },
        { type: "output", color: "green", text: "  🎮  Fun:" },
        { type: "output", color: "cyan", text: "    kitty, sudo, matrix, tour" },
        { type: "output", color: "cyan", text: "    tour           - restart the guided tour" },
      ];

    // About
    if (command === "about")
      return [
        { type: "output", color: "green", text: "╭─────────────────────────────╮" },
        { type: "output", color: "green", text: "│  👨‍💻 Aditya Sahu (Neon Stain) │" },
        { type: "output", color: "green", text: "╰─────────────────────────────╯" },
        { type: "output", color: "blue", text: "Full Stack Developer" },
        { type: "output", color: "blue", text: "Passionate about building elegant digital experiences" },
        { type: "output", color: "blue", text: "Open Source Contributor | UI/UX Enthusiast" },
      ];

    // Neofetch
    if (command === "neofetch")
      return [
        { type: "output", color: "cyan", text: "        ╭──────────────────────╮" },
        { type: "output", color: "cyan", text: "        │    neon@portfolio    │" },
        { type: "output", color: "cyan", text: "        ╰──────────────────────╯" },
        { type: "output", color: "green", text: "🖥️  OS       Arch Linux x86_64 🐧" },
        { type: "output", color: "green", text: "⏱️  Uptime   21 years of debugging 🚗💨" },
        { type: "output", color: "green", text: "📦  Packages npm, pnpm, pip" },
        { type: "output", color: "green", text: "🐚  Shell    /bin/fish 🐟" },
        { type: "output", color: "green", text: "📝  Editor   Neovim + VSCode ⚡" },
        { type: "output", color: "green", text: "🎨  Theme    Catppuccin Mocha ✨" },
        { type: "output", color: "yellow", text: "💡  'I use arch btw!' ✨" },
      ];

    // Skills
    if (command === "skills")
      return [
        { type: "output", color: "yellow", text: "⚡ Tech Stack:" },
        { type: "output", color: "pink", text: "  ⚛️  React, Next.js, Node.js" },
        { type: "output", color: "pink", text: "  🐍 Python, TypeScript, JavaScript" },
        { type: "output", color: "pink", text: "  🗄️  MongoDB, PostgreSQL, Redis" },
        { type: "output", color: "pink", text: "  🐳 Docker, AWS, GitHub Actions" },
        { type: "output", color: "pink", text: "  📱 Flutter, React Native" },
      ];

    // Projects
    if (command === "projects")
      return [
        { type: "output", color: "yellow", text: "🚀 Featured Projects:" },
        { type: "output", color: "blue", text: "  🎬 NeonFlix      - Netflix-inspired streaming platform" },
        { type: "output", color: "blue", text: "  🐕 Dog Lab       - AI dog breed identifier (99% accuracy)" },
        { type: "output", color: "blue", text: "  🔐 SecureShare   - E2E encrypted file sharing" },
        { type: "output", color: "blue", text: "  📦 ReactBits CLI - NPM component installer" },
        { type: "output", color: "blue", text: "  🎮 NeetCode RPG  - Gamified coding practice" },
        { type: "output", color: "cyan", text: "  → Type 'goto work' to see more!" },
      ];

    // Contact
    if (command === "contact")
      return [
        { type: "output", color: "yellow", text: "📬 Get in Touch:" },
        { type: "output", color: "blue", text: "  📧 Email:  addynoven@gmail.com" },
        { type: "output", color: "blue", text: "  🐙 GitHub: github.com/addynoven" },
        { type: "output", color: "cyan", text: "  → Type 'goto contact' or 'open github'" },
      ];

    // Social
    if (command === "social")
      return [
        { type: "output", color: "yellow", text: "🌐 Social Links:" },
        { type: "output", color: "blue", text: "  🐙 GitHub:   github.com/addynoven" },
        { type: "output", color: "blue", text: "  💼 LinkedIn: linkedin.com/in/addynoven" },
        { type: "output", color: "blue", text: "  🐦 Twitter:  @addynoven" },
        { type: "output", color: "cyan", text: "  → Type 'open github' to visit" },
      ];

    // Kitty
    if (command === "kitty")
      return [
        { type: "output", color: "yellow", text: "   ✨🐾✨" },
        { type: "output", color: "pink", text: "    /\\_/\\   " },
        { type: "output", color: "pink", text: "   ( o.o )  " },
        { type: "output", color: "pink", text: "   > ^ <   " },
        { type: "output", color: "yellow", text: "   Meow! 🐱💖" },
      ];

    // Clear
    if (command === "clear") {
      setLines([]);
      return [];
    }

    // ========== NEW COMMANDS ==========

    // Reload
    if (command === "reload") {
      setTimeout(() => window.location.reload(), 500);
      return [{ type: "output", color: "green", text: "🔄 Reloading..." }];
    }

    // Exit
    if (command === "exit") {
      // window.close() only works for tabs opened via script
      window.close();
      // If we're still here, it didn't work
      return [
        { type: "output", color: "yellow", text: "🚪 Nice try! But browsers don't let me close tabs I didn't open 😏" },
        { type: "output", color: "cyan", text: "   Try Ctrl+W or Cmd+W instead!" },
      ];
    }

    // Tour command
    if (command === "tour") {
      startTour();
      return [
        { type: "output", color: "green", text: "🐱 Starting tour..." },
        { type: "output", color: "cyan", text: "Look who's here to guide you!" },
      ];
    }
    
    // Color command
    if (command === "color") {
      const colorArg = args[1];
      if (!colorArg) {
        return [
          { type: "output", color: "yellow", text: "Usage: color <hex>" },
          { type: "output", color: "cyan", text: "Example: color #ff6b6b" },
        ];
      }
      // Validate hex color
      const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(colorArg)) {
        return [{ type: "error", color: "red", text: "Invalid hex color. Use format: #RRGGBB" }];
      }
      const hex = colorArg.startsWith('#') ? colorArg : `#${colorArg}`;
      updateAccentColor(hex);
      return [
        { type: "output", color: "green", text: `🎨 Accent color changed to ${hex}` },
        { type: "output", color: "cyan", text: "   Color saved! Use 'reset' to restore default." },
      ];
    }

    // Reset color
    if (command === "reset") {
      updateAccentColor('#00ff99');
      localStorage.removeItem('portfolio-accent-color');
      return [{ type: "output", color: "green", text: "🎨 Color reset to default #00ff99" }];
    }

    // Theme toggle
    if (command === "theme") {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      if (isDark) {
        html.classList.remove('dark');
        return [{ type: "output", color: "yellow", text: "☀️ Switched to light mode" }];
      } else {
        html.classList.add('dark');
        return [{ type: "output", color: "cyan", text: "🌙 Switched to dark mode" }];
      }
    }

    // List sections
    if (command === "ls") {
      return [
        { type: "output", color: "yellow", text: "📂 Available sections:" },
        { type: "output", color: "blue", text: "  📁 home    - Hero section" },
        { type: "output", color: "blue", text: "  📁 work    - Projects showcase" },
        { type: "output", color: "blue", text: "  📁 contact - Get in touch" },
        { type: "output", color: "cyan", text: "  → Type 'goto <section>' to navigate" },
      ];
    }

    // Goto section
    if (command === "goto") {
      const section = args[1];
      const sections: Record<string, string> = {
        home: "#home",
        work: "#work",
        projects: "#work",
        contact: "#contact",
      };
      if (!section || !sections[section]) {
        return [
          { type: "output", color: "yellow", text: "Usage: goto <section>" },
          { type: "output", color: "cyan", text: "Available: home, work, contact" },
        ];
      }
      document.querySelector(sections[section])?.scrollIntoView({ behavior: 'smooth' });
      return [{ type: "output", color: "green", text: `🧭 Navigating to ${section}...` }];
    }

    // Open links
    if (command === "open") {
      const link = args[1];
      const links: Record<string, string> = {
        github: "https://github.com/addynoven",
        linkedin: "https://linkedin.com/in/addynoven",
        twitter: "https://twitter.com/addynoven",
        email: "mailto:addynoven@gmail.com",
      };
      if (!link || !links[link]) {
        return [
          { type: "output", color: "yellow", text: "Usage: open <link>" },
          { type: "output", color: "cyan", text: "Available: github, linkedin, twitter, email" },
        ];
      }
      window.open(links[link], '_blank');
      return [{ type: "output", color: "green", text: `🔗 Opening ${link}...` }];
    }

    // Whoami
    if (command === "whoami") {
      return [{ type: "output", color: "green", text: "neon_stain (Aditya Sahu)" }];
    }

    // Date
    if (command === "date") {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };
      return [{ type: "output", color: "cyan", text: `📅 ${now.toLocaleDateString('en-IN', options)}` }];
    }

    // Easter eggs
    if (command === "sudo") {
      return [
        { type: "output", color: "red", text: "[sudo] password for neon: " },
        { type: "output", color: "yellow", text: "Nice try! 😏 You're not root here." },
      ];
    }

    if (trimmed === "rm -rf /" || trimmed === "rm -rf /*") {
      return [
        { type: "output", color: "red", text: "🚨 ALERT: Destruction sequence initiated..." },
        { type: "output", color: "yellow", text: "Just kidding! 😂 This isn't a real terminal." },
        { type: "output", color: "cyan", text: "Your files are safe... for now 👀" },
      ];
    }

    if (command === "matrix") {
      return [
        { type: "output", color: "green", text: "Wake up, Neo..." },
        { type: "output", color: "green", text: "The Matrix has you..." },
        { type: "output", color: "green", text: "Follow the white rabbit 🐰" },
      ];
    }

    // DevTools Easter egg
    if (command === "devtools") {
      return [
        { type: "output", color: "cyan", text: "🔧 DevTools Detection Active" },
        { type: "output", color: "yellow", text: "   Open DevTools (F12) and check the console!" },
        { type: "output", color: "green", text: "   👀 I can see when you're inspecting..." },
        { type: "output", color: "pink", text: "   Curious minds are always welcome here 💚" },
      ];
    }

    // Loading screen toggle
    if (command === "loading") {
      const arg = args[1];
      if (arg === "on") {
        localStorage.removeItem('skip-loading-screen');
        return [
          { type: "output", color: "green", text: "✅ Loading screen ENABLED" },
          { type: "output", color: "cyan", text: "   Reload the page to see it!" },
        ];
      } else if (arg === "off") {
        localStorage.setItem('skip-loading-screen', 'true');
        return [
          { type: "output", color: "yellow", text: "⏭️ Loading screen DISABLED" },
          { type: "output", color: "cyan", text: "   Site will skip the intro animation." },
        ];
      } else {
        const isDisabled = localStorage.getItem('skip-loading-screen') === 'true';
        return [
          { type: "output", color: "yellow", text: `🎬 Loading screen: ${isDisabled ? 'OFF' : 'ON'}` },
          { type: "output", color: "cyan", text: "   Usage: loading on | loading off" },
        ];
      }
    }

    // Empty command
    if (trimmed === "") return [];

    // Command not found
    return [{ type: "error", color: "red", text: `Command not found: ${cmd}. Type 'help' for commands.` }];
  };

  const handleSubmit = () => {
    const output = handleCommand(input);

    if (input.trim().toLowerCase() !== "clear") {
      setLines([...lines, { type: "input", text: input }, ...output]);
    }

    // Save to history
    if (input.trim()) {
      setHistory(prev => [...prev, input.trim()]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter - submit
    if (e.key === "Enter") {
      handleSubmit();
      return;
    }

    // Tab - autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = input.trim().toLowerCase();
      if (trimmed) {
        const matches = COMMANDS.filter(cmd => cmd.startsWith(trimmed));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          // Show possible completions
          setLines(prev => [
            ...prev,
            { type: "system", text: `Matches: ${matches.join(", ")}` }
          ]);
        }
      }
      return;
    }

    // Arrow Up - previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
      return;
    }

    // Arrow Down - next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
      return;
    }
  };

  const getColorClass = (color?: string) => {
    switch (color) {
      case "green": return "text-green-400";
      case "blue": return "text-blue-400";
      case "yellow": return "text-yellow-400";
      case "pink": return "text-pink-400";
      case "red": return "text-red-500";
      case "cyan": return "text-cyan-400";
      default: return "text-white/85";
    }
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onClick={() => inputRef.current?.focus()}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="bg-gradient-to-br from-[#0a0a0a]/95 to-[#0d1117]/90 backdrop-blur-xl border border-UserAccent/30 rounded-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(0,255,153,0.25),0_0_30px_-10px_rgba(0,255,153,0.15)] w-full min-w-[380px] max-w-[520px] xl:min-w-[480px] xl:max-w-[560px] transition-all duration-300 cursor-text hover:border-UserAccent/50 hover:shadow-[0_0_100px_-20px_rgba(0,255,153,0.35),0_0_40px_-10px_rgba(0,255,153,0.2)]"
    >
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-[#0d1117] to-[#161b22] px-4 py-3 flex items-center gap-3 border-b border-UserAccent/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-UserAccent shadow-[0_0_8px_rgba(0,255,153,0.5)]" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-UserAccent text-sm font-mono font-medium tracking-wide">neon@portfolio</span>
        </div>
        <div className="w-14" />
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        onWheel={(e) => e.stopPropagation()}
        className="p-4 h-[320px] xl:h-[360px] overflow-y-auto overscroll-contain font-mono text-sm leading-relaxed bg-gradient-to-b from-[#0a0a0a] to-[#050505] scrollbar-thin scrollbar-thumb-UserAccent/30 scrollbar-track-transparent"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`py-0.5 ${
              line.type === "input" ? "text-UserAccent" : ""
            } ${line.type === "output" ? "pl-2" : ""} ${
              line.type === "system" ? "text-UserAccent/60 italic text-xs" : ""
            } ${line.type === "error" ? "pl-2" : ""}`}
          >
            {line.type === "input" ? (
              <span>
                <span className="text-UserAccent">❯</span> {line.text}
              </span>
            ) : (
              <span className={line.type === "error" ? "text-red-500 font-semibold" : getColorClass(line.color)}>
                {line.text}
              </span>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center mt-2 pt-2 border-t border-white/5">
          <span className="text-UserAccent text-lg">❯</span>
          <input
            ref={inputRef}
            className="bg-transparent flex-1 ml-2 outline-none text-white caret-UserAccent placeholder:text-white/30"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command..."
          />
        </div>
      </div>
    </motion.div>
  );
}
