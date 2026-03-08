"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMusic } from "@/context/v3/music-context";
import { useLanguage } from "@/context/v3/language-context";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";

/* ── Magnetic Wrapper Component ────────────────────────────────── */
function Magnetic({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent) => {
		const { clientX, clientY } = e;
		const { height, width, left, top } = ref.current!.getBoundingClientRect();
		const middleX = clientX - (left + width / 2);
		const middleY = clientY - (top + height / 2);
		setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
	};

	const reset = () => setPosition({ x: 0, y: 0 });

	const { x, y } = position;
	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={reset}
			animate={{ x, y }}
			transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
		>
			{children}
		</motion.div>
	);
}


const EnterScreen = () => {
	const router = useRouter();
	const [isEntering, setIsEntering] = useState(false);
	const [statusIndex, setStatusIndex] = useState(0);
	const { play } = useMusic();
	const { language } = useLanguage();

	const isJapanese = language === "jp";

	const STATUS_TEXTS = isJapanese
		? ["初期化中...", "アセットを読み込み中...", "システム準備完了", "ようこそ"]
		: ["Initializing...", "Loading Assets...", "System Ready", "Welcome"];

	const BUTTON_TEXT = isJapanese ? "体験を開始する" : "Enter Experience";
	const AUDIO_HINT = isJapanese ? "没入型オーディオが自動再生されます" : "Auto-plays immersive audio";
	const PORTFOLIO_TEXT = isJapanese ? "ポートフォリオ" : "Portfolio";

	// Mouse position for button glow
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const handleMouseMove = (e: React.MouseEvent) => {
		const { currentTarget, clientX, clientY } = e;
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setStatusIndex((prev) => (prev < STATUS_TEXTS.length - 1 ? prev + 1 : prev));
		}, 600);
		return () => clearInterval(timer);
	}, []);

	const handleEnter = () => {
		setIsEntering(true);
		play();
		setTimeout(() => {
			router.push("/v3");
		}, 600);
	};

	return (
		<div className="h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden transition-colors duration-1000">
			{/* ── Background animated gradient ── */}
			<div className="absolute inset-0 bg-gradient-to-br from-background via-foreground/[0.02] to-background opacity-80" />

			{/* ── Ambient Background Glows ── */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.05, 0.1, 0.05],
					}}
					transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
					className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]"
				/>
				<motion.div
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.03, 0.08, 0.03],
					}}
					transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
					className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
				/>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className={`relative z-10 flex flex-col items-center gap-10 transition-all duration-700 ${isEntering ? "scale-110 opacity-0 blur-md" : "scale-100 opacity-100"
					}`}
			>
				{/* ── Title ── */}
				<div className="text-center select-none">
					<motion.h1
						initial={{ letterSpacing: "0em" }}
						whileHover={{ letterSpacing: "0.05em" }}
						className="text-5xl md:text-7xl font-mono font-bold text-foreground mb-3 transition-all duration-500"
					>
						<span className="text-accent">{"<"}</span>
						{PORTFOLIO_TEXT}
						<span className="text-accent">{" />"}</span>
					</motion.h1>

					<div className="h-6 flex items-center justify-center">
						<AnimatePresence mode="wait">
							<motion.p
								key={statusIndex}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="text-muted-foreground font-mono text-xs md:text-sm tracking-[0.2em] uppercase"
							>
								{STATUS_TEXTS[statusIndex]}
							</motion.p>
						</AnimatePresence>
					</div>
				</div>

				{/* ── Enter button ── */}
				<Magnetic>
					<div className="relative group">
						{/* Animated Border Glow (Outer) */}
						<div className="absolute -inset-[1px] bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<button
							onClick={handleEnter}
							onMouseMove={handleMouseMove}
							disabled={isEntering}
							className="group relative px-10 py-5 font-mono text-xl text-foreground font-bold bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-accent/50 hover:shadow-accent/10 disabled:opacity-50"
						>
							{/* ── Mouse Tracking Glow (Internal) ── */}
							<motion.div
								className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								style={{
									background: useTransform(
										[mouseX, mouseY],
										([x, y]) => `radial-gradient(120px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 15%, transparent), transparent 80%)`
									)
								}}
							/>

							{/* ── Animated Shimmer Shine ── */}
							<motion.div
								animate={{
									left: ["-100%", "200%"],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
									repeatDelay: 2
								}}
								className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-accent/5 to-transparent skew-x-12 pointer-events-none"
							/>

							<span className="relative flex items-center gap-4">
								<motion.div
									animate={{
										scale: [1, 1.1, 1],
										opacity: [1, 0.8, 1],
									}}
									transition={{ duration: 2, repeat: Infinity }}
									className="flex items-center justify-center"
								>
									<svg
										className="w-6 h-6 text-accent"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
									</svg>
								</motion.div>
								<span className="tracking-tight group-hover:tracking-wider transition-all duration-500">
									{BUTTON_TEXT}
								</span>
							</span>
						</button>
					</div>
				</Magnetic>

				{/* ── Music hint ── */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					transition={{ delay: 1, duration: 1 }}
					className="text-muted-foreground text-xs font-mono flex flex-col items-center gap-3"
				>
					<div className="flex gap-1.5 h-4 items-end">
						{[0, 1, 2, 3, 4].map((i) => (
							<motion.span
								key={i}
								animate={{
									height: [4, 12, 4],
								}}
								transition={{
									duration: 0.8 + i * 0.1,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="w-0.5 bg-accent/40 rounded-full"
							/>
						))}
					</div>
					<p className="tracking-widest uppercase text-[10px]">
						{AUDIO_HINT}
					</p>
				</motion.div>
			</motion.div>

			{/* ── Final wipe transition ── */}
			<AnimatePresence>
				{isEntering && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-[100] bg-accent pointer-events-none"
						transition={{ duration: 0.6, ease: "easeInOut" }}
					>
						<motion.div
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							className="absolute inset-0 bg-background origin-left"
							transition={{ duration: 0.8, delay: 0.2, ease: [0.87, 0, 0.13, 1] }}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const Home = () => {
	return <EnterScreen />;
};

export default Home;
