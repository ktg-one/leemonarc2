# Motion contract — 25 September 2026

`REFERENCE.md` records the observed source behaviour and its limits. The earlier pinned perspective/monogram studies remain in the repository but are no longer mounted on the homepage. Their pre-paint scroll-height script is no longer active. There is no global scroll engine or hidden-until-JavaScript copy.

## Current behaviours

- Hero media is configurable and replaceable. It uses muted inline loop playback when a video exists, a reserved layout, an accessible pause control, and a poster for missing/failed media and reduced motion. Kevin is supplying a placeholder while the final client video is pending.
- Desktop feature rotation has four states, direct selection and pause/resume. The observed reference cadence is about 6000ms. Mobile presents all four narratives vertically. Manual choices are immediately reflected in the visual and copy.
- Story/selector modules expose labelled controls and retain static content. Missing media has no deceptive play affordance.
- Dark illustrations recreate layered card movement using local HTML/CSS and state. Paraform uses Rive canvas and portrait video here. Exact proprietary canvas timing was not available from the DOM, so this implementation is an explicitly documented reconstruction on the measured six-second cadence, not a reproduction of the original animation assets.
- Automatic motion stops offscreen, when the document is hidden, when paused, and for reduced-motion users. Manual selection remains functional. Transform/opacity changes reserve geometry and avoid moving page layout.

## Verification

Inspect every state, including pause/resume, manual selection, re-entry after scrolling away, touch layout, failed autoplay/video and runtime reduced-motion changes. A successful compile is not motion verification. Capture real browser evidence and keep visual differences documented in the handoff.
