import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import NowPlaying from "./NowPlaying";
import Discord from "../modals/Discord.jsx";
import Song from "../modals/Song.jsx";
import Commit from "../modals/Commit.jsx";
import Card from "./ui/Card.jsx";

const Activity = ({ onekoEnabled, setOnekoEnabled }) => {
  const [activity, setActivity] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [lastCommit, setLastCommit] = useState(null);
  const [showDiscord, setShowDiscord] = useState(false);
  const [showSong, setShowSong] = useState(false);
  const [showCommit, setShowCommit] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const hours = istTime.getHours().toString().padStart(2, "0");
      const minutes = istTime.getMinutes().toString().padStart(2, "0");
      const seconds = istTime.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const fetchGitHubData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GITSTATUS_URL);
        const data = response.data;
        if (data && data.length > 0) {
          setLastCommit({
            message: data[0].commit.message,
            date: new Date(data[0].commit.author.date).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            sha: data[0].sha.substring(0, 7),
          });
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGitHubData();

    const fetchActivity = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_STATUS_URL);
        const data = response.data;

        if (data.success) {
          const userData = data.data;

          const otherActivities = userData.activities?.filter(
            (act) => act.type !== 2
          );

          setActivity({
            status: userData.discord_status,
            activities: otherActivities || [],
            customStatus: userData.activities?.find((act) => act.type === 4),
          });
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  useGSAP(() => {
    gsap.from(".activity-card", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#00f050";
      case "idle":
        return "#ffa500";
      case "dnd":
        return "#ff0000";
      default:
        return "#808080";
    }
  };

  const getActivityIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (
      lowerName.includes("visual studio code") ||
      lowerName.includes("vscode")
    ) {
      return "💻";
    }
    if (lowerName.includes("spotify")) {
      return "🎵";
    }
    if (lowerName.includes("youtube")) {
      return "📺";
    }
    return "🎮";
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card clickable onClick={() => setShowDiscord(true)}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
                👤
              </div>
              {activity?.status && (
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#141414]"
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                ></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#c8c8c8]/60 text-xs font-[font2]">
                Discord
              </div>
              <div className="text-white text-sm font-[font1]">
                {activity?.status === "online"
                  ? "Online"
                  : activity?.status === "idle"
                  ? "Away"
                  : activity?.status === "dnd"
                  ? "Do Not Disturb"
                  : "Offline"}
              </div>
              {activity?.customStatus?.state && (
                <div className="text-[#c8c8c8]/50 text-xs truncate flex items-center gap-1">
                  {activity.customStatus.emoji && (
                    <span>{activity.customStatus.emoji.name}</span>
                  )}
                  {activity.customStatus.state}
                </div>
              )}
            </div>
          </Card>

          <Card clickable onClick={() => setShowSong(true)}>
            <NowPlaying />
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
              🕐
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#c8c8c8]/60 text-xs font-[font2]">
                Local Time (IST)
              </div>
              <div className="text-white text-lg font-[font1] tabular-nums tracking-wide">
                {currentTime}
              </div>
            </div>
          </Card>

          <Card>
            {activity?.activities &&
            activity.activities.filter((a) => a.type !== 4).length > 0 ? (
              <>
                {activity.activities.filter((a) => a.type !== 4)[0].assets
                  ?.large_image ? (
                  <img
                    src={
                      activity.activities
                        .filter((a) => a.type !== 4)[0]
                        .assets.large_image.startsWith("mp:")
                        ? activity.activities
                            .filter((a) => a.type !== 4)[0]
                            .assets.large_image.replace(
                              "mp:",
                              "https://media.discordapp.net/"
                            )
                        : `https://cdn.discordapp.com/app-assets/${
                            activity.activities.filter((a) => a.type !== 4)[0]
                              .application_id
                          }/${
                            activity.activities.filter((a) => a.type !== 4)[0]
                              .assets.large_image
                          }.png`
                    }
                    alt={
                      activity.activities.filter((a) => a.type !== 4)[0].name
                    }
                    className="w-10 h-10 rounded-lg"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
                    {getActivityIcon(
                      activity.activities.filter((a) => a.type !== 4)[0].name
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-[#c8c8c8]/60 text-xs font-[font2]">
                    {activity.activities.filter((a) => a.type !== 4)[0].type ===
                    0
                      ? "Playing"
                      : "Using"}
                  </div>
                  <div className="text-white text-sm font-[font1] truncate">
                    {activity.activities.filter((a) => a.type !== 4)[0].name}
                  </div>
                  {activity.activities.filter((a) => a.type !== 4)[0]
                    .details && (
                    <div className="text-[#c8c8c8]/50 text-xs truncate">
                      {
                        activity.activities.filter((a) => a.type !== 4)[0]
                          .details
                      }
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
                  💻
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#c8c8c8]/60 text-xs font-[font2]">
                    Activity
                  </div>
                  <div className="text-[#c8c8c8]/40 text-sm">Not active</div>
                </div>
              </>
            )}
          </Card>

          <Card clickable onClick={() => setShowCommit(true)}>
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
              📝
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#c8c8c8]/60 text-xs font-[font2]">
                Last Commit
              </div>
              {lastCommit ? (
                <>
                  <div className="text-white text-sm font-[font1] truncate">
                    {lastCommit.message}
                  </div>
                  <div className="text-[#4ade80] text-xs font-mono">
                    {lastCommit.sha}
                  </div>
                </>
              ) : (
                <div className="text-[#c8c8c8]/40 text-sm">Loading...</div>
              )}
            </div>
          </Card>

          <Card className="justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xl">
                🐱
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[#c8c8c8]/60 text-xs font-[font2]">
                  Oneko Cat
                </div>
                <div className="text-white text-sm font-[font1]">
                  {onekoEnabled ? "Following your cursor" : "Taking a nap"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOnekoEnabled(!onekoEnabled)}
              className={`
                relative w-12 h-6 rounded-full transition-colors duration-200
                ${
                  onekoEnabled
                    ? "bg-[#4ade80]"
                    : "bg-[#1a1a1a] border border-[#c8c8c8]/20"
                }
              `}
            >
              <div
                className={`
                  absolute top-1 w-4 h-4 rounded-full bg-white shadow-md
                  transition-transform duration-200
                  ${onekoEnabled ? "translate-x-7" : "translate-x-1"}
                `}
              />
            </button>
          </Card>
        </div>
      </div>

      {showDiscord && <Discord onClose={() => setShowDiscord(false)} />}
      {showSong && <Song onClose={() => setShowSong(false)} />}
      {showCommit && <Commit onClose={() => setShowCommit(false)} />}
    </>
  );
};

export default Activity;
