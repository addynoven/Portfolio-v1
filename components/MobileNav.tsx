"use client";

import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { name: "Home", path: "#home", targetId: "home" },
  { name: "Services", path: "#services", targetId: "services" },
  { name: "Resume", path: "#resume", targetId: "resume" },
  { name: "Work", path: "#work", targetId: "work" },
  { name: "Contact", path: "#contact", targetId: "contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home"); // You might want to share this state or duplicate the scroll spy logic if needed on mobile

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
     // Default anchor behavior might work fine, but smooth scroll is better
     e.preventDefault();
     const element = document.getElementById(targetId);
     if (element) {
        element.scrollIntoView({ behavior: "smooth" });
     }
  };

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-UserAccent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* logo */}
        <div className="mt-24 mb-16 flex justify-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Neon<span className="text-UserAccent">.</span>
            </h1>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link) => {
            return (
                <SheetClose asChild key={link.name}>
                  <Link
                    href={link.path}
                    onClick={(e) => handleClick(e, link.targetId)}
                    className={cn(
                      "text-xl capitalize hover:text-UserAccent transition-all",
                      // You can add logic here to highlight active link if you want, 
                      // but for mobile often just navigating is enough.
                    )}
                  >
                    {link.name}
                  </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
