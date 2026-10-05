## 2026-09-28 - On-demand rAF Loop Scheduling for Spring Controllers
**Learning:** Global header or UI spring controllers can accidentally run infinite `requestAnimationFrame` loops even when idle (`dirty = false`). Calling `requestAnimationFrame` unconditionally on every tick drains mobile battery and wastes CPU cycles across every page.
**Action:** Use an on-demand `scheduleDraw()` pattern that only requests animation frames when state is marked dirty/active and stops the loop once spring movement settles (`moving === false`).

## 2026-09-28 - IntersectionObserver Visibility Tracking across Animation Effects
**Learning:** When using `IntersectionObserver` across multiple `useEffect` animation loops in a single component, each observer callback must independently update shared visibility refs (e.g. `isVisibleRef.current = entry.isIntersecting`). Otherwise, observer execution order differences can cause one loop to see `isVisibleRef.current === false` when scrolling into view and halt permanently.
**Action:** Always update `isVisibleRef.current = entry.isIntersecting` inside every observer callback attached to the component container.

## 2026-10-03 - Eliminate Layout Thrashing by Batching Canvas Measurements in Resize Handlers
**Learning:** Reading layout properties such as `canvas.clientWidth` and `canvas.clientHeight` inside a `requestAnimationFrame` loop immediately after modifying DOM elements (`style.transform`, `style.filter`) causes forced synchronous reflows (layout thrashing) on every frame.
**Action:** Perform canvas dimension measurements inside resize handlers/observers and update `canvas.width` and `canvas.height` only when dimensions actually change, keeping the `rAF` render loop purely computational and draw-only.
