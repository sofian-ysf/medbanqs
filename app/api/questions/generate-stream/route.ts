import { NextRequest, NextResponse } from 'next/server';
import { 
  generateQuestion, 
  saveQuestionToFirestore,
  QuestionCollection,
  QUESTION_COLLECTIONS,
  GeneratedQuestion
} from '@/lib/questionGenerator';

// API key for authentication
const API_KEY = process.env.QUESTION_GENERATION_API_KEY;

// Validate API key
function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  return apiKey === API_KEY;
}

// Helper to create SSE message
function createSSEMessage(data: any): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid API key' },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { 
    collection, 
    count = 1, 
    topics,
    saveToDb = true 
  } = body;

  // Validate collection name
  if (!QUESTION_COLLECTIONS.includes(collection as QuestionCollection)) {
    return NextResponse.json(
      { error: `Invalid collection name. Must be one of: ${QUESTION_COLLECTIONS.join(', ')}` },
      { status: 400 }
    );
  }

  // Limit batch size
  const maxBatchSize = 50;
  const actualCount = Math.min(count, maxBatchSize);
  
  // Recommend reasonable batch sizes
  if (count > 20) {
    console.warn(`Large batch requested: ${count}. Consider smaller batches for better performance.`);
  }

  const collectionName = collection as QuestionCollection;

  // Create a readable stream for SSE
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial message
        controller.enqueue(
          encoder.encode(
            createSSEMessage({
              type: 'start',
              totalCount: actualCount,
              collection: collectionName,
              message: `Starting generation of ${actualCount} questions...`
            })
          )
        );

        const questions: GeneratedQuestion[] = [];
        const errors: string[] = [];
        const startTime = Date.now();

        // Generate questions with progress updates
        for (let i = 0; i < actualCount; i++) {
          try {
            // Send progress update
            controller.enqueue(
              encoder.encode(
                createSSEMessage({
                  type: 'progress',
                  current: i + 1,
                  total: actualCount,
                  percentage: Math.round(((i + 1) / actualCount) * 100),
                  message: `Generating question ${i + 1} of ${actualCount}...`
                })
              )
            );

            // Generate the question
            const topic = topics && topics[i % topics.length];
            const question = await generateQuestion(collectionName, topic);
            
            // Save to database if requested
            let docId: string | undefined;
            if (saveToDb) {
              docId = await saveQuestionToFirestore(collectionName, question);
            }

            questions.push(question);

            // Send question generated event
            controller.enqueue(
              encoder.encode(
                createSSEMessage({
                  type: 'question',
                  index: i,
                  question,
                  docId,
                  saved: saveToDb
                })
              )
            );

            // Dynamic delay based on batch size
            // Smaller batches: 500ms, larger batches: 200ms
            const delay = actualCount <= 10 ? 500 : 200;
            
            // Add delay to avoid rate limiting
            if (i < actualCount - 1) {
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          } catch (error) {
            const errorMsg = `Failed to generate question ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`;
            errors.push(errorMsg);
            
            // Send error event
            controller.enqueue(
              encoder.encode(
                createSSEMessage({
                  type: 'error',
                  index: i,
                  error: errorMsg
                })
              )
            );
          }
        }

        const endTime = Date.now();
        const duration = Math.round((endTime - startTime) / 1000);

        // Send completion message
        controller.enqueue(
          encoder.encode(
            createSSEMessage({
              type: 'complete',
              success: true,
              totalGenerated: questions.length,
              totalErrors: errors.length,
              duration,
              questions,
              errors,
              message: `Successfully generated ${questions.length} out of ${actualCount} questions in ${duration} seconds`
            })
          )
        );
      } catch (error) {
        // Send fatal error
        controller.enqueue(
          encoder.encode(
            createSSEMessage({
              type: 'fatal_error',
              error: error instanceof Error ? error.message : 'Unknown error'
            })
          )
        );
      } finally {
        controller.close();
      }
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// GET endpoint to check recommended batch sizes
export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid API key' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: 'operational',
    recommendations: {
      optimal_batch_size: 10,
      maximum_batch_size: 50,
      estimated_time_per_question: '1-2 seconds',
      rate_limits: {
        small_batch: '500ms delay between questions (1-10 questions)',
        large_batch: '200ms delay between questions (11-50 questions)'
      }
    },
    performance: {
      '5_questions': '5-10 seconds',
      '10_questions': '10-20 seconds',
      '20_questions': '20-40 seconds',
      '50_questions': '50-100 seconds'
    }
  });
}