import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base front-semibold ring-offset-white transition-colors",
    {
        variants: {
            variant: {
                default:
                    " bg-UserAccent text-primary hover:bg-UserAccent-hover",
                primary: "bg-primary text-white",
                outline:
                    "border border-UserAccent bg-transparent text-userAccent hover:bg-UserAccent hover:text-primary",
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

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
