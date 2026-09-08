import { ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  clipStyle?: string;
  duration?: number;
}

export type ClipStyle = 'circle-expand' | 'inset-expand' | 'swipe-up' | 'split-vertical';

export default function SectionReveal({ children }: SectionRevealProps) {
  return <div className="w-full">{children}</div>;
}
