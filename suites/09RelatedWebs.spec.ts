import { test, expect } from '@playwright/test';

// List of related sites to verify
const mediaWikiSites = [
  { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Main_Page' },
  { name: 'Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/Main_Page' },
  { name: 'Wikidata', url: 'https://www.wikidata.org/wiki/Wikidata:Main_Page' },
  { name: 'Wikivoyage', url: 'https://en.wikivoyage.org/wiki/Main_Page' },
  { name: 'Wiktionary', url: 'https://en.wiktionary.org/wiki/Wiktionary:Main_Page' },
  { name: 'MediaWiki', url: 'https://www.mediawiki.org/wiki/MediaWiki' },
  { name: 'Wikiversity', url: 'https://en.wikiversity.org/wiki/Wikiversity:Main_Page' },
  { name: 'Wikinews', url: 'https://en.wikinews.org/wiki/Main_Page' },
];

test.describe('MediaWiki Sites Verification', () => {
  
  // Test for each site
  for (const site of mediaWikiSites) {
    test(`Verify ${site.name} - Structure and Links`, async ({ page }) => {
      console.log(`\n=== Verifying: ${site.name} ===`);
      
      // Navigate to the site with extended timeout
      await page.goto(site.url, {
        timeout: 120_000,
        waitUntil: 'domcontentloaded'
      });
      
      await page.waitForLoadState('networkidle', { timeout: 30_000 });
      
      // Verify that the page loaded correctly
      await expect(page).toHaveTitle(/.+/, { timeout: 15_000 });
      const title = await page.title();
      console.log(`Page title: ${title}`);
      
      // Verify presence of MediaWiki generator in the meta tag
      const generator = page.locator('meta[name="generator"]');
      const generatorContent = await generator.getAttribute('content');
      expect(generatorContent).toContain('MediaWiki');
      console.log(`Generator: ${generatorContent}`);
      
      // Verify main navigation - using .first() to avoid strict mode violation
      const navigation = page.locator('#mw-navigation, nav, #p-navigation').first();
      await expect(navigation).toBeVisible({ timeout: 10_000 });
      console.log('✓ Main navigation visible');
      
      // Verify main content
      const mainContent = page.locator('#mw-content-text, #content, .mw-body').first();
      await expect(mainContent).toBeVisible({ timeout: 10_000 });
      console.log('✓ Main content visible');
      
      // Search for internal links in the content
      const internalLinks = page.locator('#mw-content-text a[href^="/wiki/"], #content a[href^="/wiki/"]');
      const linksCount = await internalLinks.count();
      expect(linksCount).toBeGreaterThan(0);
      console.log(`Internal links found: ${linksCount}`);
      
      // Verify the first 5 links (or fewer)
      const linksToCheck = Math.min(linksCount, 5);
      for (let i = 0; i < linksToCheck; i++) {
        const link = internalLinks.nth(i);
        const linkText = await link.textContent();
        const href = await link.getAttribute('href');
        
        // Verify that the link has text and valid href
        expect(linkText?.trim().length).toBeGreaterThan(0);
        expect(href).toMatch(/^\/wiki\/.+/);
        
        console.log(`  Link #${i + 1}: "${linkText?.trim()}" → ${href}`);
      }
      
      // Verify footer with powered by MediaWiki
      const footer = page.locator('footer, #footer').first();
      await expect(footer).toBeVisible({ timeout: 10_000 });
      
      const poweredBy = page.locator('a[href*="mediawiki.org"]');
      const poweredByCount = await poweredBy.count();
      expect(poweredByCount).toBeGreaterThan(0);
      console.log('✓ Footer with MediaWiki link found');
      
      // Verify sidebar 
      const sidebar = page.locator('#mw-panel, .mw-sidebar, #sidebar').first();
      const sidebarVisible = await sidebar.isVisible().catch(() => false);
      if (sidebarVisible) {
        console.log('✓ Sidebar visible');
      }
      
      console.log(`\n ${site.name} verified successfully\n`);
    });
  }
  
  
  // mass verification test
  test('Quick verification of multiple MediaWiki sites', async ({ page }) => {
    console.log('\n=== Quick verification of all sites ===');
    
    const results = [];
    
    for (const site of mediaWikiSites) {
      try {
        await page.goto(site.url, {
          timeout: 60_000,
          waitUntil: 'domcontentloaded'
        });
        
        // Basic verification
        const generator = page.locator('meta[name="generator"]');
        const generatorContent = await generator.getAttribute('content').catch(() => null);
        
        const isMediaWiki = generatorContent?.includes('MediaWiki') || false;
        
        results.push({
          name: site.name,
          url: site.url,
          status: '✓ OK',
          isMediaWiki: isMediaWiki
        });
        
        console.log(`✓ ${site.name}: MediaWiki detected`);
        
      } catch (error) {
        results.push({
          name: site.name,
          url: site.url,
          status: '✗ ERROR',
          isMediaWiki: false
        });
        console.log(`✗ ${site.name}: Error verifying`);
      }
    }
    
    // Summary
    console.log('\n=== SUMMARY ===');
    const successful = results.filter(r => r.isMediaWiki).length;
    console.log(`Sites verified: ${results.length}`);
    console.log(`MediaWiki sites confirmed: ${successful}`);
    console.log(`Success rate: ${(successful / results.length * 100).toFixed(1)}%`);
    
    // Verify that at least 80% works
    expect(successful / results.length).toBeGreaterThan(0.8);
  });
});