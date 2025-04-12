const { test, expect } = require('@playwright/test');

test('user can register and then login', async ({ page }) => {
    await page.goto('http://localhost:3001/register');

    // Fill the registration form
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="lastname"]', 'User');
    const email = `testuser${Date.now()}@example.com`; // unique email
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="phoneNumber"]', '1234567890');
    await page.fill('input[name="password"]', 'test123');
    await page.fill('input[name="passwordConfirmation"]', 'test123');

    await page.click('button[type="submit"]');

    // ✅ Wait for login page by selector (not URL)
    await page.waitForSelector('input[name="email"]');

    // Fill login form
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'test123');
    await page.click('button[type="submit"]');

    // ✅ Wait for home content
    await expect(page.locator('text=Category')).toBeVisible();
});
