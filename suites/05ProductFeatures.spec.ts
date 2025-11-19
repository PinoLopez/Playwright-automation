import { test, expect } from '@playwright/test';

test('Verify the features section', async ({ page }) => {
  // 1. Navigate to the page
  await page.goto('https://en.wikipedia.org/wiki/Roland_Juno-60', { timeout: 120000 });
  
  // 2. Scroll to the Sounds and features section
  const soundsSection = page.locator('#Sounds_and_features');
  await soundsSection.scrollIntoViewIfNeeded();
  
  // 3. Locate the section heading
  const heading = page.getByRole('heading', {
    name: /Sounds and features/i,
  });
  await expect(heading).toBeVisible({ timeout: 10000 });
  
  // 4. Locate specific content in the section (single-oscillator design)
  const content1 = page.locator('p:has-text("single-oscillator analog synthesizers")').first();
  await expect(content1).toBeVisible({ timeout: 10000 });
  
  // 5. Locate another specific content (chorus effect)
  const content2 = page.locator('p:has-text("chorus effect")').first();
  await expect(content2).toBeVisible({ timeout: 10000 });
  
  console.log('Sounds and features section verified correctly.');
  console.log(' - Single-oscillator analog synthesizers mentioned');
  console.log(' - Chorus effect mentioned');
});

test('Verify the Technical specifications', async ({ page }) => {
  // 1. Navigate to the page
  await page.goto('https://en.wikipedia.org/wiki/Roland_Juno-60', { timeout: 120000 });
  
  // 2. Locate the infobox
  const infobox = page.locator('.infobox');
  
  // 3. Locate the Technical specifications subheading in the infobox
  const specsHeading = infobox.locator('th:has-text("Technical specifications")');
  await expect(specsHeading).toBeVisible({ timeout: 10000 });
  
  // 4. Locate specific spec (Polyphony)
  const polyphony = infobox.locator('td:has-text("6 voices")');
  await expect(polyphony).toBeVisible({ timeout: 10000 });
  
  // 5. Locate another specific spec (Oscillator)
  const oscillator = infobox.locator('td:has-text("1 DCO per voice")');
  await expect(oscillator).toBeVisible({ timeout: 10000 });
  
  console.log('Technical specifications verified correctly.');
  console.log(' - Polyphony: 6 voices');
  console.log(' - Oscillator: 1 DCO per voice');
});

test('Verify the Successors section', async ({ page }) => {
  // 1. Navigate to the page
  await page.goto('https://en.wikipedia.org/wiki/Roland_Juno-60', { timeout: 120000 });
  
  // 2. Scroll to the Successors section
  const successorsSection = page.locator('#Successors');
  await successorsSection.scrollIntoViewIfNeeded();
  
  // 3. Locate the section heading
  const heading = page.getByRole('heading', {
    name: /Successors/i,
  });
  await expect(heading).toBeVisible({ timeout: 10000 });
  
  // 4. Locate specific content (Juno-106)
  const content1 = page.locator('p:has-text("Roland followed up the Juno-60 with the Roland Juno-106 in 1984.")');
  await expect(content1).toBeVisible({ timeout: 10000 });
  
  // 5. Locate another specific content (Juno-X)
  const content2 = page.locator('p:has-text("Roland released the Juno-X in 2022")');
  await expect(content2).toBeVisible({ timeout: 10000 });
  
  console.log('Successors section verified correctly.');
  console.log(' - Juno-106 mentioned');
  console.log(' - Juno-X mentioned');
});

test('Verify the Software emulations section', async ({ page }) => {
  // 1. Navigate to the page
  await page.goto('https://en.wikipedia.org/wiki/Roland_Juno-60', { timeout: 120000 });
  
  // 2. Scroll to the Software emulations section
  const emulationsSection = page.locator('#Software_emulations');
  await emulationsSection.scrollIntoViewIfNeeded();
  
  // 3. Locate the section heading
  const heading = page.getByRole('heading', {
    name: /Software emulations/i,
  });
  await expect(heading).toBeVisible({ timeout: 10000 });
  
  // 4. Locate specific emulation (TAL U-NO-62)
  const emulation1 = page.locator('li:has-text("TAL U-NO-62 by Togu Audio Line")');
  await expect(emulation1).toBeVisible({ timeout: 10000 });
  
  // 5. Locate chorus emulation (Arturia Chorus JUN-6)
  const chorus1 = page.locator('li:has-text("Arturia Chorus JUN-6 (2020)")');
  await expect(chorus1).toBeVisible({ timeout: 10000 });
  
  console.log('Software emulations section verified correctly.');
  console.log(' - TAL U-NO-62 mentioned');
  console.log(' - Arturia Chorus JUN-6 mentioned');
});

