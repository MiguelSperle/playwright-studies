import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../pages/AuthenticationPage';

test.describe("Authentication", () => {
  let authenticationPage: AuthenticationPage;

  test.beforeEach(async ({ page }) => {
    authenticationPage = new AuthenticationPage(page);
    await authenticationPage.open();
  });

  test('should be able to authenticate with valid credentials', async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauce";

    await authenticationPage.usernameInput.fill(username);
    await authenticationPage.passwordInput.fill(password);

    await authenticationPage.authenticationButton.click();

    const expectedUrl = "/inventory.html";
    const expectedTitle = "Products";

    await expect(page).toHaveURL(expectedUrl);
    await expect(page.getByText(expectedTitle)).toBeVisible();
  });

  test("should not be able to authenticate when using empty credentials", async ({ page }) => {
    await authenticationPage.authenticationButton.click();

    const expectedErrorMessage = "Epic sadface: Username is required";

    await expect(page.getByText(expectedErrorMessage)).toBeVisible();
  });

  test("should not be able to authenticate when using an empty password", async ({ page }) => {
    const username = "standard_user";

    await authenticationPage.usernameInput.fill(username);

    await authenticationPage.authenticationButton.click();

    const expectedErrorMessage = "Epic sadface: Password is required";

    await expect(page.getByText(expectedErrorMessage)).toBeVisible();
  });

  test("should not be able to authenticate when using invalid credentials", async ({ page }) => {
    const username = "invalid_user";
    const passsword = "invalid_password";

    await authenticationPage.usernameInput.fill(username);
    await authenticationPage.passwordInput.fill(passsword);

    await authenticationPage.authenticationButton.click();

    const expectedErrorMessage = "Epic sadface: Username and password do not match any user in this service";

    await expect(page.getByText(expectedErrorMessage)).toBeVisible();
  });
});