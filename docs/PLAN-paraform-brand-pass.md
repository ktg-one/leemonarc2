# Paraform brand pass — task list for agents

Written 2026-10-02. Live site: https://leemonarc2.vercel.app. Reference: https://www.paraform.com.

## Why

The client asked for Paraform "verbatim". We matched the layout but dressed it in a brass "luxury" look. Working theory: she meant the look and feel too. Paraform reads futuristic because it is restrained: one dark colour, white type, flat nav, real video, almost no accent colour. Her brand (navy, gold, serif) fits that if navy replaces Paraform's black and gold is used sparingly.

This brief overrides the brass direction in `docs/DESIGN.md` and `AGENTS.md` for the items below. Everything else in those files still applies.

## Status update, 2026-10-02 (later the same day) — read this first

Kev's read of the client changed: she likes flashy (her first site brief was neon). The "restraint" theory above is unconfirmed and may be wrong. Until she answers the A/B question:

- Kev decided to build the restrained version anyway as a second option, on branch `paraform-brand-pass` only. `main` keeps the gold version.
- **Done on the branch:** tasks 1, 2, 3 and 7, plus hero gold accents switched to white (the advisor name line in the hero card is the one gold accent left).
- **Task 4 is cancelled.** The hero card stays; removing it changes structure.
- **Still open:** 5, 6, 8, 9, 10. Keep effort small; 5 and 6 wait for the client's answer.
- **Do not change the site structure.** No sections added, removed or reordered, and no components deleted. The structure follows Paraform and stays as it is.

## Rules

- Work on a branch off `main` named `paraform-brand-pass`. Do not push to `main`. Do not deploy.
- Copy Paraform's look only. Never use its logo, name, video, Rive animations, fonts, copy, statistics or client logos.
- Do not invent facts, quotes, staff or client proof. Placeholders stay labelled as placeholders.
- Keep changes scoped to the task. Do not refactor neighbouring code.
- Each task is done when lint passes, the Playwright suite passes, and a desktop (1440px) and mobile (375px) screenshot of the changed area is saved under `artifacts/receipts/`.
- If blocked, log the blocker in this file under the task and move to the next one.

## Already done (uncommitted in working tree, commit it first)

- Nav logo is now the icon plus typed text: "LEE MONARC" in Playfair Display, "ACCOUNTING & ADVISORY" in Montserrat. White backing plate removed. Files: `src/app/components/site-header.tsx`, `src/app/refresh.css`, `src/app/layout.tsx`.

## Tasks, in order

1. **Flat nav on the home hero.** In `src/app/refresh.css`, the "Dark hero state" rules give the nav bar a dark glass pill with a gold border, shadow and blur. Make it transparent with no border, shadow or blur while over the hero, like Paraform. Keep the existing light bar once scrolled and on inner pages.
   Verify: at page top the nav has no visible container; links and logo stay readable over the hero.

2. **Kill the gold CTA in the nav.** Same block: "Let's talk" uses a gold gradient with a gold glow. Change to a plain outlined white pill on the hero (transparent fill, thin white border, white text). Scrolled state stays dark fill.
   Verify: no gold gradient or glow anywhere in the nav.

3. **Hero CTA as a white pill.** In `src/app/components/home/hero.tsx` and `hero.css`, make the primary hero button a solid white pill with dark text. Keep the secondary text link.
   Verify: one white pill is the strongest element in the hero.

4. **Remove the "Live advisory preview" card from the hero.** It shows an invented quote under Vivienne Lee's name. Delete the card and any styles and code only it used. Let the headline block sit left as on Paraform.
   Verify: the quote text "Good news! Your cashflow forecast" appears nowhere on the site.

5. **Navy replaces black.** Hero overlay and the dark sections currently use near-black and green-black tones (`#1a1a1a`, `#272727` and similar). Move them to a deep navy family based on the logo navy `#1a253d` (darker for backgrounds, slightly lighter for cards). Change tokens where tokens exist rather than individual rules.
   Verify: no green-black or neutral-black section backgrounds remain; text contrast still meets WCAG AA.

6. **Gold as an accent only.** Audit gold and brass use (`--gold`, `--gold-dark`, `#cca85b`, `rgba(204, 168, 91, …)`). Keep at most one gold element per screen, for example the hero kicker or a thin rule. Remove gold borders, glows, hover fills and gradients elsewhere; use white on dark and navy on light instead. The gold "L" in the logo stays.
   Verify: scroll the home page; no viewport shows more than one gold element besides the logo.

7. **Sector chips without emoji.** The marquee under the hero uses emoji icons (scales, cocktail, heart and so on). Remove the emoji and render flat text chips or flat tiles in the Paraform logo-strip style.
   Verify: no emoji characters in the rendered home page.

8. **Hero media.** The hero is a still photo of a building with trees. Swap in dark, slow, cinematic footage as a muted looping video with the current image as poster. Use only footage with a licence that permits commercial use and record the source and licence in `docs/REFERENCE.md`. If none can be sourced, log a blocker and leave the still.
   Verify: video autoplays muted, pauses with the existing control, respects reduced motion, and the poster shows before load.

9. **Check the blank band below the client-logo strip.** A large empty area appeared there during a fast scroll. Work out whether it is a reveal animation that failed to fire or real empty space, and fix whichever it is.
   Verify: slow and fast scrolling both show content with no empty band taller than the normal section gap.

10. **Check the scrolled-state "Let's talk" button.** It looked washed out once the nav turned light. Confirm whether that is a transition artefact or a contrast bug, and fix if real.
    Verify: button text meets WCAG AA in the scrolled state.

## Not for agents (Kev to send to the client)

- A/B screenshot of old hero versus new hero, with one question: which direction?
- Asset list she owes: hero video, portrait, client logos, approved client stories, sign-off on "Chartered Accountant", "13 years" and the bio.
- A single-colour white version of her logo would be nice to have but is no longer required.
