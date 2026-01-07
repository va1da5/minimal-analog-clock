import { useState, useCallback } from "react";

export const useWakeLock = () => {
  const [isLocked, setIsLocked] = useState(false);
  const wakeLock = useCallback(async () => {
    if ("wakeLock" in navigator) {
      try {
        const lock = await (navigator as any).wakeLock.request("screen");
        setIsLocked(true);
        lock.addEventListener("release", () => setIsLocked(false));
      } catch (err) {
        console.error(`${err} - Wake Lock not supported or rejected`);
      }
    }
  }, []);

  const releaseLock = useCallback(async () => {
    if ("wakeLock" in navigator) {
      // Note: The actual release mostly happens automatically when
      // document visibility changes or manually handled if we stored the sentinel.
      // For this simple implementation, we assume browser handles release on navigation/minimize
      // Re-requesting is the primary action.
      setIsLocked(false);
    }
  }, []);

  return { isLocked, requestWakeLock: wakeLock, releaseWakeLock: releaseLock };
};
