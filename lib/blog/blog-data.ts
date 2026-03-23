// Auto-generated blog data - this file bundles blog data for production
import { BlogPost } from '@/types/blog';

// Import all blog JSON files
import anatomyBlog from '@/data/blogs/anatomy-high-yield-topics-for-medical-exams.json';
import clinicalSkillsBlog from '@/data/blogs/clinical-skills-assessment-mastering-the-osce.json';
import questionBankBlog from '@/data/blogs/effective-question-bank-strategies-for-medical-exams.json';
import emergencyBlog from '@/data/blogs/emergency-medicine-must-know-topics-for-exams.json';
import ethicsBlog from '@/data/blogs/medical-ethics-and-law-essential-knowledge-for-practice.json';
import finalsHowToBlog from '@/data/blogs/medical-school-finals-how-to-excel-in-your-final-year.json';
import finalsSuccessBlog from '@/data/blogs/medical-school-finals-success-your-complete-guide-to-mastering-final-year-exams.json';
import pathologyBlog from '@/data/blogs/pathology-review-key-concepts-for-medical-students.json';
import pharmacologyBlog from '@/data/blogs/pharmacology-for-medical-students.json';
import pharmacologyEasyBlog from '@/data/blogs/pharmacology-made-easy-essential-concepts-for-exams.json';
import step2Blog from '@/data/blogs/step-2-ck-clinical-knowledge-a-comprehensive-guide-for-medical-students.json';
import ukmlaBlog from '@/data/blogs/ukmla-exam-preparation-complete-guide-for-success.json';
import ukmlaGuideBlog from '@/data/blogs/ukmla-exam-preparation-guide-your-roadmap-to-success.json';
import usmleBlog from '@/data/blogs/usmle-step-1-high-yield-study-strategies-that-work.json';

export const ALL_BLOGS: BlogPost[] = [
  anatomyBlog as unknown as BlogPost,
  clinicalSkillsBlog as unknown as BlogPost,
  questionBankBlog as unknown as BlogPost,
  emergencyBlog as unknown as BlogPost,
  ethicsBlog as unknown as BlogPost,
  finalsHowToBlog as unknown as BlogPost,
  finalsSuccessBlog as unknown as BlogPost,
  pathologyBlog as unknown as BlogPost,
  pharmacologyBlog as unknown as BlogPost,
  pharmacologyEasyBlog as unknown as BlogPost,
  step2Blog as unknown as BlogPost,
  ukmlaBlog as unknown as BlogPost,
  ukmlaGuideBlog as unknown as BlogPost,
  usmleBlog as unknown as BlogPost,
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export function getAllBlogs(): BlogPost[] {
  return ALL_BLOGS;
}

export function getBlogBySlug(slug: string): BlogPost | null {
  return ALL_BLOGS.find(blog => blog.slug === slug) || null;
}

export function getBlogsByCategory(category: string): BlogPost[] {
  return ALL_BLOGS.filter(blog => 
    blog.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchBlogs(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return ALL_BLOGS.filter(blog =>
    blog.title.toLowerCase().includes(lowercaseQuery) ||
    blog.description.toLowerCase().includes(lowercaseQuery) ||
    blog.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
