'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ArrowLeft, CreditCard, CheckCircle, XCircle, Clock, Calendar, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useSubscription } from '@/lib/useSubscription';

interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
  planName?: string;
  amount?: number;
  currency?: string;
  interval?: 'month' | 'year';
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: Date;
  description: string;
  invoiceUrl?: string;
}

const SubscriptionPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'invoices'>('current');
  
  const { isActive, subscription: currentSubscription, subscriptionEndDate, daysRemaining } = useSubscription();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchSubscriptions(firebaseUser.uid);
        await fetchPayments(firebaseUser.uid);
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchSubscriptions = async (userId: string) => {
    try {
      const subscriptionsRef = collection(db, 'subscriptions');
      const q = query(
        subscriptionsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const subs: Subscription[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        subs.push({
          id: doc.id,
          ...data,
          currentPeriodStart: data.currentPeriodStart?.toDate(),
          currentPeriodEnd: data.currentPeriodEnd?.toDate(),
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Subscription);
      });
      
      setSubscriptions(subs);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const fetchPayments = async (userId: string) => {
    try {
      const paymentsRef = collection(db, 'payments');
      const q = query(
        paymentsRef,
        where('userId', '==', userId),
        orderBy('created', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const paymentsList: Payment[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        paymentsList.push({
          id: doc.id,
          ...data,
          created: data.created?.toDate(),
        } as Payment);
      });
      
      setPayments(paymentsList);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.uid }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case 'canceled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Canceled
          </span>
        );
      case 'past_due':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Past Due
          </span>
        );
      case 'incomplete':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Incomplete
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number, currency: string = 'gbp') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="text-sm">Back to Dashboard</span>
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Subscription & Billing</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Subscription Status */}
        {isActive && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Current Subscription</h2>
              {getStatusBadge('active')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p className="text-base font-medium text-gray-900">UKMLA Practice Pro</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Access ends</p>
                <p className="text-base font-medium text-gray-900">
                  {formatDate(subscriptionEndDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Days remaining</p>
                <p className="text-base font-medium text-gray-900">{daysRemaining} days</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleManageSubscription}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Manage Subscription
              </button>
              <button
                onClick={() => router.push('/pricing')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Extend Access
              </button>
            </div>
          </div>
        )}

        {/* No Active Subscription */}
        {!isActive && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900">No Active Subscription</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Subscribe to access all 5,000+ UKMLA practice questions and track your progress.
                </p>
                <button
                  onClick={() => router.push('/pricing')}
                  className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  View Plans
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'current'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Current Plan
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Subscription History
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'invoices'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Invoices & Payments
            </button>
          </div>

          <div className="p-6">
            {/* Current Plan Tab */}
            {activeTab === 'current' && (
              <div>
                {isActive && currentSubscription ? (
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-4">Plan Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Access to all questions</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Progress tracking</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Performance analytics</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Mistake review</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">All 23 categories</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Billing Information</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Subscription ID: {currentSubscription.stripeSubscriptionId}</p>
                        <p>Started: {formatDate(currentSubscription.createdAt)}</p>
                        {currentSubscription.cancelAtPeriodEnd && (
                          <p className="text-red-600">Will cancel at period end</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No active subscription</p>
                    <button
                      onClick={() => router.push('/pricing')}
                      className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Subscribe Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">Subscription History</h3>
                {subscriptions.length > 0 ? (
                  <div className="space-y-4">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {sub.planName || 'UKMLA Practice Pro'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(sub.createdAt)} - {formatDate(sub.currentPeriodEnd)}
                            </p>
                          </div>
                          {getStatusBadge(sub.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            {sub.interval === 'year' ? 'Annual' : 'Monthly'} billing
                          </p>
                          {sub.amount && (
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(sub.amount, sub.currency || 'gbp')}/{sub.interval || 'month'}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No subscription history available
                  </div>
                )}
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">Payment History</h3>
                {payments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(payment.created)}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                              {payment.description}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(payment.amount, payment.currency)}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              {payment.status === 'succeeded' ? (
                                <span className="text-green-600 text-sm">Paid</span>
                              ) : (
                                <span className="text-red-600 text-sm">{payment.status}</span>
                              )}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              {payment.invoiceUrl && (
                                <a
                                  href={payment.invoiceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-black hover:text-gray-700 text-sm flex items-center"
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No payment history available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleManageSubscription}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Manage Billing</span>
            </button>
            
            <button
              onClick={() => router.push('/pricing')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Change Plan</span>
            </button>
            
            <button
              onClick={handleManageSubscription}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Payment Methods</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;