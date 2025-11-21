import { test, expect } from '@playwright/test';

test.describe('2025 MotoGP World Championship Wikipedia Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/2025_MotoGP_World_Championship', {
      timeout: 120000
    });
    await page.waitForLoadState('load');
  });

  test('Verify page title', async ({ page }) => {
    // Verify the article title 
    const heading = page.locator('#firstHeading');
    await expect(heading).toBeVisible({ timeout: 10000 });
    await expect(heading).toContainText('2025 MotoGP World Championship');
    console.log('Page title verified successfully');
  });

  test('Verify table of contents', async ({ page }) => {
    // Verify the table of contents 
    const toc = page.locator('#toc, .toc, [role="navigation"]').first();
    await expect(toc).toBeVisible({ timeout: 10000 });
    console.log('Table of contents verified successfully');
  });

  test('Verify riders section', async ({ page }) => {
    // Look for the riders/teams section
    const ridersSection = page.locator('#Teams_and_riders, #Riders');
    await expect(ridersSection).toBeVisible({ timeout: 10000 });
    console.log('Riders section verified successfully');
  });

  test('Verify Marc Márquez information', async ({ page }) => {
    // Verify Marc Márquez is mentioned 
    const content = page.locator('#mw-content-text');
    await expect(content).toContainText('Marc Márquez', { timeout: 10000 });
    console.log('Marc Márquez information verified successfully');
  });

  test('Verify defending champion Jorge Martín information', async ({ page }) => {
    // Verify the defending champion is mentioned
    const content = page.locator('#mw-content-text');
    await expect(content).toContainText('Jorge Martín', { timeout: 10000 });
    console.log('Jorge Martín information verified successfully');
  });

  test('Verify calendar section', async ({ page }) => {
    // Look for the race calendar section
    const calendarSection = page.locator('#Calendar');
    await expect(calendarSection).toBeVisible({ timeout: 10000 });
    console.log('Calendar section verified successfully');
  });

  test('Verify results tables', async ({ page }) => {
    // Verify tables with data exist
    const tables = page.locator('table.wikitable');
    const count = await tables.count();
    expect(count).toBeGreaterThan(0);
    console.log(`Found ${count} results tables`);
  });

  test('Verify reference links', async ({ page }) => {
    // Verify the references section exists
    const refsSection = page.locator('#References');
    await expect(refsSection).toBeVisible({ timeout: 10000 });
    
    // Verify there are reference links
    const refLinks = page.locator('.reflist a, .references a');
    const count = await refLinks.count();
    expect(count).toBeGreaterThan(0);
    console.log(`Found ${count} reference links`);
  });

  test('Verify main teams information', async ({ page }) => {
    const content = page.locator('#mw-content-text');
    
    // Verify main teams are mentioned
    await expect(content).toContainText('Ducati', { timeout: 10000 });
    await expect(content).toContainText('Aprilia', { timeout: 10000 });
    await expect(content).toContainText('Honda', { timeout: 10000 });
    await expect(content).toContainText('Yamaha', { timeout: 10000 });
    await expect(content).toContainText('KTM', { timeout: 10000 });
    
    console.log('Main teams information verified successfully');
  });

  test('Verify season changes section', async ({ page }) => {
    // Look for season changes information
    const content = page.locator('#mw-content-text');
    await expect(content).toContainText('season', { timeout: 10000 });
    console.log('Season changes section verified successfully');
  });

  test('Take full page screenshot', async ({ page }) => {
    await page.screenshot({ 
      path: 'motogp-2025-wikipedia.png',
      fullPage: true 
    });
    console.log('Screenshot saved as motogp-2025-wikipedia.png');
  });

});

