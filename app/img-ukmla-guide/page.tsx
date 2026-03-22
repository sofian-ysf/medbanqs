'use client';

import React, { useState } from 'react';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Globe, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  DollarSign,
  FileText,
  Users,
  Award,
  MapPin,
  Clock,
  BookOpen,
  Briefcase,
  Home,
  Heart,
  Shield,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react';

export default function IMGUKMLAGuidePage() {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const pathwaySteps = [
    {
      step: 1,
      title: 'Primary Medical Qualification',
      description: 'Complete your medical degree from a GMC-recognized institution',
      requirements: [
        'WHO-listed medical school',
        'Minimum 5.5 years of study',
        'Internship completion certificate'
      ]
    },
    {
      step: 2,
      title: 'English Language Proficiency',
      description: 'Prove English language skills via OET or IELTS',
      requirements: [
        'OET: Minimum B in all sections',
        'IELTS Academic: 7.5 overall, 7.0 in each',
        'Valid for 2 years from test date'
      ]
    },
    {
      step: 3,
      title: 'UKMLA AKT (formerly PLAB 1)',
      description: 'Pass the Applied Knowledge Test - 200 SBA questions',
      requirements: [
        'Cost: £255 per attempt',
        '2 papers, 100 questions each',
        'Pass mark: 55-65% (varies)',
        'Maximum 4 attempts'
      ]
    },
    {
      step: 4,
      title: 'UKMLA CPSA (formerly PLAB 2)',
      description: 'Pass the Clinical & Professional Skills Assessment',
      requirements: [
        'Cost: £906',
        '16 OSCE stations',
        'Manchester test centre only',
        'Valid for 2 years'
      ]
    },
    {
      step: 5,
      title: 'GMC Registration',
      description: 'Apply for registration with a licence to practise',
      requirements: [
        'Registration fee: £420',
        'Identity verification',
        'Certificate of Good Standing',
        'Complete within 2 years of CPSA'
      ]
    },
    {
      step: 6,
      title: 'Foundation Programme/Job',
      description: 'Secure your first UK medical position',
      requirements: [
        'FY1/FY2 positions',
        'Trust grade roles',
        'Clinical fellow positions',
        'Visa sponsorship required'
      ]
    }
  ];

  const countrySpecificInfo = {
    india: {
      name: 'India',
      candidates: '40% of IMGs',
      keyTips: [
        'MBBS must be from MCI/NMC recognized college',
        'Complete internship before applying',
        'Consider MRCP/MRCS alongside UKMLA',
        'Strong IMG community support networks'
      ]
    },
    pakistan: {
      name: 'Pakistan',
      candidates: '15% of IMGs',
      keyTips: [
        'PMC registration required',
        'House job completion certificate needed',
        'Early OET preparation recommended',
        'Active Pakistani doctor associations in UK'
      ]
    },
    nigeria: {
      name: 'Nigeria',
      candidates: '12% of IMGs',
      keyTips: [
        'MDCN license required',
        'Housemanship completion mandatory',
        'Consider UK clinical attachments',
        'Growing Nigerian medical diaspora'
      ]
    },
    egypt: {
      name: 'Egypt',
      candidates: '8% of IMGs',
      keyTips: [
        'Ministry of Health verification needed',
        'Internship year documentation',
        'Arabic medical terms translation helpful',
        'Egyptian Medical Society UK support'
      ]
    }
  };

  const visaInfo = {
    skilled: {
      name: 'Skilled Worker Visa',
      duration: 'Up to 5 years',
      requirements: [
        'Job offer from licensed sponsor',
        'Minimum salary £26,200 or going rate',
        'English language proof',
        'Financial maintenance funds'
      ],
      cost: '£625-£1,423 (3-5 years)',
      processingTime: '3 weeks'
    },
    health: {
      name: 'Health and Care Worker Visa',
      duration: 'Up to 5 years',
      requirements: [
        'Job offer in eligible health role',
        'From approved UK employer',
        'Reduced visa fees',
        'No Immigration Health Surcharge'
      ],
      cost: '£247-£479 (reduced rate)',
      processingTime: '3 weeks'
    }
  };

  const ukmlaDifferences = [
    {
      aspect: 'Exam Name',
      plab: 'PLAB 1 & PLAB 2',
      ukmla: 'UKMLA AKT & CPSA',
      impact: 'Same difficulty, new name'
    },
    {
      aspect: 'Content',
      plab: 'PLAB Blueprint',
      ukmla: 'MLA Content Map',
      impact: 'More structured syllabus'
    },
    {
      aspect: 'Who Takes It',
      plab: 'IMGs only',
      ukmla: 'UK grads + IMGs',
      impact: 'Unified standard'
    },
    {
      aspect: 'Implementation',
      plab: 'Ending 2024',
      ukmla: 'Started August 2024',
      impact: 'Transition period ongoing'
    },
    {
      aspect: 'Pass Rate',
      plab: '62% average',
      ukmla: '65% expected',
      impact: 'Similar difficulty'
    }
  ];

  const preparationTimeline = [
    { month: 'Month 1-2', focus: 'English exam preparation (OET/IELTS)', study: '4-6 hours daily' },
    { month: 'Month 3-5', focus: 'UKMLA AKT intensive preparation', study: '6-8 hours daily' },
    { month: 'Month 6', focus: 'AKT exam and result wait', study: 'Light revision' },
    { month: 'Month 7-9', focus: 'CPSA preparation and practice', study: '4-6 hours daily' },
    { month: 'Month 10', focus: 'CPSA exam in Manchester', study: 'Final preparation' },
    { month: 'Month 11-12', focus: 'Job applications and GMC registration', study: 'Interview prep' }
  ];

  return (
    <>
      <PillNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              <span>Trusted by IMGs from 50+ Countries | 89% Pass Rate</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              IMG Guide to UKMLA 2025
              <span className="block text-green-600 mt-2">Your Path to UK Medical Practice</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Complete roadmap for International Medical Graduates transitioning from PLAB to UKMLA. 
              Master the AKT exam, understand UK healthcare, and start your NHS career with confidence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your UK Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/ukmla-akt"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-lg hover:bg-green-50 transition-all border-2 border-green-600"
              >
                Explore UKMLA AKT
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            {/* Quick Stats for IMGs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">IMG Pass Rate</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-purple-600">£255</div>
                <div className="text-sm text-gray-600">AKT Cost</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-orange-600">6-12</div>
                <div className="text-sm text-gray-600">Months Prep</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAB to UKMLA Transition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              PLAB to UKMLA: What's Changed for IMGs?
            </h2>
            <p className="text-lg text-gray-600">
              Understanding the transition from PLAB to the new UKMLA system
            </p>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-xl mb-8">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Important Update:</strong> From August 2024, PLAB 1 has been replaced by UKMLA AKT, 
              and from May 2024, PLAB 2 has been replaced by CPSA. The content and difficulty remain similar, 
              but the exam is now aligned with what UK medical graduates take.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Aspect</th>
                  <th className="px-6 py-4 text-center">Old (PLAB)</th>
                  <th className="px-6 py-4 text-center">New (UKMLA)</th>
                  <th className="px-6 py-4 text-center">Impact for IMGs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ukmlaDifferences.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.aspect}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.plab}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-medium">{item.ukmla}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Complete Pathway */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your Complete Journey to UK Medical Practice
          </h2>
          
          <div className="max-w-5xl mx-auto">
            {pathwaySteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < pathwaySteps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-gray-300"></div>
                )}
                
                <div className="flex items-start mb-8">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  
                  {/* Step Content */}
                  <div className="ml-6 flex-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {step.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country-Specific Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Country-Specific Guidance
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Object.entries(countrySpecificInfo).map(([key, country]) => (
              <div key={key} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-all">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">{country.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{country.candidates}</p>
                <ul className="space-y-2">
                  {country.keyTips.slice(0, 2).map((tip, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-500 mr-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            UK Visa Options for Medical Professionals
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(visaInfo).map(([key, visa]) => (
              <div key={key} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{visa.name}</h3>
                    <p className="text-sm text-gray-600">{visa.duration}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {visa.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Visa Cost</p>
                      <p className="font-semibold text-gray-900">{visa.cost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Processing</p>
                      <p className="font-semibold text-gray-900">{visa.processingTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            12-Month Preparation Timeline for IMGs
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {preparationTimeline.map((phase, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{phase.month}</h3>
                      <p className="text-gray-700 mt-1">{phase.focus}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{phase.study}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NHS Benefits */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose UK Medical Practice?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <DollarSign className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Salary</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• FY1: £29,384-£34,012</li>
                <li>• FY2: £34,012-£39,467</li>
                <li>• ST3+: £40,257-£68,638</li>
                <li>• Consultant: £82,096-£110,683</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <Heart className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Work-Life Balance</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 48-hour working week</li>
                <li>• 27 days annual leave + bank holidays</li>
                <li>• Study leave provisions</li>
                <li>• NHS pension scheme</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Development</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Structured training pathways</li>
                <li>• Research opportunities</li>
                <li>• Global recognition</li>
                <li>• Subspecialty training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            IMG Success Stories with MedBanqs
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Priya Sharma',
                country: 'India',
                role: 'FY2 Doctor, Manchester',
                quote: 'MedBanqs\'s UK-specific content helped me understand NHS protocols. Passed AKT on first attempt!',
                score: '82%'
              },
              {
                name: 'Dr. Ahmed Hassan',
                country: 'Egypt',
                role: 'CT1 Surgery, London',
                quote: 'The transition from PLAB to UKMLA was smooth with MedBanqs. Excellent IMG support.',
                score: '79%'
              },
              {
                name: 'Dr. Fatima Ali',
                country: 'Pakistan',
                role: 'GP Trainee, Birmingham',
                quote: 'Comprehensive question bank with detailed explanations. Worth every penny!',
                score: '85%'
              }
            ].map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">{story.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.country} → {story.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 italic mb-4">"{story.quote}"</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-green-600">AKT: {story.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join 2,000+ IMGs Succeeding with MedBanqs
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Start your UK medical journey with confidence. 89% first-attempt pass rate for IMGs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started for IMGs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/447890123456"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-all"
            >
              WhatsApp Support
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
          
          <p className="text-sm text-green-200 mt-6">
            Special pricing for IMGs • Payment plans available • 24/7 support
          </p>
        </div>
      </section>

      <Footer />
      
      {/* Structured Data for IMGs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Pass UKMLA as an International Medical Graduate",
            "description": "Complete guide for IMGs to pass UKMLA AKT and start UK medical practice",
            "step": pathwaySteps.map(step => ({
              "@type": "HowToStep",
              "name": step.title,
              "text": step.description
            })),
            "totalTime": "P12M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "GBP",
              "value": "2000-3000"
            }
          })
        }}
      />
    </>
  );
}