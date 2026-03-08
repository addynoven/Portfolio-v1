"use client";

import { MusicProvider, useMusic } from "@/context/v3/music-context";
import AudioPlayer from "@/components/v3/ui/audio-player";
import { useEffect, useRef } from "react";

// Component that handles auto-starting music on enter or page reload
function MusicAutoStarter({ children }: { children: React.ReactNode }) {
	const { startMusic, isPlaying } = useMusic();
	const hasAttempted = useRef(false);

	useEffect(() => {
		if (hasAttempted.current || isPlaying) return;
		hasAttempted.current = true;

		// Check if user came from the enter screen
		const fromEnterScreen = sessionStorage.getItem("v3-should-play-music");
		// Check if music was previously playing (e.g. page reload)
		const wasPlaying = localStorage.getItem("v3-music-playing");

		if (fromEnterScreen === "true" || wasPlaying === "true") {
			const timer = setTimeout(() => {
				startMusic();
				sessionStorage.removeItem("v3-should-play-music");
			}, 150);
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
