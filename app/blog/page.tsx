import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/lib/blog/blog-data';
import { BlogPost } from '@/types/blog';
import PillNavigation from '@/components/landing/PillNavigation';
import BlogCard from '@/components/blog/BlogCard';
import { generateBreadcrumbJsonLd, breadcrumbPaths } from '@/utils/breadcrumb-helper';

export const metadata: Metadata = {
  title: 'Medical Exam Prep Blog | MedBanqs',
  description: 'Expert guides and study tips for UKMLA, USMLE Step exams, and medical finals. Ace your medical exams with MedBanqs.',
  keywords: 'medical exam blog, UKMLA preparation, USMLE study guide, medical finals tips, medical student resources',
  openGraph: {
    title: 'Medical Exam Prep Blog | MedBanqs',
    description: 'Expert guides and study tips for medical students preparing for exams.',
    url: 'https://medbanqs.com/blog',
    siteName: 'MedBanqs',
    type: 'website',
  },
};

export default async function BlogPage() {
  const blogs = getAllBlogs();
  
  const categories = Array.from(new Set(blogs.map(blog => blog.category)));
  
  const blogsByCategory = categories.reduce((acc, category) => {
    acc[category] = blogs.filter(blog => blog.category === category);
    return acc;
  }, {} as Record<string, BlogPost[]>);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    breadcrumbPaths.home,
    breadcrumbPaths.blog
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
        <PillNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Medical Exam Prep Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guides, study strategies, and tips to help you excel in UKMLA, USMLE, and medical finals
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {Object.entries(blogsByCategory).map(([category, categoryBlogs], categoryIndex) => (
              <section key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryBlogs.map((blog, index) => (
                    <BlogCard 
                      key={blog.id} 
                      post={blog} 
                      index={categoryIndex * 10 + index} 
                    />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
    </>
  );
}