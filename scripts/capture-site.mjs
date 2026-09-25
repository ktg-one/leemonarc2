import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts/visual", { recursive: true });
const browser = await chromium.launch();
for (const width of [1440, 768, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: `artifacts/visual/home-${width}.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `artifacts/visual/hero-${width}.png` });
  console.log(
    JSON.stringify({
      width,
      title: await page.title(),
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      errors,
    }),
  );
  await page.close();
}
await browser.close();
