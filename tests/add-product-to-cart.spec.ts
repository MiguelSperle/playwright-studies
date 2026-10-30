import { test, expect } from '../fixtures/base';
import { products } from '../data/products';

test.describe('Add product to cart feature', () => {
    test.describe('From the inventory page', () => {
        test.beforeEach(async ({ inventoryPage }) => {
            await inventoryPage.goto();
        });

        test('should add product to the cart', async ({ inventoryPage }) => {
            await inventoryPage.clickAddToCartButton(products.BACKPACK_PRODUCT.name);

            await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
            await expect(inventoryPage.removeFromCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });
    });
});
