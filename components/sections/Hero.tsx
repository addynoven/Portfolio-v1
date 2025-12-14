"use client";

import { memo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import Typewriter from "typewriter-effect";
import Terminal from "@/components/Terminal";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import HeroTiltCard from "@/components/HeroTiltCard";
import ShinyText from "@/components/reactbits/TextAnimations/ShinyText";
import ClickSpark from "@/components/reactbits/Animations/ClickSpark";
import { useAccentColor } from "@/lib/accentColor";
import { LazyRender } from "@/components/LazyRender";
import { usePerformance } from "@/hooks/usePerformance";

// Lazy load heavy Three.js and animation components
const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);
const FloatingCodeSymbols = dynamic(
  () => import("@/components/FloatingCodeSymbols"),
  { ssr: false }
);

const Hero = memo(function Hero() {
  const accentColor = useAccentColor();
  const { isLowEnd } = usePerformance();
  
  // Delay heavy visual effects until after LCP (~1.5s)
  // This ensures the hero text renders immediately for Lighthouse
  // On low-end devices, skip these effects entirely
  const [showEffects, setShowEffects] = useState(false);
  
  useEffect(() => {
    if (isLowEnd) return; // Skip on low-end devices
    const timer = setTimeout(() => setShowEffects(true), 1500);
    return () => clearTimeout(timer);
  }, [isLowEnd]);
  
  return (
    <section id="home" className="min-h-[calc(100vh-80px)] flex flex-col justify-center pt-4 pb-2 xl:pt-6 xl:pb-4 relative">
      {/* Three.js Particle Background - delayed for LCP optimization */}
      {showEffects && (
        <LazyRender className="absolute inset-0 -z-10" keepMounted={false}>
          <ParticleBackground />
        </LazyRender>
      )}
      {/* Floating Code Symbols - delayed for LCP optimization */}
      {showEffects && (
        <LazyRender className="absolute inset-0 z-0 pointer-events-none" keepMounted={false}>
          <FloatingCodeSymbols />
        </LazyRender>
      )}
      <motion.div 
        className="flex flex-col xl:flex-row items-center justify-between xl:justify-evenly pb-0 relative z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {/* text */}
        <HeroTiltCard className="text-center xl:text-left order-2 xl:order-none">
        <motion.div>
          {/* Typewriter role */}
          <motion.span 
            className="text-xl flex items-center justify-center xl:justify-start gap-2"
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
          
          {/* Main heading - LCP optimized: renders instantly, animations are subtle */}
          <motion.h1 
            className="h1 mb-4"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Hello I'm
            </motion.span>
            <br />
            <motion.span 
              className="text-UserAccent inline-block relative"
              initial={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
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
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            I excel at crafting elegant digital experiences and I am
            proficient in various programming languages, frameworks and
            technologies.
          </motion.p>
          
          {/* button and Social */}
          <motion.div 
            className="flex flex-col xl:flex-row items-center gap-8"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ClickSpark sparkColor={accentColor} sparks={15} sparkSize={8}>
              <motion.a 
                href="/resume.pdf" 
                download="Neon_Stain_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase"
                >
                  <FiDownload className="text-xl" />
                  <ShinyText shimmerWidth={80} speed={3}>Download Resume</ShinyText>
                </Button>
              </motion.a>
            </ClickSpark>
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
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
        {/* Terminal - visible immediately */}
        <motion.div 
          className="order-1 xl:order-none mb-8 xl:mb-0"
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
        >
          <motion.div
            animate={{ 
              y: [-4, 4, -4],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Terminal />
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="relative z-20">
        <Stats />
      </div>
    </section>
  );
});

export default Hero;
