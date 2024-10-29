"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import { motion } from "framer-motion";
import RetroGrid from "@/components/ui/retro-grid";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const info = [
  {
    title: "Phone",
    icon: <FaPhoneAlt />,
    description: <a href="tel:+91 626 199 5234">+91 626 199 5234</a>,
  },
  {
    title: "Email",
    icon: <FaEnvelope />,
    description: <a href="mailto:dmcbaditya@gmail.com">dmcbaditya@gmail.com</a>,
  },
  {
    title: "Address",
    icon: <FaMapMarkerAlt />,
    description:
      "House No. 7, Narmada Kunj, Shaheed Nagar Colony, Bhopal, MP, India",
  },
];

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.4, ease: "easeIn", delay: 2.4 },
      }}
      className="py-6 relative"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-around ">
          {/* Contact form */}
          <div className=" xl:h-[54%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className=" text-4xl text-UserAccent">lets work together</h3>
              <p className="text-white/60">
                “Let's make something amazing together!
              </p>
              {/* inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" placeholder="First Name" />
                <Input type="text" placeholder="Last Name" />
                <Input text="email" placeholder="Email address" />
                <Input text="Phone" placeholder="Phone number" />
              </div>
              {/* select */}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="est">Web Development</SelectItem>
                    <SelectItem value="cst">UI/UX Design</SelectItem>
                    <SelectItem value="mst">Mobile Development</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                className="h-[200px]"
                placeholder="type your Message here..."
              />
              {/* btn */}
              <Button size="md" className="max-w-40">
                Send Message
              </Button>
            </form>
          </div>
          {/* Contact info */}
          <div className=" flex items-center xl:justify-start xl:order-none order-1 mb-8 xl:mb-1">
            <ul className="flex flex-col gap-10 px-3">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px]  bg-[#27272c] text-UserAccent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl xl:max-w-[25vw]">
                      {item.description}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* background */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <div className="hidden xl:block">
          <RetroGrid />
        </div>
        <div className="block xl:hidden">
          <GridPattern
            numSquares={30}
            maxOpacity={0.2}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent_60%)]",
              "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
            )}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
