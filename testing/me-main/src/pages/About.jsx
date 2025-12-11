import React from "react";
import Git from "../components/ui/Git";
import { lazy } from "react";
const Heading = lazy(() => import("../components/ui/Heading"));
const Stack = lazy(() => import("../components/Stack"));

const About = () => {
  return (
    <div className="min-h-screen px-6 md:px-0  sm:py-16 md:py-20 mt-86 md:mt-69">
      <Heading text={"ABOUT ME"} />
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center gap-10 sm:gap-12 md:gap-16">
        <div className="quote w-full md:w-4/5 lg:w-3/4 mx-auto md:ml-[10%] font-light font-[font2] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tighter text-[#c8c8c8]">
          I mostly focus on making apps that actually feel good to use — fast,
          clean and not confusing. Also exploring DevOps, doing some open-source
          stuff, and learning system design on the side.{" "}
        </div>

        <div className="w-full md:ml-[10%]">
          <div className="font-[font2] text-base sm:text-lg md:text-xl text-[#c8c8c8]/60 mb-3 sm:mb-4">
            This is me.
          </div>
          <div className="h-[1.2px] w-full md:w-[85vw] lg:w-[60vw] bg-[#c8c8c8]/20"></div>
        </div>

        <div className="w-full md:ml-[10%] md:mr-[5%] flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16">
          <div className="font-[font1] text-xl sm:text-2xl md:text-2xl lg:text-4xl text-[#c8c8c8] md:w-1/3 lg:w-2/5 shrink-0">
            Hi, I'm <span className="text-[#00f050]">KESHAV GILHOTRA .</span>
          </div>
          <div className="flex flex-col gap-4 md:gap-6 font-[font2] text-sm sm:text-base md:text-lg text-[#c8c8c8]/70 flex-1">
            <span className="hidden md:block w-full md:w-2/3">
              I'm a full stack web developer focused on turning ideas into
              scalable, real-world digital solutions. I build end-to-end web
              apps that blend clean design, efficient backend logic, and smooth
              user experiences — and I also contribute to open-source whenever I
              can.
            </span>
            <span className="hidden md:block w-full md:w-2/3">
              I try to create systems that are fast, reliable, and actually
              useful for both users and businesses. I'm also diving into DevOps
              practices and improving my system design skills to build things
              that perform well and stay maintainable as they grow.
            </span>
            <span className="bloc md:hidden w-full md:w-2/3">
            I'm a full stack web developer who loves building scalable, user-focused applications. I contribute to open-source, explore DevOps, and keep improving my system design skills. Along with that, I'm also learning Java and DSA to level up my overall engineering foundation.
            </span>
          </div>
        </div>
      </div>
      <Git />
      <Stack />
    </div>
  );
};

export default About;
