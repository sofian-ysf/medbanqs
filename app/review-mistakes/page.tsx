'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  AlertCircle, 
  ChevronLeft,
  ChevronRight,
  Home,
  RefreshCw,
  CheckCircle,
  XCircle,
  BookOpen,
  Clock,
  BarChart3,
  Filter
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Question, UserProgress, QUESTION_CATEGORIES } from '@/types';
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

interface MistakeQuestion extends Question {
  userAnswer: string;
  attemptedAt: Date;
}

const ReviewMistakesPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mistakes, setMistakes] = useState<MistakeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredMistakes, setFilteredMistakes] = useState<MistakeQuestion[]>([]);
  const { isActive: hasActiveSubscription, isLoading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Wait for subscription check to complete
        if (!subscriptionLoading) {
          if (hasActiveSubscription) {
            await loadMistakes(firebaseUser.uid);
          } else {
            router.push('/pricing');
          }
        }
      } else {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router, hasActiveSubscription, subscriptionLoading]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredMistakes(mistakes);
    } else {
      setFilteredMistakes(mistakes.filter(m => m.category === selectedCategory));
    }
    setCurrentIndex(0);
  }, [selectedCategory, mistakes]);

  const loadMistakes = async (userId: string) => {
    try {
      const userProgressRef = doc(db, 'userProgress', userId);
      const progressDoc = await getDoc(userProgressRef);
      
      if (!progressDoc.exists()) {
        setLoading(false);
        return;
      }

      const userProgress = progressDoc.data() as UserProgress;
      const mistakeQuestions: MistakeQuestion[] = [];

      // Get all questions that were answered incorrectly
      const incorrectQuestions = Object.entries(userProgress.questionsAttempted || {})
        .filter(([_, attempt]) => !attempt.isCorrect);

      // Fetch the actual question data for each mistake
      for (const [questionId, attempt] of incorrectQuestions) {
        // We need to search through all categories to find this question
        let questionFound = false;
        
        for (const category of QUESTION_CATEGORIES) {
          if (questionFound) break;
          
          const collectionName = categoryToCollection(category);
          const questionDoc = await getDoc(doc(db, collectionName, questionId));
          
          if (questionDoc.exists()) {
            mistakeQuestions.push({
              id: questionDoc.id,
              ...questionDoc.data(),
              userAnswer: attempt.selectedAnswer,
              attemptedAt: attempt.attemptedAt
            } as MistakeQuestion);
            questionFound = true;
          }
        }
      }

      // Sort by most recent attempts first
      mistakeQuestions.sort((a, b) => {
        const dateA = a.attemptedAt instanceof Date ? a.attemptedAt : new Date(a.attemptedAt);
        const dateB = b.attemptedAt instanceof Date ? b.attemptedAt : new Date(b.attemptedAt);
        return dateB.getTime() - dateA.getTime();
      });

      setMistakes(mistakeQuestions);
      setFilteredMistakes(mistakeQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error loading mistakes:', error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredMistakes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const getUniqueCategories = () => {
    const categories = new Set(mistakes.map(m => m.category));
    return Array.from(categories).sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your mistakes...</p>
        </div>
      </div>
    );
  }

  if (mistakes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Mistakes to Review!</h2>
          <p className="text-gray-600 mb-6">
            Great job! You haven't made any mistakes yet. Keep practicing to maintain your perfect record.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (filteredMistakes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-medium text-gray-900">Review Mistakes</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center flex-1 p-8">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Mistakes in This Category</h2>
            <p className="text-gray-600 mb-6">
              You haven't made any mistakes in the selected category.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              View All Mistakes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentMistake = filteredMistakes[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-medium text-gray-900">Review Mistakes</h1>
                <p className="text-sm text-gray-500">
                  {currentIndex + 1} of {filteredMistakes.length} mistakes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories ({mistakes.length})</option>
                {getUniqueCategories().map(category => {
                  const count = mistakes.filter(m => m.category === category).length;
                  return (
                    <option key={category} value={category}>
                      {category} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-red-600 h-1 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / filteredMistakes.length) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Category and Metadata */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              {currentMistake.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>
                Attempted {currentMistake.attemptedAt instanceof Date 
                  ? currentMistake.attemptedAt.toLocaleDateString() 
                  : new Date(currentMistake.attemptedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-lg font-medium text-gray-900 mb-8 leading-relaxed">
            {currentMistake.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentMistake.options.map((option, index) => {
              const isCorrect = option === currentMistake.correctAnswer;
              const isUserAnswer = option === currentMistake.userAnswer;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? 'border-emerald-600 bg-emerald-50'
                      : isUserAnswer
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${
                      isCorrect
                        ? 'text-emerald-900 font-medium'
                        : isUserAnswer
                        ? 'text-red-900'
                        : 'text-gray-700'
                    }`}>
                      {option}
                    </span>
                    {isCorrect && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm text-emerald-700 font-medium">Correct Answer</span>
                      </div>
                    )}
                    {isUserAnswer && !isCorrect && (
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-700 font-medium">Your Answer</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Explanation
            </h3>
            <p className="text-blue-800">{currentMistake.explanation}</p>
            {currentMistake.guideline && (
              <p className="text-sm text-blue-700 mt-3">
                <span className="font-medium">Reference:</span> {currentMistake.guideline}
              </p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              {currentIndex + 1} / {filteredMistakes.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredMistakes.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Mistake Analysis
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{mistakes.length}</div>
              <div className="text-sm text-gray-600">Total Mistakes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{getUniqueCategories().length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((mistakes.length / (mistakes.length + (user ? 100 : 0))) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Error Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewMistakesPage;