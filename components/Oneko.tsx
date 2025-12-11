"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useCat } from "./CatContext";
import SpeechBubble from "./SpeechBubble";

// Heart particles for petting
interface HeartParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

const Oneko: React.FC = () => {
  const nekoRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [nekoPos, setNekoPos] = useState({ x: 32, y: 32 });
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [isNightTime, setIsNightTime] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  
  // Get cat context
  const {
    isTerminalOpen,
    currentSection,
    isTourActive,
    tourStep,
    setTourStep,
    completeTour,
    targetPosition,
    setTargetPosition,
    speechMessage,
    setSpeechMessage,
    isPetting,
    setIsPetting,
    isScrollingFast,
  } = useCat();

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Check time for night mode (10pm - 6am)
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsNightTime(hour >= 22 || hour < 6);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle petting (click)
  const handleClick = useCallback(() => {
    if (!nekoRef.current) return;
    
    setIsPetting(true);
    
    // Create heart particles
    const newHearts: HeartParticle[] = [];
    for (let i = 0; i < 5; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: nekoPos.x + (Math.random() - 0.5) * 40,
        y: nekoPos.y - 20 - Math.random() * 30,
        opacity: 1,
      });
    }
    setHearts(prev => [...prev, ...newHearts]);
    
    // Clear petting after animation
    setTimeout(() => setIsPetting(false), 800);
    
    // Remove hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1500);
  }, [nekoPos, setIsPetting]);

  // Handle scroll peek
  useEffect(() => {
    if (isScrollingFast && !isPeeking) {
      setIsPeeking(true);
      setTimeout(() => setIsPeeking(false), 1000);
    }
  }, [isScrollingFast, isPeeking]);

  // Tour guide logic - simplified
  useEffect(() => {
    if (!isTourActive) return;

    const tourSteps = [
      { message: "Welcome! I'm Neko! 🐱", target: null },
      { message: "I'll be your guide today!", target: null },
      { message: "Check out my projects! 🚀", target: "work" },
      { message: "Cool stuff here, right? ✨", target: null },
      { message: "Let's go say hello! 💬", target: "contact" },
      { message: "You can reach out anytime!", target: null },
      { message: "Press ~ or F2 for terminal! 💻", target: null },
      { message: "Click me for pets! 💕", target: null },
      { message: "Have fun exploring! 🎉", target: null },
    ];

    if (tourStep >= tourSteps.length) {
      completeTour();
      return;
    }

    const step = tourSteps[tourStep];
    setSpeechMessage(step.message);
    
    if (step.target) {
      const el = document.getElementById(step.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY + 100,
        });
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setTargetPosition(null);
    }

    // Auto advance to next step
    const timer = setTimeout(() => {
      if (tourStep < tourSteps.length - 1) {
        setTourStep(tourStep + 1);
      } else {
        completeTour();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isTourActive, tourStep, setTourStep, completeTour, setSpeechMessage, setTargetPosition]);

  // Main animation effect
  useEffect(() => {
    if (isReducedMotion || !nekoRef.current) return;

    const nekoEl = nekoRef.current;
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 10;

    const spriteSets: Record<string, [number, number][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    function setSprite(name: string, frame: number) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      // Night time = more sleepy, also faster idle overall
      const sleepChance = isNightTime ? 15 : 30; // Much higher chance (was 50/200)
      
      // Trigger idle animation faster (was idleTime > 10)
      if (idleTime > 5 && Math.floor(Math.random() * sleepChance) === 0 && idleAnimation == null) {
        const availableIdleAnimations: string[] = ["sleeping", "scratchSelf"];
        
        // Add yawning effect at night
        if (isNightTime) {
          availableIdleAnimations.push("sleeping", "sleeping"); // More likely to sleep
        }
        
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
        
        idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          // Sleep longer at night
          const maxSleep = isNightTime ? 300 : 192;
          if (idleAnimationFrame > maxSleep) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      
      // Handle peeking animation
      if (isPeeking) {
        nekoPosX = window.innerWidth - 40;
        nekoPosY = window.innerHeight - 40;
        setSprite("alert", 0);
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        setNekoPos({ x: nekoPosX, y: nekoPosY });
        return;
      }

      // Terminal interaction - move to corner when terminal is open
      if (isTerminalOpen) {
        // Cat sits in the corner when terminal is open, out of the way
        nekoPosX = 50;
        nekoPosY = 50;
        setSprite("idle", 0);
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        setNekoPos({ x: nekoPosX, y: nekoPosY });
        return;
      }

      // Tour target position override
      let targetX = mousePosX;
      let targetY = mousePosY;
      
      if (targetPosition) {
        targetX = targetPosition.x;
        targetY = targetPosition.y;
      }

      const diffX = nekoPosX - targetX;
      const diffY = nekoPosY - targetY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      setNekoPos({ x: nekoPosX, y: nekoPosY });
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    let lastFrameTimestamp: number | undefined;

    function onAnimationFrame(timestamp: number) {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      animationFrameId = window.requestAnimationFrame(onAnimationFrame);
    }

    animationFrameId = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion, isNightTime, isPeeking, isTerminalOpen, targetPosition]);

  if (isReducedMotion) return null;

  return (
    <>
      {/* Speech Bubble */}
      <SpeechBubble message={speechMessage} position={nekoPos} />
      
      {/* Heart particles */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-[10000] text-red-500 text-xl animate-ping"
          style={{
            left: heart.x,
            top: heart.y,
            animation: "float-up 1s ease-out forwards",
          }}
        >
          💕
        </div>
      ))}
      
      {/* Cat */}
      <div
        ref={nekoRef}
        id="oneko"
        onClick={handleClick}
        aria-hidden="true"
        className={`cursor-pointer transition-transform ${isPetting ? "scale-125" : ""}`}
        style={{
          width: "32px",
          height: "32px",
          position: "fixed",
          pointerEvents: "auto",
          imageRendering: "pixelated",
          zIndex: 9999,
          backgroundImage: "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')",
          filter: isNightTime ? "brightness(0.8)" : "none",
        }}
      />
      
      {/* CSS for heart animation */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(1.5);
          }
        }
      `}</style>
    </>
  );
};

export default Oneko;
