import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateRandomString } from "@/lib/scramble-utils";

export const FullScreenScramble = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Initial fill - massive amount to ensure coverage
    setContent(generateRandomString(10000));

    const interval = setInterval(() => {
      // Refresh a portion of the string for chaos
      setContent((prev) => {
         // Performance optimization: only regenerate a chunk instead of mapping all
         // But for true chaos, simplified replacement is okay for now if string isn't too huge
         const newStr = prev.split("").map(c => Math.random() > 0.95 ? generateRandomString(1) : c).join("");
         return newStr;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.8, ease: "easeInOut" } }} // Handling exit in parent
      className="fixed inset-0 z-0 overflow-hidden break-all font-mono text-sm leading-tight text-slate-300 dark:text-gray-800 pointer-events-none select-none opacity-20"
    >
      {content}
    </motion.div>
  );
};
