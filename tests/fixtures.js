import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';
import { APIClient } from '../utils/APIClient.js';
import { PlaygroundPage } from '../pages/playground.page.js';

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
  playground: async ({ page }, use) => {
    await use(new PlaygroundPage(page));
  },
});

export { expect };
