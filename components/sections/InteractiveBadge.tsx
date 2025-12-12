"use client";

import Lanyard from "@/components/reactbits/Components/Lanyard";
import ProfileCard from "@/components/reactbits/Components/ProfileCard";
import { cn } from "@/lib/utils";

const InteractiveBadge = ( { name, title, handle, status, contactText, avatarUrl, className }: { name: string, title: string, handle: string, status: string, contactText: string, avatarUrl: string, className?: string } ) => {
  return (
    <section className={cn("h-screen w-full relative overflow-hidden flex flex-col items-center justify-center dark:bg-gradient-to-b from-transparent to-black/5", className)}>
      {/* Premium Header */}
      <div className="absolute top-8 z-10 text-center">
        <div className="relative px-8 py-5 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
          {/* Glow effect behind */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-UserAccent/20 via-transparent to-UserAccent/20 blur-xl -z-10" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Interactive <span className="text-UserAccent">Badge</span>
          </h2>
          <p className="text-sm md:text-base text-white/60 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-UserAccent animate-pulse" />
            Drag to play with physics
          </p>
        </div>
      </div>
      <Lanyard 
        position={[0, 0, 20]} 
        gravity={[0, -20, 0]}
        cardScale={2.25}
        cardWidth={1.6}
        cardHeight={2.25}
        cardDepth={0.05}
        htmlScale={0.16}
        htmlWidth={380}
        stringLength={2}
        htmlHeight={540}
        cardContent={
          <ProfileCard
            name={name}
            title={title}
            handle={handle}
            status={status}
            contactText={contactText}
            avatarUrl={avatarUrl}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        }
      />
    </section>
  );
};

export default InteractiveBadge;
