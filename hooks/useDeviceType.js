"use client";
import { useState, useEffect } from "react";

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const updateDeviceType = () => {
      const width = window.innerWidth;

      // Define breakpoints (you can adjust these as needed)
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setDeviceType({
        isMobile,
        isTablet,
        isDesktop,
      });
    };

    // Set the initial device detection
    updateDeviceType();

    // Add event listener for window resize
    window.addEventListener("resize", updateDeviceType);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

    
  return deviceType;
};
