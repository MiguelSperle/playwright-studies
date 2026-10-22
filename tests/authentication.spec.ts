import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../pages/AuthenticationPage';

test.describe("Authentication", () => {
  let authenticationPage: AuthenticationPage;

  test.beforeEach(async ({ page }) => {
    authenticationPage = new AuthenticationPage(page);
    await authenticationPage.navigate();
  });

  test('should be able to authenticate with valid credentials', async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauce";

    await authenticationPage.fillUsername(username);
    await authenticationPage.fillPassword(password);

    await authenticationPage.clickAuthenticationButton();

    const expectedUrl = "/inventory.html";
    const expectedTitle = "Products";

    await expect(page).toHaveURL(expectedUrl);
    await expect(authenticationPage.getText(expectedTitle)).toBeVisible();
  });

  test("should not be able to authenticate when using empty credentials", async ({ }) => {
    await authenticationPage.clickAuthenticationButton();

    const expectedErrorMessage = "Epic sadface: Username is required";

    await expect(authenticationPage.getText(expectedErrorMessage)).toBeVisible();
  });

  test("should not be able to authenticate when using an empty password", async ({ }) => {
    const username = "standard_user";

    await authenticationPage.fillUsername(username);

    await authenticationPage.clickAuthenticationButton();

    const expectedErrorMessage = "Epic sadface: Password is required";

    await expect(authenticationPage.getText(expectedErrorMessage)).toBeVisible();
  });

  test("should not be able to authenticate when using invalid credentials", async ({ }) => {
    const username = "invalid_user";
    const passsword = "invalid_password";

    await authenticationPage.fillUsername(username);
    await authenticationPage.fillPassword(passsword);

    await authenticationPage.clickAuthenticationButton();

    const expectedErrorMessage = "Epic sadface: Username and password do not match any user in this service";

    await expect(authenticationPage.getText(expectedErrorMessage)).toBeVisible();
  });
});