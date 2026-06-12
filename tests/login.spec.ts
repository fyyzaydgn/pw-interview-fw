import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://the-internet-5chk.onrender.com/login');
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill('tomsmith');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('SuperSecretPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('You logged into a secure area')).toBeVisible();
});