"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
    { name: "Home", path: "#home", targetId: "home" },
    { name: "Services", path: "#services", targetId: "services" },
    { name: "Resume", path: "#resume", targetId: "resume" },
    { name: "Work", path: "#work", targetId: "work" },
    { name: "Contact", path: "#contact", targetId: "contact" },
];

const Nav = () => {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => document.getElementById(link.targetId));
            const scrollPosition = window.scrollY + 100; // Offset for header height

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Call once on mount to set initial active state
        handleScroll(); 
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="flex items-center gap-8">
            {links.map((link) => {
                const isActive = activeSection === link.targetId;
                return (
                    <Link
                        key={link.name}
                        href={link.path}
                        onClick={(e) => handleClick(e, link.targetId)}
                        className={cn(
                            "capitalize font-medium text-lg hover:text-UserAccent transition-all",
                            isActive &&
                                "text-UserAccent border-b-2 border-UserAccent"
                        )}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Nav;
