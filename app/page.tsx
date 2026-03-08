"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMusic } from "@/context/v3/music-context";

const EnterScreen = () => {
	const router = useRouter();
	const [isEntering, setIsEntering] = useState(false);
	const { play } = useMusic();

	const handleEnter = () => {
		setIsEntering(true);
		// Play immediately — this is inside a click handler (user gesture),
		// so the browser allows it. The <audio> element lives in root layout
		// and persists across route changes, so music keeps playing on /v3.
		play();
		setTimeout(() => {
			router.push("/v3");
		}, 500);
	};

	return (
		<div className="h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden transition-colors duration-500">
			{/* Background animated gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-background via-foreground/5 to-background opacity-80" />

			{/* Animated circles in background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "0.5s" }}
				/>
			</div>

			<div
				className={`relative z-10 flex flex-col items-center gap-8 transition-all duration-500 ${isEntering ? "scale-110 opacity-0" : "scale-100 opacity-100"}`}
			>
				{/* Title */}
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-mono font-bold text-foreground mb-2">
						<span className="text-accent">{"<"}</span>
						Portfolio
						<span className="text-accent">{" />"}</span>
					</h1>
					<p className="text-muted-foreground font-mono text-sm md:text-base animate-pulse">
						Initializing V3...
					</p>
				</div>

				{/* Enter button */}
				<button
					onClick={handleEnter}
					disabled={isEntering}
					className="group relative px-8 py-4 font-mono text-lg text-foreground bg-transparent border-2 border-accent/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
				>
					{/* Button background animation */}
					<span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

					<span className="relative flex items-center gap-3">
						{/* Play icon */}
						<svg
							className="w-5 h-5 text-accent group-hover:scale-110 transition-transform"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
						</svg>
						Enter Experience
					</span>
				</button>

				{/* Music hint */}
				<p className="text-muted-foreground text-xs font-mono flex items-center gap-2">
					<span className="flex gap-0.5">
						{[1, 2, 3].map((bar) => (
							<span
								key={bar}
								className="w-0.5 bg-accent/50 rounded-full animate-pulse"
								style={{
									height: `${4 + bar * 3}px`,
									animationDelay: `${bar * 0.15}s`,
								}}
							/>
						))}
					</span>
					Click to enter with music
				</p>
			</div>
		</div>
	);
};

const Home = () => {
	return <EnterScreen />;
};

export default Home;
