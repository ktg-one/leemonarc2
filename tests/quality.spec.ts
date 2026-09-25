import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 768, 1440]) {
  for (const path of ["/", "/contact"]) {
    test(`${path} is accessible and stays within ${width}px`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      for (const image of await page.locator("img").all())
        await image.scrollIntoViewIfNeeded();
      await expect.poll(async () =>
        page.evaluate(() =>
          Array.from(document.images)
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src),
        ),
      ).toEqual([]);
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test("owner questions expand using keyboard interaction", async ({ page }) => {
  await page.goto("/");
  const question = page.locator(".lm-light-question-grid details").first();
  await question.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("open", "");
  await expect(question.getByText("Growth can disguise pressure.")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(question).not.toHaveAttribute("open", "");
});

test("no-JavaScript visitors retain all essential content and navigation", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Profit on paper won’t pay next month’s wages." })).toBeVisible();
  const question = page.locator(".lm-light-question-grid details").first();
  await question.locator("summary").click();
  await expect(question.getByText("Growth can disguise pressure.")).toBeVisible();
  await page.getByText("Menu", { exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Tell us what’s on your mind" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "What’s on your mind?",
  );
  await context.close();
});

test("keyboard skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("cold load renders the hero without layout shift", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => {
    const win = window as unknown as { __cls: number };
    win.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        win.__cls += (entry as PerformanceEntry & { value: number }).value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  expect(
    await page.evaluate(() => (window as unknown as { __cls: number }).__cls),
  ).toBeLessThan(0.01);
});

test("reduced motion removes pinning and animated geometry", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-scroll-scene",
    "true",
  );
  const duration = await page
    .locator(".lm-dark-float")
    .first()
    .evaluate((element) => getComputedStyle(element).animationDuration);
  expect(parseFloat(duration)).toBeLessThan(0.05);
});
