"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import SidebarNav from "./SidebarNav";
import { TopBar } from "./TopBar";
import HeroProfileCard from "./HeroProfileCard";
import MapCard from "./MapCard";
import CurrentMoodCard from "./CurrentMoodCard";
import NowPlayingCard from "./NowPlayingCard";
import GetInTouchCard from "./GetInTouchCard";
import FeaturedProjectsCard from "./FeaturedProjectsCard";
import TechStackGridCard from "./TechStackGridCard";
import InteractiveTerminalCard from "./InteractiveTerminalCard";
import AboutMeCard from "./AboutMeCard";
import { JourneyCard } from "./JourneyCard";
import { RecentActivityCard } from "./RecentActivityCard";

export default function BentoGrid() {
  const [activeTab, setActiveTab] = useState("overview");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050708] text-[#e0e8e6] antialiased selection:bg-[#00FF87] selection:text-black relative overflow-x-hidden">
      {/* Planet Backdrop Atmosphere on the Left */}
      <div className="absolute left-0 top-0 h-full w-[450px] pointer-events-none overflow-hidden z-0 opacity-40">
        <Image
          src="/v2/space-bg.png"
          alt="Cosmic planet atmosphere"
          width={450}
          height={1080}
          className="w-full h-full object-cover object-left filter brightness-90 contrast-125"
          priority
        />
      </div>
      <div className="cosmic-atmosphere" />
      <div className="cosmic-planet-sphere" />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Left Sidebar Rail */}
        <SidebarNav activeTab={activeTab} onTabChange={scrollToSection} />

        {/* Main Content Dashboard */}
        <main
          className="flex-1 flex flex-col px-3 sm:px-5 py-4 max-w-7xl mx-auto w-full overflow-hidden"
          data-purpose="main-dashboard"
        >
          {/* Top Bar Navigation */}
          <TopBar onConnectClick={() => scrollToSection("contact")} />

          {/* ============================================== */}
          {/* BENTO GRID SYSTEM                              */}
          {/* ============================================== */}
          <div className="grid grid-cols-12 gap-3.5 flex-1">
            {/* ==================== ROW 1 ==================== */}
            {/* Card 1.1: Hero Profile (5 Cols) */}
            <HeroProfileCard onContactClick={() => scrollToSection("contact")} />

            {/* Card 1.2: Location (4 Cols) */}
            <MapCard className="col-span-12 md:col-span-6 lg:col-span-4" />

            {/* Card 1.3: Current Mood / Manga Visual (3 Cols) */}
            <CurrentMoodCard />

            {/* ==================== ROW 2 ==================== */}
            {/* Card 2.1: Now Playing / Lo-Fi Beats (3 Cols) */}
            <NowPlayingCard />

            {/* Card 2.2: Get In Touch (2 Cols) */}
            <GetInTouchCard />

            {/* Card 2.3: Featured Projects Showcase (4 Cols) */}
            <FeaturedProjectsCard />

            {/* Card 2.4: Tech Stack (3 Cols) */}
            <TechStackGridCard />

            {/* ==================== ROW 3 ==================== */}
            {/* Card 3.1: Interactive Terminal (3 Cols) */}
            <InteractiveTerminalCard />

            {/* Card 3.2: About Me (4 Cols) */}
            <AboutMeCard />

            {/* Card 3.3: Journey / Timeline (2 Cols) */}
            <JourneyCard />

            {/* Card 3.4: Recent Activity Feed (3 Cols) */}
            <RecentActivityCard />
          </div>

          {/* ==================== SITE FOOTER ==================== */}
          <footer
            className="mt-4 pt-3 border-t border-[#121f1c] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6e827f]"
            data-purpose="site-footer"
          >
            {/* Social Links */}
            <div className="flex items-center gap-3 text-xs text-[#708481]">
              <a
                href="https://github.com/addynoven"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="GitHub"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/addynoven"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/addynoven"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="X Twitter"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:adityasahu2524@gmail.com"
                className="hover:text-white transition"
                aria-label="Email"
              >
                <FaEnvelope className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Creator credits */}
            <div className="text-[10px] font-medium text-[#869c99]">
              Made with <span className="text-[#00FF87]">💚</span> by Aditya
            </div>

            {/* Portfolio Version Switcher */}
            <VersionSwitcher />
          </footer>
        </main>
      </div>
    </div>
  );
}
