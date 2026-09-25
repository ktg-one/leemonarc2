// Motion is enhancement only. Keep this query in sync with the pre-paint
// gate in src/app/layout.tsx (scrollSceneGate) and the html[data-scroll-scene]
// selectors in perspective.css and monogram-study.css.
export const motion = {
  scrollSceneQuery:
    "(min-width: 900px) and (min-height: 750px) and (prefers-reduced-motion: no-preference)",
  cursorQuery:
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  cursorFollow: 0.2,
  cursorSettleDistance: 0.2,
};
