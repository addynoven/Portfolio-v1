"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { motion } from "framer-motion";
import RetroGrid from "@/components/ui/retro-grid";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

import { contactInfo } from "@/lib/data";
import SplitText from "@/components/reactbits/TextAnimations/SplitText";
import ClickSpark from "@/components/reactbits/Animations/ClickSpark";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Something went wrong");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 xl:py-24 relative"
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
            <SplitText text="Contact Me" stagger={0.08} delay={0.2} />
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

        <div className="flex flex-col xl:flex-row items-center justify-around ">
          {/* Contact form */}
          <motion.div 
            className="xl:h-[54%] order-2 xl:order-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.h3 
                className="text-4xl text-UserAccent capitalize"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Let's work together
              </motion.h3>
              <motion.p 
                className="text-slate-600 dark:text-white/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Let's make something amazing together!
              </motion.p>
              {/* inputs with staggered animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                >
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                >
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={3}
                >
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </motion.div>
              </div>
              {/* select */}
              <motion.div
                variants={inputVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                <Select
                  value={formData.service}
                  onValueChange={handleServiceChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="uiux">UI/UX Design</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="fullstack">
                      Full Stack Development
                    </SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </motion.div>
              {/* textarea */}
              <motion.div
                variants={inputVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={5}
              >
                <Textarea
                  name="message"
                  className="h-[200px]"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              {/* btn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <ClickSpark sparkColor="#00ff99" sparks={12} sparkSize={6}>
                  <Button
                    type="submit"
                    size="md"
                    className="max-w-44 flex items-center gap-2"
                    disabled={status === "loading"}
                  >
                    {status === "loading" && (
                      <>
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <FiCheck className="text-lg" />
                        Sent!
                      </>
                    )}
                    {status === "error" && (
                      <>
                        <FiAlertCircle className="text-lg" />
                        Error
                      </>
                    )}
                    {status === "idle" && (
                      <>
                        Send Message
                        <FiSend className="text-lg" />
                      </>
                    )}
                  </Button>
                </ClickSpark>
              </motion.div>
              {/* Error message display */}
              {status === "error" && errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {errorMessage}
                </motion.p>
              )}
            </motion.form>
          </motion.div>
          {/* Contact info */}
          <motion.div 
            className="flex items-center xl:justify-start xl:order-none order-1 mb-8 xl:mb-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ul className="flex flex-col gap-10 px-3">
              {contactInfo.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-6"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <motion.div 
                    className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-white dark:bg-[#27272c] text-UserAccent rounded-md flex items-center justify-center shadow-sm dark:shadow-none"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 0 20px rgba(0, 255, 153, 0.3)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-[28px]">{item.icon}</div>
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-slate-500 dark:text-white/60">{item.title}</p>
                    <h3 className="text-xl xl:max-w-[25vw] text-slate-900 dark:text-white">
                      {item.description}
                    </h3>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      {/* background - COMMENTED OUT FOR TESTING
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
      */}
    </motion.section>
  );
};

export default Contact;
