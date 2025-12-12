"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { FullScreenScramble } from "./FullScreenScramble";
import { Scrambler } from "@/lib/scramble-utils";
import { DissolveTransition } from "./DissolveTransition";
import { MultilingualGreeting } from "./MultilingualGreeting";
import { LetterTransition } from "./LetterTransition";

// Phases (sequential, no overlap issues):
// 1. chaos: Full screen scrambled text
// 2. concentrate: "NEONVERSE" forms in center
// 3. brand: "NEONVERSE" -> "NEON"
// 4. letterChange: Letter-by-letter N->n, E->e, O->o, then last N struggles
// 5. greeting: Multilingual greeting cycle to "find the perfect n"
// 6. centering: "Neon." moves back to center (smooth transition)
// 7. logoFading: "Neon." fades out (solid bg still visible)
// 8. dissolving: Dissolve effect plays ON TOP of solid bg
// 9. done: Loader completely removed
type Phase =
	| "chaos"
	| "concentrate"
	| "brand"
	| "letterChange"
	| "greeting"
	| "centering"
	| "logoFading"
	| "dissolving"
	| "done";

const LoadingScreen = () => {
	const pathname = usePathname();
	// Toggle this to true to re-enable the dissolve effect for testing
	const ENABLE_DISSOLVE = false;
	const { theme } = useTheme();
	const [phase, setPhase] = useState<Phase>("chaos");
	const [displayText, setDisplayText] = useState("");
	const scramblerRef = useRef<Scrambler | null>(null);
	const [skipLoading, setSkipLoading] = useState(false);

	// Check if loading screen is disabled via terminal command
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const shouldSkip = localStorage.getItem('skip-loading-screen') === 'true';
			if (shouldSkip) {
				setSkipLoading(true);
				setPhase('done');
			}
		}
	}, []);

	// Callbacks for phase transitions
	const handleLetterTransitionComplete = () => {
		// After the N struggle, move to greeting phase (search for perfect n)
		setPhase("greeting");
	};

	const handleGreetingComplete = () => {
		// First center the Neon. logo
		setPhase("centering");
		// After 0.6s centering animation, start fading
		setTimeout(() => {
			setPhase("logoFading");
			// After 1s fade, either play the dissolve (if enabled) or finish the loader
			setTimeout(() => {
				if (ENABLE_DISSOLVE) setPhase("dissolving");
				else {
					// 200ms breathing room - blank screen before site reveals
					setTimeout(() => setPhase("done"), 200);
				}
			}, 1000);
		}, 600);
	};

	useEffect(() => {
		// Initialize Scrambler
		scramblerRef.current = new Scrambler((text) => setDisplayText(text));

		// TIMELINE - Clear sequential phases
		// 0s: Chaos starts

		// 2.0s: Start forming "NEONVERSE"
		const timer1 = setTimeout(() => {
			setPhase("concentrate");
			scramblerRef.current?.setText("NEONVERSE", 60);
		}, 2000);

		// 4.0s: Shrink to "NEON"
		const timer2 = setTimeout(() => {
			setPhase("brand");
			scramblerRef.current?.setText("NEON", 60);
		}, 4000);

		// 5.0s: Start letter-by-letter transition (NEON -> Neon with struggle on last N)
		const timer3 = setTimeout(() => {
			setPhase("letterChange");
		}, 5000);

		// Note: greeting is triggered by LetterTransition callback, not a fixed timer
		// Note: logoFading and dissolving are triggered by callbacks, not fixed timers

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
			clearTimeout(timer3);
		};
	}, []);

	const handleDissolveComplete = () => {
		setPhase("done");
	};

	// Don't render anything after done or if not on home page
	if (phase === "done" || pathname !== "/") return null;

	const showSolidBg = true;
	const showScrambledLogo = phase === "concentrate" || phase === "brand";
	const showLetterChange = phase === "letterChange";
	const showGreeting = phase === "greeting";
	const showCentering = phase === "centering";
	const showLogoFading = phase === "logoFading";
	const showDissolve = ENABLE_DISSOLVE && phase === "dissolving";

	return (
		<>
			{/* Solid Background - ALWAYS visible until done (prevents FOUC) */}
			{showSolidBg && (
				<div className="fixed inset-0 z-[99] bg-white dark:bg-[#0a0a0a]">
					{/* Background Chaos */}
					<AnimatePresence>
						{phase === "chaos" && <FullScreenScramble />}
					</AnimatePresence>
				</div>
			)}

			{/* Central Text - Scrambled Logo (NEONVERSE -> NEON) */}
			<AnimatePresence>
				{showScrambledLogo && (
					<motion.div
						key="scrambled-logo"
						exit={{
							opacity: 0,
							transition: { duration: 0.5, ease: "easeOut" },
						}}
						className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
					>
						<motion.div
							initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
							animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
							transition={{ duration: 0.8, ease: "easeOut" }}
							className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 dark:text-white"
						>
							{displayText}
							<span className="text-UserAccent inline-block animate-pulse">
								.
							</span>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Letter-by-Letter Transition with N struggle */}
			<AnimatePresence>
				{showLetterChange && (
					<LetterTransition onComplete={handleLetterTransitionComplete} />
				)}
			</AnimatePresence>

			{/* Multilingual Greeting Phase - Neon. slides right to make space */}
			<AnimatePresence>
				{showGreeting && (
					<MultilingualGreeting onComplete={handleGreetingComplete} />
				)}
			</AnimatePresence>

			{/* Centering Phase - Neon. moves back to center with smooth animation */}
			<AnimatePresence>
				{showCentering && (
					<motion.div
						key="centering-phase"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.3 } }}
						className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
						style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
					>
						<motion.div
							layoutId="neon-brand"
							className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 dark:text-white"
							transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
						>
							Neon<span className="text-[#22c55e]">.</span>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Logo Fading Phase - shows "Neon." fading on solid bg */}
			{showLogoFading && (
				<motion.div
					className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
					style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
					initial={{ opacity: 1 }}
					animate={{ opacity: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					<div className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 dark:text-white">
						Neon<span className="text-[#22c55e]">.</span>
					</div>
				</motion.div>
			)}

			{/* Dissolve Transition - ON TOP of solid bg, dissolves organically */}
			<DissolveTransition
				isActive={showDissolve}
				duration={5000}
				onComplete={handleDissolveComplete}
			/>
		</>
	);
};

export default LoadingScreen;
