import { test, expect } from '@playwright/test';
import { AuthenticationBase } from '../utils/AuthenticationBase';

test.describe("Authentication features", () => {
  let authenticationBase: AuthenticationBase;

  test.beforeEach(async ({ page }) => {
    authenticationBase = new AuthenticationBase(page);
    await authenticationBase.open();
  });

  test('should be able to authenticate with valid credentials', async ({ page }) => {
    await authenticationBase.authenticate("standard_user", "secret_sauce");

    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();
  });

  test("should not be able to authenticate when using empty credentials", async ({ page }) => {
    await authenticationBase.authenticationButton.click();

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
  });

  test("should not be able to authenticate when using empty password", async ({ page }) => {
    await authenticationBase.usernameInput.fill("standard_user");

    await authenticationBase.authenticationButton.click();

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Password is required")).toBeVisible();
  });

  test("should not be able to authenticate when using invalid credentials", async ({ page }) => {
    await authenticationBase.usernameInput.fill("invalid_user");
    await authenticationBase.passwordInput.fill("invalid_password");

    await authenticationBase.authenticationButton.click();

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
  });
});