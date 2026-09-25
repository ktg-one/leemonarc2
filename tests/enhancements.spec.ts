import { test, expect } from "@playwright/test";

test("circle and dot follow the pointer but switch off for reduced motion", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.mouse.move(400, 300);
  await expect(page.locator(".cursor-ring")).toHaveCSS("opacity", "1");
  await page.mouse.move(700, 400);
  await expect
    .poll(async () => {
      const dot = await page.locator(".cursor-dot").boundingBox();
      return dot ? Math.abs(dot.x + dot.width / 2 - 700) : 999;
    })
    .toBeLessThan(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".cursor-ring")).toBeHidden();
  await expect(page.locator(".cursor-dot")).toBeHidden();
});

test("mobile menu opens, navigates and closes with the keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const menu = page.locator(".mobile-menu");
  await page.getByText("Menu", { exact: true }).click();
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await page.getByText("Menu", { exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About us" })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(menu).not.toHaveAttribute("open", "");
});
