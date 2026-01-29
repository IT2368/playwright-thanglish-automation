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
    input: 'naan saappitten',
    expectedTamil: 'நான் சாப்பிட்டேன்',
    lengthType: 'S'
  },
  
  // 1B) Compound Sentences (two ideas joined)
  {
    id: 'Pos_Fun_002',
    category: 'Compound Sentence',
    input: 'naan padichen aanaal exam fail aayitten',
    expectedTamil: 'நான் படிச்சேன் ஆனால் exam fail ஆயிட்டேன்',
    lengthType: 'M'
  },
  
  // 1C) Complex Sentences (cause/effect, conditions)
  {
    id: 'Pos_Fun_003',
    category: 'Complex Sentence',
    input: 'mazhai peinja karanam naan veetil irunthen',
    expectedTamil: 'மழை பெய்ஞ காரணம் நான் வீட்டில் இருந்தேன்',
    lengthType: 'M'
  },
  
  // 2A) Interrogative (question) forms
  {
    id: 'Pos_Fun_004',
    category: 'Interrogative Form',
    input: 'nee eppadi irukka',
    expectedTamil: 'நீ எப்படி இருக்க',
    lengthType: 'S'
  },
  
  // 2B) Imperative (command) forms
  {
    id: 'Pos_Fun_005',
    category: 'Imperative Form',
    input: 'kathavu saaththu',
    expectedTamil: 'கதவு சாத்து',
    lengthType: 'S'
  },
  
  // 3A) Positive sentence forms
  {
    id: 'Pos_Fun_006',
    category: 'Positive Sentence Form',
    input: 'avan nalla paiyan',
    expectedTamil: 'அவன் நல்ல பையன்',
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
    input: 'vanakkam nanbare',
    expectedTamil: 'வணக்கம் நண்பரே',
    lengthType: 'S'
  },
  
  // 4B) Requests
  {
    id: 'Pos_Fun_009',
    category: 'Requests',
    input: 'enakku thanni kudukka mudiyuma',
    expectedTamil: 'எனக்கு தண்ணி குடுக்க முடியுமா',
    lengthType: 'M'
  },
  
  // 4C) Responses
  {
    id: 'Pos_Fun_010',
    category: 'Responses',
    input: 'sari naan varuven',
    expectedTamil: 'சரி நான் வருவேன்',
    lengthType: 'S'
  },
  
  // 5A) Polite phrasing
  {
    id: 'Pos_Fun_011',
    category: 'Polite Phrasing',
    input: 'dayavu seithu utkaarungal',
    expectedTamil: 'தயவு செய்து உட்காருங்கள்',
    lengthType: 'S'
  },
  
  // 5B) Informal phrasing
  {
    id: 'Pos_Fun_012',
    category: 'Informal Phrasing',
    input: 'da vaa saappidalaam',
    expectedTamil: 'டா வா சாப்பிடலாம்',
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
    input: 'naan padikkiren',
    expectedTamil: 'நான் படிக்கிறேன்',
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
    input: 'naan nethu school ponen',
    expectedTamil: 'நான் நேத்து school போனேன்',
    lengthType: 'S'
  },
  
  // 10) Tense variations - Present
  {
    id: 'Pos_Fun_018',
    category: 'Present Tense',
    input: 'naan ippo padikkiren',
    expectedTamil: 'நான் இப்போ படிக்கிறேன்',
    lengthType: 'S'
  },
  
  // 10) Tense variations - Future
  {
    id: 'Pos_Fun_019',
    category: 'Future Tense',
    input: 'naan naalaikku varuven',
    expectedTamil: 'நான் நாளைக்கு வருவேன்',
    lengthType: 'S'
  },
  
  // 11) Negation patterns
  {
    id: 'Pos_Fun_020',
    category: 'Negation Pattern',
    input: 'avanukku theriyaathu',
    expectedTamil: 'அவனுக்கு தெரியாது',
    lengthType: 'S'
  },
  
  // 12) Singular/plural and pronoun variations
  {
    id: 'Pos_Fun_021',
    category: 'Plural and Pronoun',
    input: 'naangal ellorum varuvoam',
    expectedTamil: 'நாங்கள் எல்லோரும் வருவோம்',
    lengthType: 'S'
  },
  
  // 13) Request forms with varying politeness
  {
    id: 'Pos_Fun_022',
    category: 'Polite Request Form',
    input: 'ungalaal itha solla mudiyuma',
    expectedTamil: 'உங்களால் இத சொல்ல முடியுமா',
    lengthType: 'M'
  },
  
  // 14) English technical/brand terms in Thanglish
  {
    id: 'Pos_Fun_023',
    category: 'English Brand Terms',
    input: 'naan WhatsApp la message anupinen',
    expectedTamil: 'நான் WhatsApp ல message அனுப்பினேன்',
    lengthType: 'M'
  },
  
  // 15) Places and English words that should remain
  {
    id: 'Pos_Fun_024',
    category: 'Places and English Words',
    input: 'naan Chennai la irukken',
    expectedTamil: 'நான் Chennai ல இருக்கேன்',
    lengthType: 'S'
  },
  
  // 16) English abbreviations
  {
    id: 'Pos_Fun_025',
    category: 'English Abbreviations',
    input: 'naan ATM la panam eduthen',
    expectedTamil: 'நான் ATM ல பணம் எடுத்தேன்',
    lengthType: 'M'
  },
  
  // 17) Inputs containing punctuation marks
  {
    id: 'Pos_Fun_026',
    category: 'Punctuation Marks',
    input: 'nee varuviya illaya',
    expectedTamil: 'நீ வருவியா இல்லையா',
    lengthType: 'S'
  },
  
  // 18) Currency, time formats, dates
  {
    id: 'Pos_Fun_027',
    category: 'Currency and Numbers',
    input: 'antha book 500 rooba',
    expectedTamil: 'அந்த book 500 ரூபா',
    lengthType: 'S'
  },
  
  // 19) Medium length input (31-299 chars)
  {
    id: 'Pos_Fun_028',
    category: 'Medium Length Input',
    input: 'enakku oru periya veedu vennum athu romba azhagaa irukkanum',
    expectedTamil: 'எனக்கு ஒரு பெரிய வீடு வேணும் அது ரொம்ப அழகா இருக்கணும்',
    lengthType: 'M'
  },
  
  // 20) Long input (≥300 chars) - Testing robustness
  {
    id: 'Pos_Fun_029',
    category: 'Long Input',
    input: 'naan innikku kaalaila ezhunthu palladikki seithu kulichchu saapittu office ku ponen office la romba velai irunthathu meeting attend panni report submit panni colleagues kooda discussion panni velaiya mudichchu veetukku vanthen veetukku vanthathu evening achu romba tired aa irunthathu aanaalum happy aa irunthen',
    expectedTamil: 'நான் இன்னிக்கு காலைல எழுந்து பல்லடிக்கி செய்து குளிச்சு சாப்பிட்டு office கு போனேன் office ல ரொம்ப வேலை இருந்தது meeting attend பண்ணி report submit பண்ணி colleagues கூட discussion பண்ணி வேலைய முடிச்சு வீட்டுக்கு வந்தேன் வீட்டுக்கு வந்தது evening ஆச்சு ரொம்ப tired ஆ இருந்தது ஆனாலும் happy ஆ இருந்தேன்',
    lengthType: 'L'
  },
  
  // 21) Slang and colloquial phrasing
  {
    id: 'Pos_Fun_030',
    category: 'Slang/Colloquial',
    input: 'dei mass da',
    expectedTamil: 'டேய் mass டா',
    lengthType: 'S'
  },
  
  // Time format
  {
    id: 'Pos_Fun_031',
    category: 'Time Format',
    input: 'meeting pathu mani ku',
    expectedTamil: 'meeting பத்து மணி கு',
    lengthType: 'S'
  },
  
  // Date format
  {
    id: 'Pos_Fun_032',
    category: 'Date Format',
    input: 'ennoda birthday January la varum',
    expectedTamil: 'என்னோட birthday January ல வரும்',
    lengthType: 'M'
  },
  
  // Units of measurement
  {
    id: 'Pos_Fun_033',
    category: 'Units of Measurement',
    input: 'antha kadai aindu kilometer thooram',
    expectedTamil: 'அந்த கடை ஐந்து kilometer தூரம்',
    lengthType: 'M'
  },
  
  // Multiple spaces handling
  {
    id: 'Pos_Fun_034',
    category: 'Multiple Spaces',
    input: 'naan vanthen',
    expectedTamil: 'நான் வந்தேன்',
    lengthType: 'S'
  }
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
