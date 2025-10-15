#!/bin/bash
# Fix select.tsx
sed -i 's/({ className, children, \.\.\.props }, ref)/({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.Trigger>>)/' select.tsx
sed -i 's/({ className, \.\.\.props }, ref)/({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>, ref: React.ForwardedRef<React.ElementRef<typeof SelectPrimitive.ScrollUpButton>>)/' select.tsx

# Fix dialog.tsx
sed -i 's/({ className, \.\.\.props }, ref)/({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>, ref: React.ForwardedRef<React.ElementRef<typeof DialogPrimitive.Overlay>>)/' dialog.tsx
