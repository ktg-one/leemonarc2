## 2026-09-27 - Prevent Forced Synchronous Layout in Canvas Render Loop
**Learning:** Reading `canvas.clientWidth` / `canvas.clientHeight` inside a 60 FPS `requestAnimationFrame` loop causes forced synchronous layout (reflow) on every frame when styles/DOM are mutated in parallel.
**Action:** Synchronize canvas buffer dimensions (`canvas.width` / `canvas.height`) using a `ResizeObserver` (or `window` `resize` listener) outside the animation loop, and read `canvas.width` / `canvas.height` directly inside `requestAnimationFrame`.
