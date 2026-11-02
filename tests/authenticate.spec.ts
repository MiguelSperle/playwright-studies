import { test, expect } from '../fixtures/base';
import { users } from '../data/users';

test.describe('authentication feature', () => {
  test.beforeEach(async ({ authenticationPage }) => {
    // ARRANGE
    await authenticationPage.goto();
  });

  test.describe('with valid credentials', () => {
    test('should authenticate successfully', async ({ authenticationPage, page }) => {
      // ACT
      await authenticationPage.authenticate(users.STANDARD_USER.username, users.STANDARD_USER.password);

      // ASSERT
      await expect(page).toHaveURL('/inventory.html');
    });
  });

  test.describe('with invalid credentials', () => {
    test('should display an error when credentials are empty', async ({ authenticationPage }) => {
      // ACT
      await authenticationPage.authenticate('', '');

      // ASSERT
      await expect(authenticationPage.error).toHaveText('Epic sadface: Username is required');
    });

    test('should display an error when password is empty', async ({ authenticationPage }) => {
      // ACT
      await authenticationPage.authenticate(users.STANDARD_USER.username, '');

      // ASSERT
      await expect(authenticationPage.error).toHaveText('Epic sadface: Password is required');
    });

    test('should display an error when credentials are incorrect', async ({ authenticationPage }) => {
      // ACT
      await authenticationPage.authenticate(users.INVALID_USER.username, users.INVALID_USER.password);

      // ASSERT
      await expect(authenticationPage.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
  });
});