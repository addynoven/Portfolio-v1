"use client";

import React from 'react';
import ProfileCard from '@/components/reactbits/Components/ProfileCard';
import Lanyard from '@/components/reactbits/Components/Lanyard';

export default function ProfileCardTestPage() {
  return (
    <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#111'
    }}>
      {/* Lanyard Background */}
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
      }}>
        <Lanyard 
            position={[0, 5, 20]} 
            gravity={[0, -20, 0]}
            // Match the ProfileCard to the 3D card
            cardScale={2.25}
            cardWidth={1.6}
            cardHeight={2.25}
            cardDepth={0.05}
            htmlScale={0.175}
            htmlWidth={380}
            htmlHeight={540}
            cardContent={
                <ProfileCard
                    name="Javi A. Torres"
                    title="Software Engineer"
                    handle="javicodes"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={true}
                    onContactClick={() => console.log('Contact clicked')}
                />
            }
        />
      </div>
    </div>
  );
}
