"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Pages where we want to hide the Header (NavBar) and Footer
  // explicitly hiding on /work (standalone) and potentially 404 (rendering on unknown paths)
  // Ideally for 404, next.js uses the not-found layout, but in app directory it inherits root layout.
  // We can strictly show Header/Footer ONLY on home page "/" if that's the desired design for a single-page portfolio.
  // Or we can blacklist specific pages.
  // Given user's comment "seeing the nav bar ... at 404 page and on the /work", let's hide on those.
  
  // Strategy: defaults to SHOW, unless hidden.
  // OR Strategy: defaults to HIDE, show only on "/".
  
  // If the site is a Single Page App (SPA) style with sections on Home, 
  // changing routes usually means going to a standalone page.
  // Let's assume we show on Home "/" and maybe standard pages if they existed, but hide on /work and 404.
  // 404 pathname in usePathname hook might be the non-existent path. 
  
  const isHomePage = pathname === "/v1";
  
  // If we only want them on Home Page:
  const shouldShowNav = true; // Always show nav as per user feedback "design too off otherwise"

  return (
    <>
      {shouldShowNav && <Header />}
      {children}
      {shouldShowNav && <Footer />}
    </>
  );
}
