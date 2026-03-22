import { NextRequest, NextResponse } from 'next/server';
import { BlogGenerator, generateBlogWithClaude } from '@/lib/blog/generator';
import { BlogStorage } from '@/lib/blog/storage';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { useClaudeApi = false } = await request.json().catch(() => ({}));

    const storage = new BlogStorage();
    const generator = new BlogGenerator();

    if (useClaudeApi && process.env.ANTHROPIC_API_KEY) {
      const previousTopics = await storage.getPreviousTopics();
      
      const topics = [
        { topic: "UKMLA Exam Preparation Guide", keywords: ["UKMLA", "UK medical licensing assessment", "medical finals", "exam preparation"] },
        { topic: "Step 1 Study Strategies", keywords: ["USMLE Step 1", "medical school exam", "study tips", "exam strategy"] },
        { topic: "Step 2 CK Clinical Knowledge", keywords: ["USMLE Step 2 CK", "clinical knowledge", "medical exam", "clinical skills"] },
        { topic: "Medical School Finals Success", keywords: ["medical finals", "final year medicine", "OSCE", "written exams"] },
        { topic: "Anatomy High-Yield Topics", keywords: ["anatomy", "medical school", "high yield", "exam topics"] },
      ];

      const availableTopics = topics.filter(
        t => !previousTopics.some(prev => 
          prev.toLowerCase().includes(t.topic.toLowerCase()) ||
          t.topic.toLowerCase().includes(prev.toLowerCase())
        )
      );

      const selectedTopic = availableTopics.length > 0 
        ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
        : topics[Math.floor(Math.random() * topics.length)];

      const blog = await generateBlogWithClaude({
        topic: selectedTopic.topic,
        keywords: selectedTopic.keywords,
        targetAudience: "medical students preparing for exams",
        contentType: ['educational', 'tips', 'guide', 'comparison'][Math.floor(Math.random() * 4)] as any,
        previousTopics
      });

      await storage.saveBlog(blog);

      return NextResponse.json({
        success: true,
        blog: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          category: blog.category
        }
      });
    } else {
      const blog = await generator.generateDailyBlog();

      if (!blog) {
        return NextResponse.json(
          { error: 'Failed to generate blog' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        blog: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          category: blog.category
        }
      });
    }
  } catch (error) {
    console.error('Error in blog generation API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    const isVercelCron = request.headers.get('x-vercel-cron') === '1';
    
    console.log('Blog generation cron job triggered', {
      isVercelCron,
      hasAuthHeader: !!authHeader,
      hasCronSecret: !!cronSecret,
      timestamp: new Date().toISOString()
    });

    if (!isVercelCron && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.error('Unauthorized cron job attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const storage = new BlogStorage();
    const generator = new BlogGenerator();
    
    const useClaudeApi = process.env.ANTHROPIC_API_KEY ? true : false;

    if (useClaudeApi) {
      console.log('Using Claude API for blog generation');
      const previousTopics = await storage.getPreviousTopics();
      console.log(`Found ${previousTopics.length} previous topics`);
      
      const topics = [
        { topic: "UKMLA Exam Preparation Guide", keywords: ["UKMLA", "UK medical licensing assessment", "medical finals", "exam preparation"] },
        { topic: "Step 1 Study Strategies", keywords: ["USMLE Step 1", "medical school exam", "study tips", "exam strategy"] },
        { topic: "Step 2 CK Clinical Knowledge", keywords: ["USMLE Step 2 CK", "clinical knowledge", "medical exam", "clinical skills"] },
        { topic: "Medical School Finals Success", keywords: ["medical finals", "final year medicine", "OSCE", "written exams"] },
        { topic: "Anatomy High-Yield Topics", keywords: ["anatomy", "medical school", "high yield", "exam topics"] },
      ];

      const availableTopics = topics.filter(
        t => !previousTopics.some(prev => 
          prev.toLowerCase().includes(t.topic.toLowerCase()) ||
          t.topic.toLowerCase().includes(prev.toLowerCase())
        )
      );

      const selectedTopic = availableTopics.length > 0 
        ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
        : topics[Math.floor(Math.random() * topics.length)];

      console.log('Selected topic for blog generation:', selectedTopic.topic);

      const blog = await generateBlogWithClaude({
        topic: selectedTopic.topic,
        keywords: selectedTopic.keywords,
        targetAudience: "medical students preparing for exams",
        contentType: ['educational', 'tips', 'guide', 'comparison'][Math.floor(Math.random() * 4)] as any,
        previousTopics
      });

      await storage.saveBlog(blog);
      console.log('Blog saved successfully:', blog.id);

      return NextResponse.json({
        success: true,
        blog: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          category: blog.category
        },
        message: 'Blog generated successfully via cron job'
      });
    } else {
      console.log('Using default blog generator (no Claude API key)');
      const blog = await generator.generateDailyBlog();

      if (!blog) {
        console.error('Failed to generate blog with default generator');
        return NextResponse.json(
          { error: 'Failed to generate blog' },
          { status: 500 }
        );
      }

      console.log('Blog generated successfully:', blog.id);
      return NextResponse.json({
        success: true,
        blog: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          category: blog.category
        },
        message: 'Blog generated successfully via cron job'
      });
    }
  } catch (error) {
    console.error('Error in blog generation cron job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}