// Helper function to generate breadcrumb structured data for any page
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

// Pre-defined breadcrumb paths for common pages
export const breadcrumbPaths = {
  home: { name: 'Home', url: 'https://www.medbanqs.com' },
  blog: { name: 'Blog', url: 'https://www.medbanqs.com/blog' },
  features: { name: 'Features', url: 'https://www.medbanqs.com/features' },
  pricing: { name: 'Pricing', url: 'https://www.medbanqs.com/pricing' },
  about: { name: 'About', url: 'https://www.medbanqs.com/about' },
  faq: { name: 'FAQ', url: 'https://www.medbanqs.com/faq' },
  studyGuides: { name: 'Study Guides', url: 'https://www.medbanqs.com/study-guides' },
  practiceQuestions: { name: 'Practice Questions', url: 'https://www.medbanqs.com/practice-questions' },
  examTips: { name: 'Exam Tips', url: 'https://www.medbanqs.com/exam-tips' },
  supportCenter: { name: 'Support Center', url: 'https://www.medbanqs.com/support-center' },
  terms: { name: 'Terms', url: 'https://www.medbanqs.com/terms' },
  privacy: { name: 'Privacy', url: 'https://www.medbanqs.com/privacy' },
  cookies: { name: 'Cookies', url: 'https://www.medbanqs.com/cookies' },
  subscription: { name: 'Subscription', url: 'https://www.medbanqs.com/subscription' },
  dashboard: { name: 'Dashboard', url: 'https://www.medbanqs.com/dashboard' },
};