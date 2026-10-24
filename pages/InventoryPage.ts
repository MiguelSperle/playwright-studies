import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    public constructor(page: Page) {
        super(page);
    }

    public async navigate() {
        await this.page.goto("/inventory.html");
    }
}