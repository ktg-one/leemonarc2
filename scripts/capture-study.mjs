import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts/visual", { recursive: true });
const browser = await chromium.launch();
for (const width of [1440, 768, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
  const info = await page.evaluate(() => {
    const section = document.querySelector("#vivienne");
    const art = section.querySelector(".adviser-art");
    return {
      top: section.getBoundingClientRect().top + window.scrollY,
      travel: section.clientHeight - art.clientHeight,
      scene: section.dataset.scrollScene === "true",
    };
  });
  for (const progress of [0, 0.5, 0.95]) {
    await page.evaluate(
      ([top, travel, p]) =>
        window.scrollTo({ top: top + travel * p, behavior: "instant" }),
      [info.top, info.travel, progress],
    );
    await page.waitForTimeout(1100);
    await page.screenshot({
      path: `artifacts/visual/study-${width}-${progress * 100}.png`,
    });
  }
  console.log(JSON.stringify({ width, ...info }));
  await page.close();
}
const reduced = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await reduced.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
await reduced.evaluate(() => {
  const section = document.querySelector("#vivienne");
  window.scrollTo({
    top: section.getBoundingClientRect().top + window.scrollY - 80,
    behavior: "instant",
  });
});
await reduced.waitForTimeout(400);
await reduced.screenshot({ path: "artifacts/visual/study-reduced.png" });
console.log(
  JSON.stringify({
    reduced: true,
    scene: await reduced.evaluate(
      () => document.querySelector("#vivienne").dataset.scrollScene === "true",
    ),
  }),
);
await browser.close();
