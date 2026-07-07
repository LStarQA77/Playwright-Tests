import { Page } from '@playwright/test';

//creating login page object for use in tests. this creates a login action that can have username and pwd passed and then
//it clicks on login button. 
export class LoginPage {
    constructor(private page: Page) {}

    async goto(){
        await this.page.goto('https://www.saucedemo.com');

    }

    async login(username: string, password: string) {
        await this.page.locator('#user-name').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#login-button').click();
    }
}