"use client";

import { useMusic } from "@/context/v3/music-context";
import { useState, useEffect } from "react";

const BAR_HEIGHTS = [10, 16, 12, 18, 8, 14]; // 6 bars for richer look

export default function AudioPlayer() {
	const {
		isPlaying,
		isMuted,
		autoMuted,
		playBlocked,
		toggleMute,
		togglePlay,
	} = useMusic();

	const showWave = isPlaying && !isMuted && !autoMuted;
	const isIdle = !isPlaying && !playBlocked;

	// Pulse animation for blocked state
	const [pulse, setPulse] = useState(false);
	useEffect(() => {
		if (!playBlocked) {
			setPulse(false);
			return;
		}
		const interval = setInterval(() => setPulse((p) => !p), 1500);
		return () => clearInterval(interval);
	}, [playBlocked]);

	// Single click handler that routes to the right action
	const handleClick = () => {
		if (playBlocked || !isPlaying) {
			togglePlay();
		} else {
			toggleMute();
		}
	};

	// Derive label
	const label = playBlocked
		? "RESUME"
		: isMuted || autoMuted
			? "MUTED"
			: showWave
				? "PLAYING"
				: "PLAY";

	// Derive accent color for different states
	const accentActive = "var(--accent, #00f5a0)";
	const accentDim = "rgba(255,255,255,0.4)";
	const accentColor = showWave ? accentActive : accentDim;

	return (
		<button
			onClick={handleClick}
			className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-[5px] h-9 px-3.5 rounded-full backdrop-blur-xl border transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer select-none"
			style={{
				backgroundColor: showWave
					? "color-mix(in srgb, var(--accent, #00f5a0) 8%, rgba(13,17,23,0.85))"
					: playBlocked
						? "rgba(13,17,23,0.9)"
						: "rgba(13,17,23,0.75)",
				borderColor: showWave
					? "color-mix(in srgb, var(--accent, #00f5a0) 40%, transparent)"
					: playBlocked
						? pulse
							? "color-mix(in srgb, var(--accent, #00f5a0) 50%, transparent)"
							: "rgba(255,255,255,0.12)"
						: "rgba(255,255,255,0.08)",
				boxShadow: showWave
					? "0 0 20px color-mix(in srgb, var(--accent, #00f5a0) 20%, transparent), inset 0 0 8px color-mix(in srgb, var(--accent, #00f5a0) 5%, transparent)"
					: playBlocked && pulse
						? "0 0 12px color-mix(in srgb, var(--accent, #00f5a0) 15%, transparent)"
						: "0 1px 8px rgba(0,0,0,0.25)",
			}}
			aria-label={
				playBlocked
					? "Resume music"
					: isMuted
						? "Unmute music"
						: isIdle
							? "Play music"
							: "Mute music"
			}
		>
			{/* Sound wave bars */}
			<div className="flex items-end justify-center gap-[2.5px] h-[14px]">
				{BAR_HEIGHTS.map((maxH, i) => (
					<span
						key={i}
						className="w-[2px] rounded-full transition-all duration-500"
						style={{
							backgroundColor: showWave
								? accentActive
								: playBlocked
									? pulse
										? accentActive
										: "rgba(255,255,255,0.3)"
									: "rgba(255,255,255,0.3)",
							height: showWave ? undefined : playBlocked ? "4px" : "3px",
							opacity: showWave ? 1 : playBlocked ? (pulse ? 0.8 : 0.4) : 0.5,
							animation: showWave
								? `sound-wave ${0.35 + i * 0.07}s ease-in-out ${i * 0.08}s infinite alternate`
								: "none",
							// @ts-expect-error CSS custom property
							"--bar-max": `${maxH}px`,
						}}
					/>
				))}
			</div>

			{/* Separator dot */}
			<span
				className="w-[3px] h-[3px] rounded-full transition-all duration-500"
				style={{
					backgroundColor: accentColor,
					opacity: showWave ? 0.6 : 0.25,
				}}
			/>

			{/* Label */}
			<span
				className="text-[10px] font-semibold tracking-[0.08em] transition-all duration-500 leading-none"
				style={{
					color: showWave
						? accentActive
						: playBlocked && pulse
							? accentActive
							: accentDim,
				}}
			>
				{label}
			</span>

			{/* Muted indicator — subtle line */}
			{(isMuted || autoMuted) && !playBlocked && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div
						className="w-6 h-[1px] rotate-45 rounded-full"
						style={{
							backgroundColor: "rgba(255,100,100,0.5)",
						}}
					/>
				</div>
			)}
		</button>
	);
}
