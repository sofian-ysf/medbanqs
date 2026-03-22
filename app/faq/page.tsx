'use client';

import { useState } from 'react';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Search, HelpCircle, BookOpen, CreditCard, Shield, Users, Settings, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'getting-started', name: 'Getting Started', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'subscription', name: 'Subscription & Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'technical', name: 'Technical Support', icon: <Settings className="w-5 h-5" /> },
    { id: 'content', name: 'Content & Questions', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'account', name: 'Account Management', icon: <Users className="w-5 h-5" /> },
    { id: 'security', name: 'Security & Privacy', icon: <Shield className="w-5 h-5" /> }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'What is MedBanqs and how can it help me?',
      answer: 'MedBanqs is a comprehensive medical education platform specifically designed to help medical students prepare for the UK Medical Licensing Assessment (UKMLA). With over 5,000 practice questions, personalized study plans, and detailed performance analytics, we help you identify weak areas and improve your exam performance.'
    },
    {
      category: 'getting-started',
      question: 'How do I get started with MedBanqs?',
      answer: 'Getting started is simple: 1) Choose a subscription plan (3, 6, or 12 months), 2) Create your account, 3) Complete payment via Stripe, 4) Start practicing immediately with full access to all 5,000+ questions. You\'ll receive instant access after payment.'
    },
    {
      category: 'subscription',
      question: 'What subscription plans are available?',
      answer: 'We offer three flexible plans: 3 months (£35), 6 months (£45), and 12 months (£65). All plans include full access to 5,000+ UKMLA practice questions, all 23 medical categories, performance analytics, mistake review system, and mock exams.'
    },
    {
      category: 'subscription',
      question: 'How much does MedBanqs cost?',
      answer: 'MedBanqs offers affordable plans starting at £35 for 3 months. Our 6-month plan costs £45, and the 12-month plan is £65 - our best value. All plans include unlimited access to questions, continuous updates, and new features as they\'re released.'
    },
    {
      category: 'subscription',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time with no cancellation fees. If you cancel, you\'ll continue to have access until the end of your current billing period. You can also pause your subscription if you need a break and resume later.'
    },
    {
      category: 'content',
      question: 'How many practice questions are available?',
      answer: 'MedBanqs offers over 5,000 high-quality UKMLA practice questions across 23 medical categories. Our question bank is continuously updated and expanded based on the latest exam patterns and medical guidelines. Each question includes detailed explanations and references.'
    },
    {
      category: 'content',
      question: 'Are the questions similar to the actual UKMLA exam?',
      answer: 'Yes, our questions are carefully crafted to match the format, difficulty, and content of the actual UKMLA exam. They\'re written by medical educators and practicing doctors who understand the exam requirements. We regularly analyze exam reports to ensure our questions remain relevant and accurate.'
    },
    {
      category: 'content',
      question: 'How often is new content added?',
      answer: 'We add new questions and update existing content monthly. Our medical team reviews all questions regularly to ensure they reflect current medical guidelines and best practices. Premium members get access to new content as soon as it\'s released.'
    },
    {
      category: 'technical',
      question: 'What devices can I use MedBanqs on?',
      answer: 'MedBanqs works on any device with a modern web browser - desktop computers, laptops, tablets, and smartphones. Our platform is fully responsive and syncs your progress across all devices, so you can study anywhere, anytime.'
    },
    {
      category: 'technical',
      question: 'Can I use MedBanqs offline?',
      answer: 'Currently, MedBanqs requires an internet connection to access questions and sync your progress. However, we\'re developing an offline mode that will allow you to download question sets for practice without internet. This feature will be available soon.'
    },
    {
      category: 'technical',
      question: 'I\'m having technical issues. How do I get help?',
      answer: 'If you\'re experiencing technical issues: 1) Try clearing your browser cache and cookies, 2) Ensure you\'re using a supported browser (Chrome, Firefox, Safari, Edge), 3) Check your internet connection. If problems persist, contact our support team at support@medbanqs.com with details of the issue.'
    },
    {
      category: 'account',
      question: 'Can I share my account with others?',
      answer: 'Each MedBanqs account is for individual use only. Sharing accounts violates our terms of service and can result in account suspension. We offer group subscriptions for medical schools and study groups at discounted rates - contact us for more information.'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password: 1) Go to the login page, 2) Click "Forgot Password", 3) Enter your email address, 4) Check your email for a reset link, 5) Follow the link to create a new password. If you don\'t receive the email, check your spam folder or contact support.'
    },
    {
      category: 'account',
      question: 'Can I change my email address?',
      answer: 'Yes, you can change your email address in your account settings. Go to Account Settings > Personal Information > Email Address. You\'ll need to verify your new email address before the change takes effect. Your progress and subscription will transfer automatically.'
    },
    {
      category: 'security',
      question: 'Is my personal data safe with MedBanqs?',
      answer: 'Yes, we take data security seriously. We use industry-standard encryption for all data transmission and storage. Your payment information is processed securely through Stripe and never stored on our servers. We comply with GDPR and UK data protection regulations.'
    },
    {
      category: 'security',
      question: 'How is my progress data used?',
      answer: 'Your progress data is used to: 1) Personalize your study recommendations, 2) Track your performance over time, 3) Identify areas for improvement, 4) Generate anonymous aggregated insights to improve our platform. We never share your individual data with third parties without your consent.'
    },
    {
      category: 'getting-started',
      question: 'Do you offer student discounts?',
      answer: 'Yes! We offer a 20% student discount for verified medical students. Simply sign up with your university email address (.ac.uk) and the discount will be automatically applied. Group discounts are also available for study groups of 5 or more students.'
    },
    {
      category: 'content',
      question: 'Can I create custom question sets?',
      answer: 'Yes, you can create custom question sets by selecting specific categories, difficulty levels, and number of questions. You can also save your favorite questions and create focused practice sessions on topics you want to review. This helps you target your weak areas effectively.'
    },
    {
      category: 'subscription',
      question: 'Is there a refund policy?',
      answer: 'We offer a 14-day money-back guarantee for new subscribers. If you\'re not satisfied with MedBanqs within the first 14 days of your paid subscription, contact us for a full refund. No questions asked. This doesn\'t apply to renewal payments.'
    },
    {
      category: 'getting-started',
      question: 'How accurate is the study recommendation system?',
      answer: 'Our intelligent recommendation system analyzes thousands of student performance patterns to provide personalized guidance. It identifies areas where you need more practice with approximately 85% accuracy, continuously adapting to your progress to improve its recommendations.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PillNavigation />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about MedBanqs
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No questions found matching your search.</p>
                <p className="text-sm text-gray-500 mt-2">Try different keywords or browse categories above.</p>
              </div>
            )}
          </div>

          {/* Still Need Help */}
          <section className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 text-white text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Our support team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/support-center" 
                className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Visit Support Center
              </Link>
              <a 
                href="mailto:support@medbanqs.com" 
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Email Support
              </a>
            </div>
          </section>

          {/* Quick Links */}
          <section className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/study-guides" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <BookOpen className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Study Guides</span>
              </Link>
              <Link href="/pricing" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Pricing Plans</span>
              </Link>
              <Link href="/exam-tips" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Exam Tips</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}