# 🎭 Playwright Test Automation Framework

A comprehensive, production-ready test automation framework built with [Playwright](https://playwright.dev/), featuring Page Object Model pattern, API testing, multi-browser support, and full CI/CD integration.

## 🚀 Features

- **Page Object Model (POM)** - Maintainable and scalable test structure with BasePage pattern
- **Custom Test Fixtures** - Extended Playwright fixtures including API client and page objects
- **Multi-Browser Testing** - Run tests on Chromium, Firefox, and WebKit simultaneously
- **API Testing Layer** - APIClient utility for real HTTP requests (GET, POST, PUT, DELETE)
- **Authentication Management** - Global setup/teardown with session storage and reuse
- **Multiple Reporters** - HTML, JUnit/XML, and Allure reports configured together
- **Test Organization** - Tag-based test filtering (@smoke, @regression, @critical, @playground)
- **CI/CD Ready** - GitHub Actions workflow with Node.js 24 support
- **Environment Configuration** - dotenv integration for flexible configuration
- **Screenshot & Video Capture** - Automatic capture on failures
- **Retry Logic** - Smart retries: 2 in CI, 0 locally
- **Plug-and-Play** - Reusable framework for any website

## 📋 Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** 8+ (comes with Node.js)
- **Git** (optional, for version control)

## 🔧 Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd /path/to/Playwright
   ```

2. **Install dependencies**

   ```bash
   npm ci
   # or
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## ⚙️ Configuration

### Environment Variables

Edit `.env` file with your test environment details:

```env
BASE_URL=http://eaapp.somee.com
TEST_USERNAME=admin
TEST_PASSWORD=password
LOGIN_URL=http://eaapp.somee.com/login
```

### Playwright Config

Main configuration in `playwright.config.js`:

- **testDir**: Directory containing test files (`./tests`)
- **retries**: 2 in CI environment, 0 locally
- **workers**: 1 in CI, automatic otherwise
- **reporters**: HTML, JUnit, and Allure
- **projects**: Chromium, Firefox, WebKit
- **globalSetup**: Authentication session management

## 📁 Project Structure

```
.
├── pages/                      # Page Object Models
│   ├── base.page.js           # Base class with common methods
│   ├── home.page.js           # Home page object
│   ├── login.page.js          # Login page object
│   └── playground.page.js     # Playground page object (local testing)
├── tests/                      # Test files
│   ├── fixtures.js            # Custom test fixtures
│   ├── example.spec.js        # Example UI tests
│   ├── api.spec.js            # Real API tests
│   ├── playground-pom.spec.js # Playground tests (POM pattern)
│   ├── playground-auth.spec.js# Playground auth tests
│   └── playground.spec.js     # Playground basic tests
├── utils/                      # Utility functions
│   └── APIClient.js           # API testing utility
├── fixtures/                   # Test data files
│   └── users.json             # User test data
├── public/                     # Static files for local testing
│   └── playground.html        # Interactive test playground
├── .auth/                      # Authentication storage (auto-generated)
│   └── user.json              # Saved session state
├── .github/workflows/          # CI/CD configuration
│   └── tests.yml              # GitHub Actions workflow
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🏃 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests with debug mode
npm run test:debug

# Show HTML report
npm run test:report
```

### Browser-Specific Tests

```bash
# Run on Chromium only
npm run test:chrome

# Run on Firefox only
npm run test:firefox

# Run on WebKit only
npm run test:webkit
```

### Test Filtering by Tags

```bash
# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run critical tests only
npm run test:critical

# Run playground tests only
npx playwright test --grep '@playground'

# Exclude playground tests from main suite
npx playwright test --grep-invert '@playground'
```

## 📊 Reports

### HTML Report
Automatically generated after test runs:
```bash
npx playwright show-report
```

### Allure Report
```bash
# Generate report
npm run report:allure

# Open report
npm run report:allure:open
```

### JUnit XML
Generated at `test-results/junit.xml` for CI/CD integration.

## 🔌 API Testing

The framework includes a reusable APIClient utility for API testing:

```javascript
import { test, expect } from './fixtures.js';

test('should get employees', async ({ api }) => {
  const response = await api.get('/Employee');
  expect(response.status()).toBe(200);
});
```

Available methods:
- `api.get(endpoint)`
- `api.post(endpoint, data)`
- `api.put(endpoint, data)`
- `api.patch(endpoint, data)`
- `api.delete(endpoint)`

## 🔐 Authentication

Authentication is managed via global setup:
1. Logs in once before all tests
2. Saves session to `.auth/user.json`
3. Injects session into each test via fixture

No need to log in for every test!

## 🎯 Page Object Model

Example page object structure:

```javascript
// pages/login.page.js
import { BasePage } from './base.page.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
```

## 🚀 CI/CD

GitHub Actions workflow automatically:
- Runs on push/PR to main branches
- Tests on all 3 browsers in parallel
- Uploads HTML, JUnit, and Allure reports as artifacts
- Deploys Allure report to GitHub Pages
- Uses Node.js 24 (via FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true)

## 🏷️ Test Tagging Strategy

Tag your tests for better organization:

```javascript
test.describe('@smoke Critical Features', () => {
  // Quick sanity checks
});

test.describe('@regression Full Test Suite', () => {
  // Comprehensive regression tests
});

test.describe('@critical Must-Pass Tests', () => {
  // Business-critical functionality
});

test.describe('@playground Local Testing', () => {
  // Excluded from CI runs
});
```

## 🛠️ Maintenance

### Clean Up

```bash
# Remove test results and reports
npm run clean

# Remove everything including node_modules
npm run clean:all
```

### Update Dependencies

```bash
npm update
npx playwright install
```

## 📝 Best Practices

1. **Use Page Object Model** - Keep selectors in one place
2. **Use data-testid attributes** - More stable than CSS selectors
3. **Tag your tests** - Makes filtering easier
4. **Keep tests independent** - No test should depend on another
5. **Use fixtures** - Leverage the custom fixtures for common operations
6. **API over UI** - Use API calls for setup/teardown when possible

## 🆘 Troubleshooting

### Tests Fail Locally
- Check `.env` configuration
- Ensure application is running
- Check network connectivity

### Tests Fail in CI Only
- Check for timing issues (increase timeouts)
- Verify BASE_URL is accessible from CI runners
- Check authentication flow

### Browser Issues
```bash
# Reinstall browsers
npx playwright install --force-deps
```

## 📄 License

ISC

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit PR

---

**Built with ❤️ using Playwright**
