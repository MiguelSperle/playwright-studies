import { test as base } from '@playwright/test';
import { HeaderComponent } from '../components/header-component';

type ComponentFixtures = {
  headerComponent: HeaderComponent
};

export const componentTest = base.extend<ComponentFixtures>({
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
});