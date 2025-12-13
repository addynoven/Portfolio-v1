"use client";

import { memo, useState, useRef } from "react";
import dynamic from "next/dynamic";
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

import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { FiSend, FiCheck, FiAlertCircle, FiMail, FiMapPin, FiPhone, FiArrowRight, FiCopy } from "react-icons/fi";

import { contactInfo } from "@/lib/data";
import { useAccentColor } from "@/lib/accentColor";

// Lazy load animation components
const SpotlightCard = dynamic(
  () => import("@/components/reactbits/Components/SpotlightCard"),
  { ssr: false }
);
const Magnet = dynamic(
  () => import("@/components/reactbits/Animations/Magnet"),
  { ssr: false }
);
const ClickSpark = dynamic(
  () => import("@/components/reactbits/Animations/ClickSpark"),
  { ssr: false }
);

type FormStatus = "idle" | "loading" | "success" | "error";

// Icon mapping for contact info
const iconMap: Record<string, React.ReactNode> = {
  "Phone": <FiPhone className="text-lg" />,
  "Email": <FiMail className="text-lg" />,
  "Address": <FiMapPin className="text-lg" />,
};

const Contact = memo(function Contact() {
  const accentColor = useAccentColor();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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
      ref={sectionRef}
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 xl:py-32 relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-UserAccent/5 via-transparent to-cyan-500/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-UserAccent/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 xl:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <motion.span
              className="text-sm font-medium tracking-widest text-UserAccent uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Contact
            </motion.span>
            
              <motion.h2
                 className="text-4xl text-center md:text-5xl xl:text-6xl font-bold text-UserAccent mb-6"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3, duration: 0.5 }}
              >
                Let's Work Together
              </motion.h2>
            
            <motion.p
              className="text-lg text-slate-600 dark:text-white/60 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 xl:gap-16 items-start max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard 
              spotlightColor="rgba(0, 255, 153, 0.08)"
              className="rounded-2xl"
            >
              <div className="bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl rounded-2xl p-8 xl:p-10 border border-slate-200/50 dark:border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-white/70">
                        First Name
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-UserAccent focus:ring-UserAccent/20 rounded-xl transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-white/70">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-UserAccent focus:ring-UserAccent/20 rounded-xl transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-white/70">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-UserAccent focus:ring-UserAccent/20 rounded-xl transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-white/70">
                        Phone <span className="text-slate-400">(optional)</span>
                      </label>
                      <Input
                        type="text"
                        name="phone"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-UserAccent focus:ring-UserAccent/20 rounded-xl transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Select */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-white/70">
                      What can I help you with?
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={handleServiceChange}
                    >
                      <SelectTrigger className="w-full h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-UserAccent rounded-xl">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">
                        <SelectGroup>
                          <SelectLabel className="text-UserAccent">Services</SelectLabel>
                          <SelectItem value="web">Web Development</SelectItem>
                          <SelectItem value="uiux">UI/UX Design</SelectItem>
                          <SelectItem value="mobile">Mobile Development</SelectItem>
                          <SelectItem value="fullstack">Full Stack Development</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-white/70">
                      Your Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project, goals, and timeline..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[140px] bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-UserAccent focus:ring-UserAccent/20 rounded-xl resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <Magnet strength={0.1}>
                    <ClickSpark sparkColor={accentColor} sparks={12} sparkSize={6}>
                      <Button
                        type="submit"
                        size="lg"
                        className={cn(
                          "w-full sm:w-auto min-w-[180px] h-12 text-base font-medium rounded-xl",
                          "bg-UserAccent hover:bg-UserAccent/90 text-black",
                          "shadow-lg shadow-UserAccent/25 hover:shadow-xl hover:shadow-UserAccent/30",
                          "transition-all duration-300",
                          "disabled:opacity-70 disabled:cursor-not-allowed"
                        )}
                        disabled={status === "loading"}
                      >
                        {status === "loading" && (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              ⏳
                            </motion.span>
                            Sending...
                          </span>
                        )}
                        {status === "success" && (
                          <span className="flex items-center gap-2">
                            <FiCheck className="text-lg" />
                            Sent!
                          </span>
                        )}
                        {status === "error" && (
                          <span className="flex items-center gap-2">
                            <FiAlertCircle className="text-lg" />
                            Try Again
                          </span>
                        )}
                        {status === "idle" && (
                          <span className="flex items-center gap-2">
                            Send Message
                            <FiSend className="text-lg" />
                          </span>
                        )}
                      </Button>
                    </ClickSpark>
                  </Magnet>

                  {/* Error Message */}
                  {status === "error" && errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-2"
                    >
                      <FiAlertCircle />
                      {errorMessage}
                    </motion.p>
                  )}
                </form>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div 
                    className={cn(
                      "group relative p-5 rounded-xl",
                      "bg-white/60 dark:bg-white/5 backdrop-blur-sm",
                      "border border-slate-200/50 dark:border-white/10",
                      "hover:border-UserAccent/30 dark:hover:border-UserAccent/30",
                      "transition-all duration-300 cursor-pointer"
                    )}
                    onClick={() => handleCopy(item.value, index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-UserAccent/10 text-UserAccent",
                        "group-hover:bg-UserAccent group-hover:text-black",
                        "transition-colors duration-300"
                      )}>
                        {iconMap[item.title] || item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1">
                          {item.title}
                        </p>
                        <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        copiedIndex === index && "opacity-100"
                      )}>
                        {copiedIndex === index ? (
                          <FiCheck className="text-UserAccent" />
                        ) : (
                          <FiCopy className="text-slate-400 dark:text-white/40" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="p-6 rounded-xl bg-gradient-to-br from-UserAccent/10 to-cyan-500/10 border border-UserAccent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-UserAccent animate-pulse mt-1.5" />
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-white mb-1">
                    Currently Available
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-white/60">
                    Open for freelance projects and collaboration. Average response time is under 24 hours.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-white/40 mb-3">
                Prefer social?
              </p>
              <div className="flex gap-3">
                {["LinkedIn", "GitHub", "Twitter"].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    whileHover={{ y: -2 }}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg",
                      "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70",
                      "hover:bg-UserAccent/10 hover:text-UserAccent",
                      "transition-colors duration-200"
                    )}
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});

export default Contact;
