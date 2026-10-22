import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthenticationPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly authenticationButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.authenticationButton = page.getByRole('button', { name: 'Login' });
    }

    async navigate() {
        await this.page.goto('/');
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickAuthenticationButton() {
        await this.authenticationButton.click();
    }
}