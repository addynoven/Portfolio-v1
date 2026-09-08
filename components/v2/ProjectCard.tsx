"use client";

import Image from "next/image";
import BentoCard from "./BentoCard";

interface ProjectCardProps {
  title: string;
  image?: string;
  href?: string;
  gradient?: string;
}

const ProjectCard = ({ title, image, href, gradient = "from-purple-900 to-blue-900" }: ProjectCardProps) => {
  return (
    <BentoCard 
      colSpan={1} 
      rowSpan={1} 
      className="p-0 overflow-hidden group h-full min-h-0"
      href={href}
    >
      <div className="relative w-full h-full min-h-[140px] md:min-h-full">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium shadow-sm">
            {title}
          </span>
        </div>
      </div>
    </BentoCard>
  );
};

export default ProjectCard;
