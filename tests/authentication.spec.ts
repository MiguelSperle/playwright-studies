import { test, expect } from '../fixtures/base';

test.beforeEach(async ({ authenticationPage }) => {
  await authenticationPage.open();
});

test('authenticate with valid credentials', async ({ authenticationPage, page }) => {
  await authenticationPage.authenticate('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('/inventory.html');
});

test('authenticate with empty credentials', async ({ authenticationPage }) => {
  await authenticationPage.authenticate('', '');

  await expect(authenticationPage.error).toHaveText('Epic sadface: Username is required');
});

test('authenticate with empty password', async ({ authenticationPage }) => {
  await authenticationPage.authenticate('standard_user', '')

  await expect(authenticationPage.error).toHaveText('Epic sadface: Password is required');
});

test('authenticate with wrong credentials', async ({ authenticationPage }) => {
  await authenticationPage.authenticate('wrong_user', 'wrong_password');

  await expect(authenticationPage.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
});
