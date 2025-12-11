"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsQrCode } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QrCodePopupProps {
  url: string;
  className?: string;
}

const QrCodePopup = ({ url, className = "" }: QrCodePopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false); // Keeps it open after click
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate QR code URL - standard black on white for proper scanning
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000&format=png`;

  // Close on scroll (if pinned or open)
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
      setIsPinned(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle hover
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Only close on mouse leave if not pinned
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  // Handle click - toggle pin
  const handleClick = () => {
    if (isPinned) {
      // If already pinned, close everything
      setIsOpen(false);
      setIsPinned(false);
    } else {
      // Pin it open
      setIsOpen(true);
      setIsPinned(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative flex justify-center items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex justify-center items-center group cursor-pointer border border-slate-200/50 dark:border-white/10"
              whileHover={{ 
                scale: 1.1, 
                borderColor: "rgba(0, 255, 153, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              <BsQrCode className={`text-lg transition-colors duration-300 ${isOpen ? "text-UserAccent" : "text-slate-700 dark:text-white group-hover:text-UserAccent"}`} />
            </motion.div>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent>
              <p className="text-sm">Scan QR Code</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {/* QR Code Popup - positioned ABOVE the button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-1/2 z-50"
            style={{ 
              bottom: "100%", 
              marginBottom: "12px",
              x: "-50%" 
            }}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Popup container - compact square shape */}
            <div className="bg-black/95 border border-UserAccent/40 rounded-xl p-4 shadow-xl w-[170px] flex flex-col items-center">
              {/* Arrow pointing down */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black/95 border-r border-b border-UserAccent/40"
                style={{ bottom: "-6px" }}
              />
              
              {/* QR Code Image - white background, square */}
              <div className="bg-white rounded-lg p-2 mb-2 w-full flex justify-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Scan to open project"
                  width={130}
                  height={130}
                  className="block"
                />
              </div>
              
              {/* Short instruction */}
              <p className="text-center text-white/70 text-[11px] font-medium leading-tight">
                {isPinned ? "Click or scroll to close" : "Click to pin"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QrCodePopup;
