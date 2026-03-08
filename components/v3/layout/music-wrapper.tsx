"use client";

import { MusicProvider } from "@/context/v3/music-context";
import AudioPlayer from "@/components/v3/ui/audio-player";

export default function MusicWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<MusicProvider>
			{children}
			<AudioPlayer />
		</MusicProvider>
	);
}
