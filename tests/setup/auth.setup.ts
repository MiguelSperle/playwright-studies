import { test as setup, expect } from '../../fixtures/base';
import { users } from '../../data/users';

const authFile = 'playwright/.auth/user.json';

setup('configure authenticated user', async ({ authenticationPage, page, context }) => {
  await authenticationPage.goto();

  await authenticationPage.authenticate(users.STANDARD_USER.username, users.STANDARD_USER.password);

  await expect(page).toHaveURL('/inventory.html');

  await context.storageState({ path: authFile });
}); 