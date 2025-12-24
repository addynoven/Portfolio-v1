"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const BentoModal = ({
  children,
  trigger,
  title,
  description,
  isOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>
          {trigger}
        </DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          className={cn(
            "fixed z-50 left-1/2 -translate-x-1/2 top-4 bottom-4 w-[99vw] max-w-[99vw] duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "outline-none"
          )}
        >
          {/* Visually hidden title for accessibility */}
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>{title || "Modal"}</DialogPrimitive.Title>
            <DialogPrimitive.Description>{description || "Modal content"}</DialogPrimitive.Description>
          </VisuallyHidden.Root>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] h-full flex flex-col overflow-hidden">
            {/* Close Button - Inside modal, at top center */}
            <div className="flex justify-center py-4 flex-shrink-0">
              <DialogPrimitive.Close className="rounded-full bg-white/10 p-2 text-white/50 hover:bg-white/20 hover:text-white transition-all border border-white/10 outline-none">
                <Cross2Icon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 pb-6 md:pb-10">
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default BentoModal;
