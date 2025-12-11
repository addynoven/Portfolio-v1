import React, { useState, useEffect, useRef } from 'react'

const ScrollPosition = ({ locomotiveScroll }) => {
    const [height, setHeight] = useState(0);
    const targetHeight = useRef(0);
    const animationRef = useRef(null);

    useEffect(() => {
      if (!locomotiveScroll) return;

      const lerp = (start, end, factor) => start + (end - start) * factor;

      const animate = () => {
        setHeight(prev => {
          const newHeight = lerp(prev, targetHeight.current, 0.12);
          if (Math.abs(newHeight - targetHeight.current) < 0.1) {
            return targetHeight.current;
          }
          return newHeight;
        });
        animationRef.current = requestAnimationFrame(animate);
      };

      const updateProgress = (obj) => {
        const scrollProgress = (obj.scroll.y / obj.limit.y) * 100;
        targetHeight.current = Math.min(Math.max(scrollProgress, 0), 100);
      };

      locomotiveScroll.on('scroll', updateProgress);
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        locomotiveScroll.off('scroll', updateProgress);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [locomotiveScroll]);

  return (
    <div className='fixed w-1.5 h-28 rounded-full top-1/2 -translate-y-1/2 right-6 bg-[#1a1a1a] z-10 overflow-hidden border border-[#2a2a2a]'>
        <div 
          className='bg-gradient-to-b from-[#4ade80] to-[#22c55e] w-full rounded-full shadow-[0_0_10px_rgba(74,222,128,0.4)]' 
          style={{ 
            height: `${height}%`,
            willChange: 'height'
          }}
        />
    </div>
  )
}

export default ScrollPosition