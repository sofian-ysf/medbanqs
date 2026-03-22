'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  XCircle,
  BookOpen,
  RotateCcw,
  Flag,
  Home,
  Check,
  X
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Question, UserProgress } from '@/types';
import { useSubscription } from '@/lib/useSubscription';
import QuestionWithImage from '@/components/QuestionWithImage';

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

const QuestionsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    wrong: 0,
    total: 0
  });
  const [answeredQuestions, setAnsweredQuestions] = useState<{[key: number]: boolean}>({});
  const { isActive: hasActiveSubscription, isLoading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Wait for subscription check to complete
        if (!subscriptionLoading) {
          if (hasActiveSubscription) {
            await loadQuestions();
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

  const loadQuestions = async () => {
    try {
      const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories') || '[]');
      
      if (selectedCategories.length === 0) {
        router.push('/dashboard');
        return;
      }

      const allQuestions: Question[] = [];
      
      // Fetch questions from each selected category
      for (const category of selectedCategories) {
        const collectionName = categoryToCollection(category);
        const categoryCollection = collection(db, collectionName);
        const snapshot = await getDocs(categoryCollection);
        
        snapshot.forEach((doc) => {
          allQuestions.push({
            id: doc.id,
            ...doc.data()
          } as Question);
        });
      }

      // Shuffle questions
      const shuffled = allQuestions.sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return; // Prevent changing answer after submission
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !user) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Update session stats and track answered questions
    setSessionStats(prev => ({
      correct: correct ? prev.correct + 1 : prev.correct,
      wrong: correct ? prev.wrong : prev.wrong + 1,
      total: prev.total + 1
    }));
    
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: correct
    }));

    // Update user progress in Firestore
    try {
      const userProgressRef = doc(db, 'userProgress', user.uid);
      const progressDoc = await getDoc(userProgressRef);
      
      if (progressDoc.exists()) {
        const currentProgress = progressDoc.data() as UserProgress;
        
        // Update overall stats
        const updatedProgress: Partial<UserProgress> = {
          totalQuestions: currentProgress.totalQuestions + 1,
          correctAnswers: correct ? currentProgress.correctAnswers + 1 : currentProgress.correctAnswers,
          wrongAnswers: correct ? currentProgress.wrongAnswers : currentProgress.wrongAnswers + 1,
          categoryProgress: {
            ...currentProgress.categoryProgress,
            [currentQuestion.category]: {
              total: (currentProgress.categoryProgress[currentQuestion.category]?.total || 0) + 1,
              correct: correct 
                ? (currentProgress.categoryProgress[currentQuestion.category]?.correct || 0) + 1 
                : (currentProgress.categoryProgress[currentQuestion.category]?.correct || 0),
              wrong: correct 
                ? (currentProgress.categoryProgress[currentQuestion.category]?.wrong || 0)
                : (currentProgress.categoryProgress[currentQuestion.category]?.wrong || 0) + 1,
              lastAttempted: new Date()
            }
          },
          questionsAttempted: {
            ...currentProgress.questionsAttempted,
            [currentQuestion.id]: {
              attemptedAt: new Date(),
              isCorrect: correct,
              selectedAnswer: selectedAnswer
            }
          }
        };

        await updateDoc(userProgressRef, updatedProgress);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    } else {
      // Session complete
      handleEndSession();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);
  };

  const handleEndSession = () => {
    // Store session results in localStorage for potential summary page
    const accuracy = sessionStats.total > 0 
      ? Math.round((sessionStats.correct / sessionStats.total) * 100) 
      : 0;
      
    localStorage.setItem('lastSessionStats', JSON.stringify({
      total: sessionStats.total,
      correct: sessionStats.correct,
      wrong: sessionStats.wrong,
      accuracy: accuracy,
      completedAt: new Date().toISOString()
    }));
    
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">No questions found in selected categories.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const calculateScore = () => {
    if (sessionStats.total === 0) return 0;
    return Math.round((sessionStats.correct / sessionStats.total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
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
              <div>
                <h1 className="text-lg font-medium text-gray-900">Practice Session</h1>
                <p className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleEndSession}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Progress Tracker */}
        <div className="w-48 bg-white border-r border-gray-200 min-h-screen p-4">
          <div className="sticky top-4">
            {/* Score Display */}
            <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Score</p>
              <p className="text-2xl font-bold text-gray-900">{calculateScore()}%</p>
            </div>

            {/* Question List */}
            <div className="space-y-2">
              {questions.map((_, index) => {
                const isAnswered = answeredQuestions.hasOwnProperty(index);
                const isCorrect = answeredQuestions[index];
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={index}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      isCurrent 
                        ? 'bg-blue-100 border-2 border-blue-500' 
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      isCurrent ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {index + 1}
                    </span>
                    {isAnswered && (
                      <span className={`text-lg ${
                        isCorrect ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Category and Topic */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              {currentQuestion.category}
            </span>
            {currentQuestion.conditions && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span>{currentQuestion.conditions}</span>
              </>
            )}
          </div>

          {/* Question with Image Component */}
          <QuestionWithImage
            question={currentQuestion.question}
            options={currentQuestion.options}
            images={currentQuestion.images}
            onAnswerSelect={handleAnswerSelect}
            showAnswer={showExplanation}
            correctAnswer={showExplanation ? currentQuestion.correctAnswer : undefined}
          />

          {/* Submit/Next Button */}
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <div className="space-y-4">
              {/* Result Message */}
              <div className={`p-4 rounded-lg ${
                isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'
              }`}>
                <div className="flex items-center gap-2 font-semibold mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Correct
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      Incorrect
                    </>
                  )}
                </div>
                <p className="text-sm">{currentQuestion.explanation}</p>
                {currentQuestion.guideline && (
                  <p className="text-xs mt-2 opacity-75">
                    Reference: {currentQuestion.guideline}
                  </p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Finish Session
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;