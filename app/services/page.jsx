"use client";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const Services = [
    {
        num: "01",
        title: "Website Development",
        Description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
        href: "/services/01",
    },
    {
        num: "02",
        title: "UI/UX Design",
        Description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
        href: "/services/02",
    },
    {
        num: "03",
        title: "Game Development",
        Description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
        href: "/services/03",
    },
    {
        num: "04",
        title: "App Development",
        Description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
        href: "/services/04",
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
                                <p className="text-white/60">
                                    {service.Description}
                                </p>
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
