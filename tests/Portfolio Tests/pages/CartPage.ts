import { Page } from "@playwright/test";

export class ProductsPage {
    constructor(private page: Page) {}


    //creates an add backpack to cart action that can be called later in checkout tests
    async addBackPackToCart() {
        await this.page.locator('#add-to-cart-sauce-labs-backpack').click();

    }

    //creating an action to open the cart by clicking on the shopping cart link
    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    //creating an action to remove an item from cart
    async removeItemFromCart(){
        await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
        await this.page.locator('.shopping_cart_link').click();
        await this.page.locator('[data-test="remove-sauce-labs=backpack"]').click();
    }

    //return to shopping link
    async continueShopping(){
        await this.page.locator('.shopping_cart_link').click();
        await this.page.locator('[data-test="continue-shopping"]').click();
 
    }
}



