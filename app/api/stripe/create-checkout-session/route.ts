import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Define subscription plans with different pricing for new vs renewal
const SUBSCRIPTION_PLANS = {
  monthly_3: {
    name: '3 Month Access',
    duration: 3,
    newPrice: 3500, // £35 for new customers
    renewalPrice: 2500, // £25 for renewals
  },
  monthly_6: {
    name: '6 Month Access', 
    duration: 6,
    newPrice: 4500, // £45 for new customers
    renewalPrice: 3500, // £35 for renewals
  },
  monthly_12: {
    name: '12 Month Access',
    duration: 12,
    newPrice: 6500, // £65 for new customers
    renewalPrice: 5500, // £55 for renewals
  },
};

export async function POST(request: NextRequest) {
  try {
    const { userId, email, planId } = await request.json();

    if (!userId || !email || !planId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));
    let stripeCustomerId = userDoc.data()?.stripeCustomerId;
    const userData = userDoc.data();
    
    // Check if user has an active or previously active subscription
    const hasExistingSubscription = userData?.subscriptionEndDate || userData?.subscriptionStatus;
    const isRenewal = hasExistingSubscription ? true : false;
    
    // Determine the price based on whether it's a new purchase or renewal
    const price = isRenewal ? plan.renewalPrice : plan.newPrice;
    const priceType = isRenewal ? 'Renewal' : 'New';

    // Create or retrieve Stripe customer
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          firebaseUserId: userId,
        },
      });
      stripeCustomerId = customer.id;

      // Update user document with Stripe customer ID
      if (userDoc.exists()) {
        await updateDoc(doc(db, 'users', userId), {
          stripeCustomerId,
        });
      } else {
        await setDoc(doc(db, 'users', userId), {
          email,
          stripeCustomerId,
          createdAt: new Date(),
        });
      }
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${plan.name} - ${priceType}`,
              description: `${plan.duration} months of unlimited access to UKMLA practice questions`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?payment=cancelled`,
      customer: stripeCustomerId,
      metadata: {
        userId,
        planId,
        duration: plan.duration.toString(),
        isRenewal: isRenewal.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}