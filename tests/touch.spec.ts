import { test, expect } from "@playwright/test";

test("touch navigation keeps native interaction and disables the decorative cursor", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".cursor-ring")).toBeHidden();
  await expect(page.locator(".cursor-dot")).toBeHidden();
  await page.getByText("Menu", { exact: true }).tap();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Tell us what’s on your mind" })
    .tap();
  await expect(page).toHaveURL(/\/contact$/);
  await context.close();
});
