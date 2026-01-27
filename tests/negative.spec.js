const { test, expect } = require('@playwright/test');

const testScenarios = [
  { id: 'Neg_Fun_001', input: '12345' },
  { id: 'Neg_Fun_002', input: '@@@###' },
  { id: 'Neg_Fun_003', input: 'naan@@@' },
  { id: 'Neg_Fun_004', input: '.....' },
  { id: 'Neg_Fun_005', input: '   ' },
  { id: 'Neg_Fun_006', input: 'naan 123' },
  { id: 'Neg_Fun_007', input: '$$$' },
  { id: 'Neg_Fun_008', input: '!!!' },
  { id: 'Neg_Fun_009', input: '123abc' },
  { id: 'Neg_Fun_010', input: '' }
];

test.describe('Negative Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/');
  });

  for (const scenario of testScenarios) {

    test(`${scenario.id}`, async ({ page }) => {

      const textarea = page.locator('textarea');
      await textarea.click();
      await textarea.fill(scenario.input);
      await page.waitForTimeout(1000);

      expect(page.url()).toContain('changathi');

    });

  }

});
