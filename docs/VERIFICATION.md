# Prototype verification

## Result

Production build succeeded. ESLint and TypeScript checks passed. **18 Playwright tests passed against the production server**, including asset loading, both routes, desktop scroll behaviour, manual stage selection, keyboard disclosure/menu controls, pointer cursor, touch context, no-JavaScript access and reduced motion.

Six axe checks (homepage/contact × 360/768/1440px) found no violations for the selected WCAG A/AA tags. This is automated coverage, not a full accessibility certification or manual screen-reader audit.

## Visual verification

Local Chromium captures cover full-page composition, each principal section, all three perspective states, an intermediate animation state and both routes at 360, 768 and 1440px. The bounded correction improved mobile hero fit and body-copy readability. No horizontal overflow or page exceptions were observed. Tests also check HTTP failures and console errors for page assets.

The original four supplied logo PNGs match the public copies byte-for-byte using SHA-256 comparison. The favicon is a copy of the supplied light monogram.

## Local measurements

Unthrottled local measurements in `artifacts/production/verification.json`:

| Viewport | LCP (ms) | CLS |
| --- | --- | --- |
| 1440 | 96 | 0 |
| 768 | 76 | 0.023482283635854723 |
| 360 | 88 | 0.019824799913194444 |

During one desktop transition sample, none of 59 sampled frame intervals exceeded 34ms. These are local diagnostic observations, not Lighthouse scores, field Core Web Vitals, or claims about customer devices/network conditions.

## Reproduction

- Build: `npm run build`
- Code: `npm run lint` and `npm run typecheck`
- Browser: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npm test`
- Visuals: `node scripts/verify-visual.mjs`
- Design token lint: `npx -y -p @google/design.md designmd lint docs/DESIGN.md` (zero errors/warnings)

## Boundaries

The contact links are verified destinations, not a test call or a sent email. No external publication, commit or push occurred. Safari/Firefox and real-device testing remain pre-launch checks. Copy and current business details still require client approval. See HANDOFF.md for launch decisions and the ESLint compatibility caveat.
