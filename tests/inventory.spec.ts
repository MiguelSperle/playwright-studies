import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe("Inventory", () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await inventoryPage.navigate();
    });

    test("should be able to navigate to a specific product page from the inventory", async ({ page }) => {
        console.log("Navigating to the inventory page...");
        await expect(inventoryPage.getText("Sauce Labs Backpack")).toBeVisible();
    });
}); 