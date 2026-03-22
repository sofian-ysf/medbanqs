import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Clock, Users, Star, ArrowRight, BookOpen, Brain, Award, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical School Exam UK - UKMLA Preparation Guide & Practice | MedBanqs',
  description: 'Complete guide to UK medical school exams and UKMLA preparation. Expert tips, 5,000+ practice questions, personalized support, and proven strategies for medical students.',
  keywords: 'medical school exam UK, UK medical school assessment, UKMLA exam, medical student exam UK, medical finals UK, medical school test preparation, UK medical education, GMC medical exam',
  openGraph: {
    title: 'UK Medical School Exam Preparation - Pass UKMLA with MedBanqs',
    description: 'Everything you need to pass your UK medical school exams. Comprehensive UKMLA preparation with personalized learning.',
    url: 'https://www.medbanqs.com/medical-school-exam',
  },
};

export default function MedicalSchoolExamPage() {
  const examStages = [
    {
      title: "Pre-clinical Years",
      description: "Foundation knowledge in anatomy, physiology, and basic sciences",
      topics: ["Anatomy", "Physiology", "Biochemistry", "Pathology"],
      icon: BookOpen
    },
    {
      title: "Clinical Years",
      description: "Applied medical knowledge and clinical reasoning skills",
      topics: ["Medicine", "Surgery", "Paediatrics", "Psychiatry"],
      icon: Brain
    },
    {
      title: "Final Year & UKMLA",
      description: "Comprehensive assessment for medical licensing",
      topics: ["Clinical Skills", "Applied Knowledge", "Professional Skills"],
      icon: Award
    }
  ];

  const universities = [
    "Imperial College London",
    "University of Oxford",
    "University of Cambridge",
    "UCL Medical School",
    "King's College London",
    "University of Edinburgh",
    "University of Manchester",
    "University of Glasgow"
  ];

  const testimonials = [
    {
      name: "Emma Thompson",
      university: "Imperial College London",
      score: "95%",
      quote: "MedBanqs's detailed explanations helped me understand complex concepts I struggled with for months. Passed UKMLA with flying colors!"
    },
    {
      name: "James Chen",
      university: "University of Edinburgh",
      score: "92%",
      quote: "The personalized study plan adapted to my weaknesses perfectly. Couldn't have achieved this score without MedBanqs."
    },
    {
      name: "Priya Patel",
      university: "UCL Medical School",
      score: "94%",
      quote: "5,000+ questions covering every topic imaginable. The detailed explanations were like having a consultant available 24/7."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              UK Medical School Exam Preparation
              <br />
              <span className="text-blue-600">Pass UKMLA with Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive preparation for UK medical school assessments and the UK Medical Licensing Assessment (UKMLA). 
              Join thousands of medical students achieving exceptional results with personalized learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                Start Preparing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 transition-colors">
                View Pricing Plans
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 mb-16">
            {universities.slice(0, 4).map((uni, index) => (
              <div key={index} className="text-center">
                <GraduationCap className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{uni}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Stages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            UK Medical School Exam Journey
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            From pre-clinical years to UKMLA, we support you at every stage of your medical education
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {examStages.map((stage, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <stage.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{stage.title}</h3>
                <p className="text-gray-600 mb-4">{stage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {stage.topics.map((topic, idx) => (
                    <span key={idx} className="text-sm px-3 py-1 bg-white border border-gray-200 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UKMLA Focus Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is UKMLA?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The UK Medical Licensing Assessment (UKMLA) is the national medical licensing exam that all UK medical 
                graduates must pass to obtain their license to practice medicine.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Applied Knowledge Test (AKT)</h4>
                    <p className="text-gray-600">200 single best answer questions testing clinical knowledge</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Clinical & Professional Skills Assessment</h4>
                    <p className="text-gray-600">Practical assessment of clinical competencies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">GMC Standards</h4>
                    <p className="text-gray-600">Aligned with General Medical Council requirements</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">UKMLA Success Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">MedBanqs Pass Rate</span>
                  <span className="text-2xl font-bold text-blue-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Score Improvement</span>
                  <span className="text-2xl font-bold text-emerald-600">+23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Study Time Saved</span>
                  <span className="text-2xl font-bold text-purple-600">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Student Satisfaction</span>
                  <span className="text-2xl font-bold text-amber-600">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories from UK Medical Students
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.university}</p>
                  <p className="text-sm font-medium text-emerald-600">UKMLA Score: {testimonial.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Pass Your Medical School Exams
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "Personalized Learning", desc: "Study plans that adapt to your progress" },
              { icon: BookOpen, title: "5,000+ Questions", desc: "Comprehensive question bank covering all topics" },
              { icon: Clock, title: "Timed Mock Exams", desc: "Simulate real exam conditions with instant scoring" },
              { icon: Users, title: "Peer Comparison", desc: "See how you rank against other medical students" },
              { icon: Award, title: "Performance Analytics", desc: "Detailed insights into your strengths and weaknesses" },
              { icon: GraduationCap, title: "Expert Content", desc: "Questions reviewed by UK medical educators" }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Excel in Your Medical School Exams?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of UK medical students achieving their dreams with MedBanqs
          </p>
          <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="mt-4 text-blue-100">Flexible plans starting at £35</p>
        </div>
      </section>
    </div>
  );
}