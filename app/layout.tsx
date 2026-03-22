import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { 
  organizationSchema, 
  courseSchema, 
  websiteSchema, 
  faqSchema, 
  howToSchema, 
  medicalWebPageSchema,
  softwareApplicationSchema,
  webPageSchema
} from '@/utils/seo-structured-data'
import { homepageStructuredData, siteNavigationSchema } from '@/utils/sitelinks-structured-data'
import { Providers } from './providers'
import Footer from '@/components/Footer'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.medbanqs.com'),
  title: {
    default: 'UKMLA AKT Question Bank 2025 | MedBanqs - 5,000+ SBA Questions for Medical School Finals',
    template: '%s | MedBanqs - UKMLA AKT Preparation'
  },
  description: 'Pass UKMLA AKT 2025 with confidence. 5,000+ single best answer (SBA) questions for medical school finals & MLA AKT exam. Expert explanations, mock exams, 94% pass rate. Perfect for UK medical students & IMGs.',
  applicationName: 'MedBanqs',
  keywords: 'UKMLA AKT, MLA AKT, UKMLA AKT question bank, medical school finals UK, SBA questions medicine, single best answer questions, UKMLA 2025, MLA 2025, medical licensing assessment, UK medical exam, PLAB to UKMLA, IMG UKMLA, international medical graduates UK, medical school finals revision, UKMLA AKT preparation, MLA AKT exam, GMC medical exam, UKMLA practice questions, medical student UK, clinical medicine questions, UKMLA mock exam, AKT exam prep, CPSA preparation, UK medical students, medical finals questions, UKMLA study guide 2025, passmed alternative, geeky medics alternative',
  authors: [{ name: 'MedBanqs Team' }],
  openGraph: {
    type: 'website',
    url: 'https://www.medbanqs.com',
    title: 'UKMLA AKT Question Bank 2025 | Medical School Finals & MLA AKT Prep',
    description: 'Master UKMLA AKT with 5,000+ SBA questions. Expert explanations, mock exams, personalized study plans. Perfect for UK medical students & IMGs preparing for MLA AKT 2025. 94% pass rate.',
    siteName: 'MedBanqs - UKMLA AKT Preparation Platform',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MedBanqs - #1 UKMLA Preparation Platform for Medical Students',
        type: 'image/png',
      }
    ],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@medbanqs',
    creator: '@medbanqs',
    title: 'UKMLA AKT Question Bank 2025 | 5,000+ SBA Questions',
    description: 'Pass UKMLA AKT & medical school finals with 5,000+ SBA questions. Expert explanations, mock exams. For UK medical students & IMGs. 94% pass rate!',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.medbanqs.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification',
    bing: 'your-bing-verification',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/mastermla-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/mastermla-logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/mastermla-logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Google Site Name */}
        <meta property="og:site_name" content="MedBanqs" />
        <meta name="application-name" content="MedBanqs" />
        
        {/* Favicon links for better compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/mastermla-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/mastermla-logo.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Enhanced SEO meta tags for search engines */}
        <meta name="education-level" content="medical-school,postgraduate,medical-students" />
        <meta name="exam-type" content="UKMLA,UK-Medical-Licensing-Assessment,MLA,medical-licensing,GMC" />
        <meta name="subject" content="clinical-medicine,medical-assessment,medical-education,UKMLA-preparation" />
        <meta name="content-type" content="educational,medical,exam-preparation" />
        <meta name="target-audience" content="medical-students,UK-medical-graduates,international-medical-graduates" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta name="language" content="en-GB" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        
        {/* SEO specific meta tags */}
        <meta name="content-freshness" content="regularly-updated" />
        <meta name="expertise-level" content="medical-professional" />
        
        {/* Medical specific meta tags */}
        <meta name="medical-specialty" content="general-medicine,clinical-medicine" />
        <meta name="medical-topics" content="cardiology,respiratory,pharmacology,anatomy,pathology,neurology" />
        <meta name="certification" content="UKMLA,GMC-aligned" />
        <meta name="evidence-based" content="NICE-guidelines,BNF,clinical-evidence" />
        
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Enhanced Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              softwareApplicationSchema,
              webPageSchema
            ])
          }}
        />
        
        {/* Course and Educational structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([courseSchema, medicalWebPageSchema])
          }}
        />
        
        {/* FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
        
        {/* HowTo structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema)
          }}
        />
        
        {/* Sitelinks structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homepageStructuredData)
          }}
        />
        
        {/* Site Navigation structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema)
          }}
        />
      </head>
      <body className="bg-white text-black antialiased">
        <Providers>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}