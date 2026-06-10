import { test, expect } from '@playwright/test';

// Use local playground for reliable testing
const PLAYGROUND_URL = 'file://' + process.cwd() + '/public/playground.html';

test.describe('Playground - Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('[data-testid="username-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-btn"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('[data-testid="login-btn"]');
    
    await expect(page.locator('#username-error')).toBeVisible();
    await expect(page.locator('#password-error')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-btn"]');
    
    const alert = page.locator('#login-alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Login successful');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('[data-testid="username-input"]', 'wronguser');
    await page.fill('[data-testid="password-input"]', 'wrongpass');
    await page.click('[data-testid="login-btn"]');
    
    const alert = page.locator('#login-alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Invalid credentials');
  });

  test('should reset form', async ({ page }) => {
    await page.fill('[data-testid="username-input"]', 'testuser');
    await page.fill('[data-testid="password-input"]', 'testpass');
    await page.click('[data-testid="reset-btn"]');
    
    await expect(page.locator('[data-testid="username-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="password-input"]')).toHaveValue('');
  });
});

test.describe('Playground - Employee Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
  });

  test('should display employee table with initial data', async ({ page }) => {
    await expect(page.locator('[data-testid="employees-table"]')).toBeVisible();
    await expect(page.locator('[data-testid="employee-row-1"]')).toContainText('John Doe');
    await expect(page.locator('[data-testid="employee-row-2"]')).toContainText('Jane Smith');
    await expect(page.locator('[data-testid="employee-row-3"]')).toContainText('Bob Wilson');
  });

  test('should add new employee', async ({ page }) => {
    const initialRows = await page.locator('[data-testid^="employee-row-"]').count();
    
    await page.click('[data-testid="add-employee-btn"]');
    
    const newRows = await page.locator('[data-testid^="employee-row-"]').count();
    expect(newRows).toBe(initialRows + 1);
  });

  test('should delete employee', async ({ page }) => {
    await expect(page.locator('[data-testid="employee-row-1"]')).toBeVisible();
    
    await page.click('[data-testid="delete-btn-1"]');
    
    await expect(page.locator('[data-testid="employee-row-1"]')).not.toBeVisible();
  });

  test('should search employees', async ({ page }) => {
    await page.fill('[data-testid="search-input"]', 'Jane');
    await page.click('[data-testid="search-btn"]');
    
    await expect(page.locator('[data-testid="employee-row-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="employee-row-1"]')).not.toBeVisible();
  });
});

test.describe('Playground - Interactive Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
  });

  test('should increment counter', async ({ page }) => {
    await page.click('[data-testid="increment-btn"]');
    await expect(page.locator('[data-testid="counter"]')).toHaveText('1');
    
    await page.click('[data-testid="increment-btn"]');
    await expect(page.locator('[data-testid="counter"]')).toHaveText('2');
  });

  test('should decrement counter', async ({ page }) => {
    await page.click('[data-testid="increment-btn"]');
    await page.click('[data-testid="increment-btn"]');
    await page.click('[data-testid="decrement-btn"]');
    
    await expect(page.locator('[data-testid="counter"]')).toHaveText('1');
  });

  test('should reset counter', async ({ page }) => {
    await page.click('[data-testid="increment-btn"]');
    await page.click('[data-testid="increment-btn"]');
    await page.click('[data-testid="increment-btn"]');
    await page.click('[data-testid="reset-counter-btn"]');
    
    await expect(page.locator('[data-testid="counter"]')).toHaveText('0');
  });
});

test.describe('Playground - Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
  });

  test('should open and close modal', async ({ page }) => {
    await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible();
    
    await page.click('[data-testid="open-modal-btn"]');
    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();
    
    await page.click('[data-testid="close-modal-btn"]');
    await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible();
  });

  test('should close modal by clicking overlay', async ({ page }) => {
    await page.click('[data-testid="open-modal-btn"]');
    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();
    
    await page.locator('[data-testid="modal-overlay"]').click({ position: { x: 50, y: 50 } });
    await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible();
  });
});

test.describe('Playground - Form Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
  });

  test('should fill text inputs', async ({ page }) => {
    await page.fill('[data-testid="fullname-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    
    await expect(page.locator('[data-testid="fullname-input"]')).toHaveValue('John Doe');
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue('john@example.com');
  });

  test('should select dropdown option', async ({ page }) => {
    await page.selectOption('[data-testid="department-select"]', 'marketing');
    await expect(page.locator('[data-testid="department-select"]')).toHaveValue('marketing');
  });

  test('should check checkboxes', async ({ page }) => {
    await page.check('[data-testid="terms-checkbox"]');
    await page.check('[data-testid="newsletter-checkbox"]');
    
    await expect(page.locator('[data-testid="terms-checkbox"]')).toBeChecked();
    await expect(page.locator('[data-testid="newsletter-checkbox"]')).toBeChecked();
  });

  test('should select radio button', async ({ page }) => {
    await page.check('[data-testid="priority-high"]');
    await expect(page.locator('[data-testid="priority-high"]')).toBeChecked();
    await expect(page.locator('[data-testid="priority-medium"]')).not.toBeChecked();
  });

  test('should fill textarea', async ({ page }) => {
    const notes = 'This is a test note';
    await page.fill('[data-testid="notes-textarea"]', notes);
    await expect(page.locator('[data-testid="notes-textarea"]')).toHaveValue(notes);
  });

  test('should submit form', async ({ page }) => {
    await page.fill('[data-testid="fullname-input"]', 'Test User');
    await page.click('[data-testid="submit-form-btn"]');
    
    const alert = page.locator('#form-alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Form submitted successfully');
  });
});
