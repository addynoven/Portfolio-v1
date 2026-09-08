"use client";

import React, {
	createContext,
	useContext,
	useRef,
	useState,
	useCallback,
	useEffect,
} from "react";
import { usePathname } from "next/navigation";

interface MusicContextType {
	isPlaying: boolean;
	isMuted: boolean;
	play: () => void;
	pause: () => void;
	toggleMute: () => void;
	togglePlay: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const pathname = usePathname();
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (pathname && !pathname.startsWith("/v3")) {
			const audio = audioRef.current;
			if (audio && !audio.paused) {
				audio.pause();
				setIsPlaying(false);
			}
		}
	}, [pathname]);

	const play = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.muted = false;
		audio.volume = 0.5;
		audio
			.play()
			.then(() => {
				setIsPlaying(true);
				setIsMuted(false);
			})
			.catch(() => {
				// Autoplay blocked — silently ignore, user must click again
			});
	}, []);

	const pause = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.pause();
		setIsPlaying(false);
	}, []);

	const togglePlay = useCallback(() => {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	}, [isPlaying, play, pause]);

	const toggleMute = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const next = !isMuted;
		audio.muted = next;
		setIsMuted(next);
	}, [isMuted]);

	return (
		<MusicContext.Provider
			value={{ isPlaying, isMuted, play, pause, toggleMute, togglePlay }}
		>
			{mounted && (
				<audio
					ref={audioRef}
					src="/v3/images/sound.mp3"
					loop
					preload="none"
					onEnded={() => setIsPlaying(false)}
					suppressHydrationWarning
				/>
			)}
			{children}
		</MusicContext.Provider>
	);
};

export const useMusic = () => {
	const context = useContext(MusicContext);
	if (context === undefined) {
		throw new Error("useMusic must be used within a MusicProvider");
	}
	return context;
};
