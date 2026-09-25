import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("artifacts/reference", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
try {
  await page.goto("https://www.paraform.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3500);
  await page.screenshot({
    path: "artifacts/reference/paraform-top.jpg",
    type: "jpeg",
    quality: 85,
  });
  console.log(
    await page.evaluate(() => ({
      title: document.title,
      text: document.body.innerText.slice(0, 1800),
      fonts: [
        ...new Set(
          [...document.querySelectorAll("h1,h2,p")]
            .slice(0, 40)
            .map((e) => getComputedStyle(e).fontFamily),
        ),
      ],
    })),
  );
  for (const [name, y] of [
    ["middle", 1100],
    ["lower", 2200],
  ]) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1800);
    await page.screenshot({
      path: `artifacts/reference/paraform-${name}.jpg`,
      type: "jpeg",
      quality: 85,
    });
  }
  await writeFile(
    "artifacts/reference/paraform-notes.json",
    JSON.stringify(
      await page.evaluate(() => ({
        title: document.title,
        headings: [...document.querySelectorAll("h1,h2,h3")].map(
          (e) => e.textContent,
        ),
        animationCount: document.getAnimations().length,
      })),
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
