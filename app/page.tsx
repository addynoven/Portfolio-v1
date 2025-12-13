"use client";

import { cn } from "@/lib/utils";
import RetroGrid from "@/components/ui/retro-grid";
import GridPattern from "@/components/ui/animated-grid-pattern";

// Section Components - Direct imports
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import ActivityDashboard from "@/components/sections/ActivityDashboard";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import InteractiveBadge from "@/components/sections/InteractiveBadge";

const Home = () => {
  return (
    <section className="h-full relative">
      <div className="container mx-auto h-full">
        {/* Hero Section */}
        <Hero />

        {/* Other Sections */}
        
        <div className="border-b border-slate-200 dark:border-white/10" />
        <Work limit={5} />
        <div className="border-b border-slate-200 dark:border-white/10" />
        <Skills />
        <div className="border-b border-slate-200 dark:border-white/10" />
        <AboutMe />
        <div className="border-b border-slate-200 dark:border-white/10" />
        <ActivityDashboard />
        <div className="border-b border-slate-200 dark:border-white/10" />
        <Contact />
        <div className="border-b border-slate-200 dark:border-white/10" />
        <InteractiveBadge name="Aditya Sahu" title="Full Stack Developer" handle="neonstain" status="Available" contactText="Contact Me" avatarUrl="photo.jpg" />
      </div>
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <div className="hidden xl:block">
          <RetroGrid />
        </div>
        <div className="block xl:hidden">
          <GridPattern
            numSquares={30}
            maxOpacity={0.2}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent_60%)]",
              "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
