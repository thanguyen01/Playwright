# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.js >> Home page >> Login nav link navigates to login page
- Location: tests/example.spec.js:13:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Login' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "An error occurred while starting the application." [level=1] [ref=e2]
  - generic [ref=e3]: "SqliteException: SQLite Error 10: 'disk I/O error'."
  - paragraph [ref=e4]: Microsoft.Data.Sqlite.SqliteException.ThrowExceptionForRC(int rc, sqlite3 db)
  - list [ref=e6]:
    - listitem [ref=e7]:
      - 'heading "SqliteException: SQLite Error 10: ''disk I/O error''." [level=2] [ref=e8]'
      - list [ref=e9]:
        - listitem [ref=e10]:
          - heading "Microsoft.Data.Sqlite.SqliteException.ThrowExceptionForRC(int rc, sqlite3 db)" [level=3] [ref=e11]
        - listitem [ref=e12]:
          - heading "Microsoft.Data.Sqlite.SqliteCommand.PrepareAndEnumerateStatements()+MoveNext()" [level=3] [ref=e13]
        - listitem [ref=e14]:
          - heading "Microsoft.Data.Sqlite.SqliteCommand.GetStatements()+MoveNext()" [level=3] [ref=e15]
        - listitem [ref=e16]:
          - heading "Microsoft.Data.Sqlite.SqliteDataReader.NextResult()" [level=3] [ref=e17]
        - listitem [ref=e18]:
          - heading "Microsoft.Data.Sqlite.SqliteCommand.ExecuteReader(CommandBehavior behavior)" [level=3] [ref=e19]
        - listitem [ref=e20]:
          - heading "Microsoft.Data.Sqlite.SqliteCommand.ExecuteReader()" [level=3] [ref=e21]
        - listitem [ref=e22]:
          - heading "Microsoft.Data.Sqlite.SqliteCommand.ExecuteScalar()" [level=3] [ref=e23]
        - listitem [ref=e24]:
          - heading "System.Data.Common.DbCommand.ExecuteScalarAsync(CancellationToken cancellationToken)" [level=3] [ref=e25]
        - listitem [ref=e26]:
          - heading "Microsoft.EntityFrameworkCore.Storage.RelationalCommand.ExecuteScalarAsync(RelationalCommandParameterObject parameterObject, CancellationToken cancellationToken)" [level=3] [ref=e27]
        - listitem [ref=e28]:
          - heading "Microsoft.EntityFrameworkCore.Storage.RelationalCommand.ExecuteScalarAsync(RelationalCommandParameterObject parameterObject, CancellationToken cancellationToken)" [level=3] [ref=e29]
        - listitem [ref=e30]:
          - heading "Microsoft.EntityFrameworkCore.Storage.RelationalCommand.ExecuteScalarAsync(RelationalCommandParameterObject parameterObject, CancellationToken cancellationToken)" [level=3] [ref=e31]
        - listitem [ref=e32]:
          - heading "Microsoft.EntityFrameworkCore.Migrations.HistoryRepository.ExistsAsync(CancellationToken cancellationToken)" [level=3] [ref=e33]
        - listitem [ref=e34]:
          - heading "Microsoft.EntityFrameworkCore.Migrations.Internal.Migrator.MigrateAsync(string targetMigration, CancellationToken cancellationToken)" [level=3] [ref=e35]
        - listitem [ref=e36]:
          - heading "Program.<Main>$(string[] args) in Program.cs" [level=3] [ref=e37]:
            - text: Program.<Main>$(string[] args) in
            - code [ref=e38]: Program.cs
        - listitem [ref=e39]:
          - heading "Program.<Main>(string[] args)" [level=3] [ref=e40]
    - listitem [ref=e41]:
      - button "Show raw exception details" [ref=e44] [cursor=pointer]
  - contentinfo [ref=e45]:
    - text: .NET 8.0.4 X86 v8.0.0.0 | Microsoft.AspNetCore.Hosting version 8.0.4+8486d31e24f30e3fa1809a95699a0adc16f448d7 | Microsoft Windows 10.0.20348 |
    - link "Need help?" [ref=e46]:
      - /url: http://go.microsoft.com/fwlink/?LinkId=517394
  - link "Web hosting by Somee.com" [ref=e48]:
    - /url: http://somee.com
  - generic [ref=e52]:
    - link "Hosted Windows Virtual Server. 2.5GHz CPU, 2GB RAM, 60GB SSD. Try it now for $1!" [ref=e54]:
      - /url: http://somee.com/VirtualServer.aspx
    - link "Web hosting by Somee.com" [ref=e56]:
      - /url: http://somee.com
```

# Test source

```ts
  1  | import { BasePage } from './base.page.js';
  2  | 
  3  | export class HomePage extends BasePage {
  4  |   constructor(page) {
  5  |     super(page);
  6  |     // Nav links
  7  |     this.navHomeLink      = page.locator('a.nav-link[href="/"]');
  8  |     this.navEmployeesLink = page.locator('a.nav-link[href="/Employee"]');
  9  |     this.navDashboardLink = page.locator('a.nav-link[href="/Home/Dashboard"]');
  10 |     this.navAboutLink     = page.locator('a.nav-link[href="/Home/About"]');
  11 |     this.navRegisterLink  = page.getByRole('link', { name: 'Register' });
  12 |     this.navLoginLink     = page.getByRole('link', { name: 'Login' });
  13 |     // Hero CTAs
  14 |     this.heroViewEmployeesBtn = page.getByRole('link', { name: 'View Employees' });
  15 |     this.heroSignInBtn        = page.getByRole('link', { name: 'Sign In' });
  16 |     // Feature card buttons
  17 |     this.browseEmployeesBtn = page.getByRole('link', { name: 'Browse Employees' });
  18 |     this.signInToViewBtn    = page.getByRole('link', { name: 'Sign in to view' });
  19 |     this.createAccountBtn   = page.getByRole('link', { name: 'Create Account' });
  20 |   }
  21 | 
  22 |   async goto() {
  23 |     await this.navigate('/');
  24 |   }
  25 | 
  26 |   async clickLogin() {
> 27 |     await this.navLoginLink.click();
     |                             ^ Error: locator.click: Test timeout of 120000ms exceeded.
  28 |   }
  29 | 
  30 |   async clickRegister() {
  31 |     await this.navRegisterLink.click();
  32 |   }
  33 | 
  34 |   async clickViewEmployees() {
  35 |     await this.heroViewEmployeesBtn.click();
  36 |   }
  37 | }
  38 | 
```