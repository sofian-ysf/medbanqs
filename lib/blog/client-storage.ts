// Client-side blog data
// This is a static export of blog data for client components
import { BlogPost } from '@/types/blog';

export const staticBlogPosts: BlogPost[] = [
  {
    id: "blog-ukmla-guide",
    slug: "ukmla-exam-preparation-guide-your-roadmap-to-success",
    title: "UKMLA Exam Preparation Guide: Your Roadmap to Success",
    description: "Comprehensive guide to mastering the UK Medical Licensing Assessment with proven strategies and tips.",
    content: "",
    author: "MedBanqs Team",
    publishedAt: new Date().toISOString(),
    category: "Exam Preparation",
    tags: ["UKMLA", "medical exam", "study guide"],
    readingTime: 5,
    featured: false
  },
  {
    id: "blog-step2-ck",
    slug: "step-2-ck-clinical-knowledge-a-comprehensive-guide-for-medical-students",
    title: "Step 2 CK Clinical Knowledge: A Comprehensive Guide",
    description: "Master USMLE Step 2 CK with expert strategies and high-yield study tips.",
    content: "",
    author: "MedBanqs Team",
    publishedAt: new Date().toISOString(),
    category: "Exam Preparation",
    tags: ["USMLE", "Step 2 CK", "clinical knowledge"],
    readingTime: 7,
    featured: false
  },
  {
    id: "blog-medical-finals",
    slug: "medical-school-finals-success-your-complete-guide-to-mastering-final-year-exams",
    title: "Medical School Finals Success: Your Complete Guide",
    description: "Excel in your final year medical exams with comprehensive preparation strategies.",
    content: "",
    author: "MedBanqs Team",
    publishedAt: new Date().toISOString(),
    category: "Clinical Skills",
    tags: ["medical finals", "OSCE", "clinical exams"],
    readingTime: 6,
    featured: false
  },
  {
    id: "blog-pharmacology",
    slug: "pharmacology-made-easy-essential-concepts-for-exams",
    title: "Pharmacology Made Easy: Essential Concepts for Exams",
    description: "Master key pharmacology concepts with simplified explanations and memory techniques.",
    content: "",
    author: "MedBanqs Team",
    publishedAt: new Date().toISOString(),
    category: "Basic Sciences",
    tags: ["pharmacology", "drug mechanisms", "medical basics"],
    readingTime: 5,
    featured: false
  }
];

export function getLatestStaticBlogs(count: number = 4): BlogPost[] {
  return staticBlogPosts.slice(0, count);
}