const { test, expect } = require('@playwright/test');

const testScenarios = [
  { id: 'Pos_Fun_001', input: 'Vanakkam' },
  { id: 'Pos_Fun_002', input: 'Eppadi irukkirenga' },
  { id: 'Pos_Fun_003', input: 'naan veetukku pogiren' },
  { id: 'Pos_Fun_004', input: 'naan sapten' },
  { id: 'Pos_Fun_005', input: 'nee eppadi irukka' },
  { id: 'Pos_Fun_006', input: 'avan school ponaan' },
  { id: 'Pos_Fun_007', input: 'naan padikkiren' },
  { id: 'Pos_Fun_008', input: 'naan nalaikku varuven' },
  { id: 'Pos_Fun_009', input: 'enakku help pannunga' },
  { id: 'Pos_Fun_010', input: 'dayavu seidhu vaanga' },
  { id: 'Pos_Fun_011', input: 'naan meeting attend panna poren' },
  { id: 'Pos_Fun_012', input: 'naan whatsapp message anuppinen' },
  { id: 'Pos_Fun_013', input: 'naan office pogiren' },
  { id: 'Pos_Fun_014', input: 'avan nalla paiyan' },
  { id: 'Pos_Fun_015', input: 'naan coffee kudikkiren' },
  { id: 'Pos_Fun_016', input: 'nee enga irukka' },
  { id: 'Pos_Fun_017', input: 'naan thoonginen' },
  { id: 'Pos_Fun_018', input: 'naangal veetukku pogrom' },
  { id: 'Pos_Fun_019', input: 'avan vandhaan' },
  { id: 'Pos_Fun_020', input: 'naan shopping ponaen' },
  { id: 'Pos_Fun_021', input: 'nee saptiya' },
  { id: 'Pos_Fun_022', input: 'naan class attend panna poren' },
  { id: 'Pos_Fun_023', input: 'naan homework seithen' },
  { id: 'Pos_Fun_024', input: 'avan sir kitta pesinaan' }
];

test.describe('Positive Functional Tests', () => {

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
