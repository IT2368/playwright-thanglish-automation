const { test, expect } = require('@playwright/test');

/**
 * Negative Functional Test Cases for Thanglish to Tamil Conversion
 * Website: https://tamil.changathi.com/
 * 
 * These test cases verify scenarios where the system fails or behaves incorrectly.
 * Test Case ID Convention: Neg_Fun_XXX
 * Input Length Types: S (≤30 chars), M (31-299 chars), L (≥300 chars)
 * 
 * How the website works:
 * - Type Thanglish text in the textarea
 * - Press SPACE after each word to trigger conversion
 * - The Tamil text replaces the Thanglish in the SAME textarea
 */

const testScenarios = [
  // 1) Only numeric input - System should not produce meaningful Tamil
  {
    id: 'Neg_Fun_001',
    category: 'Pure Numeric Input',
    input: '1234567890',
    expectedBehavior: 'No meaningful Tamil conversion for pure numbers',
    lengthType: 'S'
  },
  
  // 2) Only special characters - System cannot convert symbols to Tamil
  {
    id: 'Neg_Fun_002',
    category: 'Special Characters Only',
    input: '@#$%^&*()!',
    expectedBehavior: 'No Tamil conversion for special characters',
    lengthType: 'S'
  },
  
  // 3) Empty input - No output expected
  {
    id: 'Neg_Fun_003',
    category: 'Empty Input',
    input: '',
    expectedBehavior: 'Empty output for empty input',
    lengthType: 'S'
  },
  
  // 4) Only whitespace - Should not produce Tamil output
  {
    id: 'Neg_Fun_004',
    category: 'Whitespace Only',
    input: '     ',
    expectedBehavior: 'No meaningful output for whitespace only',
    lengthType: 'S'
  },
  
  // 5) Random English gibberish - Incorrect/no conversion
  {
    id: 'Neg_Fun_005',
    category: 'Random Gibberish',
    input: 'xyzqwrtyuiop',
    expectedBehavior: 'Gibberish input produces incorrect or no Tamil',
    lengthType: 'S'
  },
  
  // 6) Mixed numbers and Thanglish incorrectly formatted
  {
    id: 'Neg_Fun_006',
    category: 'Incorrect Mixed Format',
    input: 'naan123ponen456school',
    expectedBehavior: 'Numbers merged with words cause incorrect parsing',
    lengthType: 'S'
  },
  
  // 7) Only punctuation marks
  {
    id: 'Neg_Fun_007',
    category: 'Punctuation Only',
    input: '....????!!!!',
    expectedBehavior: 'No meaningful Tamil for punctuation only',
    lengthType: 'S'
  },
  
  // 8) HTML/Script tags (potential XSS test - system should handle gracefully)
  {
    id: 'Neg_Fun_008',
    category: 'HTML Tags Input',
    input: '<script>alert("test")</script>',
    expectedBehavior: 'HTML tags should not execute or cause errors',
    lengthType: 'M'
  },
  
  // 9) Extremely long repeated single character
  {
    id: 'Neg_Fun_009',
    category: 'Repeated Single Character',
    input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    expectedBehavior: 'Long repeated character may cause incorrect output',
    lengthType: 'M'
  },
  
  // 10) SQL injection style input (graceful handling test)
  {
    id: 'Neg_Fun_010',
    category: 'SQL Injection Style',
    input: "'; DROP TABLE users; --",
    expectedBehavior: 'SQL-like input should not cause errors',
    lengthType: 'S'
  },
  

];

test.describe('Negative Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
  });

  for (const scenario of testScenarios) {
    test(`${scenario.id} - ${scenario.category}`, async ({ page }) => {
      /**
       * Test Case: ${scenario.id}
       * Category: ${scenario.category}
       * Expected Behavior: ${scenario.expectedBehavior}
       */
      
      // Step 1: Locate the textarea
      const textarea = page.locator('#transliterateTextarea');
      await expect(textarea).toBeVisible();
      
      // Step 2: Clear any existing content
      await textarea.click();
      await textarea.clear();
      
      // Step 3: Enter the problematic input in the input field
      if (scenario.input.length > 0) {
        await textarea.type(scenario.input + ' ', { delay: 30 });
      }
      
      // Step 4: Wait for any conversion attempt
      await page.waitForTimeout(1500);
      
      // Step 5: Get the output
      const output = await textarea.inputValue();
      
      // Step 6: Verify the system handled the input gracefully (page didn't crash)
      const pageStillFunctional = await page.url();
      expect(pageStillFunctional).toContain('changathi');
      
      // Check if Tamil characters are present
      const hasTamilChars = /[\u0B80-\u0BFF]/.test(output);
      
      // For negative cases, we document the behavior
      // - Output may be empty
      // - Output may be same as input (no conversion)
      // - Output may have incorrect Tamil
      // - Page should still be functional
      
      // Log test details for documentation
      console.log(`\n========================================`);
      console.log(`Test ID: ${scenario.id}`);
      console.log(`Category: ${scenario.category}`);
      console.log(`Input Length Type: ${scenario.lengthType}`);
      console.log(`Input (${scenario.input.length} chars): ${scenario.input}`);
      console.log(`Expected Behavior: ${scenario.expectedBehavior}`);
      console.log(`Actual Output: ${output.trim()}`);
      console.log(`Has Tamil Characters: ${hasTamilChars}`);
      console.log(`Page Functional: Yes`);
      console.log(`Result: System handled input (see actual output)`);
      console.log(`========================================\n`);
    });
  }
});
