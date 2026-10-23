"use client";

import { useEffect, useRef } from "react";
import { motion } from "@/lib/motion";
import "./motion.css";

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ringElement = ring.current;
    const dotElement = dot.current;
    if (!ringElement || !dotElement) return;
    const query = matchMedia(motion.cursorQuery);
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0,
      ringTargetX = 0,
      ringTargetY = 0,
      frame = 0,
      seen = false;

    let lastTarget: Element | null = null;
    let lastInteractiveEl: Element | null = null;
    let cachedCenterX = 0;
    let cachedCenterY = 0;

    const updateCachedCenter = () => {
      if (lastInteractiveEl) {
        const rect = lastInteractiveEl.getBoundingClientRect();
        cachedCenterX = rect.left + rect.width / 2;
        cachedCenterY = rect.top + rect.height / 2;
      }
    };

    const hide = () => {
      ringElement.style.opacity = "0";
      dotElement.style.opacity = "0";
      seen = false;
      lastTarget = null;
      lastInteractiveEl = null;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const follow = () => {
      x += (ringTargetX - x) * motion.cursorFollow;
      y += (ringTargetY - y) * motion.cursorFollow;
      ringElement.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      if (
        Math.abs(ringTargetX - x) + Math.abs(ringTargetY - y) >
        motion.cursorSettleDistance
      ) {
        frame = requestAnimationFrame(follow);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!seen) {
        x = targetX;
        y = targetY;
        ringTargetX = targetX;
        ringTargetY = targetY;
        seen = true;
      }

      dotElement.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      dotElement.style.opacity = "1";
      ringElement.style.opacity = "1";

      const targetElement = event.target as Element | null;
      if (targetElement !== lastTarget) {
        lastTarget = targetElement;
        const interactiveEl = targetElement?.closest(
          "a, button, summary, input, textarea, select, [data-magnetic]",
        ) || null;

        if (interactiveEl !== lastInteractiveEl) {
          lastInteractiveEl = interactiveEl;
          const isInteractive = !!interactiveEl;
          ringElement.dataset.interactive = String(isInteractive);
        }

        if (interactiveEl) {
          updateCachedCenter();
        }
      }

      // Apply magnetic pull strength toward cached center if over an interactive element
      if (lastInteractiveEl) {
        ringTargetX = targetX + (cachedCenterX - targetX) * 0.35;
        ringTargetY = targetY + (cachedCenterY - targetY) * 0.35;
      } else {
        ringTargetX = targetX;
        ringTargetY = targetY;
      }

      if (!frame) frame = requestAnimationFrame(follow);
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const preferenceChange = () => {
      if (!query.matches) hide();
    };

    const handleScroll = () => {
      if (lastInteractiveEl) {
        updateCachedCenter();
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", handleScroll, { passive: true });
    query.addEventListener("change", preferenceChange);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", handleScroll);
      query.removeEventListener("change", preferenceChange);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
