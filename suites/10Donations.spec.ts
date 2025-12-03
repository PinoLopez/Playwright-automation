import { test, expect } from '@playwright/test';

// Test configuration
const DONATION_CONFIG = {
  baseUrl: 'https://donate.wikimedia.org',
  landingPagePath: '/w/index.php?title=Special:LandingPage&country=ES&uselang=en&wmf_medium=sidebar&wmf_source=donate&wmf_campaign=commons.wikimedia.org',
  expectedCountry: 'ES',
  expectedLanguage: 'en',
  expectedCurrency: 'EUR'
};

test.describe('Wikimedia Donation Integration', () => {
 
  test('Verify donation page loads correctly', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Verify page title "donation"
    await expect(page).toHaveTitle(/donation/i, { timeout: 15000 });
    console.log('✓ Donation page title verified');
   
    // Verify main donation form is visible
    const donationForm = page.locator('form').first();
    await expect(donationForm).toBeVisible({ timeout: 15000 });
    console.log('✓ Donation form is visible');
  });
 
  test('Verify donation amount options are present', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Wait for amount buttons to load
    const amountButtons = page.locator('button[data-amount], input[name="amount"]');
    await amountButtons.first().waitFor({ state: 'visible', timeout: 15000 });
   
    const buttonCount = await amountButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
    console.log(`✓ Found ${buttonCount} amount selection options`);
   
    // Verify at least one amount option is visible
    const firstAmount = amountButtons.first();
    await expect(firstAmount).toBeVisible();
    console.log('✓ Amount options are visible');
  });
 
  test('Verify payment method options are available', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Look for payment method selectors (credit card, PayPal, etc.)
    const paymentMethods = page.locator('[data-payment-method], input[name="payment_method"], button[data-gateway]');
   
    // Wait for payment methods to appear
    await page.waitForTimeout(2000); // Give time for dynamic content to load
   
    const paymentCount = await paymentMethods.count();
   
    if (paymentCount > 0) {
      console.log(`✓ Found ${paymentCount} payment method options`);
      expect(paymentCount).toBeGreaterThan(0);
    } else {
      // Alternative check: look for common payment gateway text
      const pageContent = await page.content();
      const hasPaymentOptions = pageContent.includes('credit card') ||
                               pageContent.includes('PayPal') ||
                               pageContent.includes('payment');
      expect(hasPaymentOptions).toBeTruthy();
      console.log('✓ Payment options found in page content');
    }
  });
 
  test('Verify donation frequency options (one-time vs monthly)', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Look for frequency selection (one-time, monthly, etc.)
    const frequencyOptions = page.locator('input[name="frequency"], button[data-frequency], [role="radiogroup"]');
   
    await page.waitForTimeout(2000);
   
    const frequencyCount = await frequencyOptions.count();
   
    if (frequencyCount > 0) {
      console.log(`✓ Found ${frequencyCount} frequency options`);
      expect(frequencyCount).toBeGreaterThan(0);
    } else {
      // Check for text indicators
      const hasFrequencyText = await page.locator('text=/monthly|one.?time|recurring/i').count();
      expect(hasFrequencyText).toBeGreaterThan(0);
      console.log('✓ Frequency options available');
    }
  });
 
  test('Verify country selection shows Spain (ES)', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Check URL contains country=ES
    const currentUrl = page.url();
    expect(currentUrl).toContain('country=ES');
    console.log('✓ Country parameter (ES) verified in URL');
   
    // Look for country selector or Spain mention
    const countryElements = page.locator('select[name="country"], [data-country="ES"]');
    const countryCount = await countryElements.count();
   
    if (countryCount > 0) {
      console.log('✓ Spain/ES reference found on page');
    }
  });
 
  test('Verify currency is set to EUR', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Look for EUR currency symbol or text
    const eurElements = page.locator('text=/€|EUR/');
    await eurElements.first().waitFor({ state: 'visible', timeout: 15000 });
   
    const eurCount = await eurElements.count();
    expect(eurCount).toBeGreaterThan(0);
    console.log(`✓ Found ${eurCount} references to EUR/€`);
  });
 
  test('Verify donation submit button is present', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Look for submit/donate button
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Donate")').first();
    await expect(submitButton).toBeVisible({ timeout: 15000 });
   
    const buttonText = await submitButton.textContent();
    console.log(`✓ Submit button found: "${buttonText?.trim()}"`);
  });
 
  test('Verify Wikimedia branding and trust indicators', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    // Check for Wikimedia logo or branding
    const wikimediaLogo = page.locator('img[alt*="Wikimedia"], svg, [class*="logo"]').first();
    await expect(wikimediaLogo).toBeVisible({ timeout: 15000 });
    console.log('✓ Wikimedia branding/logo visible');
   
    // Check for trust/security indicators
    const secureText = page.locator('text=/secure|safe|encrypted|privacy|nonprofit/i');
    const secureCount = await secureText.count();
   
    if (secureCount > 0) {
      console.log(`✓ Found ${secureCount} trust/security indicators`);
    }
  });
 
 
  test('Complete donation flow validation (without actual payment)', async ({ page }) => {
    await page.goto(`${DONATION_CONFIG.baseUrl}${DONATION_CONFIG.landingPagePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });
   
    console.log('Starting complete donation flow test...');
   
    // Step 1: Select an amount 
    const amountContainer = page.locator('li.radiobuttons-cell').first();
    await amountContainer.waitFor({ state: 'visible', timeout: 15000 });
    await amountContainer.click();
    console.log('✓ Step 1: Amount selected');
   
    // Wait for any dynamic updates
    await page.waitForTimeout(1000);
   
    // Step 2: Verify form updates or continues
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
    console.log('✓ Step 2: Form remains visible');
   
    // Step 3: Look for next step button or payment gateway
    const nextStepButton = page.locator('button[type="submit"], button:has-text("Continue"), button:has-text("Donate")').first();
    await expect(nextStepButton).toBeVisible({ timeout: 10000 });
    console.log('✓ Step 3: Next step/submit button available');
   
    console.log('Donation flow validation complete (stopped before payment)');
  });
});