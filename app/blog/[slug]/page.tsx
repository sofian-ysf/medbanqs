import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlogStorage } from '@/lib/blog/storage';
import { BlogPost } from '@/types/blog';
import PillNavigation from '@/components/landing/PillNavigation';
import { BlogPatterns, blogCardColors } from '@/components/blog/BlogPatterns';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const storage = new BlogStorage();
  return await storage.getBlog(slug);
}

async function getRelatedPosts(currentPost: BlogPost): Promise<BlogPost[]> {
  const storage = new BlogStorage();
  const allPosts = await storage.getAllBlogs();
  
  return allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, 3);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | MedBanqs',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.metaTitle || `${post.title} | MedBanqs`,
    description: post.metaDescription || post.description,
    keywords: post.keywords?.join(', ') || post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://medbanqs.com/blog/${post.slug}`,
      siteName: 'MedBanqs',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      images: post.ogImage ? [post.ogImage] : [],
    },
    other: {
      'article:published_time': post.publishedAt,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags.join(','),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);
  
  // Generate a consistent index for this post based on its ID
  const patternIndex = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % BlogPatterns.length;
  const Pattern = BlogPatterns[patternIndex];
  const backgroundColor = blogCardColors[patternIndex % blogCardColors.length];

  const articleJsonLd = post.schema || {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'MedBanqs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://medbanqs.com/medbanqs-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://medbanqs.com/blog/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.medbanqs.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://www.medbanqs.com/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': `https://www.medbanqs.com/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <article className="min-h-screen bg-white">
        <PillNavigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-gray-700">Blog</Link>
              <span>/</span>
              <span className="text-gray-900">{post.category}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Blog Pattern Graphic */}
          <div 
            className="relative h-64 mb-12 rounded-2xl overflow-hidden"
            style={{ backgroundColor }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                <Pattern />
              </div>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(post.content) }}
          />

          <div className="border-t pt-8">
            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ready to Excel in Your Medical Exams?
              </h3>
              <p className="text-gray-700 mb-4">
                Join thousands of medical students using MedBanqs to prepare for UKMLA, USMLE, and medical finals.
              </p>
              <Link
                href="/auth"
                className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Start Practicing Now
              </Link>
            </div>

            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Related Articles
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map(relatedPost => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="font-bold text-gray-900 mb-2 hover:text-gray-700">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <span className="text-xs text-gray-500 mt-2 inline-block">
                        {relatedPost.readingTime} min read
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
}

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;
  
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>');
  
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc mb-6">$&</ul>');
  
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, function(match) {
    if (match.includes('class="ml-6')) {
      return '<ol class="list-decimal mb-6">' + match + '</ol>';
    }
    return match;
  });
  
  html = html.replace(/\n\n/g, '</p><p class="mb-4">');
  html = '<p class="mb-4">' + html + '</p>';
  
  html = html.replace(/<p class="mb-4"><h/g, '<h');
  html = html.replace(/<\/h(\d)><\/p>/g, '</h$1>');
  html = html.replace(/<p class="mb-4"><ul/g, '<ul');
  html = html.replace(/<\/ul><\/p>/g, '</ul>');
  html = html.replace(/<p class="mb-4"><ol/g, '<ol');
  html = html.replace(/<\/ol><\/p>/g, '</ol>');
  
  return html;
}