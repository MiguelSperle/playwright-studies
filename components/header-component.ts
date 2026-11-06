import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(readonly page: Page) {
        this.shoppingCartBadge = this.page.getByTestId('shopping-cart-badge');
        this.shoppingCartLink = this.page.getByTestId('shopping-cart-link');
    }

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
}