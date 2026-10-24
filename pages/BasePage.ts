import { Page } from '@playwright/test';

export class BasePage {
    public constructor(protected readonly page: Page) { }

    public getText(text: string) {
        return this.page.getByText(text);
    }
}