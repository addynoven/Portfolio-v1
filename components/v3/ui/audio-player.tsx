"use client";

import { useMusic } from "@/context/v3/music-context";

export default function AudioPlayer() {
	const { isPlaying, isMuted, toggleMute } = useMusic();

	// Show wave animation when playing and not muted
	const showAnimation = isPlaying && !isMuted;

	return (
		<button
			onClick={toggleMute}
			className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-1.5 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 shadow-lg hover:bg-foreground/5 transition-all duration-300 group"
			aria-label={isMuted ? "Unmute music" : "Mute music"}
			title={isMuted ? "Click to unmute" : "Click to mute"}
		>
			<div className="flex items-center justify-center gap-0.5 h-5">
				{[1, 2, 3, 4, 5].map((bar) => (
					<span
						key={bar}
						className={`w-1 bg-accent rounded-full transition-all duration-300 ${
							showAnimation ? "animate-sound-wave" : "h-1 opacity-40"
						}`}
						style={{
							animationDelay: showAnimation ? `${bar * 0.1}s` : "0s",
							height: showAnimation ? undefined : "4px",
						}}
					/>
				))}
			</div>
			{/* Muted indicator overlay */}
			{isMuted && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-8 h-0.5 bg-red-500/60 rotate-45 rounded-full" />
				</div>
			)}
		</button>
	);
}
