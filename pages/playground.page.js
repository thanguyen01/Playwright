import { BasePage } from './base.page.js';
import { expect } from '@playwright/test';

export class PlaygroundPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Login Card
    this.loginCard = page.locator('#login-card');
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginBtn = page.getByRole('button', { name: 'Sign In' });
    this.resetBtn = page.getByRole('button', { name: 'Reset' });
    this.usernameError = page.locator('#username-error');
    this.passwordError = page.locator('#password-error');
    this.loginAlert = page.locator('#login-alert');

    // Logged In Content
    this.loggedInContent = page.locator('#logged-in-content');
    this.currentUserLabel = page.locator('#current-user');
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });

    // Employee Management
    this.empNameInput = page.locator('[data-testid="emp-name-input"]');
    this.empDepartmentSelect = page.locator('[data-testid="emp-department-select"]');
    this.empStatusSelect = page.locator('[data-testid="emp-status-select"]');
    this.addEmployeeBtn = page.getByRole('button', { name: 'Add Employee' });
    this.searchInput = page.getByPlaceholder('Search employees...');
    this.searchBtn = page.getByRole('button', { name: 'Search' });
    this.refreshBtn = page.getByRole('button', { name: 'Refresh' });
    this.employeesTable = page.getByRole('table');
    this.employeeAlert = page.locator('#employee-alert');

    // API Testing
    this.apiEndpointSelect = page.locator('[data-testid="api-endpoint-select"]');
    this.apiCallBtn = page.getByRole('button', { name: 'Call API' });
    this.apiResponse = page.locator('#api-response');
    this.apiAlert = page.locator('#api-alert');
  }

  async goto() {
    const PLAYGROUND_URL = 'file://' + process.cwd() + '/public/playground.html';
    await this.page.goto(PLAYGROUND_URL);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async logout() {
    await this.logoutBtn.click();
  }

  async fillLoginForm(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async resetLoginForm() {
    await this.resetBtn.click();
  }

  // Employee Actions
  async addEmployee(name, department, status) {
    await this.empNameInput.fill(name);
    await this.empDepartmentSelect.selectOption(department);
    await this.empStatusSelect.selectOption(status);
    await this.addEmployeeBtn.click();
  }

  async deleteEmployee(id) {
    await this.page.locator(`[data-testid="delete-btn-${id}"]`).click();
  }

  async editEmployee(id) {
    await this.page.locator(`[data-testid="edit-btn-${id}"]`).click();
  }

  async searchEmployees(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchBtn.click();
  }

  async refreshEmployees() {
    await this.refreshBtn.click();
  }

  // API Actions
  async callAPI(endpoint) {
    await this.apiEndpointSelect.selectOption(endpoint);
    await this.apiCallBtn.click();
  }

  // Assertions
  async expectLoggedIn() {
    await expect(this.loggedInContent).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.loginCard).toBeVisible();
    await expect(this.loggedInContent).not.toBeVisible();
  }

  async expectUserLoggedIn(username) {
    await expect(this.currentUserLabel).toHaveText(username);
  }

  async expectLoginSuccess(message = 'Login successful') {
    await expect(this.loginAlert).toBeVisible();
    await expect(this.loginAlert).toContainText(message);
  }

  async expectLoginError(message = 'Invalid credentials') {
    await expect(this.loginAlert).toBeVisible();
    await expect(this.loginAlert).toContainText(message);
  }

  async expectUsernameError() {
    await expect(this.usernameError).toBeVisible();
  }

  async expectPasswordError() {
    await expect(this.passwordError).toBeVisible();
  }

  async expectEmployeeAdded(name) {
    await expect(this.employeeAlert).toContainText(`${name}" added successfully`);
  }

  async expectEmployeeDeleted(name) {
    await expect(this.employeeAlert).toContainText(`${name}" deleted`);
  }

  async expectEmployeeRow(id, name) {
    const row = this.page.locator(`[data-testid="employee-row-${id}"]`);
    await expect(row).toBeVisible();
    await expect(row).toContainText(name);
  }

  async expectEmployeeRowNotVisible(id) {
    await expect(this.page.locator(`[data-testid="employee-row-${id}"]`)).not.toBeVisible();
  }

  async expectAPIResponseContains(text) {
    await expect(this.apiResponse).toContainText(text);
  }
}

export default PlaygroundPage;
