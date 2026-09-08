'use client';

import React from 'react';
import {
  FaCodeCommit,
  FaWandMagicSparkles,
  FaRegStar,
  FaRegNewspaper,
  FaMicrochip,
  FaArrowRight,
} from 'react-icons/fa6';

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  iconStyle: string;
  title: string;
  desc: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    icon: <FaCodeCommit className="text-[9px]" />,
    iconStyle: 'bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/30',
    title: 'Pushed to scheme-backend',
    desc: 'feat: audit remediation',
    time: '2h ago',
  },
  {
    id: '2',
    icon: <FaWandMagicSparkles className="text-[9px]" />,
    iconStyle: 'bg-[#00d8ff]/10 text-[#00d8ff] border-[#00d8ff]/30',
    title: 'Updated portfolio design',
    desc: 'enhance UI/UX and animations',
    time: '5h ago',
  },
  {
    id: '3',
    icon: <FaRegStar className="text-[9px]" />,
    iconStyle: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    title: 'Starred a repository',
    desc: 'vercel/next.js',
    time: '1d ago',
  },
  {
    id: '4',
    icon: <FaRegNewspaper className="text-[9px]" />,
    iconStyle: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
    title: 'Read a new article',
    desc: 'System Design for Beginners',
    time: '1d ago',
  },
  {
    id: '5',
    icon: <FaMicrochip className="text-[9px]" />,
    iconStyle: 'bg-purple-400/10 text-purple-400 border-purple-400/30',
    title: 'Exploring AI integrations',
    desc: 'RAG, LLMs, and beyond',
    time: '2d ago',
  },
];

export const RecentActivityCard: React.FC = () => {
  return (
    <section
      className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-3.5 backdrop-blur-md flex flex-col justify-between shadow-lg group hover:border-[#1e3f34] transition-colors"
      data-purpose="recent-activity-card"
    >
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
          // RECENT ACTIVITY
        </span>
        <div className="flex items-center gap-1.5 text-[9px] font-medium text-[#00FF87]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-ping" />
          <span>Live</span>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex flex-col gap-1.5 my-1">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-4.5 h-4.5 p-1 rounded-md border flex items-center justify-center shrink-0 ${item.iconStyle}`}
              >
                {item.icon}
              </span>
              <div className="truncate">
                <p className="text-[9px] font-bold text-white leading-none truncate">
                  {item.title}
                </p>
                <p className="text-[7.5px] text-[#697d7a] mt-0.5 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
            <span className="text-[8px] font-mono text-[#546865] shrink-0 ml-2">
              {item.time}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <a
        href="https://github.com/addynoven"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-1 rounded-lg bg-[#091110] border border-[#152622] hover:border-[#1e3f34] text-[9px] font-medium text-[#c0d3d0] hover:text-white flex items-center justify-center gap-1.5 transition mt-1"
      >
        <span>View all activity</span>
        <FaArrowRight className="text-[7px]" />
      </a>
    </section>
  );
};
