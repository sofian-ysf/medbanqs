import { MetadataRoute } from 'next'
import { BlogStorage } from '@/lib/blog/storage'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.medbanqs.com'
  const currentDate = new Date()

  // Get all blog posts
  const storage = new BlogStorage()
  const blogs = await storage.getAllBlogs()

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ukmla-questions`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/medical-school-exam`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/questions`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/review-mistakes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
  ]

  // Medical topic pages for better SEO
  const medicalTopics = [
    'cardiology',
    'respiratory',
    'pharmacology',
    'anatomy',
    'pathology',
    'neurology',
    'gastroenterology',
    'psychiatry',
    'paediatrics',
    'obstetrics-gynaecology',
    'surgery',
    'emergency-medicine',
    'infectious-diseases',
    'endocrinology',
    'haematology',
    'rheumatology',
  ]

  const topicPages = medicalTopics.map(topic => ({
    url: `${baseUrl}/questions?topic=${topic}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog pages
  const blogPages = blogs.map(blog => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...mainPages, ...topicPages, ...blogPages]
}