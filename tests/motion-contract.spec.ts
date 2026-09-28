import { test, expect, type Page } from "@playwright/test";

/*
 * Motion contract: fails if the homepage is flattened into a static site.
 * Each check targets a feature from docs/PLAN-verbatim-feature-pass.md.
 * Run: npm run lint:motion
 */

const REQUIRED_SECTIONS = [
  ".lm-hero",
  ".lm-light-brand-grid",
  ".lm-light-features",
  ".lm-light-beliefs",
  ".lm-light-stories",
  ".lm-dark",
  ".lm-proof",
  ".lm-closing",
];

async function load(page: Page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test.describe("motion contract", () => {
  test("every feature-list section is present", async ({ page }) => {
    await load(page);
    for (const selector of REQUIRED_SECTIONS) {
      await expect(page.locator(selector).first(), `missing section ${selector}`).toBeAttached();
    }
  });

  test("keyframe animations are running", async ({ page }) => {
    await load(page);
    const running = await page.evaluate(
      () => document.getAnimations().filter((a) => a.playState === "running").length,
    );
    expect(running, "no running CSS/WAAPI animations").toBeGreaterThanOrEqual(2);
  });

  test("hero video and WebGL canvas are mounted", async ({ page }) => {
    await load(page);
    await expect(page.locator(".lm-hero video, main video").first()).toBeAttached();
    await expect(page.locator("main canvas, header canvas").first()).toBeAttached();
  });

  test("3D carousel keeps preserve-3d depth", async ({ page }) => {
    await load(page);
    const depth = await page.evaluate(
      () =>
        [...document.querySelectorAll("main *")].filter(
          (el) => getComputedStyle(el).transformStyle === "preserve-3d",
        ).length,
    );
    expect(depth, "no preserve-3d elements: 3D carousel flattened").toBeGreaterThanOrEqual(1);
  });

  test("interactive elements have hover transitions", async ({ page }) => {
    await load(page);
    const animated = await page.evaluate(
      () =>
        [...document.querySelectorAll("main a, main button")].filter((el) =>
          getComputedStyle(el)
            .transitionDuration.split(",")
            .some((d) => parseFloat(d) > 0),
        ).length,
    );
    expect(animated, "buttons/links lost their transitions").toBeGreaterThanOrEqual(20);
  });

  test("feature carousel auto-advances on its 6s cadence", async ({ page }) => {
    await load(page);
    const features = page.locator(".lm-light-features");
    await features.scrollIntoViewIfNeeded();
    const current = () =>
      page.evaluate(() => {
        const el = document.querySelector('.lm-light-features [aria-current="true"]');
        return el ? el.getAttribute("aria-label") : null;
      });
    const first = await current();
    expect(first, "feature carousel has no active selector").not.toBeNull();
    await expect.poll(current, { timeout: 9000, intervals: [500] }).not.toBe(first);
  });

  for (const [name, section, cadence] of [
    ["belief", ".lm-light-beliefs", 5000],
    ["story", ".lm-light-stories", 5500],
  ] as const) {
    test(`${name} carousel auto-advances`, async ({ page }) => {
      await load(page);
      await page.locator(section).scrollIntoViewIfNeeded();
      const current = () =>
        page.evaluate((sel) => {
          const el = document.querySelector(`${sel} [aria-current="true"]`);
          return el ? el.getAttribute("aria-label") : null;
        }, section);
      const first = await current();
      expect(first, `${name} carousel has no active selector`).not.toBeNull();
      await expect.poll(current, { timeout: cadence + 3000, intervals: [500] }).not.toBe(first);
    });
  }

  for (const [name, section, cadence] of [
    ["beliefs", ".lm-light-beliefs", 5000],
    ["stories", ".lm-light-stories", 5500],
  ] as const) {
    test(`${name} carousel auto-advances while on screen`, async ({ page }) => {
      await load(page);
      await page.locator(section).scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      const current = () =>
        page.evaluate((sel) => {
          const el = document.querySelector(`${sel} [aria-current="true"]`);
          return el ? el.getAttribute("aria-label") : null;
        }, section);
      const first = await current();
      expect(first, `${name} carousel has no active selector`).not.toBeNull();
      await expect.poll(current, { timeout: cadence + 3000, intervals: [500] }).not.toBe(first);
    });
  }
});

test.describe("client content contract", () => {
  // CANON-BRIEF: Paraform template residue must never ship as Lee Monarc content.
  const BANNED = [
    "Palantir", "Rippling", "Decagon", "Abridge", "Stripe", "Figma", "Notion", "Brex", "Deel",
    "$14.2B", "AUM", "Swiss Custody", "24h SLA", "2.7M", "283,050", "$80,000",
    "Registered Tax Agent", "CA ANZ", "Paraform",
  ];
  for (const path of ["/", "/about", "/services", "/who-we-help", "/contact"]) {
    test(`${path} contains no template residue`, async ({ page }) => {
      await page.goto(path);
      const text = await page.locator("body").innerText();
      const found = BANNED.filter((term) => text.includes(term));
      expect(found, `banned template content on ${path}`).toEqual([]);
    });
  }
});
