"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSiteName } from "@/hooks/useSiteName";

// Exact replica of the logic from V1's FooterAnimationShowcase.tsx
// Phase types for the animation logic
type MiniPhase = "scramble" | "neonverse" | "neon" | "letterChange" | "final" | "pause";

// Scramble characters used in Phase 1
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*んñнν";

const FooterAnimation = () => {
	const siteName = useSiteName(false); // Get first name (e.g., "Neon")
	const [phase, setPhase] = useState<MiniPhase>("scramble");
	const [displayText, setDisplayText] = useState("");
	const [letterStep, setLetterStep] = useState(0);
	const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Generate scrambled text
	const generateScramble = (length: number) => {
		return Array.from({ length }, () =>
			scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
		).join("");
	};

    const capitalizedName = siteName ? siteName.charAt(0).toUpperCase() + siteName.slice(1).toLowerCase() : "Neon";
    const upperName = siteName ? siteName.toUpperCase() : "NEON";

    // Main animation loop - matches exact requested sequence
    useEffect(() => {
        let mounted = true;

        const runAnimation = async () => {
            if (!mounted) return;

            // Phase 1: NAMEVERSE (start)
            setPhase("neonverse");
            await new Promise((r) => setTimeout(r, 1000));
            if (!mounted) return;

            // Phase 2: NAME uppercase
            setPhase("neon");
            await new Promise((r) => setTimeout(r, 800));
            if (!mounted) return;

            // Phase 3: Letter-by-letter change (UPPERCASE -> Capitalized)
            setPhase("letterChange");
            setLetterStep(0);

            for (let i = 1; i <= upperName.length; i++) {
                await new Promise((r) => setTimeout(r, 300));
                if (!mounted) return;
                setLetterStep(i);
            }

            // Phase 4: Pause & blink
            setPhase("pause");
            await new Promise((r) => setTimeout(r, 1500));
            if (!mounted) return;

            // Phase 5: Scramble
            setPhase("scramble");
            scrambleIntervalRef.current = setInterval(() => {
                setDisplayText(generateScramble(8));
            }, 50);

            await new Promise((r) => setTimeout(r, 800));
            if (!mounted) return;
            if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

            // Restart Loop
            runAnimation();
        };

        runAnimation();

        return () => {
            mounted = false;
            if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        };
    }, [upperName]);

    // Render the text content based on the phase
    const renderContent = () => {
        const accentColor = "var(--accent)";
        const textBaseClasses = "font-black tracking-tight text-foreground text-xl sm:text-2xl font-mono transition-none";

        switch (phase) {
            case "scramble":
                return (
                    <motion.span
                        key="scramble"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-mono text-muted-foreground opacity-50 text-xl sm:text-2xl"
                    >
                        {displayText}
                    </motion.span>
                );

            case "neonverse":
                return (
                    <motion.span
                        key="neonverse"
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className={textBaseClasses}
                    >
                        {upperName}VERSE
                        <span style={{ color: accentColor }}>.</span>
                    </motion.span>
                );

            case "neon":
                return (
                    <motion.span
                        key="neon"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        className={textBaseClasses}
                    >
                        {upperName}
                        <span style={{ color: accentColor }}>.</span>
                    </motion.span>
                );

            case "letterChange":
                const upperLetters = upperName.split('');
                const finalLetters = capitalizedName.split('');
                
                return (
                    <motion.span key="letterChange" className={textBaseClasses}>
                        {upperLetters.map((letter: string, i: number) => (
                            <motion.span
                                key={i}
                                className="text-foreground"
                                // No green passing style as requested
                                animate={
                                    i === (letterStep as number) - 1
                                        ? { y: [0, -2, 0], scale: [1, 1.1, 1] }
                                        : {}
                                }
                                transition={{ duration: 0.2 }}
                            >
                                {i < (letterStep as number) ? finalLetters[i] : letter}
                            </motion.span>
                        ))}
                        <span style={{ color: accentColor }}>.</span>
                    </motion.span>
                );

            case "final":
            case "pause":
                return (
                    <motion.span
                        key="final"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={textBaseClasses}
                    >
                        {capitalizedName}<span style={{ color: accentColor }}>.</span>
                    </motion.span>
                );

            default:
                return null;
        }
    };

	return (
		<div className="flex items-center justify-start h-12 overflow-hidden py-1">
			<AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
		</div>
	);
};

export default FooterAnimation;
