"use client";

import {
  FaHtml5,
  FaJs,
  FaReact,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaNode,
  FaCss3Alt,
  FaLinux,
  FaRedhat,
  FaAws,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiPython,
  SiC,
  SiCplusplus,
  SiExpress,
  SiSpringboot,
  SiMongodb,
  SiOracle,
  SiPostgresql,
  SiSqlite,
  SiFirebase,
  SiAppwrite,
  SiGnubash,
  SiSass,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiKeras,
  SiOpencv,
  SiJirasoftware,
  SiGooglecloud,
  SiDocker,
  SiSupabase,
  SiFfmpeg,
  SiKubernetes,
  SiGitlab,
  SiZoom,
  SiTrello,
  SiSlack,
  SiNotion,
  SiJira,
  SiJenkins,
} from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbBrandDjango } from "react-icons/tb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GrMysql } from "react-icons/gr";

import { motion } from "framer-motion";

// about me data

const About = {
  title: "About Me",
  description:
    "I'm a MERN stack developer with a background in AI & Data Analytics, focused on building responsive, dynamic, and user-centric web solutions.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Aditya Sahu",
    },
    {
      fieldName: "Phone",
      fieldValue: "+91 626 199 5234",
    },
    { fieldName: "Experience", fieldValue: "1 year" },
    { fieldName: "Discord", fieldValue: "neon8052" },
    { fieldName: "Nationality", fieldValue: "Indian" },
    { fieldName: "Email", fieldValue: "dmcbaditya@gmail.com" },
    { fieldName: "Freelance", fieldValue: "Available" },
    { fieldName: "Languages", fieldValue: "English, Hindi" },
    { fieldName: "Address", fieldValue: "Bhopal, India" },
  ],
};

// experience data

const Experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description: `
    I've developed user-friendly web applications as a Full Stack Developer, collaborating with teams to deliver responsive solutions that enhance functionality and user experience. 
    `,
  items: [
    {
      company: "RI BEAUTY (Startup)",
      position: "Full Stack Developer",
      duration: "Jun 2024 - Present",
    },
    {
      company: "Orcus (Startup)",
      position: "Full Stack Developer",
      duration: "Dec 2023 - May 2024",
    },
  ],
};

// education data
// template here for later use for now do what ever u want ||
// {
//     course: "Front-End Web Development",
//     institution: "Tech Academy",
//     duration: "2017 - 2018",
// }

const Education = {
  icon: "/assets/Resume/cap.svg",
  title: "My education",
  description: `
        I have completed the following courses:`,
  items: [
    {
      institution: "Oriental Group of Institutes",
      degree: "Master of Computer Applications",
      duration: "Sep 2024 - Present",
    },
    {
      institution: "sheryians coding school",
      degree: "Back-End Domination",
      duration: "Aug 2024 - present",
    },
    {
      institution: "sheryians coding school",
      degree: "Advanced Data Structures and Algorithms with JAVA",
      duration: "Apr 2024 - present",
    },
    {
      institution: "LNCT Group of Colleges",
      degree: "Bachelor of Computer Applications, AI & Data Analytics",
      duration: " Oct 2021 - May 2024",
    },
    {
      institution: "sheryians coding school",
      degree: "front-end domination",
      duration: "jan 2024 - jul 2024",
    },
    {
      institution: "sheryians coding school",
      degree: "MERN Stack Developer",
      duration: "jul 2023 - jan 2024",
    },
    {
      institution: "Sharma Computer Academy (ScaLive)",
      degree: "java and spring boot",
      duration: "jun 2022 - jun 2023",
    },
    {
      institution: "Sharma Computer Academy (ScaLive)",
      degree: "Data Structures and Algorithms with C++",
      duration: " jan 2022 - jun 2022",
    },
    {
      institution: "Sharma Computer Academy (ScaLive)",
      degree: "Oracle Database Administrator",
      duration: "Aug 2021 - dec 2021",
    },
    {
      institution: "Sharma Computer Academy (ScaLive)",
      degree: "C++ Programming",
      duration: " jun 2021 - dec 2021",
    },
    {
      institution: "Sharma Computer Academy (ScaLive)",
      degree: "python and Django Programming",
      duration: "jul 2021- nov 2021",
    },
    {
      institution: "Sharma Computer Academy (ScaLive)",
      degree: "C Programming",
      duration: "jan 2021- jun 2021",
    },
    {
      institution: "ITE Infotech Pvt Ltd",
      degree: "RedHat Certified System Administrator",
      duration: "Jun 2020 - feb 2020",
    },
  ],
};

// skills data

const Skills = {
  title: "My skills",
  description:
    "I specialize in full-stack development, delivering dynamic web solutions using modern technologies and frameworks.",
  skillList: [
    { name: "Java", icon: <FaJava /> },
    { name: "Python", icon: <SiPython /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "C", icon: <SiC /> },
    { name: "Express.js", icon: <SiExpress /> },
    // { name: "Spring Boot", icon: <SiSpringboot /> },
    // { name: "Django", icon: <TbBrandDjango /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    // { name: "MySQL", icon: <GrMysql /> },
    // { name: "Oracle", icon: <SiOracle /> },
    // { name: "PostgreSQL", icon: <SiPostgresql /> },
    // { name: "SQLite", icon: <SiSqlite /> },
    // { name: "Firebase", icon: <SiFirebase /> },
    // { name: "Appwrite", icon: <SiAppwrite /> },
    // { name: "Linux", icon: <FaLinux /> },
    // { name: "Bash", icon: <SiGnubash /> },
    // { name: "RedHat", icon: <FaRedhat /> },
    // { name: "SASS", icon: <SiSass /> },
    // { name: "Numpy", icon: <SiNumpy /> },
    // { name: "Pandas", icon: <SiPandas /> },
    // { name: "Scikit-learn", icon: <SiScikitlearn /> },
    // { name: "TensorFlow", icon: <SiTensorflow /> },
    // { name: "PyTorch", icon: <SiPytorch /> },
    // { name: "Keras", icon: <SiKeras /> },
    // { name: "OpenCV", icon: <SiOpencv /> },
    // { name: "Docker", icon: <SiDocker /> },
    // { name: "AWS", icon: <FaAws /> },
    // { name: "Google Cloud", icon: <SiGooglecloud /> },
    // { name: "Azure", icon: <SiMicrosoftazure /> },
    // { name: "Supabase", icon: <SiSupabase /> },
    // { name: "FFMPEG", icon: <SiFfmpeg /> },
    // { name: "Kubernetes", icon: <SiKubernetes /> },
    // { name: "GitLab", icon: <SiGitlab /> },
    // { name: "Microsoft Teams", icon: <SiMicrosoftteams /> },
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3Alt /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "React", icon: <FaReact /> },
    { name: "Figma", icon: <FaFigma /> },
    { name: "Node.js", icon: <FaNode /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    // { name: "Git", icon: <FaGitAlt /> },
    { name: "GitHub", icon: <FaGithub /> },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2, duration: 0.5, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          {/* {Content} */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{Experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {Experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {Experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-UserAccent">
                            {item.duration}
                          </span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-UserAccent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{Education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {Education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {Education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-UserAccent">
                            {item.duration}
                          </span>
                          <h3 className="text-xl max-w-[460px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-UserAccent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div>
                  <h3 className="text-4xl font-bold text-center xl:text-left">
                    {Skills.title}
                  </h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {Skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {Skills.skillList.map((item, index) => {
                    return (
                      <li key={item.name}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-UserAccent transition-all duration-300">
                                {item.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-white/60 capitalize">
                                {item.name}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* about me */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{About.title}</h3>
                <p className="max-w-[600px] xl:max-w-[65%] text-white/60 mx-auto xl:mx-0">
                  {About.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-3 max-w-[100%] ">
                  {About.info.map((item) => (
                    <li key={item.fieldName}>
                      <span className="text-white/60">
                        {item.fieldName} &nbsp;
                      </span>
                      <span className="text-xl">{item.fieldValue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
