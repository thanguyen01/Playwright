import { test, expect } from './fixtures.js';

test.describe('Application Endpoints', () => {
  test('should load home page', async ({ api }) => {
    const response = await api.get('/');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('should load Employee page', async ({ api }) => {
    const response = await api.get('/Employee');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('should load Account/Login page', async ({ api }) => {
    const response = await api.get('/Account/Login');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('should return 404 for non-existent page', async ({ api }) => {
    const response = await api.get('/nonexistent-page-12345');
    
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});
