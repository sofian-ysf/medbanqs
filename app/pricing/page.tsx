'use client';

import React, { useState } from 'react';
import { Check, Shield, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useSubscription } from '@/lib/useSubscription';
import PillNavigation from '@/components/landing/PillNavigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PricingPlan {
  id: 'monthly_3' | 'monthly_6' | 'monthly_12';
  name: string;
  duration: string;
  newPrice: number;
  renewalPrice: number;
  popular?: boolean;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly_3',
    name: '3 Months',
    duration: '3 month access',
    newPrice: 35,
    renewalPrice: 25,
    features: [
      '5,000+ UKMLA questions',
      'Detailed explanations',
      'Performance analytics',
      'Progress tracking',
      'Mobile-friendly',
    ],
  },
  {
    id: 'monthly_6',
    name: '6 Months',
    duration: '6 month access',
    newPrice: 45,
    renewalPrice: 35,
    popular: true,
    features: [
      '5,000+ UKMLA questions',
      'Detailed explanations',
      'Performance analytics',
      'Progress tracking',
      'Mobile-friendly',
    ],
  },
  {
    id: 'monthly_12',
    name: '12 Months',
    duration: '12 month access',
    newPrice: 65,
    renewalPrice: 55,
    features: [
      '5,000+ UKMLA questions',
      'Detailed explanations',
      'Performance analytics',
      'Progress tracking',
      'Mobile-friendly',
    ],
  },
];

const PricingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { user: subscriptionUser, isActive, daysRemaining } = useSubscription();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribe = async (planId: 'monthly_3' | 'monthly_6' | 'monthly_12') => {
    // If not logged in, redirect to auth with plan ID
    if (!user) {
      router.push(`/auth?plan=${planId}`);
      return;
    }

    // If logged in, proceed to Stripe checkout
    setLoading(planId);
    setError(null);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          planId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const stripe = await stripePromise;
      if (stripe && data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          throw error;
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      console.error('Subscription error:', err);
    } finally {
      setLoading(null);
    }
  };

  const getButtonText = (planName: string) => {
    const months = planName.split(' ')[0];
    return `Get ${months} Months Access`;
  };

  return (
    <div className="min-h-screen bg-warm-bg text-dark-text">
      <PillNavigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {subscriptionUser ? 'Extend Your Access' : 'Simple, Transparent Pricing'}
          </h1>
          <p className="text-lg sm:text-xl text-dark-secondary max-w-2xl mx-auto">
            {subscriptionUser
              ? `Continue your journey with exclusive renewal rates. ${isActive && daysRemaining ? `${daysRemaining} days remaining.` : ''}`
              : "No hidden fees. No surprises. Just the tools you need to pass your UKMLA."}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 bg-white ${
                  plan.popular
                    ? 'ring-2 ring-dark-text shadow-xl'
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-dark-text text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-bold mb-1 text-dark-text">{plan.name}</h3>
                  <p className="text-sm text-dark-muted">
                    {plan.duration}
                  </p>

                  <div className="mt-4 mb-2">
                    <span className="text-5xl font-bold text-dark-text">
                      £{subscriptionUser ? plan.renewalPrice : plan.newPrice}
                    </span>
                  </div>

                  {subscriptionUser && (
                    <p className="text-sm text-dark-muted">
                      <span className="line-through">£{plan.newPrice}</span>
                      <span className="ml-2 text-green-600 font-medium">
                        Save £{plan.newPrice - plan.renewalPrice}
                      </span>
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 flex-shrink-0 text-green-600" />
                      <span className="text-sm text-dark-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-dark-text text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-dark-text hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    getButtonText(plan.name)
                  )}
                </button>
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-dark-secondary text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>7-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span>Powered by Stripe</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-dark-text">
            Common Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-dark-text">Can I upgrade my plan?</h3>
              <p className="text-dark-secondary">
                Yes! You can extend your access at any time. If you have an active subscription, the new period will be added to your remaining time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-dark-text">What payment methods do you accept?</h3>
              <p className="text-dark-secondary">
                We accept all major credit and debit cards through Stripe, our secure payment partner.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-dark-text">Is there a money-back guarantee?</h3>
              <p className="text-dark-secondary">
                Yes, we offer a 7-day money-back guarantee if you're not satisfied with our platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
