import { test, expect } from '../fixtures/base';
import { products } from '../data/products';

test.describe('remove product from cart feature', () => {
    test.describe('from the inventory page', () => {
        test('should remove the product from the cart', async ({ inventoryPage, headerComponent }) => {
            // ARRANGE
            await inventoryPage.goto();
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
        test('should remove the product from the cart', async ({ productDetailsPage, headerComponent }) => {
            // ARRANGE
            await productDetailsPage.goto(products.BACKPACK_PRODUCT.id);
            await productDetailsPage.clickAddToCartButton();
            await expect(headerComponent.shoppingCartBadge).toHaveText('1');

            // ACT
            await productDetailsPage.clickRemoveFromCartButton();

            // ASSERT
            await expect(headerComponent.shoppingCartBadge).toBeHidden();
            await expect(productDetailsPage.addToCartButton).toBeVisible();
        });
    });

    test.describe('from the shopping cart page', () => {
        test('should remove the product from the cart', async ({ shoppingCartPage, inventoryPage, headerComponent }) => {
            // ARRANGE
            await inventoryPage.goto();
            await inventoryPage.clickAddToCartButton(products.BACKPACK_PRODUCT.name);
            await expect(headerComponent.shoppingCartBadge).toHaveText('1');
            await shoppingCartPage.goto();

            // ACT
            await shoppingCartPage.clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            // ASSERT
            await expect(headerComponent.shoppingCartBadge).toBeHidden();
            await expect(shoppingCartPage.cartProduct(products.BACKPACK_PRODUCT.name)).toBeHidden();
        });
    });
});