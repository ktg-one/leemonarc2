import { chromium } from "@playwright/test";

// [DEBUG-drift] Reproduce: reload while scrolled mid-page; track scrollY +
// page height over time. Scene activation inflating page height after scroll
// restoration makes the position drift on every reload.
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo({ top: 3000, behavior: "instant" }));
await page.waitForTimeout(300);

for (let reload = 0; reload < 3; reload++) {
  await page.reload({ waitUntil: "commit" });
  const samples = [];
  for (const t of [0, 100, 200, 400, 800, 1500]) {
    if (t) await page.waitForTimeout(t - [0, 0, 100, 200, 400, 800][[0, 100, 200, 400, 800, 1500].indexOf(t)]);
    samples.push(
      await page.evaluate(() => ({
        y: Math.round(window.scrollY),
        h: document.documentElement.scrollHeight,
      })),
    );
  }
  console.log(`reload ${reload + 1}:`, JSON.stringify(samples));
}
await browser.close();
