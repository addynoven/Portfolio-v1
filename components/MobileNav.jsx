"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "Work", path: "/work" },
  { name: "contact", path: "/contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <CiMenuFries className="text-[32px] text-UserAccent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-y-auto">
        {/* logo */}
        <div className="mt-24 mb-16 flex justify-center text-2xl">
          <Link href="/">
            {" "}
            Neon<span className="text-UserAccent">.</span>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8 ">
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "text-accent hover:text-UserAccent transition-all",
                  pathname === link.path &&
                    "text-UserAccent border-b-2 border-UserAccent"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
