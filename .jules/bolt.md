## 2026-09-29 - Infinite3DCarousel Animation Loop & Visibility Optimization
**Learning:** Continuous 60fps requestAnimationFrame animation loops (both 3D transform updates and radial gradient canvas background renders) running while offscreen or in background tabs waste CPU/GPU cycles and battery. Pausing rAF when out of viewport via `IntersectionObserver` or when document is hidden reduces CPU/GPU utilization to 0% when off-screen.
**Action:** Always wrap continuous canvas / 3D animation loops with IntersectionObserver / document.hidden checks.
