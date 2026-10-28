import { Page, Locator } from '@playwright/test';

export class AuthenticationPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly authenticationButton: Locator;

    public readonly errorMessage: Locator;

    public constructor(private readonly page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByLabel('Username');
        this.passwordInput = this.page.getByLabel('Password');
        this.authenticationButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.getByTestId('error');
    }

    public async navigate() {
        await this.page.goto('/');
    }

    public async authenticate(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.authenticationButton.click();
    }
}