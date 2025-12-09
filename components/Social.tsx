"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import Magnet from "@/components/reactbits/Magnet";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const socials = [
  {
    name: "Github",
    href: "https://github.com/addynoven",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-sahu-34350b193/",
    icon: <FaLinkedin />,
  },
  {
    name: "Twitter",
    href: "https://x.com/addynoven",
    icon: <FaTwitter />,
  },
];

interface SocialIconProps {
  href: string;
  name: string;
  icon: React.ReactNode;
}

const SocialIcon = ({ href, name, icon }: SocialIconProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -15;
    const tiltY = ((x - centerX) / centerX) * 15;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <Magnet strength={0.4}>
      <Link
        ref={ref}
        href={href}
        target="_blank"
        className="block"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-12 h-12 rounded-full border-2 border-UserAccent overflow-hidden"
          style={{
            transform: `perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.1 : 1})`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
          }}
        >
          {/* Wave water fill effect */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 transition-all duration-500 ease-out",
              isHovered ? "h-full" : "h-0"
            )}
            style={{
              transform: `skewY(${tilt.y * 0.5}deg)`,
            }}
          >
            {/* Wave SVG pattern */}
            <svg
              className="absolute top-0 left-0 w-[200%] h-6 -translate-y-[90%]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{
                animation: 'socialWave 1.5s linear infinite',
              }}
            >
              <path
                d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
                className="fill-UserAccent"
              />
            </svg>
            {/* Solid fill below the wave */}
            <div className="absolute inset-0 top-3 bg-UserAccent" />
          </div>

          {/* Icon */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center z-10 text-xl transition-colors duration-500",
              isHovered ? "text-primary" : "text-UserAccent"
            )}
          >
            {icon}
          </span>
        </div>
      </Link>
    </Magnet>
  );
};

const Social = ({ containerStyles, iconStyles }: { containerStyles: string; iconStyles: string }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item) => (
        <SocialIcon key={item.name} {...item} />
      ))}
    </div>
  );
};

export default Social;



