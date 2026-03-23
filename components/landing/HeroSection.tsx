import React from "react";
import Link from "next/link";

const STATS = [
  { value: "4.9/5", label: "Rating" },
  { value: "97%", label: "Pass Rate" },
  { value: "5,000+", label: "Questions" },
  { value: "5,000+", label: "Students" },
];

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-warm-bg to-white pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Trust Badge */}
        <div className="mb-6">
          <span className="inline-block bg-black/5 px-4 py-2 rounded-full text-sm text-dark-secondary">
            Trusted by 5,000+ medical students
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-text leading-tight mb-6">
          UKMLA Questions &<br />Practice Tests 2025
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-dark-secondary max-w-xl mx-auto mb-8">
          Thoughtfully designed practice questions with detailed explanations to help you pass with confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/pricing"
            className="pill-btn pill-btn-primary px-8 py-3 text-base font-medium w-full sm:w-auto text-center"
          >
            Get Started
          </Link>
          <Link
            href="#demo"
            className="pill-btn pill-btn-secondary px-8 py-3 text-base font-medium w-full sm:w-auto text-center"
          >
            Take Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-dark-text">{stat.value}</div>
              <div className="text-sm text-dark-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
