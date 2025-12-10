import { useSyncExternalStore } from "react";

export const useMediaWidth = () => {
  const windowWidth = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSideSnapshot
  );
  return windowWidth;
};

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () => window.innerWidth;

const getServerSideSnapshot = () => 0;
