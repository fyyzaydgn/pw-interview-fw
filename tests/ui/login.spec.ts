import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet-5chk.onrender.com/login');
});

test.afterEach(async ({ page }) => {
    console.log('Test completed')
});

test('@validlogin @smoke valid login', async ({ page }) => {
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill('tomsmith');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('SuperSecretPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('You logged into a secure area')).toBeVisible();
});

test('@invalidlogin @smoke invalid login', async ({ page }) => {
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill('xxx');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('xxx');
    await page.getByRole('button', { name: 'Login' }).click();
    // await expect(page.getByText('You logged into a secure area')).toBeVisible();
});