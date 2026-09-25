import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts/visual", { recursive: true });
const browser = await chromium.launch();
for (const width of [1440, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
  // The watermark rise spans the final 1100px of page scroll — capture
  // just before it starts, mid-rise and at the page bottom.
  for (const ratio of [0.86, 0.93, 1]) {
    await page.evaluate((ratio) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: max * ratio, behavior: "instant" });
    }, ratio);
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `artifacts/visual/cta-${width}-${Math.round(ratio * 100)}.png`,
    });
  }
  await page.close();
}
const reduced = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await reduced.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
await reduced.evaluate(() =>
  window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
);
await reduced.waitForTimeout(400);
await reduced.screenshot({ path: "artifacts/visual/cta-reduced.png" });
await browser.close();
console.log("done");
