import { Metadata } from 'next';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Target, Brain, CheckCircle, TrendingUp, FileText, Download } from 'lucide-react';
import { generateBreadcrumbJsonLd, breadcrumbPaths } from '@/utils/breadcrumb-helper';

export const metadata: Metadata = {
  title: 'Study Guides - MedBanqs',
  description: 'Comprehensive UKMLA study guides and resources to help you excel in your medical exams.',
};

export default function StudyGuidesPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    breadcrumbPaths.home,
    breadcrumbPaths.studyGuides
  ]);
  const studyGuides = [
    {
      title: 'UKMLA Clinical Medicine',
      category: 'Core Subject',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      topics: ['Cardiovascular System', 'Respiratory Medicine', 'Gastroenterology', 'Endocrinology'],
      downloadUrl: '#',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Anatomy & Physiology Fundamentals',
      category: 'Foundation',
      difficulty: 'Beginner',
      duration: '6 weeks',
      topics: ['Musculoskeletal System', 'Nervous System', 'Cardiovascular Anatomy', 'Respiratory Physiology'],
      downloadUrl: '#',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Pharmacology Mastery',
      category: 'Core Subject',
      difficulty: 'Advanced',
      duration: '10 weeks',
      topics: ['Drug Mechanisms', 'Clinical Pharmacokinetics', 'Adverse Effects', 'Drug Interactions'],
      downloadUrl: '#',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Emergency Medicine Essentials',
      category: 'Specialty',
      difficulty: 'Intermediate',
      duration: '4 weeks',
      topics: ['Acute Presentations', 'Resuscitation', 'Trauma Management', 'Critical Care Basics'],
      downloadUrl: '#',
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'Obstetrics & Gynaecology',
      category: 'Specialty',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      topics: ['Pregnancy Care', 'Labour Management', 'Gynaecological Conditions', 'Reproductive Health'],
      downloadUrl: '#',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      title: 'Paediatrics Complete Guide',
      category: 'Specialty',
      difficulty: 'Intermediate',
      duration: '7 weeks',
      topics: ['Child Development', 'Paediatric Emergencies', 'Common Childhood Illnesses', 'Neonatal Care'],
      downloadUrl: '#',
      color: 'bg-amber-50 border-amber-200'
    }
  ];

  const studyStrategies = [
    {
      title: 'Active Recall Technique',
      description: 'Test yourself frequently without looking at notes to strengthen memory retention.',
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: 'Spaced Repetition',
      description: 'Review material at increasing intervals to move knowledge into long-term memory.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: 'Practice Questions',
      description: 'Complete 50-100 questions daily to familiarize yourself with exam format.',
      icon: <Target className="w-5 h-5" />
    },
    {
      title: 'Concept Mapping',
      description: 'Create visual connections between related topics to understand relationships.',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const weeklySchedule = [
    { day: 'Monday', morning: 'Cardiology', afternoon: 'Practice Questions', evening: 'Review Mistakes' },
    { day: 'Tuesday', morning: 'Respiratory', afternoon: 'Anatomy Lab', evening: 'Flashcards' },
    { day: 'Wednesday', morning: 'Pharmacology', afternoon: 'Practice Questions', evening: 'Group Study' },
    { day: 'Thursday', morning: 'Neurology', afternoon: 'Clinical Skills', evening: 'Review Notes' },
    { day: 'Friday', morning: 'Mock Exam', afternoon: 'Review Session', evening: 'Rest' },
    { day: 'Saturday', morning: 'Weak Areas', afternoon: 'Practice Questions', evening: 'Concept Maps' },
    { day: 'Sunday', morning: 'Review Week', afternoon: 'Plan Ahead', evening: 'Rest' }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">UKMLA Study Guides</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive study resources designed by medical educators to help you master the UKMLA exam
            </p>
          </div>

          {/* Featured Study Guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Study Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGuides.map((guide, index) => (
                <div key={index} className={`rounded-xl border p-6 hover:shadow-lg transition-shadow ${guide.color}`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">
                      {guide.category}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {guide.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{guide.duration}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Topics Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Study Strategies */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Proven Study Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyStrategies.map((strategy, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-white rounded-lg mr-4">
                      {strategy.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{strategy.title}</h3>
                      <p className="text-gray-600 text-sm">{strategy.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sample Study Schedule */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sample Weekly Study Schedule</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Morning (9-12)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Afternoon (2-5)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evening (7-9)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {weeklySchedule.map((schedule, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.day}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.morning}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.afternoon}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.evening}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Customize this schedule based on your personal needs and university timetable
            </p>
          </section>

          {/* Study Tips */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-6">Top Study Tips from High Scorers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Start early and maintain consistency - 2-3 hours daily is better than cramming</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Focus on understanding concepts, not just memorizing facts</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Use multiple resources - textbooks, videos, and practice questions</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Join study groups to discuss difficult topics and stay motivated</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Take regular breaks - use the Pomodoro Technique (25 min study, 5 min break)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Review your mistakes thoroughly - they're your best learning opportunities</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gray-50 rounded-xl p-8">
              <BookOpen className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Your UKMLA Journey?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Access all study guides, 5,000+ practice questions, and personalized study plans with MedBanqs Pro
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/pricing" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Get Started
                </Link>
                <Link href="/pricing" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Pricing
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}