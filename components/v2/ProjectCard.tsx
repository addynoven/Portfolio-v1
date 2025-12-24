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
      className="p-0 overflow-hidden group"
      href={href}
    >
      <div className="relative w-full h-full min-h-[200px]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-white text-sm font-medium">{title}</span>
        </div>
      </div>
    </BentoCard>
  );
};

export default ProjectCard;
