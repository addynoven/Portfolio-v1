"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
}

const BentoCard = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  onClick,
  href,
  style,
}: BentoCardProps) => {
  const colSpanClass = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-2 lg:col-span-3",
    4: "col-span-1 md:col-span-2 lg:col-span-4",
  };

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
  };

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5",
        "p-6",
        "transition-all duration-300",
        "hover:border-slate-300 dark:hover:border-white/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20",
        colSpanClass[colSpan],
        rowSpanClass[rowSpan],
        onClick || href ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
      style={style}
    >
      {href ? (
        <a {...wrapperProps} className="block h-full">
          {children}
        </a>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default BentoCard;
