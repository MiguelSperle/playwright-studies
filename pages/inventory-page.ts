import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/header-component';

export class InventoryPage {
    readonly headerComponent: HeaderComponent;
    readonly products: Locator;

    constructor(readonly page: Page) {
        this.headerComponent = new HeaderComponent(this.page);
        this.products = this.page.getByTestId('inventory-item');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    productFilter(productName: string): Locator {
        return this.products.filter({ hasText: productName });
    }

    addToCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Add to cart' });
    }

    removeFromCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Remove' });
    }

    async clickAddToCartButton(productName: string) {
        await this.addToCartButton(productName).click();
    }

    async clickRemoveFromCartButton(productName: string) {
        await this.removeFromCartButton(productName).click();
    }
}