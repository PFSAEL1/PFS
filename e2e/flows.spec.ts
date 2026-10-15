import { expect, test } from '@playwright/test';

test.describe('storefront flows', () => {
  test('filter finder narrows booth, brand, and model', async ({ page }) => {
    await page.goto('/filter-finder');
    await page.getByRole('button', { name: /Downdraft/ }).first().click();
    await page.getByRole('button', { name: /Accudraft/ }).click();
    await page.getByRole('button', { name: /Titan/ }).first().click();
    await expect(page.getByText('Ceiling Diffusion Media').first()).toBeVisible();
    await expect(page.getByText(/Replace every 6–12 months/)).toBeVisible();
    await expect(page.getByText('Intake', { exact: true }).first()).toBeVisible();
  });

  test('shop search and stage filter update the catalog', async ({ page }) => {
    await page.goto('/shop');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.locator('#shop-search').fill('fiberglass');
    await expect(page.getByRole('link').filter({ hasText: /fiberglass/i }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Exhaust', exact: true }).click();
    await expect(page).toHaveURL(/category=exhaust/);
    await page.locator('#shop-size').selectOption('20x20');
    await expect(page).toHaveURL(/size=20x20/);
  });

  test('pre-filter category shows pleated media', async ({ page }) => {
    await page.goto('/shop?category=pre-filters');
    await expect(page.getByText(/No products found/i)).toHaveCount(0);
    await expect(page.getByRole('link').filter({ hasText: /pleated|merv 10/i }).first()).toBeVisible();
  });

  test('product quantity adds to cart and checkout starts', async ({ page }) => {
    await page.goto('/shop');
    const productLink = page.locator('a[href^="/product/"]').first();
    await expect(productLink).toBeVisible();
    await productLink.click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('button', { name: 'Increase quantity' }).first().click();
    await page.getByRole('button', { name: /Add to Cart|Subscribe/ }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const checkout = page.getByRole('button', { name: 'Checkout' });
    await expect(checkout).toBeVisible();
    await checkout.click();
    await page.waitForURL(/checkout|shopify|myshopify/i, { timeout: 25_000 });
    expect(page.url()).toMatch(/checkout|shopify|myshopify/i);
  });

  test('contact quote form validates and submits', async ({ page }) => {
    await page.route('**/api/quote', async (route) => {
      const body = route.request().postDataJSON() as { email?: string; website?: string };
      expect(body.website || '').toBe('');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: 'Request a Quote or Get Help' })).toBeVisible();
    await page.locator('#quote-name').fill('Test Shop');
    await page.locator('#quote-email').fill('not-an-email');
    await page.locator('#quote-booth').fill('GFS Titan');
    await page.locator('#quote-filters').fill('20x20 exhaust pads');
    await page.locator('#quote-message').fill('Need a quote for the downdraft booth.');
    await page.getByRole('button', { name: 'Send Request' }).click();
    await expect(page.getByRole('alert')).toContainText(/email/i);

    await page.locator('#quote-email').fill('test@example.com');
    await page.getByRole('button', { name: 'Send Request' }).click();
    await expect(page.getByRole('status')).toContainText(/request received/i);
  });
});
