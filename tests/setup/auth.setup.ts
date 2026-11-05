import { test as setup, expect } from '../../fixtures';
import { users } from '../../data/users';

/**
 * Setup de autenticação do Playwright.
 * 
 * A abordagem preferencial é realizar a autenticação via API durante o setup.
 * 
 * Caso a API de autenticação não esteja disponível, a autenticação pode ser realizado
 * pela interface (UI), permitindo validar o fluxo real de autenticação, mesmo que somente a nível de interface.
 */

const authFile: string = 'playwright/.auth/user.json';

setup('authenticate', async ({ pm, page }) => {
  await pm.onAuthenticationPage().goto();

  await pm.onAuthenticationPage().authenticate(users.STANDARD_USER.username, users.STANDARD_USER.password);

  await expect(page).toHaveURL('/inventory.html');

  await page.context().storageState({ path: authFile });
}); 