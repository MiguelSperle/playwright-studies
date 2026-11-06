import { test, expect } from '../fixtures';
import { products } from '../data/products';

test.describe('shopping cart', () => {
    test.describe('from the inventory page', () => {
        test.beforeEach(async ({ pm }) => {
            await pm.onInventoryPage().goto();
        });

        test('should add a product to the shopping cart', async ({ pm }) => {
            await pm.onInventoryPage().clickAddToCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(pm.onInventoryPage().removeFromCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });

        test('should add multiple products to the shopping cart', async ({ pm }) => {
            await pm.onInventoryPage().clickAddToCartButton(products.BACKPACK_PRODUCT.name);
            await pm.onInventoryPage().clickAddToCartButton(products.BIKE_LIGHT_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toHaveText('2');
            await expect(pm.onInventoryPage().removeFromCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
            await expect(pm.onInventoryPage().removeFromCartButton(products.BIKE_LIGHT_PRODUCT.name)).toBeVisible();
        });

        test('should remove an added product from the shopping cart', async ({ pm, shoppingCartWithProduct }) => {
            await pm.onInventoryPage().clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toBeHidden();
            await expect(pm.onInventoryPage().addToCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });

        test('should remove only one product when multiple products have been added to the shopping cart', async ({ pm, shoppingCartWithMultipleProducts }) => {
            await pm.onInventoryPage().clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(pm.onInventoryPage().addToCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
            await expect(pm.onInventoryPage().removeFromCartButton(products.BIKE_LIGHT_PRODUCT.name)).toBeVisible();
        });
    });

    test.describe('from the product details page', () => {
        test.beforeEach(async ({ pm }) => {
            await pm.onProductDetailsPage().goto(products.BACKPACK_PRODUCT.id);
        });

        test('should add a product to the shopping cart', async ({ pm }) => {
            await pm.onProductDetailsPage().clickAddToCartButton();

            await expect(pm.onProductDetailsPage().headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(pm.onProductDetailsPage().removeFromCartButton).toBeVisible();
        });

        test('should remove an added product from the shopping cart', async ({ pm, shoppingCartWithProduct }) => {
            await pm.onProductDetailsPage().clickRemoveFromCartButton();

            await expect(pm.onProductDetailsPage().headerComponent.shoppingCartBadge).toBeHidden();
            await expect(pm.onProductDetailsPage().addToCartButton).toBeVisible();
        });
    });
});