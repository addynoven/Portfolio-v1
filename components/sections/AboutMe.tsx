"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Photo on the left - renders instantly */}
          <motion.div
            className="order-2 xl:order-1 flex-shrink-0"
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
                ease: "easeInOut",
              }}
            >
              <Photo />
            </motion.div>
          </motion.div>

          {/* Text content on the right - renders instantly */}
          <motion.div
            className="order-1 xl:order-2 text-center xl:text-left max-w-2xl mb-8 xl:mb-0"
          >
            <motion.div>
              <h3 className="text-4xl font-bold text-UserAccent">About Me</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
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
