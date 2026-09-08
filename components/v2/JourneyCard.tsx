'use client';

import React from 'react';

interface JourneyItem {
  year: string;
  title: string;
  desc: string;
  isCurrent?: boolean;
}

const journeyData: JourneyItem[] = [
  {
    year: 'Present',
    title: 'Full-Stack Engineer',
    desc: 'Building cool stuff 🚀',
    isCurrent: true,
  },
  {
    year: '2024',
    title: 'Final Year MCA',
    desc: 'Specializing modern web & AI',
  },
  {
    year: '2023',
    title: 'Open Source Contributor',
    desc: '30+ repositories',
  },
  {
    year: '2022',
    title: 'Started the Journey',
    desc: 'From ideas to reality',
  },
];

export const JourneyCard: React.FC = () => {
  return (
    <section
      className="col-span-12 sm:col-span-6 lg:col-span-2 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-3.5 backdrop-blur-md flex flex-col justify-between shadow-lg group hover:border-[#1e3f34] transition-colors"
      data-purpose="journey-card"
    >
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
          // JOURNEY
        </span>
      </div>

      {/* Vertical Timeline with Glowing Nodes */}
      <div className="relative pl-4 flex flex-col gap-2 my-1">
        <div className="absolute left-[5px] top-1.5 bottom-1.5 w-[2px] bg-[#1a3830]" />

        {journeyData.map((item, idx) => (
          <div key={idx} className="relative">
            {item.isCurrent ? (
              <>
                <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-[#00FF87] ring-4 ring-[#080d0d] glow-green-sm" />
                <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-[#0f2820] text-[#00FF87] font-bold">
                  {item.year}
                </span>
              </>
            ) : (
              <>
                <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-[#2a453e] ring-4 ring-[#080d0d]" />
                <span className="text-[7.5px] font-mono text-[#718784]">
                  {item.year}
                </span>
              </>
            )}
            <p className="text-[9.5px] font-bold text-white leading-snug mt-0.5">
              {item.title}
            </p>
            <p className="text-[7.5px] text-[#718784]">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-1 border-t border-[#121f1c] text-center">
        <p className="text-[9px] italic text-[#8ca09d]">“Progress over perfection.”</p>
      </div>
    </section>
  );
};
