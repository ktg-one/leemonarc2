## 2026-09-28 - On-demand rAF Loop Scheduling for Spring Controllers
**Learning:** Global header or UI spring controllers can accidentally run infinite `requestAnimationFrame` loops even when idle (`dirty = false`). Calling `requestAnimationFrame` unconditionally on every tick drains mobile battery and wastes CPU cycles across every page.
**Action:** Use an on-demand `scheduleDraw()` pattern that only requests animation frames when state is marked dirty/active and stops the loop once spring movement settles (`moving === false`).

## 2026-09-28 - IntersectionObserver Visibility Tracking across Animation Effects
**Learning:** When using `IntersectionObserver` across multiple `useEffect` animation loops in a single component, each observer callback must independently update shared visibility refs (e.g. `isVisibleRef.current = entry.isIntersecting`). Otherwise, observer execution order differences can cause one loop to see `isVisibleRef.current === false` when scrolling into view and halt permanently.
**Action:** Always update `isVisibleRef.current = entry.isIntersecting` inside every observer callback attached to the component container.

## 2026-09-28 - Caching Style Output Strings for 3D Carousel Cards
**Learning:** Continuously computing and assigning inline CSS transform/filter strings and querying `getAttribute` during high-frequency rAF animation loops creates Garbage Collection pressure and JS-to-DOM boundary overhead.
**Action:** Use a ref cache (`cardCacheRef`) to store previously formatted style/attribute strings per card and only mutate the DOM element properties when the newly computed value differs from the cache.

## 2026-09-28 - Stable Subscription Functions for useSyncExternalStore
**Learning:** Passing inline subscription functions to `useSyncExternalStore` causes React to re-subscribe on every render, constantly removing and re-attaching event listeners (e.g., `document.addEventListener('visibilitychange')`), creating listener churn and GC overhead.
**Action:** Always extract static `subscribe`, `getSnapshot`, and `getServerSnapshot` functions outside the component body when observing browser-global APIs.

## 2026-09-28 - Isolating Multiple Carousel Interval Timers into Memoized Sub-components
**Learning:** Hoisting state for multiple automatic interval timers (e.g. 5s, 5.5s, 6s carousels) into a single parent component causes every timer tick and hover event to re-render the entire parent DOM tree and all neighboring static or animated sections.
**Action:** Decompose monolithic section components into memoized sub-components (`React.memo`), placing timer and hover/focus state strictly within the sub-component that uses it.

## 2026-09-29 - Localizing Section Observers and UI State to Prevent DOM Detachment
**Learning:** Hoisting multiple `useSectionInView` observers and localized interactive state (e.g., bento card hover state, timeline tabs, illustration pause toggles) into a single monolithic component causes every scroll threshold intersection or hover event to re-render the entire parent DOM tree, detaching DOM elements during user interactions and forcing expensive Virtual DOM reconciliations across heavy canvas and 3D subcomponents.
**Action:** Isolate each section's `useSectionInView` hook and interactive state into `React.memo` sub-components so state changes and scroll visibility threshold updates only re-render the specific section affected.

## 2026-09-29 - Caching Hover Target Closest Ancestors & Element Centers for High-Frequency Pointer Controllers
**Learning:** Executing `.closest("a, button, summary...")` DOM tree traversals and `getBoundingClientRect()` layout-thrashing calls on every high-frequency `pointermove` event (up to 240 Hz on high refresh rate displays) causes main-thread frame drops.
**Action:** Cache `lastInteractiveEl` and element center coordinates (`cachedCenterX`, `cachedCenterY`), only querying `.closest()` when `event.target !== lastTarget` and updating bounding rects on element change or window scroll.

## 2026-09-29 - Lazy Rect Invalidation in Scroll Handlers to Eliminate Layout Thrashing
**Learning:** Calling synchronous `getBoundingClientRect()` in document `scroll` event listeners forces the browser engine to perform layout calculations on every scroll frame (60-120Hz), creating forced synchronous layout / layout thrashing.
**Action:** Mark cached bounding rects as stale (`isRectStale = true`) inside scroll event handlers without reading DOM properties, lazily recalculating `getBoundingClientRect()` only when position metrics are actually needed (e.g., during active pointer target evaluation).
