"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSectionTransition } from "./SectionTransitionContext";
import WaterDripCanvas from "./WaterDripCanvas";
import WaterFillEffect from "./WaterFillEffect";

const links = [
    { name: "Home", path: "/#home", targetId: "home" },
    { name: "Work", path: "/#work", targetId: "work" },
    { name: "Contact", path: "/#contact", targetId: "contact" },
];



interface NavLinkProps {
    link: { name: string; path: string; targetId: string };
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const NavLink = ({ link, isActive, onClick }: NavLinkProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
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
        
        // Trigger water drip effect
        if (!isActive && fillLevel > 0) {
            setShowDrops(true);
            
            // Reset after animation
            setTimeout(() => {
                setShowDrops(false);
            }, 2000);
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
                    className="absolute inset-x-0 bottom-0 overflow-hidden"
                    style={{
                        height: isActive ? '100%' : `${fillLevel}%`,
                        transform: `skewY(${tilt.y * 0.3}deg)`,
                        transition: isHovered ? 'height 0.05s ease-out' : 'height 0.3s ease-out',
                    }}
                >
                    {(isActive || fillLevel > 0) && (
                        <>
                            {/* Primary wave at top - more visible */}
                            <svg
                                className="absolute top-0 left-0 w-[200%] h-8 -translate-y-[90%]"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none"
                                style={{ animation: 'wave 1.2s linear infinite' }}
                            >
                                <path
                                    d="M0,40 C100,100 200,0 300,40 C400,100 500,0 600,40 C700,100 800,0 900,40 C1000,100 1100,0 1200,40 L1200,120 L0,120 Z"
                                    className="fill-UserAccent"
                                />
                            </svg>
                            {/* Solid fill */}
                            <div className="absolute inset-0 top-2 bg-UserAccent" />
                        </>
                    )}
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

            {/* Canvas-based water physics drip */}
            <WaterDripCanvas
                isActive={showDrops}
                width={120}
                height={200}
                originX={60}
                fillLevel={fillLevel}
            />
        </Link>
    );
};

const Nav = () => {
    const { activeSection, navigateToSection } = useSectionTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        // If we are on the home page, prevent default and smooth scroll
        if (window.location.pathname === "/") {
            e.preventDefault();
            navigateToSection(targetId);
        }
        // If not on home page, let the link follow through to "/#section" which renders Home with hash
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





