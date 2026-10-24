import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../pages/AuthenticationPage';

test.describe('Authentication', () => {
  let authenticationPage: AuthenticationPage;

  test.beforeEach(async ({ page }) => {
    authenticationPage = new AuthenticationPage(page);
    await authenticationPage.navigate();
  });

  test('should be able to authenticate with valid credentials', async ({ page }) => {
    await authenticationPage.fillUsername('standard_user');
    await authenticationPage.fillPassword('secret_sauce');

    await authenticationPage.clickAuthenticationButton();

    await expect(page).toHaveURL('/inventory.html');
    await expect(authenticationPage.getText('Products')).toBeVisible();
  });

  test('should not be able to authenticate when using empty credentials', async ({ }) => {
    await authenticationPage.clickAuthenticationButton();

    await expect(authenticationPage.getText('Epic sadface: Username is required')).toBeVisible();
  });

  test('should not be able to authenticate when using an empty password', async ({ }) => {
    await authenticationPage.fillUsername('standard_user');

    await authenticationPage.clickAuthenticationButton();

    await expect(authenticationPage.getText('Epic sadface: Password is required')).toBeVisible();
  });

  test('should not be able to authenticate when using invalid credentials', async ({ }) => {
    await authenticationPage.fillUsername('invalid_user');
    await authenticationPage.fillPassword('invalid_password');

    await authenticationPage.clickAuthenticationButton();

    await expect(authenticationPage.getText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });
});