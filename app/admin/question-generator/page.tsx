'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import questionGenerationService, { GenerationResponse, generateBatchWithProgress } from '@/lib/questionGenerationService';
import { QuestionCollection, GeneratedQuestion } from '@/lib/questionGenerator';
import { 
  Brain, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Copy,
  RefreshCw,
  Settings,
  Database
} from 'lucide-react';

const COLLECTIONS: QuestionCollection[] = [
  'ENT',
  'Musculoskeletal',
  'Obstetrics and gynaecology',
  'Perioperative medicine and anaesthesia',
  'acute & emergency',
  'all areas of clinical practice',
  'cancer',
  'cardiovascular',
  'child health',
  'clinical haematology',
  'endocrine & metabolic',
  'gastrointestinal including liver',
  'general practice and primary healthcare',
  'infection',
  'medicine of older adult',
  'mental health',
  'neuroscience',
  'ophthalmology',
  'palliative & end of life care',
  'renal & urology',
  'respiratory',
  'sexual health',
  'surgery'
];

const SCENARIOS = [
  { value: 'emergency', label: 'Emergency/Acute' },
  { value: 'chronic', label: 'Chronic Disease' },
  { value: 'pediatric', label: 'Pediatric Case' },
  { value: 'geriatric', label: 'Geriatric Case' },
  { value: 'primary-care', label: 'Primary Care' }
];

const DATA_TYPES = [
  { value: 'mixed', label: 'Mixed (Clinical + Data)' },
  { value: 'labs', label: 'Laboratory Results' },
  { value: 'imaging', label: 'Imaging Findings' },
  { value: 'ecg', label: 'ECG Interpretation' }
];

export default function QuestionGeneratorPage() {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Form state
  const [selectedCollection, setSelectedCollection] = useState<QuestionCollection>('cardiovascular');
  const [generationType, setGenerationType] = useState<'single' | 'batch' | 'scenario' | 'data'>('single');
  const [batchCount, setBatchCount] = useState(5);
  const [selectedScenario, setSelectedScenario] = useState<string>('emergency');
  const [selectedDataType, setSelectedDataType] = useState<string>('mixed');
  const [topics, setTopics] = useState<string>('');
  const [saveToDb, setSaveToDb] = useState(true);
  
  // Results state
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [lastResponse, setLastResponse] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Progress state
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
    percentage: number;
    message: string;
  } | null>(null);
  const [liveQuestions, setLiveQuestions] = useState<GeneratedQuestion[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Check if user is admin (you should implement proper admin check)
        setUser(firebaseUser);
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      let response: GenerationResponse;
      
      switch (generationType) {
        case 'single':
          response = await questionGenerationService.generateSingleQuestion(
            selectedCollection,
            topics || undefined,
            saveToDb
          );
          if (response.question) {
            setGeneratedQuestions([response.question]);
          }
          break;
          
        case 'batch':
          const topicsArray = topics ? topics.split(',').map(t => t.trim()) : undefined;
          
          // Use streaming for large batches
          if (batchCount > 10) {
            setLiveQuestions([]);
            const questions = await generateBatchWithProgress(
              selectedCollection,
              batchCount,
              topicsArray,
              saveToDb,
              (data) => {
                // Handle progress updates
                if (data.type === 'progress') {
                  setProgress({
                    current: data.current,
                    total: data.total,
                    percentage: data.percentage,
                    message: data.message
                  });
                } else if (data.type === 'question') {
                  // Add question to live list
                  setLiveQuestions(prev => [...prev, data.question]);
                } else if (data.type === 'complete') {
                  setProgress(null);
                }
              }
            );
            setGeneratedQuestions(questions);
            response = {
              success: true,
              collection: selectedCollection,
              questions,
              saved: saveToDb,
              count: questions.length,
              timestamp: new Date().toISOString()
            };
          } else {
            // Use regular API for small batches
            response = await questionGenerationService.generateBatchQuestions(
              selectedCollection,
              batchCount,
              topicsArray,
              saveToDb
            );
            if (response.questions) {
              setGeneratedQuestions(response.questions);
            }
          }
          break;
          
        case 'scenario':
          response = await questionGenerationService.generateScenarioQuestion(
            selectedCollection,
            selectedScenario as any,
            saveToDb
          );
          if (response.question) {
            setGeneratedQuestions([response.question]);
          }
          break;
          
        case 'data':
          // Generate data interpretation questions
          const dataQuestions: GeneratedQuestion[] = [];
          
          // Always show progress for data interpretation since it's slower
          if (batchCount > 1) {
            setLiveQuestions([]);
            
            // Generate multiple data interpretation questions
            for (let i = 0; i < batchCount; i++) {
              try {
                setProgress({
                  current: i + 1,
                  total: batchCount,
                  percentage: Math.round(((i + 1) / batchCount) * 100),
                  message: `Generating data interpretation question ${i + 1} of ${batchCount}...`
                });
                
                const apiResponse = await fetch('/api/questions/generate', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.NEXT_PUBLIC_QUESTION_API_KEY || ''
                  },
                  body: JSON.stringify({
                    action: 'generateDataInterpretation',
                    collection: selectedCollection,
                    dataType: selectedDataType,
                    questionIndex: i + 1,
                    saveToDb
                  })
                });
                
                const result = await apiResponse.json();
                if (result.question) {
                  dataQuestions.push(result.question);
                  setLiveQuestions(prev => [...prev, result.question]);
                }
                
                // Add longer delay to avoid rate limiting with data interpretation
                if (i < batchCount - 1) {
                  await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 seconds between calls
                }
              } catch (err) {
                console.error(`Error generating data question ${i + 1}:`, err);
              }
            }
            
            setProgress(null);
            setGeneratedQuestions(dataQuestions);
            response = {
              success: true,
              collection: selectedCollection,
              questions: dataQuestions,
              saved: saveToDb,
              count: dataQuestions.length,
              timestamp: new Date().toISOString()
            };
          } else {
            // For single question only
            try {
              const apiResponse = await fetch('/api/questions/generate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': process.env.NEXT_PUBLIC_QUESTION_API_KEY || ''
                },
                body: JSON.stringify({
                  action: 'generateDataInterpretation',
                  collection: selectedCollection,
                  dataType: selectedDataType,
                  questionIndex: 1,
                  saveToDb
                })
              });
              
              const result = await apiResponse.json();
              if (result.question) {
                dataQuestions.push(result.question);
              }
            } catch (err) {
              console.error('Error generating data question:', err);
            }
            
            setGeneratedQuestions(dataQuestions);
            response = {
              success: true,
              collection: selectedCollection,
              questions: dataQuestions,
              saved: saveToDb,
              count: dataQuestions.length,
              timestamp: new Date().toISOString()
            };
          }
          break;
          
        default:
          throw new Error('Invalid generation type');
      }
      
      setLastResponse(response);
      setSuccessMessage(
        `Successfully generated ${response.count || 1} question(s)${
          saveToDb ? ' and saved to database' : ''
        }`
      );
    } catch (err) {
      console.error('Generation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate questions';
      
      // Special handling for OpenAI quota errors
      if (errorMessage.includes('no credits')) {
        setError('⚠️ OpenAI API has no credits. Please add credits at https://platform.openai.com/account/billing');
      } else {
        setError(errorMessage);
      }
    } finally {
      setGenerating(false);
      setProgress(null);
    }
  };

  const copyToClipboard = (question: GeneratedQuestion) => {
    const text = JSON.stringify(question, null, 2);
    navigator.clipboard.writeText(text);
    setSuccessMessage('Question copied to clipboard!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const downloadQuestions = () => {
    if (generatedQuestions.length === 0) return;
    
    const dataStr = JSON.stringify(generatedQuestions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `questions_${selectedCollection}_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-black mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                AI Question Generator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin: {user?.email}</span>
              <button
                onClick={() => router.push('/admin/question-images')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Manage Images
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Generation Settings
              </h2>
              
              {/* Collection Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection
                </label>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value as QuestionCollection)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {COLLECTIONS.map((collection) => (
                    <option key={collection} value={collection}>
                      {collection}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generation Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generation Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="single"
                      checked={generationType === 'single'}
                      onChange={(e) => setGenerationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span className="text-sm">Single Question</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="batch"
                      checked={generationType === 'batch'}
                      onChange={(e) => setGenerationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span className="text-sm">Batch Generation</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="scenario"
                      checked={generationType === 'scenario'}
                      onChange={(e) => setGenerationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span className="text-sm">Scenario-Based</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="data"
                      checked={generationType === 'data'}
                      onChange={(e) => setGenerationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span className="text-sm">Data Interpretation</span>
                  </label>
                </div>
              </div>

              {/* Batch Count */}
              {(generationType === 'batch' || generationType === 'data') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={batchCount}
                    onChange={(e) => setBatchCount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <div className="mt-2 text-xs text-gray-600">
                    <p>• 1-10: Fast generation (~10-20 seconds)</p>
                    <p>• 11-20: Moderate (~20-40 seconds)</p>
                    <p>• 21-50: Slower (~1-2 minutes)</p>
                    <p className="text-amber-600 mt-1">⚠️ Max 50 questions per batch</p>
                  </div>
                </div>
              )}

              {/* Scenario Selection */}
              {generationType === 'scenario' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scenario Type
                  </label>
                  <select
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {SCENARIOS.map((scenario) => (
                      <option key={scenario.value} value={scenario.value}>
                        {scenario.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Data Type Selection */}
              {generationType === 'data' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Type Focus
                  </label>
                  <select
                    value={selectedDataType}
                    onChange={(e) => setSelectedDataType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {DATA_TYPES.map((dataType) => (
                      <option key={dataType.value} value={dataType.value}>
                        {dataType.label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 text-xs text-gray-500">
                    <p className="font-medium mb-1">Each question will include:</p>
                    {selectedDataType === 'labs' && (
                      <p>• Lab results with abnormal values and reference ranges</p>
                    )}
                    {selectedDataType === 'imaging' && (
                      <p>• Imaging findings (X-ray, CT, MRI descriptions)</p>
                    )}
                    {selectedDataType === 'ecg' && (
                      <p>• ECG findings and interpretation</p>
                    )}
                    {selectedDataType === 'mixed' && (
                      <p>• Mix of labs, imaging, and ECG data</p>
                    )}
                  </div>
                </div>
              )}

              {/* Topics */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topics (optional)
                </label>
                <input
                  type="text"
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  placeholder="e.g., Myocardial infarction, Heart failure"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Comma-separated for batch generation
                </p>
              </div>

              {/* Save to Database */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={saveToDb}
                    onChange={(e) => setSaveToDb(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Save to Database</span>
                </label>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {progress ? progress.message : 'Generating...'}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Questions
                  </>
                )}
              </button>
              
              {/* Progress Bar */}
              {progress && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{progress.current} of {progress.total}</span>
                    <span>{progress.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Messages */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <p className="text-sm text-green-700">{successMessage}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {/* Live Generation Progress */}
            {generating && liveQuestions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  Live Generation Progress ({liveQuestions.length} generated)
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {liveQuestions.slice(-3).map((q, i) => (
                    <div key={i} className="text-xs text-blue-700">
                      ✓ {q.conditions} - {q.presentation}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Generated Questions ({generatedQuestions.length})
                </h2>
                {generatedQuestions.length > 0 && (
                  <button
                    onClick={downloadQuestions}
                    className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download JSON
                  </button>
                )}
              </div>

              {generatedQuestions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No questions generated yet</p>
                  <p className="text-sm mt-2">
                    Configure settings and click Generate to create questions
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {generatedQuestions.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-medium text-gray-500">
                            Question {index + 1}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {question.category}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              {question.presentation}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(question)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">
                            Question:
                          </h4>
                          <p className="text-sm text-gray-900">{question.question}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">
                            Options:
                          </h4>
                          <ul className="space-y-1">
                            {question.options.map((option, optIndex) => (
                              <li
                                key={optIndex}
                                className={`text-sm ${
                                  option === question.correctAnswer
                                    ? 'text-green-700 font-medium'
                                    : 'text-gray-700'
                                }`}
                              >
                                {option}
                                {option === question.correctAnswer && ' ✓'}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">
                            Explanation:
                          </h4>
                          <p className="text-sm text-gray-700">{question.explanation}</p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            Condition: {question.conditions}
                          </span>
                          <span className="text-xs text-gray-500">
                            {question.guideline}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}