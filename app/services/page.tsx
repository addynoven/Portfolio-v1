"use client";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const Services = [
  {
    num: "01",
    title: " Portfolio & Personal Branding Sites",
    Description:
      "Showcase your skills in creating visually appealing and highly functional personal sites. Emphasize how you can build custom, branded portfolio websites that highlight personal or business branding, provide strong online presence, and enable dynamic content updates.",
    href: "/services/01",
  },
  {
    num: "02",
    title: "E-Commerce Solutions",
    Description:
      "Tailor this to include full-stack e-commerce websites with shopping carts, secure payment integrations, and product management. Describe your ability to create seamless, scalable e-commerce solutions that cater to small businesses and larger brands alike.",
    href: "/services/02",
  },
  {
    num: "03",
    title: " Business Applications",
    Description:
      "For companies looking to digitize their operations, you can provide custom business applications. This could cover CRMs, project management systems, or data-driven platforms, where your AI and analytics background can set you apart for data-intensive needs.",
    href: "/services/03",
  },
  {
    num: "04",
    title: "AI-Powered Solutions",
    Description:
      "Exploring AI and Machine Learning to add smart, data-driven features to applications. I bring the power of AI and analytics to your web applications, enabling predictive insights and personalized user experiences.",
    href: "/services/04",
  },
  {
    num: "05",
    title: "Data Analytics & Visualization",
    Description:
      "Leveraging data to gain insights and drive informed decisions. With a background in Artificial Intelligence & Data Analytics, I can analyze and visualize data to help clients understand trends, improve strategies, and make data-driven decisions.",
    href: "/services/05",
  },
  {
    num: "06",
    title: "Frontend Development",
    Description:
      "Crafting engaging and intuitive interfaces that elevate user experiences. Specializing in React and Next.js, I focus on seamless, dynamic, and accessible frontend solutions with optimized performance and engaging animations. ",
    href: "/services/06",
  },
];

import { motion } from "framer-motion";

import React from "react";

const Service = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2.4,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {/* Service */}
          {Services.map((service, index) => {
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
                <h2 className="h2 text-[42px] font-bold leading-none text-white group-hover:text-UserAccent transition-all duration-500">
                  {service.title}
                </h2>

                {/* {" description "} */}
                <p className="text-white/60">{service.Description}</p>
                {/* {"Border"} */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Service;
