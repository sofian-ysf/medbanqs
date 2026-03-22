"use client";

import React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

export const SeamlessSecretSauceText = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-2xl">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 border border-black rounded-lg flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-black rounded-sm"></div>
        </div>
        <span className="text-sm font-semibold text-black tracking-wider uppercase">
          {t('seamless.secretSauce.badge')}
        </span>
      </div>

      <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
        {t('seamless.secretSauce.title')}
      </h2>

      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        {t('seamless.secretSauce.description')}
      </p>

      <div className="mb-8">
        <div className="text-6xl sm:text-7xl font-bold text-brand-purple mb-4">
          {t('seamless.secretSauce.metric')}
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('seamless.secretSauce.metricLabel')}
        </p>
      </div>
    </div>
  );
};

export const SeamlessBriefGeneratorText = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-2xl">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 border border-black rounded-lg flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-black rounded-sm"></div>
        </div>
        <span className="text-sm font-semibold text-black tracking-wider uppercase">
          {t('seamless.briefGenerator.badge')}
        </span>
      </div>

      <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
        {t('seamless.briefGenerator.title')}
      </h2>

      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        {t('seamless.briefGenerator.description')}
      </p>

      <div className="mb-8">
        <div className="text-6xl sm:text-7xl font-bold text-brand-purple mb-4">
          {t('seamless.briefGenerator.metric')}
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('seamless.briefGenerator.metricLabel')}
        </p>
      </div>
    </div>
  );
};

export const SeamlessPricingText = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-2xl">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 border border-black rounded-lg flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-black rounded-sm"></div>
        </div>
        <span className="text-sm font-semibold text-black tracking-wider uppercase">
          {t('seamless.pricing.badge')}
        </span>
      </div>

      <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
        {t('seamless.pricing.title')}
      </h2>

      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        {t('seamless.pricing.description')}
      </p>

      <div className="mb-8">
        <div className="text-6xl sm:text-7xl font-bold text-brand-purple mb-4">
          {t('seamless.pricing.metric')}
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('seamless.pricing.metricLabel')}
        </p>
      </div>
    </div>
  );
};

export const SeamlessStatsText = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-2xl">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 border border-black rounded-lg flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-black rounded-sm"></div>
        </div>
        <span className="text-sm font-semibold text-black tracking-wider uppercase">
          {t('seamless.stats.badge')}
        </span>
      </div>

      <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
        {t('seamless.stats.title')}
      </h2>

      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        {t('seamless.stats.description')}
      </p>

      <div className="mb-8">
        <div className="text-6xl sm:text-7xl font-bold text-brand-purple mb-4">
          {t('seamless.stats.metric')}
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('seamless.stats.metricLabel')}
        </p>
      </div>
    </div>
  );
};

export const SeamlessQualityObsessionText = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-2xl">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 border border-black rounded-lg flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-black rounded-sm"></div>
        </div>
        <span className="text-sm font-semibold text-black tracking-wider uppercase">
          {t('seamless.qualityObsession.badge')}
        </span>
      </div>

      <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
        {t('seamless.qualityObsession.title')}
      </h2>

      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        {t('seamless.qualityObsession.description')}
      </p>

      <div className="space-y-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-xs font-bold flex-shrink-0 mt-1">
            ✓
          </div>
          <span className="text-lg text-gray-700">
            {t('seamless.qualityObsession.features.0')}
          </span>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-xs font-bold flex-shrink-0 mt-1">
            ✓
          </div>
          <span className="text-lg text-gray-700">
            {t('seamless.qualityObsession.features.1')}
          </span>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-xs font-bold flex-shrink-0 mt-1">
            ✓
          </div>
          <span className="text-lg text-gray-700">
            {t('seamless.qualityObsession.features.2')}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-6xl sm:text-7xl font-bold text-brand-purple mb-4">
          {t('seamless.qualityObsession.metric')}
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('seamless.qualityObsession.metricLabel')}
        </p>
      </div>
    </div>
  );
};