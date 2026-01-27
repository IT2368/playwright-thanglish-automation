const { test, expect } = require('@playwright/test');

test.describe('UI Tests', () => {

  test('Pos_UI_001 Textarea visible', async ({ page }) => {

    await page.goto('https://tamil.changathi.com/');
    const textarea = page.locator('textarea');

    await expect(textarea).toBeVisible();
  });

  test('Neg_UI_001 Page loads without crash', async ({ page }) => {

    await page.goto('https://tamil.changathi.com/');
    expect(page.url()).toContain('changathi');
  });

});
