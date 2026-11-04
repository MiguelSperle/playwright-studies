import { test as base } from '@playwright/test';
import { PageManager } from '../pages/manager/PageManager';
import { products } from '../data/products';

/**
 * Responsabilidades:
 * - Instancia os Page Objects e os disponibiliza automaticamente aos testes.
 * - Prepara os cenários necessários para a execução dos testes (prepara os recursos sob demanda).
 */

type TestFixtures = {
    pm: PageManager;
    shoppingCartWithProduct: void;
    shoppingCartWithMultipleProducts: void;
};

export const test = base.extend<TestFixtures>({
    pm: async ({ page }, use) => {
        await use(new PageManager(page));
    },

    shoppingCartWithProduct: async ({ pm }, use) => {
        await pm.onInventoryPage().goto();

        await pm.onInventoryPage().clickAddToCartButton(products.BACKPACK_PRODUCT.name);

        await use();
    },

    shoppingCartWithMultipleProducts: async ({ pm }, use) => {
        await pm.onInventoryPage().goto();

        await pm.onInventoryPage().clickAddToCartButton(products.BACKPACK_PRODUCT.name);
        await pm.onInventoryPage().clickAddToCartButton(products.BIKE_LIGHT_PRODUCT.name);

        await use();
    }
});

export { expect } from '@playwright/test';