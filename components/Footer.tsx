import Link from "next/link";
import Social from "./Social";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-black/10 dark:border-white/10 bg-slate-100 dark:bg-primary/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <Link href="/">
              <h2 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">
                Neon<span className="text-UserAccent">.</span>
              </h2>
            </Link>
            <p className="text-slate-500 dark:text-white/60 text-sm">
              © {currentYear} Aditya Sahu. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              href="#home"
              className="text-slate-600 dark:text-white/60 hover:text-UserAccent transition-colors"
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-slate-600 dark:text-white/60 hover:text-UserAccent transition-colors"
            >
              Services
            </Link>
            <Link
              href="#resume"
              className="text-slate-600 dark:text-white/60 hover:text-UserAccent transition-colors"
            >
              Resume
            </Link>
            <Link
              href="#work"
              className="text-slate-600 dark:text-white/60 hover:text-UserAccent transition-colors"
            >
              Work
            </Link>
            <Link
              href="#contact"
              className="text-slate-600 dark:text-white/60 hover:text-UserAccent transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Social Links */}
          <div>
            <Social
              containerStyles="flex gap-4"
              iconStyles="w-10 h-10 border border-UserAccent/50 rounded-full flex items-center justify-center text-UserAccent text-sm hover:bg-UserAccent hover:text-primary transition-all duration-300"
            />
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10 text-center">
          <p className="text-slate-500 dark:text-white/40 text-sm">
            Built with{" "}
            <span className="text-UserAccent">Next.js</span>,{" "}
            <span className="text-UserAccent">Tailwind CSS</span>, and{" "}
            <span className="text-UserAccent">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
