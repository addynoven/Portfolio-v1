"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/v3/language-context";
import { useTheme, SCHEME_META } from "@/lib/v3/theme";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LanguageToggleProps {
	variant?: "minimal" | "full";
}

const LanguageToggle = ({ variant = "minimal" }: LanguageToggleProps) => {
	const { language, setLanguage } = useLanguage();
	const { mode, scheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const accentColor = mounted
		? mode === "dark"
			? SCHEME_META[scheme].dark
			: SCHEME_META[scheme].light
		: SCHEME_META[scheme].dark;

	if (variant === "full") {
		return (
			<div className="relative flex items-center p-1 bg-foreground/[0.03] dark:bg-foreground/[0.05] rounded-xl border border-foreground/[0.08] select-none w-full">
				{/* Sliding Thumb */}
				<motion.div
					className="absolute inset-y-1 bg-accent rounded-[7px] shadow-sm"
					initial={false}
					animate={{
						left: language === "en" ? "4px" : "calc(50% + 2px)",
						right: language === "en" ? "calc(50% + 2px)" : "4px",
					}}
					transition={{ type: "spring", stiffness: 400, damping: 35 }}
				/>

				<button
					onClick={() => setLanguage("en")}
					className={cn(
						"relative z-10 py-3 text-[11px] font-bold transition-colors duration-300 rounded-lg flex-1",
						language === "en" ? "text-accent-foreground" : "text-foreground/40 hover:text-foreground/70"
					)}
				>
					EN
				</button>
				<button
					onClick={() => setLanguage("jp")}
					className={cn(
						"relative z-10 py-3 text-[11px] font-bold transition-colors duration-300 rounded-lg flex-1",
						language === "jp" ? "text-accent-foreground" : "text-foreground/40 hover:text-foreground/70"
					)}
				>
					JP
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={() => setLanguage(language === "en" ? "jp" : "en")}
			className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:bg-foreground/5 relative overflow-hidden"
			aria-label="Toggle language"
			title={`Switch to ${language === "en" ? "Japanese" : "English"}`}
		>
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
				style={{ backgroundColor: accentColor }}
			/>
			<span className="relative z-10 text-[11px] font-bold font-mono text-foreground/60 group-hover:text-foreground transition-colors uppercase">
				{language}
			</span>
			<span
				className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full shadow-sm transition-all duration-500"
				style={{ backgroundColor: accentColor }}
			/>
		</button>
	);
};

export default LanguageToggle;
