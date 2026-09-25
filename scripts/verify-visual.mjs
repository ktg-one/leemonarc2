import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3101";
await mkdir("artifacts/production", { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const width of [1440, 768, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.__layoutShift = 0;
    window.__lcp = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__layoutShift += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `artifacts/production/hero-${width}.png` });
  const metrics = await page.evaluate(() => ({
    lcpMs: Math.round(window.__lcp),
    cls: window.__layoutShift,
  }));
  for (const id of ["expertise", "perspective", "vivienne"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `artifacts/production/${id}-${width}.png` });
  }
  const scene = page.locator("#perspective");
  for (let i = 0; i < 3; i++) {
    await page.locator(".perspective-controls button").nth(i).click();
    if (i === 2) {
      await page.waitForTimeout(220);
      await page
        .locator(".perspective-experience")
        .screenshot({
          path: `artifacts/production/scene-transition-${width}.png`,
        });
    }
    await page.waitForTimeout(1000);
    await page
      .locator(".perspective-experience")
      .screenshot({ path: `artifacts/production/scene-${i}-${width}.png` });
  }
  if (width === 1440) {
    const frames = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const intervals = [];
          let previous = performance.now();
          document.querySelectorAll(".perspective-controls button")[0].click();
          function tick(now) {
            intervals.push(now - previous);
            previous = now;
            if (intervals.length < 60) requestAnimationFrame(tick);
            else resolve(intervals.slice(1));
          }
          requestAnimationFrame(tick);
        }),
    );
    metrics.animationFramesOver34ms = frames.filter(
      (value) => value > 34,
    ).length;
    metrics.sampledFrames = frames.length;
  }
  const homeOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).not.toHaveAttribute("data-scroll-scene", "true");
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `artifacts/production/home-full-${width}.png`,
    fullPage: true,
  });
  await page.goto(`${baseURL}/contact`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: `artifacts/production/contact-${width}.png`,
    fullPage: true,
  });
  const contactOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  results.push({ width, homeOverflow, contactOverflow, metrics, errors });
  await page.close();
}
await browser.close();
await writeFile(
  "artifacts/production/verification.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
