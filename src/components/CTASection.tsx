"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

const CTASection: React.FC = () => {
  const { t } = useTranslation();
  
  const handleGetStarted = () => {
    console.log("Get Started clicked");
  };

  const handleRequestDemo = () => {
    console.log("Request Demo clicked");
  };

  return (
    <section className="py-16 sm:py-24" style={{ paddingBottom: "12rem" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
            <span className="hidden sm:inline bg-black to-black bg-clip-text text-transparent">
              {t('cta.title')}
            </span>
            <span className="sm:hidden text-5xl font-black">
              {t('cta.title')}
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            <span className="hidden sm:inline">
              {t('cta.subtitle')}
            </span>
            <span className="sm:hidden">{t('cta.subtitle')}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto group bg-black px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-white flex items-center justify-center"
            >
              {t('cta.startProject')}
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300 w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleRequestDemo}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold border-2 border-black hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <span className="hidden sm:inline">{t('cta.talkToExpert')}</span>
              <span className="sm:hidden">{t('cta.talkToExpert')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;