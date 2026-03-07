"use client";

// Section Components - Direct imports
import Hero from "@/components/v1/Hero";
import AboutMe from "@/components/v1/AboutMe";
import ActivityDashboard from "@/components/v1/ActivityDashboard";
import Work from "@/components/v1/Work";
import Skills from "@/components/v1/Skills";
import Contact from "@/components/v1/Contact";
import InteractiveBadge from "@/components/v1/InteractiveBadge";

const Home = () => {
  return (
    <section className="h-full relative">
      <div className="container mx-auto h-full">
        {/* Hero Section - Above the fold, render immediately */}
        <Hero />

        {/* Below the fold sections - use content-visibility optimization */}
        <div className="content-auto">
          <div className="border-b border-slate-200 dark:border-white/10" />
          <Work limit={5} />
        </div>
        <div className="content-auto">
          <div className="border-b border-slate-200 dark:border-white/10" />
          <Skills />
        </div>
        <div className="content-auto">
          <div className="border-b border-slate-200 dark:border-white/10" />
          <AboutMe />
        </div>
        <div className="content-auto">
          <div className="border-b border-slate-200 dark:border-white/10" />
          <ActivityDashboard />
        </div>
        <div className="content-auto">
          <div className="border-b border-slate-200 dark:border-white/10" />
          <Contact />
        </div>
        <div className="content-auto">
          <div className="border-b border-slate-200 dark:border-white/10" />
          <InteractiveBadge name="Neon Stain" title="Full Stack Developer" handle="neonstain" status="Available" contactText="Contact Me" avatarUrl="photo.jpg" />
        </div>
      </div>
    </section>
  );
};

export default Home;
