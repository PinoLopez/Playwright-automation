import { test, expect } from '@playwright/test';

test('Verify the infobox website link', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Synergy_(software)', { timeout: 120000 });
  // Wait for the title "Synergy (software)"
  const title = page.getByRole('heading', {
    name: /Synergy \(software\)/i,
  });
  await expect(title).toBeVisible();
  // Verify the website link is present
  const websiteLink = page.getByRole('link', {
    name: /symless\.com\/synergy/i,
  });
  await expect(websiteLink).toBeVisible();
  await expect(websiteLink).toHaveAttribute('href', /symless\.com\/synergy/);
  console.log('Infobox website link verified correctly.');
});

test('Verify Design section', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Synergy_(software)', { timeout: 120000 });
  const designHeading = page.getByRole('heading', {
    name: /Design/i,
  });
  await expect(designHeading).toBeVisible();
  console.log('Design section verified correctly.');
});

test('Verify History section', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Synergy_(software)', { timeout: 120000 });
  const historyHeading = page.getByRole('heading', {
    name: /History/i,
  });
  await expect(historyHeading).toBeVisible();
  console.log('History section verified correctly.');
});

test('Verify External links', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Synergy_(software)', { timeout: 120000 });
  const referencesHeading = page.getByRole('heading', {
    name: /References/i,
  });
  await expect(referencesHeading).toBeVisible();
  // Verify at least one external link is present in the references
  const externalLink = page.locator('.references a.external').first();
  await expect(externalLink).toBeVisible();
  await expect(externalLink).toHaveAttribute('href', /.*/);
  console.log('External links verified correctly.');
});

