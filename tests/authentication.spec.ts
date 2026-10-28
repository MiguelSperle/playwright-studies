import { test, expect } from '../fixtures/base';

test.describe('Authentication', () => {
  test.beforeEach(async ({ authenticationPage }) => {
    await authenticationPage.navigate();
  });

  test('should be able to authenticate with valid credentials', async ({ authenticationPage, inventoryPage, page }) => {
    await authenticationPage.authenticate('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('/inventory.html');
    await expect(inventoryPage.title).toBeVisible();
  });

  test('should not be able to authenticate when using empty credentials', async ({ authenticationPage }) => {
    await authenticationPage.authenticate('', '');

    await expect(authenticationPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('should not be able to authenticate when using an empty password', async ({ authenticationPage }) => {
    await authenticationPage.authenticate('standard_user', '')

    await expect(authenticationPage.errorMessage).toHaveText('Epic sadface: Password is required');
  });

  test('should not be able to authenticate when using invalid credentials', async ({ authenticationPage }) => {
    await authenticationPage.authenticate('invalid_user', 'invalid_password');

    await expect(authenticationPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
});