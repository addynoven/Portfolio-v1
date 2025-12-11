"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { About, Experience, Education, Skills } from "@/lib/data";
import SplitText from "@/components/reactbits/TextAnimations/SplitText";
import SpotlightCard from "@/components/reactbits/Components/SpotlightCard";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.05,
      ease: [0.34, 1.56, 0.64, 1], // Spring bounce
    },
  }),
};

const Resume = () => {
  return (
    <motion.section
      id="resume"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center py-16 xl:py-24"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl xl:text-5xl font-bold mb-4">
            <SplitText text="My Resume" delay={80} />
          </h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-UserAccent to-transparent rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ maxWidth: "200px" }}
          />
        </motion.div>

        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="about">About Me</TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{Experience.title}</h3>
                <p className="text-slate-600 dark:text-white/60 mx-auto xl:mx-0">
                  {Experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {Experience.items.map((item, index) => {
                      return (
                        <motion.li
                          key={index}
                          className="bg-white dark:bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 shadow-sm dark:shadow-none"
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={index}
                          whileHover={{ 
                            y: -5,
                            boxShadow: "0 0 20px rgba(0, 255, 153, 0.2)",
                            borderColor: "rgba(0, 255, 153, 0.3)",
                            transition: { duration: 0.2 }
                          }}
                          style={{ border: "1px solid transparent" }}
                        >
                          <span className="text-UserAccent">
                            {item.duration}
                          </span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            <motion.span 
                              className="w-[6px] h-[6px] rounded-full bg-UserAccent"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <p className="text-slate-600 dark:text-white/60">{item.company}</p>
                          </div>
                        </motion.li>
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
                <p className="text-slate-600 dark:text-white/60 mx-auto xl:mx-0">
                  {Education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {Education.items.map((item, index) => {
                      return (
                        <motion.li
                          key={index}
                          className="bg-white dark:bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 shadow-sm dark:shadow-none"
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={index}
                          whileHover={{ 
                            y: -5,
                            boxShadow: "0 0 20px rgba(0, 255, 153, 0.2)",
                            borderColor: "rgba(0, 255, 153, 0.3)",
                            transition: { duration: 0.2 }
                          }}
                          style={{ border: "1px solid transparent" }}
                        >
                          <span className="text-UserAccent">
                            {item.duration}
                          </span>
                          <h3 className="text-xl max-w-[460px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            <motion.span 
                              className="w-[6px] h-[6px] rounded-full bg-UserAccent"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <p className="text-slate-600 dark:text-white/60">{item.institution}</p>
                          </div>
                        </motion.li>
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
                  <p className="text-slate-600 dark:text-white/60 mx-auto xl:mx-0">
                    {Skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {Skills.skillList.map((item, index) => {
                    return (
                      <motion.li 
                        key={item.name}
                        variants={skillVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={index}
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div 
                                className="w-full h-[150px] bg-white dark:bg-[#232329] rounded-xl flex justify-center items-center group shadow-sm dark:shadow-none cursor-pointer"
                                whileHover={{ 
                                  scale: 1.05,
                                  rotate: [0, -2, 2, 0],
                                  boxShadow: "0 0 25px rgba(0, 255, 153, 0.3)",
                                  borderColor: "rgba(0, 255, 153, 0.5)",
                                  transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                style={{ border: "1px solid transparent" }}
                              >
                                <motion.div 
                                  className="text-6xl group-hover:text-UserAccent transition-all duration-300"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {item.icon}
                                </motion.div>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-white/60 capitalize">
                                {item.name}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.li>
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
                <p className="text-slate-600 dark:text-white/60 mx-auto xl:mx-0">
                  {About.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-3 max-w-[100%] ">
                  {About.info.map((item, index) => (
                    <motion.li 
                      key={item.fieldName}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <span className="text-slate-600 dark:text-white/60">
                        {item.fieldName} &nbsp;
                      </span>
                      <span className="text-xl">{item.fieldValue}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </motion.section>
  );
};

export default Resume;
