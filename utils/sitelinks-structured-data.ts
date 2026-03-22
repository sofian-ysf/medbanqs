// Google Sitelinks Structured Data for MedBanqs
// This helps Google display your site with sitelinks like Apple's

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MedBanqs",
  "alternateName": "Medical MLA",
  "url": "https://www.medbanqs.com",
  "logo": "https://www.medbanqs.com/mastermla-logo.png",
  "sameAs": [
    "https://www.facebook.com/medbanqs",
    "https://www.twitter.com/medbanqs",
    "https://www.linkedin.com/company/medbanqs",
    "https://www.instagram.com/medbanqs",
    "https://www.youtube.com/@medbanqs"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-20-1234-5678",
    "contactType": "customer service",
    "email": "support@medbanqs.com",
    "areaServed": "GB",
    "availableLanguage": ["English"]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MedBanqs",
  "alternateName": "MedBanqs - UKMLA Medical Exam Preparation",
  "url": "https://www.medbanqs.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.medbanqs.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Sitelinks Search Box and Navigation
export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "@id": "https://www.medbanqs.com/#navigation",
  "name": "Main Navigation",
  "url": "https://www.medbanqs.com",
  "hasPart": [
    {
      "@type": "WebPage",
      "name": "UKMLA Question Bank",
      "url": "https://www.medbanqs.com/features",
      "description": "Access 5,000+ UKMLA practice questions with expert explanations"
    },
    {
      "@type": "WebPage",
      "name": "Pricing Plans",
      "url": "https://www.medbanqs.com/pricing",
      "description": "Affordable medical exam preparation starting at £35/month"
    },
    {
      "@type": "WebPage",
      "name": "Medical Blog",
      "url": "https://www.medbanqs.com/blog",
      "description": "Expert guides and study tips for UKMLA, USMLE, and medical finals"
    },
    {
      "@type": "WebPage", 
      "name": "About MedBanqs",
      "url": "https://www.medbanqs.com/about",
      "description": "Learn about the UK's leading medical exam preparation platform"
    },
    {
      "@type": "WebPage",
      "name": "Get Started",
      "url": "https://www.medbanqs.com/pricing",
      "description": "Choose a plan and start your medical exam preparation"
    },
    {
      "@type": "WebPage",
      "name": "Dashboard",
      "url": "https://www.medbanqs.com/dashboard",
      "description": "Access your personalized study dashboard and track progress"
    }
  ]
};

// BreadcrumbList for better navigation understanding
export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Combined schema for homepage
export const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    siteNavigationSchema,
    {
      "@type": "WebPage",
      "@id": "https://www.medbanqs.com/#webpage",
      "url": "https://www.medbanqs.com",
      "name": "MedBanqs - UKMLA Question Bank & Medical Exam Preparation",
      "isPartOf": {
        "@id": "https://www.medbanqs.com/#website"
      },
      "about": {
        "@id": "https://www.medbanqs.com/#organization"
      },
      "primaryImageOfPage": {
        "@id": "https://www.medbanqs.com/#primaryimage"
      },
      "datePublished": "2024-01-01T00:00:00+00:00",
      "dateModified": new Date().toISOString(),
      "description": "Master UKMLA with 5,000+ practice questions, expert explanations, and personalized study plans. Join 5,000+ medical students achieving 94% pass rates.",
      "breadcrumb": {
        "@id": "https://www.medbanqs.com/#breadcrumb"
      },
      "inLanguage": "en-GB",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": ["https://www.medbanqs.com"]
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.medbanqs.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.medbanqs.com"
        }
      ]
    }
  ]
};