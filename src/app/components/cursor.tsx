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
      frame = 0,
      seen = false;
    // Cache last target element and interactive status to eliminate redundant DOM traversals
    // and dataset property writes on high-frequency pointermove events.
    let lastTarget: Element | null = null;
    let lastInteractive: boolean | null = null;
    let interactiveElement: Element | null = null;

    const hide = () => {
      ringElement.style.opacity = "0";
      dotElement.style.opacity = "0";
      seen = false;
      lastTarget = null;
      lastInteractive = null;
      interactiveElement = null;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const follow = () => {
      let finalTargetX = targetX;
      let finalTargetY = targetY;

      if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Magnetic pull towards interactive element center (35% attraction factor)
        const pull = 0.35;
        finalTargetX = targetX + (centerX - targetX) * pull;
        finalTargetY = targetY + (centerY - targetY) * pull;
      }

      x += (finalTargetX - x) * motion.cursorFollow;
      y += (finalTargetY - y) * motion.cursorFollow;
      ringElement.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (
        Math.abs(finalTargetX - x) + Math.abs(finalTargetY - y) >
        motion.cursorSettleDistance
      )
        frame = requestAnimationFrame(follow);
      else frame = 0;
    };

    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!seen) {
        x = targetX;
        y = targetY;
        seen = true;
      }
      dotElement.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      dotElement.style.opacity = "1";
      ringElement.style.opacity = "1";

      const targetElement = event.target as Element | null;
      if (targetElement !== lastTarget) {
        lastTarget = targetElement;
        const candidate = targetElement?.closest(
          "a, button, summary, input, textarea, select, [data-magnetic]",
        );
        interactiveElement = candidate || null;
        const isInteractive = !!interactiveElement;
        if (isInteractive !== lastInteractive) {
          lastInteractive = isInteractive;
          ringElement.dataset.interactive = String(isInteractive);
          ringElement.dataset.magnetic = String(isInteractive);
        }
      }

      if (!frame) frame = requestAnimationFrame(follow);
    };

    const down = () => {
      if (!query.matches) return;
      ringElement.dataset.active = "true";
    };

    const up = () => {
      if (!query.matches) return;
      ringElement.dataset.active = "false";
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const preferenceChange = () => {
      if (!query.matches) hide();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    query.addEventListener("change", preferenceChange);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
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
