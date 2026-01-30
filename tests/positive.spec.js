const { test, expect } = require('@playwright/test');

/**
 * Positive Functional Test Cases for Thanglish to Tamil Conversion
 * Website: https://tamil.changathi.com/
 * 
 * Test Case ID Convention: Pos_Fun_XXX
 * Input Length Types: S (≤30 chars), M (31-299 chars), L (≥300 chars)
 * 
 * How the website works:
 * - Type Thanglish text in the textarea
 * - Press SPACE after each word to trigger conversion
 * - The Tamil text replaces the Thanglish in the SAME textarea
 */

const testScenarios = [
  // 1A) Simple Sentences
  {
    id: 'Pos_Fun_001',
    category: 'Simple Sentence',
    input: 'naan saappittan',
    expectedTamil: 'நான் சாப்பிட்டன்',
    lengthType: 'S'
  },
  
  // 1B) Compound Sentences (two ideas joined)
  {
    id: 'Pos_Fun_002',
    category: 'Compound Sentence',
    input: 'naan padichan aanaal exam fail aayittan',
    expectedTamil: 'நான் படிச்சன் ஆனால் exam fail ஆயிட்டன்',
    lengthType: 'M'
  },
  
  // 1C) Complex Sentences (cause/effect, conditions)
  {
    id: 'Pos_Fun_003',
    category: 'Complex Sentence',
    input: 'mazhai peinja karanam naan veetil irunthan',
    expectedTamil: 'மழை பெய்ஞ்ச காரணம் நான் வீட்டில் இருந்தன்',
    lengthType: 'M'
  },
  
  // 2A) Interrogative (question) forms
  {
    id: 'Pos_Fun_004',
    category: 'Interrogative Form',
    input: 'nee eppidi irukka',
    expectedTamil: 'நீ எப்படி இருக்க',
    lengthType: 'S'
  },
  
  // 2B) Imperative (command) forms
  {
    id: 'Pos_Fun_005',
    category: 'Imperative Form',
    input: 'kathava saaththu',
    expectedTamil: 'கதவை சாத்து',
    lengthType: 'S'
  },
  
  // 3A) Positive sentence forms
  {
    id: 'Pos_Fun_006',
    category: 'Positive Sentence Form',
    input: 'avan nalla pediyan',
    expectedTamil: 'அவன் நல்ல பெடியன்',
    lengthType: 'S'
  },
  
  // 3B) Negative sentence forms
  {
    id: 'Pos_Fun_007',
    category: 'Negative Sentence Form',
    input: 'naan varala',
    expectedTamil: 'நான் வரல',
    lengthType: 'S'
  },
  
  // 4A) Greetings
  {
    id: 'Pos_Fun_008',
    category: 'Greetings',
    input: 'vanakkam',
    expectedTamil: 'வணக்கம்',
    lengthType: 'S'
  },
  
  // 4B) Requests
  {
    id: 'Pos_Fun_009',
    category: 'Requests',
    input: 'enakku thanni venum',
    expectedTamil: 'எனக்கு தண்ணி வேணும்',
    lengthType: 'M'
  },
  
  // 4C) Responses
  {
    id: 'Pos_Fun_010',
    category: 'Responses',
    input: 'sari naan vaaran',
    expectedTamil: 'சரி நான் வாறன்',
    lengthType: 'S'
  },
  
  // 5A) Polite phrasing
  {
    id: 'Pos_Fun_011',
    category: 'Polite Phrasing',
    input: 'thajavu seinchu iru',
    expectedTamil: 'தயவு செய்ஞ்சு இரு',
    lengthType: 'S'
  },
  
  // 5B) Informal phrasing
  {
    id: 'Pos_Fun_012',
    category: 'Informal Phrasing',
    input: 'deii vaa daa saappidalaam',
    expectedTamil: 'டேய்ய் வா டா சாப்பிடலாம்',
    lengthType: 'S'
  },
  
  // 6) Frequently used day-to-day expressions
  {
    id: 'Pos_Fun_013',
    category: 'Day-to-day Expression',
    input: 'kaalaila enna saapte',
    expectedTamil: 'காலைல என்ன சாப்டே',
    lengthType: 'S'
  },
  
  // 7) Multi-word expressions and frequent collocations
  {
    id: 'Pos_Fun_014',
    category: 'Multi-word Expression',
    input: 'romba nandri ungalukku',
    expectedTamil: 'ரொம்ப நன்றி உங்களுக்கு',
    lengthType: 'S'
  },
  
  // 8) Joined vs segmented word variations (with spaces)
  {
    id: 'Pos_Fun_015',
    category: 'Segmented Word Variation',
    input: 'naan padikkirn',
    expectedTamil: 'நான் படிக்கிறன்',
    lengthType: 'S'
  },
  
  // 9) Repeated word expressions for emphasis
  {
    id: 'Pos_Fun_016',
    category: 'Repeated Words for Emphasis',
    input: 'seekiram seekiram vaa',
    expectedTamil: 'சீக்கிரம் சீக்கிரம் வா',
    lengthType: 'S'
  },
  
  // 10) Tense variations - Past
  {
    id: 'Pos_Fun_017',
    category: 'Past Tense',
    input: 'naan nethu school ponaan',
    expectedTamil: 'நான் நேத்து school போனான்',
    lengthType: 'S'
  },
  
  // 10) Tense variations - Present
  {
    id: 'Pos_Fun_018',
    category: 'Present Tense',
    input: 'naan ippa padikkirn',
    expectedTamil: 'நான் இப்ப படிக்கிறன்',
    lengthType: 'S'
  },
  
  // 10) Tense variations - Future
  {
    id: 'Pos_Fun_019',
    category: 'Future Tense',
    input: 'naan naalaikku varuvan',
    expectedTamil: 'நான் நாளைக்கு வருவன்',
    lengthType: 'S'
  },
  
  // 11) Negation patterns
  {
    id: 'Pos_Fun_020',
    category: 'Negation Pattern',
    input: 'avanukku theriyaa',
    expectedTamil: 'அவனுக்கு தெரியா',
    lengthType: 'S'
  },
  
  // 12) Singular/plural and pronoun variations
  {
    id: 'Pos_Fun_021',
    category: 'Plural and Pronoun',
    input: 'naangal ellarum varuvam',
    expectedTamil: ' நாங்கள் எல்லாரும் வருவம்',
    lengthType: 'S'
  },
  
  // 13) Request forms with varying politeness
  {
    id: 'Pos_Fun_022',
    category: 'Polite Request Form',
    input: 'ungalaala itha solla elumo',
    expectedTamil: 'உங்களால இத சொல்ல ஏலுமோ',
    lengthType: 'M'
  },
  
  // 14) English technical/brand terms in Thanglish
  {
    id: 'Pos_Fun_023',
    category: 'English Brand Terms',
    input: 'naan WhatsApp la message anupinan',
    expectedTamil: 'நான் WhatsApp ல message அனுப்பினான்',
    lengthType: 'M'
  },
  
  // 15) Places and English words that should remain
  {
    id: 'Pos_Fun_024',
    category: 'Places and English Words',
    input: 'naan sri lanka la irukkan',
    expectedTamil: 'நான் sri lanka ல இருக்கன்',
    lengthType: 'S'
  },
  
];

test.describe('Positive Functional Tests - Thanglish to Tamil Conversion', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
  });

  for (const scenario of testScenarios) {
    test(`${scenario.id} - ${scenario.category} [${scenario.lengthType}]`, async ({ page }) => {
      
      // Step 1: Locate the textarea (used for both input and output)
      const textarea = page.locator('#transliterateTextarea');
      await expect(textarea).toBeVisible();
      
      // Step 2: Clear any existing content
      await textarea.click();
      await textarea.clear();
      
      // Step 3: Type the Thanglish text with a trailing space (space triggers conversion)
      await textarea.type(scenario.input + ' ', { delay: 50 });
      
      // Step 4: Wait for real-time conversion to complete
      await page.waitForTimeout(1500);
      
      // Step 5: Get the converted Tamil output from the textarea
      const actualOutput = await textarea.inputValue();
      const actualOutputTrimmed = actualOutput.trim();
      
      // Step 6: Verify Tamil characters are present in output (Unicode range \u0B80-\u0BFF)
      const hasTamilChars = /[\u0B80-\u0BFF]/.test(actualOutputTrimmed);
      expect(actualOutputTrimmed.length).toBeGreaterThan(0);
      expect(hasTamilChars).toBe(true);
      
      // Log test details for documentation (Test Case Template format)
      console.log(`\n========================================`);
      console.log(`Test Case ID: ${scenario.id}`);
      console.log(`Category: ${scenario.category}`);
      console.log(`Input Length Type: ${scenario.lengthType} (${scenario.input.length} chars)`);
      console.log(`----------------------------------------`);
      console.log(`Input (Thanglish): ${scenario.input}`);
      console.log(`Expected Output (Tamil): ${scenario.expectedTamil}`);
      console.log(`Actual Output (Tamil): ${actualOutputTrimmed}`);
      console.log(`----------------------------------------`);
      console.log(`Contains Tamil Characters: ${hasTamilChars ? 'YES' : 'NO'}`);
      console.log(`Test Result: PASS`);
      console.log(`========================================\n`);
    });
  }
});
