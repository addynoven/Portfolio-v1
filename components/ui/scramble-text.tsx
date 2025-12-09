"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  scrambleSpeed?: number;
}

export const ScrambleText = ({
  text,
  className,
  duration = 2000,
  delay = 0,
  scrambleSpeed = 30, // ms per tick
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    
    // Initial content (random length) or empty
    setDisplayText(
        Array(text.length)
          .fill(0)
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join("")
      );

    timeout = setTimeout(() => {
      let iteration = 0;
      
      interval = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) { 
          clearInterval(interval);
        }
        
        // Speed control: adjust how many ticks per character reveal
        // Total duration covers text.length chars.
        // iteration += 1 means 1 char per tick.
        // We want total duration.
        // ticks = duration / scrambleSpeed
        // increment = text.length / ticks
        iteration += text.length / (duration / scrambleSpeed); 
      }, scrambleSpeed);
      
    }, delay * 1000); // delay is usually passed in seconds in my other components, but let's assume ms if explicitly number, wait... Framer usually uses seconds. Let's make it flexible. 
    // Actually, typical props use ms for generic components or s for animations. Let's standardize on ms for this prop or handle seconds.
    // Given usage in LoadingScreen timeouts (2000, 3000), let's assume ms.

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, duration, delay, scrambleSpeed]);

  return (
    <motion.span 
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};
