const { test, expect } = require('@playwright/test');

/**
 * UI Test Cases for Thanglish to Tamil Conversion
 * Website: https://tamil.changathi.com/
 * 
 * Test Case ID Convention: Pos_UI_XXX, Neg_UI_XXX
 * 
 * This tests the user interface behavior and usability
 */

test.describe('UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
  });

  // Positive UI Test: Real-time output updating
  test('Pos_UI_001 - Real-time Output Updating', async ({ page }) => {
    /**
     * Test Case: Pos_UI_001
     * Category: Real-time Output Update
     * Description: Verify that the Tamil output is generated automatically in real-time
     *              as the user types Thanglish input and presses space.
     */
    
    // Step 1: Locate the textarea
    const textarea = page.locator('#transliterateTextarea');
    
    // Step 2: Verify textarea is visible
    await expect(textarea).toBeVisible();
    
    // Step 3: Get initial content (should be empty or default)
    const initialContent = await textarea.inputValue();
    
    // Step 4: Type Thanglish text character by character to observe real-time update
    await textarea.click();
    await textarea.clear();
    
    // Type 'vanakkam' and press space to trigger conversion
    await textarea.type('vanakkam ', { delay: 100 });
    
    // Step 5: Wait for real-time conversion
    await page.waitForTimeout(1500);
    
    // Step 6: Get the updated content
    const updatedContent = await textarea.inputValue();
    
    // Step 7: Verify output has changed (real-time update occurred)
    expect(updatedContent).not.toBe('vanakkam '); // Should be converted to Tamil
    
    // Step 8: Verify Tamil characters are present
    const hasTamilChars = /[\u0B80-\u0BFF]/.test(updatedContent);
    expect(hasTamilChars).toBe(true);
    
    // Step 9: Verify output contains வணக்கம் (Tamil for vanakkam/hello)
    expect(updatedContent.trim()).toContain('வணக்கம்');
    
    // Log test details
    console.log(`\n========================================`);
    console.log(`Test ID: Pos_UI_001`);
    console.log(`Category: Real-time Output Update`);
    console.log(`Input: vanakkam (typed with space)`);
    console.log(`Initial Content: "${initialContent}"`);
    console.log(`After Typing: "${updatedContent.trim()}"`);
    console.log(`Real-time Update Occurred: Yes`);
    console.log(`Contains Tamil Characters: ${hasTamilChars}`);
    console.log(`Result: PASS`);
    console.log(`========================================\n`);
  });
});
