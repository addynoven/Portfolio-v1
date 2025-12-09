"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSectionTransition } from "./SectionTransitionContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { name: "Home", path: "#home", targetId: "home" },
    { name: "Services", path: "#services", targetId: "services" },
    { name: "Resume", path: "#resume", targetId: "resume" },
    { name: "Work", path: "#work", targetId: "work" },
    { name: "Contact", path: "#contact", targetId: "contact" },
];

interface WaterDrop {
    id: number;
    x: number;
    delay: number;
    size: number;
}

interface NavLinkProps {
    link: { name: string; path: string; targetId: string };
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const NavLink = ({ link, isActive, onClick }: NavLinkProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([]);
    const [showDrops, setShowDrops] = useState(false);
    const [fillLevel, setFillLevel] = useState(0); // 0 to 100
    const hoverStartTime = useRef<number>(0);
    const fillIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = ((y - centerY) / centerY) * -8;
        const tiltY = ((x - centerX) / centerX) * 8;

        setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        setShowDrops(false);
        setWaterDrops([]);
        hoverStartTime.current = Date.now();
        
        // Gradually fill up
        fillIntervalRef.current = setInterval(() => {
            setFillLevel(prev => Math.min(100, prev + 5));
        }, 30);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
        
        // Stop filling
        if (fillIntervalRef.current) {
            clearInterval(fillIntervalRef.current);
        }
        
        // Calculate drops based on fill level
        if (!isActive && fillLevel > 0) {
            const dropCount = Math.max(2, Math.floor(fillLevel / 15)); // 2-7 drops based on fill
            const drops: WaterDrop[] = Array.from({ length: dropCount }, (_, i) => ({
                id: Date.now() + i,
                x: 15 + Math.random() * 70, // Random x position (15-85%)
                delay: i * 0.04,
                size: 0.5 + (fillLevel / 100) * 0.5, // Bigger drops if more filled
            }));
            setWaterDrops(drops);
            setShowDrops(true);
            
            // Clean up drops after animation
            setTimeout(() => {
                setShowDrops(false);
                setWaterDrops([]);
            }, 1500);
        }
        
        // Drain the water
        setFillLevel(0);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (fillIntervalRef.current) {
                clearInterval(fillIntervalRef.current);
            }
        };
    }, []);

    return (
        <Link
            ref={ref}
            href={link.path}
            onClick={(e) => onClick(e, link.targetId)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="block relative"
        >
            <div
                className={cn(
                    "relative px-5 py-2.5 rounded-full overflow-hidden transition-all duration-300",
                    (isActive || isHovered)
                        ? "border-2 border-UserAccent" 
                        : "border-2 border-transparent"
                )}
                style={{
                    transform: `perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovered ? 'transform 0.1s ease-out, border-color 0.3s' : 'transform 0.3s ease-out, border-color 0.3s',
                }}
            >
                {/* Water fill with wave effect */}
                <div
                    className="absolute inset-x-0 bottom-0 overflow-visible"
                    style={{
                        height: isActive ? '100%' : `${fillLevel}%`,
                        transform: `skewY(${tilt.y * 0.3}deg)`,
                        transition: isHovered ? 'height 0.05s ease-out' : 'height 0.3s ease-out',
                    }}
                >
                    {/* Multiple animated waves at top for more visible wave pattern */}
                    <svg
                        className="absolute top-0 left-0 w-[200%] h-6 -translate-y-[85%]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        style={{
                            animation: 'wave 1.2s linear infinite',
                        }}
                    >
                        <path
                            d="M0,60 C100,90 200,30 300,60 C400,90 500,30 600,60 C700,90 800,30 900,60 C1000,90 1100,30 1200,60 L1200,120 L0,120 Z"
                            className="fill-UserAccent"
                        />
                    </svg>
                    {/* Second wave layer for depth */}
                    <svg
                        className="absolute top-0 left-0 w-[200%] h-5 -translate-y-[70%] opacity-60"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        style={{
                            animation: 'wave 1.8s linear infinite reverse',
                        }}
                    >
                        <path
                            d="M0,50 C150,80 250,20 400,50 C550,80 650,20 800,50 C950,80 1050,20 1200,50 L1200,120 L0,120 Z"
                            className="fill-UserAccent"
                        />
                    </svg>
                    {/* Solid water fill body */}
                    <div className="absolute inset-0 top-2 bg-UserAccent" />
                </div>

                {/* Text */}
                <span
                    className={cn(
                        "relative z-10 capitalize font-medium text-lg transition-colors duration-300",
                        (isHovered || isActive || fillLevel > 50)
                            ? "text-primary"
                            : "text-slate-700 dark:text-white"
                    )}
                >
                    {link.name}
                </span>
            </div>

            {/* Falling water drops with gravity! */}
            <AnimatePresence>
                {showDrops && waterDrops.map((drop) => (
                    <motion.div
                        key={drop.id}
                        className="absolute bg-UserAccent rounded-full pointer-events-none"
                        style={{ 
                            left: `${drop.x}%`,
                            width: `${8 * drop.size}px`,
                            height: `${12 * drop.size}px`,
                        }}
                        initial={{ 
                            top: "100%", 
                            opacity: 1, 
                            scaleY: 1.5,
                            scaleX: 0.8 
                        }}
                        animate={{ 
                            top: "500%", // Fall down past the navbar
                            opacity: [1, 1, 0.8, 0],
                            scaleY: [1.5, 2, 2.5, 1],
                            scaleX: [0.8, 0.6, 0.5, 0.3],
                        }}
                        transition={{ 
                            duration: 1 + Math.random() * 0.5,
                            delay: drop.delay,
                            ease: [0.55, 0.085, 0.68, 0.53], // Gravity-like easing
                        }}
                    />
                ))}
            </AnimatePresence>
        </Link>
    );
};

const Nav = () => {
    const { activeSection, navigateToSection } = useSectionTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        navigateToSection(targetId);
    };

    return (
        <nav className="flex items-center gap-6">
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    link={link}
                    isActive={activeSection === link.targetId}
                    onClick={handleClick}
                />
            ))}
        </nav>
    );
};

export default Nav;





