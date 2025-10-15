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
const Home = () => {
  return (
    <section className="h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.5, ease: "easeIn" },
        }}
      >
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:justify-evenly xl:pt-8 xl:pb-24">
            {/* text */}
            <div className="text-center xl:text-left order-2 xl:order-none">
              <span className="text-xl">Software Developer</span>
              <h1 className="h1 mb-6">
                Hello I'm <br />
                <span className="text-UserAccent">Neon Stain</span>
              </h1>

              <p className="max-w-[500px] mb-9 text-white/80">
                I excel at crafting elegant digital experience and I am
                proficient in various programming languages,frameworks and
                technologies.
              </p>
              {/* button and Social */}
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  Download Resume &nbsp;
                  <FiDownload className="text-xl" />
                </Button>
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
        </div>
        {/* background */}
        <div className="absolute inset-0 -z-10 w-full h-full">
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
      </motion.div>
    </section>
  );
};

export default Home;
