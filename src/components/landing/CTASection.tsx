"use client";

import React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const CTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto text-center">
        <div className="animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              {t("cta.startProject")}
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              {t("cta.talkToExpert")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;