import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:43147',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'node ./node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 43147',
    url: 'http://127.0.0.1:43147',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
