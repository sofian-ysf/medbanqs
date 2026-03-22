export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  schema?: any;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface BlogGenerationPrompt {
  topic: string;
  keywords: string[];
  targetAudience: string;
  contentType: 'educational' | 'tips' | 'guide' | 'comparison' | 'news';
  previousTopics: string[];
}