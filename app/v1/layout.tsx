"use client";

import LayoutWrapper from "@/components/v1/LayoutWrapper";
import TerminalButton from "@/components/v1/TerminalButton";
import LoadingScreenWrapper from "@/components/v1/LoadingScreenWrapper";
import PageTransition from "@/components/v1/PageTransition";
import StairTransition from "@/components/v1/StairTransition";
import { SectionTransitionProvider } from "@/components/v1/SectionTransitionContext";
import SectionStairTransition from "@/components/v1/SectionStairTransition";
import Oneko from "@/components/v1/Oneko";
import { CatProvider } from "@/components/v1/CatContext";
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
