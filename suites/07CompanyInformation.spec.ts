import { test, expect } from '@playwright/test';

test.describe('Wikipedia DreamWorks Animation Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to DreamWorks Animation page
    await page.goto('https://en.wikipedia.org/wiki/DreamWorks_Animation', { timeout: 110_000 });
  });

  test('Verify article page structure', async ({ page }) => {
    // Verify Wikipedia logo
    await expect(page.locator('.mw-logo-wordmark')).toBeVisible();
    // Verify article title
    await expect(page.locator('h1#firstHeading')).toHaveText('DreamWorks Animation');
    // Verify search box
    const searchBox = page.locator('input[name="search"]').first();
    await expect(searchBox).toBeVisible();
    console.log('Article structure verified correctly.');
  });

  test('Verify main content sections', async ({ page }) => {
    //only stable Main Sections (H2)
    const sections = [
      'History',
      'References'
    ];

    // Verify each section by its text
    for (const section of sections) {
      const element = page.locator(`h2:has-text("${section}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Section verified: ${section}`);
    }
    console.log('Main content sections verified correctly.');
  });

  test('Verify sidebar navigation menu', async ({ page }) => {
    // Open the main menu dropdown
    await page.locator('#vector-main-menu-dropdown-checkbox').click();
    
    // Wait for menu to be visible
    const menu = page.locator('#vector-main-menu');
    await expect(menu).toBeVisible();
    
    // List of expected menu links
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
      const element = menu.locator(`a:has-text("${link}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Menu link verified: ${link}`);
    }
    console.log('Sidebar navigation menu verified correctly.');
  });

  test('Verify page header tabs', async ({ page }) => {
    // Removed "Edit" because this page is likely semi-protected (shows "View source" instead)
    const headerTabs = [
      'Article',
      'Talk',
      'Read',
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
    const footer = page.locator('#footer');
    await footer.scrollIntoViewIfNeeded();
    
    // Verify important footer links
    const footerLinks = [
      'Privacy policy',
      'About Wikipedia',
      'Disclaimers',
      'Contact Wikipedia',
    ];

    for (const link of footerLinks) {
      const element = footer.locator(`a:has-text("${link}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Footer link verified: ${link}`);
    }
    console.log('Footer links verified correctly.');
  });

  test('Verify corporate infobox details', async ({ page }) => {
    // Wait for the infobox to appear
    const infobox = page.locator('.infobox').first();
    await expect(infobox).toBeVisible();

    const expectedDetails = [
      'Glendale, California', // Headquarters
      'Universal Pictures',   // Parent/Distribution
      'Animation',            // Industry
    ];

    for (const detail of expectedDetails) {
      await expect(infobox).toContainText(detail);
      console.log(`Infobox detail verified: ${detail}`);
    }
    console.log('Corporate infobox details verified correctly.');
  });

  test('Verify major films mentions', async ({ page }) => {
    // verify that the famous movie titles exist in the page content.
    
    const majorFilms = [
      'Shrek',
      'Madagascar',
      'Kung Fu Panda',
      'How to Train Your Dragon',
      'The Boss Baby'
    ];

    const content = page.locator('#mw-content-text');

    for (const film of majorFilms) {
      // Using getByText with exact:false allows finding "Shrek (2001)" etc.
      const element = content.getByText(film, { exact: false }).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Film mention verified: ${film}`);
    }
    console.log('Major films mentions verified correctly.');
  });
});