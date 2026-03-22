import { NextRequest, NextResponse } from 'next/server';
import { BlogStorage } from '@/lib/blog/storage';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const storage = new BlogStorage();
    let blogs;

    if (query) {
      blogs = await storage.searchBlogs(query);
    } else if (category) {
      blogs = await storage.getBlogsByCategory(category);
    } else {
      blogs = await storage.getAllBlogs();
    }

    if (limit) {
      blogs = blogs.slice(0, parseInt(limit, 10));
    }

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}