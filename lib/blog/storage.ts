import { BlogPost } from '@/types/blog';
import fs from 'fs/promises';
import path from 'path';

const BLOG_DATA_DIR = path.join(process.cwd(), 'data', 'blogs');

export class BlogStorage {
  private async ensureDataDir(): Promise<void> {
    try {
      await fs.access(BLOG_DATA_DIR);
    } catch {
      await fs.mkdir(BLOG_DATA_DIR, { recursive: true });
    }
  }

  async saveBlog(blog: BlogPost): Promise<void> {
    await this.ensureDataDir();
    const filePath = path.join(BLOG_DATA_DIR, `${blog.slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(blog, null, 2));
  }

  async getBlog(slug: string): Promise<BlogPost | null> {
    try {
      const filePath = path.join(BLOG_DATA_DIR, `${slug}.json`);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async getAllBlogs(): Promise<BlogPost[]> {
    await this.ensureDataDir();
    try {
      const files = await fs.readdir(BLOG_DATA_DIR);
      const blogs = await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(async file => {
            const data = await fs.readFile(path.join(BLOG_DATA_DIR, file), 'utf-8');
            return JSON.parse(data);
          })
      );
      return blogs.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch {
      return [];
    }
  }

  async getBlogsByCategory(category: string): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs.filter(blog => 
      blog.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchBlogs(query: string): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    const lowercaseQuery = query.toLowerCase();
    
    return allBlogs.filter(blog => 
      blog.title.toLowerCase().includes(lowercaseQuery) ||
      blog.description.toLowerCase().includes(lowercaseQuery) ||
      blog.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      blog.content.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getRecentBlogs(limit: number = 10): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs.slice(0, limit);
  }

  async blogExists(slug: string): Promise<boolean> {
    try {
      const filePath = path.join(BLOG_DATA_DIR, `${slug}.json`);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async getPreviousTopics(): Promise<string[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs.map(blog => blog.title);
  }
}