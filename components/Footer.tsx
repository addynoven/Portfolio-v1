"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Social from "./Social";
import FooterAnimationShowcase from "./FooterAnimationShowcase";
import { useSectionTransition } from "./SectionTransitionContext";
import { cn } from "@/lib/utils";

const footerLinks = [
  { name: "Home", targetId: "home" },
  { name: "About", targetId: "about" },
  { name: "Work", targetId: "work" },
  { name: "Skills", targetId: "skills" },
  { name: "Contact", targetId: "contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { navigateToSection } = useSectionTransition();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    // For "home", scroll to absolute top of page so navbar is visible
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigateToSection(targetId);
  };

  return (
    <footer className="relative py-16 border-t border-black/10 dark:border-white/10 overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/80 to-slate-200/50 dark:from-primary/50 dark:to-primary/80 backdrop-blur-sm" />
      
      {/* Subtle animated gradient orb */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-UserAccent/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto relative z-10 px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Left Column - Animated Logo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            {/* Animation Showcase AS the logo */}
            <div className="text-3xl font-black">
              <FooterAnimationShowcase />
            </div>
            
            <p className="text-slate-500 dark:text-white/60 text-sm mt-2">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Center Column - Quick Links with Stair Transition */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`#${link.targetId}`}
                    onClick={(e) => handleNavClick(e, link.targetId)}
                    className="group relative text-slate-600 dark:text-white/60 hover:text-UserAccent transition-colors duration-300"
                  >
                    <span className="relative z-10">{link.name}</span>
                    {/* Underline animation */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-UserAccent group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Right Column - Social Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Connect
            </h3>
            <Social
              containerStyles="flex gap-4"
              iconStyles=""
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


