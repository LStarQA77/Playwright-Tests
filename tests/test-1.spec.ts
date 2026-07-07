import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.integrated-concrete.com/');
  await page.getByLabel('Site').getByRole('link', { name: 'Request A Quote' }).click();
  await page.goto('https://www.integrated-concrete.com/');
  await page.goto('https://www.integrated-concrete.com/');
});