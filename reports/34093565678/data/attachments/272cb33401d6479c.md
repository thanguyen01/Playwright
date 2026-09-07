# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.js >> Login page >> valid user can log in
- Location: tests/example.spec.js:38:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.fill: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByLabel('User Name')

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
    - link "Need help?" [ref=e46] [cursor=pointer]:
      - /url: http://go.microsoft.com/fwlink/?LinkId=517394
  - link "Web hosting by Somee.com" [ref=e48] [cursor=pointer]:
    - /url: http://somee.com
  - generic [ref=e52]:
    - link "Hosted Windows Virtual Server. 2.5GHz CPU, 2GB RAM, 60GB SSD. Try it now for $1!" [ref=e54] [cursor=pointer]:
      - /url: http://somee.com/VirtualServer.aspx
    - link "Web hosting by Somee.com" [ref=e56] [cursor=pointer]:
      - /url: http://somee.com
```

# Test source

```ts
  1  | import { BasePage } from './base.page.js';
  2  | 
  3  | export class LoginPage extends BasePage {
  4  |   constructor(page) {
  5  |     super(page);
  6  |     this.usernameInput      = page.getByLabel('User Name');
  7  |     this.passwordInput      = page.getByLabel('Password');
  8  |     this.rememberMeCheckbox = page.getByLabel('Keep me signed in');
  9  |     this.signInButton       = page.getByRole('button', { name: 'Sign In' });
  10 |     this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
  11 |     this.createAccountLink  = page.getByRole('link', { name: 'Create one' });
  12 |     this.backToHomeLink     = page.getByRole('link', { name: 'Back to Home' });
  13 |     this.usernameError      = page.locator('[data-valmsg-for="UserName"]');
  14 |     this.passwordError      = page.locator('[data-valmsg-for="Password"]');
  15 |   }
  16 | 
  17 |   async goto() {
  18 |     await this.navigate('/Account/Login');
  19 |   }
  20 | 
  21 |   async login(username, password) {
> 22 |     await this.usernameInput.fill(username);
     |                              ^ Error: locator.fill: Test timeout of 120000ms exceeded.
  23 |     await this.passwordInput.fill(password);
  24 |     await this.signInButton.click();
  25 |   }
  26 | }
  27 | 
```