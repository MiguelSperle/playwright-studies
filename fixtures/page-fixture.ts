import { test as base } from '@playwright/test';
import { AuthenticationPage } from '../pages/authentication-page';
import { InventoryPage } from '../pages/inventory-page';

type PageFixtures = {
    authenticationPage: AuthenticationPage;
    inventoryPage: InventoryPage;
};

export const pageTest = base.extend<PageFixtures>({
    authenticationPage: async ({ page }, use) => {
        await use(new AuthenticationPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
});