import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld } from './common.steps';
import { productNameToId } from './helpers';

// Given steps
Given('I have added {string} to my cart', async function (this: CustomWorld, productName: string) {
  const productId = productNameToId(productName);
  await this.inventoryPage.addItemToCart(productId);
});

Given('I am on the cart page', async function (this: CustomWorld) {
  await this.cartPage.clickCartLink();
  await this.cartPage.expectToBeOnCartPage();
});

Given('I have clicked the checkout button', async function (this: CustomWorld) {
  await this.cartPage.clickCheckout();
});

Given('I am on checkout step one', async function (this: CustomWorld) {
  await this.checkoutPage.expectToBeOnStepOne();
});

// When steps
When('I enter first name {string}', async function (this: CustomWorld, firstName: string) {
  await this.page.fill('[data-test="firstName"]', firstName);
});

When('I enter last name {string}', async function (this: CustomWorld, lastName: string) {
  await this.page.fill('[data-test="lastName"]', lastName);
});

When('I enter postal code {string}', async function (this: CustomWorld, postalCode: string) {
  await this.page.fill('[data-test="postalCode"]', postalCode);
});

When('I fill in shipping information:', async function (this: CustomWorld, dataTable: DataTable) {
  const data = dataTable.hashes()[0];
  await this.checkoutPage.fillShippingInfo(
    data.firstName,
    data.lastName,
    data.postalCode
  );
});

When('I click continue', async function (this: CustomWorld) {
  await this.checkoutPage.clickContinue();
});

When('I click finish', async function (this: CustomWorld) {
  await this.checkoutPage.clickFinish();
});

// Then steps
Then('I should be on checkout step two', async function (this: CustomWorld) {
  await this.checkoutPage.expectToBeOnStepTwo();
});

Then('I should be on the order complete page', async function (this: CustomWorld) {
  await this.checkoutPage.expectToBeOnComplete();
});

Then('I should see the confirmation message {string}', async function (this: CustomWorld, expectedMessage: string) {
  await this.checkoutPage.expectCompleteHeader(expectedMessage);
});
