import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../utils/testData';

/** Type-safe input names for autocomplete */
export type InputName = 'usernameInput' | 'passwordInput';

/** Type-safe button names for autocomplete */
export type ButtonName = 'loginButton';

/** Type-safe link names for autocomplete */
export type LinkName = 'homeLink' | 'cydeoLink';

/**
 * Page Object Model for Login
 * @page /login
 */
export class LoginPage {
    readonly page: Page;

    // ============ Configuration ============

    private readonly CONFIG = {
        PAGE_PATH: '/login',
        TIMEOUTS: {
            PAGE_LOAD: 10000,
            ELEMENT_VISIBLE: 2000,
            NAVIGATION: 30000
        }
    } as const;

    constructor(page: Page) {
        this.page = page;
    }

    // ============ Private Helpers ============

    /**
     * Check if an element is visible on the page
     * @private
     */
    private async isVisible(locator: Locator, timeout = this.CONFIG.TIMEOUTS.ELEMENT_VISIBLE): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    // ============ Navigation Elements ============

    /**
     * Home link
     * @locator getByRole('link', { name: 'Home' })
     * @example await page.homeLink.click();
     */
    get homeLink(): Locator {
        return this.page.getByRole('link', { name: 'Home' });
    }


    // ============ Form Elements ============

    /**
     * Text input
     * @locator locator('input[type="text"]')
     * @example await page.usernameInput.fill('value');
     */
    get usernameInput(): Locator {
        return this.page.locator('input[type="text"]');
    }

    /**
     * Password input
     * @locator locator('input[type="password"]')
     * @example await page.passwordInput.fill('value');
     */
    get passwordInput(): Locator {
        return this.page.locator('input[type="password"]');
    }

    /**
     * Login button
     * @locator getByRole('button', { name: /Login/i })
     * @example await page.loginButton.click();
     */
    get loginButton(): Locator {
        return this.page.getByRole('button', { name: /Login/i });
    }


    // ============ Main Elements ============

    /**
     * CYDEO link
     * @locator getByRole('link', { name: 'CYDEO' })
     * @example await page.cydeoLink.click();
     */
    get cydeoLink(): Locator {
        return this.page.getByRole('link', { name: 'CYDEO' });
    }


    // ============ Actions ============

    async clickButton(buttonName: ButtonName): Promise<void> {
        const buttonMap: Record<ButtonName, Locator> = {
            'loginButton': this.loginButton,
        };
        const button = buttonMap[buttonName];
        if (!button) throw new Error(`Button '${buttonName}' not found`);
        await button.click();
    }

    async fillInput(inputName: InputName, value: string): Promise<void> {
        const inputMap: Record<InputName, Locator> = {
            'usernameInput': this.usernameInput,
            'passwordInput': this.passwordInput,
        };
        const input = inputMap[inputName];
        if (!input) throw new Error(`Input '${inputName}' not found`);
        await input.fill(value);
    }

    async clickLink(linkName: LinkName): Promise<void> {
        const linkMap: Record<LinkName, Locator> = {
            'homeLink': this.homeLink,
            'cydeoLink': this.cydeoLink,
        };
        const link = linkMap[linkName];
        if (!link) throw new Error(`Link '${linkName}' not found`);
        await link.click();
    }

    // ============ Workflows ============

    /**
     * High-level login workflow
     * @param username - Username or email
     * @param password - Password
     * @example await page.login('user@example.com', 'password123');
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }


    async validLogin() : Promise<void> {

        await this.usernameInput.fill(testData.validLogin.username);
        await this.passwordInput.fill(testData.validLogin.password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');

    }



    // ============ Assertions ============

    /** Verify page has loaded successfully */
    async expectPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/login/);
        await expect(this.homeLink).toBeVisible({ timeout: 10000 });
    }

    /**
     * Verify specific element is visible
     * @param locator - Element locator to check
     */
    async expectElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }


    // ============ State Checks (Priority 3: Complete coverage) ============

    /**
     * Check if Home is visible
     */
    async isHomeLinkVisible(): Promise<boolean> {
        return this.isVisible(this.homeLink);
    }

    /**
     * Check if usernameInput is visible
     */
    async isUsernameInputVisible(): Promise<boolean> {
        return this.isVisible(this.usernameInput);
    }

    /**
     * Check if passwordInput is visible
     */
    async isPasswordInputVisible(): Promise<boolean> {
        return this.isVisible(this.passwordInput);
    }

    /**
     * Check if Login is visible
     */
    async isLoginButtonVisible(): Promise<boolean> {
        return this.isVisible(this.loginButton);
    }

    /**
     * Check if CYDEO is visible
     */
    async isCydeoLinkVisible(): Promise<boolean> {
        return this.isVisible(this.cydeoLink);
    }

    // ============ Navigation ============

    /**
     * Navigate to the page
     * @param baseUrl - Optional base URL override (defaults to env variable)
     * @example
     * // Use environment variable
     * await page.goto();
     * // Or override
     * await page.goto('https://staging.example.com');
     */
    async goto(baseUrl?: string): Promise<void> {
        const url = baseUrl || process.env.BASE_URL || 'https://the-internet-5chk.onrender.com';
        await this.page.goto(`${url}/login`);
        await this.page.waitForLoadState('domcontentloaded');
    }
}
