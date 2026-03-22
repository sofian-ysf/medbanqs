"use client";

import React from "react";
import { Play, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mobileDescription: string;
  category: string;
  deliveryTime: string;
  costSavings: string;
  results: Record<string, string>;
  logo: string;
  featured?: boolean;
}

const CaseStudiesSection: React.FC = () => {
  const { t } = useTranslation();
  const caseStudies: CaseStudy[] = [
    {
      id: "techflow",
      title: t('caseStudies.techflow.title'),
      subtitle: t('caseStudies.techflow.subtitle'),
      description: t('caseStudies.techflow.description'),
      mobileDescription: t('caseStudies.techflow.mobileDescription'),
      category: t('caseStudies.techflow.category'),
      deliveryTime: "3 days",
      costSavings: "75%",
      results: {
        Satisfaction: "98%",
        "Cost Reduction": "60%",
      },
      logo: "TF",
    },
    {
      id: "healthplus",
      title: t('caseStudies.healthvault.title'),
      subtitle: t('caseStudies.healthvault.subtitle'),
      description: t('caseStudies.healthvault.description'),
      mobileDescription: t('caseStudies.healthvault.mobileDescription'),
      category: t('caseStudies.healthvault.category'),
      deliveryTime: "1 week",
      costSavings: "70%",
      results: {
        Compliance: "100%",
        Efficiency: "90% faster",
      },
      logo: "H+",
    },
    {
      id: "financeai",
      title: t('caseStudies.tradepro.title'),
      subtitle: t('caseStudies.tradepro.subtitle'),
      description: t('caseStudies.tradepro.description'),
      mobileDescription: t('caseStudies.tradepro.mobileDescription'),
      category: t('caseStudies.tradepro.category'),
      deliveryTime: "2 weeks",
      costSavings: "80%",
      results: {
        "Trading Volume": "300% increase",
        "Risk Reduction": "65%",
      },
      logo: "FA",
      featured: true,
    },
    {
      id: "retailmax",
      title: t('caseStudies.retailmax.title'),
      subtitle: t('caseStudies.retailmax.subtitle'),
      description: t('caseStudies.retailmax.description'),
      mobileDescription: t('caseStudies.retailmax.mobileDescription'),
      category: t('caseStudies.retailmax.category'),
      deliveryTime: "10 days",
      costSavings: "65%",
      results: {
        "Sales Increase": "150%",
        "Conversion Rate": "85% higher",
      },
      logo: "RM",
    },
  ];

  return (
    <section className="py-16 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
            {t('caseStudies.sectionTitle')}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            {t('caseStudies.title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('caseStudies.subtitle')}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 ${
                study.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {study.featured && (
                <div className="absolute top-6 right-6 z-20">
                  <div className="flex items-center gap-2 bg-brand-purple text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                    <Play className="w-3 h-3" fill="currentColor" />
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {study.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-1 ">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{study.category}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {study.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                  {study.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(study.results).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center group-hover:bg-white group-hover:border-brand-purple/20 transition-all duration-300"
                    >
                      <div className="text-2xl font-bold text-black mb-1 ">
                        {value}
                      </div>
                      <div className="text-sm text-gray-600">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{t('caseStudies.deliveryTime')}: {study.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">
                        {t('caseStudies.costSavings')}: {study.costSavings}
                      </span>
                    </div>
                  </div>

                  <button className="group/btn flex items-center gap-2 text-brand-purple font-semibold text-sm hover:gap-3 transition-all duration-300">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Hover overlay */}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <div className="bg-white rounded-3xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
              {t('caseStudies.cta.title')}
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {t('caseStudies.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2">
                <span>{t('caseStudies.cta.startProject')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-300 text-gray-700 hover:border-brand-purple hover:text-brand-purple transition-all duration-300 transform hover:scale-105">
                {t('caseStudies.cta.viewAll')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
