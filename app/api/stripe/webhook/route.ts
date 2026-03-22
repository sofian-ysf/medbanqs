import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Helper function to send Discord notification for payments
async function sendPaymentNotification(
  email: string,
  planId: string,
  amount: number,
  isRenewal: boolean
) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured');
    return;
  }

  const planNames: Record<string, string> = {
    monthly_3: '3 Months',
    monthly_6: '6 Months',
    monthly_12: '12 Months',
  };

  const embed = {
    title: isRenewal ? '🔄 Subscription Renewed!' : '💳 New Payment Received!',
    color: isRenewal ? 0x3b82f6 : 0x22c55e, // Blue for renewal, green for new
    fields: [
      {
        name: '📧 Email',
        value: email || 'Not provided',
        inline: true,
      },
      {
        name: '📦 Plan',
        value: planNames[planId] || planId,
        inline: true,
      },
      {
        name: '💰 Amount',
        value: `£${(amount / 100).toFixed(2)}`,
        inline: true,
      },
      {
        name: '🕐 Time',
        value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
        inline: true,
      },
    ],
    footer: {
      text: 'MedBanqs Payment Notification',
    },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error('Error sending Discord payment notification:', error);
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract metadata
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;
        const duration = parseInt(session.metadata?.duration || '0');

        if (!userId || !planId || !duration) {
          console.error('Missing metadata in checkout session');
          break;
        }

        // Get current user data to check for existing subscription
        const userDoc = await getDoc(doc(db, 'users', userId));
        const userData = userDoc.data();
        const now = new Date();
        
        let startDate = now;
        // If user has an active subscription that hasn't expired, extend from the end date
        if (userData?.subscriptionEndDate && userData?.subscriptionStatus === 'active') {
          const existingEndDate = new Date(userData.subscriptionEndDate);
          if (existingEndDate > now) {
            startDate = existingEndDate;
          }
        }
        
        // Calculate new subscription end date
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + duration);

        // Check if this is a renewal (user had existing active subscription)
        const isRenewal = userData?.subscriptionStatus === 'active' &&
                          userData?.subscriptionEndDate &&
                          new Date(userData.subscriptionEndDate) > now;

        // Update user subscription in Firestore (store dates as ISO strings for consistency)
        await updateDoc(doc(db, 'users', userId), {
          subscriptionStatus: 'active',
          subscriptionPlan: planId,
          subscriptionEndDate: endDate.toISOString(),
          subscriptionId: session.id,
          lastPaymentDate: new Date().toISOString(),
        });

        // Send Discord notification for successful payment
        const customerEmail = session.customer_details?.email || userData?.email || 'Unknown';
        const amountPaid = session.amount_total || 0;
        await sendPaymentNotification(customerEmail, planId, amountPaid, isRenewal);

        console.log(`Subscription activated for user ${userId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get customer details to find Firebase user
        const customer = await stripe.customers.retrieve(customerId);
        if ('metadata' in customer) {
          const userId = customer.metadata.firebaseUserId;
          
          if (userId) {
            await updateDoc(doc(db, 'users', userId), {
              subscriptionStatus: subscription.status,
              subscriptionEndDate: new Date(subscription.current_period_end * 1000),
            });
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get customer details to find Firebase user
        const customer = await stripe.customers.retrieve(customerId);
        if ('metadata' in customer) {
          const userId = customer.metadata.firebaseUserId;
          
          if (userId) {
            await updateDoc(doc(db, 'users', userId), {
              subscriptionStatus: 'canceled',
              subscriptionEndDate: new Date(subscription.current_period_end * 1000),
            });
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Get customer details to find Firebase user
        const customer = await stripe.customers.retrieve(customerId);
        if ('metadata' in customer) {
          const userId = customer.metadata.firebaseUserId;
          
          if (userId) {
            // Update subscription status to past_due
            await updateDoc(doc(db, 'users', userId), {
              subscriptionStatus: 'past_due',
            });
            
            // TODO: Send email notification about failed payment
            console.log(`Payment failed for user ${userId}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}