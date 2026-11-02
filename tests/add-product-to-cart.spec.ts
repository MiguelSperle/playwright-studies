import { test, expect } from '../fixtures/base';
import { products } from '../data/products';

test.describe('add product to cart feature', () => {
    test.describe('from the inventory page', () => {
        test('should add the product to the cart', async ({ inventoryPage, headerComponent }) => {
            // ARRANGE
            await inventoryPage.goto();

            // ACT
            await inventoryPage.clickAddToCartButton(products.BACKPACK_PRODUCT.name);

            // ASSERT
            await expect(headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(inventoryPage.removeFromCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });
    });

    test.describe('from the product details page', () => {
        test('should add the product to the cart', async ({ productDetailsPage, headerComponent }) => {
            // ARRANGE
            await productDetailsPage.goto(products.BACKPACK_PRODUCT.id);

            // ACT
            await productDetailsPage.clickAddToCartButton();

            // ASSERT
            await expect(headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(productDetailsPage.removeFromCartButton).toBeVisible();
        });
    });
});
