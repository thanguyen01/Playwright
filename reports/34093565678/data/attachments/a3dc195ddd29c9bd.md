# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.js >> Application Endpoints >> should load Account/Login page
- Location: tests/api.spec.js:18:3

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from './fixtures.js';
  2  | 
  3  | test.describe('Application Endpoints', () => {
  4  |   test('should load home page', async ({ api }) => {
  5  |     const response = await api.get('/');
  6  |     
  7  |     expect(response.ok()).toBeTruthy();
  8  |     expect(response.status()).toBe(200);
  9  |   });
  10 | 
  11 |   test('should load Employee page', async ({ api }) => {
  12 |     const response = await api.get('/Employee');
  13 |     
  14 |     expect(response.ok()).toBeTruthy();
  15 |     expect(response.status()).toBe(200);
  16 |   });
  17 | 
  18 |   test('should load Account/Login page', async ({ api }) => {
  19 |     const response = await api.get('/Account/Login');
  20 |     
> 21 |     expect(response.ok()).toBeTruthy();
     |                           ^ Error: expect(received).toBeTruthy()
  22 |     expect(response.status()).toBe(200);
  23 |   });
  24 | 
  25 |   test('should return 404 for non-existent page', async ({ api }) => {
  26 |     const response = await api.get('/nonexistent-page-12345');
  27 |     
  28 |     expect(response.ok()).toBeFalsy();
  29 |     expect(response.status()).toBe(404);
  30 |   });
  31 | });
  32 | 
```