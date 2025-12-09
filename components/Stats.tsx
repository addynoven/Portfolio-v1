"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { num: 1, Text: "Years of Experience", suffix: "+" },
  { num: 20, Text: "Projects Completed", suffix: "+" },
  { num: 15, Text: "Technologies Mastered", suffix: "+" },
  { num: 500, Text: "Code Commits", suffix: "+" },
];

const statVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.34, 1.56, 0.64, 1], // Spring bounce
    },
  }),
};

const Stats = () => {
  return (
    <section className="mt-10 pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((stat, index) => {
            return (
              <motion.div
                className="flex flex-1 gap-4 items-center justify-center xl:justify-start"
                key={stat.Text}
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.3 + index * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <CountUp
                    end={stat.num}
                    duration={3}
                    delay={0.5}
                    suffix={stat.suffix || ""}
                    className="text-4xl xl:text-6xl font-extrabold"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </motion.div>

                <motion.p
                  className={`${
                    stat.Text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug text-slate-600 dark:text-white/80`}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  {stat.Text}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
