"use client";

import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { useSectionTransition } from "./SectionTransitionContext";
import { useSiteName } from "@/hooks/useSiteName";

const links = [
  { name: "Home", path: "/v1/#home", targetId: "home" },
  { name: "Work", path: "/v1/#work", targetId: "work" },
  { name: "Contact", path: "/v1/#contact", targetId: "contact" },
];

const MobileNav = () => {
  const { activeSection, navigateToSection } = useSectionTransition();
  const siteName = useSiteName(false); // Get first name only for logo

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
     if (window.location.pathname === "/v1") {
         e.preventDefault();
         navigateToSection(targetId);
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
          <Link href="/v1">
            <h1 className="text-4xl font-semibold">
              {siteName}<span className="text-UserAccent">.</span>
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
