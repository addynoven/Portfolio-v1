"use client";

import { useTheme, SCHEME_META } from "@/lib/v3/theme";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const { mode, scheme, setMode } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleMode = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!mounted) return;
		const targetTheme = mode === "dark" ? "light" : "dark";

		// Dispatch custom event for the transition overlay
		const event = new CustomEvent("theme-transition", {
			detail: { x: e.clientX, y: e.clientY, targetTheme },
		});
		window.dispatchEvent(event);
	};

	const accentColor =
		mode === "dark" ? SCHEME_META[scheme].dark : SCHEME_META[scheme].light;

	if (!mounted) {
		return (
			<div className="w-10 h-10 rounded-xl bg-foreground/5" />
		);
	}

	return (
		<button
			onClick={toggleMode}
			className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:bg-foreground/5 relative overflow-hidden"
			aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
			title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
		>
			{/* Background Glow matching scheme */}
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
				style={{ backgroundColor: accentColor }}
			/>

			<div className="relative z-10">
				{mode === "dark" ? (
					<Sun
						size={20}
						className="text-foreground/60 group-hover:text-foreground transition-colors duration-300"
					/>
				) : (
					<Moon
						size={20}
						className="text-foreground/60 group-hover:text-foreground transition-colors duration-300"
					/>
				)}
			</div>

			{/* Micro-dot for current scheme color */}
			<span
				className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full shadow-sm transition-all duration-500"
				style={{ backgroundColor: accentColor }}
			/>
		</button>
	);
}
