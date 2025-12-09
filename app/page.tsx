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
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight, scaleIn } from "@/hooks/useScrollAnimation";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingCodeSymbols from "@/components/FloatingCodeSymbols";
import HeroTiltCard from "@/components/HeroTiltCard";

const Home = () => {
  return (
    <section className="h-full relative">
      <div className="container mx-auto h-full">
        {/* Hero Section */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex flex-col justify-center pt-4 pb-2 xl:pt-6 xl:pb-4 relative">
          {/* Three.js Particle Background */}
          <ParticleBackground />
          {/* Floating Code Symbols */}
          <FloatingCodeSymbols />
          <motion.div 
            className="flex flex-col xl:flex-row items-center justify-between xl:justify-evenly pb-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* text */}
            <HeroTiltCard className="text-center xl:text-left order-2 xl:order-none">
            <motion.div 
              variants={staggerItem}
            >
              {/* Typewriter role */}
              <motion.span 
                className="text-xl flex items-center justify-center xl:justify-start gap-2"
                variants={fadeInLeft}
                custom={0.2}
              >
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
              </motion.span>
              
              {/* Main heading with staggered reveal */}
              <motion.h1 
                className="h1 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  Hello I'm
                </motion.span>
                <br />
                <motion.span 
                  className="text-UserAccent inline-block relative"
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    filter: "blur(0px)",
                  }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{
                    textShadow: "0 0 40px rgba(34, 197, 94, 0.5), 0 0 80px rgba(34, 197, 94, 0.3)",
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    textShadow: "0 0 60px rgba(34, 197, 94, 0.8), 0 0 120px rgba(34, 197, 94, 0.5)",
                  }}
                >
                  Neon Stain
                </motion.span>
              </motion.h1>

              <motion.p 
                className="max-w-[500px] mb-6 text-slate-600 dark:text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                I excel at crafting elegant digital experiences and I am
                proficient in various programming languages, frameworks and
                technologies.
              </motion.p>
              
              {/* button and Social with spring physics */}
              <motion.div 
                className="flex flex-col xl:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1,
                  ease: [0.34, 1.56, 0.64, 1] // Spring bounce
                }}
              >
                <motion.a 
                  href="/resume.pdf" 
                  download="Aditya_Sahu_Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="uppercase"
                  >
                    <FiDownload className="text-xl" />
                    <span>Download Resume</span>
                  </Button>
                </motion.a>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Social
                    containerStyles={"flex gap-6"}
                    iconStyles={
                      "w-12 text-xl aspect-square border border-UserAccent rounded-full flex items-center justify-center text-UserAccent text-base hover:bg-UserAccent hover:text-primary transition-all duration-500"
                    }
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            </HeroTiltCard>
            {/* photo with floating effect */}
            <motion.div 
              className="order-1 xl:order-none mb-8 xl:mb-0"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <motion.div
                animate={{ 
                  y: [-8, 8, -8],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Photo />
              </motion.div>
            </motion.div>
          </motion.div>
          <Stats />
        </section>

        {/* Other Sections */}
        <div className="border-b border-slate-200 dark:border-white/10" />
        <Services />
        <div className="border-b border-slate-200 dark:border-white/10" />
        <Resume />
        <div className="border-b border-slate-200 dark:border-white/10" />
        <Work />
        <div className="border-b border-slate-200 dark:border-white/10" />
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

