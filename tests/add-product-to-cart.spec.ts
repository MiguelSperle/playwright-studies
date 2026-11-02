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

    test.describe('from the product details page', () => {
        test.beforeEach(async ({ productDetailsPage }) => {
            await productDetailsPage.goto(products.BACKPACK_PRODUCT.id);
        });

        test('should add the product to the cart', async ({ productDetailsPage, headerComponent }) => {
            await productDetailsPage.clickAddToCartButton();

            await expect(headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(productDetailsPage.removeFromCartButton).toBeVisible();
        });
    });
});
