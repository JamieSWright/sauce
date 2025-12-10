import { test, expect } from "@playwright/test";

const BASE_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const STANDARD_PASSWORD = 'secret_sauce';

async function login(page, username = STANDARD_USER, password = STANDARD_PASSWORD) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await page.waitForURL(`${BASE_URL}/inventory.html`);
}
// This test verifies that a user can successfully log in and is taken to the inventory page.
test('User can log in with valid credentials and is redirected to product catalog', async ({ page }) => {
  await login(page);
});

// This test verifies that login fails with an invalid username and shows an error message.
test('User cannot log in with invalid username', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', 'invalid_user');
  await page.fill('[data-test="password"]', STANDARD_PASSWORD);
  await page.click('[data-test="login-button"]');
  
  // Should show error message and remain on login page
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  await expect(page).toHaveURL(BASE_URL);
});

// This test verifies that login fails with an invalid password and shows an error message.
test('User cannot log in with invalid password', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', STANDARD_USER);
  await page.fill('[data-test="password"]', 'wrong_password');
  await page.click('[data-test="login-button"]');
  
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  await expect(page).toHaveURL(BASE_URL);
});

// This test checks that adding an item to the cart updates the cart badge and the item appears in the cart.
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

// This test ensures that the user can navigate from the cart page to the checkout page.
test('User can proceed to checkout from cart page', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(`${BASE_URL}/cart.html`);
  // Click Checkout
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(`${BASE_URL}/checkout-step-one.html`);
});

// This test verifies that the user can enter shipping information and move to the order overview page.
test('User can enter shipping info and proceed to overview', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(`${BASE_URL}/checkout-step-one.html`);
  // Enter shipping info
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');
  await expect(page).toHaveURL(`${BASE_URL}/checkout-step-two.html`);
});

// This test confirms that the user can complete the checkout process and sees the order confirmation message.
test('User can finish checkout and see confirmation', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');
  await expect(page).toHaveURL(`${BASE_URL}/checkout-step-two.html`);
  // Review and finish
  await page.click('[data-test="finish"]');
  await expect(page).toHaveURL(`${BASE_URL}/checkout-complete.html`);
  // The confirmation text is hardcoded as per current UI; update this value if the UI changes.
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});