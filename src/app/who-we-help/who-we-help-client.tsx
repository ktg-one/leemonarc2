"use client";

import type React from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** Hook to observe element visibility on scroll, remaining visible once triggered */
function useSectionInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, inView]);

  return inView;
}

const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

export function AnimatedSection({
  className,
  children,
  ariaLabelledby,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabelledby?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useSectionInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={className}
      aria-labelledby={ariaLabelledby}
      data-reveal="rise"
      data-in-view={inView}
    >
      {children}
    </section>
  );
}

export function WhoWeHelpClient({ children }: { children: React.ReactNode }) {
  const isHydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapability = () => setReducedMotion(query.matches);
    updateCapability();
    query.addEventListener("change", updateCapability);
    return () => query.removeEventListener("change", updateCapability);
  }, []);

  const enhanced = isHydrated && !reducedMotion;

  return (
    <main id="main" className="who-we-help-page section-stack" data-enhanced={enhanced}>
      {children}
    </main>
  );
}
