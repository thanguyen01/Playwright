# Manual Test Case: Employee Management Login

## Test Case ID

TC_LOGIN_001

## Test Name

Valid User Login Test

## Test Objective

Verify that a valid user can successfully log in to the EAEmployee application with correct credentials.

## Test Environment

- **URL:** http://eaapp.somee.com
- **Application:** EAEmployee Management System
- **Test Data:** test-data/users.json

## Prerequisites

- Application is deployed and accessible
- Test user account exists with credentials:
  - Username: admin
  - Password: password
- Browser is open and ready for navigation

## Test Steps

| Step # | Action                                          | Expected Result                                                                                |
| ------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1      | Navigate to http://eaapp.somee.com              | Home page loads successfully with navigation menu visible                                      |
| 2      | Click on "Login" link in the navigation menu    | Login page (/Account/Login) loads with "Welcome back" heading                                  |
| 3      | Enter username "admin" in the username field    | Username is populated in the textbox without errors                                            |
| 4      | Enter password "password" in the password field | Password is masked/hidden in the textbox                                                       |
| 5      | Click "Sign In" button                          | User is redirected to the home page and "Hello admin!" message appears in the top right corner |
| 6      | Verify user is logged in                        | Navigation menu shows "Logout" button and user greeting confirms successful authentication     |

## Expected Results

✓ User successfully logs in with valid credentials  
✓ System redirects to home page after login  
✓ User greeting message displays "Hello admin!"  
✓ Logout option appears in the navigation menu

## Actual Results

✓ PASSED - User successfully logged in  
✓ PASSED - Redirected to home page  
✓ PASSED - "Hello admin!" message displayed  
✓ PASSED - Logout button visible in navigation

## Test Status

**PASSED** ✓

## Test Execution Date

April 29, 2026

## Screenshots

- login-success.png - Screenshot of successful login showing home page with "Hello admin!" greeting

## Notes

- Login functionality is working as expected
- No errors or warnings during login process
- Application properly handles valid credentials
- Session appears to be maintained after login

## Test Automation Command

```bash
npx playwright test tests/login.spec.js
```

## Related Test Cases

- TC_LOGIN_002: Invalid password login
- TC_LOGIN_003: Invalid username login
- TC_LOGIN_004: Login with empty fields
- TC_LOGIN_005: Logout functionality
