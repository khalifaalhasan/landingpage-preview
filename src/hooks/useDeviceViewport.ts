"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * A hook that returns the current device type based on:
 * 1. The LayoutCustomizer overriding cookie (`tenant_layout`)
 * 2. Window innerWidth (Fallback for real visitors)
 */
export function useDeviceViewport(): DeviceType {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    // 1. Function to evaluate current state
    const evaluateDevice = () => {
      // First check if the user is forcing a preview via the Customizer cookie
      const cookieData = getCookie("tenant_layout");
      if (cookieData) {
        try {
          const parsed = JSON.parse(cookieData as string);
          // If the customizer has a 'previewCookie' or similar injected.. 
          // Wait, our customizer currently stores `previewDevice` ONLY in state, not the cookie.
          // Let's modify the hook to actually listen to window size, 
          // AND we will pass a React Context from the LayoutCustomizer down if needed,
          // OR we can just rely on the wrapper's physical width since it shrinks!
        } catch (e) {
          console.error(e);
        }
      }

      // Fallback: rely on actual window size (which handles both real mobile users 
      // AND resize events on desktop if they shrink the window).
      // Since the mockup 'shrinks' the wrapper but NOT the window, doing window.innerWidth
      // will NOT react to the Customizer buttons unless we use an ResizeObserver on the wrapper.
      const wrapper = document.getElementById("tenant-app-wrapper");
      const width = wrapper ? wrapper.getBoundingClientRect().width : window.innerWidth;

      if (width < 768) {
        setDevice("mobile");
      } else if (width < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    // Initial evaluation
    evaluateDevice();

    // 2. Setup Resize Observer on the wrapper to react to Customizer changes!
    const wrapper = document.getElementById("tenant-app-wrapper");
    let resizeObserver: ResizeObserver | null = null;
    
    if (wrapper) {
      resizeObserver = new ResizeObserver(() => {
        evaluateDevice();
      });
      resizeObserver.observe(wrapper);
    }

    // Also listen to normal window resizes as a fallback
    window.addEventListener("resize", evaluateDevice);

    return () => {
      if (resizeObserver && wrapper) {
        resizeObserver.unobserve(wrapper);
      }
      window.removeEventListener("resize", evaluateDevice);
    };
  }, []);

  return device;
}
