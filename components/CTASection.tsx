"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{ paddingBottom: "8rem" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight">
            Ready to ace your UKMLA?
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-2 sm:px-0">
            Join 5,000+ medical students achieving 94% pass rates with personalized learning
          </p>

          <div className="flex justify-center items-center px-4 sm:px-0">
            <a
              href="/pricing"
              className="w-full sm:w-auto max-w-xs group bg-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-white flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300 w-4 sm:w-5 h-4 sm:h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;