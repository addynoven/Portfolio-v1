"use client";

interface GitHubContributionsProps {
  username?: string;
}

const GitHubContributions = ({ username = "addynoven" }: GitHubContributionsProps) => {
  return (
    <div className="w-full">
      <picture className="w-full">
        <source 
          media="(prefers-color-scheme: dark)" 
          srcSet={`https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph-dark.svg`} 
        />
        <source 
          media="(prefers-color-scheme: light)" 
          srcSet={`https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph.svg`} 
        />
        <img 
          alt="Pac-Man contribution graph" 
          src={`https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph.svg`}
          className="w-full h-auto rounded-lg shadow-sm"
          loading="lazy"
        />
      </picture>
    </div>
  );
};

export default GitHubContributions;

