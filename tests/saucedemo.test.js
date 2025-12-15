import { test, expect } from "@playwright/test";


// you can set a base URL in the playwright.config.js file too, but including here, especially if you want to run against different urls with different classes is not a bad thing
const BASE_URL = 'https://www.saucedemo.com';

// we shouln't hardcode credentials in tests, especially if they get shared, so we'll implement these in an env file locally, which is then added to the gitignore file to avoid them being shared to a repo
const STANDARD_USER = 'standard_user';
const STANDARD_PASSWORD = 'secret_sauce';


// the biggest benefit change we can make early on is to implement a page object model so yo do't have to keep finding selectors on every step. If data-test="username" ever changed it would be a nightmre to update all tests. Instead we can just update the page object file
// the other benefit we can get from a POM is to implement common functions like adding login details there and reuse them across multiple tests
async function login(page, username = STANDARD_USER, password = STANDARD_PASSWORD) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await page.waitForURL(`${BASE_URL}/inventory.html`);
}
// This test verifies that a user can successfully log in and is taken to the inventory page.
test('should log in successfully with valid credentials', async ({ page }) => {
  await login(page);
});

// This test verifies that login fails with an invalid username and shows an error message.
test('should reject login with invalid username', async ({ page }) => {
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
test('should reject login with invalid password', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', STANDARD_USER);
  await page.fill('[data-test="password"]', 'wrong_password');
  await page.click('[data-test="login-button"]');
  
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  await expect(page).toHaveURL(BASE_URL);
});

// This test checks that adding an item to the cart updates the cart badge and the item appears in the cart.
test('should add item to cart and update badge count', async ({ page }) => {
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
test('should navigate from cart to checkout', async ({ page }) => {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(`${BASE_URL}/cart.html`);
  // Click Checkout
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(`${BASE_URL}/checkout-step-one.html`);
});

// This test verifies that the user can enter shipping information and move to the order overview page.
test('should complete shipping info and reach overview', async ({ page }) => {
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
test('should complete checkout with confirmation', async ({ page }) => {
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