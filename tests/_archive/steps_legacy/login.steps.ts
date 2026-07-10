import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Browser, Page, chromium, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
});

After(async function () {
  await page.close();
  await browser.close();
});

// Given steps
Given('I am on the login page', async function () {
  await loginPage.goto();
});

// When steps
When('I enter username {string}', async function (username: string) {
  await loginPage.fillUsername(username);
});

When('I enter password {string}', async function (password: string) {
  await loginPage.fillPassword(password);
});

When('I click the login button', async function () {
  await loginPage.clickLogin();
});

// Then steps
Then('I should be redirected to the inventory page', async function () {
  await loginPage.expectToBeOnInventoryPage();
});

Then('I should see an error message {string}', async function (expectedMessage: string) {
  await loginPage.expectErrorMessage(expectedMessage);
});

Then('I should remain on the login page', async function () {
  await loginPage.expectToBeOnLoginPage();
});
