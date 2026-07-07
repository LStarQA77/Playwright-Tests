import { test as base } from '@playwright/test';
import { LoginPage  } from '../pages/LoginPage';

type CustomFixtures = {
  loggedInPage: LoginPage;
};

export const test = base.extend<CustomFixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

       
        await loginPage.login('standard_user' , 'secret_sauce');

        await use(loginPage);
    }
});