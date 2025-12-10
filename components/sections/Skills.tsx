"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SplitText from "@/components/reactbits/TextAnimations/SplitText";
import TiltCard from "@/components/reactbits/Components/TiltCard";
import DecryptedText from "@/components/reactbits/TextAnimations/DecryptedText";
import Particles from "@/components/reactbits/Backgrounds/Particles";
import GradientText from "@/components/reactbits/TextAnimations/GradientText";

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
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiPython,
  SiC,
  SiCplusplus,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

// Skill categories with icons
const skillCategories = [
  {
    name: "Languages",
    description: "Core programming languages I work with",
    skills: [
      { name: "Java", icon: <FaJava /> },
      { name: "Python", icon: <SiPython /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "C", icon: <SiC /> },
    ],
    gradient: ["#00ff99", "#00d4aa", "#00ff99"],
  },
  {
    name: "Frontend",
    description: "Building beautiful user interfaces",
    skills: [
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    ],
    gradient: ["#61dafb", "#00ff99", "#61dafb"],
  },
  {
    name: "Backend",
    description: "Server-side technologies and databases",
    skills: [
      { name: "Node.js", icon: <FaNode /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
    ],
    gradient: ["#68a063", "#00ff99", "#68a063"],
  },
  {
    name: "Tools",
    description: "Design and version control",
    skills: [
      { name: "Figma", icon: <FaFigma /> },
      { name: "GitHub", icon: <FaGithub /> },
    ],
    gradient: ["#f24e1e", "#00ff99", "#f24e1e"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateY: -90 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

const Skills = () => {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-20 xl:py-32 min-h-screen overflow-hidden"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={150}
          particleSpread={15}
          speed={0.08}
          particleColors={["#00ff99", "#00d4aa", "#ffffff"]}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.8}
          cameraDistance={25}
          moveParticlesOnHover={true}
          particleHoverFactor={0.5}
          className=""
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl xl:text-6xl font-bold mb-4">
            <SplitText text="Skills & Tech Stack" stagger={0.06} delay={0.2} />
          </h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-UserAccent to-transparent rounded-full mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ maxWidth: "300px" }}
          />
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className="relative"
            >
              {/* Category Card */}
              <div className="backdrop-blur-xl bg-white/5 dark:bg-black/40 border border-white/10 rounded-3xl p-6 xl:p-8 h-full">
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-2xl xl:text-3xl font-bold mb-2">
                    <GradientText
                      colors={category.gradient}
                      animationSpeed={6}
                    >
                      <DecryptedText
                        text={category.name}
                        speed={40}
                        revealDirection="start"
                        className="font-bold"
                      />
                    </GradientText>
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-white/40">
                    {category.description}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      custom={skillIndex}
                      className="relative"
                    >
                      <TiltCard
                        tiltAmount={15}
                        glareOpacity={0.15}
                        glareColor="rgba(0, 255, 153, 0.3)"
                        className="h-full"
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div
                                className="w-full h-[100px] xl:h-[120px] bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center gap-2 group cursor-pointer border border-white/10 hover:border-UserAccent/50 transition-colors duration-300"
                                whileHover={{
                                  scale: 1.02,
                                  boxShadow: "0 0 30px rgba(0, 255, 153, 0.2)",
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <motion.div
                                  className="text-4xl xl:text-5xl text-slate-700 dark:text-white/80 group-hover:text-UserAccent transition-colors duration-300"
                                  whileHover={{ 
                                    scale: 1.2,
                                    rotate: [0, -10, 10, 0],
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {skill.icon}
                                </motion.div>
                                <span className="text-xs font-medium text-slate-600 dark:text-white/60 group-hover:text-white transition-colors duration-300">
                                  {skill.name}
                                </span>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative corner glow */}
              <div
                className="absolute -top-2 -right-2 w-20 h-20 rounded-full blur-xl opacity-30 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${category.gradient[0]}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
