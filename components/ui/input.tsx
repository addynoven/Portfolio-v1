import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[48px] rounded-md border border-slate-300 dark:border-white/10 focus:border-UserAccent font-light bg-white dark:bg-primary px-4 py-5 text-base text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/60 outline-none transition-colors duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
