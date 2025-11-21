import { test, expect } from '@playwright/test';

test.describe('Wikipedia USB Hardware Page Characteristics', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Wikipedia USB Hardware page
    await page.goto('https://en.wikipedia.org/wiki/USB_hardware', { timeout: 110_000 });
  });

  test('Verify the USB connectors section', async ({ page }) => {
    // 1. Scroll to the connectors section
    const connectorsSection = page.locator('#Connectors');
    await connectorsSection.scrollIntoViewIfNeeded();
    // 2. Locate the Standard-A connector mention inside the content
    const conector1 = page.locator('#mw-content-text').getByText('Standard-A', { exact: false }).first();
    await expect(conector1).toBeVisible({ timeout: 10000 });
    // 3. Locate the Type-C connector mention
    const conector2 = page.locator('#mw-content-text').getByText('Type-C', { exact: false }).first();
    await expect(conector2).toBeVisible({ timeout: 10000 });
    console.log('Both connectors found:');
    console.log(' - Standard-A');
    console.log(' - Type-C');
  });

  test('Verify connectors subsections', async ({ page }) => {
    // List of expected subsections under Connectors
    const subsections = [
      'Types', 
      'Internal connectors',
    ];
    // Verify each subsection
    for (const subsection of subsections) {
      const element = page.locator(`h3:has-text("${subsection}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Subsection verified: ${subsection}`);
    }
    console.log('Connectors subsections verified correctly.');
  });

  test('Verify types sub-subsections', async ({ page }) => {
    // Ensure the Types section is in view
    const typesHeader = page.locator('h3:has-text("Types")').first();
    if(await typesHeader.isVisible()) {
        await typesHeader.scrollIntoViewIfNeeded();
    }

    // List of expected sub-subsections
    const subsubsections = [
      'Standard connectors',
      'Mini connectors',
      'Micro connectors',
      'USB-C',
    ];
    
    for (const subsub of subsubsections) {
      // We look for H4 OR H3 
      const element = page.locator(`:is(h3, h4):has-text("${subsub}")`).first();
      await expect(element).toBeVisible({ timeout: 10000 });
      console.log(`Sub-subsection verified: ${subsub}`);
    }
    console.log('Types sub-subsections verified correctly.');
  });

  test('Verify compatibility table', async ({ page }) => {
    // Locate the Wiki Table by looking for unique text inside it, like "USB4"
    const table = page.locator('table.wikitable').filter({ hasText: 'USB4' }).first();
    
    await table.scrollIntoViewIfNeeded();
    await expect(table).toBeVisible({ timeout: 10000 });

    // Verify some content in the table
    await expect(table).toContainText('USB4');
    await expect(table).toContainText('3.0'); 
    
    console.log('Compatibility table verified correctly.');
  });
});

