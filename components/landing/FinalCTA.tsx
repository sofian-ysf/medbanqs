import React from "react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-20 px-4 bg-warm-bg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
          Ready to pass your UKMLA?
        </h2>
        <p className="text-lg text-dark-secondary mb-8">
          Join 5,000+ students who've already started preparing with MedBanqs.
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

        {/* Trust Elements */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-dark-secondary">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure payment
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            7-day money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Instant access
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
