import { NextRequest, NextResponse } from 'next/server';
import { 
  generateQuestion, 
  generateQuestionBatch,
  generateScenarioBasedQuestion,
  generateDataInterpretationQuestion,
  saveQuestionToFirestore,
  QuestionCollection,
  QUESTION_COLLECTIONS
} from '@/lib/questionGenerator';

// API key for authentication (store in environment variables)
const API_KEY = process.env.QUESTION_GENERATION_API_KEY;

// Validate API key
function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  return apiKey === API_KEY;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      action, 
      collection, 
      count = 1, 
      topics,
      scenario,
      saveToDb = true 
    } = body;

    // Validate collection name
    if (!QUESTION_COLLECTIONS.includes(collection as QuestionCollection)) {
      return NextResponse.json(
        { error: `Invalid collection name. Must be one of: ${QUESTION_COLLECTIONS.join(', ')}` },
        { status: 400 }
      );
    }

    const collectionName = collection as QuestionCollection;
    let result;

    switch (action) {
      case 'generateSingle':
        // Generate a single question
        const question = await generateQuestion(collectionName, topics?.[0]);
        
        if (saveToDb) {
          const docId = await saveQuestionToFirestore(collectionName, question);
          result = { question, docId, saved: true };
        } else {
          result = { question, saved: false };
        }
        break;

      case 'generateBatch':
        // Generate multiple questions
        const questions = await generateQuestionBatch(collectionName, count, topics);
        
        if (saveToDb) {
          const docIds = [];
          for (const q of questions) {
            const docId = await saveQuestionToFirestore(collectionName, q);
            docIds.push(docId);
          }
          result = { questions, docIds, saved: true, count: questions.length };
        } else {
          result = { questions, saved: false, count: questions.length };
        }
        break;

      case 'generateScenario':
        // Generate scenario-based question
        if (!scenario || !['emergency', 'chronic', 'pediatric', 'geriatric', 'primary-care'].includes(scenario)) {
          return NextResponse.json(
            { error: 'Invalid scenario type' },
            { status: 400 }
          );
        }
        
        const scenarioQuestion = await generateScenarioBasedQuestion(collectionName, scenario);
        
        if (saveToDb) {
          const docId = await saveQuestionToFirestore(collectionName, scenarioQuestion);
          result = { question: scenarioQuestion, docId, saved: true, scenario };
        } else {
          result = { question: scenarioQuestion, saved: false, scenario };
        }
        break;
        
      case 'generateDataInterpretation':
        // Generate data interpretation question
        const dataType = body.dataType || 'mixed';
        const questionIndex = body.questionIndex;
        if (!['labs', 'imaging', 'ecg', 'mixed'].includes(dataType)) {
          return NextResponse.json(
            { error: 'Invalid data type. Must be: labs, imaging, ecg, or mixed' },
            { status: 400 }
          );
        }
        
        const dataQuestion = await generateDataInterpretationQuestion(collectionName, dataType, questionIndex);
        
        if (saveToDb) {
          const docId = await saveQuestionToFirestore(collectionName, dataQuestion);
          result = { question: dataQuestion, docId, saved: true, dataType };
        } else {
          result = { question: dataQuestion, saved: false, dataType };
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Must be: generateSingle, generateBatch, generateScenario, or generateDataInterpretation' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      collection: collectionName,
      ...result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in question generation API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate questions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check API status
export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid API key' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: 'operational',
    collections: QUESTION_COLLECTIONS,
    endpoints: {
      generateSingle: 'Generate a single question',
      generateBatch: 'Generate multiple questions',
      generateScenario: 'Generate scenario-based question'
    },
    scenarios: ['emergency', 'chronic', 'pediatric', 'geriatric', 'primary-care']
  });
}