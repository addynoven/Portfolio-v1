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

type FormStatus = "idle" | "loading" | "success" | "error";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Option 1: Use Formspree (replace with your form ID)
      // const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // Option 2: Use mailto as fallback (opens email client)
      const subject = `Portfolio Contact: ${formData.service || "General Inquiry"}`;
      const body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}

Message:
${formData.message}
      `.trim();

      const mailtoLink = `mailto:dmcbaditya@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, "_blank");

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.4, ease: "easeIn", delay: 0.4 },
      }}
      viewport={{ once: true }}
      className="py-16 xl:py-24 relative"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-around ">
          {/* Contact form */}
          <div className=" xl:h-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10 bg-white dark:bg-[#27272c] rounded-xl shadow-md dark:shadow-none"
            >
              <h3 className=" text-4xl text-UserAccent capitalize">
                Let's work together
              </h3>
              <p className="text-slate-600 dark:text-white/60">
                Let's make something amazing together!
              </p>
              {/* inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {/* select */}
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
              {/* textarea */}
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              {/* btn */}
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
            </form>
          </div>
          {/* Contact info */}
          <div className=" flex items-center xl:justify-start xl:order-none order-1 mb-8 xl:mb-1">
            <ul className="flex flex-col gap-10 px-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-white dark:bg-[#27272c] text-UserAccent rounded-md flex items-center justify-center shadow-sm dark:shadow-none">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 dark:text-white/60">{item.title}</p>
                    <h3 className="text-xl xl:max-w-[25vw] text-slate-900 dark:text-white">
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
