"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import WaterFillEffect from "@/components/WaterFillEffect";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-all relative overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "bg-UserAccent text-primary hover:bg-UserAccent-hover",
                primary: "bg-primary text-white",
                outline:
                    "border-2 border-UserAccent bg-transparent text-primary dark:text-UserAccent",
            },
            size: {
                default: "h-[44px] px-6",
                md: "h-[48px] px-6",
                lg: "h-[56px] px-8 text-lg uppercase tracking-[2px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        const isOutline = variant === "outline";
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const [isHovered, setIsHovered] = React.useState(false);
        const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
        
        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt (-15 to 15 degrees)
            const tiltX = ((y - centerY) / centerY) * -10;
            const tiltY = ((x - centerX) / centerX) * 10;
            
            setTilt({ x: tiltX, y: tiltY });
        };
        
        const handleMouseLeave = () => {
            setIsHovered(false);
            setTilt({ x: 0, y: 0 });
        };
        
        const handleMouseEnter = () => {
            setIsHovered(true);
        };
        
        // Combine refs
        const combinedRef = (node: HTMLButtonElement) => {
            (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };
        
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={combinedRef}
                onMouseMove={isOutline ? handleMouseMove : undefined}
                onMouseEnter={isOutline ? handleMouseEnter : undefined}
                onMouseLeave={isOutline ? handleMouseLeave : undefined}
                style={isOutline ? {
                    transform: `perspective(500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
                } : undefined}
                {...props}
            >
                {/* Wave water fill effect for outline variant */}
                {isOutline && (
                    <WaterFillEffect 
                        isActive={isHovered}
                        tiltY={tilt.y}
                    />
                )}
                
                {/* Content wrapper */}
                <span className={cn(
                    "relative z-10 flex items-center gap-2 transition-colors duration-500",
                    isOutline && isHovered && "text-primary"
                )}>
                    {children}
                </span>
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };



