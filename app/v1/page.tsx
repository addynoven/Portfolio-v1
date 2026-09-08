"use client";

// Section Components - Direct imports
import Hero from "@/components/v1/Hero";
import Experience from "@/components/v1/Experience";
import Work from "@/components/v1/Work";
import Skills from "@/components/v1/Skills";
import AboutMe from "@/components/v1/AboutMe";
import ActivityDashboard from "@/components/v1/ActivityDashboard";
import Contact from "@/components/v1/Contact";
import InteractiveBadge from "@/components/v1/InteractiveBadge";

const Home = () => {
  return (
    <main className="min-h-screen relative w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-20 xl:space-y-28 pb-20">
        {/* Hero Section */}
        <Hero />

        {/* Work Experience */}
        <Experience />

        {/* Featured Projects */}
        <Work />

        {/* Skills & Tech Stack */}
        <Skills />

        {/* About Me & Credentials */}
        <AboutMe />

        {/* Activity & Stats Dashboard */}
        <ActivityDashboard />

        {/* Contact */}
        <Contact />

        {/* Interactive Badge */}
        <InteractiveBadge
          name="Neon Stain"
          title="Full Stack Developer"
          handle="neonstain"
          status="Available"
          contactText="Contact Me"
          avatarUrl="/photo.jpg"
        />
      </div>
    </main>
  );
};

export default Home;
