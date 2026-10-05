## 2026-09-28 - On-demand rAF Loop Scheduling for Spring Controllers
**Learning:** Global header or UI spring controllers can accidentally run infinite `requestAnimationFrame` loops even when idle (`dirty = false`). Calling `requestAnimationFrame` unconditionally on every tick drains mobile battery and wastes CPU cycles across every page.
**Action:** Use an on-demand `scheduleDraw()` pattern that only requests animation frames when state is marked dirty/active and stops the loop once spring movement settles (`moving === false`).

## 2026-09-28 - IntersectionObserver Visibility Tracking across Animation Effects
**Learning:** When using `IntersectionObserver` across multiple `useEffect` animation loops in a single component, each observer callback must independently update shared visibility refs (e.g. `isVisibleRef.current = entry.isIntersecting`). Otherwise, observer execution order differences can cause one loop to see `isVisibleRef.current === false` when scrolling into view and halt permanently.
**Action:** Always update `isVisibleRef.current = entry.isIntersecting` inside every observer callback attached to the component container.

## 2026-10-04 - On-demand rAF & Render Throttling for Friction-based Carousels
**Learning:** Infinite 3D/CSS transform carousels with friction-decay physics can waste significant main-thread CPU time continuously running `requestAnimationFrame` and setting inline styles on every 16.6ms tick even when stationary (e.g. while paused, hovered, or idle).
**Action:** Cache the last rendered scroll position (`lastRenderedScrollX`) to short-circuit DOM updates when position is unchanged, and halt the rAF loop when velocity decays to 0 and not dragging (`s.vx === 0 && !s.dragging`), resuming loop scheduling on-demand in pointer, wheel, snap, and state change handlers.
