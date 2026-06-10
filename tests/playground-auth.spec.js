import { test, expect } from '@playwright/test';

const PLAYGROUND_URL = 'file://' + process.cwd() + '/public/playground.html';

test.describe('Playground - Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
  });

  test('should display login form on initial load', async ({ page }) => {
    await expect(page.locator('#login-card')).toBeVisible();
    await expect(page.locator('[data-testid="username-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-btn"]')).toBeVisible();
    await expect(page.locator('#logged-in-content')).not.toBeVisible();
  });

  test('should show validation errors for empty credentials', async ({ page }) => {
    await page.click('[data-testid="login-btn"]');
    
    await expect(page.locator('#username-error')).toBeVisible();
    await expect(page.locator('#password-error')).toBeVisible();
    await expect(page.locator('#login-alert')).toContainText('Please fix the errors');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-btn"]');
    
    // Wait for login to complete
    await expect(page.locator('#logged-in-content')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#current-user')).toHaveText('admin');
    await expect(page.locator('[data-testid="logout-btn"]')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('[data-testid="username-input"]', 'wronguser');
    await page.fill('[data-testid="password-input"]', 'wrongpass');
    await page.click('[data-testid="login-btn"]');
    
    const alert = page.locator('#login-alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Invalid credentials');
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-btn"]');
    await expect(page.locator('#logged-in-content')).toBeVisible();
    
    // Logout
    await page.click('[data-testid="logout-btn"]');
    
    // Verify logged out state
    await expect(page.locator('#login-card')).toBeVisible();
    await expect(page.locator('#logged-in-content')).not.toBeVisible();
    await expect(page.locator('[data-testid="username-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="password-input"]')).toHaveValue('');
  });

  test('should persist login state using localStorage', async ({ page, context }) => {
    // Login
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-btn"]');
    await expect(page.locator('#logged-in-content')).toBeVisible();
    
    // Reload page - should stay logged in
    await page.reload();
    await expect(page.locator('#logged-in-content')).toBeVisible();
    await expect(page.locator('#current-user')).toHaveText('admin');
  });

  test('should reset login form', async ({ page }) => {
    await page.fill('[data-testid="username-input"]', 'testuser');
    await page.fill('[data-testid="password-input"]', 'testpass');
    await page.click('[data-testid="reset-btn"]');
    
    await expect(page.locator('[data-testid="username-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="password-input"]')).toHaveValue('');
  });
});

test.describe('Playground - Employee Management (Authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    // Login before each test
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-btn"]');
    await expect(page.locator('#logged-in-content')).toBeVisible();
  });

  test('should display employee table with initial data', async ({ page }) => {
    await expect(page.locator('[data-testid="employees-table"]')).toBeVisible();
    
    // Check initial employees exist
    await expect(page.locator('[data-testid="employee-row-1"]')).toContainText('John Doe');
    await expect(page.locator('[data-testid="employee-row-2"]')).toContainText('Jane Smith');
    await expect(page.locator('[data-testid="employee-row-3"]')).toContainText('Bob Wilson');
  });

  test('should add new employee via form', async ({ page }) => {
    const initialCount = await page.locator('[data-testid^="employee-row-"]').count();
    
    // Fill form
    await page.fill('[data-testid="emp-name-input"]', 'Test Employee');
    await page.selectOption('[data-testid="emp-department-select"]', 'Engineering');
    await page.selectOption('[data-testid="emp-status-select"]', 'Active');
    await page.click('[data-testid="add-employee-btn"]');
    
    // Verify added
    const newCount = await page.locator('[data-testid^="employee-row-"]').count();
    expect(newCount).toBe(initialCount + 1);
    await expect(page.locator('#employee-alert')).toContainText('added successfully');
  });

  test('should validate employee form fields', async ({ page }) => {
    await page.click('[data-testid="add-employee-btn"]');
    
    const alert = page.locator('#employee-alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Please fill in all required fields');
  });

  test('should delete employee', async ({ page }) => {
    await expect(page.locator('[data-testid="employee-row-1"]')).toBeVisible();
    
    await page.click('[data-testid="delete-btn-1"]');
    
    await expect(page.locator('[data-testid="employee-row-1"]')).not.toBeVisible();
  });

  test('should search employees by name', async ({ page }) => {
    await page.fill('[data-testid="search-input"]', 'Jane');
    await page.click('[data-testid="search-btn"]');
    
    await expect(page.locator('[data-testid="employee-row-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="employee-row-1"]')).not.toBeVisible();
  });

  test('should filter dropdown options', async ({ page }) => {
    const departmentSelect = page.locator('[data-testid="emp-department-select"]');
    await expect(departmentSelect.locator('option[value="Engineering"]')).toHaveText('Engineering');
    await expect(departmentSelect.locator('option[value="Marketing"]')).toHaveText('Marketing');
    await expect(departmentSelect.locator('option[value="Sales"]')).toHaveText('Sales');
    
    const statusSelect = page.locator('[data-testid="emp-status-select"]');
    await expect(statusSelect.locator('option[value="Active"]')).toHaveText('Active');
    await expect(statusSelect.locator('option[value="Inactive"]')).toHaveText('Inactive');
  });

  test('should edit employee (populate form)', async ({ page }) => {
    await page.click('[data-testid="edit-btn-1"]');
    
    await expect(page.locator('[data-testid="emp-name-input"]')).toHaveValue('John Doe');
    await expect(page.locator('[data-testid="emp-department-select"]')).toHaveValue('Engineering');
  });

  test('should refresh employee list', async ({ page }) => {
    await page.click('[data-testid="refresh-btn"]');
    
    // Should reload the table
    await expect(page.locator('[data-testid="employee-row-1"]')).toBeVisible();
  });
});

test.describe('Playground - API Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-btn"]');
    await expect(page.locator('#logged-in-content')).toBeVisible();
  });

  test('should call GET /api/employees endpoint', async ({ page }) => {
    await page.selectOption('[data-testid="api-endpoint-select"]', '/api/employees');
    await page.click('[data-testid="api-call-btn"]');
    
    const response = page.locator('[data-testid="api-response"]');
    await expect(response).toContainText('"success": true');
    await expect(response).toContainText('"data"');
    await expect(response).toContainText('"count"');
  });

  test('should call GET /api/employees/1 endpoint', async ({ page }) => {
    await page.selectOption('[data-testid="api-endpoint-select"]', '/api/employees/1');
    await page.click('[data-testid="api-call-btn"]');
    
    const response = page.locator('[data-testid="api-response"]');
    await expect(response).toContainText('"success": true');
    await expect(response).toContainText('John Doe');
  });

  test('should call GET /api/user endpoint when logged in', async ({ page }) => {
    await page.selectOption('[data-testid="api-endpoint-select"]', '/api/user');
    await page.click('[data-testid="api-call-btn"]');
    
    const response = page.locator('[data-testid="api-response"]');
    await expect(response).toContainText('"success": true');
    await expect(response).toContainText('admin');
  });

  test('should call GET /api/stats endpoint', async ({ page }) => {
    await page.selectOption('[data-testid="api-endpoint-select"]', '/api/stats');
    await page.click('[data-testid="api-call-btn"]');
    
    const response = page.locator('[data-testid="api-response"]');
    await expect(response).toContainText('"totalEmployees"');
    await expect(response).toContainText('"activeCount"');
    await expect(response).toContainText('"departments"');
  });

  test('should display API response in formatted JSON', async ({ page }) => {
    await page.selectOption('[data-testid="api-endpoint-select"]', '/api/employees');
    await page.click('[data-testid="api-call-btn"]');
    
    const response = page.locator('[data-testid="api-response"]');
    await expect(response).toHaveText(/^{[\s\S]*}$/); // Should be JSON format
  });
});
