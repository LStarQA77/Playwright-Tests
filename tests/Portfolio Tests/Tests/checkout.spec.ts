import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/CartPage';
import { users } from '../Fixtures/users';

test('Standard user can add an item to cart and proceed to checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory/);

  await productsPage.addBackPackToCart();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await productsPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one/);

  await page.locator('[data-test="firstName"]').fill('Jane');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');
});

test('Standard user can complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory/);

  await productsPage.addBackPackToCart();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await productsPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one/);

  await page.locator('[data-test="firstName"]').fill('Jane');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');

  
  await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information:');

  await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="shipping-info-label"]')).toContainText('Shipping Information:');

  await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="total-info-label"]')).toContainText('Price Total');

  await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
  await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();

  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
  await expect(page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
});

test('Standard user can cancel checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory/);

  await productsPage.addBackPackToCart();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await productsPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one/);

  await page.locator('[data-test="firstName"]').fill('Jane');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');


  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await page.locator('[data-test="cancel"]').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.title')).toHaveText('Your Cart');
});

