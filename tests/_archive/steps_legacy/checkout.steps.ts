import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkoutpage';
import { CartPage } from '../pages/cartpage';
import { InventoryPage } from '../pages/inventorypage';

// Shared page objects
declare global {
  var page: any;
  var checkoutPage: CheckoutPage;
  var cartPage: CartPage;
  var inventoryPage: InventoryPage;
}

// Given steps
Given('I have added {string} to my cart', async function (productName: string) {
  if (!global.inventoryPage) {
    global.inventoryPage = new InventoryPage(global.page);
  }
  const productId = productName.toLowerCase().replace(/\s+/g, '-');
  await global.inventoryPage.addItemToCart(productId);
});

Given('I am on the cart page', async function () {
  if (!global.cartPage) {
    global.cartPage = new CartPage(global.page);
  }
  await global.cartPage.clickCartLink();
  await global.cartPage.expectToBeOnCartPage();
});

Given('I have clicked the checkout button', async function () {
  if (!global.cartPage) {
    global.cartPage = new CartPage(global.page);
  }
  await global.cartPage.clickCheckout();
});

Given('I am on checkout step one', async function () {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.checkoutPage.expectToBeOnStepOne();
});

// When steps
When('I enter first name {string}', async function (firstName: string) {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.page.fill('[data-test="firstName"]', firstName);
});

When('I enter last name {string}', async function (lastName: string) {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.page.fill('[data-test="lastName"]', lastName);
});

When('I enter postal code {string}', async function (postalCode: string) {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.page.fill('[data-test="postalCode"]', postalCode);
});

When('I fill in shipping information:', async function (dataTable: DataTable) {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  const data = dataTable.hashes()[0];
  await global.checkoutPage.fillShippingInfo(
    data.firstName,
    data.lastName,
    data.postalCode
  );
});

When('I click continue', async function () {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.checkoutPage.clickContinue();
});

When('I click finish', async function () {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.checkoutPage.clickFinish();
});

// Then steps
Then('I should be on checkout step two', async function () {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.checkoutPage.expectToBeOnStepTwo();
});

Then('I should be on the order complete page', async function () {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.checkoutPage.expectToBeOnComplete();
});

Then('I should see the confirmation message {string}', async function (expectedMessage: string) {
  if (!global.checkoutPage) {
    global.checkoutPage = new CheckoutPage(global.page);
  }
  await global.checkoutPage.expectCompleteHeader(expectedMessage);
});
