import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly products: Locator;

    constructor(readonly page: Page) {
        this.products = this.page.getByTestId('inventory-item');
    }

    async goto() {
        await this.page.goto("/inventory.html");
    }

    productFilter(productName: string): Locator {
        return this.products.filter({ hasText: productName });
    }

    addToCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Add to cart' });
    }

    async clickAddToCartButton(productName: string) {
        await this.addToCartButton(productName).click();
    }

    removeFromCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Remove' })
    }

    async clickRemoveFromCartButton(productName: string) {
        await this.removeFromCartButton(productName).click();
    }
}