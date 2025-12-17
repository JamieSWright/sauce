import {test, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { time } from 'console';
import { TIMEOUT } from 'dns';


test.describe('Login Page Tests', () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Successful login with valid credentials', async () => {
    await loginPage.login(process.env.STANDARD_USERNAME || '', process.env.PASSWORD || '');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });


  test('Unsuccessful login with invalid credentials', async () => {
    await loginPage.login('invalid_user', 'invalid_pass');
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });


});