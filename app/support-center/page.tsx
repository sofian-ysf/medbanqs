'use client';

import { useState } from 'react';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  Search,
  BookOpen,
  Settings,
  CreditCard,
  Shield,
  Users,
  AlertCircle,
  CheckCircle,
  Send,
  FileText,
  HelpCircle,
  Zap
} from 'lucide-react';

export default function SupportCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('normal');

  const supportCategories = [
    {
      title: 'Account & Login',
      icon: <Users className="w-6 h-6" />,
      description: 'Password reset, email changes, account access',
      articles: 12,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Billing & Subscription',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Payment issues, refunds, plan changes',
      articles: 8,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Technical Issues',
      icon: <Settings className="w-6 h-6" />,
      description: 'Platform errors, loading problems, browser issues',
      articles: 15,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Content & Questions',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Question accuracy, content updates, study materials',
      articles: 10,
      color: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Privacy & Security',
      icon: <Shield className="w-6 h-6" />,
      description: 'Data protection, account security, privacy concerns',
      articles: 6,
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'Feature Requests',
      icon: <Zap className="w-6 h-6" />,
      description: 'Suggestions, improvements, new features',
      articles: 4,
      color: 'bg-indigo-50 border-indigo-200'
    }
  ];

  const commonIssues = [
    {
      issue: 'Unable to login to my account',
      solution: 'Try resetting your password or clearing browser cookies',
      status: 'resolved'
    },
    {
      issue: 'Payment not processing',
      solution: 'Check card details and billing address match',
      status: 'resolved'
    },
    {
      issue: 'Questions not loading properly',
      solution: 'Clear browser cache and refresh the page',
      status: 'resolved'
    },
    {
      issue: 'Subscription not activated',
      solution: 'Contact support with your account email and payment confirmation',
      status: 'investigating'
    },
    {
      issue: 'Progress not syncing across devices',
      solution: 'Ensure you\'re logged into the same account',
      status: 'resolved'
    }
  ];

  const responseTime = {
    email: '< 24 hours',
    chat: '2-4 hours',
    urgent: '< 2 hours'
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', { selectedCategory, subject, message, email, priority });
    // Reset form
    setSelectedCategory('');
    setSubject('');
    setMessage('');
    setEmail('');
    setPriority('normal');
  };

  return (
    <>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're here to help. Find answers, contact support, or browse our help articles.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Support Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse Help Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportCategories.map((category, index) => (
                <div key={index} className={`border rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer ${category.color}`}>
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <p className="text-xs text-gray-500">{category.articles} articles</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <Mail className="w-10 h-10 text-gray-700 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-4">Get help via email</p>
                <p className="text-xs text-gray-500 mb-4">Response time: {responseTime.email}</p>
                <a href="mailto:support@medbanqs.com" className="text-black underline hover:text-gray-700">
                  support@medbanqs.com
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <MessageCircle className="w-10 h-10 text-gray-700 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Chat with our team</p>
                <p className="text-xs text-gray-500 mb-4">Response time: {responseTime.chat}</p>
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <FileText className="w-10 h-10 text-gray-700 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Submit Ticket</h3>
                <p className="text-sm text-gray-600 mb-4">Create a support ticket</p>
                <p className="text-xs text-gray-500 mb-4">Track your request</p>
                <button 
                  onClick={() => document.getElementById('ticket-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  New Ticket
                </button>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Issues & Solutions</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="divide-y divide-gray-200">
                {commonIssues.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 mr-2" />
                          <h4 className="font-medium text-gray-900">{item.issue}</h4>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{item.solution}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'resolved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Submit Ticket Form */}
          <section id="ticket-form" className="mb-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Submit a Support Ticket</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account & Login</option>
                      <option value="billing">Billing & Subscription</option>
                      <option value="technical">Technical Issues</option>
                      <option value="content">Content & Questions</option>
                      <option value="security">Privacy & Security</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="low"
                        checked={priority === 'low'}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">Low</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="normal"
                        checked={priority === 'normal'}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">Normal</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="high"
                        checked={priority === 'high'}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">High</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="urgent"
                        checked={priority === 'urgent'}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm text-red-600">Urgent</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Expected response time: {priority === 'urgent' ? responseTime.urgent : responseTime.email}
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Support Hours */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Support Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-90">Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Saturday:</span>
                      <span>10:00 AM - 4:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Sunday:</span>
                      <span>Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Bank Holidays:</span>
                      <span>Limited Support</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Service Status
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>Platform: Operational</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>Payment System: Operational</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>Question Bank: Operational</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>Support System: Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/faq" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <HelpCircle className="w-4 h-4 inline mr-2" />
                FAQ
              </Link>
              <Link href="/study-guides" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Study Guides
              </Link>
              <Link href="/privacy" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Shield className="w-4 h-4 inline mr-2" />
                Privacy Policy
              </Link>
              <Link href="/terms" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <FileText className="w-4 h-4 inline mr-2" />
                Terms of Service
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}