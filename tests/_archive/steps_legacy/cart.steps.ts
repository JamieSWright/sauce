import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { InventoryPage } from '../pages/inventorypage';
import { CartPage } from '../pages/cartpage';

// Shared page objects will be initialized in common.steps.ts
declare global {
  var page: any;
  var loginPage: LoginPage;
  var inventoryPage: InventoryPage;
  var cartPage: CartPage;
}

// Given steps
Given('I am logged in as a standard user', async function () {
  if (!global.loginPage) {
    global.loginPage = new LoginPage(global.page);
  }
  await global.loginPage.login(
    process.env.STANDARD_USERNAME || 'standard_user',
    process.env.PASSWORD || 'secret_sauce'
  );
});

Given('I am on the inventory page', async function () {
  if (!global.inventoryPage) {
    global.inventoryPage = new InventoryPage(global.page);
  }
  await global.inventoryPage.expectToBeOnInventoryPage();
});

// When steps
When('I add {string} to cart', async function (productName: string) {
  if (!global.inventoryPage) {
    global.inventoryPage = new InventoryPage(global.page);
  }
  // Convert product name to data-test ID (e.g., "Sauce Labs Backpack" -> "sauce-labs-backpack")
  const productId = productName.toLowerCase().replace(/\s+/g, '-');
  await global.inventoryPage.addItemToCart(productId);
});

When('I click the cart icon', async function () {
  if (!global.cartPage) {
    global.cartPage = new CartPage(global.page);
  }
  await global.cartPage.clickCartLink();
});

When('I click the checkout button', async function () {
  if (!global.cartPage) {
    global.cartPage = new CartPage(global.page);
  }
  await global.cartPage.clickCheckout();
});

// Then steps
Then('the cart badge should display {string}', async function (count: string) {
  if (!global.inventoryPage) {
    global.inventoryPage = new InventoryPage(global.page);
  }
  await global.inventoryPage.expectCartBadgeCount(count);
});

Then('I should be on the cart page', async function () {
  if (!global.cartPage) {
    global.cartPage = new CartPage(global.page);
  }
  await global.cartPage.expectToBeOnCartPage();
});

Then('{string} should be listed in my cart', async function (productName: string) {
  if (!global.cartPage) {
    global.cartPage = new CartPage(global.page);
  }
  await global.cartPage.expectItemInCart(productName);
});

Then('I should be on the checkout information page', async function () {
  await expect(global.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
});
