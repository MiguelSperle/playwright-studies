import { Page, Locator } from '@playwright/test';

export class ShoppingCartPage {
    readonly cartProducts: Locator;

    constructor(readonly page: Page) {
        this.cartProducts = this.page.getByTestId('inventory-item');
    }

    async goto() {
        await this.page.goto('/cart.html');
    }

    cartProductFilter(productName: string): Locator {
        return this.cartProducts.filter({ hasText: productName });
    }

    cartProduct(productName: string): Locator {
        return this.cartProductFilter(productName);
    }

    removeFromCartButton(productName: string): Locator {
        return this.cartProductFilter(productName).getByRole('button', { name: 'Remove' })
    }

    async clickRemoveFromCartButton(productName: string) {
        await this.removeFromCartButton(productName).click();
    }
}