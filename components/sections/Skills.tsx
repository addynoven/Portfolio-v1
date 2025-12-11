"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SplitText from "@/components/reactbits/TextAnimations/SplitText";
import Particles from "@/components/reactbits/Backgrounds/Particles";
import MagicBento from "@/components/reactbits/Components/MagicBento";

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
      { name: "Java", icon: <FaJava /> },
      { name: "Python", icon: <SiPython /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "C", icon: <SiC /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <FaJs /> },
    ],
  },
  {
    name: "Frontend",
    description: "Building beautiful interfaces",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "TypeScript", icon: <SiTypescript /> },
    ],
  },
  {
    name: "Backend",
    description: "Server-side & APIs",
    skills: [
      { name: "Node.js", icon: <FaNode /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "GraphQL", icon: <SiGraphql /> },
      { name: "Socket.io", icon: <SiSocketdotio /> },
    ],
  },
  {
    name: "Database",
    description: "Data storage solutions",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "Firebase", icon: <SiFirebase /> },
    ],
  },
  {
    name: "Cloud & DevOps",
    description: "Infrastructure & deployment",
    skills: [
      { name: "AWS", icon: <FaAws /> },
      { name: "Google Cloud", icon: <SiGooglecloud /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Nginx", icon: <SiNginx /> },
    ],
  },
  {
    name: "CI/CD & Tools",
    description: "Automation & workflows",
    skills: [
      { name: "GitHub Actions", icon: <SiGithubactions /> },
      { name: "Jenkins", icon: <SiJenkins /> },
      { name: "Git", icon: <FaGitAlt /> },
      { name: "Linux", icon: <FaLinux /> },
      { name: "Terminal", icon: <FaTerminal /> },
    ],
  },
  {
    name: "Game Dev",
    description: "Interactive experiences",
    skills: [
      { name: "Unity", icon: <SiUnity /> },
      { name: "Unreal", icon: <SiUnrealengine /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "Gaming", icon: <FaGamepad /> },
    ],
  },
  {
    name: "Productivity",
    description: "Design & collaboration",
    skills: [
      { name: "Figma", icon: <FaFigma /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "VS Code", icon: <FaCode /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Notion", icon: <SiNotion /> },
      { name: "Slack", icon: <SiSlack /> },
    ],
  },
];

const Skills = () => {
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
                              <div className="text-4xl xl:text-5xl hover:text-UserAccent transition-all cursor-pointer text-white/80 hover:scale-125 duration-300">
                                  {skill.icon}
                              </div>
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
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={400}
          particleSpread={12}
          speed={0.12}
          particleColors={["#00ff99", "#00d4aa", "#10b981", "#34d399", "#ffffff"]}
          alphaParticles={false}
          particleBaseSize={180}
          sizeRandomness={1.2}
          cameraDistance={18}
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
          className=""
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/20 to-background/80 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl xl:text-6xl font-bold mb-4">
            <SplitText text="Skills & Tech Stack" stagger={0.06} delay={0.2} />
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
};

export default Skills;
