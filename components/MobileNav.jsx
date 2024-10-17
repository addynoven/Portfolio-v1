"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";

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
            <SheetContent className="flex flex-col">
                <div>logo</div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
