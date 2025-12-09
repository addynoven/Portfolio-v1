"use client";

import { motion } from "framer-motion";
import { textRevealContainer, textRevealChar } from "@/hooks/useScrollAnimation";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

// Text that reveals character by character
export const AnimatedText = ({ text, className = "", delay = 0, once = true }: AnimatedTextProps) => {
  const words = text.split(" ");
  
  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={textRevealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      custom={delay}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={textRevealChar}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

// Gradient text with animated reveal
export const AnimatedGradientText = ({ text, className = "", delay = 0, once = true }: AnimatedTextProps) => {
  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-UserAccent to-emerald-300 bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }
      }}
      viewport={{ once, margin: "-50px" }}
    >
      {text}
    </motion.span>
  );
};

// Section header with animated underline
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const AnimatedSectionHeader = ({ title, subtitle, className = "" }: SectionHeaderProps) => {
  return (
    <div className={`mb-12 ${className}`}>
      <motion.h2
        className="text-4xl xl:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <AnimatedText text={title} />
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-slate-600 dark:text-white/60 text-lg max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="h-1 bg-gradient-to-r from-UserAccent to-transparent mt-4 rounded-full"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ maxWidth: "200px" }}
      />
    </div>
  );
};

export default AnimatedText;
