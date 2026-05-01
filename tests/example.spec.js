import { test, expect } from './fixtures.js';
import users from '../test-data/users.json' assert { type: 'json' };

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('has correct title', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(/EAEmployee/);
  });

  test('Login nav link navigates to login page', async ({ homePage }) => {
    await homePage.clickLogin();
    await expect(homePage.page).toHaveURL(/Account\/Login/);
  });

  test('Register nav link navigates to register page', async ({ homePage }) => {
    await homePage.clickRegister();
    await expect(homePage.page).toHaveURL(/Account\/Register/);
  });

  test('View Employees hero button navigates to employees page', async ({ homePage }) => {
    await homePage.clickViewEmployees();
    await expect(homePage.page).toHaveURL(/Employee/);
  });
});

test.describe('Login page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('has correct title', async ({ loginPage }) => {
    await expect(loginPage.page).toHaveTitle(/Sign In/);
  });

  test('valid user can log in', async ({ loginPage }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(loginPage.page).not.toHaveURL(/Account\/Login/);
  });

  test('invalid credentials show validation errors', async ({ loginPage }) => {
    await loginPage.signInButton.click();
    await expect(loginPage.usernameError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
  });
});
