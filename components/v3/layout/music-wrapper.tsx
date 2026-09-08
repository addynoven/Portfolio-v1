"use client";

import { MusicProvider } from "@/context/v3/music-context";

export default function MusicWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MusicProvider>{children}</MusicProvider>;
}

