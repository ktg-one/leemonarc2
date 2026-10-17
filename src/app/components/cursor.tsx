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
    let targetX = 0,
      targetY = 0,
      ringX = 0,
      ringY = 0,
      frame = 0,
      seen = false;

    let lastTarget: Element | null = null;
    let lastInteractiveEl: Element | null = null;
    let lastInteractive: boolean | null = null;

    const hide = () => {
      ringElement.style.opacity = "0";
      dotElement.style.opacity = "0";
      seen = false;
      lastTarget = null;
      lastInteractiveEl = null;
      lastInteractive = null;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const follow = () => {
      // Calculate magnetic offset target for ring
      let destX = targetX;
      let destY = targetY;

      if (lastInteractiveEl) {
        const rect = lastInteractiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Magnetic pull strength: 35% towards element center
        destX = targetX + (centerX - targetX) * 0.35;
        destY = targetY + (centerY - targetY) * 0.35;
      }

      ringX += (destX - ringX) * motion.cursorFollow;
      ringY += (destY - ringY) * motion.cursorFollow;

      ringElement.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      dotElement.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (
        Math.abs(destX - ringX) + Math.abs(destY - ringY) >
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
        ringX = targetX;
        ringY = targetY;
        seen = true;
      }
      dotElement.style.opacity = "1";
      ringElement.style.opacity = "1";

      const targetElement = event.target as Element | null;
      if (targetElement !== lastTarget) {
        lastTarget = targetElement;
        const interactiveEl = targetElement?.closest(
          "a, button, summary, input, textarea, select, [role='button'], .lm-magnetic"
        );
        lastInteractiveEl = interactiveEl || null;
        const isInteractive = !!interactiveEl;
        if (isInteractive !== lastInteractive) {
          lastInteractive = isInteractive;
          ringElement.dataset.interactive = String(isInteractive);
        }
      }

      if (!frame) frame = requestAnimationFrame(follow);
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const preferenceChange = () => {
      if (!query.matches) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    query.addEventListener("change", preferenceChange);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
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
