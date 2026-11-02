import { test as base } from '@playwright/test';
import { AuthenticationPage } from '../pages/authentication-page';
import { InventoryPage } from '../pages/inventory-page';
import { ProductDetailsPage } from '../pages/product-details-page';
import { ShoppingCartPage } from '../pages/shopping-cart-page';

type PageFixtures = {
    authenticationPage: AuthenticationPage;
    inventoryPage: InventoryPage;
    productDetailsPage: ProductDetailsPage;
    shoppingCartPage: ShoppingCartPage;
};

export const pageTest = base.extend<PageFixtures>({
    authenticationPage: async ({ page }, use) => {
        await use(new AuthenticationPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },

    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    }
});