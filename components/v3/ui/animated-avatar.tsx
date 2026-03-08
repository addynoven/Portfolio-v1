"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import RGBDistortionImage from "@/components/v1/RGBDistortionImage";
import { METADATA } from "@/app/v3/constants";

interface AnimatedAvatarProps {
  className?: string;
}

const AnimatedAvatar = ({ className = "" }: AnimatedAvatarProps) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        }}
      >
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          scale={1.05}
          transitionSpeed={1000}
          className="relative flex justify-center items-center w-28 h-28 md:w-36 md:h-36"
        >
          {/* image with RGB distortion effect */}
          <motion.div
            className="w-full h-full mix-blend-lighten z-10 overflow-hidden rounded-full ring-1 ring-border/20 shadow-lg backdrop-blur-3xl"
          >
            <RGBDistortionImage
              src="/photo.jpg"
              alt={`${METADATA.name} avatar`}
              intensity={1.2}
              waveFrequency={8.0}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Tilt>
      </motion.div>
    </div>
  );
};

export default AnimatedAvatar;
