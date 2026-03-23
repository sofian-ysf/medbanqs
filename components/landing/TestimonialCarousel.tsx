"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "MedBanqs helped me pass on my first attempt! The questions were so similar to the actual exam.",
    author: "Sarah M.",
    institution: "UCL Graduate",
  },
  {
    quote: "The detailed explanations really helped me understand the reasoning behind each answer.",
    author: "James K.",
    institution: "Manchester Graduate",
  },
  {
    quote: "I improved my score by 20% in just two months of practice. Highly recommend!",
    author: "Priya S.",
    institution: "King's College Graduate",
  },
  {
    quote: "The progress tracking kept me motivated throughout my preparation.",
    author: "Ahmed R.",
    institution: "Nottingham Graduate",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-text">
            What our students say
          </h2>
        </div>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-warm-bg rounded-2xl p-8 text-center">
            <p className="text-lg text-dark-text italic mb-6">
              "{TESTIMONIALS[currentIndex].quote}"
            </p>
            <p className="font-medium text-dark-text">
              {TESTIMONIALS[currentIndex].author}
            </p>
            <p className="text-sm text-dark-muted">
              {TESTIMONIALS[currentIndex].institution}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-dark-secondary" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-dark-text" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-dark-secondary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
