"use client";

import React, { useState } from "react";
import { COMPONENTS_CATALOG, ComponentItem } from "@/lib/v4/constants";
import { SpotlightCard } from "@/components/v4/ui/spotlight-card";
import { FiCopy, FiCheck, FiTerminal, FiCode } from "react-icons/fi";

const CATEGORIES = ["All", "Navigation", "Animation", "Cards & Layout"];

export default function V4ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewCodeId, setViewCodeId] = useState<string | null>(null);

  const filteredComponents = COMPONENTS_CATALOG.filter(
    (c) => activeCategory === "All" || c.category === activeCategory
  );

  const handleCopyCommand = (c: ComponentItem) => {
    navigator.clipboard.writeText(c.installCommand);
    setCopiedId(c.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col w-full shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            GreatUI Catalog
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
          Interactive Components
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-lg leading-relaxed">
          Production-grade React & Tailwind primitives built with hardware-accelerated motion and zero-overhead APIs.
        </p>

        {/* Category Tabs */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Component Cards */}
      <div className="flex flex-col gap-4 w-full">
        {filteredComponents.map((component) => (
          <SpotlightCard key={component.id} className="flex flex-col h-full">
            {/* Live Preview Arena */}
            <div className="relative w-full aspect-[16/10] bg-[#0c0d10] p-6 flex flex-col items-center justify-center border-b border-[var(--surface-border-subtle)] overflow-hidden">
              {component.id === "floating-dock-menu" && (
                <div className="flex items-center gap-2 p-2 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md">
                  {["Home", "Projects", "Writing", "Docs"].map((item, idx) => (
                    <span
                      key={item}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-transform duration-200 hover:scale-110 cursor-pointer ${
                        idx === 1
                          ? "bg-zinc-100 text-zinc-900 font-semibold"
                          : "text-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {component.id === "staggered-transition" && (
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300 font-mono shadow-sm"
                    >
                      <span>Item {i}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                  ))}
                </div>
              )}

              {component.id === "word-focus" && (
                <div className="text-center px-4 font-serif text-2xl text-zinc-200">
                  <span className="text-zinc-500 hover:text-zinc-100 transition-colors cursor-pointer mr-2">
                    Crafting
                  </span>
                  <span className="text-zinc-100 underline decoration-zinc-600 decoration-1 underline-offset-4 cursor-pointer mr-2">
                    interfaces
                  </span>
                  <span className="text-zinc-500 hover:text-zinc-100 transition-colors cursor-pointer">
                    with intent.
                  </span>
                </div>
              )}

              {component.id === "spotlight-card" && (
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg text-center max-w-xs">
                  <span className="text-xs font-mono text-zinc-400">Hover inside to activate radial light</span>
                </div>
              )}
            </div>

            {/* Meta & Info */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-medium text-[var(--on-surface)]">
                    {component.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-container)] text-[var(--text-muted)] border border-[var(--surface-border)]">
                    {component.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {component.description}
                </p>
              </div>

              {/* Install Command & Code Toggle */}
              <div className="space-y-3 pt-3 border-t border-[var(--surface-border-subtle)]">
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--surface-container-lowest)] border border-[var(--surface-border)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2 truncate">
                    <FiTerminal className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)]" />
                    <span className="truncate text-[var(--on-surface)]">
                      {component.installCommand}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCommand(component)}
                    className="shrink-0 p-1 hover:text-[var(--primary)] transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {copiedId === component.id ? (
                      <FiCheck className="w-3.5 h-3.5 text-[var(--status-active)]" />
                    ) : (
                      <FiCopy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {component.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-container)] text-[var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setViewCodeId(viewCodeId === component.id ? null : component.id)
                    }
                    className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <FiCode className="w-3 h-3" />
                    <span>{viewCodeId === component.id ? "Hide code" : "View code"}</span>
                  </button>
                </div>

                {/* Code block dropdown */}
                {viewCodeId === component.id && (
                  <pre className="p-3 rounded-lg bg-[var(--surface-container-lowest)] border border-[var(--surface-border)] text-[10px] font-mono text-[var(--on-surface-variant)] overflow-x-auto leading-relaxed max-h-48">
                    <code>{component.codeSnippet}</code>
                  </pre>
                )}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
