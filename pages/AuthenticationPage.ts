import { Page, Locator } from '@playwright/test';

export class AuthenticationPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly authenticationButton: Locator;

    constructor(private page: Page) {
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.authenticationButton = page.getByRole('button', { name: 'Login' });
    }

    async open() {
        await this.page.goto('/');
    }
}