"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

interface LetterTransitionProps {
	onComplete?: () => void;
	onNStruggle?: () => void; // Called when the struggle starts
}

// Random characters for the "struggle" effect on the last N
const scrambleChars =
	"んñнνნննनনணணநнABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export const LetterTransition: React.FC<LetterTransitionProps> = ({
	onComplete,
	onNStruggle,
}) => {
	// Track which letters have transitioned: NEON → Neon
	// Step 0: NEON.
	// Step 1: nEON. (first N changed)
	// Step 2: neON. (E changed)
	// Step 3: neoN. (first O changed)
	// Step 4: neon? (trying to change last N - STRUGGLE!)
	const [step, setStep] = useState(0);
	const [isStruggling, setIsStruggling] = useState(false);
	const [scrambledN, setScrambledN] = useState("N");
	const [struggleCount, setStruggleCount] = useState(0);

	// Letter states based on step
	const letters = [
		{ upper: "N", lower: "N", changed: step >= 1 },
		{ upper: "E", lower: "e", changed: step >= 2 },
		{ upper: "O", lower: "o", changed: step >= 3 },
		{ upper: "N", lower: "N", changed: false, isLastN: true }, // Last N never fully changes
	];

	// Progress through letter changes
	useEffect(() => {
		if (step < 3) {
			// Change letters one by one (0.4s per letter)
			const timer = setTimeout(() => {
				setStep((prev) => prev + 1);
			}, 400);
			return () => clearTimeout(timer);
		} else if (step === 3 && !isStruggling) {
			// Start struggling on the last N
			const timer = setTimeout(() => {
				setIsStruggling(true);
				onNStruggle?.();
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [step, isStruggling, onNStruggle]);

	// Scramble effect during struggle
	useEffect(() => {
		if (!isStruggling) return;

		const scrambleInterval = setInterval(() => {
			// Pick a random character from scramble chars
			const randomChar =
				scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
			setScrambledN(randomChar);
			setStruggleCount((prev) => prev + 1);
		}, 80);

		// After ~1.2s of struggling, trigger completion
		const completeTimer = setTimeout(() => {
			clearInterval(scrambleInterval);
			onComplete?.();
		}, 1200);

		return () => {
			clearInterval(scrambleInterval);
			clearTimeout(completeTimer);
		};
	}, [isStruggling, onComplete]);

	return (
		<motion.div
			className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
			style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.3 } }}
		>
			<div className="flex items-baseline text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter">
				{letters.map((letter, index) => (
					<motion.span
						key={index}
						className={`inline-block ${
							letter.isLastN && isStruggling
								? "text-red-500"
								: "text-slate-900 dark:text-white"
						}`}
						animate={
							letter.isLastN && isStruggling
								? {
										x: [0, -2, 2, -1, 1, 0],
										scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
								  }
								: {}
						}
						transition={
							letter.isLastN && isStruggling
								? { duration: 0.15, repeat: Infinity }
								: {}
						}
					>
						{letter.isLastN
							? isStruggling
								? scrambledN
								: letter.upper
							: letter.changed
							? letter.lower
							: letter.upper}
					</motion.span>
				))}

				{/* The dot */}
				<span
					className={`inline-block ${
						isStruggling ? "text-red-500 animate-pulse" : "text-UserAccent"
					}`}
				>
					.
				</span>
			</div>

			{/* "Can't find the right 'n'..." hint text during struggle */}
			<AnimatePresence>
				{isStruggling && struggleCount > 5 && (
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 0.6, y: 0 }}
						exit={{ opacity: 0 }}
						className="absolute bottom-1/3 text-sm md:text-base text-slate-500 dark:text-slate-400"
					>
						searching for the perfect 'n'...
					</motion.p>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default LetterTransition;
