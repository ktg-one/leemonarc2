import { test, expect } from "@playwright/test";

test("homepage presents the advisory proposition", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Know what your next move means for your money.",
  );
  await expect(page.getByRole("main")).toContainText("Accounting");
});

test("service selectors explain each area without relying on animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("tab", { name: "02 Tax planning and advice" }).click();
  await expect(page.getByRole("tab", { name: "02 Tax planning and advice" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("#lm-proof-panel")).toContainText("Plan ahead");
  await page.getByRole("tab", { name: "04 Fractional CFO and business advisory" }).click();
  await expect(page.locator("#lm-proof-panel")).toContainText("next move");
});

test("feature controls switch the light carousel directly", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Show Major decisions" }).click();
  await expect(page.locator("#lm-light-feature-2")).toHaveAttribute("data-active", "true");
  await page.getByRole("button", { name: "Pause service rotation" }).click();
  await expect(page.getByRole("button", { name: "Resume service rotation" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("dark illustration can be paused", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const visual = page.locator(".lm-dark-visual");
  await visual.getByRole("button", { name: "Pause illustration" }).click();
  await expect(visual).toHaveAttribute("data-paused", "true");
  await expect(visual.getByRole("button", { name: "Resume illustration" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("reduced motion keeps the homepage free of the rejected scroll scene", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveAttribute("data-scroll-scene", "true");
  await expect(page.locator("#perspective")).toHaveCount(0);
  await expect(page.locator("#vivienne")).toHaveCount(0);
});

test("conversation page provides real direct contact details", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Tell us what’s on your mind" }).first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "What’s on your mind?",
  );
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "vivienne@leemonarc.com.au" }),
  ).toHaveAttribute("href", "mailto:vivienne@leemonarc.com.au");
  await expect(
    page.getByRole("main").getByRole("link", { name: "0413 149 137" }),
  ).toHaveAttribute("href", "tel:+61413149137");
});
