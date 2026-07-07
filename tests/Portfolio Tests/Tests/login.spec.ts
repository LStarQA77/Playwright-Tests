import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../Fixtures/users';


//this test logs in the standard user and then confirms a successful login by showing the inventory page 
//test uses loginPage object I created in pages folder

test ('Standard User Can Login', async ({ page }) =>  {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
});

//this test confirms that the locked out user receives the correct error message when login fails

test ('Locked Out User gets error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();

    await loginPage.login(users.locked.username, users.locked.password);
 
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});


