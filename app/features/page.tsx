import { Metadata } from 'next';
import PillNavigation from '@/components/landing/PillNavigation';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  BookOpen,
  BarChart3,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features - Comprehensive UKMLA Preparation | MedBanqs',
  description: 'Discover MedBanqs\'s comprehensive features: 5,000+ UKMLA questions, detailed explanations, personalized study plans, and performance analytics.',
};

export default function FeaturesPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Intelligent Learning",
      description: "Get instant, detailed explanations for every question, with adaptive content that matches your learning style and pace.",
      highlights: [
        "Personalized explanations",
        "Adaptive difficulty",
        "Smart recommendations",
        "Learning pattern analysis"
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "5,000+ UKMLA Questions",
      description: "Comprehensive question bank covering all UKMLA topics, regularly updated to match the latest exam format.",
      highlights: [
        "All medical specialties",
        "Clinical scenarios",
        "Image-based questions",
        "Evidence-based content"
      ]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Study Plans",
      description: "Custom study schedules based on your exam date, current knowledge level, and available study time.",
      highlights: [
        "Exam countdown tracker",
        "Daily study goals",
        "Topic prioritization",
        "Flexible scheduling"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Detailed insights into your progress with comprehensive analytics and performance tracking.",
      highlights: [
        "Score predictions",
        "Weakness identification",
        "Progress tracking",
        "Peer comparison"
      ]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timed Mock Exams",
      description: "Simulate real UKMLA exam conditions with full-length timed assessments.",
      highlights: [
        "Exam simulation",
        "Time management practice",
        "Instant scoring",
        "Detailed review"
      ]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Spaced Repetition",
      description: "Scientifically proven learning technique to maximize retention and recall.",
      highlights: [
        "Smart review scheduling",
        "Long-term retention",
        "Efficient studying",
        "Memory optimization"
      ]
    }
  ];

  const stats = [
    { number: "97%", label: "Pass Rate" },
    { number: "5,000+", label: "Questions" },
    { number: "5,000+", label: "Active Students" },
    { number: "4.9/5", label: "Student Rating" }
  ];

  return (
    <>
      <PillNavigation />
      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to Pass UKMLA
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive features designed by medical professionals to help you excel in your medical licensing assessment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/pricing"
                className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Started
              </a>
              <a
                href="/pricing"
                className="px-8 py-3 border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Medical Success
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every feature is designed to maximize your study efficiency and exam performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-gray-300 transition-colors"
                >
                  <div className="text-black mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of medical students who are already using MedBanqs to prepare for their exams.
            </p>
            <a
              href="/pricing"
              className="inline-block px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-lg"
            >
              Get Started Today
            </a>
            <p className="mt-4 text-sm text-gray-500">
              Flexible plans starting at £35
            </p>
          </div>
        </section>
      </div>
    </>
  );
}