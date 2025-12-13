"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { staggerContainer, staggerItem, fadeInLeft } from "@/hooks/useScrollAnimation";

// Lazy load heavy components
const ScrollReveal = dynamic(
  () => import("@/components/reactbits/TextAnimations/ScrollReveal"),
  { ssr: false }
);
const Photo = dynamic(
  () => import("@/components/Photo"),
  { ssr: false }
);

const AboutMe = memo(function AboutMe() {
  return (
    <section id="about" className="py-20 xl:py-32 relative z-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col xl:flex-row items-center justify-center xl:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Photo on the left */}
          <motion.div
            className="order-2 xl:order-1 flex-shrink-0"
            variants={staggerItem}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              animate={{
                y: [-4, 4, -4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Photo />
            </motion.div>
          </motion.div>

          {/* Text content on the right */}
          <motion.div
            className="order-1 xl:order-2 text-center xl:text-left max-w-2xl mb-8 xl:mb-0"
            variants={staggerItem}
          >
            <motion.div variants={fadeInLeft} custom={0.2}>
              <Typewriter
                options={{
                  strings: ["About Me"],
                  autoStart: true,
                  loop: false, // NO infinite loop - type once and stop
                  deleteSpeed: Infinity, // Never delete
                  delay: 80,
                  cursor: "_",
                  cursorClassName: "text-UserAccent",
                  wrapperClassName: "text-4xl font-bold text-UserAccent",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6"
            >
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                textClassName="text-slate-900 dark:text-white/90"
                fontSize="1.6rem"
              >
                I build things that actually work in the real world — sharp, fast, and user-friendly. Mostly focused on AI now, experimenting with models, fine-tuning, and pushing practical features into real products. Still love understanding how systems fit together, from backend design to deployment.
              </ScrollReveal>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default AboutMe;
