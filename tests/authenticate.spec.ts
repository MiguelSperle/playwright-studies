import { test, expect } from '../fixtures/base';
import { users } from '../data/users';

test.describe('authentication feature', () => {
  test.beforeEach(async ({ authenticationPage }) => {
    await authenticationPage.goto();
  });

  test.describe('with valid credentials', () => {
    test('should authenticate successfully', async ({ authenticationPage, page }) => {
      await authenticationPage.authenticate(users.STANDARD_USER.username, users.STANDARD_USER.password);

      await expect(page).toHaveURL('/inventory.html');
    });
  });

  test.describe('with invalid credentials', () => {
    test('should display an error when credentials are empty', async ({ authenticationPage }) => {
      await authenticationPage.authenticate('', '');

      await expect(authenticationPage.error).toHaveText('Epic sadface: Username is required');
    });

    test('should display an error when password is empty', async ({ authenticationPage }) => {
      await authenticationPage.authenticate(users.STANDARD_USER.username, '');

      await expect(authenticationPage.error).toHaveText('Epic sadface: Password is required');
    });

    test('should display an error when credentials are incorrect', async ({ authenticationPage }) => {
      await authenticationPage.authenticate(users.INVALID_USER.username, users.INVALID_USER.password);

      await expect(authenticationPage.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
  });
});