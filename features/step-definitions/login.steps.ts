import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from './common.steps';

// Given steps
Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.goto();
});

// When steps
When('I enter username {string}', async function (this: CustomWorld, username: string) {
  await this.loginPage.fillUsername(username);
});

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  await this.loginPage.fillPassword(password);
});

When('I click the login button', async function (this: CustomWorld) {
  await this.loginPage.clickLogin();
});

// Then steps
Then('I should be redirected to the inventory page', async function (this: CustomWorld) {
  await this.loginPage.expectToBeOnInventoryPage();
});

Then('I should see an error message {string}', async function (this: CustomWorld, expectedMessage: string) {
  await this.loginPage.expectErrorMessage(expectedMessage);
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  await this.loginPage.expectToBeOnLoginPage();
});
