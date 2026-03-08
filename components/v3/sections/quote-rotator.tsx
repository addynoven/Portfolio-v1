"use client";

import { QUOTES } from "@/app/v3/constants";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/v3/language-context";

// ── Timing ───────────────────────────────────────────────────
const TYPING_SPEED = 28; // ms per char (type-in)
const ERASE_SPEED = 18; // ms per char (erase — slightly faster)
const AUTHOR_HOLD = 2800; // ms author stays visible
const AUTHOR_SLIDE_MS = 500; // slide-in / slide-out duration
const FADE_MS = 300; // final section fade

type Phase =
	| "typing"
	| "author-in"
	| "holding"
	| "author-out"
	| "erasing"
	| "fading";

export default function QuoteRotator() {
	const { t, language } = useLanguage();
	const [index, setIndex] = useState(0);
	const [displayed, setDisplayed] = useState("");
	const [phase, setPhase] = useState<Phase>("typing");

	const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const addTimer = (ms: number, cb: () => void) => {
		const id = setTimeout(cb, ms);
		timers.current.push(id);
	};

	const clearAll = () => {
		timers.current.forEach(clearTimeout);
		timers.current = [];
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		const quote = QUOTES[index];
		const quoteText = t(quote.text);
		let charIdx = 0;

		setDisplayed("");
		setPhase("typing");
		clearAll();

		// ── 1. Type in ────────────────────────────────────────
		intervalRef.current = setInterval(() => {
			charIdx++;
			setDisplayed(quoteText.slice(0, charIdx));

			if (charIdx === quoteText.length) {
				clearInterval(intervalRef.current!);
				intervalRef.current = null;

				// ── 2. Author slides in ───────────────────────
				addTimer(300, () => {
					setPhase("author-in");

					// ── 3. Hold ───────────────────────────────
					addTimer(AUTHOR_SLIDE_MS + AUTHOR_HOLD, () => {
						setPhase("author-out");

						// ── 4. Author done sliding out ────────
						addTimer(AUTHOR_SLIDE_MS, () => {
							setPhase("erasing");

							// ── 5. Erase character by character
							let eraseLen = quoteText.length;
							intervalRef.current = setInterval(() => {
								eraseLen--;
								setDisplayed(quoteText.slice(0, eraseLen));

								if (eraseLen === 0) {
									clearInterval(intervalRef.current!);
									intervalRef.current = null;

									// ── 6. Fade & advance ────
									addTimer(150, () => {
										setPhase("fading");
										addTimer(FADE_MS, () => {
											setIndex((prev) => (prev + 1) % QUOTES.length);
										});
									});
								}
							}, ERASE_SPEED);
						});
					});
				});
			}
		}, TYPING_SPEED);

		return clearAll;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index, language]);

	const authorVisible =
		phase === "author-in" || phase === "holding" || phase === "author-out";
	const authorSlideOut =
		phase === "author-out" || phase === "erasing" || phase === "fading";

	const authorTransform = !authorVisible
		? "translateX(-20px)"
		: authorSlideOut
			? "translateX(-20px)"
			: "translateX(0)";

	return (
		<section
			className="mt-12 mb-4 relative overflow-hidden p-8"
			style={{
				background: "var(--v3-card)",
				border: "1px dashed var(--v3-card-border)",
				borderRadius: "var(--card-radius)",
			}}
		>
			{/* Whole-section fade */}
			<div
				className="relative"
				style={{
					opacity: phase === "fading" ? 0 : 1,
					transition: `opacity ${FADE_MS}ms ease`,
				}}
			>
				{/* Decorative open-quote */}
				<span className="absolute -top-6 -left-2 text-6xl text-accent/10 font-serif pointer-events-none select-none">
					&ldquo;
				</span>

				{/* Typewritten / erased text */}
				<p className="text-xl font-mono italic leading-relaxed text-foreground/85 min-h-14">
					&ldquo;{displayed}
					{/* cursor — always blinks */}
					<span
						className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle bg-accent"
						style={{ animation: "blink 0.8s step-start infinite" }}
					/>
					&rdquo;
				</p>

				{/* Author — slides left→right in, slides left←right out */}
				<p
					className="mt-4 flex items-center gap-2 text-sm font-mono text-muted uppercase tracking-widest select-none"
					style={{
						opacity: authorVisible && !authorSlideOut ? 1 : 0,
						transform: authorTransform,
						transition: `opacity ${AUTHOR_SLIDE_MS}ms ease, transform ${AUTHOR_SLIDE_MS}ms ease`,
					}}
				>
					<span className="h-px w-4 bg-muted/30" />
					{QUOTES[index].author}
				</p>
			</div>

			<style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
            `}</style>
		</section>
	);
}
