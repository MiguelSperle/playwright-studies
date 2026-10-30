import { test as setup, expect } from '../../fixtures/base';
import { USER } from '../../data/users';

const authFile = 'playwright/.auth/user.json';

setup('configure authenticated user', async ({ authenticationPage, page, context }) => {
  await authenticationPage.goto();

  await authenticationPage.authenticate(USER.STANDARD.username, USER.STANDARD.password);

  await expect(page).toHaveURL('/inventory.html');

  await context.storageState({ path: authFile });
}); 