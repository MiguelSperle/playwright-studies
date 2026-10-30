import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const authFile = 'playwright/.auth/user.json';

const browsers = [
  { name: 'chromium', device: devices['Desktop Chrome'] },
  { name: 'firefox', device: devices['Desktop Firefox'] },
  { name: 'webkit', device: devices['Desktop Safari'] },
];

// Define guest specs
const guestSpecs = ['**/authenticate.spec.ts'];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code */
  retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  workers: process.env.CI ? 1 : undefined,   /* Opt out of parallel tests on CI. */
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    testIdAttribute: 'data-test',
  },
  projects: [
    // SETUP
    { name: 'setup', testMatch: '**/auth.setup.ts' },

    // GUEST 
    ...browsers.map(({ name, device }) => ({
      name: `guest-${name}`,
      testMatch: guestSpecs,
      use: { ...device },
    })),

    // AUTHENTICATED
    ...browsers.map(({ name, device }) => ({
      name: `authenticated-${name}`,
      testIgnore: ['**/auth.setup.ts', ...guestSpecs],
      use: { ...device, storageState: authFile },
      dependencies: ['setup'],
    })),
  ],
});