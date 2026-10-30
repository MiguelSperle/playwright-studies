import { mergeTests } from '@playwright/test';
import { pageTest } from './page-fixture';
import { componentTest } from './component-fixture';

export const test = mergeTests(pageTest, componentTest);

export { expect } from '@playwright/test';