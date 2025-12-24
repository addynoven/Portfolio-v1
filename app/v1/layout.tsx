"use client";

import LayoutWrapper from "@/components/LayoutWrapper";
import TerminalButton from "@/components/TerminalButton";
import LoadingScreenWrapper from "@/components/LoadingScreenWrapper";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { SectionTransitionProvider } from "@/components/SectionTransitionContext";
import SectionStairTransition from "@/components/SectionStairTransition";
import Oneko from "@/components/Oneko";
import { CatProvider } from "@/components/CatContext";
import { RetroGrid } from "@/components/ui/retro-grid";

export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CatProvider>
      <SectionTransitionProvider>
        <RetroGrid 
          angle={65}
          cellSize={60}
          opacity={0.4}
          lightLineColor="rgba(0, 255, 153, 0.15)"
          darkLineColor="rgba(0, 255, 153, 0.2)"
        />
        <LoadingScreenWrapper />
        <LayoutWrapper>
          <StairTransition />
          <SectionStairTransition />
          <PageTransition>{children}</PageTransition>
        </LayoutWrapper>
        <TerminalButton />
        <Oneko />
      </SectionTransitionProvider>
    </CatProvider>
  );
}
