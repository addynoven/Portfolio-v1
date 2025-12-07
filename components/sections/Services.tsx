"use client";

import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
import { servicesData } from "@/lib/data";
import { motion } from "framer-motion";
import React from "react";

const Services = () => {
  return (
    <section id="services" className="flex flex-col justify-center py-16 xl:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              delay: 0.4,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {/* Service */}
          {servicesData.map((service, index) => {
            return (
              <div
                key={service.num}
                className=" flex flex-1 flex-col justify-center gap-6 group"
              >
                {/* {" top "} */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-UserAccent transition-all duration-500 flex items-center justify-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>

                {/* {" heading "} */}
                <h2 className="h2 text-[42px] font-bold leading-none text-slate-900 dark:text-white group-hover:text-UserAccent transition-all duration-500">
                  {service.title}
                </h2>

                {/* {" description "} */}
                <p className="text-slate-600 dark:text-white/60">{service.Description}</p>
                {/* {"Border"} */}
                <div className="border-b border-slate-200 dark:border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
