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
	autoMuted: boolean;
	playBlocked: boolean;
	volume: number;
	togglePlay: () => void;
	toggleMute: () => void;
	startMusic: () => void;
	setVolume: (v: number) => void;
	audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [autoMuted, setAutoMuted] = useState(false);
	const [playBlocked, setPlayBlocked] = useState(false);
	const [volume, setVolumeState] = useState(0.5);

	// Load user preferences from localStorage
	useEffect(() => {
		const savedMuted = localStorage.getItem("v3-music-muted");
		const savedVolume = localStorage.getItem("v3-music-volume");
		if (savedMuted === "true") {
			setIsMuted(true);
			if (audioRef.current) audioRef.current.muted = true;
		}
		if (savedVolume) {
			const v = parseFloat(savedVolume);
			if (!isNaN(v)) {
				setVolumeState(v);
				if (audioRef.current) audioRef.current.volume = v;
			}
		}
	}, []);

	const setVolume = useCallback((v: number) => {
		const clamped = Math.max(0, Math.min(1, v));
		setVolumeState(clamped);
		if (audioRef.current) audioRef.current.volume = clamped;
		localStorage.setItem("v3-music-volume", String(clamped));
	}, []);

	// Core play function — used internally by togglePlay and startMusic
	const playAudio = useCallback(
		async (forceUnmute = false) => {
			if (!audioRef.current) return false;

			// Always clear blocked state at the start of a play attempt
			setPlayBlocked(false);
			setAutoMuted(false);

			const shouldMute = forceUnmute ? false : isMuted;

			// Attempt 1: play with user's preferred mute state
			try {
				audioRef.current.muted = shouldMute;
				audioRef.current.volume = volume;
				await audioRef.current.play();
				setIsPlaying(true);
				setAutoMuted(false);
				setPlayBlocked(false);
				if (forceUnmute) {
					setIsMuted(false);
					localStorage.setItem("v3-music-muted", "false");
				}
				localStorage.setItem("v3-music-playing", "true");
				return true;
			} catch {
				// Attempt 2: muted autoplay fallback
				try {
					audioRef.current.muted = true;
					await audioRef.current.play();
					setIsPlaying(true);
					setAutoMuted(true);
					setPlayBlocked(false);
					localStorage.setItem("v3-music-playing", "true");
					return true;
				} catch (err2) {
					console.log(
						"Autoplay fully blocked:",
						err2 instanceof Error ? err2.message : String(err2),
					);
					setPlayBlocked(true);
					setIsPlaying(false);
					localStorage.setItem("v3-music-playing", "true");
					return false;
				}
			}
		},
		[isMuted, volume],
	);

	const startMusic = useCallback(() => {
		if (!isPlaying) void playAudio();
	}, [isPlaying, playAudio]);

	const togglePlay = useCallback(() => {
		if (!audioRef.current) return;

		// If playback was blocked, this click IS the user gesture we need
		if (playBlocked) {
			setPlayBlocked(false);
			void playAudio(true); // force unmute since user explicitly clicked
			return;
		}

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
			localStorage.setItem("v3-music-playing", "false");
		} else {
			void playAudio();
		}
	}, [isPlaying, playBlocked, playAudio]);

	const toggleMute = useCallback(() => {
		if (!audioRef.current) return;

		// If blocked, treat click as play gesture
		if (playBlocked) {
			setPlayBlocked(false);
			void playAudio(true);
			return;
		}

		// If music hasn't started, start it unmuted (user gesture)
		if (!isPlaying) {
			void playAudio(true);
			return;
		}

		// If auto-muted, clicking unmutes
		if (autoMuted) {
			audioRef.current.muted = false;
			setAutoMuted(false);
			setIsMuted(false);
			localStorage.setItem("v3-music-muted", "false");
			return;
		}

		const newMuted = !isMuted;
		audioRef.current.muted = newMuted;
		setIsMuted(newMuted);
		localStorage.setItem("v3-music-muted", String(newMuted));
	}, [isMuted, isPlaying, autoMuted, playBlocked, playAudio]);

	return (
		<MusicContext.Provider
			value={{
				isPlaying,
				isMuted,
				autoMuted,
				playBlocked,
				volume,
				togglePlay,
				toggleMute,
				startMusic,
				setVolume,
				audioRef,
			}}
		>
			<audio
				ref={audioRef}
				src="/v3/images/sound.mp3"
				loop
				preload="auto"
				onEnded={() => {
					setIsPlaying(false);
					localStorage.setItem("v3-music-playing", "false");
				}}
			/>
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
