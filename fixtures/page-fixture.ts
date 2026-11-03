import { test as base } from '@playwright/test';
import { AuthenticationPage } from '../pages/authentication-page';

type PageFixtures = {
    authenticationPage: AuthenticationPage;
};

export const pageTest = base.extend<PageFixtures>({
    authenticationPage: async ({ page }, use) => {
        await use(new AuthenticationPage(page));
    }
});