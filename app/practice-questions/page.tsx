'use client';

import { useState } from 'react';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Brain, Target, TrendingUp, Clock, Award, Filter, Play, Lock, ChevronRight } from 'lucide-react';

export default function PracticeQuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 15000 },
    { id: 'cardiology', name: 'Cardiology', count: 1250 },
    { id: 'respiratory', name: 'Respiratory', count: 980 },
    { id: 'neurology', name: 'Neurology', count: 1100 },
    { id: 'gastroenterology', name: 'Gastroenterology', count: 890 },
    { id: 'endocrinology', name: 'Endocrinology', count: 750 },
    { id: 'pharmacology', name: 'Pharmacology', count: 1420 },
    { id: 'anatomy', name: 'Anatomy', count: 1680 },
    { id: 'emergency', name: 'Emergency Medicine', count: 920 },
    { id: 'paediatrics', name: 'Paediatrics', count: 1030 },
    { id: 'obstetrics', name: 'Obstetrics & Gynaecology', count: 870 },
    { id: 'psychiatry', name: 'Psychiatry', count: 640 },
    { id: 'surgery', name: 'Surgery', count: 1150 },
  ];

  const questionSets = [
    {
      title: 'UKMLA Mock Exam 1',
      questions: 200,
      duration: '180 min',
      difficulty: 'Mixed',
      attempts: 1247,
      avgScore: 72,
      locked: false
    },
    {
      title: 'Cardiology Fundamentals',
      questions: 50,
      duration: '45 min',
      difficulty: 'Easy',
      attempts: 3421,
      avgScore: 81,
      locked: false
    },
    {
      title: 'Emergency Medicine Scenarios',
      questions: 75,
      duration: '60 min',
      difficulty: 'Hard',
      attempts: 892,
      avgScore: 68,
      locked: false
    },
    {
      title: 'Pharmacology Challenge',
      questions: 100,
      duration: '90 min',
      difficulty: 'Medium',
      attempts: 2156,
      avgScore: 75,
      locked: false
    },
    {
      title: 'Anatomy Quick Review',
      questions: 30,
      duration: '20 min',
      difficulty: 'Easy',
      attempts: 4523,
      avgScore: 84,
      locked: false
    },
    {
      title: 'Clinical Decision Making',
      questions: 60,
      duration: '50 min',
      difficulty: 'Hard',
      attempts: 0,
      avgScore: 0,
      locked: true
    }
  ];

  const studyModes = [
    {
      title: 'Timed Practice',
      description: 'Simulate exam conditions with time pressure',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Tutor Mode',
      description: 'Get instant feedback and explanations',
      icon: <Brain className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Targeted Practice',
      description: 'Focus on your weak areas',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Review Mode',
      description: 'Study previous mistakes',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-amber-50 border-amber-200'
    }
  ];

  const stats = [
    { label: 'Total Questions', value: '5,000+', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Mock Exams', value: '25', icon: <Award className="w-5 h-5" /> },
    { label: 'Average Score', value: '76%', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Active Users', value: '8,432', icon: <Brain className="w-5 h-5" /> }
  ];

  return (
    <>
      <PillNavigation />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">UKMLA Practice Questions</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master your medical knowledge with our comprehensive question bank designed specifically for UKMLA success
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-lg mb-3">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Study Modes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Study Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {studyModes.map((mode, index) => (
                <div key={index} className={`border rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer ${mode.color}`}>
                  <div className="mb-4">{mode.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{mode.title}</h3>
                  <p className="text-sm text-gray-600">{mode.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Filters */}
          <section className="mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2" />
                <h3 className="font-semibold text-gray-900">Filter Questions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Question Sets */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Question Sets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questionSets.map((set, index) => (
                <div key={index} className={`bg-white border border-gray-200 rounded-xl p-6 ${set.locked ? 'opacity-75' : 'hover:shadow-lg transition-shadow'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">{set.title}</h3>
                    {set.locked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <span className={`text-xs px-2 py-1 rounded ${
                        set.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        set.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        set.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {set.difficulty}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{set.questions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{set.duration}</span>
                    </div>
                    {!set.locked && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Attempts:</span>
                          <span className="font-medium">{set.attempts.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Avg Score:</span>
                          <span className="font-medium">{set.avgScore}%</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button 
                    className={`w-full flex items-center justify-center py-2 rounded-lg transition-colors ${
                      set.locked 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                    disabled={set.locked}
                  >
                    {set.locked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Unlock with Pro
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Practice
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Performance */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-6">Your Recent Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Last Practice Session</p>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-xs opacity-75">Cardiology - 40 questions</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Weekly Average</p>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-xs opacity-75">↑ 5% from last week</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Questions Completed</p>
                  <p className="text-2xl font-bold">2,456</p>
                  <p className="text-xs opacity-75">This month</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="text-center">
            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start Practice</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Jump right into practice with our intelligent question selection based on your performance
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Start Random Practice
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Focus on Weak Areas
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}