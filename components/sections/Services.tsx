"use client";

import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
import { servicesData } from "@/lib/data";
import { motion } from "framer-motion";
import React from "react";
import SplitText from "@/components/reactbits/SplitText";
import GlareHover from "@/components/reactbits/GlareHover";

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -80 : 80,
    y: 30,
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      delay: index * 0.15,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const Services = () => {
  return (
    <section id="services" className="flex flex-col justify-center py-16 xl:py-24">
      <div className="container mx-auto">
        {/* Section Header with Split Text Animation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl xl:text-5xl font-bold mb-4">
            <SplitText text="My Services" stagger={0.08} delay={0.2} />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
          {/* Service Cards with Glare Effect */}
          {servicesData.map((service, index) => {
            return (
              <motion.div
                key={service.num}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
              >
                <GlareHover
                  className="h-full"
                  glareColor="rgba(0, 255, 153, 0.15)"
                  borderRadius="16px"
                >
                  <div className="flex flex-1 flex-col justify-center gap-6 group p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-white/10">
                    {/* top */}
                    <div className="w-full flex justify-between items-center">
                      <motion.div 
                        className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500"
                        whileHover={{ scale: 1.1 }}
                      >
                        {service.num}
                      </motion.div>
                      <Link
                        href={service.href}
                        className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-UserAccent transition-all duration-500 flex items-center justify-center hover:rotate-45"
                      >
                        <BsArrowDownRight className="text-primary text-3xl" />
                      </Link>
                    </div>

                    {/* heading */}
                    <h2 className="h2 text-[42px] font-bold leading-none text-slate-900 dark:text-white group-hover:text-UserAccent transition-all duration-500">
                      {service.title}
                    </h2>

                    {/* description */}
                    <p className="text-slate-600 dark:text-white/60">{service.Description}</p>
                    
                    {/* Border with animation */}
                    <motion.div 
                      className="border-b-2 border-slate-200 dark:border-white/20 w-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </GlareHover>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

