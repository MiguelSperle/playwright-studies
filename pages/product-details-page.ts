import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/header-component';

export class ProductDetailsPage {
    readonly headerComponent: HeaderComponent;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;

    constructor(readonly page: Page) {
        this.headerComponent = new HeaderComponent(page);
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