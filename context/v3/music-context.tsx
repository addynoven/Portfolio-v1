"use client";

import React, {
	createContext,
	useContext,
	useRef,
	useState,
	useEffect,
	useCallback,
} from "react";

interface MusicContextType {
	isPlaying: boolean;
	isMuted: boolean;
	togglePlay: () => void;
	toggleMute: () => void;
	startMusic: () => void;
	audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);

	// Load user's mute preference from localStorage
	useEffect(() => {
		const savedMuted = localStorage.getItem("v3-music-muted");
		if (savedMuted === "true") {
			setIsMuted(true);
			if (audioRef.current) {
				audioRef.current.muted = true;
			}
		}
	}, []);

	const startMusic = useCallback(() => {
		if (audioRef.current && !isPlaying) {
			audioRef.current.muted = isMuted;
			audioRef.current
				.play()
				.then(() => {
					setIsPlaying(true);
				})
				.catch((err) => {
					console.log("Audio play failed:", err);
				});
		}
	}, [isPlaying, isMuted]);

	const togglePlay = useCallback(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current
					.play()
					.then(() => {
						setIsPlaying(true);
					})
					.catch((err) => {
						console.log("Audio play failed:", err);
					});
			}
		}
	}, [isPlaying]);

	const toggleMute = useCallback(() => {
		if (audioRef.current) {
			const newMuted = !isMuted;
			audioRef.current.muted = newMuted;
			setIsMuted(newMuted);
			localStorage.setItem("v3-music-muted", String(newMuted));
		}
	}, [isMuted]);

	return (
		<MusicContext.Provider
			value={{
				isPlaying,
				isMuted,
				togglePlay,
				toggleMute,
				startMusic,
				audioRef,
			}}
		>
			{/* Hidden audio element - plays background music */}
			<audio ref={audioRef} src="/v3/images/sound.mp3" loop preload="auto" />
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
