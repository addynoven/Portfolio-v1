'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaMagnifyingGlass, FaMoon, FaSun, FaArrowRight } from 'react-icons/fa6';

interface TopBarProps {
  onSearch?: (query: string) => void;
  onConnectClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onConnectClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#overview' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 z-20">
      {/* Capsule Nav Pills */}
      <nav className="flex items-center gap-1 p-1 rounded-full bg-[#090d0e] border border-[#152220] overflow-x-auto max-w-full">
        {navLinks.map((link) => {
          const isActive = activeTab === link.label;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveTab(link.label)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition whitespace-nowrap ${
                isActive
                  ? 'bg-[#0d221c] text-[#00FF87] border border-[#194034]'
                  : 'text-[#8da29f] hover:text-white'
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Search Bar, Moon Toggle, and Primary Connect CTA */}
      <div className="flex items-center gap-2.5">
        {/* Search input */}
        <div className="relative flex items-center flex-1 sm:flex-initial">
          <FaMagnifyingGlass className="absolute left-3.5 text-xs text-[#526462]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything..."
            className="h-8 pl-9 pr-8 text-xs bg-[#090d0e] border border-[#152220] rounded-full text-[#d6e2df] placeholder-[#526462] focus:outline-none focus:border-[#00FF87]/50 w-full sm:w-56 transition"
          />
          <span className="absolute right-3 text-[10px] font-mono text-[#526462] border border-[#172522] px-1 rounded select-none">
            /
          </span>
        </div>

        {/* Theme indicator */}
        <button
          title="Cyberpunk Dark Mode Active"
          className="w-8 h-8 rounded-full bg-[#090d0e] border border-[#152220] flex items-center justify-center text-[#8da29f] hover:text-[#00FF87] hover:border-[#1e3f34] transition shrink-0"
        >
          <FaMoon className="text-xs" />
        </button>

        {/* Primary Neon CTA Button */}
        <a
          href="mailto:adityasahu2524@gmail.com"
          onClick={onConnectClick}
          className="h-8 px-4 rounded-full bg-[#00FF87] text-black font-semibold text-xs flex items-center gap-1.5 glow-green-btn hover:bg-[#1aff96] transition-transform active:scale-95 shrink-0"
        >
          <span>Let&apos;s connect</span>
          <FaArrowRight className="text-[11px]" />
        </a>
      </div>
    </header>
  );
};
