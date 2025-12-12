"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: {
    username: string;
    display_name: string;
    avatar: string;
    id: string;
  };
  activities: Array<{
    name: string;
    type: number;
    state?: string;
    details?: string;
    application_id?: string;
    timestamps?: {
      start?: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }>;
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: {
      start: number;
      end: number;
    };
  };
}

interface DiscordStatusProps {
  discordId?: string;
  compact?: boolean;
}

const statusColors: Record<string, string> = {
  online: "#3ba55d",
  idle: "#faa81a",
  dnd: "#ed4245",
  offline: "#747f8d",
};

const statusLabels: Record<string, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

const DiscordStatus = ({ 
  discordId = "412114638289895435", 
  compact = false 
}: DiscordStatusProps) => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json = await res.json();
        
        if (json.success) {
          setData(json.data);
        } else {
          setError("Failed to fetch Discord status");
        }
      } catch {
        setError("Could not connect to Lanyard API");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Refresh every 60s

    return () => clearInterval(interval);
  }, [discordId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-600 dark:text-white/60">
        <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-white/20 animate-pulse" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center gap-2 text-slate-500 dark:text-white/40">
        <div className="w-3 h-3 rounded-full bg-gray-500" />
        <span className="text-sm">Discord status unavailable</span>
      </div>
    );
  }

  const status = data.discord_status;
  const activity = data.activities.find((a) => a.type !== 4); // Exclude custom status
  const customStatus = data.activities.find((a) => a.type === 4);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: statusColors[status] }}
          animate={status === "online" ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <span className="text-sm text-slate-700 dark:text-white/80">{statusLabels[status]}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Status Header */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.webp?size=64`}
            alt={data.discord_user.display_name || data.discord_user.username}
            className="w-12 h-12 rounded-full"
          />
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-100 dark:border-slate-900"
            style={{ backgroundColor: statusColors[status] }}
            animate={status === "online" ? { scale: [1, 1.15, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-white">
            {data.discord_user.display_name || data.discord_user.username}
          </span>
          <span className="text-sm text-slate-600 dark:text-white/60">{statusLabels[status]}</span>
        </div>
      </div>

      {/* Spotify */}
      {data.listening_to_spotify && data.spotify && (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1DB954]/10 border border-[#1DB954]/20">
          <img
            src={data.spotify.album_art_url}
            alt={data.spotify.album}
            className="w-10 h-10 rounded"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {data.spotify.song}
            </span>
            <span className="text-xs text-slate-600 dark:text-white/60 truncate">
              by {data.spotify.artist}
            </span>
          </div>
          <svg className="w-5 h-5 text-[#1DB954] ml-auto flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
      )}

      {/* Activity */}
      {activity && !data.listening_to_spotify && (
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-white/70">
          <span className="text-slate-500 dark:text-white/40">Playing</span>
          <span className="font-medium text-slate-900 dark:text-white">{activity.name}</span>
        </div>
      )}

      {/* Custom Status */}
      {customStatus?.state && (
        <div className="text-sm text-slate-600 dark:text-white/60 italic">
          "{customStatus.state}"
        </div>
      )}
    </div>
  );
};

export default DiscordStatus;
