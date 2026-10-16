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
      magnetX = 0,
      magnetY = 0,
      currentMagnetX = 0,
      currentMagnetY = 0,
      isMouseDown = false,
      frame = 0,
      seen = false;

    // Cache last target element and interactive status to eliminate redundant DOM traversals
    // and dataset property writes on high-frequency pointermove events.
    let lastTarget: Element | null = null;
    let lastInteractive: boolean | null = null;
    let lastInteractiveEl: HTMLElement | null = null;

    const hide = () => {
      ringElement.style.opacity = "0";
      dotElement.style.opacity = "0";
      seen = false;
      lastTarget = null;
      lastInteractive = null;
      lastInteractiveEl = null;
      magnetX = 0;
      magnetY = 0;
      currentMagnetX = 0;
      currentMagnetY = 0;
      isMouseDown = false;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const follow = () => {
      // Interpolate cursor ring position with spring-like follow lerp
      x += (targetX - x) * motion.cursorFollow;
      y += (targetY - y) * motion.cursorFollow;

      // Interpolate magnetic offset smoothly over time (~1.2s feeling)
      currentMagnetX += (magnetX - currentMagnetX) * 0.15;
      currentMagnetY += (magnetY - currentMagnetY) * 0.15;

      const totalX = x + currentMagnetX;
      const totalY = y + currentMagnetY;
      const activeScale = isMouseDown ? " scale(0.75)" : "";

      ringElement.style.transform = `translate3d(${totalX}px, ${totalY}px, 0) translate(-50%, -50%)${activeScale}`;

      const posDiff = Math.abs(targetX - x) + Math.abs(targetY - y);
      const magDiff =
        Math.abs(magnetX - currentMagnetX) + Math.abs(magnetY - currentMagnetY);

      if (posDiff > motion.cursorSettleDistance || magDiff > 0.05) {
        frame = requestAnimationFrame(follow);
      } else {
        frame = 0;
      }
    };

    const updateMagneticOffset = (clientX: number, clientY: number) => {
      if (lastInteractiveEl) {
        const rect = lastInteractiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Apply magnetic pull toward the center of the element (max 18px shift)
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const pullStrength = 0.35;
        const maxPull = 18;

        const rawPullX = -deltaX * pullStrength;
        const rawPullY = -deltaY * pullStrength;

        const dist = Math.hypot(rawPullX, rawPullY);
        if (dist > maxPull) {
          magnetX = (rawPullX / dist) * maxPull;
          magnetY = (rawPullY / dist) * maxPull;
        } else {
          magnetX = rawPullX;
          magnetY = rawPullY;
        }
      } else {
        magnetX = 0;
        magnetY = 0;
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
        const interactiveEl = targetElement?.closest<HTMLElement>(
          'a, button, summary, input, textarea, select, [role="button"]',
        );
        const isInteractive = !!interactiveEl;
        if (interactiveEl !== lastInteractiveEl) {
          lastInteractiveEl = interactiveEl || null;
        }
        if (isInteractive !== lastInteractive) {
          lastInteractive = isInteractive;
          ringElement.dataset.interactive = String(isInteractive);
        }
      }

      updateMagneticOffset(targetX, targetY);

      if (!frame) frame = requestAnimationFrame(follow);
    };

    const down = (event: PointerEvent) => {
      if (!query.matches || event.pointerType === "touch") return;
      isMouseDown = true;
      if (!frame) frame = requestAnimationFrame(follow);
    };

    const up = (event: PointerEvent) => {
      if (!query.matches || event.pointerType === "touch") return;
      isMouseDown = false;
      if (!frame) frame = requestAnimationFrame(follow);
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
