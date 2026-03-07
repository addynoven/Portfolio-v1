// "use client";

// import { useEffect, useState } from "react";

// const NAV_ITEMS = [
//     { id: "hero", label: "Home" },
//     { id: "contributions", label: "Contributions" },
//     { id: "experience", label: "Experience" },
//     { id: "skills", label: "Skills" },
//     { id: "projects", label: "Projects" },
// ];

// export default function SidebarNav() {
//     const [active, setActive] = useState<string>("hero");

//     useEffect(() => {
//         const observers: IntersectionObserver[] = [];

//         NAV_ITEMS.forEach(({ id }) => {
//             const el = document.getElementById(id);
//             if (!el) return;

//             const observer = new IntersectionObserver(
//                 ([entry]) => { if (entry.isIntersecting) setActive(id); },
//                 { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
//             );
//             observer.observe(el);
//             observers.push(observer);
//         });

//         return () => observers.forEach(o => o.disconnect());
//     }, []);

//     const scrollTo = (id: string) => {
//         document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
//     };

//     return (
//         <aside className="hidden lg:flex flex-col gap-0.5 sticky top-20 h-fit w-44 shrink-0 select-none">
//             {/* vertical guide line */}
//             <div className="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10 -z-10" />

//             {NAV_ITEMS.map(({ id, label }) => {
//                 const isActive = active === id;
//                 return (
//                     <button
//                         key={id}
//                         onClick={() => scrollTo(id)}
//                         className={`
//                             flex items-center gap-3 text-left text-base py-2 cursor-pointer
//                             transition-all duration-200
//                             ${isActive
//                                 ? "text-foreground font-semibold"
//                                 : "text-foreground/50 hover:text-foreground/70"}
//                         `}
//                     >
//                         <span
//                             className="shrink-0 rounded-full transition-all duration-200"
//                             style={{
//                                 width: isActive ? 13 : 8,
//                                 height: isActive ? 13 : 8,
//                                 marginLeft: isActive ? 0 : 3,
//                                 backgroundColor: isActive ? "var(--accent)" : "currentColor",
//                                 opacity: isActive ? 1 : 0.4,
//                             }}
//                         />
//                         {label}
//                     </button>
//                 );
//             })}
//         </aside>
//     );
// }


// SidebarNav.tsx (Server Component)

import SidebarNavClient from "@/components/v3/layout/SidebarNavClient";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "contributions", label: "Contributions" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "blogs", label: "Blogs" },
  { id: "projects", label: "Projects" },
];

export default function SidebarNav() {
  return <SidebarNavClient items={NAV_ITEMS} />;
}


