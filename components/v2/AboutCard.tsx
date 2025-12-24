"use client";

import Image from "next/image";
import BentoCard from "./BentoCard";
import { FaArrowRight } from "react-icons/fa";

const AboutCard = () => {
  return (
    <>
      {/* Photo Card */}
      <BentoCard colSpan={1} rowSpan={2} className="p-0 overflow-hidden">
        <div className="relative w-full h-full min-h-[300px]">
          <Image
            src="/photo.jpg"
            alt="Aditya Sahu"
            fill
            className="object-cover object-top"
          />
        </div>
      </BentoCard>

      {/* About Text Card */}
      <BentoCard colSpan={2} rowSpan={1} className="flex flex-col justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">
            About
          </span>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
            Passionate about building products and enjoy solving problems.
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <a 
            href="/v1/#about"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <FaArrowRight className="w-4 h-4" />
          </a>
        </div>
      </BentoCard>
    </>
  );
};

export default AboutCard;
