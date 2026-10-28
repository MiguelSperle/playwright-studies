import { test, expect } from '../fixtures/base';

test.describe('Inventory', () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.navigate();
    });

    test('should be able to add a product to the cart', async ({ inventoryPage }) => {
        await inventoryPage.clickAddToCartButton('Sauce Labs Backpack');

        await expect(inventoryPage.cartBadge).toHaveText('1');
        await expect(inventoryPage.removeFromCartButton('Sauce Labs Backpack')).toBeVisible();
    });

    test('should be able to remove a product from the cart', async ({ inventoryPage }) => {
        // ARRANGE
        await inventoryPage.clickAddToCartButton('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');

        // ACT
        await inventoryPage.clickRemoveFromCartButton('Sauce Labs Backpack');

        // ASSERT
        await expect(inventoryPage.cartBadge).toBeHidden();
        await expect(inventoryPage.addToCartButton('Sauce Labs Backpack')).toBeVisible();
    });
}); 