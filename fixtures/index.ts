import { test as base } from '@playwright/test';
import { PageManager } from '../pages/manager/PageManager';

/**
 * Responsabilidades:
 * - instancia os Page Objects e os disponibiliza automaticamente aos testes.
 * - prepara os estados necessários para a execução dos testes (geralmente prepara o recurso sob demanda, acessando diretamente a API).
**/

type TestFixtures = {
    pm: PageManager;
};

export const test = base.extend<TestFixtures>({
    pm: async ({ page }, use) => {
        await use(new PageManager(page));
    }
});

export { expect } from '@playwright/test';