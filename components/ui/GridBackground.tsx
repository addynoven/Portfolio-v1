"use client";

interface GridBackgroundProps {
  className?: string;
}

export default function GridBackground({ className = "" }: GridBackgroundProps) {
  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {/* Animated grid pattern using pure CSS */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 153, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 153, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Subtle radial gradient overlay for depth */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      
      {/* Animated glow spots */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 153, 0.4) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          animation: "float1 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.4) 0%, transparent 70%)",
          bottom: "20%",
          right: "15%",
          animation: "float2 10s ease-in-out infinite",
        }}
      />
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
