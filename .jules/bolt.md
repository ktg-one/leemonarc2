## 2026-09-27 - Pause On-Demand Spring Animation Loops in UI Controllers

**Learning:** Unconditional `requestAnimationFrame` loops in custom spring UI controllers (like `createTopDockController`) continuously consume CPU cycles and trigger layout calculations on every frame even when the spring simulation has completely settled and the UI is idle.

**Action:** Ensure custom spring and physics controllers only kick off `requestAnimationFrame` when state becomes dirty/active, and explicitly set `frame = 0` / cancel the loop when `moving` becomes false.
