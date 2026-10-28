import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    public readonly title: Locator;
    public readonly cartBadge: Locator;
    
    private readonly products: Locator;

    public constructor(private readonly page: Page) {
        this.page = page;
        this.title = this.page.getByText('Products');
        this.cartBadge = this.page.getByTestId('shopping-cart-badge');
        this.products = this.page.getByTestId('inventory-item');
    }

    public async navigate() {
        await this.page.goto("/inventory.html");
    }

    public productFilter(productName: string): Locator {
        return this.products.filter({ hasText: productName });
    }

    public addToCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Add to cart' });
    }

    public async clickAddToCartButton(productName: string) {
        await this.addToCartButton(productName).click();
    }

    public removeFromCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Remove' })
    }

    public async clickRemoveFromCartButton(productName: string) {
        await this.removeFromCartButton(productName).click();
    }
}