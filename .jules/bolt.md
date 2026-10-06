## 2026-09-28 - On-demand rAF Loop Scheduling for Spring Controllers
**Learning:** Global header or UI spring controllers can accidentally run infinite `requestAnimationFrame` loops even when idle (`dirty = false`). Calling `requestAnimationFrame` unconditionally on every tick drains mobile battery and wastes CPU cycles across every page.
**Action:** Use an on-demand `scheduleDraw()` pattern that only requests animation frames when state is marked dirty/active and stops the loop once spring movement settles (`moving === false`).

## 2026-09-28 - IntersectionObserver Visibility Tracking across Animation Effects
**Learning:** When using `IntersectionObserver` across multiple `useEffect` animation loops in a single component, each observer callback must independently update shared visibility refs (e.g. `isVisibleRef.current = entry.isIntersecting`). Otherwise, observer execution order differences can cause one loop to see `isVisibleRef.current === false` when scrolling into view and halt permanently.
**Action:** Always update `isVisibleRef.current = entry.isIntersecting` inside every observer callback attached to the component container.

## 2026-09-28 - Caching Style Output Strings for 3D Carousel Cards
**Learning:** Continuously computing and assigning inline CSS transform/filter strings and querying `getAttribute` during high-frequency rAF animation loops creates Garbage Collection pressure and JS-to-DOM boundary overhead.
**Action:** Use a ref cache (`cardCacheRef`) to store previously formatted style/attribute strings per card and only mutate the DOM element properties when the newly computed value differs from the cache.

## 2026-10-06 - Off-Screen Scroll Handler Guarding & CSS Value Caching
**Learning:** Parallax or scroll-position event handlers attached to `window` often invoke `getBoundingClientRect()` on every scroll event, forcing synchronous layout recalculations even when the element is off-screen. Additionally, setting CSS custom properties or inline styles on every scroll frame without checking if the formatted string value changed creates redundant DOM mutations.
**Action:** Guard scroll event handlers with an `IntersectionObserver` `isIntersecting` flag so `getBoundingClientRect()` is skipped when off-screen, and cache formatted CSS string values before calling `style.setProperty`.
