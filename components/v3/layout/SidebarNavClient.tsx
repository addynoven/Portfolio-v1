"use client";

import { useEffect, useState } from "react";
import { VersionSwitcher } from "@/components/VersionSwitcher";

interface Item {
  id: string;
  label: string;
}

// How far from the top of the viewport counts as "active"
const OFFSET = 120; // px — accounts for sticky navbar height

export default function SidebarNavClient({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const getActive = () => {
      const scrollY = window.scrollY + OFFSET;

      // Walk sections bottom-up; first one whose top is <= scrollY wins
      let current = items[0].id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = id;
        }
      }
      setActive(current);
    };

    getActive(); // run once on mount
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET + 4;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside className="hidden lg:flex flex-col gap-0.5 sticky top-20 h-fit w-44 shrink-0 select-none">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10 -z-10" />

      {items.map(({ id, label }) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`
              flex items-center gap-3 text-left text-base py-2 cursor-pointer
              transition-all duration-200
              ${isActive
                ? "text-foreground font-semibold"
                : "text-foreground/50 hover:text-foreground/70"
              }
            `}
          >
            <span
              className="shrink-0 rounded-full transition-all duration-200"
              style={{
                width: isActive ? 13 : 8,
                height: isActive ? 13 : 8,
                marginLeft: isActive ? 0 : 3,
                backgroundColor: isActive ? "var(--accent)" : "currentColor",
                opacity: isActive ? 1 : 0.4,
              }}
            />
            {label}
          </button>
        );
      })}
    </aside>
  );
}
