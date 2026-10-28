import { test as setup, expect } from '../../fixtures/base';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ authenticationPage, page, context }) => {
  await authenticationPage.navigate();

  await authenticationPage.authenticate('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('/inventory.html');

  await context.storageState({ path: authFile });
}); 