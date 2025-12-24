"use client";

import BentoCard from "./BentoCard";

const IntroCard = () => {
  return (
    <BentoCard colSpan={2} rowSpan={1} className="flex flex-col justify-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-800 dark:text-white mb-4">
        Hi, I'm Aditya —
      </h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
        Full Stack Developer, currently building{" "}
        <span className="text-slate-800 dark:text-white underline underline-offset-4 decoration-UserAccent">
          cool stuff
        </span>{" "}
        based in India.
      </p>
    </BentoCard>
  );
};

export default IntroCard;
