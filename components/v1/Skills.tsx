"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Lazy load heavy components
const MagicBento = dynamic(
  () => import("@/components/reactbits/Components/MagicBento"),
  { ssr: false }
);



// CSS-based animated title - NO React re-renders, pure GPU animation
const AnimatedTitle = memo(function AnimatedTitle({ text }: { text: string }) {
  const characters = text.split("");
  
  return (
    <>
      <style jsx>{`
        @keyframes waveChar {
          0%, 100% { 
            transform: translateY(0); 
            color: #ffffff; 
          }
          50% { 
            transform: translateY(-8px); 
            color: #00ff99; 
          }
        }
        .wave-char {
          display: inline-block;
          animation: waveChar 2s ease-in-out infinite;
          text-shadow: 0 0 20px rgba(0, 255, 153, 0.3);
        }
      `}</style>
      {characters.map((char, index) => (
        <span
          key={index}
          className="wave-char"
          style={{ 
            animationDelay: `${index * 0.08}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
});

// Import icons
import {
  FaHtml5,
  FaJs,
  FaReact,
  FaFigma,
  FaNode,
  FaCss3Alt,
  FaJava,
  FaGithub,
  FaDocker,
  FaAws,
  FaLinux,
  FaGitAlt,
  FaTerminal,
  FaDatabase,
  FaGamepad,
  FaNetworkWired,
  FaCode,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiPython,
  SiC,
  SiCplusplus,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiRedis,
  SiPostgresql,
  SiKubernetes,
  SiGooglecloud,
  SiFirebase,
  SiVercel,
  SiNginx,
  SiJenkins,
  SiGithubactions,
  SiUnity,
  SiUnrealengine,
  SiGraphql,
  SiSocketdotio,
  SiPostman,
  SiNotion,
  SiSlack,
} from "react-icons/si";

// Expanded skill categories with icons
const skillCategories = [
  {
    name: "Languages",
    description: "Core programming languages",
    skills: [
      { name: "Java", icon: <FaJava />, url: "https://dev.java/" },
      { name: "Python", icon: <SiPython />, url: "https://www.python.org/" },
      { name: "C++", icon: <SiCplusplus />, url: "https://isocpp.org/" },
      { name: "C", icon: <SiC />, url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
      { name: "TypeScript", icon: <SiTypescript />, url: "https://www.typescriptlang.org/" },
      { name: "JavaScript", icon: <FaJs />, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    ],
  },
  {
    name: "Frontend",
    description: "Building beautiful interfaces",
    skills: [
      { name: "React", icon: <FaReact />, url: "https://react.dev/" },
      { name: "Next.js", icon: <SiNextdotjs />, url: "https://nextjs.org/" },
      { name: "HTML", icon: <FaHtml5 />, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", icon: <FaCss3Alt />, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "Tailwind", icon: <SiTailwindcss />, url: "https://tailwindcss.com/" },
      { name: "TypeScript", icon: <SiTypescript />, url: "https://www.typescriptlang.org/" },
    ],
  },
  {
    name: "Backend",
    description: "Server-side & APIs",
    skills: [
      { name: "Node.js", icon: <FaNode />, url: "https://nodejs.org/" },
      { name: "Express", icon: <SiExpress />, url: "https://expressjs.com/" },
      { name: "GraphQL", icon: <SiGraphql />, url: "https://graphql.org/" },
      { name: "Socket.io", icon: <SiSocketdotio />, url: "https://socket.io/" },
    ],
  },
  {
    name: "Database",
    description: "Data storage solutions",
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, url: "https://www.mongodb.com/" },
      { name: "PostgreSQL", icon: <SiPostgresql />, url: "https://www.postgresql.org/" },
      { name: "Redis", icon: <SiRedis />, url: "https://redis.io/" },
      { name: "Firebase", icon: <SiFirebase />, url: "https://firebase.google.com/" },
    ],
  },
  {
    name: "Cloud & DevOps",
    description: "Infrastructure & deployment",
    skills: [
      { name: "AWS", icon: <FaAws />, url: "https://aws.amazon.com/" },
      { name: "Google Cloud", icon: <SiGooglecloud />, url: "https://cloud.google.com/" },
      { name: "Docker", icon: <FaDocker />, url: "https://www.docker.com/" },
      { name: "Kubernetes", icon: <SiKubernetes />, url: "https://kubernetes.io/" },
      { name: "Vercel", icon: <SiVercel />, url: "https://vercel.com/" },
      { name: "Nginx", icon: <SiNginx />, url: "https://nginx.org/" },
    ],
  },
  {
    name: "CI/CD & Tools",
    description: "Automation & workflows",
    skills: [
      { name: "GitHub Actions", icon: <SiGithubactions />, url: "https://github.com/features/actions" },
      { name: "Jenkins", icon: <SiJenkins />, url: "https://www.jenkins.io/" },
      { name: "Git", icon: <FaGitAlt />, url: "https://git-scm.com/" },
      { name: "Linux", icon: <FaLinux />, url: "https://www.linux.org/" },
      { name: "Terminal", icon: <FaTerminal />, url: "https://en.wikipedia.org/wiki/Terminal_emulator" },
    ],
  },
  {
    name: "Game Dev",
    description: "Interactive experiences",
    skills: [
      { name: "Unity", icon: <SiUnity />, url: "https://unity.com/" },
      { name: "Unreal", icon: <SiUnrealengine />, url: "https://www.unrealengine.com/" },
      { name: "C++", icon: <SiCplusplus />, url: "https://isocpp.org/" },
      { name: "Gaming", icon: <FaGamepad />, url: "https://en.wikipedia.org/wiki/Video_game_development" },
    ],
  },
  {
    name: "Productivity",
    description: "Design & collaboration",
    skills: [
      { name: "Figma", icon: <FaFigma />, url: "https://www.figma.com/" },
      { name: "GitHub", icon: <FaGithub />, url: "https://github.com/" },
      { name: "VS Code", icon: <FaCode />, url: "https://code.visualstudio.com/" },
      { name: "Postman", icon: <SiPostman />, url: "https://www.postman.com/" },
      { name: "Notion", icon: <SiNotion />, url: "https://www.notion.so/" },
      { name: "Slack", icon: <SiSlack />, url: "https://slack.com/" },
    ],
  },
];

const Skills = memo(function Skills() {
  // Sort categories by skill count (more skills first for better grid layout)
  const sortedCategories = [...skillCategories].sort((a, b) => b.skills.length - a.skills.length);
  
  const skillsItems = sortedCategories.map(category => {
    const skillCount = category.skills.length;
    // Cards with 5+ skills get 'large' size (will span 2 columns)
    const cardSize: 'small' | 'large' = skillCount >= 5 ? 'large' : 'small';
    
    return {
      title: category.name,
      description: category.description,
      label: "",
      color: '#0a0a0f',
      size: cardSize, // Pass size info to MagicBento
      skillCount: skillCount,
      content: (
          <div className={`grid ${skillCount > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-5 mt-4 place-items-center`}>
              {category.skills.map((skill, idx) => (
                  <TooltipProvider key={idx} delayDuration={100}>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <a 
                                  href={skill.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-4xl xl:text-5xl hover:text-UserAccent transition-all cursor-pointer text-slate-200 hover:scale-125 duration-300 block"
                              >
                                  {skill.icon}
                              </a>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p className="font-semibold text-base">{skill.name}</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              ))}
          </div>
      )
    };
  });

  return (
    <section id="skills" className="relative py-20 xl:py-32 min-h-screen overflow-hidden">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl xl:text-6xl font-bold mb-4">
            <AnimatedTitle text="Skills & Tech Stack" />
          </h2>
          <p className="text-lg text-slate-600 dark:text-white/60 max-w-2xl mx-auto">
             Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="flex justify-center w-full">
            <MagicBento 
                items={skillsItems}
                textAutoHide={false}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={400}
                particleCount={15}
                glowColor="0, 255, 153"
            />
        </div>
      </div>
    </section>
  );
});

export default Skills;
