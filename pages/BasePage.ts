import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected readonly page: Page) { }

    getText(text: string) {
        return this.page.getByText(text);
    }
}