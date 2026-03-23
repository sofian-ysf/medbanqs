export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "MedBanqs",
  "alternateName": ["Med MLA", "Medical MLA", "MedBanqs UK"],
  "url": "https://www.medbanqs.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.medbanqs.com/medbanqs-logo.png",
    "width": 600,
    "height": 60
  },
  "description": "Leading UKMLA preparation platform with 5,000+ medical questions and comprehensive study tools. Helping medical students pass their UK Medical Licensing Assessment with confidence.",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
    "addressLocality": "London"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@medbanqs.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://twitter.com/medbanqs",
    "https://www.facebook.com/medbanqs",
    "https://www.linkedin.com/company/medbanqs",
    "https://www.instagram.com/medbanqs",
    "https://www.youtube.com/@medbanqs"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Medical Education Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "UKMLA Complete Preparation",
          "description": "Comprehensive UKMLA exam preparation course"
        }
      }
    ]
  }
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://www.medbanqs.com#ukmla-course",
  "name": "UKMLA Complete Preparation Course",
  "alternateName": "UK Medical Licensing Assessment Preparation",
  "description": "Comprehensive UKMLA exam preparation with 5,000+ questions, detailed explanations, personalized study plans, and mock exams. Achieve a 94% pass rate with our proven methodology.",
  "provider": {
    "@type": "Organization",
    "name": "MedBanqs",
    "sameAs": "https://www.medbanqs.com"
  },
  "educationalLevel": "Medical School Final Year",
  "educationalCredentialAwarded": "UKMLA Preparation Certificate",
  "teaches": [
    "Clinical Medicine",
    "Medical Assessment",
    "Clinical Reasoning",
    "Pharmacology",
    "Anatomy",
    "Pathology"
  ],
  "assesses": "UK Medical Licensing Assessment readiness",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "Medical Student",
    "audienceType": ["UK Medical Students", "International Medical Graduates"]
  },
  "inLanguage": "en-GB",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "duration": "P3M",
    "courseWorkload": "PT20H"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "5243",
    "reviewCount": "2847",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MedBanqs",
  "alternateName": ["MedBanqs UK", "MedBanqs - UKMLA Preparation Platform"],
  "url": "https://www.medbanqs.com",
  "publisher": {
    "@type": "Organization",
    "name": "MedBanqs",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.medbanqs.com/medbanqs-logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.medbanqs.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "MedBanqs UKMLA Question Bank",
  "description": "5,000+ UKMLA practice questions with detailed explanations, performance analytics, and personalized study plans",
  "brand": {
    "@type": "Brand",
    "name": "MedBanqs"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "GBP",
    "lowPrice": "35",
    "highPrice": "65",
    "offerCount": "3",
    "offers": [
      {
        "@type": "Offer",
        "name": "3 Month Access",
        "price": "35",
        "priceCurrency": "GBP"
      },
      {
        "@type": "Offer",
        "name": "6 Month Access",
        "price": "45",
        "priceCurrency": "GBP"
      },
      {
        "@type": "Offer",
        "name": "12 Month Access",
        "price": "65",
        "priceCurrency": "GBP"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2847"
  }
};

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

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is UKMLA AKT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The UKMLA Applied Knowledge Test (AKT) is a computer-based exam with 200 single best answer (SBA) questions across 2 papers. All UK medical students (from 2024-25) and international medical graduates must pass it for GMC registration. It tests clinical knowledge, professional skills, and scientific foundations."
      }
    },
    {
      "@type": "Question", 
      "name": "What is the difference between PLAB and UKMLA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From August 2024, PLAB 1 became UKMLA AKT and PLAB 2 became CPSA. The content and difficulty remain similar, but UKMLA creates a unified standard for both UK graduates and IMGs. The main change is alignment with the MLA content map used by UK medical schools."
      }
    },
    {
      "@type": "Question",
      "name": "How many UKMLA questions are in MedBanqs's question bank?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MedBanqs offers over 5,000 UKMLA-style practice questions covering all major medical topics, with detailed explanations and links to NICE guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "What is the pass rate for students using MedBanqs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students using MedBanqs achieve an average pass rate of 94% on their UKMLA exam, significantly higher than the national average of 71%."
      }
    },
    {
      "@type": "Question",
      "name": "How does MedBanqs help with UKMLA preparation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MedBanqs analyzes your performance, identifies weak areas, creates personalized study plans, provides instant explanations for questions, and predicts your exam score with high accuracy. The platform adapts to your learning style and pace."
      }
    },
    {
      "@type": "Question",
      "name": "When should I start preparing for UKMLA AKT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UK medical students should start UKMLA AKT preparation in their penultimate year, intensifying in final year. IMGs should allow 3-6 months after passing English requirements. Most successful candidates complete 2,000-3,000 practice questions before the exam."
      }
    },
    {
      "@type": "Question",
      "name": "What is the UKMLA AKT pass mark?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The UKMLA AKT pass mark is set using standard setting methods and typically ranges from 55-65%, varying by exam difficulty. The exact pass mark is determined after each sitting. MedBanqs students average 78%, well above the pass threshold."
      }
    },
    {
      "@type": "Question",
      "name": "Is MedBanqs suitable for international medical graduates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MedBanqs is perfect for both UK medical students and international medical graduates preparing for UKMLA. Our content aligns with GMC standards and NICE guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "Can I access MedBanqs on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MedBanqs is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile. Study anywhere, anytime with our mobile-optimized platform."
      }
    },
    {
      "@type": "Question",
      "name": "What topics does MedBanqs cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MedBanqs covers all UKMLA topics including: Cardiology, Respiratory Medicine, Gastroenterology, Neurology, Psychiatry, Paediatrics, Obstetrics & Gynaecology, Surgery, Pharmacology, Anatomy, Pathology, and more."
      }
    }
  ]
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Pass UKMLA with MedBanqs",
  "description": "A complete guide to passing your UKMLA exam using MedBanqs's comprehensive study platform.",
  "image": "https://www.medbanqs.com/ukmla-guide.jpg",
  "totalTime": "P3M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "GBP",
    "value": "29.99"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "MedBanqs account"
    },
    {
      "@type": "HowToSupply",
      "name": "3-6 months study time"
    },
    {
      "@type": "HowToSupply",
      "name": "Internet connection"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "MedBanqs platform"
    },
    {
      "@type": "HowToTool",
      "name": "Study notes"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Create Your MedBanqs Account",
      "text": "Sign up for free at medbanqs.com and complete your medical student profile to get personalized recommendations.",
      "image": "https://www.medbanqs.com/step1.jpg",
      "url": "https://www.medbanqs.com/auth"
    },
    {
      "@type": "HowToStep",
      "name": "Take the Diagnostic Test",
      "text": "Complete our diagnostic assessment to identify your strengths and weaknesses across all UKMLA topics.",
      "image": "https://www.medbanqs.com/step2.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Follow Your Personalized Study Plan",
      "text": "The platform creates a customized study schedule based on your exam date and current knowledge level.",
      "image": "https://www.medbanqs.com/step3.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Practice with 5,000+ Questions",
      "text": "Work through UKMLA-style questions with detailed explanations and clinical reasoning.",
      "image": "https://www.medbanqs.com/step4.jpg",
      "url": "https://www.medbanqs.com/questions"
    },
    {
      "@type": "HowToStep",
      "name": "Review with Flashcards",
      "text": "Use spaced repetition flashcards to memorize key facts, drug doses, and clinical guidelines.",
      "image": "https://www.medbanqs.com/step5.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Take Mock Exams",
      "text": "Simulate real UKMLA conditions with timed mock exams and receive predicted scores.",
      "image": "https://www.medbanqs.com/step6.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Get Expert Support",
      "text": "Access detailed explanations for difficult concepts and receive comprehensive support throughout your study journey.",
      "image": "https://www.medbanqs.com/step7.jpg"
    }
  ]
};

export const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "UKMLA Exam Preparation Guide",
  "specialty": "Medical Education",
  "aspect": "Medical Licensing",
  "audience": {
    "@type": "MedicalAudience",
    "audienceType": "Medical Students"
  },
  "lastReviewed": new Date().toISOString().split('T')[0],
  "reviewedBy": {
    "@type": "Organization",
    "name": "MedBanqs Medical Education Team"
  }
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MedBanqs Platform",
  "applicationCategory": "EducationalApplication",
  "applicationSubCategory": "Medical Education",
  "operatingSystem": "Web-based",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "5243"
  },
  "featureList": [
    "5,000+ UKMLA practice questions",
    "Detailed explanations",
    "Personalized study plans",
    "Performance analytics",
    "Mock exams",
    "Spaced repetition flashcards",
    "Progress tracking",
    "Mobile responsive"
  ]
};

export const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "MedBanqs - UKMLA Preparation Platform",
  "isPartOf": {
    "@type": "WebSite",
    "name": "MedBanqs",
    "url": "https://www.medbanqs.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MedBanqs"
  }
};