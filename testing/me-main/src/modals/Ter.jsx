import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

export default function Ter({ isOpen, onClose }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMove = (e) => {
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

  const [lines, setLines] = useState([
    { type: "system", text: "Welcome to keshav's terminal!" },
    { type: "system", text: "Type 'help' for commands." },
  ]);

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);


  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "help")
      return [
        { type: "output", color: "yellow", text: "help     - list commands" },
        { type: "output", color: "yellow", text: "about    - about me" },
        { type: "output", color: "yellow", text: "neofetch - system info" },
        { type: "output", color: "yellow", text: "kitty    - display an ASCII kitty" },
        { type: "output", color: "yellow", text: "skills   - my tech stack" },
        { type: "output", color: "yellow", text: "contact  - get in touch" },
        { type: "output", color: "yellow", text: "clear    - clear terminal" },
      ];

    if (trimmed === "about")
      return [
        { type: "output", color: "blue", text: "👨‍💻  Keshav Gilhotra" },
        { type: "output", color: "blue", text: "Full-Stack Developer" },
        { type: "output", color: "blue", text: "Open Source Contributor" },
      ];

    if (trimmed === "neofetch")
      return [
        { type: "output", color: "green", text: "🖥️  OS: Arch Linux x86_64 🐧" },
        { type: "output", color: "green", text: "⏱️  Uptime: 18 years 🚗💨" },
        { type: "output", color: "green", text: "📦 Packages: 742 (pacman), 69 (pnpm)" },
        { type: "output", color: "green", text: "🐚 Shell: /bin/fish 🐟" },
        { type: "output", color: "green", text: "📝 Editors: nvim, vscode ⚡" },
        { type: "output", color: "green", text: "🎨 Theme: Catppuccin ✨" },
        { type: "output", color: "green", text: "⚙️  Tech Stack: JavaScript, Java, Python, C-lang, React ⚛️, Node.js 🟢, MongoDB 🍃, Docker 🐳, AWS" },
        { type: "output", color: "green", text: "🔗 Links: github.com/ikeshav26 | portfolio.ikeshav.tech | in/ikeshav-gilhotra" },
        { type: "output", color: "yellow", text: "💡 'I use arch btw !!' ✨" },
      ];

    if (trimmed === "skills")
      return [
        { type: "output", color: "pink", text: "⚛ React, Next.js, Node.js" },
        { type: "output", color: "pink", text: "🐍 Python, Java, JavaScript" },
        { type: "output", color: "pink", text: "🐳 Docker, AWS, GitHub Actions" },
      ];

    if (trimmed === "contact")
      return [
        { type: "output", color: "blue", text: "GitHub: @ikeshav26" },
        { type: "output", color: "blue", text: "Email:  keshavgilhotra4@gmail.com" },
      ];

     if (trimmed === "kitty")
      return [
        { type: "output", color: "yellow", text: "✨🐾✨" },
        { type: "output", color: "pink", text: "  /\\_/\\   " },
        { type: "output", color: "pink", text: " ( o.o )  " },
        { type: "output", color: "pink", text: " >  ^  <  " },
        { type: "output", color: "yellow", text: "Meow! 🐱💖 Here's a cute kitty!" },
      ];


    if (trimmed === "clear") {
      setLines([]);
      return [];
    }

    if (trimmed === "") return [];

    return [{ type: "error",color:"red", text: `Command not found: ${cmd}` }];
  };

  const handleSubmit = () => {
    const output = handleCommand(input);

    if (input.trim().toLowerCase() !== "clear") {
      setLines([...lines, { type: "input", text: input }, ...output]);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            onClick={(e) => e.stopPropagation()}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="bg-gradient-to-br from-[#181818]/90 to-[#141414]/80 backdrop-blur-xl border border-[#222] rounded-2xl overflow-hidden shadow-[0_0_60px_-15px_rgba(74,222,128,0.10),0_20px_40px_-20px_rgba(0,0,0,0.08)] w-[600px] max-w-[90vw] transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-[#222] to-[#1a1a1a] px-5 py-3 flex items-center gap-3 border-b border-[#00f050]/15">
              <div className="flex gap-2.5">
                <div onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] cursor-pointer hover:opacity-80"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#4ade80]"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-[#00f050]/80 text-sm font-mono">keshav@portfolio</span>
              </div>
              <div className="w-16"></div>
            </div>

            <div
              ref={scrollRef}
              className="p-5 h-[400px] overflow-y-auto font-mono text-sm leading-tight bg-gradient-to-b from-[#0d0d0d] to-[#080808] terminal-scrollbar"
            >
              {lines.map((line, i) => (
                <div key={i} className={`py-0.5 ${
                  line.type === "input" ? "text-[#00f050]" : ""
                } ${line.type === "output" ? "pl-4" : ""} ${
                  line.type === "system" ? "text-[#00f050]/60 italic text-xs" : ""
                } ${line.type === "error" ? "pl-4" : ""}`} style={{paddingTop: "2px", paddingBottom: "2px"}}>
                  {line.type === "input" ? (
                    `❯ ${line.text}`
                  ) : (
                    <span
                      className={
                        line.type === "error"
                          ? "text-red-500 font-semibold"
                          : line.color === "green"
                          ? "text-green-400"
                          : line.color === "blue"
                          ? "text-blue-400"
                          : line.color === "yellow"
                          ? "text-yellow-400"
                          : line.color === "pink"
                          ? "text-pink-400"
                          : "text-white/85"
                      }
                    >
                      {line.text}
                    </span>
                  )}
                </div>
              ))}

              <div className="flex items-center mt-3 pt-2 border-t border-white/5">
                <span className="text-[#00f050] text-lg">❯</span>
                <input
                  className="bg-transparent flex-1 ml-3 outline-none text-white caret-[#00f050]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="type a command..."
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}