import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './common.steps';
import { loginAsStandardUser, productNameToId } from './helpers';

// Given steps
Given('I am logged in as a standard user', async function (this: CustomWorld) {
  await loginAsStandardUser(this);
});

Given('I am on the inventory page', async function (this: CustomWorld) {
  await this.inventoryPage.expectToBeOnInventoryPage();
});

// When steps
When('I add {string} to cart', async function (this: CustomWorld, productName: string) {
  const productId = productNameToId(productName);
  await this.inventoryPage.addItemToCart(productId);
});

When('I click the cart icon', async function (this: CustomWorld) {
  await this.cartPage.clickCartLink();
});

When('I click the checkout button', async function (this: CustomWorld) {
  await this.cartPage.clickCheckout();
});

// Then steps
Then('the cart badge should display {string}', async function (this: CustomWorld, count: string) {
  await this.inventoryPage.expectCartBadgeCount(count);
});

Then('I should be on the cart page', async function (this: CustomWorld) {
  await this.cartPage.expectToBeOnCartPage();
});

Then('{string} should be listed in my cart', async function (this: CustomWorld, productName: string) {
  await this.cartPage.expectItemInCart(productName);
});

Then('I should be on the checkout information page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
});
