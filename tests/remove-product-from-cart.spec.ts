import { test, expect } from '../fixtures/base';
import { products } from '../data/products';

test.describe('remove product from cart feature', () => {
    test.describe('from the inventory page', () => {
        test.beforeEach(async ({ inventoryPage }) => {
            await inventoryPage.goto();
        });

        test('should remove the product from the cart', async ({ inventoryPage, headerComponent }) => {
            // ARRANGE
            await inventoryPage.clickAddToCartButton(products.BACKPACK_PRODUCT.name);
            await expect(headerComponent.shoppingCartBadge).toHaveText('1');

            // ACT
            await inventoryPage.clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            // ASSERT
            await expect(headerComponent.shoppingCartBadge).toBeHidden();
            await expect(inventoryPage.addToCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });
    });

    test.describe('from the product details page', () => {
        test.beforeEach(async ({ productDetailsPage }) => {
            await productDetailsPage.goto(products.BACKPACK_PRODUCT.id);
        });

        test('should remove the product from the cart', async ({ productDetailsPage, headerComponent }) => {
            // ARRANGE
            await productDetailsPage.clickAddToCartButton();
            await expect(headerComponent.shoppingCartBadge).toHaveText('1');

            // ACT
            await productDetailsPage.clickRemoveFromCartButton();

            // ASSERT
            await expect(headerComponent.shoppingCartBadge).toBeHidden();
            await expect(productDetailsPage.addToCartButton).toBeVisible();
        });
    });
});