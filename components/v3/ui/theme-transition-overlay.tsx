"use client";

import { useTheme } from "@/lib/v3/theme";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionState {
	x: number;
	y: number;
	targetTheme: "light" | "dark";
}

export default function ThemeTransitionOverlay() {
	const { setMode } = useTheme();
	const [transition, setTransition] = useState<TransitionState | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const handleTransition = (e: Event) => {
			const event = e as CustomEvent<TransitionState>;
			setTransition(event.detail);

			// Physically switch the theme when the circle is covering the screen
			setTimeout(() => {
				setMode(event.detail.targetTheme);
			}, 600); // Delayed to allow blur to show first

			// Cleanup overlay after the circle finishes and fades out
			setTimeout(() => {
				setTransition(null);
			}, 1200);
		};

		window.addEventListener("theme-transition", handleTransition);
		return () =>
			window.removeEventListener("theme-transition", handleTransition);
	}, [mounted, setMode]);

	return (
		<AnimatePresence>
			{transition && (
				<motion.div
					className="fixed inset-0 z-[99999] pointer-events-none"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					{/* Heavy Blur Background with Grayscale */}
					<motion.div
						className="absolute inset-0 backdrop-blur-xl backdrop-grayscale-[0.5] bg-background/20"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					/>

					{/* Expanding Circle Mask covering the site */}
					<motion.div
						className="absolute rounded-full"
						style={{
							left: transition.x,
							top: transition.y,
							// Background color mimics the target theme's background
							backgroundColor:
								transition.targetTheme === "light" ? "#f0f6ff" : "#040b15",
							transform: "translate(-50%, -50%)",
						}}
						initial={{ width: 0, height: 0 }}
						animate={{ width: "300vmax", height: "300vmax" }}
						// Ease out quart for a snappy then smooth expansion
						transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
