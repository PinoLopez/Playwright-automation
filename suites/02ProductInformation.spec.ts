import { test, expect } from '@playwright/test';

test.describe('Wikipedia Aira Compact Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Wikipedia Aira Compact page
    await page.goto('https://en.wikipedia.org/wiki/Aira_Compact', { timeout: 110_000 });
  });

  test('Verify article page structure', async ({ page }) => {
    // Verify Wikipedia logo
    await expect(page.locator('.mw-logo-wordmark')).toBeVisible();
    // Verify article title
    await expect(page.locator('h1#firstHeading')).toHaveText('Aira Compact');
    // Verify search box
    const searchBox = page.locator('input[name="search"]').first();
    await expect(searchBox).toBeVisible();
    console.log('Article structure verified correctly.');
  });

  test('Verify all content sections', async ({ page }) => {
    // List of expected main sections
    const sections = [
      'Release',
      'Design',
      'Reception',
      'References'
    ];
    // Verify each section by its text
    for (const section of sections) {
      const element = page.locator(`h2:has-text("${section}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Section verified: ${section}`);
    }
    console.log('All content sections verified correctly.');
  });

  test('Verify sidebar navigation menu', async ({ page }) => {
    // Open the main menu dropdown
    await page.locator('#vector-main-menu-dropdown-checkbox').click();
    // Wait for menu to be visible
    await page.waitForTimeout(500);
    // List of expected menu links that are actually in the sidebar
    const menuLinks = [
      'Main page',
      'Contents',
      'Current events',
      'Random article',
      'About Wikipedia',
      'Contact us',
    ];
    // Verify each menu link
    for (const link of menuLinks) {
      const element = page.locator(`#vector-main-menu a:has-text("${link}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Menu link verified: ${link}`);
    }
    console.log('Sidebar navigation menu verified correctly.');
  });

  test('Verify page header tabs', async ({ page }) => {
    // Verify main tabs in the header for an article page
    const headerTabs = [
      'Article',
      'Talk',
      'Read',
      'Edit',
      'View history'
    ];
    for (const tab of headerTabs) {
      const tabElement = page.locator(`#p-views a:has-text("${tab}"), #p-associated-pages a:has-text("${tab}")`).first();
      await expect(tabElement).toBeVisible({ timeout: 10000 });
      console.log(`Header tab verified: ${tab}`);
    }
    console.log('Page header tabs verified correctly.');
  });

  test('Verify footer links exist', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Verify important footer links
    const footerLinks = [
      'Privacy policy',
      'About Wikipedia',
      'Disclaimers',
      'Contact Wikipedia',
    ];
    for (const link of footerLinks) {
      const element = page.locator(`#footer a:has-text("${link}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Footer link verified: ${link}`);
    }
    console.log('Footer links verified correctly.');
  });

  test('Verify models subsections', async ({ page }) => {
    // List of expected model subsections
    const models = [
      'T-8 Beat Machine',
      'J-6 Chord Synthesizer',
      'E-4 Voice Tweaker',
      'S-1 Tweak Synth',
      'P-6 Creative Sampler'
    ];
    // Verify each model subsection
    for (const model of models) {
      const element = page.locator(`h4:has-text("${model}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Model subsection verified: ${model}`);
    }
    console.log('Models subsections verified correctly.');
  });
});

