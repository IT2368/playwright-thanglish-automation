const { test, expect } = require('@playwright/test');

test.describe('Positive UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
  });

  // Positive UI Test: Real-time output updating
  test('Pos_UI_001 - Real-time Output Updating', async ({ page }) => {
    
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

test.describe('Negative UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
  });

  // Negative UI Test: Special characters input
  test('Neg_UI_001 - Special Characters Input Handling', async ({ page }) => {

    const textarea = page.locator('#transliterateTextarea');
    await expect(textarea).toBeVisible();
    
    await textarea.click();
    await textarea.clear();
    
    await textarea.type('!@#$%^&*()_+{}|:"<>? ', { delay: 50 });
    await page.waitForTimeout(1500);
    
    const output = await textarea.inputValue();
    
    // Page should remain functional
    const pageUrl = page.url();
    expect(pageUrl).toContain('changathi');
    
    // Textarea should still be editable
    await expect(textarea).toBeEditable();
    
    console.log(`\n========================================`);
    console.log(`Test ID: Neg_UI_001`);
    console.log(`Category: Special Characters`);
    console.log(`Input: !@#$%^&*()_+{}|:"<>?`);
    console.log(`Output: "${output.trim()}"`);
    console.log(`Page Functional: Yes`);
    console.log(`Textarea Still Editable: Yes`);
    console.log(`Result: System handled special characters gracefully`);
    console.log(`========================================\n`);
  });

});
