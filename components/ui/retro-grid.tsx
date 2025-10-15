import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

export default function RetroGrid({ className, angle = 60 }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute w-full h-full overflow-hidden opacity-60 [perspective:200px]",
        className
      )}
      style={{
        "--grid-angle": `${angle}deg`,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] lg:[background-size:120px_120px] [height:300vh] [width:600vw] [transform-origin:100%_0_0]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]"
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t to-transparent to-90% from-black" />
    </div>
  );
}
