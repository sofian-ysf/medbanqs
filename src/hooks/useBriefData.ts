'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';

interface BriefData {
  title: string;
  description: string;
  timeline: string;
  budget: string;
  deliverables: string[];
  teamComposition: Record<string, number>;
  budgetBreakdown: Record<string, number>;
  skills: string[];
  milestones: Array<{ name: string; duration: string }>;
}

export const useBriefData = () => {
  const { user } = useAuth();
  const [briefData, setBriefData] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBriefData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch brief data from Firestore
        const briefDoc = await getDoc(doc(db, 'briefs', user.uid));
        
        if (briefDoc.exists()) {
          const data = briefDoc.data() as BriefData;
          setBriefData(data);
        } else {
          // If no brief data exists, try to get from localStorage (from brief generator)
          const storedBrief = localStorage.getItem('moccet_brief_data');
          if (storedBrief) {
            try {
              const parsedBrief = JSON.parse(storedBrief);
              setBriefData(parsedBrief);
            } catch (parseError) {
              console.error('Error parsing stored brief data:', parseError);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching brief data:', err);
        setError('Failed to load brief data');
      } finally {
        setLoading(false);
      }
    };

    fetchBriefData();
  }, [user]);

  const updateBriefData = async (newBriefData: Partial<BriefData>) => {
    if (!user) return;

    try {
      // Update local state
      setBriefData(prev => prev ? { ...prev, ...newBriefData } : newBriefData as BriefData);
      
      // Store in localStorage for persistence
      localStorage.setItem('moccet_brief_data', JSON.stringify(newBriefData));
      
      // TODO: Update Firestore if needed
      // await setDoc(doc(db, 'briefs', user.uid), newBriefData, { merge: true });
    } catch (err) {
      console.error('Error updating brief data:', err);
      setError('Failed to update brief data');
    }
  };

  const clearBriefData = () => {
    setBriefData(null);
    localStorage.removeItem('moccet_brief_data');
  };

  return {
    briefData,
    loading,
    error,
    updateBriefData,
    clearBriefData,
  };
}; 