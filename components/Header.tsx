import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="py-6 xl:py-8 text-white dark:text-white sticky top-0 z-50 bg-primary/80 dark:bg-primary/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Neon<span className="text-UserAccent">.</span>
          </h1>
        </Link>

        {/* nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <ThemeToggle />
          {/* button */}
          <Link href="#contact">
            <Button>Hire me</Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="flex xl:hidden items-center gap-4">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
