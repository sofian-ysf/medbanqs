import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';

const BLOG_DATA_DIR = path.join(process.cwd(), 'data', 'blogs');

export class BlogStorage {
  private ensureDataDir(): void {
    try {
      if (!fs.existsSync(BLOG_DATA_DIR)) {
        fs.mkdirSync(BLOG_DATA_DIR, { recursive: true });
      }
    } catch (error) {
      console.error('Error creating data directory:', error);
    }
  }

  async saveBlog(blog: BlogPost): Promise<void> {
    this.ensureDataDir();
    const filePath = path.join(BLOG_DATA_DIR, `${blog.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(blog, null, 2));
  }

  async getBlog(slug: string): Promise<BlogPost | null> {
    try {
      const filePath = path.join(BLOG_DATA_DIR, `${slug}.json`);
      if (!fs.existsSync(filePath)) {
        return null;
      }
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading blog ${slug}:`, error);
      return null;
    }
  }

  async getAllBlogs(): Promise<BlogPost[]> {
    try {
      if (!fs.existsSync(BLOG_DATA_DIR)) {
        console.log('Blog data directory does not exist');
        return [];
      }

      const files = fs.readdirSync(BLOG_DATA_DIR);
      const blogs: BlogPost[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          try {
            const filePath = path.join(BLOG_DATA_DIR, file);
            const data = fs.readFileSync(filePath, 'utf-8');
            blogs.push(JSON.parse(data));
          } catch (error) {
            console.error(`Error reading blog file ${file}:`, error);
          }
        }
      }

      return blogs.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.error('Error reading blogs:', error);
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
      return fs.existsSync(filePath);
    } catch {
      return false;
    }
  }

  async getPreviousTopics(): Promise<string[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs.map(blog => blog.title);
  }
}
