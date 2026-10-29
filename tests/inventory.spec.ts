import { test, expect } from '../fixtures/base';

test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
});

test('add product to cart', async ({ inventoryPage }) => {
    await inventoryPage.clickAddToCartButton('Sauce Labs Backpack');

    await expect(inventoryPage.shoppingCartBagde).toHaveText('1');
    await expect(inventoryPage.removeFromCartButton('Sauce Labs Backpack')).toBeVisible();
});

test('remove product from cart', async ({ inventoryPage }) => {
    // ARRANGE
    await inventoryPage.clickAddToCartButton('Sauce Labs Backpack');
    await expect(inventoryPage.shoppingCartBagde).toHaveText('1');

    // ACT
    await inventoryPage.clickRemoveFromCartButton('Sauce Labs Backpack');

    // ASSERT
    await expect(inventoryPage.shoppingCartBagde).toBeHidden();
    await expect(inventoryPage.addToCartButton('Sauce Labs Backpack')).toBeVisible();
});
