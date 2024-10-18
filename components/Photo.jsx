"use clint";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
    return (
        <div className="w-full h-full relative">
            <motion.div>
                <Image
                    src="/photo.png"
                    alt="photography"
                    fill
                    priority
                    quality={100}
                    className="object-contain"
                />
            </motion.div>
        </div>
    );
};

export default Photo;
