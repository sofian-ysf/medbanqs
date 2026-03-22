import { Metadata } from 'next';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - MedBanqs',
  description: 'Terms of Service for MedBanqs - Read our terms and conditions for using our medical education platform.',
};

export default function TermsOfServicePage() {
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
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Effective Date: January 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using MedBanqs's services, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access our service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms apply to all visitors, users, and others who access or use our medical education platform, including but not limited to our website, mobile applications, and all related services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                MedBanqs provides a comprehensive medical education platform designed to help medical students prepare for the UK Medical Licensing Assessment (UKMLA). Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access to 5,000+ practice questions</li>
                <li>Personalized study recommendations</li>
                <li>Performance tracking and analytics</li>
                <li>Mock examinations</li>
                <li>Study planning tools</li>
                <li>Educational content and explanations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">To access our services, you must:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Be at least 18 years old or have parental consent</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription and Payment</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Subscription Plans</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Access to MedBanqs requires a paid subscription. We offer flexible plans of 3, 6, or 12 months duration.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Payment Terms</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Subscriptions are billed in advance for the selected duration</li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>All payments are processed securely through Stripe</li>
                <li>Access is granted immediately upon successful payment</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Refund Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We offer a 14-day money-back guarantee for new subscribers. Refunds are not available for renewal payments or after 14 days of initial purchase.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Share account credentials with others</li>
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Reproduce, distribute, or publicly display our content without permission</li>
                <li>Attempt to reverse engineer or hack our platform</li>
                <li>Use automated systems or bots to access our service</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Collect or harvest user data without permission</li>
                <li>Impersonate another person or entity</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on MedBanqs, including questions, explanations, design, graphics, and software, is the property of MedBanqs or its licensors and is protected by intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You are granted a limited, non-exclusive, non-transferable license to access and use our content for personal educational purposes only. Any other use requires our written permission.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Medical Disclaimer</h2>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Important:</strong> MedBanqs is an educational platform designed to supplement medical education. It is NOT a substitute for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Professional medical advice, diagnosis, or treatment</li>
                  <li>Formal medical education or training</li>
                  <li>Clinical experience or supervision</li>
                  <li>Official UKMLA preparation materials</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Always seek the advice of qualified healthcare providers with any questions regarding medical conditions or treatments.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law, MedBanqs shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or use</li>
                <li>Exam performance or results</li>
                <li>Interruption of service or system errors</li>
                <li>Third-party content or services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Our total liability shall not exceed the amount paid by you for the service in the preceding 12 months.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless MedBanqs, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the service or violation of these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Your use of our service is also governed by our <Link href="/privacy" className="text-black underline hover:text-gray-700">Privacy Policy</Link>. By using MedBanqs, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account immediately, without prior notice, for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Breach of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>At our sole discretion for any reason</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Upon termination, your right to use the service will cease immediately. You may terminate your account at any time through your account settings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be notified via email or platform notification at least 30 days before becoming effective. Continued use after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@medbanqs.com</p>
                <p className="text-gray-700 mb-2"><strong>Support:</strong> support@medbanqs.com</p>
                <p className="text-gray-700"><strong>Address:</strong> MedBanqs Ltd, London, United Kingdom</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}