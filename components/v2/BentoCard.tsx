"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import BentoModal from "./BentoModal";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
  modalContent?: React.ReactNode;
  modalTitle?: string;
  modalDescription?: string;
}

const BentoCard = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  onClick,
  href,
  style,
  modalContent,
  modalTitle,
  modalDescription,
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

  const content = (
    <motion.div
      whileHover={modalContent || onClick || href ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5",
        "p-6",
        "transition-all duration-300",
        "hover:border-slate-300 dark:hover:border-white/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20",
        colSpanClass[colSpan],
        rowSpanClass[rowSpan],
        onClick || href || modalContent ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
      style={style}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {children}
        </a>
      ) : (
        children
      )}
    </motion.div>
  );

  if (modalContent) {
    return (
      <BentoModal 
        trigger={content} 
        title={modalTitle} 
        description={modalDescription}
      >
        {modalContent}
      </BentoModal>
    );
  }

  return content;
};

export default BentoCard;
