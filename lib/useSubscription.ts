import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from '@/types';

interface SubscriptionStatus {
  isActive: boolean;
  isLoading: boolean;
  user: User | null;
  subscriptionEndDate?: Date;
  subscriptionPlan?: string;
  daysRemaining?: number;
  subscription?: any;
}

export function useSubscription(): SubscriptionStatus {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date>();
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>();
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Set up real-time listener for user document
        const userDocRef = doc(db, 'users', firebaseUser.uid);

        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data() as User;
            setUser(userData);

            // Check subscription status
            const now = new Date();
            // Handle both Firestore Timestamp and ISO string formats
            let endDate: Date | null = null;
            if (userData.subscriptionEndDate) {
              if (typeof userData.subscriptionEndDate === 'string') {
                endDate = new Date(userData.subscriptionEndDate);
              } else if (userData.subscriptionEndDate.toDate) {
                // Firestore Timestamp
                endDate = userData.subscriptionEndDate.toDate();
              } else if (userData.subscriptionEndDate.seconds) {
                // Firestore Timestamp as plain object
                endDate = new Date(userData.subscriptionEndDate.seconds * 1000);
              }
            }

            // User is active only if they have an active paid subscription
            const active = userData.subscriptionStatus === 'active' &&
                          endDate !== null &&
                          endDate > now;

            setIsActive(active);
            setSubscriptionEndDate(endDate || undefined);
            setSubscriptionPlan(userData.subscriptionPlan);
            setSubscription(userData);
            setIsLoading(false);
          } else {
            // User document doesn't exist yet
            setUser(null);
            setIsActive(false);
            setIsLoading(false);
          }
        });

        return () => unsubscribeDoc();
      } else {
        setUser(null);
        setIsActive(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Calculate days remaining
  const daysRemaining = subscriptionEndDate
    ? Math.max(0, Math.ceil((subscriptionEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : undefined;

  return {
    isActive,
    isLoading,
    user,
    subscriptionEndDate,
    subscriptionPlan,
    daysRemaining,
    subscription,
  };
}

// Helper function to check if user has active subscription
export async function checkSubscriptionStatus(userId: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return false;
    }
    
    const userData = userDoc.data() as User;
    const now = new Date();
    // Handle both Firestore Timestamp and ISO string formats
    let endDate: Date | null = null;
    if (userData.subscriptionEndDate) {
      if (typeof userData.subscriptionEndDate === 'string') {
        endDate = new Date(userData.subscriptionEndDate);
      } else if ((userData.subscriptionEndDate as any).toDate) {
        endDate = (userData.subscriptionEndDate as any).toDate();
      } else if ((userData.subscriptionEndDate as any).seconds) {
        endDate = new Date((userData.subscriptionEndDate as any).seconds * 1000);
      }
    }
    
    return userData.subscriptionStatus === 'active' && 
           endDate !== null && 
           endDate > now;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}