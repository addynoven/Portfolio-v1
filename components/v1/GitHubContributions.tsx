import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface GitHubContributionsProps {
  username?: string;
}

const GitHubContributions = ({ username = "addynoven" }: GitHubContributionsProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";
  const src = isDark
    ? `https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph-dark.svg`
    : `https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph.svg`;

  return (
    <div className="w-full">
      <img 
        alt="Pac-Man contribution graph" 
        src={src}
        className="w-full h-auto rounded-lg shadow-sm transition-opacity duration-500"
        loading="lazy"
      />
    </div>
  );
};

export default GitHubContributions;

