import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';
import { APIClient } from '../utils/APIClient.js';

// Global setup for CI - check server connectivity
const BASE_URL = process.env.BASE_URL || 'http://eaapp.somee.com';
const CI = !!process.env.CI;

if (CI) {
  // Quick connectivity check before tests start
  test.beforeAll('Check server connectivity', async ({ request }) => {
    try {
      const response = await request.get(BASE_URL, { timeout: 30000 });
      console.log(`✓ Server reachable: ${BASE_URL} (status: ${response.status()})`);
    } catch (error) {
      console.error(`✗ Server unreachable: ${BASE_URL}`);
      console.error(`Error: ${error.message}`);
      throw new Error(`Application server at ${BASE_URL} is not reachable. Check if the service is running.`);
    }
  });
}

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  api: async ({ request }, use) => {
    await use(new APIClient(request));
  },
});

export { expect } from '@playwright/test';
