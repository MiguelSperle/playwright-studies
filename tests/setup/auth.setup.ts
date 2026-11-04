import { test as setup, expect } from '../../fixtures';
import { users } from '../../data/users';

/**
 * Setup de autenticação do Playwright.
 *
 * Faz o login uma única vez e salva o estado da sessão (cookies e
 * localStorage) em um arquivo, para que os demais testes já comecem
 * autenticados, sem precisar repetir o login em cada um.
 */

const authFile: string = 'playwright/.auth/user.json';

setup('configure authenticated user', async ({ pm, page }) => {
  await pm.onAuthenticationPage().goto();

  await pm.onAuthenticationPage().authenticate(users.STANDARD_USER.username, users.STANDARD_USER.password);

  await expect(page).toHaveURL('/inventory.html');

  await page.context().storageState({ path: authFile });
}); 