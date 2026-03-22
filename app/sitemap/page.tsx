import { Metadata } from 'next';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, BookOpen, CreditCard, Shield, Users, FileText, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sitemap - MedBanqs',
  description: 'Sitemap for MedBanqs - Navigate through all pages and resources on our medical education platform.',
};

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: <BookOpen className="w-5 h-5" />,
      links: [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'Student Portal',
      icon: <Users className="w-5 h-5" />,
      links: [
        { name: 'Sign In / Sign Up', href: '/auth' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Practice Questions', href: '/questions' },
        { name: 'Review Mistakes', href: '/review-mistakes' },
        { name: 'UKMLA Questions', href: '/ukmla-questions' },
        { name: 'Medical School Exam Prep', href: '/medical-school-exam' },
      ]
    },
    {
      title: 'Account Management',
      icon: <CreditCard className="w-5 h-5" />,
      links: [
        { name: 'Account Settings', href: '/account-settings' },
        { name: 'Subscription & Billing', href: '/subscription' },
        { name: 'Pricing Plans', href: '/pricing' },
      ]
    },
    {
      title: 'Legal & Policies',
      icon: <Shield className="w-5 h-5" />,
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
      ]
    },
    {
      title: 'Resources',
      icon: <FileText className="w-5 h-5" />,
      links: [
        { name: 'UKMLA Guide', href: '/ukmla-questions' },
        { name: 'Study Tips Blog', href: '/blog' },
        { name: 'Medical School Resources', href: '/medical-school-exam' },
      ]
    },
    {
      title: 'Support',
      icon: <HelpCircle className="w-5 h-5" />,
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Help Center', href: '/help' },
      ]
    }
  ];

  return (
    <>
      <PillNavigation />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
            <p className="text-lg text-gray-600">
              Find your way around MedBanqs's comprehensive medical education platform
            </p>
          </div>

          {/* Sitemap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="flex items-center text-gray-700 hover:text-black transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="hover:underline">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">New Students</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Start your UKMLA preparation journey with our comprehensive platform.
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center text-black font-medium hover:underline"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Existing Users</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Continue your study sessions and track your progress.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center text-black font-medium hover:underline"
                >
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is here to assist you with any questions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-black font-medium hover:underline"
                >
                  Contact Support
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* SEO Links Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'UKMLA Practice Questions',
                'Medical School Exam Prep',
                'Clinical Medicine Questions',
                'Anatomy Practice',
                'Pharmacology Questions',
                'Emergency Medicine',
                'Obstetrics & Gynaecology',
                'Paediatrics Questions',
                'Surgery Practice',
                'Pricing Plans',
                'Student Discount',
                'Performance Analytics',
                'Study Assistant',
                'Mock Exams',
                'Study Plans'
              ].map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* XML Sitemap Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Looking for our XML sitemap?{' '}
              <Link href="/sitemap.xml" className="text-black underline hover:text-gray-700">
                View XML Sitemap
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}