"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

const Photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 1.2,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
      >
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          scale={1.05}
          transitionSpeed={1000}
          className="relative flex justify-center items-center"
        >
          {/* image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 1.8,
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            className="w-[290px] h-[290px] xl:w-[420px] xl:h-[420px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mix-blend-lighten z-10"
          >
            <div className="relative w-full h-full">
               <Image
                src="/photo.jpg"
                alt="photography"
                fill
                priority
                quality={100}
                className="object-contain rounded-full"
              />
            </div>
          </motion.div>

          {/* circle */}
          <motion.svg
            className="w-[300px] xl:w-[436px] h-[300px] xl:h-[436px]"
            fill="transparent"
            viewBox="0 0 506 506"
            xmlns={"http://www.w3.org/2000/svg"}
          >
            <motion.circle
              cx="253"
              cy="253"
              r="253"
              stroke="#00ff99"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ strokeDasharray: "24 10 0 0" }}
              animate={{
                strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                rotate: [120, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeIn",
              }}
            />
          </motion.svg>
        </Tilt>
      </motion.div>
    </div>
  );
};

export default Photo;
