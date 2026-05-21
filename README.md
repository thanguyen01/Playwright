# 🎭 Playwright Test Automation Framework

A comprehensive, production-ready test automation framework built with [Playwright](https://playwright.dev/), featuring Page Object Model pattern, API testing, multi-browser support, and full CI/CD integration.

## 🚀 Features

- **Page Object Model (POM)** - Maintainable and scalable test structure with BasePage pattern
- **Custom Test Fixtures** - Extended Playwright fixtures including API helper and storage state management
- **Multi-Browser Testing** - Run tests on Chromium, Firefox, and WebKit simultaneously
- **API Testing Layer** - Built-in APIHelper utility for comprehensive API testing
- **Authentication Management** - Global setup/teardown with session storage and reuse
- **Multiple Reporters** - HTML, JUnit/XML, and Allure reports configured together
- **Test Organization** - Tag-based test filtering (@smoke, @regression, @critical)
- **Test Data Management** - JSON-based test data with utility functions
- **CI/CD Ready** - GitHub Actions workflow with multi-browser parallel execution
- **Environment Configuration** - dotenv integration for flexible configuration
- **Screenshot & Video Capture** - Automatic capture on failures
- **Retry Logic** - Smart retries: 2 in CI, 0 locally

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
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

## 📁 Project Structure

```
.
├── pages/                      # Page Object Models
│   ├── BasePage.js            # Base class with common methods
│   ├── LoginPage.js           # Example page object
│   └── ...
├── fixtures/                   # Custom test fixtures
│   └── customFixtures.js      # Extended @playwright/test fixtures
├── utils/                      # Utility functions
│   ├── APIHelper.js           # API testing helper
│   └── helpers.js             # Common utilities and helpers
├── tests/                      # Test files
│   ├── example.spec.js        # Example tests
│   ├── api.spec.js            # API tests
│   └── fixtures.js            # Test fixtures
├── test-data/                  # JSON test data
│   └── users.json             # User test data
├── .auth/                      # Authentication storage (auto-generated)
│   └── user.json              # Saved session state
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── .github/workflows/          # CI/CD workflows
│   └── tests.yml              # GitHub Actions workflow
└── README.md                   # This file
```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

### Debug Tests

```bash
npm run test:debug
```

### Run Smoke Tests Only

```bash
npm run test:smoke
```

### Run Regression Tests Only

```bash
npm run test:regression
```

### Run Critical Tests Only

```bash
npm run test:critical
```

### Run Tests on Specific Browser

```bash
npm run test:chrome     # Chromium
npm run test:firefox    # Firefox
npm run test:webkit     # WebKit
```

### Run Tests Serially (No Parallelization)

```bash
npm run test:serial
```

## 📊 Reports

### HTML Report

```bash
npm run test:report
```

Opens `playwright-report/index.html` in your default browser.

### Allure Report

#### Generate and View Allure Report

```bash
npm run report:allure:open
```

#### Just Generate (without opening)

```bash
npm run report:allure
```

#### JUnit Results

Generated automatically at `test-results/junit.xml` - useful for CI/CD systems like Jenkins.

## 🏗️ Creating Page Objects

Extend `BasePage` to create page-specific objects:

```javascript
import { BasePage } from "./BasePage.js";

export class MyPage extends BasePage {
  // Define selectors
  get submitButton() {
    return 'button[type="submit"]';
  }

  // Define methods
  async submit() {
    await this.click(this.submitButton);
  }
}
```

## ✍️ Writing Tests

```javascript
import { test, expect } from "../fixtures/customFixtures.js";
import { MyPage } from "../pages/MyPage.js";

test.describe("My Tests @smoke", () => {
  let myPage;

  test.beforeEach(async ({ page }) => {
    myPage = new MyPage(page);
  });

  test("should do something @smoke", async () => {
    await myPage.submit();
    expect(true).toBeTruthy();
  });
});
```

## 🔐 Authentication

Authentication is configured through environment variables and test fixtures:

- **Credentials**: Set via `TEST_USERNAME` and `TEST_PASSWORD` env vars
- **Session Storage**: Stored in `.auth/user.json`

To force re-authentication, delete `.auth/user.json`:

```bash
rm .auth/user.json
```

## 🌐 API Testing

Use the `apiHelper` fixture for API testing:

```javascript
test("should fetch users", async ({ apiHelper }) => {
  const response = await apiHelper.get("/api/users");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
});
```

### Supported Methods

- `get(endpoint, options)`
- `post(endpoint, data, options)`
- `put(endpoint, data, options)`
- `delete(endpoint, options)`
- `patch(endpoint, data, options)`
- `head(endpoint, options)`

## 📝 Test Data Management

### Load Test Data

```javascript
import { TestDataManager } from "../utils/helpers.js";

const users = TestDataManager.loadTestData("users");
```

### Test Utilities

```javascript
import { TestUtils } from "../utils/helpers.js";

// Generate random values
TestUtils.generateRandomString(10);
TestUtils.generateRandomEmail();
TestUtils.generateRandomNumber(1, 100);

// Date/Time utilities
TestUtils.formatDate(new Date(), "YYYY-MM-DD");
TestUtils.getTimestamp();

// Retry with backoff
await TestUtils.retryWithBackoff(() => asyncFunction());

// Other utilities
TestUtils.delay(1000);
TestUtils.deepClone(obj);
TestUtils.deepMerge(obj1, obj2);
```

## 🏷️ Test Tagging

Tag tests for organized execution:

```javascript
test("should work @smoke", async () => {});
test("should work @regression", async () => {});
test("should work @critical", async () => {});
test("should work @smoke @critical", async () => {
  // This test will run with both smoke and critical
});
```

Run specific tags:

```bash
npm run test:smoke       # @smoke
npm run test:regression  # @regression
npm run test:critical    # @critical
```

## 🧹 Cleanup

### Clean Test Results and Reports

```bash
npm run clean
```

Removes:

- `test-results/`
- `allure-results/`
- `playwright-report/`
- `.auth/`

### Deep Clean (includes node_modules)

```bash
npm run clean:all
```

## 🚀 CI/CD Integration

### GitHub Actions

The framework includes a complete GitHub Actions workflow (`.github/workflows/tests.yml`) that:

1. ✅ Runs tests on all 3 browsers in parallel
2. ✅ Generates HTML, JUnit, and Allure reports
3. ✅ Uploads artifacts for download
4. ✅ Publishes Allure report to GitHub Pages
5. ✅ Sends test summary to job summary

**Required Secrets** (optional - uses defaults if not set):

- `BASE_URL` - Application URL
- `TEST_USERNAME` - Login username
- `TEST_PASSWORD` - Login password

### Running in CI

The config automatically detects CI environment and:

- Sets retries to 2
- Uses 1 worker (no parallelization)
- Fails on `test.only()`

Set the `CI` environment variable:

```bash
CI=true npm test
```

## 🐛 Debugging

### Run Single Test

```bash
npx playwright test example.spec.js
```

### Run Test with Specific Name

```bash
npx playwright test -g "should login"
```

### Debug Mode (Interactive Inspector)

```bash
npm run test:debug
```

### View Traces

Traces are automatically captured on first retry. View them:

```bash
npx playwright show-trace test-results/trace.zip
```

## 📚 Best Practices

### 1. **Selectors**

- Use semantic selectors: `data-testid`, `name`, `placeholder`
- Avoid fragile selectors: nth-child, hard-coded indices
- Use locators when possible: `page.locator('...')`

### 2. **Waits**

- Use explicit waits: `waitForElement()`, `waitForNavigation()`
- Avoid `page.waitForTimeout()` unless absolutely necessary
- Set appropriate timeouts (default: 30s)

### 3. **Test Organization**

- One action per test when possible
- Use `test.beforeEach()` for setup
- Use `test.afterEach()` for cleanup
- Group related tests in `test.describe()`

### 4. **Assertions**

- Be specific: `expect(value).toBe(exact)`
- Avoid assertions after navigation (can be flaky)
- Use custom matchers for common checks

### 5. **Data Management**

- Use test data files for complex scenarios
- Generate unique data for tests: `TestUtils.generateRandomEmail()`
- Clean up created data in `test.afterEach()` or `globalTeardown()`

## 🔗 Useful Links

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Allure Report](https://docs.qameta.io/allure/)
- [Page Object Model](https://playwright.dev/docs/pom)

## 📞 Support & Troubleshooting

### Tests Not Running

- Ensure Node.js 18+ is installed: `node --version`
- Reinstall dependencies: `npm ci`
- Reinstall Playwright browsers: `npx playwright install`

### Authentication Issues

- Check credentials in `.env` file
- Delete `.auth/user.json` and re-run to force re-authentication

### Report Generation Issues

- For Allure: `npm install -g allure-commandline`
- Check that test results exist: `ls allure-results/`
- Verify Java is installed (required for Allure): `java --version`

### CI/CD Issues

- Check GitHub Actions logs in your repository
- Verify secrets are set correctly
- Ensure `.env.example` is committed to repo (`.env` should not be)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please:

1. Create a feature branch
2. Make your changes
3. Add tests for new functionality
4. Submit a pull request

## 📊 Test Statistics

Track your test coverage and execution:

- View HTML reports for detailed execution logs
- Check JUnit XML for CI integration
- Use Allure reports for trend analysis

## 🎯 Next Steps

1. ✅ Update selectors in page objects for your application
2. ✅ Configure credentials in `.env`
3. ✅ Write your first test using the examples as template
4. ✅ Run tests locally: `npm test`
5. ✅ Set up GitHub Actions secrets and enable workflow
6. ✅ Integrate with your CI/CD pipeline

---

**Happy Testing! 🎉**
