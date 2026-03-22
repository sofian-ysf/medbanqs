import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getImagesForQuestion, shouldIncludeImage } from './imageManagement';

// Model configuration
const MODEL_CONFIG = {
  primary: "gpt-4-0125-preview", // GPT-4 for best quality
  fallback: "gpt-3.5-turbo", // Fallback to GPT-3.5 if needed
  useFallback: false // Will be set to true if primary fails
};

// Question categories mapping to Firestore collections
export const QUESTION_COLLECTIONS = [
  'ENT',
  'Musculoskeletal',
  'Obstetrics and gynaecology',
  'Perioperative medicine and anaesthesia',
  'acute & emergency',
  'all areas of clinical practice',
  'cancer',
  'cardiovascular',
  'child health',
  'clinical haematology',
  'endocrine & metabolic',
  'gastrointestinal including liver',
  'general practice and primary healthcare',
  'infection',
  'medicine of older adult',
  'mental health',
  'neuroscience',
  'ophthalmology',
  'palliative & end of life care',
  'renal & urology',
  'respiratory',
  'sexual health',
  'surgery'
] as const;

export type QuestionCollection = typeof QUESTION_COLLECTIONS[number];

// Interface for generated question
export interface GeneratedQuestion {
  category: string;
  conditions: string;
  correctAnswer: string;
  explanation: string;
  guideline: string;
  options: string[];
  presentation: string;
  question: string;
  questionType?: 'diagnosis' | 'investigation' | 'management' | 'monitoring' | 'complication';
  images?: QuestionImage[];
}

// Interface for question images
export interface QuestionImage {
  url: string;
  caption?: string;
  position?: 'before-question' | 'after-question' | 'in-options';
  alt: string;
  source?: string;
  license?: string;
}

// Question type templates
const QUESTION_TYPES = {
  diagnosis: {
    stems: [
      "What is the most likely diagnosis?",
      "Which of the following is the most likely diagnosis?",
      "What is the most probable diagnosis?",
      "Based on the presentation, what is the diagnosis?"
    ],
    focus: "differential diagnosis based on clinical presentation and data"
  },
  investigation: {
    stems: [
      "What is the most appropriate next investigation?",
      "Which investigation would be most helpful to confirm the diagnosis?",
      "What is the gold standard investigation for this condition?",
      "Which initial investigation should be performed?",
      "What is the single most useful investigation?"
    ],
    focus: "choosing the most appropriate diagnostic test"
  },
  management: {
    stems: [
      "What is the most appropriate next step in management?",
      "What is the initial management?",
      "Which treatment should be started immediately?",
      "What is the definitive treatment for this condition?",
      "What is the first-line treatment?"
    ],
    focus: "selecting the correct treatment or management approach"
  },
  monitoring: {
    stems: [
      "Which parameter should be monitored?",
      "How should this patient be followed up?",
      "What is the most important monitoring investigation?",
      "Which marker best indicates treatment response?"
    ],
    focus: "appropriate monitoring and follow-up"
  },
  complication: {
    stems: [
      "What is the most likely complication?",
      "Which complication should you be most concerned about?",
      "What is this patient at highest risk of developing?",
      "Which adverse effect is most likely?"
    ],
    focus: "recognizing potential complications or adverse effects"
  }
};

// Common presentations for medical conditions
const COMMON_PRESENTATIONS = [
  'Breathlessness',
  'Chest pain',
  'Abdominal pain',
  'Headache',
  'Fever',
  'Confusion',
  'Weakness',
  'Dizziness',
  'Rash',
  'Joint pain',
  'Back pain',
  'Cough',
  'Vomiting',
  'Diarrhea',
  'Constipation',
  'Weight loss',
  'Fatigue',
  'Swelling',
  'Bleeding',
  'Seizures'
];

// Common investigations by category
const COMMON_INVESTIGATIONS = {
  cardiovascular: [
    'ECG', 'Echocardiogram', 'Cardiac catheterization', 'CT coronary angiography',
    'Exercise stress test', 'Troponin levels', 'BNP/NT-proBNP', '24-hour Holter monitor',
    'Cardiac MRI', 'Chest X-ray'
  ],
  respiratory: [
    'Chest X-ray', 'CT chest', 'Arterial blood gas', 'Spirometry', 'Peak flow',
    'Sputum culture', 'Bronchoscopy', 'V/Q scan', 'CT pulmonary angiography',
    'Pleural fluid analysis'
  ],
  gastrointestinal: [
    'Abdominal ultrasound', 'CT abdomen', 'Endoscopy', 'Colonoscopy', 'ERCP',
    'Liver function tests', 'Hepatitis serology', 'Stool culture', 'Fecal calprotectin',
    'Hydrogen breath test'
  ],
  neurological: [
    'CT head', 'MRI brain', 'Lumbar puncture', 'EEG', 'EMG/NCS',
    'Carotid Doppler', 'CT angiography', 'MR angiography', 'Visual evoked potentials'
  ]
};

// Common management options by presentation
const COMMON_MANAGEMENT = {
  acute: [
    'IV fluids', 'Oxygen therapy', 'IV antibiotics', 'Analgesia', 'Antiemetics',
    'Thromboprophylaxis', 'NG tube insertion', 'Catheterization', 'Blood transfusion'
  ],
  cardiovascular: [
    'Aspirin', 'Clopidogrel', 'Beta-blocker', 'ACE inhibitor', 'Statin',
    'Anticoagulation', 'Thrombolysis', 'Primary PCI', 'Cardioversion', 'Pacemaker'
  ],
  respiratory: [
    'Salbutamol nebulizer', 'Ipratropium nebulizer', 'Prednisolone', 'Antibiotics',
    'Chest drain', 'NIV', 'Intubation', 'Chest physiotherapy', 'Home oxygen'
  ],
  emergency: [
    'ABCDE assessment', 'Resuscitation', 'Emergency surgery', 'CT scan urgent',
    'Senior review', 'ITU referral', 'Emergency dialysis', 'Blood products'
  ]
};

// Common lab reference ranges for data interpretation
const LAB_REFERENCE_RANGES = {
  FBC: {
    'Hb': { male: '13.5-17.5 g/dL', female: '12.0-15.5 g/dL' },
    'WCC': '4.0-11.0 x10^9/L',
    'Platelets': '150-400 x10^9/L',
    'Neutrophils': '2.0-7.5 x10^9/L',
    'MCV': '80-100 fL',
    'MCH': '27-32 pg',
    'MCHC': '32-36 g/dL'
  },
  UE: {
    'Sodium': '135-145 mmol/L',
    'Potassium': '3.5-5.0 mmol/L',
    'Urea': '2.5-6.7 mmol/L',
    'Creatinine': { male: '60-110 μmol/L', female: '45-90 μmol/L' },
    'eGFR': '>90 mL/min/1.73m²',
    'Chloride': '95-105 mmol/L',
    'Bicarbonate': '22-28 mmol/L'
  },
  LFTs: {
    'ALT': '5-35 U/L',
    'AST': '5-35 U/L',
    'ALP': '30-130 U/L',
    'Bilirubin': '3-17 μmol/L',
    'Albumin': '35-50 g/L',
    'GGT': { male: '10-55 U/L', female: '5-35 U/L' }
  },
  TFTs: {
    'TSH': '0.4-4.0 mU/L',
    'Free T4': '9.0-25.0 pmol/L',
    'Free T3': '3.5-6.5 pmol/L'
  },
  Cardiac: {
    'Troponin I': '<0.04 ng/mL',
    'BNP': '<100 pg/mL',
    'CK': '25-200 U/L',
    'CK-MB': '0-25 U/L',
    'LDH': '100-250 U/L'
  },
  Inflammatory: {
    'CRP': '<5 mg/L',
    'ESR': { male: '0-15 mm/hr', female: '0-20 mm/hr' },
    'Procalcitonin': '<0.5 ng/mL'
  },
  Coagulation: {
    'PT': '11-13.5 seconds',
    'APTT': '26-36 seconds',
    'INR': '0.8-1.2',
    'Fibrinogen': '2.0-4.0 g/L',
    'D-dimer': '<500 ng/mL'
  },
  ABG: {
    'pH': '7.35-7.45',
    'PaCO2': '4.5-6.0 kPa',
    'PaO2': '10.5-13.5 kPa',
    'HCO3': '22-26 mmol/L',
    'Base excess': '-2 to +2 mmol/L',
    'Lactate': '0.5-2.0 mmol/L'
  }
};

// Common imaging findings
const IMAGING_FINDINGS = {
  'Chest X-ray': [
    'consolidation',
    'pleural effusion',
    'pneumothorax',
    'cardiomegaly',
    'pulmonary edema',
    'cavitation',
    'hilar lymphadenopathy',
    'reticular shadowing',
    'ground-glass opacification'
  ],
  'CT Head': [
    'midline shift',
    'intracranial hemorrhage',
    'cerebral edema',
    'hydrocephalus',
    'mass effect',
    'ischemic changes'
  ],
  'Abdominal X-ray': [
    'bowel obstruction',
    'free air under diaphragm',
    'dilated bowel loops',
    'air-fluid levels',
    'fecal loading'
  ],
  'ECG': [
    'ST elevation',
    'ST depression',
    'T wave inversion',
    'Q waves',
    'prolonged QT',
    'atrial fibrillation',
    'ventricular tachycardia',
    'complete heart block',
    'left bundle branch block'
  ]
};

// NICE Guidelines reference
const NICE_GUIDELINES: Record<string, string[]> = {
  ENT: [
    'NICE CG60: Otitis media with effusion',
    'NICE NG98: Hearing loss in adults',
    'NICE CG69: Respiratory tract infections',
    'NICE NG12: Suspected cancer (head and neck)',
    'NICE NG120: Cough (acute)'
  ],
  cardiovascular: [
    'NICE NG185: Acute coronary syndromes',
    'NICE NG106: Chronic heart failure',
    'NICE NG136: Hypertension',
    'NICE CG180: Atrial fibrillation',
    'NICE NG158: Venous thromboembolic diseases'
  ],
  respiratory: [
    'NICE NG115: COPD',
    'NICE QS25: Asthma',
    'NICE NG33: Tuberculosis',
    'NICE CG191: Pneumonia',
    'NICE NG175: COVID-19'
  ],
  'endocrine & metabolic': [
    'NICE NG28: Type 2 diabetes',
    'NICE NG17: Type 1 diabetes',
    'NICE NG145: Thyroid disease',
    'NICE CG146: Osteoporosis',
    'NICE CG176: Obesity'
  ],
  gastrointestinal: [
    'NICE CG61: Irritable bowel syndrome',
    'NICE NG12: Suspected cancer',
    'NICE CG152: Crohn\'s disease',
    'NICE CG166: Ulcerative colitis',
    'NICE CG188: Gallstone disease'
  ],
  'mental health': [
    'NICE CG90: Depression',
    'NICE CG113: Anxiety disorders',
    'NICE CG185: Bipolar disorder',
    'NICE CG178: Psychosis and schizophrenia',
    'NICE NG116: PTSD'
  ],
  neuroscience: [
    'NICE CG137: Epilepsy',
    'NICE NG71: Parkinson\'s disease',
    'NICE NG97: Dementia',
    'NICE CG150: Headaches',
    'NICE NG162: Stroke'
  ],
  'renal & urology': [
    'NICE CG182: Chronic kidney disease',
    'NICE NG203: Acute kidney injury',
    'NICE CG97: Lower urinary tract symptoms',
    'NICE NG2: Bladder cancer',
    'NICE CG175: Prostate cancer'
  ],
  infection: [
    'NICE NG195: Sepsis',
    'NICE NG84: Cellulitis',
    'NICE NG120: Cough (acute)',
    'NICE NG109: Urinary tract infection',
    'NICE NG144: Meningitis'
  ]
};

// System prompt for the AI model
const SYSTEM_PROMPT = `You are an expert medical educator creating UKMLA-style questions. 
Create clinically accurate, challenging but fair questions that test various clinical skills.

Follow these guidelines:
1. Questions should present realistic clinical scenarios
2. Include relevant patient demographics (age, gender)
3. Provide key examination findings and investigation results when needed
4. Include laboratory values, imaging findings, or ECG descriptions when relevant
5. Format lab results clearly (e.g., "Blood tests show: Hb 9.2 g/dL (13.5-17.5), MCV 65 fL (80-100)")
6. VARY THE QUESTION TYPE - not all questions should ask for diagnosis
7. Explanations should be educational and reference guidelines
8. Focus on common and important conditions
9. Test different clinical skills: diagnosis, investigation choice, management decisions
10. IMPORTANT: Vary the position of the correct answer randomly (A, B, C, D, or E)
11. Ensure all options are distinct and plausible

CRITICAL: Vary between these question types:
- DIAGNOSIS: "What is the most likely diagnosis?"
- INVESTIGATION: "What is the most appropriate next investigation?" or "What is the gold standard investigation?"
- MANAGEMENT: "What is the most appropriate next step in management?" or "What is the first-line treatment?"
- MONITORING: "How should this patient be monitored?" or "What should be checked before starting treatment?"
- COMPLICATIONS: "What is the most likely complication?" or "What is this patient at risk of?"

For INVESTIGATION questions: Options should be different tests/investigations
For MANAGEMENT questions: Options should be different treatments/interventions
For DIAGNOSIS questions: Options should be different conditions
For MONITORING questions: Options should be different parameters/tests to monitor
For COMPLICATION questions: Options should be different potential complications

The question should be exactly in this JSON format:
{
  "category": "System/System format (e.g., 'Cardiovascular / Respiratory')",
  "conditions": "Primary condition being tested",
  "correctAnswer": "Letter. Correct answer (e.g., 'D. CT pulmonary angiography' for investigation question)",
  "explanation": "Detailed explanation of why this is the correct choice",
  "guideline": "Relevant NICE or other guideline reference",
  "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4", "E. Option 5"],
  "presentation": "Chief complaint or presentation",
  "question": "Full clinical scenario ending with specific question type",
  "questionType": "diagnosis|investigation|management|monitoring|complication"
}`;

// Track previously generated conditions to ensure variety
const recentConditions = new Map<QuestionCollection, string[]>();

// ENT-specific conditions to ensure variety
const ENT_CONDITIONS = [
  'Acute otitis media',
  'Chronic otitis media',
  'Otitis externa',
  'Cholesteatoma',
  'Meniere\'s disease',
  'Benign paroxysmal positional vertigo',
  'Vestibular neuritis',
  'Acoustic neuroma',
  'Sudden sensorineural hearing loss',
  'Presbycusis',
  'Tonsillitis',
  'Peritonsillar abscess',
  'Epiglottitis',
  'Laryngitis',
  'Vocal cord polyps',
  'Laryngeal cancer',
  'Epistaxis',
  'Nasal polyps',
  'Chronic rhinosinusitis',
  'Allergic rhinitis',
  'Nasopharyngeal carcinoma',
  'Thyroglossal cyst',
  'Branchial cyst',
  'Salivary gland stones',
  'Parotitis'
];

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to generate lab value prompts
function generateLabPrompt(category: QuestionCollection): string {
  const labPrompts: Record<string, string> = {
    'cardiovascular': 'Include relevant cardiac biomarkers (Troponin, BNP), ECG findings, or echocardiogram results',
    'respiratory': 'Include ABG results, chest X-ray findings, or pulmonary function tests',
    'gastrointestinal including liver': 'Include LFTs, hepatitis serology, or abdominal imaging findings',
    'renal & urology': 'Include U&Es, eGFR, urinalysis, or renal imaging',
    'endocrine & metabolic': 'Include glucose, HbA1c, TFTs, or relevant hormone levels',
    'clinical haematology': 'Include FBC with differential, coagulation studies, or blood film findings',
    'infection': 'Include WCC, CRP, blood cultures, or relevant microbiology',
    'neuroscience': 'Include CSF analysis, CT/MRI findings, or neurophysiology results',
    'acute & emergency': 'Include point-of-care tests, ABG, basic bloods, or emergency imaging'
  };
  
  return labPrompts[category] || 'Include relevant laboratory values or investigation results';
}

// Helper to determine if question should include data interpretation
function shouldIncludeData(): boolean {
  // 60% chance to include data interpretation
  return Math.random() < 0.6;
}

// Safe OpenAI API call with fallback using API route
async function callOpenAI(messages: any[], temperature: number = 0.8, maxTokens: number = 1000) {
  const model = MODEL_CONFIG.useFallback ? MODEL_CONFIG.fallback : MODEL_CONFIG.primary;
  
  try {
    const response = await fetch('/api/openai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        temperature,
        max_tokens: maxTokens,
        model
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate content');
    }

    const data = await response.json();
    
    // Format response to match OpenAI SDK structure
    return {
      choices: [{
        message: {
          content: data.content
        }
      }],
      usage: data.usage
    };
  } catch (error: any) {
    // Check for insufficient quota error
    if (error?.message?.includes('insufficient_quota')) {
      console.error('\n⚠️ OpenAI API Error: Insufficient Quota');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Your OpenAI account has no credits remaining.');
      console.error('\nTo fix this:');
      console.error('1. Go to: https://platform.openai.com/account/billing');
      console.error('2. Add payment method and purchase credits');
      console.error('3. Minimum $5 should give you ~500+ questions');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      throw new Error('OpenAI account has no credits. Please add credits at https://platform.openai.com/account/billing');
    }
    
    // If rate limited, add delay and retry once
    if (error?.status === 429) {
      console.log('Rate limited, waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      try {
        const retryResponse = await fetch('/api/openai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages,
            temperature,
            max_tokens: maxTokens,
            model: MODEL_CONFIG.fallback // Use cheaper model for retry
          })
        });

        if (!retryResponse.ok) {
          const retryError = await retryResponse.json();
          throw new Error(retryError.error || 'Failed to generate content');
        }

        const retryData = await retryResponse.json();
        
        return {
          choices: [{
            message: {
              content: retryData.content
            }
          }],
          usage: retryData.usage
        };
      } catch (retryError: any) {
        if (retryError?.message?.includes('insufficient_quota')) {
          throw new Error('OpenAI account has no credits. Please add credits at https://platform.openai.com/account/billing');
        }
        throw retryError;
      }
    }
    
    throw error;
  }
}

// Generate a single question
export async function generateQuestion(
  collectionName: QuestionCollection,
  specificTopic?: string,
  specificQuestionType?: keyof typeof QUESTION_TYPES
): Promise<GeneratedQuestion> {
  try {
    // Get recent conditions for this collection
    const recent = recentConditions.get(collectionName) || [];
    
    // Select a random presentation
    const randomPresentation = COMMON_PRESENTATIONS[Math.floor(Math.random() * COMMON_PRESENTATIONS.length)];
    
    // Determine question type
    const questionTypes: (keyof typeof QUESTION_TYPES)[] = ['diagnosis', 'investigation', 'management', 'monitoring', 'complication'];
    const selectedQuestionType = specificQuestionType || questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const questionTypeInfo = QUESTION_TYPES[selectedQuestionType];
    const questionStem = questionTypeInfo.stems[Math.floor(Math.random() * questionTypeInfo.stems.length)];
    
    // Determine which answer position to use (A-E)
    const answerPositions = ['A', 'B', 'C', 'D', 'E'];
    const correctAnswerPosition = answerPositions[Math.floor(Math.random() * answerPositions.length)];
    
    // For ENT, suggest specific conditions to test
    let conditionHint = '';
    if (collectionName === 'ENT' && !specificTopic) {
      // Get unused ENT conditions
      const unusedConditions = ENT_CONDITIONS.filter(c => !recent.includes(c));
      if (unusedConditions.length > 0) {
        const randomCondition = unusedConditions[Math.floor(Math.random() * unusedConditions.length)];
        conditionHint = `Consider testing knowledge about: ${randomCondition}`;
      }
    }
    
    // Determine if this question should include data interpretation
    const includeData = shouldIncludeData();
    const dataPrompt = includeData ? `\n\nIMPORTANT: This question MUST include data interpretation.\n${generateLabPrompt(collectionName)}\nPresent abnormal values with reference ranges in parentheses.` : '';
    
    // Concise prompt to reduce token usage
    const focusedPrompt = `UKMLA ${collectionName} question.
    ${specificTopic ? `Topic: ${specificTopic}` : conditionHint}
    Type: ${selectedQuestionType} - "${questionStem}"
    Presentation: ${randomPresentation}
    ${includeData ? 'Include lab/imaging data with reference ranges.' : ''}
    Answer position: ${correctAnswerPosition}
    ${recent.length > 0 ? `Avoid: ${recent.slice(0, 3).join(', ')}` : ''}`;

    const completion = await callOpenAI(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: focusedPrompt }
      ],
      0.85, // Balanced temperature
      700   // Reduced tokens to save API costs
    );

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No content generated');
    }

    const generatedQuestion = JSON.parse(responseContent) as GeneratedQuestion;
    
    // Validate the generated question
    validateQuestion(generatedQuestion);
    
    // Check if question should include images and add them
    if (shouldIncludeImage(generatedQuestion.question, generatedQuestion.category)) {
      const images = getImagesForQuestion(
        generatedQuestion.conditions,
        generatedQuestion.category,
        generatedQuestion.question
      );
      if (images.length > 0) {
        generatedQuestion.images = images;
      }
    }
    
    // Track this condition to avoid repetition
    if (!recentConditions.has(collectionName)) {
      recentConditions.set(collectionName, []);
    }
    const conditions = recentConditions.get(collectionName)!;
    conditions.push(generatedQuestion.conditions);
    // Keep only last 10 conditions
    if (conditions.length > 10) {
      conditions.shift();
    }
    
    return generatedQuestion;
  } catch (error) {
    console.error('Error generating question:', error);
    throw error;
  }
}

// Generate multiple questions for a collection
export async function generateQuestionBatch(
  collectionName: QuestionCollection,
  count: number = 10,
  topics?: string[]
): Promise<GeneratedQuestion[]> {
  const questions: GeneratedQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const topic = topics && topics[i % topics.length];
      const question = await generateQuestion(collectionName, topic);
      questions.push(question);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error generating question ${i + 1}:`, error);
    }
  }
  
  return questions;
}

// Validate generated question structure
function validateQuestion(question: GeneratedQuestion): void {
  const requiredFields: (keyof GeneratedQuestion)[] = [
    'category', 'conditions', 'correctAnswer', 'explanation',
    'guideline', 'options', 'presentation', 'question'
  ];
  
  for (const field of requiredFields) {
    if (!question[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  if (!Array.isArray(question.options) || question.options.length !== 5) {
    throw new Error('Options must be an array of 5 items');
  }
  
  // Ensure correct answer is in options
  const correctAnswerInOptions = question.options.some(
    option => option === question.correctAnswer
  );
  
  if (!correctAnswerInOptions) {
    throw new Error('Correct answer must be one of the options');
  }
}

// Save generated question to Firestore
export async function saveQuestionToFirestore(
  collectionName: QuestionCollection,
  question: GeneratedQuestion
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...question,
      createdAt: serverTimestamp(),
      generatedBy: 'AI',
      reviewed: false,
      difficulty: determineDifficulty(question),
      tags: extractTags(question)
    });
    
    console.log(`Question saved to ${collectionName} with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error saving question to Firestore:', error);
    throw error;
  }
}

// Determine question difficulty based on content
function determineDifficulty(question: GeneratedQuestion): 'easy' | 'medium' | 'hard' {
  const questionLength = question.question.length;
  const hasMultipleFindings = question.question.includes('and') && question.question.includes(',');
  const hasInvestigations = question.question.toLowerCase().includes('ecg') || 
                           question.question.toLowerCase().includes('blood') ||
                           question.question.toLowerCase().includes('imaging');
  
  if (questionLength > 400 || (hasMultipleFindings && hasInvestigations)) {
    return 'hard';
  } else if (questionLength > 250 || hasMultipleFindings || hasInvestigations) {
    return 'medium';
  }
  return 'easy';
}

// Extract relevant tags from question
function extractTags(question: GeneratedQuestion): string[] {
  const tags: string[] = [];
  
  // Add presentation as tag
  tags.push(question.presentation.toLowerCase());
  
  // Add condition as tag
  tags.push(question.conditions.toLowerCase());
  
  // Extract age group
  const ageMatch = question.question.match(/(\d+)-year-old/);
  if (ageMatch) {
    const age = parseInt(ageMatch[1]);
    if (age < 18) tags.push('pediatric');
    else if (age > 65) tags.push('geriatric');
    else tags.push('adult');
  }
  
  // Extract urgency
  if (question.question.toLowerCase().includes('emergency') || 
      question.question.toLowerCase().includes('acute') ||
      question.question.toLowerCase().includes('sudden')) {
    tags.push('emergency');
  }
  
  // Extract investigation types
  if (question.question.toLowerCase().includes('ecg')) tags.push('ecg');
  if (question.question.toLowerCase().includes('x-ray')) tags.push('imaging');
  if (question.question.toLowerCase().includes('blood')) tags.push('laboratory');
  
  return tags;
}

// Generate questions for all collections
export async function generateQuestionsForAllCollections(
  questionsPerCollection: number = 5
): Promise<Map<QuestionCollection, GeneratedQuestion[]>> {
  const allQuestions = new Map<QuestionCollection, GeneratedQuestion[]>();
  
  for (const collectionName of QUESTION_COLLECTIONS) {
    console.log(`Generating questions for ${collectionName}...`);
    const questions = await generateQuestionBatch(collectionName, questionsPerCollection);
    allQuestions.set(collectionName, questions);
    
    // Save to Firestore
    for (const question of questions) {
      await saveQuestionToFirestore(collectionName, question);
    }
    
    // Delay between collections
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return allQuestions;
}

// Track recent data interpretation questions to ensure variety
const recentDataQuestions = new Map<string, Set<string>>();

// Data patterns for variety
const DATA_PATTERNS = {
  labs: {
    anemia: ['Low Hb', 'Low MCV', 'Low ferritin'],
    renal: ['High creatinine', 'Low eGFR', 'High potassium'],
    liver: ['High ALT/AST', 'High bilirubin', 'Low albumin'],
    infection: ['High WCC', 'High CRP', 'High neutrophils'],
    cardiac: ['High troponin', 'High BNP', 'High CK-MB'],
    diabetes: ['High glucose', 'High HbA1c', 'Ketones'],
    thyroid: ['Abnormal TSH', 'T3/T4 changes'],
    coagulation: ['High INR', 'Low platelets', 'High APTT']
  },
  imaging: {
    chest: ['consolidation', 'pleural effusion', 'pneumothorax', 'pulmonary edema'],
    head: ['hemorrhage', 'infarct', 'mass', 'hydrocephalus'],
    abdomen: ['obstruction', 'perforation', 'inflammation', 'mass']
  },
  ecg: {
    acute: ['STEMI', 'NSTEMI', 'arrhythmia'],
    chronic: ['LVH', 'bundle branch block', 'old infarct']
  }
};

// Generate data interpretation focused question
export async function generateDataInterpretationQuestion(
  collectionName: QuestionCollection,
  dataType: 'labs' | 'imaging' | 'ecg' | 'mixed' = 'mixed',
  questionIndex?: number
): Promise<GeneratedQuestion> {
  const dataTypePrompts = {
    labs: `Create a question that primarily tests laboratory data interpretation.
           Include multiple abnormal lab values with reference ranges.
           Focus on pattern recognition (e.g., iron deficiency anemia pattern, AKI vs CKD, liver failure pattern).`,
    imaging: `Create a question focused on imaging interpretation.
              Describe key imaging findings clearly (e.g., "consolidation in right lower lobe", "bilateral ground-glass opacities").
              The diagnosis should be based primarily on the imaging findings.`,
    ecg: `Create a question centered on ECG interpretation.
          Describe the ECG findings in detail (rate, rhythm, intervals, ST/T changes).
          The diagnosis or management should depend on correct ECG interpretation.`,
    mixed: `Create a question combining clinical presentation with significant data interpretation.
            Include a mix of laboratory values, imaging, or ECG findings that are crucial for diagnosis.`
  };
  
  // Get recent questions key
  const cacheKey = `${collectionName}-${dataType}`;
  const recentQuestions = recentDataQuestions.get(cacheKey) || new Set();
  
  // Vary question types for data interpretation
  const questionTypes: (keyof typeof QUESTION_TYPES)[] = ['diagnosis', 'investigation', 'management'];
  const selectedQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const questionTypeInfo = QUESTION_TYPES[selectedQuestionType];
  const questionStem = questionTypeInfo.stems[Math.floor(Math.random() * questionTypeInfo.stems.length)];
  
  // Vary presentations - use different one each time
  const presentationIndex = (questionIndex || 0) % COMMON_PRESENTATIONS.length;
  const presentation = COMMON_PRESENTATIONS[presentationIndex];
  
  // Vary answer position systematically
  const answerPositions = ['A', 'B', 'C', 'D', 'E'];
  const answerIndex = (questionIndex || 0) % answerPositions.length;
  const correctAnswerPosition = answerPositions[answerIndex];
  
  // Vary age groups
  const ageGroups = [
    '25-year-old', '35-year-old', '45-year-old', '55-year-old', 
    '65-year-old', '75-year-old', '18-year-old', '82-year-old'
  ];
  const age = ageGroups[(questionIndex || 0) % ageGroups.length];
  
  // Vary gender
  const gender = (questionIndex || 0) % 2 === 0 ? 'male' : 'female';
  
  // Select different data pattern based on index
  let dataPattern = '';
  if (dataType === 'labs') {
    const patterns = Object.keys(DATA_PATTERNS.labs);
    const patternKey = patterns[(questionIndex || 0) % patterns.length];
    dataPattern = `Focus on ${patternKey} pattern: ${DATA_PATTERNS.labs[patternKey as keyof typeof DATA_PATTERNS.labs].join(', ')}`;
  }
  
  // Create variation hints based on index
  const variationHints = questionIndex ? `
  This is question ${questionIndex} in a batch. MUST be completely different from ALL previous questions.
  MANDATORY variations for this question:
  - Patient: ${age} ${gender}
  - Presentation: ${presentation}
  - Question type: ${selectedQuestionType}
  - Answer position: ${correctAnswerPosition}
  ${dataPattern}
  
  CRITICAL: Each question must test a DIFFERENT condition/diagnosis. No repeats!
  ` : '';
  
  // Simplified prompt for data interpretation to reduce tokens
  const enhancedPrompt = `UKMLA ${collectionName} question.
  Patient: ${age} ${gender}, ${presentation}
  Type: ${selectedQuestionType} - End with: "${questionStem}"
  Include: ${dataType === 'labs' ? 'Lab values with ranges' : dataType === 'imaging' ? 'Imaging findings' : dataType === 'ecg' ? 'ECG findings' : 'Mixed data'}
  ${dataPattern}
  Answer position: ${correctAnswerPosition}
  Question ${questionIndex || 1} - must be unique.`;
  
  try {
    const completion = await callOpenAI(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: enhancedPrompt }
      ],
      0.9,  // Moderate temperature
      800   // Reduced tokens to save costs
    );

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No content generated');
    }

    const generatedQuestion = JSON.parse(responseContent) as GeneratedQuestion;
    validateQuestion(generatedQuestion);
    
    // Track this question to avoid duplicates
    if (!recentDataQuestions.has(cacheKey)) {
      recentDataQuestions.set(cacheKey, new Set());
    }
    const cache = recentDataQuestions.get(cacheKey)!;
    const questionSignature = `${generatedQuestion.conditions}-${generatedQuestion.presentation}`;
    cache.add(questionSignature);
    
    // Keep only last 20 patterns
    if (cache.size > 20) {
      const items = Array.from(cache);
      cache.clear();
      items.slice(-20).forEach(item => cache.add(item));
    }
    
    return generatedQuestion;
  } catch (error) {
    console.error('Error generating data interpretation question:', error);
    throw error;
  }
}

// Enhanced question generation with specific scenarios
export async function generateScenarioBasedQuestion(
  collectionName: QuestionCollection,
  scenario: 'emergency' | 'chronic' | 'pediatric' | 'geriatric' | 'primary-care'
): Promise<GeneratedQuestion> {
  const scenarioPrompts = {
    emergency: 'Create an emergency/acute presentation requiring immediate management',
    chronic: 'Create a chronic disease management scenario',
    pediatric: 'Create a pediatric case (patient under 18 years)',
    geriatric: 'Create a geriatric case (patient over 75 years) with multiple comorbidities',
    'primary-care': 'Create a primary care/GP consultation scenario'
  };
  
  const enhancedPrompt = `Generate a UKMLA-style question for ${collectionName}.
  Scenario type: ${scenarioPrompts[scenario]}
  
  Make the scenario realistic and clinically relevant.`;
  
  try {
    const completion = await callOpenAI(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: enhancedPrompt }
      ],
      0.8,
      1000
    );

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No content generated');
    }

    const generatedQuestion = JSON.parse(responseContent) as GeneratedQuestion;
    validateQuestion(generatedQuestion);
    
    return generatedQuestion;
  } catch (error) {
    console.error('Error generating scenario-based question:', error);
    throw error;
  }
}