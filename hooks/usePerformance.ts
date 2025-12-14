"use client";

import { useState, useEffect } from "react";

interface PerformanceInfo {
  isLowEnd: boolean;
  hasGPU: boolean;
  prefersReducedMotion: boolean;
  cpuCores: number;
  isMobile: boolean;
}

/**
 * Hook to detect low-end devices and disable heavy effects accordingly.
 * Checks for:
 * - GPU availability (WebGL support)
 * - CPU cores count
 * - Mobile detection
 * - prefers-reduced-motion setting
 * - Device memory (if available)
 */
export function usePerformance(): PerformanceInfo {
  const [info, setInfo] = useState<PerformanceInfo>({
    isLowEnd: false,
    hasGPU: true,
    prefersReducedMotion: false,
    cpuCores: 4,
    isMobile: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check for mobile
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    // Check CPU cores
    const cpuCores = navigator.hardwareConcurrency || 4;

    // Check for GPU/WebGL support
    let hasGPU = true;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        hasGPU = false;
      } else {
        // Check if it's a software renderer (no real GPU)
        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Software renderers often contain these strings
          if (
            renderer.includes("SwiftShader") ||
            renderer.includes("llvmpipe") ||
            renderer.includes("Software") ||
            renderer.includes("Microsoft Basic Render")
          ) {
            hasGPU = false;
          }
        }
      }
    } catch {
      hasGPU = false;
    }

    // Check device memory (Chrome only)
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    const lowMemory = deviceMemory < 4;

    // Determine if low-end device
    const isLowEnd = 
      prefersReducedMotion ||
      !hasGPU ||
      cpuCores <= 2 ||
      lowMemory ||
      (isMobile && cpuCores <= 4);

    setInfo({
      isLowEnd,
      hasGPU,
      prefersReducedMotion,
      cpuCores,
      isMobile,
    });
  }, []);

  return info;
}

export default usePerformance;
