import { test, expect } from './fixtures.js';

test.describe('@playground Playground - Authentication (POM)', () => {
  test.beforeEach(async ({ playground }) => {
    await playground.goto();
  });

  test('should display login form on initial load', async ({ playground }) => {
    await expect(playground.loginCard).toBeVisible();
    await expect(playground.usernameInput).toBeVisible();
    await expect(playground.passwordInput).toBeVisible();
    await expect(playground.loginBtn).toBeVisible();
    await expect(playground.loggedInContent).not.toBeVisible();
  });

  test('should show validation errors for empty credentials', async ({ playground }) => {
    await playground.loginBtn.click();
    
    await playground.expectUsernameError();
    await playground.expectPasswordError();
  });

  test('should login successfully with valid credentials', async ({ playground }) => {
    await playground.login('admin', 'admin123');
    
    await playground.expectLoggedIn();
    await playground.expectUserLoggedIn('admin');
    await expect(playground.logoutBtn).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ playground }) => {
    await playground.login('wronguser', 'wrongpass');
    
    await playground.expectLoginError();
  });

  test('should logout successfully', async ({ playground }) => {
    // Login first
    await playground.login('admin', 'admin123');
    await playground.expectLoggedIn();
    
    // Logout
    await playground.logout();
    
    // Verify logged out state
    await playground.expectLoggedOut();
    await expect(playground.usernameInput).toHaveValue('');
    await expect(playground.passwordInput).toHaveValue('');
  });

  test('should persist login state using localStorage', async ({ playground, page }) => {
    // Login
    await playground.login('admin', 'admin123');
    await playground.expectLoggedIn();
    
    // Reload page - should stay logged in
    await page.reload();
    await playground.expectLoggedIn();
    await playground.expectUserLoggedIn('admin');
  });

  test('should reset login form', async ({ playground }) => {
    await playground.fillLoginForm('testuser', 'testpass');
    await playground.resetLoginForm();
    
    await expect(playground.usernameInput).toHaveValue('');
    await expect(playground.passwordInput).toHaveValue('');
  });
});

test.describe('@playground Playground - Employee Management (POM)', () => {
  test.beforeEach(async ({ playground }) => {
    await playground.goto();
    await playground.login('admin', 'admin123');
    await playground.expectLoggedIn();
  });

  test('should display employee table with initial data', async ({ playground }) => {
    await expect(playground.employeesTable).toBeVisible();
    
    await playground.expectEmployeeRow(1, 'John Doe');
    await playground.expectEmployeeRow(2, 'Jane Smith');
    await playground.expectEmployeeRow(3, 'Bob Wilson');
  });

  test('should add new employee via form', async ({ playground }) => {
    const initialCount = await playground.employeesTable.locator('tbody tr').count();
    
    await playground.addEmployee('Test Employee', 'Engineering', 'Active');
    
    const newCount = await playground.employeesTable.locator('tbody tr').count();
    expect(newCount).toBe(initialCount + 1);
    await playground.expectEmployeeAdded('Test Employee');
  });

  test('should validate employee form fields', async ({ playground }) => {
    await playground.addEmployeeBtn.click();
    
    await expect(playground.employeeAlert).toBeVisible();
    await expect(playground.employeeAlert).toContainText('Please fill in all required fields');
  });

  test('should delete employee', async ({ playground }) => {
    await playground.expectEmployeeRow(1, 'John Doe');
    
    await playground.deleteEmployee(1);
    
    await playground.expectEmployeeRowNotVisible(1);
  });

  test('should search employees by name', async ({ playground }) => {
    await playground.searchEmployees('Jane');
    
    await playground.expectEmployeeRow(2, 'Jane Smith');
    await playground.expectEmployeeRowNotVisible(1);
  });

  test('should filter dropdown options', async ({ playground }) => {
    const deptSelect = playground.empDepartmentSelect;
    await expect(deptSelect.locator('option[value="Engineering"]')).toHaveText('Engineering');
    await expect(deptSelect.locator('option[value="Marketing"]')).toHaveText('Marketing');
    await expect(deptSelect.locator('option[value="Sales"]')).toHaveText('Sales');
    
    const statusSelect = playground.empStatusSelect;
    await expect(statusSelect.locator('option[value="Active"]')).toHaveText('Active');
    await expect(statusSelect.locator('option[value="Inactive"]')).toHaveText('Inactive');
  });

  test('should edit employee (populate form)', async ({ playground }) => {
    await playground.editEmployee(1);
    
    await expect(playground.empNameInput).toHaveValue('John Doe');
    await expect(playground.empDepartmentSelect).toHaveValue('Engineering');
  });

  test('should refresh employee list', async ({ playground }) => {
    await playground.refreshEmployees();
    await playground.expectEmployeeRow(1, 'John Doe');
  });
});

test.describe('@playground Playground - API Testing (POM)', () => {
  test.beforeEach(async ({ playground }) => {
    await playground.goto();
    await playground.login('admin', 'admin123');
    await playground.expectLoggedIn();
  });

  test('should call GET /api/employees endpoint', async ({ playground }) => {
    await playground.callAPI('/api/employees');
    
    await playground.expectAPIResponseContains('"success": true');
    await playground.expectAPIResponseContains('"data"');
    await playground.expectAPIResponseContains('"count"');
  });

  test('should call GET /api/employees/1 endpoint', async ({ playground }) => {
    await playground.callAPI('/api/employees/1');
    
    await playground.expectAPIResponseContains('"success": true');
    await playground.expectAPIResponseContains('John Doe');
  });

  test('should call GET /api/user endpoint when logged in', async ({ playground }) => {
    await playground.callAPI('/api/user');
    
    await playground.expectAPIResponseContains('"success": true');
    await playground.expectAPIResponseContains('admin');
  });

  test('should call GET /api/stats endpoint', async ({ playground }) => {
    await playground.callAPI('/api/stats');
    
    await playground.expectAPIResponseContains('"totalEmployees"');
    await playground.expectAPIResponseContains('"activeCount"');
    await playground.expectAPIResponseContains('"departments"');
  });

  test('should display API response in formatted JSON', async ({ playground }) => {
    await playground.callAPI('/api/employees');
    
    const response = playground.apiResponse;
    await expect(response).toHaveText(/^{[\s\S]*}$/);
  });
});
