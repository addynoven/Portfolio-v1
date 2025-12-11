"use client";

import Lanyard from "@/components/reactbits/Components/Lanyard";
import ProfileCard from "@/components/reactbits/Components/ProfileCard";
import { cn } from "@/lib/utils";

const InteractiveBadge = ( { name, title, handle, status, contactText, avatarUrl, className }: { name: string, title: string, handle: string, status: string, contactText: string, avatarUrl: string, className?: string } ) => {
  return (
    <section className={cn("h-screen w-full relative overflow-hidden flex flex-col items-center justify-center", className)}>
      <div className="absolute top-10 z-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Interactive Badge</h2>
        <p className="text-white/60">Drag to play with physics</p>
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
