"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import { useSiteName } from "@/hooks/useSiteName";

const Header = () => {
  const siteName = useSiteName(false);

  return (
    <header className="py-3.5 xl:py-4 text-slate-900 dark:text-white sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-slate-200/60 dark:border-white/5 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* logo */}
        <Link href="/v1" className="flex items-center shrink-0">
          <h1 className="text-2xl xl:text-3xl font-bold font-mono tracking-tight hover:opacity-90 transition-opacity">
            {siteName}<span className="text-UserAccent">.</span>
          </h1>
        </Link>

        {/* nav */}
        <div className="hidden lg:flex items-center">
          <Nav />
        </div>

        {/* actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link href="#contact">
            <Button className="font-mono text-xs px-4 h-9 bg-UserAccent text-primary hover:bg-UserAccent/90">
              Hire me
            </Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
