"use client";

import React from "react";
import AudienceCard from "./AudienceCard";
import { TARGET_AUDIENCES } from "@/utils/constants";
import { useTranslation } from "@/contexts/TranslationContext";

const TargetAudienceSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
            {t('targetAudience.sectionTitle')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
            {t('targetAudience.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('targetAudience.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TARGET_AUDIENCES.map((audience, index) => {
            const audienceKey = ['startups', 'smallBusinesses', 'enterprises'][index];
            const translatedAudience = {
              ...audience,
              title: t(`targetAudience.${audienceKey}.title`),
              description: t(`targetAudience.${audienceKey}.description`),
              features: [
                t(`targetAudience.${audienceKey}.features.0`),
                t(`targetAudience.${audienceKey}.features.1`),
                t(`targetAudience.${audienceKey}.features.2`),
                t(`targetAudience.${audienceKey}.features.3`),
              ]
            };
            return (
              <AudienceCard key={index} audience={translatedAudience} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
