import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { METADATA } from "@/app/v3/constants";
import { useLanguage } from "@/context/v3/language-context";
import { useSiteName } from "@/hooks/useSiteName";

// --- Types ---
type AnimationState = "breakdown" | "conversion" | "symbol";
type MiniPhase = "scramble" | "neonverse" | "neon" | "letterChange" | "final" | "pause";

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*んñнν";

const FooterAnimation = () => {
	const { t, language } = useLanguage();
	
	// --- English Animation State (V1 Style) ---
	const siteName = useSiteName(false);
	const [enPhase, setEnPhase] = useState<MiniPhase>("scramble");
	const [enDisplayText, setEnDisplayText] = useState("");
	const [enLetterStep, setEnLetterStep] = useState(0);
	const enScrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// --- Japanese Animation State (Element Style) ---
	const [jpState, setJpState] = useState<AnimationState>("breakdown");
	const [jpLetterStep, setJpLetterStep] = useState(0);

	const generateScramble = (length: number) => {
		return Array.from({ length }, () =>
			scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
		).join("");
	};

	const capitalizedName = siteName ? siteName.charAt(0).toUpperCase() + siteName.slice(1).toLowerCase() : "Neon";
	const upperName = siteName ? siteName.toUpperCase() : "NEON";

	// --- English Animation Logic ---
	useEffect(() => {
		if (language !== "en") return;
		let mounted = true;

		const runAnimation = async () => {
			if (!mounted) return;
			setEnPhase("neonverse");
			await new Promise((r) => setTimeout(r, 1000));
			if (!mounted) return;

			setEnPhase("neon");
			await new Promise((r) => setTimeout(r, 800));
			if (!mounted) return;

			setEnPhase("letterChange");
			setEnLetterStep(0);
			for (let i = 1; i <= upperName.length; i++) {
				await new Promise((r) => setTimeout(r, 300));
				if (!mounted) return;
				setEnLetterStep(i);
			}

			setEnPhase("pause");
			await new Promise((r) => setTimeout(r, 1500));
			if (!mounted) return;

			setEnPhase("scramble");
			enScrambleIntervalRef.current = setInterval(() => {
				setEnDisplayText(generateScramble(8));
			}, 50);
			await new Promise((r) => setTimeout(r, 800));
			if (!mounted) return;
			if (enScrambleIntervalRef.current) clearInterval(enScrambleIntervalRef.current);

			runAnimation();
		};

		runAnimation();
		return () => {
			mounted = false;
			if (enScrambleIntervalRef.current) clearInterval(enScrambleIntervalRef.current);
		};
	}, [language, upperName]);

	// --- Japanese Animation Logic ---
	useEffect(() => {
		if (language !== "jp") return;
		let mounted = true;

		const runJpAnimation = async () => {
			if (!mounted) return;
			
			// Phase 1: Breakdown
			setJpState("breakdown");
			await new Promise((r) => setTimeout(r, 2000));
			if (!mounted) return;

			// Phase 2: Conversion (Katakana -> Hiragana)
			setJpState("conversion");
			setJpLetterStep(0);
			const katakana = "ネオン";
			for (let i = 1; i <= katakana.length; i++) {
				await new Promise((r) => setTimeout(r, 600));
				if (!mounted) return;
				setJpLetterStep(i);
			}
			await new Promise((r) => setTimeout(r, 1500));
			if (!mounted) return;

			// Phase 3: Symbol
			setJpState("symbol");
			await new Promise((r) => setTimeout(r, 2000));
			if (!mounted) return;

			runJpAnimation();
		};

		runJpAnimation();
		return () => { mounted = false; };
	}, [language]);

	const renderEnglish = () => {
		const accentColor = "var(--accent)";
		const textBaseClasses = "font-black tracking-tight text-foreground text-xl sm:text-2xl font-mono transition-none";

		switch (enPhase) {
			case "scramble":
				return (
					<motion.span key="en-scramble" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="font-mono text-muted-foreground opacity-50 text-xl sm:text-2xl">
						{enDisplayText}
					</motion.span>
				);
			case "neonverse":
				return (
					<motion.span key="en-neonverse" initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3 }} className={textBaseClasses}>
						{upperName}VERSE<span style={{ color: accentColor }}>.</span>
					</motion.span>
				);
			case "neon":
				return (
					<motion.span key="en-neon" initial={{ opacity: 1 }} animate={{ opacity: 1 }} className={textBaseClasses}>
						{upperName}<span style={{ color: accentColor }}>.</span>
					</motion.span>
				);
			case "letterChange":
				const upperLetters = upperName.split('');
				const finalLetters = capitalizedName.split('');
				return (
					<motion.span key="en-letterChange" className={textBaseClasses}>
						{upperLetters.map((letter: string, i: number) => (
							<motion.span key={i} className="text-foreground" animate={i === enLetterStep - 1 ? { y: [0, -2, 0], scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.2 }}>
								{i < enLetterStep ? finalLetters[i] : letter}
							</motion.span>
						))}
						<span style={{ color: accentColor }}>.</span>
					</motion.span>
				);
			case "final":
			case "pause":
				return (
					<motion.span key="en-final" initial={{ opacity: 1 }} animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className={textBaseClasses}>
						{capitalizedName}<span style={{ color: accentColor }}>.</span>
					</motion.span>
				);
			default: return null;
		}
	};

	const renderJapanese = () => {
		const baseClasses = "text-xl sm:text-2xl font-mono font-bold tracking-tighter select-none";
		const katakana = "ネオン";
		const hiragana = METADATA.element.hiragana;

		switch (jpState) {
			case "breakdown":
				return (
					<motion.div key="jp-breakdown" initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }} className={`${baseClasses} text-accent/50 tracking-[0.2em]`}>
						{METADATA.element.breakdown}
					</motion.div>
				);
			case "conversion":
				return (
					<motion.div key="jp-conversion" className={baseClasses}>
						{katakana.split('').map((char, i) => (
							<motion.span
								key={i}
								initial={false}
								animate={i === jpLetterStep - 1 ? { y: [0, -3, 0], color: ["var(--foreground)", "var(--accent)", "var(--foreground)"] } : {}}
								transition={{ duration: 0.3 }}
							>
								{i < jpLetterStep ? hiragana[i] : char}
							</motion.span>
						))}
						<span className="text-accent">.</span>
					</motion.div>
				);
			case "symbol":
				return (
					<motion.div key="jp-symbol" initial={{ opacity: 0, x: -10, filter: "blur(4px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: 10, filter: "blur(4px)" }} className={`${baseClasses} text-accent`}>
						{METADATA.element.symbol}
					</motion.div>
				);
		}
	};

	return (
		<div className="flex items-center justify-start h-12 overflow-hidden py-1">
			<AnimatePresence mode="wait">
				{language === "en" ? renderEnglish() : renderJapanese()}
			</AnimatePresence>
		</div>
	);
};

export default FooterAnimation;
