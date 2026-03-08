"use client";

import { MusicProvider, useMusic } from "@/context/v3/music-context";
import AudioPlayer from "@/components/v3/ui/audio-player";
import { useEffect } from "react";

// Component that handles auto-starting music based on sessionStorage flag
function MusicAutoStarter({ children }: { children: React.ReactNode }) {
	const { startMusic, isPlaying } = useMusic();

	useEffect(() => {
		// Check if user came from the enter screen
		const shouldPlayMusic = sessionStorage.getItem("v3-should-play-music");
		if (shouldPlayMusic === "true" && !isPlaying) {
			// Small delay to ensure audio element is ready
			const timer = setTimeout(() => {
				startMusic();
				sessionStorage.removeItem("v3-should-play-music");
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [startMusic, isPlaying]);

	return <>{children}</>;
}

export default function MusicWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<MusicProvider>
			<MusicAutoStarter>
				{children}
				<AudioPlayer />
			</MusicAutoStarter>
		</MusicProvider>
	);
}
