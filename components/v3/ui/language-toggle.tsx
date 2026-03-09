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

	// Hydration Fix: prevent mismatch by only rendering once mounted
	if (!mounted) {
		return (
			<div className={cn(
				"bg-foreground/5 rounded-full border border-foreground/[0.08]",
				variant === "full" ? "w-full h-[46px]" : "w-[84px] h-[34px]"
			)} />
		);
	}

	if (variant === "full") {
		return (
			<div className="relative flex items-center p-1 bg-foreground/[0.03] dark:bg-foreground/[0.05] rounded-full border border-foreground/[0.08] select-none w-full">
				<motion.div
					className="absolute inset-y-1 bg-accent rounded-full shadow-sm"
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
						"relative z-10 py-2.5 text-[11px] font-bold transition-colors duration-300 rounded-full flex-1",
						language === "en" ? "text-accent-foreground" : "text-foreground/40 hover:text-foreground/70"
					)}
				>
					EN
				</button>
				<button
					onClick={() => setLanguage("jp")}
					className={cn(
						"relative z-10 py-2.5 text-[11px] font-bold transition-colors duration-300 rounded-full flex-1",
						language === "jp" ? "text-accent-foreground" : "text-foreground/40 hover:text-foreground/70"
					)}
				>
					JP
				</button>
			</div>
		);
	}

	// Minimal variant: a sleek elongated pill-switch for the navbar
	return (
		<div className="relative flex items-center p-1 bg-foreground/[0.03] dark:bg-foreground/[0.05] rounded-full border border-foreground/[0.08] select-none w-[84px] h-[34px]">
			<motion.div
				className="absolute inset-y-1 bg-accent rounded-full shadow-sm"
				initial={false}
				animate={{
					left: language === "en" ? "4px" : "calc(50% + 1px)",
					right: language === "en" ? "calc(50% + 1px)" : "4px",
				}}
				transition={{ type: "spring", stiffness: 450, damping: 35 }}
			/>

			<button
				onClick={() => setLanguage("en")}
				className={cn(
					"relative z-10 h-full text-[10px] font-bold transition-all duration-300 flex-1 rounded-full",
					language === "en" ? "text-accent-foreground" : "text-foreground/45 hover:text-foreground/75"
				)}
			>
				EN
			</button>
			<button
				onClick={() => setLanguage("jp")}
				className={cn(
					"relative z-10 h-full text-[10px] font-bold transition-all duration-300 flex-1 rounded-full",
					language === "jp" ? "text-accent-foreground" : "text-foreground/45 hover:text-foreground/75"
				)}
			>
				JP
			</button>
		</div>
	);
};

export default LanguageToggle;
