import { Page, Locator } from '@playwright/test';

export class AuthenticationBase {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly authenticationButton: Locator;

    constructor(private page: Page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.authenticationButton = page.getByRole('button', { name: 'Login' });
    }

    async open() {
        await this.page.goto('/');
    }

    async authenticate(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.authenticationButton.click();
    }
}