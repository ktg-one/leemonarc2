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

    const hide = () => {
      ringElement.style.opacity = "0";
      dotElement.style.opacity = "0";
      seen = false;
      lastTarget = null;
      lastInteractive = null;
      cancelAnimationFrame(frame);
      frame = 0;
    };
    let ringTargetX = 0;
    let ringTargetY = 0;
    let interactiveElement: HTMLElement | null = null;
    let cachedCenterX = 0;
    let cachedCenterY = 0;

    const updateRingTarget = () => {
      if (interactiveElement) {
        const dx = cachedCenterX - targetX;
        const dy = cachedCenterY - targetY;
        const pull = 0.38;
        ringTargetX = targetX + dx * pull;
        ringTargetY = targetY + dy * pull;
      } else {
        ringTargetX = targetX;
        ringTargetY = targetY;
      }
    };

    const follow = () => {
      updateRingTarget();
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
        seen = true;
      }
      dotElement.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      dotElement.style.opacity = "1";
      ringElement.style.opacity = "1";

      const targetElement = event.target as Element | null;
      if (targetElement !== lastTarget) {
        lastTarget = targetElement;
        const matched = targetElement?.closest(
          "a, button, summary, input, textarea, select, [data-magnetic]",
        ) as HTMLElement | null;

        interactiveElement = matched;
        const isInteractive = !!matched;
        if (isInteractive !== lastInteractive) {
          lastInteractive = isInteractive;
          ringElement.dataset.interactive = String(isInteractive);
        }
      }

      if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();
        cachedCenterX = rect.left + rect.width / 2;
        cachedCenterY = rect.top + rect.height / 2;
      }

      if (!frame) frame = requestAnimationFrame(follow);
    };

    const down = () => {
      ringElement.dataset.pressed = "true";
    };

    const up = () => {
      ringElement.dataset.pressed = "false";
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
    window.addEventListener("pointercancel", up, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    query.addEventListener("change", preferenceChange);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
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
