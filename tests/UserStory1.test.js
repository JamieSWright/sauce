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
test('User can add an item to the cart and see the cart count update', async ({ page }) => {
  await login(page);
  // Add Sauce Labs Backpack to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  // Cart icon should show 1
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
  // Click cart icon
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(`${BASE_URL}/cart.html`);
  // Item should be listed in cart
  await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
});