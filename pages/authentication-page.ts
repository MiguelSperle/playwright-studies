import { Page, Locator } from '@playwright/test';

export class AuthenticationPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly authenticationButton: Locator;
    readonly error: Locator;

    constructor(readonly page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByLabel('Username');
        this.passwordInput = this.page.getByLabel('Password');
        this.authenticationButton = this.page.getByRole('button', { name: 'Login' });
        this.error = this.page.getByTestId('error');
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