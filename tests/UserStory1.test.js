import { test, expect } from "@playwright/test";

test('User can log in with valid credentials and is redirected to product catalog', async ({ page }) => {
  
    // Given I am on the login page
  await page.goto('https://www.saucedemo.com/');

  // When I enter valid credentials
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // And I click the "Login" button
  await page.click('[data-test="login-button"]');

  // Then I should be redirected to the product catalog page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
