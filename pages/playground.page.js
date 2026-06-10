import { expect } from '@playwright/test';

export class PlaygroundPage {
  constructor(page) {
    this.page = page;
  }

  // Login Card Elements
  get loginCard() { return this.page.locator('#login-card'); }
  get usernameInput() { return this.page.locator('[data-testid="username-input"]'); }
  get passwordInput() { return this.page.locator('[data-testid="password-input"]'); }
  get loginBtn() { return this.page.locator('[data-testid="login-btn"]'); }
  get resetBtn() { return this.page.locator('[data-testid="reset-btn"]'); }
  get usernameError() { return this.page.locator('#username-error'); }
  get passwordError() { return this.page.locator('#password-error'); }
  get loginAlert() { return this.page.locator('#login-alert'); }

  // Logged In Content
  get loggedInContent() { return this.page.locator('#logged-in-content'); }
  get currentUserLabel() { return this.page.locator('#current-user'); }
  get logoutBtn() { return this.page.locator('[data-testid="logout-btn"]'); }

  // Employee Management
  get employeeCard() { return this.page.locator('text=Employee Management').first(); }
  get empNameInput() { return this.page.locator('[data-testid="emp-name-input"]'); }
  get empDepartmentSelect() { return this.page.locator('[data-testid="emp-department-select"]'); }
  get empStatusSelect() { return this.page.locator('[data-testid="emp-status-select"]'); }
  get addEmployeeBtn() { return this.page.locator('[data-testid="add-employee-btn"]'); }
  get searchInput() { return this.page.locator('[data-testid="search-input"]'); }
  get searchBtn() { return this.page.locator('[data-testid="search-btn"]'); }
  get refreshBtn() { return this.page.locator('[data-testid="refresh-btn"]'); }
  get employeesTable() { return this.page.locator('[data-testid="employees-table"]'); }
  get employeeAlert() { return this.page.locator('#employee-alert'); }

  // API Testing
  get apiEndpointSelect() { return this.page.locator('[data-testid="api-endpoint-select"]'); }
  get apiCallBtn() { return this.page.locator('[data-testid="api-call-btn"]'); }
  get apiResponse() { return this.page.locator('[data-testid="api-response"]'); }
  get apiAlert() { return this.page.locator('#api-alert'); }

  // Actions
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

  async submitLoginForm() {
    await this.loginBtn.click();
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
