import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Brain, Target, TrendingUp, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UKMLA Questions - 5,000+ Practice Questions with Expert Explanations | MedBanqs',
  description: 'Access 5,000+ UKMLA practice questions with detailed expert explanations. Covers all topics: cardiology, respiratory, pharmacology, anatomy. 97% pass rate.',
  keywords: 'UKMLA questions, UKMLA practice questions, UKMLA question bank, medical licensing questions UK, UKMLA mock questions, UKMLA past papers, UKMLA exam questions, medical student questions UK',
  openGraph: {
    title: 'UKMLA Question Bank - 5,000+ Medical Questions | MedBanqs',
    description: 'Master UKMLA with our comprehensive question bank. Expert explanations, performance tracking, and personalized study plans.',
    url: 'https://www.medbanqs.com/ukmla-questions',
  },
};

export default function UKMLAQuestionsPage() {
  const features = [
    {
      icon: Brain,
      title: "Detailed Explanations",
      description: "Get instant, detailed explanations for every question with clinical reasoning"
    },
    {
      icon: Target,
      title: "Topic-Specific Practice",
      description: "Focus on your weak areas with questions organized by medical specialty"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your progress and identify knowledge gaps with detailed analytics"
    },
    {
      icon: Award,
      title: "Exam-Style Questions",
      description: "Practice with questions that mirror the actual UKMLA format and difficulty"
    }
  ];

  const topics = [
    { name: "Cardiology", count: "2,100+ questions", color: "bg-red-100 text-red-700" },
    { name: "Respiratory", count: "1,800+ questions", color: "bg-blue-100 text-blue-700" },
    { name: "Pharmacology", count: "2,500+ questions", color: "bg-amber-100 text-amber-700" },
    { name: "Anatomy", count: "1,900+ questions", color: "bg-emerald-100 text-emerald-700" },
    { name: "Pathology", count: "2,200+ questions", color: "bg-purple-100 text-purple-700" },
    { name: "Infectious Diseases", count: "1,600+ questions", color: "bg-pink-100 text-pink-700" },
    { name: "Gastroenterology", count: "1,400+ questions", color: "bg-indigo-100 text-indigo-700" },
    { name: "Neurology", count: "1,500+ questions", color: "bg-gray-100 text-gray-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              5,000+ UKMLA Practice Questions
              <br />
              <span className="text-blue-600">With Expert Learning Support</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master every topic in the UK Medical Licensing Assessment with our comprehensive question bank. 
              Get instant expert explanations, track your progress, and join thousands achieving 97% pass rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="#topics" className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 transition-colors">
                Browse Topics
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Practice Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">97%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose MedBanqs for UKMLA Questions?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            UKMLA Question Topics
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Comprehensive coverage of all medical specialties tested in the UK Medical Licensing Assessment
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{topic.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${topic.color}`}>
                  {topic.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Question Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Try a Sample UKMLA Question
          </h2>
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <div className="mb-6">
              <span className="text-sm font-semibold text-blue-600">Cardiology - Difficulty: Medium</span>
              <h3 className="text-lg font-medium text-gray-900 mt-2">
                A 68-year-old man presents to the emergency department with central chest pain that started 2 hours ago. 
                The pain radiates to his left arm and jaw. He is sweating and feels nauseous. His ECG shows ST elevation 
                in leads II, III, and aVF. What is the most appropriate immediate management?
              </h3>
            </div>
            <div className="space-y-3">
              {[
                "A. Aspirin 300mg and primary PCI",
                "B. Thrombolysis with alteplase",
                "C. Intravenous beta-blockers",
                "D. Sublingual GTN spray",
                "E. Oral clopidogrel 600mg"
              ].map((option, index) => (
                <button key={index} className="w-full text-left p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/auth" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                See answer and explanation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Master UKMLA?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of medical students achieving excellence with our comprehensive question bank
          </p>
          <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="mt-4 text-gray-500">Flexible plans starting at £35</p>
        </div>
      </section>
    </div>
  );
}