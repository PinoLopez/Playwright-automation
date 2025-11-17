import { test, expect } from '@playwright/test';

test.describe('Wikipedia Main Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to Wikipedia main page
    await page.goto('https://en.wikipedia.org/wiki/Main_Page', { timeout: 110_000 });
  });

  test('Verify main page structure', async ({ page }) => {
    // Verify Wikipedia logo
    await expect(page.locator('.mw-logo-wordmark')).toBeVisible();
    
    // Verify welcome title
    await expect(page.locator('text=Welcome to Wikipedia')).toBeVisible();
    
    // Verify search box
    const searchBox = page.locator('input[name="search"]').first();
    await expect(searchBox).toBeVisible();
    
    console.log('Main structure verified correctly.');
  });

  test('Verify all content sections', async ({ page }) => {
    // List of expected main sections
    const sections = [
      'From today\'s featured article',
      'Did you know',
      'In the news',
      'On this day',
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

  test('Verify search functionality works', async ({ page }) => {
    // Search for "Playwright"
    await page.fill('input[name="search"]', 'Playwright');
    await page.press('input[name="search"]', 'Enter');
    
    // Verify we reached the results page
    await expect(page).toHaveURL(/.*Playwright.*/, { timeout: 15000 });
    
    console.log('Search functionality verified correctly.');
  });

  test('Verify available languages', async ({ page }) => {
    // Verify language button exists and shows correct count
    const languageButton = page.locator('#p-lang-btn');
    
    // Check if language button exists and is visible
    await expect(languageButton).toBeVisible({ timeout: 10000 });
    
    // Verify it shows a three-digit number followed by "languages"
    await expect(languageButton).toContainText(/\d{3} languages/);
    
    console.log('Language selector verified correctly.');
  });

  test('Verify Wikipedia logo links to main page', async ({ page }) => {
    // Navigate to a different page first
    await page.goto('https://en.wikipedia.org/wiki/Wikipedia:About');
    
    // Click on the logo
    await page.locator('.mw-logo').click();
    
    // Verify we're back on the main page
    await expect(page).toHaveURL(/.*Main_Page$/);
    
    console.log('Logo link verified correctly.');
  });

  test('Verify sister projects section', async ({ page }) => {
    // Scroll to bottom to see sister projects
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Verify "Wikipedia's sister projects" heading
    const sisterProjectsHeading = page.locator('h2:has-text("Wikipedia\'s sister projects")');
    await expect(sisterProjectsHeading).toBeVisible({ timeout: 10000 });
    
    // Verify some sister project links
    const projects = ['Commons', 'Wikibooks', 'Wikidata', 'Wikiquote'];
    
    for (const project of projects) {
      const projectLink = page.locator(`#mp-sister-content a:has-text("${project}")`).first();
      await expect(projectLink).toBeVisible({ timeout: 5000 });
    }
    
    console.log('Sister projects section verified correctly.');
  });

  test('Verify page header tabs', async ({ page }) => {
    // Verify main tabs in the header
    const headerTabs = [
      'Main Page',
      'Talk',
      'Read',
      'View source',
      'View history',
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

  test('Verify today featured article exists', async ({ page }) => {
    // Verify featured article section
    const featuredArticle = page.locator('#mp-tfa');
    await expect(featuredArticle).toBeVisible({ timeout: 10000 });
    
    // Verify content in the featured article
    const articleContent = await featuredArticle.textContent();
    expect(articleContent).toBeTruthy();
    expect(articleContent.length).toBeGreaterThan(100);
    
    console.log('Featured article section verified correctly.');
  });
});

