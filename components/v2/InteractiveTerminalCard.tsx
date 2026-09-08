"use client";

import { useState } from "react";

const TERMINAL_COMMANDS = [
  {
    cmd: "whoami",
    output: "Aditya Sahu — Full-Stack Engineer & Systems Designer",
  },
  {
    cmd: "cat skills.txt",
    output: [
      "> Full-Stack Development",
      "> System Architecture & API Design",
      "> Distributed Systems & Caching",
      "> Integration-First Testing",
      "> Production Observability",
    ],
  },
  {
    cmd: "echo $MOTTO",
    output: "Keep Building, Keep Shipping.",
  },
];

export default function InteractiveTerminalCard() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section 
      className="col-span-12 md:col-span-6 lg:col-span-3 rounded-2xl bg-[#060a0a]/95 border border-[#152421] p-3.5 backdrop-blur-md font-mono flex flex-col justify-between shadow-lg min-h-[220px]"
      data-purpose="terminal-card"
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#121f1c]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="text-[9px] text-[#556966] ml-2">aditya@dev: ~</span>
        </div>
        <div className="flex items-center gap-1">
          {TERMINAL_COMMANDS.map((item, idx) => (
            <button
              key={item.cmd}
              onClick={() => setActiveTab(idx)}
              className={`px-1.5 py-0.2 rounded text-[7.5px] transition ${
                activeTab === idx
                  ? "bg-[#0c221b] text-[#00FF87] border border-[#184435]"
                  : "text-[#556966] hover:text-[#94a3b8]"
              }`}
            >
              {item.cmd.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="text-[9px] leading-relaxed py-1.5 flex flex-col gap-0.5 text-[#a5bbb8]">
        <p>
          <span className="text-[#00FF87] font-semibold">$ whoami</span>
        </p>
        <p className="text-white font-medium pl-1">Aditya Sahu</p>

        <p className="mt-0.5">
          <span className="text-[#00FF87] font-semibold">$ cat skills.txt</span>
        </p>
        <div className="text-[#8ba29e] pl-1 space-y-0.5 text-[8.5px]">
          <p>&gt; Full-Stack Development</p>
          <p>&gt; System Design</p>
          <p>&gt; API Architecture</p>
          <p>&gt; DevOps &amp; Deployment</p>
          <p>&gt; Continuous Learning</p>
        </div>

        <p className="mt-0.5 flex items-center">
          <span className="text-[#00FF87] font-semibold">$ echo &quot;Keep Building...&quot;</span>
        </p>
        <p className="text-[#fef08a] pl-1">Keep Building...</p>

        <p className="mt-0.5 flex items-center">
          <span className="text-[#00FF87] font-semibold">$ </span>
          <span className="inline-block w-2 h-3 bg-[#00FF87] ml-1.5 cursor-blink" />
        </p>
      </div>
    </section>
  );
}
