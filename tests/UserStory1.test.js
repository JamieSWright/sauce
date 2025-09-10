import { test, expect } from "@playwright/test";


const BASE_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const STANDARD_PASSWORD = 'secret_sauce';

async function login(page, username = STANDARD_USER, password = STANDARD_PASSWORD) {
  await page.goto(`${BASE_URL}/`);
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
}

test('User can log in with valid credentials and is redirected to product catalog', async ({ page }) => {
  await login(page);
});
