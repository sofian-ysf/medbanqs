import { Metadata } from 'next';
import PillNavigation from '@/components/landing/PillNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, Brain, Target, CheckCircle, AlertCircle, Coffee, Heart, Calendar, BookOpen, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exam Tips - MedBanqs',
  description: 'Expert tips and strategies to excel in your UKMLA exam. Learn from top performers and medical educators.',
};

export default function ExamTipsPage() {
  const examStrategies = [
    {
      category: 'Time Management',
      icon: <Clock className="w-6 h-6" />,
      tips: [
        'Allocate 1.5 minutes per question initially',
        'Flag difficult questions and return later',
        'Leave 15 minutes for review at the end',
        'Practice with timed mock exams regularly'
      ]
    },
    {
      category: 'Question Approach',
      icon: <Target className="w-6 h-6" />,
      tips: [
        'Read the question stem carefully first',
        'Look for keywords and qualifiers',
        'Eliminate obviously wrong answers',
        'Trust your first instinct unless certain'
      ]
    },
    {
      category: 'Mental Preparation',
      icon: <Brain className="w-6 h-6" />,
      tips: [
        'Practice mindfulness and meditation',
        'Visualize success before the exam',
        'Use positive self-talk',
        'Take deep breaths when feeling anxious'
      ]
    },
    {
      category: 'Physical Wellness',
      icon: <Heart className="w-6 h-6" />,
      tips: [
        'Get 7-8 hours of sleep before exam',
        'Eat a balanced breakfast',
        'Stay hydrated throughout',
        'Do light exercise the day before'
      ]
    }
  ];

  const weekBeforeExam = [
    { day: 'Day 7', task: 'Complete final mock exam', detail: 'Simulate real exam conditions' },
    { day: 'Day 6', task: 'Review weak topics', detail: 'Focus on problem areas identified' },
    { day: 'Day 5', task: 'Practice time management', detail: 'Do timed question sets' },
    { day: 'Day 4', task: 'Review high-yield topics', detail: 'Focus on commonly tested areas' },
    { day: 'Day 3', task: 'Light revision only', detail: 'Review notes and summaries' },
    { day: 'Day 2', task: 'Organize exam materials', detail: 'Prepare everything needed' },
    { day: 'Day 1', task: 'Rest and relax', detail: 'Light review, early sleep' },
    { day: 'Exam Day', task: 'Execute your plan', detail: 'Stay calm and confident' }
  ];

  const commonMistakes = [
    {
      mistake: 'Changing answers without reason',
      solution: 'Only change if you find clear evidence of error',
      impact: 'High'
    },
    {
      mistake: 'Spending too long on difficult questions',
      solution: 'Flag and move on, return if time permits',
      impact: 'High'
    },
    {
      mistake: 'Not reading questions completely',
      solution: 'Read every word, especially negatives like "NOT" or "EXCEPT"',
      impact: 'Critical'
    },
    {
      mistake: 'Panicking when unsure',
      solution: 'Use elimination strategy and make educated guess',
      impact: 'Medium'
    },
    {
      mistake: 'Poor time management',
      solution: 'Practice with timer, check progress at intervals',
      impact: 'High'
    },
    {
      mistake: 'Overthinking simple questions',
      solution: 'Trust your knowledge, avoid creating complexity',
      impact: 'Medium'
    }
  ];

  const examDayChecklist = [
    { item: 'Admission ticket/confirmation', checked: false },
    { item: 'Valid photo ID', checked: false },
    { item: 'Multiple pens (black ink)', checked: false },
    { item: 'Calculator (if allowed)', checked: false },
    { item: 'Water bottle', checked: false },
    { item: 'Healthy snacks', checked: false },
    { item: 'Watch (analog)', checked: false },
    { item: 'Comfortable layers of clothing', checked: false },
    { item: 'Tissues', checked: false },
    { item: 'Emergency contact info', checked: false }
  ];

  const performanceTips = [
    {
      title: 'Start Strong',
      description: 'Begin with questions you find easier to build confidence and momentum.'
    },
    {
      title: 'Strategic Guessing',
      description: 'Never leave blanks. Eliminate wrong options and make educated guesses.'
    },
    {
      title: 'Pattern Recognition',
      description: 'UKMLA often tests similar concepts in different ways. Recognize patterns.'
    },
    {
      title: 'Clinical Reasoning',
      description: 'Think like a doctor - consider patient safety and best practice first.'
    },
    {
      title: 'Stay Focused',
      description: 'Take micro-breaks: close eyes for 10 seconds every 30 minutes.'
    },
    {
      title: 'Review Strategy',
      description: 'First review flagged questions, then any unanswered, then others if time.'
    }
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">UKMLA Exam Tips & Strategies</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master the art of exam-taking with proven strategies from top performers and medical educators
            </p>
          </div>

          {/* Key Strategies */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Exam Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examStrategies.map((strategy, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white rounded-lg mr-3">
                      {strategy.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{strategy.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Week Before Exam Timeline */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Final Week Preparation Timeline</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {weekBeforeExam.map((item, index) => (
                  <div key={index} className={`bg-white rounded-lg p-4 ${item.day === 'Exam Day' ? 'ring-2 ring-black' : ''}`}>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="font-semibold text-gray-900">{item.day}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{item.task}</p>
                    <p className="text-xs text-gray-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mistake</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {commonMistakes.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.mistake}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.solution}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          item.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                          item.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Exam Day Checklist */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Exam Day Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Essential Items</h3>
                <div className="space-y-3">
                  {examDayChecklist.map((item, index) => (
                    <label key={index} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
                      <span className="ml-3 text-gray-700">{item.item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Important Reminders</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Arrive 30 minutes early</li>
                      <li>• Know your exam center location</li>
                      <li>• Check transport arrangements</li>
                      <li>• Review exam regulations</li>
                      <li>• Turn off mobile devices</li>
                      <li>• Bring backup pens</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">During the Exam: Performance Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceTips.map((tip, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Expert Advice */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-6">Expert Advice from Top Scorers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <blockquote className="text-sm italic mb-3">
                    "The key is consistency. I practiced questions every single day for 3 months before the exam. 
                    It's not about cramming, it's about building a strong foundation."
                  </blockquote>
                  <p className="text-xs opacity-90">- Sarah M., 95th percentile</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <blockquote className="text-sm italic mb-3">
                    "Understanding why wrong answers are wrong is just as important as knowing the right answer. 
                    I spent equal time reviewing my mistakes."
                  </blockquote>
                  <p className="text-xs opacity-90">- James L., 92nd percentile</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <blockquote className="text-sm italic mb-3">
                    "Mock exams under timed conditions were game-changers. They helped me manage anxiety 
                    and improved my time management significantly."
                  </blockquote>
                  <p className="text-xs opacity-90">- Priya K., 94th percentile</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <blockquote className="text-sm italic mb-3">
                    "Don't neglect your physical health. Regular exercise and good sleep improved my 
                    concentration and memory retention dramatically."
                  </blockquote>
                  <p className="text-xs opacity-90">- Ahmed R., 91st percentile</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gray-50 rounded-xl p-8">
              <TrendingUp className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Apply These Strategies?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Practice with our intelligent question bank and mock exams designed to help you master these techniques
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/practice-questions" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Start Practicing
                </Link>
                <Link href="/study-guides" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Study Guides
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}