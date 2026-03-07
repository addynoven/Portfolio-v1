"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

/**
 * Client-side wrapper that controls LoadingScreen visibility via localStorage.
 * Terminal commands 'loading on' and 'loading off' set the localStorage key.
 */
export default function LoadingScreenWrapper() {
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage on mount
    const shouldSkip = localStorage.getItem("skip-loading-screen") === "true";
    setShowLoading(!shouldSkip);
  }, []);


  
  // If loading is disabled, don't render the loading screen at all
  if (!showLoading) return null;

  return <LoadingScreen />;
}
