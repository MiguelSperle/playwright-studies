import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ context, baseURL }) => {
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      url: baseURL!,
    },
  ]);

  await context.storageState({ path: authFile });
});