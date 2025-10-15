"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
    { name: "Home", path: "/" },
    { name: "services", path: "/services" },
    { name: "resume", path: "/resume" },
    { name: "Work", path: "/work" },
    { name: "contact", path: "/contact" },
];
const Nav = () => {
    const pathname = usePathname();
    console.log(pathname, "line 14");
    return (
        <nav className="flex items-center gap-8">
            {links.map((link) => {
                const isActive = pathname === link.path;
                return (
                    <Link
                        key={link.name}
                        href={link.path}
                        className={cn(
                            "capitalize font-medium text-lg hover:text-UserAccent transition-all",
                            isActive &&
                                "text-UserAccen border-b-2 border-UserAccent"
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
