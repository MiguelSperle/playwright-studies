import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly shoppingCartBadge: Locator;

  constructor(readonly page: Page) {
    this.shoppingCartBadge = this.page.getByTestId('shopping-cart-badge');
  }
}