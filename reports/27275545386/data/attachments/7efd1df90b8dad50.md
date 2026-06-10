# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playground.spec.js >> Playground - Interactive Elements >> should reset counter
- Location: tests/playground.spec.js:113:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: page.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('[data-testid="increment-btn"]')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "🎯 Playwright Playground" [level=1] [ref=e3]
  - region "🔐 Login" [ref=e4]:
    - heading "🔐 Login" [level=2] [ref=e5]
    - form "Login form" [ref=e6]:
      - generic [ref=e7]: Username
      - textbox "Username" [ref=e8]:
        - /placeholder: Enter username
      - generic [ref=e9]: Password
      - textbox "Password" [ref=e10]:
        - /placeholder: Enter password
      - button "Sign In" [ref=e11] [cursor=pointer]
      - button "Reset" [ref=e12] [cursor=pointer]
    - paragraph [ref=e13]:
      - generic [ref=e14]:
        - text: "💡 Default user:"
        - strong [ref=e15]: admin
        - text: /
        - strong [ref=e16]: admin123
```

# Test source

```ts
  14  |     await expect(page.locator('[data-testid="login-btn"]')).toBeVisible();
  15  |   });
  16  | 
  17  |   test('should show validation errors for empty fields', async ({ page }) => {
  18  |     await page.click('[data-testid="login-btn"]');
  19  |     
  20  |     await expect(page.locator('#username-error')).toBeVisible();
  21  |     await expect(page.locator('#password-error')).toBeVisible();
  22  |   });
  23  | 
  24  |   test('should login successfully with valid credentials', async ({ page }) => {
  25  |     await page.fill('[data-testid="username-input"]', 'admin');
  26  |     await page.fill('[data-testid="password-input"]', 'admin123');
  27  |     await page.click('[data-testid="login-btn"]');
  28  |     
  29  |     const alert = page.locator('#login-alert');
  30  |     await expect(alert).toBeVisible();
  31  |     await expect(alert).toContainText('Login successful');
  32  |   });
  33  | 
  34  |   test('should show error with invalid credentials', async ({ page }) => {
  35  |     await page.fill('[data-testid="username-input"]', 'wronguser');
  36  |     await page.fill('[data-testid="password-input"]', 'wrongpass');
  37  |     await page.click('[data-testid="login-btn"]');
  38  |     
  39  |     const alert = page.locator('#login-alert');
  40  |     await expect(alert).toBeVisible();
  41  |     await expect(alert).toContainText('Invalid credentials');
  42  |   });
  43  | 
  44  |   test('should reset form', async ({ page }) => {
  45  |     await page.fill('[data-testid="username-input"]', 'testuser');
  46  |     await page.fill('[data-testid="password-input"]', 'testpass');
  47  |     await page.click('[data-testid="reset-btn"]');
  48  |     
  49  |     await expect(page.locator('[data-testid="username-input"]')).toHaveValue('');
  50  |     await expect(page.locator('[data-testid="password-input"]')).toHaveValue('');
  51  |   });
  52  | });
  53  | 
  54  | test.describe('Playground - Employee Table', () => {
  55  |   test.beforeEach(async ({ page }) => {
  56  |     await page.goto(PLAYGROUND_URL);
  57  |   });
  58  | 
  59  |   test('should display employee table with initial data', async ({ page }) => {
  60  |     await expect(page.locator('[data-testid="employees-table"]')).toBeVisible();
  61  |     await expect(page.locator('[data-testid="employee-row-1"]')).toContainText('John Doe');
  62  |     await expect(page.locator('[data-testid="employee-row-2"]')).toContainText('Jane Smith');
  63  |     await expect(page.locator('[data-testid="employee-row-3"]')).toContainText('Bob Wilson');
  64  |   });
  65  | 
  66  |   test('should add new employee', async ({ page }) => {
  67  |     const initialRows = await page.locator('[data-testid^="employee-row-"]').count();
  68  |     
  69  |     await page.click('[data-testid="add-employee-btn"]');
  70  |     
  71  |     const newRows = await page.locator('[data-testid^="employee-row-"]').count();
  72  |     expect(newRows).toBe(initialRows + 1);
  73  |   });
  74  | 
  75  |   test('should delete employee', async ({ page }) => {
  76  |     await expect(page.locator('[data-testid="employee-row-1"]')).toBeVisible();
  77  |     
  78  |     await page.click('[data-testid="delete-btn-1"]');
  79  |     
  80  |     await expect(page.locator('[data-testid="employee-row-1"]')).not.toBeVisible();
  81  |   });
  82  | 
  83  |   test('should search employees', async ({ page }) => {
  84  |     await page.fill('[data-testid="search-input"]', 'Jane');
  85  |     await page.click('[data-testid="search-btn"]');
  86  |     
  87  |     await expect(page.locator('[data-testid="employee-row-2"]')).toBeVisible();
  88  |     await expect(page.locator('[data-testid="employee-row-1"]')).not.toBeVisible();
  89  |   });
  90  | });
  91  | 
  92  | test.describe('Playground - Interactive Elements', () => {
  93  |   test.beforeEach(async ({ page }) => {
  94  |     await page.goto(PLAYGROUND_URL);
  95  |   });
  96  | 
  97  |   test('should increment counter', async ({ page }) => {
  98  |     await page.click('[data-testid="increment-btn"]');
  99  |     await expect(page.locator('[data-testid="counter"]')).toHaveText('1');
  100 |     
  101 |     await page.click('[data-testid="increment-btn"]');
  102 |     await expect(page.locator('[data-testid="counter"]')).toHaveText('2');
  103 |   });
  104 | 
  105 |   test('should decrement counter', async ({ page }) => {
  106 |     await page.click('[data-testid="increment-btn"]');
  107 |     await page.click('[data-testid="increment-btn"]');
  108 |     await page.click('[data-testid="decrement-btn"]');
  109 |     
  110 |     await expect(page.locator('[data-testid="counter"]')).toHaveText('1');
  111 |   });
  112 | 
  113 |   test('should reset counter', async ({ page }) => {
> 114 |     await page.click('[data-testid="increment-btn"]');
      |                ^ Error: page.click: Test timeout of 120000ms exceeded.
  115 |     await page.click('[data-testid="increment-btn"]');
  116 |     await page.click('[data-testid="increment-btn"]');
  117 |     await page.click('[data-testid="reset-counter-btn"]');
  118 |     
  119 |     await expect(page.locator('[data-testid="counter"]')).toHaveText('0');
  120 |   });
  121 | });
  122 | 
  123 | test.describe('Playground - Modal', () => {
  124 |   test.beforeEach(async ({ page }) => {
  125 |     await page.goto(PLAYGROUND_URL);
  126 |   });
  127 | 
  128 |   test('should open and close modal', async ({ page }) => {
  129 |     await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible();
  130 |     
  131 |     await page.click('[data-testid="open-modal-btn"]');
  132 |     await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();
  133 |     
  134 |     await page.click('[data-testid="close-modal-btn"]');
  135 |     await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible();
  136 |   });
  137 | 
  138 |   test('should close modal by clicking overlay', async ({ page }) => {
  139 |     await page.click('[data-testid="open-modal-btn"]');
  140 |     await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();
  141 |     
  142 |     await page.locator('[data-testid="modal-overlay"]').click({ position: { x: 50, y: 50 } });
  143 |     await expect(page.locator('[data-testid="modal-overlay"]')).not.toBeVisible();
  144 |   });
  145 | });
  146 | 
  147 | test.describe('Playground - Form Elements', () => {
  148 |   test.beforeEach(async ({ page }) => {
  149 |     await page.goto(PLAYGROUND_URL);
  150 |   });
  151 | 
  152 |   test('should fill text inputs', async ({ page }) => {
  153 |     await page.fill('[data-testid="fullname-input"]', 'John Doe');
  154 |     await page.fill('[data-testid="email-input"]', 'john@example.com');
  155 |     
  156 |     await expect(page.locator('[data-testid="fullname-input"]')).toHaveValue('John Doe');
  157 |     await expect(page.locator('[data-testid="email-input"]')).toHaveValue('john@example.com');
  158 |   });
  159 | 
  160 |   test('should select dropdown option', async ({ page }) => {
  161 |     await page.selectOption('[data-testid="department-select"]', 'marketing');
  162 |     await expect(page.locator('[data-testid="department-select"]')).toHaveValue('marketing');
  163 |   });
  164 | 
  165 |   test('should check checkboxes', async ({ page }) => {
  166 |     await page.check('[data-testid="terms-checkbox"]');
  167 |     await page.check('[data-testid="newsletter-checkbox"]');
  168 |     
  169 |     await expect(page.locator('[data-testid="terms-checkbox"]')).toBeChecked();
  170 |     await expect(page.locator('[data-testid="newsletter-checkbox"]')).toBeChecked();
  171 |   });
  172 | 
  173 |   test('should select radio button', async ({ page }) => {
  174 |     await page.check('[data-testid="priority-high"]');
  175 |     await expect(page.locator('[data-testid="priority-high"]')).toBeChecked();
  176 |     await expect(page.locator('[data-testid="priority-medium"]')).not.toBeChecked();
  177 |   });
  178 | 
  179 |   test('should fill textarea', async ({ page }) => {
  180 |     const notes = 'This is a test note';
  181 |     await page.fill('[data-testid="notes-textarea"]', notes);
  182 |     await expect(page.locator('[data-testid="notes-textarea"]')).toHaveValue(notes);
  183 |   });
  184 | 
  185 |   test('should submit form', async ({ page }) => {
  186 |     await page.fill('[data-testid="fullname-input"]', 'Test User');
  187 |     await page.click('[data-testid="submit-form-btn"]');
  188 |     
  189 |     const alert = page.locator('#form-alert');
  190 |     await expect(alert).toBeVisible();
  191 |     await expect(alert).toContainText('Form submitted successfully');
  192 |   });
  193 | });
  194 | 
```