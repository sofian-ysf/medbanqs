'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { QUESTION_CATEGORIES, UserProgress } from '@/types';
import { useSubscription } from '@/lib/useSubscription';

// Map display names to database collection names
const categoryToCollection = (displayName: string): string => {
  const mapping: { [key: string]: string } = {
    "Obstetrics and Gynaecology": "Obstetrics and gynaecology",
    "ENT": "ENT",
    "Musculoskeletal": "Musculoskeletal",
    "Perioperative Medicine and Anaesthesia": "Perioperative medicine and anaesthesia",
    "Acute & Emergency": "acute & emergency",
    "All Areas of Clinical Practice": "all areas of clinical practice",
    "Cancer": "cancer",
    "Cardiovascular": "cardiovascular",
    "Child Health": "child health",
    "Clinical Haematology": "clinical haematology",
    "Endocrine & Metabolic": "endocrine & metabolic",
    "Gastrointestinal Including Liver": "gastrointestinal including liver",
    "General Practice and Primary Healthcare": "general practice and primary healthcare",
    "Infection": "infection",
    "Medicine of Older Adult": "medicine of older adult",
    "Mental Health": "mental health",
    "Neuroscience": "neuroscience",
    "Ophthalmology": "opthalmology",
    "Palliative & End of Life Care": "palliative & end of life care",
    "Renal & Urology": "renal & urology",
    "Respiratory": "respiratory",
    "Sexual Health": "sexual health",
    "Surgery": "surgery"
  };
  return mapping[displayName] || displayName;
};

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [categoryStats, setCategoryStats] = useState<any>({});
  const { isActive: hasActiveSubscription, daysRemaining } = useSubscription();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        });
        
        // Fetch user progress
        await fetchUserProgress(firebaseUser.uid);
        
        // Fetch category statistics
        await fetchCategoryStats();
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserProgress = async (userId: string) => {
    try {
      const progressDoc = await getDoc(doc(db, 'userProgress', userId));
      if (progressDoc.exists()) {
        setUserProgress(progressDoc.data() as UserProgress);
      } else {
        // Initialize user progress if it doesn't exist
        const initialProgress: UserProgress = {
          userId,
          totalQuestions: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          categoryProgress: {},
          questionsAttempted: {}
        };
        await setDoc(doc(db, 'userProgress', userId), initialProgress);
        setUserProgress(initialProgress);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const stats: any = {};
      
      // Count questions in each category
      for (const category of QUESTION_CATEGORIES) {
        const collectionName = categoryToCollection(category);
        const categoryCollection = collection(db, collectionName);
        const snapshot = await getDocs(categoryCollection);
        stats[category] = {
          totalQuestions: snapshot.size,
          category: category
        };
      }
      
      setCategoryStats(stats);
    } catch (error) {
      console.error('Error fetching category stats:', error);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleStartQuiz = async () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }
    
    // Save selected categories to localStorage for the questions page
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    router.push('/questions');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const calculateOverallProgress = () => {
    if (!userProgress || !categoryStats) return 0;
    
    // Get total questions in bank
    const totalInBank = Object.values(categoryStats).reduce((sum: number, cat: any) => 
      sum + (cat.totalQuestions || 0), 0
    );
    
    if (totalInBank === 0) return 0;
    
    // Questions attempted is stored in userProgress.totalQuestions
    const attempted = userProgress.totalQuestions || 0;
    
    return Math.round((attempted / totalInBank) * 100);
  };
  
  const getTotalQuestionsInBank = () => {
    if (!categoryStats) return 0;
    return Object.values(categoryStats).reduce((sum: number, cat: any) => 
      sum + (cat.totalQuestions || 0), 0
    );
  };

  const calculateAccuracy = () => {
    if (!userProgress) return 0;
    const attempted = userProgress.correctAnswers + userProgress.wrongAnswers;
    if (attempted === 0) return 0;
    return Math.round((userProgress.correctAnswers / attempted) * 100);
  };

  const getCategoriesCompleted = () => {
    if (!userProgress?.categoryProgress) return 0;
    return Object.values(userProgress.categoryProgress).filter((cat: any) => 
      cat.total > 0 && (cat.correct / cat.total) >= 0.8
    ).length;
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/mastermla-logo.png" alt="MasterMLA" className="h-10 w-auto" />
              <span className="ml-3 text-xl font-bold text-gray-900">MedBanqs</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {user?.name?.toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </h1>
          <p className="text-gray-600 mt-1">
            {hasActiveSubscription
              ? `You have ${daysRemaining || 0} days remaining. Keep practicing!`
              : 'Subscribe to access our full question bank and start practicing.'}
          </p>
        </div>

        {/* Subscription Alert */}
        {!hasActiveSubscription && (
          <div style={{ backgroundColor: '#BAC4C6' }} className="rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">No Active Subscription</p>
              <p className="text-sm text-gray-700 mt-1">
                Subscribe to access all 5,000+ UKMLA practice questions.
              </p>
            </div>
            <button
              onClick={() => router.push('/pricing')}
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Subscribe Now
            </button>
          </div>
        )}

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Overall Progress */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              OVERALL PROGRESS
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                {calculateOverallProgress()}%
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {userProgress?.totalQuestions || 0} of {getTotalQuestionsInBank().toLocaleString()} questions attempted
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${Math.min(calculateOverallProgress(), 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Correct Answers */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              CORRECT ANSWERS
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                {userProgress?.correctAnswers || 0}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Accuracy: {calculateAccuracy()}%
            </p>
          </div>

          {/* Wrong Answers */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              WRONG ANSWERS
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                {userProgress?.wrongAnswers || 0}
              </span>
            </div>
            <button 
              onClick={() => router.push('/review-mistakes')}
              className="text-sm text-black hover:text-gray-700 mt-2"
            >
              Review incorrect answers
            </button>
          </div>

          {/* Categories Mastered */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              CATEGORIES MASTERED
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                {getCategoriesCompleted()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Out of {QUESTION_CATEGORIES.length} total
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories Selection - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Select Categories</h2>
                <span className="text-sm text-gray-500">
                  {selectedCategories.length} selected
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {QUESTION_CATEGORIES.map((category) => {
                  const stats = categoryStats[category] || {};
                  
                  return (
                    <label
                      key={category}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <div className="ml-3 flex-1 flex items-center justify-between">
                        <span className="text-sm text-gray-900">
                          {category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {stats.totalQuestions || 0} questions
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => router.push('/review-mistakes')}
                  className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Review Mistakes
                </button>
                <button
                  onClick={() => setSelectedCategories(QUESTION_CATEGORIES)}
                  className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Select All Categories
                </button>
                <button
                  onClick={() => setSelectedCategories([])}
                  className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Clear Selection
                </button>
                <button
                  onClick={hasActiveSubscription ? handleStartQuiz : () => router.push('/pricing')}
                  disabled={selectedCategories.length === 0}
                  className="flex-1 py-2.5 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {hasActiveSubscription ? 'Start Quiz' : 'Subscribe to Practice'}
                </button>
              </div>
            </div>
          </div>

          {/* Performance by Category - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h2>
              
              {Object.entries(userProgress?.categoryProgress || {})
                .filter(([_, progress]: [string, any]) => progress.total > 0)
                .sort(([_, a]: [string, any], [__, b]: [string, any]) => 
                  (b.correct / b.total) - (a.correct / a.total)
                )
                .slice(0, 5)
                .map(([category, progress]: [string, any]) => {
                  const percentage = Math.round((progress.correct / progress.total) * 100);
                  return (
                    <div key={category} className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-900">{category}</span>
                        <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">
                          {progress.correct}/{progress.total} correct
                        </span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                
              {(!userProgress?.categoryProgress || 
                Object.values(userProgress.categoryProgress).filter((p: any) => p.total > 0).length === 0) && (
                <p className="text-sm text-gray-500 text-center py-8">
                  No data to display yet. Start practicing to see your performance.
                </p>
              )}

              {/* Actions Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => router.push('/review-mistakes')}
                    className="w-full py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Review Mistakes
                  </button>
                  <button
                    onClick={() => setSelectedCategories(QUESTION_CATEGORIES)}
                    className="w-full py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Select All Categories
                  </button>
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="w-full py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;