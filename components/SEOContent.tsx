import React from 'react';

export default function SEOContent() {
  return (
    <section className="py-16 px-4 bg-gray-50" aria-label="MedBanqs Platform Information">
      <div className="max-w-7xl mx-auto">
        {/* Medical Topics Section */}
        <section className="mt-16" aria-labelledby="medical-topics">
          <h2 id="medical-topics" className="text-3xl font-bold text-center mb-8 text-gray-800">
            UKMLA Topics Covered
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Cardiology', 'Respiratory Medicine', 'Gastroenterology', 'Neurology',
              'Pharmacology', 'Anatomy', 'Pathology', 'Psychiatry',
              'Paediatrics', 'Obstetrics & Gynaecology', 'Surgery', 'Emergency Medicine',
              'Infectious Diseases', 'Endocrinology', 'Haematology', 'Rheumatology'
            ].map((topic) => (
              <div key={topic} className="bg-white p-4 rounded-lg shadow-sm text-center">
                <h3 className="font-medium text-gray-800">{topic}</h3>
              </div>
            ))}
          </div>
        </section>
        
        {/* Success Statistics */}
        <section className="mt-16 bg-purple-50 rounded-xl p-8" aria-labelledby="success-stats">
          <h2 id="success-stats" className="text-3xl font-bold text-center mb-8 text-gray-800">
            MedBanqs Success Statistics
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-purple-600">97%</p>
              <p className="text-gray-600 mt-2">Pass Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">5,000+</p>
              <p className="text-gray-600 mt-2">UKMLA Questions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">5,000+</p>
              <p className="text-gray-600 mt-2">Active Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">4.9/5</p>
              <p className="text-gray-600 mt-2">Student Rating</p>
            </div>
          </div>
        </section>
        
        {/* FAQ Preview */}
        <section className="mt-16" aria-labelledby="faq-preview">
          <h2 id="faq-preview" className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                How long should I prepare for UKMLA with MedBanqs?
              </summary>
              <p className="mt-4 text-gray-600">
                Most students prepare for 3-6 months using MedBanqs. Our adaptive system creates personalized study plans based on your exam date and current knowledge level, whether you need an intensive 4-week program or a gradual 6-month preparation.
              </p>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Is MedBanqs suitable for international medical graduates?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! MedBanqs is perfect for both UK medical students and international medical graduates preparing for UKMLA. Our content aligns with GMC standards and NICE guidelines, making it ideal for anyone taking the UK Medical Licensing Assessment.
              </p>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                What makes MedBanqs different from other UKMLA preparation platforms?
              </summary>
              <p className="mt-4 text-gray-600">
                MedBanqs combines the largest UKMLA question bank (5,000+ questions) with advanced learning technology. Our platform provides instant, detailed explanations, creates personalized study plans, tracks your performance, and predicts your exam score with 85% accuracy.
              </p>
            </details>
          </div>
        </section>
      </div>
    </section>
  );
}