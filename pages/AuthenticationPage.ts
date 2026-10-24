import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthenticationPage extends BasePage {
    public constructor(page: Page) {
        super(page);
    }

    public async navigate() {
        await this.page.goto('/');
    }

    public async fillUsername(username: string) {
        await this.page.getByLabel('Username').fill(username);
    }

    public async fillPassword(password: string) {
        await this.page.getByLabel('Password').fill(password);
    }

    public async clickAuthenticationButton() {
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}