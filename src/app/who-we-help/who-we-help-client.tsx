"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

interface WhoWeHelpClientProps {
  children: ReactNode;
}

export function WhoWeHelpClient({ children }: WhoWeHelpClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const sections = container.querySelectorAll<HTMLElement>(".who-section");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-in-view", "true");
            // Keep observing or unobserve once in view for permanent reveal
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="who-sections-container"
      data-enhanced={hydrated ? "true" : "false"}
    >
      {children}
    </div>
  );
}
