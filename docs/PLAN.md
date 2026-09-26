# Lee Monarc — Execution & Enhancement Plan

**Date:** 26 September 2026  
**Repository:** [https://github.com/ktg-one/leemonarc2.git](https://github.com/ktg-one/leemonarc2.git) (`main`)  
**Status:** Active execution phase — All 21 Playwright tests passing (100%), Turbopack production build clean.

---

## 1. Objectives & Active Backlog

Following the Paraform design rhythm, Frontend Taste Engineer directives, and verbatim copy rules from `docs/CANON-BRIEF.md`, this plan outlines active enhancements and technical execution steps.

### A. Auto-Advancing 3-Column Carousels
- **Targets:**
  1. **Belief Statements Carousel (`src/app/components/home/light-sections.tsx`):** 4 editorial belief cards auto-rotating on a timer with focus effect and manual control.
  2. **Advisory Decision Pillars (`src/app/components/home/light-sections.tsx`):** 3 decision pillar cards with auto-advance and pause-on-hover.
  3. **Clarity / Service Bento Cards (`src/app/components/home/dark-sections.tsx`):** Auto-panning card carousel with keyboard/touch accessibility.
- **Controls & Accessibility:**
  - Pause automatically on mouse hover and keyboard focus.
  - Full support for `prefers-reduced-motion: reduce`.

### B. Tactile Hover Effects ("Hovie Effect") & Micro-Interactions
- **Targets:**
  - `src/app/components/home/hero.css`
  - `src/app/components/home/light-sections.css`
  - `src/app/components/home/dark-sections.css`
  - `src/app/refresh.css`
- **Treatments:**
  - Inset champagne gold border glows (`border-amber-400/30`, `box-shadow: inset 0 1px 0 rgba(212,175,55,0.2)`).
  - Tactile physical push and lift (`transform: translateY(-4px)` on hover, `scale(0.98)` on active).
  - Ambient shadow diffusion and text glow transitions.

### C. Team Section & Staged Video Containers
- **Targets:**
  - `src/app/components/home/hero.tsx`
  - `src/app/components/home/dark-sections.tsx`
- **Treatments:**
  - Staged video slots with fallback poster artwork, play/pause controls, and error states.
  - Sole practitioner team presentation for founder Vivienne Lee with 3D depth coverflow/carousel interaction.

---

## 2. Verification Gates
1. `npm run typecheck` — 0 TypeScript errors.
2. `npm run lint` & `npm run oxlint` — 0 linting errors.
3. `npm test` — 21 of 21 Playwright tests passing (cold load, mobile, contrast, touch).
4. `npm run build` — Clean Turbopack production compilation.

---

## 4. Web Quality Audit Remediation Backlog (2026 Audit)

The following items were identified during the Web Quality Audit and tracked for remediation prior to public indexing/launch:

### SEO & Crawlability
- [ ] **robots.txt / index directive**: Update `src/app/layout.tsx` metadata from `robots: { index: false, follow: false }` to indexable configuration for production environment.
- [ ] **Sitemap & Canonical URLs**: Implement `sitemap.ts` and set base canonical URL in `layout.tsx` metadata.

### Performance & LCP / CLS
- [ ] **Logo Priority & Dimensions**: Add `priority` prop to header logo image in `src/app/components/site-header.tsx` and ensure `sizes` attribute is provided for modern display density.
- [ ] **Hero Video Resource Hints**: Add `fetchPriority="high"` or preload hints for above-fold poster image in `src/app/components/home/hero.tsx`.

### Accessibility (WCAG 2.2 AA)
- [ ] **Interactive Control Contrast**: Enhance contrast for video playback toggle controls on dark overlays.
- [ ] **Carousel Keyboard Focus Indicators**: Ensure focus rings are clearly visible on custom dot pagination buttons across light/dark sections.

