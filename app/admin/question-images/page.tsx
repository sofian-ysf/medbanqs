'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  updateDoc,
  limit,
  where,
  orderBy,
  startAfter,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  Image as ImageIcon,
  Search,
  Upload,
  Save,
  Loader2,
  CheckCircle,
  X,
  Eye,
  Edit,
  Filter,
  Link,
  FileText,
  AlertCircle,
  Download,
  Trash2
} from 'lucide-react';
import { GeneratedQuestion, QuestionImage, QuestionCollection, QUESTION_COLLECTIONS } from '@/lib/questionGenerator';
import { DERMATOLOGY_IMAGE_MAP, RADIOLOGY_IMAGE_MAP, ECG_IMAGE_MAP, getImagesForQuestion } from '@/lib/imageManagement';
import Image from 'next/image';

interface QuestionWithId extends GeneratedQuestion {
  id: string;
  collection: QuestionCollection;
}

const IMAGE_CATEGORIES = [
  'dermatology',
  'radiology',
  'ecg',
  'pathology',
  'clinical-photo',
  'other'
];

const PREDEFINED_IMAGES = {
  dermatology: Object.entries(DERMATOLOGY_IMAGE_MAP).map(([key, img]) => ({
    name: key,
    ...img
  })),
  radiology: Object.entries(RADIOLOGY_IMAGE_MAP).map(([key, img]) => ({
    name: key,
    ...img
  })),
  ecg: Object.entries(ECG_IMAGE_MAP).map(([key, img]) => ({
    name: key,
    ...img
  }))
};

export default function QuestionImagesPage() {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Question state
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionWithId | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  
  // Filter state
  const [selectedCollection, setSelectedCollection] = useState<QuestionCollection | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNoImages, setFilterNoImages] = useState(false);
  const [filterWithImages, setFilterWithImages] = useState(false);
  
  // Image management state
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [imageLicense, setImageLicense] = useState('Educational Use');
  const [imagePosition, setImagePosition] = useState<'before-question' | 'after-question'>('before-question');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // UI state
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPredefinedImages, setShowPredefinedImages] = useState(false);
  const [selectedImageCategory, setSelectedImageCategory] = useState<string>('dermatology');
  
  // Pagination
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        loadQuestions();
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const loadQuestions = async (loadMore = false) => {
    setLoadingQuestions(true);
    try {
      const allQuestions: QuestionWithId[] = [];
      
      // Load from each collection
      for (const collectionName of QUESTION_COLLECTIONS) {
        if (selectedCollection !== 'all' && selectedCollection !== collectionName) continue;
        
        let q = query(
          collection(db, collectionName),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        
        if (loadMore && lastDoc) {
          q = query(
            collection(db, collectionName),
            orderBy('createdAt', 'desc'),
            startAfter(lastDoc),
            limit(10)
          );
        }
        
        const snapshot = await getDocs(q);
        
        snapshot.docs.forEach(doc => {
          const data = doc.data() as GeneratedQuestion;
          allQuestions.push({
            ...data,
            id: doc.id,
            collection: collectionName
          });
        });
        
        if (snapshot.docs.length > 0) {
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        }
        
        if (snapshot.docs.length < 10) {
          setHasMore(false);
        }
      }
      
      if (loadMore) {
        setQuestions(prev => [...prev, ...allQuestions]);
      } else {
        setQuestions(allQuestions);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setMessage({ type: 'error', text: 'Failed to load questions' });
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    setUploading(true);
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `medical-images/${selectedImageCategory}/${timestamp}_${file.name}`;
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, filename);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      setImageUrl(url);
      setPreviewImage(url);
      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedQuestion || !imageUrl) {
      setMessage({ type: 'error', text: 'Please select a question and provide an image URL' });
      return;
    }
    
    try {
      const newImage: QuestionImage = {
        url: imageUrl,
        alt: imageCaption || selectedQuestion.conditions,
        caption: imageCaption,
        position: imagePosition,
        source: imageSource,
        license: imageLicense
      };
      
      const updatedImages = [...(selectedQuestion.images || []), newImage];
      
      // Update in Firestore
      const questionRef = doc(db, selectedQuestion.collection, selectedQuestion.id);
      await updateDoc(questionRef, {
        images: updatedImages
      });
      
      // Update local state
      setSelectedQuestion({
        ...selectedQuestion,
        images: updatedImages
      });
      
      // Update in questions list
      setQuestions(prev => prev.map(q => 
        q.id === selectedQuestion.id 
          ? { ...q, images: updatedImages }
          : q
      ));
      
      // Clear form
      setImageUrl('');
      setImageCaption('');
      setImageSource('');
      setPreviewImage(null);
      
      setMessage({ type: 'success', text: 'Image added to question successfully!' });
    } catch (error) {
      console.error('Error saving image:', error);
      setMessage({ type: 'error', text: 'Failed to save image' });
    }
  };

  const handleRemoveImage = async (imageIndex: number) => {
    if (!selectedQuestion || !selectedQuestion.images) return;
    
    try {
      const updatedImages = selectedQuestion.images.filter((_, index) => index !== imageIndex);
      
      // Update in Firestore
      const questionRef = doc(db, selectedQuestion.collection, selectedQuestion.id);
      await updateDoc(questionRef, {
        images: updatedImages
      });
      
      // Update local state
      setSelectedQuestion({
        ...selectedQuestion,
        images: updatedImages
      });
      
      // Update in questions list
      setQuestions(prev => prev.map(q => 
        q.id === selectedQuestion.id 
          ? { ...q, images: updatedImages }
          : q
      ));
      
      setMessage({ type: 'success', text: 'Image removed successfully!' });
    } catch (error) {
      console.error('Error removing image:', error);
      setMessage({ type: 'error', text: 'Failed to remove image' });
    }
  };

  const handleAutoSuggestImages = () => {
    if (!selectedQuestion) return;
    
    const suggestedImages = getImagesForQuestion(
      selectedQuestion.conditions,
      selectedQuestion.category,
      selectedQuestion.question
    );
    
    if (suggestedImages.length > 0) {
      const firstImage = suggestedImages[0];
      setImageUrl(firstImage.url);
      setImageCaption(firstImage.caption || '');
      setImageSource(firstImage.source || '');
      setImageLicense(firstImage.license || 'Educational Use');
      setPreviewImage(firstImage.url);
      setMessage({ type: 'success', text: 'Suggested image loaded!' });
    } else {
      setMessage({ type: 'error', text: 'No suggested images found for this question' });
    }
  };

  const filteredQuestions = questions.filter(q => {
    // Filter by search term
    if (searchTerm && !q.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !q.conditions.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by image presence
    if (filterNoImages && q.images && q.images.length > 0) return false;
    if (filterWithImages && (!q.images || q.images.length === 0)) return false;
    
    return true;
  });

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
              <ImageIcon className="w-8 h-8 text-black mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Question Image Manager
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/question-generator')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Question Generator
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - Question List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Questions</h2>
              
              {/* Filters */}
              <div className="space-y-3 mb-4">
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Collections</option>
                  {QUESTION_COLLECTIONS.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFilterNoImages(!filterNoImages);
                      setFilterWithImages(false);
                    }}
                    className={`flex-1 px-2 py-1 text-xs rounded ${
                      filterNoImages ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    No Images
                  </button>
                  <button
                    onClick={() => {
                      setFilterWithImages(!filterWithImages);
                      setFilterNoImages(false);
                    }}
                    className={`flex-1 px-2 py-1 text-xs rounded ${
                      filterWithImages ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Has Images
                  </button>
                </div>
              </div>
              
              {/* Question List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {loadingQuestions ? (
                  <div className="text-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                  </div>
                ) : filteredQuestions.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No questions found</p>
                ) : (
                  filteredQuestions.map(q => (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuestion(q)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedQuestion?.id === q.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 mb-1">{q.collection}</p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {q.conditions}
                          </p>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                            {q.question.substring(0, 100)}...
                          </p>
                        </div>
                        {q.images && q.images.length > 0 && (
                          <div className="ml-2 flex items-center">
                            <ImageIcon className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600 ml-1">{q.images.length}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
              
              {hasMore && (
                <button
                  onClick={() => loadQuestions(true)}
                  className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  Load More
                </button>
              )}
            </div>
          </div>
          
          {/* Right Panel - Image Management */}
          <div className="lg:col-span-2">
            {selectedQuestion ? (
              <div className="space-y-4">
                {/* Selected Question Details */}
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-lg mb-3">Selected Question</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-gray-500">Category:</span>
                      <p className="text-sm">{selectedQuestion.category}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">Condition:</span>
                      <p className="text-sm">{selectedQuestion.conditions}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">Question:</span>
                      <p className="text-sm">{selectedQuestion.question}</p>
                    </div>
                  </div>
                </div>
                
                {/* Existing Images */}
                {selectedQuestion.images && selectedQuestion.images.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-semibold text-lg mb-3">Current Images</h3>
                    <div className="space-y-3">
                      {selectedQuestion.images.map((img, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="relative w-20 h-20 bg-white rounded overflow-hidden">
                            <Image
                              src={img.url}
                              alt={img.alt}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{img.caption || 'No caption'}</p>
                            <p className="text-xs text-gray-500">
                              Position: {img.position || 'before-question'}
                            </p>
                            <p className="text-xs text-gray-500">
                              Source: {img.source || 'Unknown'}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add New Image */}
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-lg mb-3">Add Image</h3>
                  
                  <div className="space-y-4">
                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={handleAutoSuggestImages}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                      >
                        Auto-Suggest Image
                      </button>
                      <button
                        onClick={() => setShowPredefinedImages(!showPredefinedImages)}
                        className="flex-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm"
                      >
                        Browse Library
                      </button>
                    </div>
                    
                    {/* Predefined Images Browser */}
                    {showPredefinedImages && (
                      <div className="border border-gray-200 rounded-lg p-3">
                        <select
                          value={selectedImageCategory}
                          onChange={(e) => setSelectedImageCategory(e.target.value)}
                          className="w-full mb-3 px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="dermatology">Dermatology</option>
                          <option value="radiology">Radiology</option>
                          <option value="ecg">ECG</option>
                        </select>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                          {PREDEFINED_IMAGES[selectedImageCategory as keyof typeof PREDEFINED_IMAGES]?.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setImageUrl(img.url);
                                setImageCaption(img.caption || '');
                                setImageSource(img.source || '');
                                setImageLicense(img.license || '');
                                setPreviewImage(img.url);
                                setShowPredefinedImages(false);
                              }}
                              className="text-left p-2 border border-gray-200 rounded hover:bg-gray-50 text-xs"
                            >
                              {img.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Image URL Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setPreviewImage(e.target.value);
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Or Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedFile(file);
                            handleFileUpload(file);
                          }
                        }}
                        className="w-full text-sm"
                      />
                    </div>
                    
                    {/* Image Preview */}
                    {previewImage && (
                      <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    
                    {/* Image Details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Caption
                        </label>
                        <input
                          type="text"
                          value={imageCaption}
                          onChange={(e) => setImageCaption(e.target.value)}
                          placeholder="Describe the image..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <select
                          value={imagePosition}
                          onChange={(e) => setImagePosition(e.target.value as any)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="before-question">Before Question</option>
                          <option value="after-question">After Question</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Source
                        </label>
                        <input
                          type="text"
                          value={imageSource}
                          onChange={(e) => setImageSource(e.target.value)}
                          placeholder="e.g., Clinical Database"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          License
                        </label>
                        <input
                          type="text"
                          value={imageLicense}
                          onChange={(e) => setImageLicense(e.target.value)}
                          placeholder="e.g., Educational Use"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <button
                      onClick={handleSaveImage}
                      disabled={!imageUrl || uploading}
                      className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {uploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Add Image to Question
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a question to manage its images</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Message Toast */}
        {message && (
          <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {message.text}
              <button
                onClick={() => setMessage(null)}
                className="ml-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}