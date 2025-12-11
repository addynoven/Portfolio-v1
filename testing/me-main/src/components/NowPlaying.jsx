import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrack = async () => {
    try {
      const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
      const username = import.meta.env.VITE_LASTFM_USERNAME;
      
      if (!apiKey || !username) {
        console.error('Last.fm API key or username not configured');
        setLoading(false);
        return;
      }

      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      const t = data.recenttracks?.track?.[0];

      if (t) {
        setTrack({
          nowPlaying: t['@attr']?.nowplaying === "true",
          name: t.name,
          artist: t.artist["#text"],
          album: t.album["#text"],
          image: t.image?.[2]?.["#text"] || '',
          url: t.url
        });
      }
    } catch (err) {
      console.error('Error fetching Last.fm data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrack();
    const interval = setInterval(fetchTrack, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl animate-pulse">
          🎵
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[#c8c8c8]/60 text-xs font-[font2]">Music</div>
          <div className="text-[#c8c8c8]/40 text-sm">Loading...</div>
        </div>
      </>
    );
  }

  if (!track) {
    return (
      <>
        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
          🎵
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[#c8c8c8]/60 text-xs font-[font2]">Music</div>
          <div className="text-[#c8c8c8]/40 text-sm">Not available</div>
        </div>
      </>
    );
  }

  return (
    <>
      {track.image ? (
        <img 
          src={track.image} 
          alt={`${track.name} album cover`}
          loading="lazy"
          width="40"
          height="40"
          className="w-10 h-10 rounded-lg shrink-0" 
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
          🎵
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[#c8c8c8]/60 text-xs font-[font2] flex items-center gap-1">
          {track.nowPlaying && <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse"></span>}
          {track.nowPlaying ? "Now Playing" : "Last Played"}
        </div>
        <div className="text-white text-sm font-[font1] truncate group-hover:text-[#4ade80] transition-colors">
          {track.name}
        </div>
        <div className="text-[#c8c8c8]/50 text-xs truncate">{track.artist}</div>
      </div>
    </>
  );
}
