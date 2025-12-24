"use client";

import { useState, useEffect } from "react";

const DEFAULT_NAME = "Neon";
const FULL_DEFAULT_NAME = "Neon Stain";

/**
 * Hook to get and listen for site name changes from the terminal 'name' command
 * @param fullName - if true, returns full name (e.g., "Neon Stain"), otherwise just first name (e.g., "Neon")
 */
export function useSiteName(fullName: boolean = false): string {
  const [siteName, setSiteName] = useState(fullName ? FULL_DEFAULT_NAME : DEFAULT_NAME);

  useEffect(() => {
    // Load saved name from localStorage on mount
    const savedName = localStorage.getItem('portfolio-site-name');
    if (savedName) {
      if (fullName) {
        setSiteName(savedName);
      } else {
        // Extract first name only
        setSiteName(savedName.split(' ')[0]);
      }
    }

    // Listen for name changes from terminal
    const handleNameChange = (e: CustomEvent<string>) => {
      if (fullName) {
        setSiteName(e.detail);
      } else {
        setSiteName(e.detail.split(' ')[0]);
      }
    };

    window.addEventListener('site-name-change', handleNameChange as EventListener);
    return () => {
      window.removeEventListener('site-name-change', handleNameChange as EventListener);
    };
  }, [fullName]);

  return siteName;
}
