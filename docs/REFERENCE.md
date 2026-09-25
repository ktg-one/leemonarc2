# Lee Monarc reference contract — 25 September 2026

This replaces the earlier architectural redesign direction. The client's current instruction is a Paraform-faithful public site adapted to Lee Monarc, retaining its light → dark → light sequence. Do not make the entire site dark.

## Source and evidence": ./public/$n.png

- Live reference: https://www.paraform.com/, inspected through BrowserSkill.
- Figma: https://www.figma.com/design/zoZ3ogX2leObqLTo2vSHNl/LeemonArc?node-id=1-18
- Hero 1:18; long light composition 20:821; alternate dark sections 20:8. Figma contains incorrect recruiting copy, unsupported statistics, invented team and proof, and overlapping hero frames. It is a layout reference, not factual authority.
- Canonical proposed copy: `docs/LeeRevised September 2026.docx`; Section 13 records unconfirmed facts. Do not turn proposed copy into verified claims.
- Captures under `artifacts/reference/`: desktop hero, feature carousel, dark feature grid and mobile hero. Full-page capture timed out; do not claim a full-page capture.
- BrowserSkill host doctor passes. A scoped approved host command connects to the existing daemon without ACL changes. example.com failed DNS; Paraform navigation, semantic reads, screenshots and interactions succeeded.

## Visual contract

At a 1453 CSS-pixel viewport: content approximately 1248px wide; 50px/52.5px display hero, 48px/52.8px section headings, 22px/26.4px sans card headings, 16px body. Reference proprietary fonts are Bureau Serif/Sans. Use Figma's Newsreader + existing Manrope as available substitutes; record this difference, do not claim identical typefaces. Light background #f5f8f6, dark #1a1a1a, translucent dark cards #272727, 10px corner radii, white pill CTAs. Use supplied Lee Monarc marks and restrained brass accents.

## Section mapping (fixed order)

1. Thin announcement; transparent navigation over full-width video hero. Lee Monarc headline, supporting copy, enquiry pill, optional illustrative advisory notification. Approximately 655px visual hero at reference desktop width; no boxed inset hero.
2. Light logo/proof strip. For preview, use explicit client-logo placeholders, never Paraform company logos as Lee Monarc clients.
3. Light centered services introduction.
4. Four-state feature carousel: left copy/controls/large index; central illustrated card; right support/proof card. Map to accounting, cashflow/advisory, major decisions, ongoing support. Six actual services remain linked.
5. Centered light enquiry CTA.
6. Light story carousel. Three visibly labelled client-story placeholders, preserving composition without manufactured quotes/results.
7. Dark introduction + centered advisor/profile carousel composition. Use Vivienne text/brand placeholder; extra cards must be service perspectives, not invented staff.
8. Dark feature grid: wide copy-left/visual-right card, then large left card and two stacked right cards. Map to cashflow, accounting/tax, business structuring and acquisition/exit decisions.
9. Dark centered enquiry CTA.
10. Return to light: six selectors and central proof/content panel. Use six service areas until real client proof arrives; label proof placeholder separately.
11. Wide image closing CTA and light multicolumn footer. Preserve existing route inventory and contact details.

## Motion and controls

- Desktop feature carousel has four direct selectors and pause/resume. Sampled aria-current changes at 5571ms then 11558ms after initial observation: approximately 6000ms cadence. Clicking a selector activates it immediately and restarts its display interval. Left copy and central/right visuals change together. Use 6000ms as the shared observed cadence.
- Mobile reference renders the feature states vertically instead of squeezing a desktop carousel. Show all four stories in document flow under 768px; do not hide essential copy without JS.
- Story carousel has three selectors and clickable video tiles. In this preview no testimonial video exists: keep labelled placeholder visual tiles and functional selectors, do not create fake play buttons/modal playback. Keyboard/touch supported.
- Dark cards contain Rive canvas animation, layered UI cards and an embedded portrait video. This is confirmed by rendered DOM and screenshot, not generic CSS hover effects. The canvas exposes no CSS/WAAPI timeline; exact internal Rive durations cannot be extracted from DOM. Reconstruct the visible layered UI as local HTML/CSS illustrations using the observed 6000ms feature cadence; this is an explicitly documented adaptation, not a claim of asset-identical Rive playback. No invented independent random timings. Use small transforms/opacity; no layout animation.
- Dark introduction uses centered overlapping portrait-card composition; adapt to advisory topics with a clearly marked portrait placeholder.
- Closing proof selectors update central content directly. No automated cycling is necessary without observed evidence.
- Use local state per module; stop automatic loops offscreen and when the document is hidden. Honor pause and reduced-motion; reduced motion renders complete stable content. Manual controls remain available.
- Hero: muted inline loop with pause/resume when media is supplied; poster fallback on missing/error/reduced motion. Reserve height before media loads. Decorative video does not convey essential copy.

## Shared worker interfaces

- Agent A exports `Hero` from `src/components/home/hero.tsx` and owns hero.css + `src/content/hero-media.ts`.
- Agent B exports `LightSections` from `src/components/home/light-sections.tsx` and owns its CSS.
- Agent C exports `DarkSections` from `src/components/home/dark-sections.tsx` and owns its CSS; includes dark modules then returning-light proof and closing CTA.
- Lead owns `Home` assembly, header/footer, global styles/tokens, layout/fonts, dependencies, content-wide integration and docs.
- Shared classes: `.section-shell` (1248px maximum), `.home-section` (vertical rhythm), `.home-heading`, `.home-kicker`, `.pill-link`, `.review-placeholder`. Worker styles must be prefixed `lm-hero`, `lm-light`, `lm-dark` (and `lm-proof`/`lm-closing` for C). No global h1/h2/button overrides in worker CSS.
- Keep Next/React/TypeScript and CSS; no Tailwind, new animation library, form backend or public publish.

## Placeholder and release register

- Hero video: awaiting client; Kevin will supply a temporary video. Existing architecture image may be the poster; it is not the client's office.
- Portrait, customer logos, testimonial videos and client results: missing. Use expressly labelled placeholders in review, no generated people presented as actual team/clients.
- Chartered Accountant, experience, biography/first-person copy, public email, service scope and privacy wording remain client-review items per copy deck.
- All CTAs use `/contact`, existing email/phone, or the relevant existing service route. No simulated form success, portal/login or recruitment software.
- Eleven marketing routes + provisional privacy route + not-found presentation retained. No public publishing in this task.
