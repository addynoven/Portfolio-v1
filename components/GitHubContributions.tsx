"use client";

import { GitHubCalendar } from "react-github-calendar";
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

  // Custom theme matching the UserAccent color
  const customTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  };

  // During SSR or before mount, use dark theme as default
  const colorScheme = mounted ? (resolvedTheme === "light" ? "light" : "dark") : "dark";

  return (
    <div className="w-full overflow-x-auto">
      <GitHubCalendar
        username={username}
        colorScheme={colorScheme}
        theme={customTheme}
        fontSize={15}
        blockSize={17}
        blockMargin={4}
      />
    </div>
  );
};

export default GitHubContributions;

