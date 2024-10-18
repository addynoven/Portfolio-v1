import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
const Header = () => {
    return (
        <header className="py-8 xl:py-12 text-white">
            <div className="container mx-auto flex items-center justify-between">
                {/* logo */}
                <Link href="/">
                    <h1 className="text-4xl font-semibold">
                        Luke<span className="text-UserAccent">.</span>
                    </h1>
                </Link>

                {/* nav */}
                <div className="hidden xl:flex items-center gap-8">
                    <Nav />

                    {/* button */}
                    <Link href="/contact">
                        <Button className="">Hire me</Button>
                    </Link>
                </div>

                {/* mobile nav */}
                <div className="flex xl:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    );
};

export default Header;
