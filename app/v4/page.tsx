import React from "react";
import { Hero } from "@/components/v4/sections/hero";
import { GitHubHeatmap } from "@/components/v4/ui/github-heatmap";
import { FeaturedProjects } from "@/components/v4/sections/featured-projects";
import { RecentPRs } from "@/components/v4/sections/recent-prs";
import { HomeComponents } from "@/components/v4/sections/home-components";
import { RecentBlogs } from "@/components/v4/sections/recent-blogs";
import { LearningLog } from "@/components/v4/sections/learning-log";
import { AnimatedSection } from "@/components/v4/ui/animated-section";

export default function V4HomePage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <AnimatedSection delay={0}>
        <Hero />
      </AnimatedSection>
      <AnimatedSection delay={0.08}>
        <GitHubHeatmap />
      </AnimatedSection>
      <AnimatedSection delay={0.12}>
        <FeaturedProjects />
      </AnimatedSection>
      <AnimatedSection>
        <RecentPRs />
      </AnimatedSection>
      <AnimatedSection>
        <HomeComponents />
      </AnimatedSection>
      <AnimatedSection>
        <RecentBlogs />
      </AnimatedSection>
      <AnimatedSection>
        <LearningLog />
      </AnimatedSection>
    </div>
  );
}
