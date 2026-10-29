import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly products: Locator;
    readonly shoppingCartBagde: Locator;

    constructor(readonly page: Page) {
        this.page = page;
        this.products = this.page.getByTestId('inventory-item');
        this.shoppingCartBagde = this.page.getByTestId('shopping-cart-badge');
    }

    async open() {
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