import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;

    constructor(readonly page: Page) {
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
        this.removeFromCartButton = this.page.getByRole('button', { name: 'Remove' });
    }

    async goto(productId: number) {
        await this.page.goto(`/inventory-item.html?id=${productId}`);
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }

    async clickRemoveFromCartButton() {
        await this.removeFromCartButton.click();
    }
}