"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

interface Item {
  id: string;
  label: string;
}

// How far from the top of the viewport counts as "active"
const OFFSET = 100; // px — accounts for sticky navbar height

export default function SidebarNavClient({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const lenis = useLenis();

  useEffect(() => {
    const getActive = () => {
      const scrollY = window.scrollY + OFFSET + 20;

      // If we've scrolled to the absolute bottom, activate the last item naturally
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 20) {
        setActive(items[items.length - 1].id);
        return;
      }

      // Walk sections top-down; the last one whose top is <= scrollY wins
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
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: -OFFSET,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      });
    } else {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden md:flex flex-col gap-0.5 h-fit w-44 shrink-0 select-none">
      <div className="absolute left-[5.5px] top-6 bottom-6 w-px bg-foreground/10" />

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
