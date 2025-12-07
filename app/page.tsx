"use client";
import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import RetroGrid from "@/components/ui/retro-grid";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { FiDownload } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Services from "@/components/sections/Services";
import Resume from "@/components/sections/Resume";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Typewriter from "typewriter-effect";

const Home = () => {
  return (
    <section className="h-full relative">
      <div className="container mx-auto h-full">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center py-8 xl:py-12">
             <div className="flex flex-col xl:flex-row items-center justify-between xl:justify-evenly pb-0">
            {/* text */}
            <div className="text-center xl:text-left order-2 xl:order-none">
              <span className="text-xl flex items-center justify-center xl:justify-start gap-2">
                <Typewriter
                  options={{
                    strings: [
                      "Full Stack Developer",
                      "MERN Stack Developer",
                      "React.js Specialist",
                      "UI/UX Enthusiast",
                      "Problem Solver",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 80,
                  }}
                />
              </span>
              <h1 className="h1 mb-6">
                Hello I'm <br />
                <span className="text-UserAccent">Aditya Sahu</span>
              </h1>

              <p className="max-w-[500px] mb-9 text-white/80 dark:text-white/80">
                I excel at crafting elegant digital experiences and I am
                proficient in various programming languages, frameworks and
                technologies.
              </p>
              {/* button and Social */}
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <a href="/resume.pdf" download="Aditya_Sahu_Resume.pdf">
                  <Button
                    variant="outline"
                    size="lg"
                    className="uppercase flex items-center gap-2"
                  >
                    Download Resume &nbsp;
                    <FiDownload className="text-xl" />
                  </Button>
                </a>
                <div>
                  <Social
                    containerStyles={"flex gap-6"}
                    iconStyles={
                      "w-12 text-xl aspect-square border border-UserAccent rounded-full flex items-center justify-center text-UserAccent text-base hover:bg-UserAccent hover:text-primary transition-all duration-500"
                    }
                  />
                </div>
              </div>
            </div>
            {/* photo */}
            <div className="order-1 xl:order-none mb-8 xl:mb-0">
              <Photo />
            </div>
          </div>
          <Stats />
        </section>

        {/* Other Sections */}
        <div className="border-b border-white/10" />
        <Services />
        <div className="border-b border-white/10" />
        <Resume />
        <div className="border-b border-white/10" />
        <Work />
        <div className="border-b border-white/10" />
        <Contact />
      </div>
      
      {/* background */}
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
