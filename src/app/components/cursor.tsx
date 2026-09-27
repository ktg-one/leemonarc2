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
    const follow = () => {
      x += (targetX - x) * motion.cursorFollow;
      y += (targetY - y) * motion.cursorFollow;
      ringElement.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (
        Math.abs(targetX - x) + Math.abs(targetY - y) >
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

      // Only query closest interactive ancestor when the target element changes,
      // and only update DOM dataset attribute when the interactive status toggles.
      const targetElement = event.target as Element | null;
      if (targetElement !== lastTarget) {
        lastTarget = targetElement;
        const isInteractive = !!targetElement?.closest(
          "a, button, summary, input, textarea, select",
        );
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
