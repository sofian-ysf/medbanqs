"use client";

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Debug Stripe environment variable
console.log('🔐 Stripe Publishable Key configured:', !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
console.log('🔐 Stripe Key length:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.length || 0);

// Initialize Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripeProviderWrapperProps {
  children: React.ReactNode;
}

export default function StripeProviderWrapper({ children }: StripeProviderWrapperProps) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}