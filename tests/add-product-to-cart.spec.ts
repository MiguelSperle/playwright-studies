import { test, expect } from '../fixtures/base';
import { products } from '../data/products';

test.describe('add product to cart feature', () => {
    test.describe('from the inventory page', () => {
        test.beforeEach(async ({ inventoryPage }) => {
            await inventoryPage.goto();
        });

        test('should add the product to the cart', async ({ inventoryPage, headerComponent }) => {
            await inventoryPage.clickAddToCartButton(products.BACKPACK_PRODUCT.name);

            await expect(headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(inventoryPage.removeFromCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });
    });
});
