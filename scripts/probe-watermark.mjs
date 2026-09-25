import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

// 1) Early load frames — what the user sees in the first ~1.5s
await page.goto("http://127.0.0.1:3100/", { waitUntil: "commit" });
for (const ms of [150, 500, 1200]) {
  await page.waitForTimeout(ms === 150 ? 150 : ms - (ms === 500 ? 150 : 500));
  await page.screenshot({ path: `artifacts/visual/load-${ms}.png` });
}
await page.waitForLoadState("networkidle");

// 2) Watermark computed style across the final scroll stretch
const probe = await page.evaluate(() => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const banner = document.querySelector(".contact-banner");
  const bannerTop = banner.getBoundingClientRect().top + window.scrollY;
  return { max, bannerTop, bannerHeight: banner.clientHeight };
});
const samples = [];
for (const ratio of [1, 0.95, 0.9, 0.85, 0.8, 0.7]) {
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    probe.max * ratio,
  );
  await page.waitForTimeout(250);
  samples.push(
    await page.evaluate((ratio) => {
      const el = document.querySelector(".contact-watermark");
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        ratio,
        opacity: cs.opacity,
        transform: cs.transform,
        onScreen: rect.top < innerHeight && rect.bottom > 0,
      };
    }, ratio),
  );
}
console.log(JSON.stringify({ probe, samples, errors }, null, 1));
await browser.close();
