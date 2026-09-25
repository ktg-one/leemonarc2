import { test, expect } from '@playwright/test';

test('production pages load their styles, scripts and fonts without HTTP or console errors', async ({ page }) => {
  const failures: string[] = [];
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
  page.on('pageerror', error => failures.push(error.message));
  for (const route of ['/', '/contact']) {
    await page.goto(route, { waitUntil: 'networkidle' });
    expect(failures).toEqual([]);
    await expect(page.locator('body')).toHaveCSS('font-family', /Manrope/);
    await expect(page.locator('header')).toHaveCSS('position', 'relative');
  }
});
