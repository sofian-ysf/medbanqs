import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, temperature = 0.8, max_tokens = 1000, model = "gpt-4-0125-preview" } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    });

    return NextResponse.json({ 
      content: completion.choices[0].message.content,
      usage: completion.usage 
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    // Handle rate limiting
    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Handle other OpenAI errors
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: error.status || 500 }
    );
  }
}