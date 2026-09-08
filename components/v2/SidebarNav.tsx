"use client";

import Link from "next/link";
import { 
  FaHouse, 
  FaCube, 
  FaBriefcase, 
  FaLayerGroup 
} from "react-icons/fa6";
import { FaRegFileLines, FaRegPaperPlane } from "react-icons/fa6";

interface SidebarNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: FaHouse, href: "/v2" },
  { id: "projects", label: "Projects", icon: FaCube, href: "/v2#projects" },
  { id: "experience", label: "Experience", icon: FaBriefcase, href: "/v2#experience" },
  { id: "skills", label: "Skills", icon: FaLayerGroup, href: "/v2#skills" },
  { id: "blog", label: "Blog", icon: FaRegFileLines, href: "/v3/blogs" },
  { id: "contact", label: "Contact", icon: FaRegPaperPlane, href: "#contact" },
];

export default function SidebarNav({ activeTab = "overview", onTabChange }: SidebarNavProps) {
  return (
    <aside 
      className="hidden lg:flex w-44 shrink-0 border-r border-[#121c19] flex-col justify-between py-6 px-3.5 bg-[#050808]/90 backdrop-blur-md sticky top-0 h-screen z-20"
      data-purpose="sidebar-navigation"
    >
      {/* Top Brand Logo */}
      <div className="flex flex-col w-full px-1">
        <Link 
          href="/v2" 
          className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 group py-1"
        >
          <span>Aditya</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] glow-green-sm animate-pulse" />
        </Link>

        {/* Vertical Navigation Rail */}
        <nav className="mt-8 flex flex-col gap-1.5 w-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (onTabChange && item.href.startsWith("#")) {
                    e.preventDefault();
                    onTabChange(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? "bg-[#0c1f19] text-[#00FF87] font-semibold border border-[#184435] shadow-[0_0_12px_rgba(0,255,135,0.15)]"
                    : "text-[#7c928e] hover:text-white hover:bg-[#0a1210]"
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Quote & Copyright */}
      <div className="w-full flex flex-col items-center gap-3 px-1">
        <div className="w-full p-2.5 rounded-xl border border-[#18392f] bg-[#071310]/80 backdrop-blur-sm text-center shadow-[0_0_15px_rgba(0,255,135,0.08)]">
          <p className="text-[10px] font-semibold text-white leading-relaxed">
            &ldquo;Better Systems For A Brighter Tomorrow.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="w-4 h-0.5 rounded-full bg-[#00FF87]" />
            <span className="w-2 h-0.5 rounded-full bg-[#27443d]" />
          </div>
        </div>
        
        <div className="text-[8px] text-[#556966] leading-tight text-center">
          <p className="font-medium text-[#728784]">&copy; {new Date().getFullYear()}</p>
          <p className="font-semibold text-[#8b9e9b]">Aditya Sahu</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
}
