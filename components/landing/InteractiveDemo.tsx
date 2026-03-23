"use client";

import React, { useState } from "react";
import Link from "next/link";

const DEMO_QUESTION = {
  category: "Cardiology",
  question: "A 55-year-old man presents with central chest pain on exertion, relieved by rest. ECG shows ST depression in leads V4-V6. What is the most appropriate initial investigation?",
  options: [
    { id: "a", text: "Immediate coronary angiography" },
    { id: "b", text: "Troponin levels" },
    { id: "c", text: "Exercise stress test" },
    { id: "d", text: "Discharge with GP follow-up" },
  ],
  correctAnswer: "b",
  explanation: "Troponin levels should be measured first to rule out acute coronary syndrome. This is a time-sensitive investigation that guides immediate management.",
};

const InteractiveDemo = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id: string) => {
    if (showResult) return;
    setSelectedAnswer(id);
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === DEMO_QUESTION.correctAnswer;

  return (
    <section id="demo" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-sm text-dark-muted uppercase tracking-wider">
            Try a Sample Question
          </span>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-warm-bg rounded-full text-sm text-dark-secondary">
              {DEMO_QUESTION.category}
            </span>
            <span className="text-sm text-dark-muted">Question 1 of 3</span>
          </div>

          {/* Question Text */}
          <p className="text-lg text-dark-text mb-6 leading-relaxed">
            {DEMO_QUESTION.question}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {DEMO_QUESTION.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrectOption = option.id === DEMO_QUESTION.correctAnswer;

              let optionClass = "bg-gray-50 hover:bg-gray-100 border-transparent";
              if (showResult) {
                if (isCorrectOption) {
                  optionClass = "bg-green-50 border-green-500 text-green-800";
                } else if (isSelected && !isCorrectOption) {
                  optionClass = "bg-red-50 border-red-500 text-red-800";
                }
              } else if (isSelected) {
                optionClass = "bg-blue-50 border-blue-500";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${optionClass} ${!showResult && "cursor-pointer"}`}
                >
                  <span className="font-medium">{option.id.toUpperCase()})</span> {option.text}
                  {showResult && isCorrectOption && <span className="ml-2">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
              <p className="text-sm font-medium mb-1">
                {isCorrect ? "Correct!" : "Not quite right"}
              </p>
              <p className="text-sm text-dark-secondary">
                {DEMO_QUESTION.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showResult ? (
              <>
                <button
                  onClick={handleReset}
                  className="pill-btn pill-btn-secondary px-6 py-3 text-sm font-medium"
                >
                  Try Again
                </button>
                <Link
                  href="/try-free"
                  className="pill-btn pill-btn-primary px-6 py-3 text-sm font-medium text-center"
                >
                  Try 15 Free Questions →
                </Link>
              </>
            ) : (
              <p className="text-sm text-dark-muted text-center">
                Select an answer to see the explanation
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
