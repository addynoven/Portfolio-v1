"use client";

import { GitHubCalendar } from "react-github-calendar";

interface GitHubContributionsProps {
  username?: string;
}

const GitHubContributions = ({ username = "addynoven" }: GitHubContributionsProps) => {
  // Custom theme matching the UserAccent color
  const customTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="w-full overflow-x-auto">
      <GitHubCalendar
        username={username}
        colorScheme="dark"
        theme={customTheme}
        fontSize={15}
        blockSize={17}
        blockMargin={4}
      />
    </div>
  );
};

export default GitHubContributions;
