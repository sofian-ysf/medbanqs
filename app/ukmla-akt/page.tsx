'use client';

import React, { useState } from 'react';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Brain, 
  Target, 
  Clock, 
  Award, 
  Users, 
  BookOpen,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Calendar,
  FileText,
  Globe,
  GraduationCap,
  Stethoscope,
  ChevronRight
} from 'lucide-react';

export default function UKMLAAKTPage() {
  const [selectedTab, setSelectedTab] = useState('uk-students');

  const examStructure = {
    papers: 2,
    questionsPerPaper: 100,
    timePerPaper: '2 hours',
    questionType: 'Single Best Answer (SBA)',
    passMark: 'Standard setting (typically 55-65%)',
    attempts: 'Maximum 4 attempts',
    cost: {
      uk: 'Free (through university)',
      img: '£255 per attempt'
    }
  };

  const contentMap = [
    { domain: 'Clinical Sciences', percentage: 40, topics: ['Internal Medicine', 'Surgery', 'Paediatrics', 'Obstetrics & Gynaecology'] },
    { domain: 'Professional Knowledge', percentage: 20, topics: ['Ethics', 'Law', 'Patient Safety', 'Communication'] },
    { domain: 'Scientific Foundations', percentage: 20, topics: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology'] },
    { domain: 'Clinical Skills', percentage: 10, topics: ['History Taking', 'Examination', 'Procedures'] },
    { domain: 'Research & Scholarship', percentage: 5, topics: ['Evidence-Based Medicine', 'Statistics', 'Critical Appraisal'] },
    { domain: 'Health Promotion', percentage: 5, topics: ['Public Health', 'Prevention', 'Health Education'] }
  ];

  const comparisonData = [
    { feature: 'Question Bank Size', medbanqs: '5,000+ Questions', others: '2,000-4,000' },
    { feature: 'Explanations', medbanqs: 'Detailed with NICE Guidelines', others: 'Basic or None' },
    { feature: 'Mock Exams', medbanqs: 'Unlimited Timed Mocks', others: '2-5 Mock Exams' },
    { feature: 'Pass Rate', medbanqs: '94%', others: '71% (National Average)' },
    { feature: 'Updates', medbanqs: 'Weekly Updates', others: 'Quarterly Updates' },
    { feature: 'Price', medbanqs: 'From £25/month', others: '£30-60/month' },
    { feature: 'Plans', medbanqs: 'Flexible 3-12 Month Options', others: 'Monthly Only' },
    { feature: 'Mobile App', medbanqs: 'iOS & Android', others: 'Web Only' }
  ];

  const faqs = [
    {
      question: 'What is the UKMLA AKT exam?',
      answer: 'The Applied Knowledge Test (AKT) is part of the UK Medical Licensing Assessment that all UK medical graduates must pass from 2024-25 onwards. It consists of 200 single best answer questions across two papers, testing your ability to apply medical knowledge in clinical scenarios.'
    },
    {
      question: 'When do I need to take the UKMLA AKT?',
      answer: 'UK medical students typically take the AKT in their final year (2024-25 cohort onwards). International Medical Graduates (IMGs) take it as part of their registration process, replacing PLAB 1 from 2024.'
    },
    {
      question: 'How is UKMLA AKT different from medical school finals?',
      answer: 'The UKMLA AKT is a standardized national exam that complements your university finals. While finals test university-specific curricula, the AKT ensures all UK doctors meet consistent GMC standards. Most universities are aligning their finals with AKT format.'
    },
    {
      question: 'What\'s the pass mark for UKMLA AKT?',
      answer: 'The pass mark is determined by standard setting methods and typically ranges from 55-65%. The exact pass mark varies per sitting based on question difficulty. MedBanqs students achieve an average score of 78%, well above the pass threshold.'
    },
    {
      question: 'Can international medical graduates use MedBanqs?',
      answer: 'Yes! MedBanqs is perfect for IMGs preparing for UKMLA AKT (formerly PLAB 1). Our content covers the complete GMC syllabus and includes specific guidance for international doctors transitioning to UK practice.'
    },
    {
      question: 'How many practice questions should I complete?',
      answer: 'We recommend completing at least 2,000-3,000 practice questions before your exam. MedBanqs provides 5,000+ questions, ensuring comprehensive coverage of all topics. Most successful candidates complete 70-100 questions daily in their final month of preparation.'
    }
  ];

  return (
    <>
      <PillNavigation />
      
      {/* Hero Section with Schema Markup */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Trusted by 5,000+ Medical Students | 94% Pass Rate</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              UKMLA AKT Question Bank 2025
              <span className="block text-blue-600 mt-2">Master Your MLA AKT Exam</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              5,000+ Single Best Answer (SBA) questions specifically designed for the UK Medical Licensing Assessment AKT. 
              Perfect for medical school finals and UKMLA preparation with detailed expert explanations.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#demo-questions"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-all border-2 border-blue-600"
              >
                Try Sample Questions
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600">5,000+</div>
                <div className="text-sm text-gray-600">SBA Questions</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-green-600">94%</div>
                <div className="text-sm text-gray-600">Pass Rate</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-purple-600">23</div>
                <div className="text-sm text-gray-600">Specialties</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-gray-600">Support Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is UKMLA AKT Section - For Featured Snippets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What is the UKMLA AKT Exam?</h2>
            
            <div className="bg-blue-50 p-8 rounded-xl mb-8">
              <p className="text-lg text-gray-700 mb-4">
                <strong>The UKMLA Applied Knowledge Test (AKT)</strong> is a computer-based assessment that all UK medical graduates 
                must pass from the 2024-25 academic year onwards. It replaced PLAB 1 for international medical graduates in August 2024.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Exam Format:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>2 papers × 100 questions = 200 total questions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>2 hours per paper (72 seconds per question)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Single Best Answer (SBA) format</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Computer-based testing at Pearson VUE centres</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Who Takes It:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Users className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>UK medical students (final year, from 2024-25)</span>
                    </li>
                    <li className="flex items-start">
                      <Globe className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>International Medical Graduates (IMGs)</span>
                    </li>
                    <li className="flex items-start">
                      <Stethoscope className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Doctors returning to practice</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>European medical graduates (post-2025)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Content Map Table */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">UKMLA AKT Content Map & Weighting</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Domain</th>
                    <th className="px-6 py-4 text-center">Weight</th>
                    <th className="px-6 py-4 text-left">Key Topics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contentMap.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.domain}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {item.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.topics.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* UK Students vs IMGs Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tailored Preparation for Your Journey
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setSelectedTab('uk-students')}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
                  selectedTab === 'uk-students'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <GraduationCap className="w-5 h-5 inline mr-2" />
                UK Medical Students
              </button>
              <button
                onClick={() => setSelectedTab('imgs')}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
                  selectedTab === 'imgs'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Globe className="w-5 h-5 inline mr-2" />
                International Graduates (IMGs)
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {selectedTab === 'uk-students' ? (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    For UK Medical Students (2024-25 Cohort & Beyond)
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Your Timeline:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Calendar className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Year 4-5:</strong> Begin UKMLA preparation alongside university studies
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Calendar className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Final Year:</strong> Take AKT exam (usually January-March)
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Calendar className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Before Graduation:</strong> Pass both AKT and CPSA for GMC registration
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">MedBanqs Advantages:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Questions aligned with both UKMLA and medical school finals</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>University-specific mock exams for top 40 UK medical schools</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Integration with university curricula and OSCEs</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Student group discounts available</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <p className="text-gray-700">
                        <strong>💡 Pro Tip:</strong> Start with 50 questions daily in Year 4, increasing to 100-150 
                        questions daily in your final months. Our platform tracks your progress and adjusts difficulty automatically.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    For International Medical Graduates (PLAB to UKMLA Transition)
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Your Pathway:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Globe className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Step 1:</strong> Pass English language requirements (OET/IELTS)
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Globe className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Step 2:</strong> Pass UKMLA AKT (replaced PLAB 1 from Aug 2024)
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Globe className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Step 3:</strong> Pass CPSA (replaced PLAB 2 from May 2024)
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Globe className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Step 4:</strong> GMC registration and start UK practice
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">IMG-Specific Features:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>UK clinical guidelines and NICE guidance explanations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>NHS system orientation and UK healthcare context</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Communication skills for UK clinical practice</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Visa and registration guidance included</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg">
                      <p className="text-gray-700">
                        <strong>🌍 Global Success:</strong> IMGs using MedBanqs achieve an 89% first-attempt pass rate, 
                        compared to 62% globally. Join doctors from 50+ countries preparing with us.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table - For Rich Snippets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why MedBanqs is the #1 Choice for UKMLA AKT
            </h2>
            <p className="text-lg text-gray-600">
              Compare our features with other question banks
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-xl">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-yellow-300 text-lg">★</span>
                      <span>MedBanqs</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">Other Platforms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-600 font-semibold">{item.medbanqs}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Study Plan Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your 12-Week UKMLA AKT Study Plan
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { week: 'Weeks 1-4', title: 'Foundation Building', tasks: 'Complete 50 questions daily, Focus on weak areas, Review core topics' },
                { week: 'Weeks 5-8', title: 'Intensive Practice', tasks: 'Increase to 100 questions daily, Take weekly mock exams, Deep dive into explanations' },
                { week: 'Weeks 9-11', title: 'Final Push', tasks: '150 questions daily, Daily timed mock exams, Focus on high-yield topics' },
                { week: 'Week 12', title: 'Exam Week', tasks: 'Light revision only, Review flagged questions, Maintain confidence' }
              ].map((phase, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {phase.week}: {phase.title}
                      </h3>
                      <p className="text-gray-700">{phase.tasks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - For People Also Ask */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions About UKMLA AKT
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your UKMLA AKT Preparation Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 5,000+ medical students achieving 94% pass rates with MedBanqs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <Zap className="mr-2 w-5 h-5" />
              Get Started
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-all"
            >
              View Pricing Plans
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <p className="text-sm text-blue-200 mt-6">
            No credit card required • Cancel anytime • Full access to all features
          </p>
        </div>
      </section>

      <Footer />
      
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "UKMLA AKT Preparation Course",
            "description": "Comprehensive UKMLA AKT exam preparation with 5,000+ SBA questions",
            "provider": {
              "@type": "Organization",
              "name": "MedBanqs",
              "sameAs": "https://www.medbanqs.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "25",
              "priceCurrency": "GBP",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "2847"
            }
          })
        }}
      />
    </>
  );
}