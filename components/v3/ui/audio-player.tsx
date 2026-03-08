"use client";

import { useMusic } from "@/context/v3/music-context";

const BAR_HEIGHTS = [10, 16, 12, 18, 8, 14];

export default function AudioPlayer() {
	const { isPlaying, isMuted, togglePlay, toggleMute } = useMusic();

	const isActive = isPlaying && !isMuted;

	const handleClick = () => {
		if (!isPlaying) {
			togglePlay(); // start playing
		} else {
			toggleMute(); // mute/unmute
		}
	};

	const label = !isPlaying ? "PLAY" : isMuted ? "MUTED" : "PLAYING";
	const accent = "var(--accent, #00f5a0)";
	const dim = "color-mix(in srgb, var(--v3-fg, currentColor) 40%, transparent)";

	return (
		<button
			onClick={handleClick}
			className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-[5px] h-9 px-3.5 rounded-full backdrop-blur-xl border transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer select-none"
			style={{
				backgroundColor: isActive
					? "color-mix(in srgb, var(--accent, #00f5a0) 10%, var(--v3-card))"
					: "var(--v3-card)",
				borderColor: isActive
					? "color-mix(in srgb, var(--accent, #00f5a0) 40%, transparent)"
					: "var(--v3-card-border)",
				boxShadow: isActive
					? "0 0 20px color-mix(in srgb, var(--accent, #00f5a0) 20%, transparent), inset 0 0 8px color-mix(in srgb, var(--accent, #00f5a0) 5%, transparent)"
					: "var(--card-shadow)",
			}}
			aria-label={!isPlaying ? "Play music" : isMuted ? "Unmute" : "Mute"}
		>
			{/* Sound wave bars */}
			<div className="flex items-end justify-center gap-[2.5px] h-[14px]">
				{BAR_HEIGHTS.map((maxH, i) => (
					<span
						key={i}
						className="w-[2px] rounded-full transition-all duration-500"
						style={{
							backgroundColor: isActive ? accent : "color-mix(in srgb, var(--v3-fg, currentColor) 30%, transparent)",
							height: isActive ? undefined : "3px",
							opacity: isActive ? 1 : 0.5,
							animation: isActive
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
					backgroundColor: isActive ? accent : dim,
					opacity: isActive ? 0.6 : 0.25,
				}}
			/>

			{/* Label */}
			<span
				className="text-[10px] font-semibold tracking-[0.08em] transition-all duration-500 leading-none"
				style={{ color: isActive ? accent : dim }}
			>
				{label}
			</span>

			{/* Muted indicator */}
			{isPlaying && isMuted && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div
						className="w-6 h-[1px] rotate-45 rounded-full"
						style={{ backgroundColor: "rgba(255,100,100,0.6)" }}
					/>
				</div>
			)}
		</button>
	);
}
