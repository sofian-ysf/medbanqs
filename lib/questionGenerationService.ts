// Client-side service for question generation
import { GeneratedQuestion, QuestionCollection } from './questionGenerator';

const API_BASE_URL = '/api/questions/generate';

export interface GenerationRequest {
  action: 'generateSingle' | 'generateBatch' | 'generateScenario';
  collection: QuestionCollection;
  count?: number;
  topics?: string[];
  scenario?: 'emergency' | 'chronic' | 'pediatric' | 'geriatric' | 'primary-care';
  saveToDb?: boolean;
}

export interface GenerationResponse {
  success: boolean;
  collection: string;
  question?: GeneratedQuestion;
  questions?: GeneratedQuestion[];
  docId?: string;
  docIds?: string[];
  saved: boolean;
  count?: number;
  scenario?: string;
  timestamp: string;
  error?: string;
  details?: string;
}

class QuestionGenerationService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_QUESTION_API_KEY || '';
  }

  private async makeRequest(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      return data;
    } catch (error) {
      console.error('Question generation error:', error);
      throw error;
    }
  }

  // Generate a single question
  async generateSingleQuestion(
    collection: QuestionCollection,
    topic?: string,
    saveToDb: boolean = true
  ): Promise<GenerationResponse> {
    return this.makeRequest({
      action: 'generateSingle',
      collection,
      topics: topic ? [topic] : undefined,
      saveToDb,
    });
  }

  // Generate multiple questions
  async generateBatchQuestions(
    collection: QuestionCollection,
    count: number = 10,
    topics?: string[],
    saveToDb: boolean = true
  ): Promise<GenerationResponse> {
    return this.makeRequest({
      action: 'generateBatch',
      collection,
      count,
      topics,
      saveToDb,
    });
  }

  // Generate scenario-based question
  async generateScenarioQuestion(
    collection: QuestionCollection,
    scenario: 'emergency' | 'chronic' | 'pediatric' | 'geriatric' | 'primary-care',
    saveToDb: boolean = true
  ): Promise<GenerationResponse> {
    return this.makeRequest({
      action: 'generateScenario',
      collection,
      scenario,
      saveToDb,
    });
  }

  // Check API status
  async checkStatus(): Promise<any> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('API check failed');
      }

      return response.json();
    } catch (error) {
      console.error('Status check error:', error);
      throw error;
    }
  }
}

// Streaming generation for better UX with progress
export async function generateBatchWithProgress(
  collection: QuestionCollection,
  count: number,
  topics?: string[],
  saveToDb: boolean = true,
  onProgress?: (data: any) => void
): Promise<GeneratedQuestion[]> {
  const apiKey = process.env.NEXT_PUBLIC_QUESTION_API_KEY || '';
  
  const response = await fetch('/api/questions/generate-stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      collection,
      count,
      topics,
      saveToDb
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to start generation');
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  const questions: GeneratedQuestion[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress(data);
          }

          // Collect questions
          if (data.type === 'question' && data.question) {
            questions.push(data.question);
          }

          // Handle completion
          if (data.type === 'complete') {
            return data.questions || questions;
          }

          // Handle fatal error
          if (data.type === 'fatal_error') {
            throw new Error(data.error);
          }
        } catch (e) {
          console.error('Error parsing SSE data:', e);
        }
      }
    }
  }

  return questions;
}

// Export singleton instance
export const questionGenerationService = new QuestionGenerationService();

// Helper functions for specific use cases

export async function generateCardiovascularQuestions(count: number = 5): Promise<GenerationResponse> {
  const topics = [
    'Myocardial infarction',
    'Heart failure',
    'Atrial fibrillation',
    'Hypertension',
    'Pulmonary embolism',
  ];
  
  return questionGenerationService.generateBatchQuestions('cardiovascular', count, topics);
}

export async function generateEmergencyQuestions(count: number = 5): Promise<GenerationResponse> {
  const responses: GeneratedQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    const response = await questionGenerationService.generateScenarioQuestion(
      'acute & emergency',
      'emergency'
    );
    if (response.question) {
      responses.push(response.question);
    }
  }
  
  return {
    success: true,
    collection: 'acute & emergency',
    questions: responses,
    saved: true,
    count: responses.length,
    timestamp: new Date().toISOString(),
  };
}

export async function generatePediatricQuestions(
  collection: QuestionCollection,
  count: number = 5
): Promise<GenerationResponse> {
  const responses: GeneratedQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    const response = await questionGenerationService.generateScenarioQuestion(
      collection,
      'pediatric'
    );
    if (response.question) {
      responses.push(response.question);
    }
  }
  
  return {
    success: true,
    collection,
    questions: responses,
    saved: true,
    count: responses.length,
    timestamp: new Date().toISOString(),
  };
}

// Bulk generation for all collections
export async function generateQuestionsForAllCollections(
  questionsPerCollection: number = 3
): Promise<Map<QuestionCollection, GeneratedQuestion[]>> {
  const collections: QuestionCollection[] = [
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
  ];

  const allQuestions = new Map<QuestionCollection, GeneratedQuestion[]>();

  for (const collection of collections) {
    try {
      console.log(`Generating questions for ${collection}...`);
      const response = await questionGenerationService.generateBatchQuestions(
        collection,
        questionsPerCollection
      );
      
      if (response.questions) {
        allQuestions.set(collection, response.questions);
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to generate questions for ${collection}:`, error);
    }
  }

  return allQuestions;
}

// Question validation
export function validateGeneratedQuestion(question: GeneratedQuestion): boolean {
  const requiredFields: (keyof GeneratedQuestion)[] = [
    'category',
    'conditions',
    'correctAnswer',
    'explanation',
    'guideline',
    'options',
    'presentation',
    'question'
  ];

  // Check all required fields exist
  for (const field of requiredFields) {
    if (!question[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // Validate options array
  if (!Array.isArray(question.options) || question.options.length !== 5) {
    console.error('Options must be an array of 5 items');
    return false;
  }

  // Check correct answer is in options
  const correctAnswerInOptions = question.options.includes(question.correctAnswer);
  if (!correctAnswerInOptions) {
    console.error('Correct answer must be one of the options');
    return false;
  }

  return true;
}

// Export for use in components
export default questionGenerationService;