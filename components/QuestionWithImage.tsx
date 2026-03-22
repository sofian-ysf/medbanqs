import React, { useState } from 'react';
import Image from 'next/image';
import { QuestionImage } from '@/lib/questionGenerator';
import { ZoomIn, Info, ExternalLink } from 'lucide-react';

interface QuestionWithImageProps {
  question: string;
  options: string[];
  images?: QuestionImage[];
  onAnswerSelect?: (answer: string) => void;
  showAnswer?: boolean;
  correctAnswer?: string;
}

export default function QuestionWithImage({
  question,
  options,
  images,
  onAnswerSelect,
  showAnswer,
  correctAnswer
}: QuestionWithImageProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<QuestionImage | null>(null);

  const handleAnswerClick = (answer: string) => {
    if (!showAnswer) {
      setSelectedAnswer(answer);
      onAnswerSelect?.(answer);
    }
  };

  const handleImageClick = (image: QuestionImage) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const beforeQuestionImages = images?.filter(img => img.position === 'before-question' || !img.position);
  const afterQuestionImages = images?.filter(img => img.position === 'after-question');

  return (
    <div className="space-y-4">
      {/* Images before question */}
      {beforeQuestionImages && beforeQuestionImages.length > 0 && (
        <div className="space-y-3">
          {beforeQuestionImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="relative h-64 md:h-96 w-full bg-gray-50">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-contain cursor-zoom-in transition-transform group-hover:scale-105"
                    onClick={() => handleImageClick(image)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <button
                    onClick={() => handleImageClick(image)}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-colors"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
                
                {/* Image caption and metadata */}
                {(image.caption || image.source) && (
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    {image.caption && (
                      <p className="text-sm text-gray-700 mb-1">{image.caption}</p>
                    )}
                    {image.source && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Info className="h-3 w-3" />
                        <span>Source: {image.source}</span>
                        {image.license && <span> • {image.license}</span>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Question text */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-lg font-medium text-gray-900 leading-relaxed">
          {question}
        </p>
      </div>

      {/* Answer options */}
      <div className="space-y-2">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = correctAnswer === option;
          const showResult = showAnswer && (isSelected || isCorrect);
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={showAnswer}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : isSelected
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              } ${showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start">
                <span className="font-medium text-gray-900">{option}</span>
                {showResult && (
                  <span className="ml-auto">
                    {isCorrect ? (
                      <span className="text-green-600 font-semibold">✓</span>
                    ) : isSelected ? (
                      <span className="text-red-600 font-semibold">✗</span>
                    ) : null}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Images after question */}
      {afterQuestionImages && afterQuestionImages.length > 0 && (
        <div className="space-y-3 mt-4">
          {afterQuestionImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="relative h-64 md:h-96 w-full bg-gray-50">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-contain cursor-zoom-in transition-transform group-hover:scale-105"
                    onClick={() => handleImageClick(image)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <button
                    onClick={() => handleImageClick(image)}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-colors"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
                
                {(image.caption || image.source) && (
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    {image.caption && (
                      <p className="text-sm text-gray-700 mb-1">{image.caption}</p>
                    )}
                    {image.source && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Info className="h-3 w-3" />
                        <span>Source: {image.source}</span>
                        {image.license && <span> • {image.license}</span>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image modal for full-size viewing */}
      {imageModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            
            {/* Modal caption */}
            {(selectedImage.caption || selectedImage.source) && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {selectedImage.caption && (
                  <p className="text-base text-gray-700 mb-2">{selectedImage.caption}</p>
                )}
                {selectedImage.source && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Info className="h-4 w-4" />
                    <span>Source: {selectedImage.source}</span>
                    {selectedImage.license && <span> • {selectedImage.license}</span>}
                  </div>
                )}
              </div>
            )}
            
            {/* Close button */}
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}