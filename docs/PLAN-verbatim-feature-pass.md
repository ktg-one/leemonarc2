# Verbatim Feature Pass — Homepage vs. Client Deck

**Status:** item 1 of 8 DONE (hero pill strip, commit `6666e46`). Items 2–8 below are ready for Jules to implement iteratively.
**Goal:** the client asked for the site **verbatim, feature for feature** against her page sequence. Mirror her structure exactly. Where her deck marks content `(REPLACE)`, fill it with Lee Monarc copy from `artifacts/copy/*.txt` (extracted from `docs/LeeRevised September 2026.docx`) or keep a labelled placeholder. **Never** copy Paraform's recruiting copy, client names (Palantir, Basis, Rippling, Decagon, Abridge, etc.), staff, or statistics ($14.2B AUM, Swiss Custody, 24h SLA, $283,050, 2.7M profiles).

**Homepage assembly:** `src/app/page.tsx` → `Hero` (`src/components/home/hero.tsx` + `hero.css`), `LightSections` (`light-sections.tsx` + `.css`), `DarkSections` (`dark-sections.tsx` + `.css`). Tokens: `src/app/tokens.css`. Shell: `src/app/refresh.css`.

**Verification for every item:** `npx tsc --noEmit`, `npx playwright test` (21 tests incl. axe accessibility at 768px and 1440px — keep them green; contrast on dark bg must stay ≥ 4.5:1 for small text), then a screenshot into `artifacts/visual/`. Commit with a conventional message (`feat(scope): …`).

---

## Visual reference — Paraform source screenshots

The client supplied full-page captures of the reference site at `public/1.png` … `public/8.png` (also in `artifacts/reference/`). Match the **layout grammar**, never the content:

| File | Shows | Deck item |
|---|---|---|
| `public/1.png` | Dark video hero, headline, email pill, brand row start | 1 — Hero |
| `public/2.png` | 2-row brand card grid; "Companies" badge + display title + body | 2 — Brand Grid & Editorial |
| `public/3.png` | Giant stat ("3x") + email CTA; "Testimonials" badge + title | 3/4 — giant display word; 4 — banner carousel start |
| `public/4.png` | Testimonial banner carousel (photo cards, quotes, "Read customer story" pills) → melt to dark | 4 — Banner Carousel & Melt |
| `public/5.png` | Team carousel: center card with monetary overlay, dimmed side cards | 5 — Team 3D (DONE, commit `21d91f0`) |
| `public/6.png` | Dark 4-cell bento: editorial TL, video-call mockup TR, fee breakdown BL, search bar BR | 6 — Bento Matrix |
| `public/7.png` | Dark banner break (email pill) + mountain backdrop, underline timeline tabs, quote | 6.5/7 — Banner Break & Timeline Quotes |
| `public/8.png` | Closing: centered headline over wide landscape art card + email pill; 4 link columns + brand column | 8 — Close & Footer |

**Important:** `public/` is served by the site — these screenshots are publicly reachable at `/1.png` etc. on any deployment. Before anything goes to production, move them out of `public/` (e.g. into `artifacts/reference/` only).

---

## 2. Page 1 — Brand Grid & Editorial Quote 〔TODO〕

**Deck spec:** top **2×8 card grid** (16 rounded brand cards, 2 rows, fading downward), then an editorial block: badge (REPLACE), high-contrast display title (REPLACE), body copy, trust metrics row.

**Current state:** `LightSections` opens with `.lm-light-logos` — a single row of 5 generic "Client logo" placeholders (`light-sections.tsx` ~line 131).

**Build:**
- Replace the single row with a **2-row × 8-column grid** of rounded cards (16 total), CSS-mask fade toward the bottom row.
- Cards stay placeholder branded chips — real logos are client-supplied. Keep the `review-placeholder` labelling ("Client brand cards · approval pending").
- Under it, the editorial block already exists (`.lm-light-intro` heading + body) — add the **badge line** above the heading and a **trust-metrics row** beneath (three metric cells). Do NOT invent numbers: label them, e.g. "Years in practice · pending", "Clients advised · pending", "Response time · pending", until Vivienne supplies figures.
- Copy for title/body: `artifacts/copy/01-home.txt`.

## 3. Page 2 — 1/3-to-2/3 Split & Carousel Flow 〔TODO〕

**Deck spec:** **1/3 left column** — feature copy (REPLACE), interactive **scrubber slider**, giant "REPLACE" conversion display word. **2/3 right column** — dynamic 3-stage card with visual avatar, match-criteria tags, tabbed actions. Bottom centered display line + CTA.

**Current state:** `.lm-light-features` is a full-width rotating feature panel with dots — not a 1/3–2/3 split, no scrubber, no giant display word.

**Build:**
- Restructure to a grid: `grid-template-columns: 1fr 2fr`.
- Left: feature copy from `01-home.txt` + a **scrubber** (a range-style slider that scrubs through the stages — reuse the existing auto-rotation state; dragging pauses auto-advance) + a **giant display word/number** in the display font (e.g. the active stage's keyword at `clamp(56px, 8vw, 120px)`; use real stage words from the copy, not "REPLACE").
- Right: a 3-stage card — for Lee Monarc the honest mapping is the **decision journey**: stage 1 "The question", stage 2 "The numbers", stage 3 "The decision". Each stage: title, 2–3 criteria tags (from copy), and tabbed action links to the relevant service page. "Avatar" slot: use a neutral icon/initial block, NOT a fake person photo — label it.
- Bottom: centered display line + `pill-link` CTA (pattern exists in `.lm-light-cta`).
- Keep the existing pause/hover/focus/reduced-motion gating patterns from `LightSections`.

## 4. Page 4 — Banner Carousel & Melt to Dark 〔TODO〕

**Deck spec:** horizontal **banner carousel** — wide photographic cards, center card full colour/focus with a client quote, flanking cards dimmed/desaturated. Then **melt to darkmode**: seamless gradient cream → midnight obsidian, headline (REPLACE), **3 advisory pillar cards**.

**Current state:** `.lm-light-beliefs` is a 4-card text carousel (no photography, no client quote — correctly labelled). Melt: `.lm-dark` grid opens the dark half with mixed tiles.

**Build:**
- Convert the beliefs carousel into a **banner** carousel: full-width-ish wide cards (~70% viewport), center active, flanks dimmed via `filter: saturate(.4) brightness(.7)` and scale — this is the one place opacity-dimming is fine because the flanks are decorative previews; the axe contrast rule applies to the center card's text, which stays full contrast.
- Center card carries a **client quote slot** — keep the existing labelled placeholder ("Approved client words will appear here") until supplied. Photography: placeholder art with label; no stock-photo fakes of fake clients.
- Melt: add a gradient transition band at the top of `.lm-dark` (cream → obsidian, ~120px) and make the first dark content **exactly 3 pillar cards** (the deck's melt has 3 pillars; current dark grid starts with a wide card + 2 tiles — restructure the top of `DarkSections` so the melt lands on 3 pillar cards: e.g. Accounting & tax · Advisory · Major decisions, copy from `01-home.txt`).

## 5. Page 5 — Team 3D Depth Carousel 〔DONE — do not rebuild〕

Committed as `21d91f0` (infinite 3D coverflow, Vivienne centerpiece + 4 advisory focus slides, after the light area). **Only remaining work:** when Vivienne supplies a real headshot, restore the `<Image>` portrait in `dark-sections.tsx` (the current `vivienne-profile.jpg` is a solid black file — do not reuse it).

## 6. Page 6 — Darkmode 4-Card Matrix Bento 〔TODO〕

**Deck spec:** 2×2 bento — **top-left** pillar badge + editorial paragraph; **top-right** video-call mockup with calibration + role-matched notifications; **bottom-left** live reward/fee calculation breakdown ($283,050 projected rewards); **bottom-right** duo card with centered search bar ("Search across 2.7M profiles…").

**Current state:** `.lm-dark-grid` has a wide card, two small tiles, a video tile, and a decisions strip — not the 4-cell matrix.

**Build (cells mapped to Lee Monarc equivalents — the recruiting concepts have no equivalent, keep the cell shapes):**
- **Top-left:** pillar badge ("Advisory pillars") + editorial paragraph from copy. Straightforward.
- **Top-right:** **advisory call mockup** — reuse/extend the existing `.lm-video-mockup` styles into a video-call frame with two labelled notification chips (e.g. "Agenda: cashflow forecast", "Decision ready: hire timing"). Label the module "Illustrative".
- **Bottom-left:** **fee/engagement estimate breakdown** — an itemised illustration (e.g. "Monthly accounting · $X", "Advisory session · $Y", "Total · $Z") clearly labelled "Illustrative pricing · confirmed on enquiry" — NEVER the deck's $283,050 figure.
- **Bottom-right:** **duo card + search** — two stacked mini-cards (e.g. "Find a service" / "Read the approach") above a centered search input that filters the services list client-side (or links to `/services` with a query). Placeholder text like "Search accounting, advisory, structuring…" — NOT "2.7M profiles".

## 7. Pages 6.5 & 7 — Banner Break & Timeline Quotes 〔TODO〕

**Deck spec:** 6.5 = dark banner break, centered headline (REPLACE) + email CTA. 7 = panoramic backdrop, **interactive timeline tabs**, dynamic testimonial, impact metrics strip.

**Current state:** `.lm-dark-invite` ("Bring the question.") ≈ the 6.5 break — mostly there. The timeline-quotes section does not exist; `.lm-proof` (service tabs) partially covers "interactive tabs".

**Build:**
- 6.5: keep `.lm-dark-invite`; add an **email CTA** alongside the pill (mailto to the existing site email — check `src/content/site.ts`).
- 7: new section after `.lm-dark-invite`: a tab strip of **4 stages of a client engagement** (e.g. "First conversation · Diagnosis · The work · The outcome" — copy from `01-home.txt` where possible), each tab swapping a testimonial slot + 2–3 metric cells. All testimonial/metric slots labelled placeholders. Backdrop: subtle CSS gradient/pattern — do NOT source Paraform's mountain watercolor; if the client supplies art, drop it in `public/images/` and use `next/image`.

## 8. Final Page — Cinematic Close & 5-Column Footer 〔TODO〕

**Deck spec:** panoramic landscape banner, display headline (REPLACE), centered email pill CTA; **5-column footer** — brand column (logo, registration, legal) + 4 nav columns.

**Current state:** `.lm-closing` is a minimal CTA; footer lives in the site shell (`src/app/layout.tsx` / chrome components — locate the footer markup).

**Build:**
- Closing: keep light; widen into a banner-style block (background art = labelled placeholder; headline from copy: "What's the decision on your mind?" already exists).
- Footer: restructure to **5 columns** — (1) brand: logo, ABN/registration line (use real details from `artifacts/copy/04-about-us.txt` if present, else labelled), legal links (Privacy exists at `/privacy`); (2) Services — the 6 service links; (3) Advisory — who-we-help, fractional CFO, business acquisition; (4) Company — About, Contact; (5) Insights — link placeholder (no /insights route exists; label it "Coming soon" or omit the link, keep the column with the label). Column headings must NOT be Paraform's ("Product / Use Cases / Specialties / Company") — use the Lee Monarc groupings above.
- Keep the existing email/phone from `src/content/site.ts` — do not change contact details.

---

## Standing rules for every item

1. **Copy source of truth:** `artifacts/copy/*.txt` → if a phrase isn't there, it doesn't go on the site; use a labelled placeholder instead.
2. **Placeholders** use the existing `.review-placeholder` chip style and say what's pending ("Client to supply", "Approval pending").
3. **No fabrication:** no invented staff, clients, statistics, prices (label illustrative pricing), or success metrics.
4. **Routes/contact unchanged.** No fake form success. No production deploys — previews only, via `npx vercel` (never `--prod` unless Kevin explicitly asks).
5. **Accessibility is a hard gate:** the axe suite (`tests/quality.spec.ts`) runs on `/` at 768px and 1440px. Any new interactive control needs a real label; text contrast ≥ 4.5:1 (4.5:1 failures have bitten twice — see commit `2e1f51a`).
6. **Do not touch** the team carousel (`dark-sections.tsx` team section) beyond the portrait swap, and do not reintroduce the ThreeUI cartoon carousel (`scene.tsx` is deleted; `src/shaders/character-carousel/` and the `@designcodeio/threeui` dependency are dead code awaiting removal — see below).
7. **Watch for external edits:** another process on this machine has been resurrecting deleted files and staging them (it brought back `scene.tsx` once). Before committing, run `git status` and `git diff --cached` and make sure nothing unwanted is staged.

## Optional cleanup (after items 2–8 land)

- Delete dead code: `src/shaders/character-carousel/`, `src/shaders/index.ts` exports, and remove `@designcodeio/threeui` from `package.json` (both `package-lock.json` and `bun.lock` exist — keep them consistent).
- The black image files `public/images/vivienne-profile.jpg` and `assets/2.jpg` (both solid black) should be replaced with the real portrait when supplied, or removed.
