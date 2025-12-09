"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";
import { useSectionTransition } from "./SectionTransitionContext";

const links = [
    { name: "Home", path: "#home", targetId: "home" },
    { name: "Services", path: "#services", targetId: "services" },
    { name: "Resume", path: "#resume", targetId: "resume" },
    { name: "Work", path: "#work", targetId: "work" },
    { name: "Contact", path: "#contact", targetId: "contact" },
];

const Nav = () => {
    const { activeSection, navigateToSection } = useSectionTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        navigateToSection(targetId);
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
