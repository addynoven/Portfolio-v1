"use client";

import { useState } from "react";
import BentoCard from "./BentoCard";
import { FaTerminal } from "react-icons/fa";

const COMMANDS = [
  {
    id: "arch",
    cmd: "arch --rules",
    output: [
      "1. Clarity > cleverness",
      "2. Modular monoliths first",
      "3. Black-box integration tests",
    ],
  },
  {
    id: "stack",
    cmd: "sys --status",
    output: [
      "✓ Runtime: Node.js / Go",
      "✓ Data: Postgres + Redis",
      "✓ Status: 99.9% Uptime",
    ],
  },
];

const TerminalCard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BentoCard colSpan={1} rowSpan={1} className="p-3 h-full min-h-0 overflow-hidden flex flex-col justify-between font-mono">
      {/* Terminal Window Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
          <span className="text-[9px] text-slate-400 dark:text-gray-500 ml-1">aditya@sys:~</span>
        </div>
        <div className="flex gap-1">
          {COMMANDS.map((item, idx) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(idx);
              }}
              className={`px-1.5 py-0.5 rounded text-[8px] transition-colors ${
                activeTab === idx
                  ? "bg-UserAccent/20 text-UserAccent font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {item.id}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="my-auto py-1.5 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] text-UserAccent font-semibold">
          <span className="text-slate-500 dark:text-gray-400">$</span>
          <span>{COMMANDS[activeTab].cmd}</span>
        </div>
        <div className="space-y-0.5 pl-3 border-l border-UserAccent/30 text-[10px] text-slate-600 dark:text-gray-300">
          {COMMANDS[activeTab].output.map((line, i) => (
            <p key={i} className="leading-snug">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="flex items-center justify-between text-[8px] text-slate-400 dark:text-gray-500 pt-1 border-t border-slate-200 dark:border-white/5">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          bash ready
        </span>
        <span className="text-slate-500">UTF-8</span>
      </div>
    </BentoCard>
  );
};

export default TerminalCard;
