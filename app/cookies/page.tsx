import { Metadata } from 'next';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy - MedBanqs',
  description: 'Cookie Policy for MedBanqs - Learn about how we use cookies and similar technologies on our platform.',
};

export default function CookiePolicyPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our platform, and enabling certain features.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We also use similar technologies like local storage, session storage, and pixel tags to enhance your learning experience on MedBanqs.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Essential Cookies</h3>
                <p className="text-gray-700 mb-3">These cookies are necessary for the website to function properly.</p>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Cookie Name</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Purpose</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">auth_token</td>
                      <td className="py-2 text-sm text-gray-600">User authentication</td>
                      <td className="py-2 text-sm text-gray-600">Session</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">session_id</td>
                      <td className="py-2 text-sm text-gray-600">Maintain user session</td>
                      <td className="py-2 text-sm text-gray-600">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm text-gray-600">cookie_consent</td>
                      <td className="py-2 text-sm text-gray-600">Store cookie preferences</td>
                      <td className="py-2 text-sm text-gray-600">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Functional Cookies</h3>
                <p className="text-gray-700 mb-3">These cookies enable personalized features and remember your preferences.</p>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Cookie Name</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Purpose</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">study_preferences</td>
                      <td className="py-2 text-sm text-gray-600">Remember study settings</td>
                      <td className="py-2 text-sm text-gray-600">30 days</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">selected_categories</td>
                      <td className="py-2 text-sm text-gray-600">Remember question categories</td>
                      <td className="py-2 text-sm text-gray-600">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm text-gray-600">theme_preference</td>
                      <td className="py-2 text-sm text-gray-600">Display preferences</td>
                      <td className="py-2 text-sm text-gray-600">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Analytics Cookies</h3>
                <p className="text-gray-700 mb-3">These cookies help us understand how you use our platform to improve our services.</p>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Cookie Name</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Purpose</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">_ga</td>
                      <td className="py-2 text-sm text-gray-600">Google Analytics tracking</td>
                      <td className="py-2 text-sm text-gray-600">2 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">_gid</td>
                      <td className="py-2 text-sm text-gray-600">Google Analytics tracking</td>
                      <td className="py-2 text-sm text-gray-600">24 hours</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm text-gray-600">study_analytics</td>
                      <td className="py-2 text-sm text-gray-600">Track study patterns</td>
                      <td className="py-2 text-sm text-gray-600">90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Marketing Cookies</h3>
                <p className="text-gray-700 mb-3">These cookies may be set by our advertising partners to build a profile of your interests.</p>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Cookie Name</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Purpose</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-sm text-gray-600">fbp</td>
                      <td className="py-2 text-sm text-gray-600">Facebook pixel</td>
                      <td className="py-2 text-sm text-gray-600">90 days</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm text-gray-600">referral_source</td>
                      <td className="py-2 text-sm text-gray-600">Track referral source</td>
                      <td className="py-2 text-sm text-gray-600">30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use services from third parties that may set cookies on your device:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Firebase:</strong> Authentication and database services</li>
                <li><strong>Stripe:</strong> Payment processing (only on payment pages)</li>
                <li><strong>Google Analytics:</strong> Website usage analysis</li>
                <li><strong>Cloudflare:</strong> Security and performance optimization</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How to Manage Cookies</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control and delete cookies through your browser settings. Here's how for popular browsers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Cookie Preferences</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can manage your cookie preferences directly on our platform:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Manage Cookie Preferences
                </button>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Impact of Disabling Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Please note that disabling certain cookies may affect your experience on MedBanqs:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential cookies:</strong> You may not be able to log in or access your account</li>
                <li><strong>Functional cookies:</strong> Your preferences won't be saved between sessions</li>
                <li><strong>Analytics cookies:</strong> We won't be able to improve our service based on usage patterns</li>
                <li><strong>Marketing cookies:</strong> You may see less relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Local Storage and Session Storage</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In addition to cookies, we use local storage and session storage to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Save your progress temporarily while answering questions</li>
                <li>Store selected question categories during your session</li>
                <li>Cache frequently accessed data for better performance</li>
                <li>Remember your UI preferences</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can clear local storage through your browser's developer tools or by clearing your browsing data.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Do Not Track Signals</h2>
              <p className="text-gray-700 leading-relaxed">
                Some browsers offer a "Do Not Track" (DNT) setting. We currently do not respond to DNT signals, but we respect your cookie preferences as set through our cookie management tools.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any material changes by updating the "Last updated" date and, where appropriate, through platform notifications.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@medbanqs.com</p>
                <p className="text-gray-700 mb-2"><strong>Data Protection Officer:</strong> dpo@medbanqs.com</p>
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