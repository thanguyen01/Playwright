# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.js >> Login page >> has correct title
- Location: tests/example.spec.js:34:3

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Sign In/
Received string:  "Internal Server Error"
Timeout: 15000ms

Call log:
  - Expect "toHaveTitle" with timeout 15000ms
    33 × unexpected value "Internal Server Error"

```

```yaml
- heading "An error occurred while starting the application." [level=1]
- text: "SqliteException: SQLite Error 10: 'disk I/O error'."
- paragraph: Microsoft.Data.Sqlite.SqliteException.ThrowExceptionForRC(int rc, sqlite3 db)
- list:
  - listitem:
    - 'heading "SqliteException: SQLite Error 10: ''disk I/O error''." [level=2]'
    - list:
      - listitem:
        - heading "Microsoft.Data.Sqlite.SqliteException.ThrowExceptionForRC(int rc, sqlite3 db)" [level=3]
      - listitem:
        - heading "Microsoft.Data.Sqlite.SqliteCommand.PrepareAndEnumerateStatements()+MoveNext()" [level=3]
      - listitem:
        - heading "Microsoft.Data.Sqlite.SqliteCommand.GetStatements()+MoveNext()" [level=3]
      - listitem:
        - heading "Microsoft.Data.Sqlite.SqliteDataReader.NextResult()" [level=3]
      - listitem:
        - heading "Microsoft.Data.Sqlite.SqliteCommand.ExecuteReader(CommandBehavior behavior)" [level=3]
      - listitem:
        - heading "Microsoft.Data.Sqlite.SqliteCommand.ExecuteReader()" [level=3]
      - listitem:
        - heading "Microsoft.Data.Sqlite.SqliteCommand.ExecuteScalar()" [level=3]
      - listitem:
        - heading "System.Data.Common.DbCommand.ExecuteScalarAsync(CancellationToken cancellationToken)" [level=3]
      - listitem:
        - heading "Microsoft.EntityFrameworkCore.Storage.RelationalCommand.ExecuteScalarAsync(RelationalCommandParameterObject parameterObject, CancellationToken cancellationToken)" [level=3]
      - listitem:
        - heading "Microsoft.EntityFrameworkCore.Storage.RelationalCommand.ExecuteScalarAsync(RelationalCommandParameterObject parameterObject, CancellationToken cancellationToken)" [level=3]
      - listitem:
        - heading "Microsoft.EntityFrameworkCore.Storage.RelationalCommand.ExecuteScalarAsync(RelationalCommandParameterObject parameterObject, CancellationToken cancellationToken)" [level=3]
      - listitem:
        - heading "Microsoft.EntityFrameworkCore.Migrations.HistoryRepository.ExistsAsync(CancellationToken cancellationToken)" [level=3]
      - listitem:
        - heading "Microsoft.EntityFrameworkCore.Migrations.Internal.Migrator.MigrateAsync(string targetMigration, CancellationToken cancellationToken)" [level=3]
      - listitem:
        - heading "Program.<Main>$(string[] args) in Program.cs" [level=3]:
          - text: Program.<Main>$(string[] args) in
          - code: Program.cs
      - listitem:
        - heading "Program.<Main>(string[] args)" [level=3]
  - listitem:
    - button "Show raw exception details"
- contentinfo:
  - text: .NET 8.0.4 X86 v8.0.0.0 | Microsoft.AspNetCore.Hosting version 8.0.4+8486d31e24f30e3fa1809a95699a0adc16f448d7 | Microsoft Windows 10.0.20348 |
  - link "Need help?":
    - /url: http://go.microsoft.com/fwlink/?LinkId=517394
- link "Web hosting by Somee.com":
  - /url: http://somee.com
- link "Hosted Windows Virtual Server. 2.5GHz CPU, 2GB RAM, 60GB SSD. Try it now for $1!":
  - /url: http://somee.com/VirtualServer.aspx
- link "Web hosting by Somee.com":
  - /url: http://somee.com
```

# Test source

```ts
  1  | import { test, expect } from './fixtures.js';
  2  | import users from '../test-data/users.json' assert { type: 'json' };
  3  | 
  4  | test.describe('Home page', () => {
  5  |   test.beforeEach(async ({ homePage }) => {
  6  |     await homePage.goto();
  7  |   });
  8  | 
  9  |   test('has correct title', async ({ homePage }) => {
  10 |     await expect(homePage.page).toHaveTitle(/EAEmployee/);
  11 |   });
  12 | 
  13 |   test('Login nav link navigates to login page', async ({ homePage }) => {
  14 |     await homePage.clickLogin();
  15 |     await expect(homePage.page).toHaveURL(/Account\/Login/);
  16 |   });
  17 | 
  18 |   test('Register nav link navigates to register page', async ({ homePage }) => {
  19 |     await homePage.clickRegister();
  20 |     await expect(homePage.page).toHaveURL(/Account\/Register/);
  21 |   });
  22 | 
  23 |   test('View Employees hero button navigates to employees page', async ({ homePage }) => {
  24 |     await homePage.clickViewEmployees();
  25 |     await expect(homePage.page).toHaveURL(/Employee/);
  26 |   });
  27 | });
  28 | 
  29 | test.describe('Login page', () => {
  30 |   test.beforeEach(async ({ loginPage }) => {
  31 |     await loginPage.goto();
  32 |   });
  33 | 
  34 |   test('has correct title', async ({ loginPage }) => {
> 35 |     await expect(loginPage.page).toHaveTitle(/Sign In/);
     |                                  ^ Error: expect(page).toHaveTitle(expected) failed
  36 |   });
  37 | 
  38 |   test('valid user can log in', async ({ loginPage }) => {
  39 |     await loginPage.login(users.validUser.username, users.validUser.password);
  40 |     await expect(loginPage.page).not.toHaveURL(/Account\/Login/);
  41 |   });
  42 | 
  43 |   test('invalid credentials show validation errors', async ({ loginPage }) => {
  44 |     await loginPage.signInButton.click();
  45 |     await expect(loginPage.usernameError).toBeVisible();
  46 |     await expect(loginPage.passwordError).toBeVisible();
  47 |   });
  48 | });
  49 | 
```