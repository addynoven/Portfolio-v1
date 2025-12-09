"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

//variants

const StairAnimation = {
    initial: {
        top: "0%",
    },
    animate: {
        top: "100%",
    },
    exit: {
        top: "100%", 
    },
};

const reverseIndex = (index: number) => {
    const totalStairs = 6;
    return totalStairs - index - 1;
};


const Stair = () => {
    const { theme } = useTheme();

    return (
        <>
            {[...Array(6)].map((_, index) => {
                return (
                    <motion.div
                        key={index}
                        variants={StairAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                            delay: reverseIndex(index) * 0.1,
                        }}
                        className="h-full w-full relative"
                        style={{
                            backgroundColor: theme === "light" 
                                ? `hsl(0, 0%, ${100 - index * 5}%)`  // Light: 100% -> 75%
                                : `hsl(240, 10%, ${4 + index * 4}%)` // Dark: 4% -> 24%
                        }}
                    />
                );
            })}
        </>
    );
};

export default Stair;
