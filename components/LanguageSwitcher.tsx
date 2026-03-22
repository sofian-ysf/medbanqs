"use client";

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation, translations } from '@/contexts/TranslationContext';
import { detectRegionalLanguage, LANGUAGES, Language } from '@/utils/language';

export default function LanguageSwitcher() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [regionalLanguage, setRegionalLanguage] = useState<Language>('en');
  const { language, setLanguage } = useTranslation();
  
  // Get available languages (those with translations)
  const availableLanguages = Object.keys(translations) as Language[];
  
  // Enable test mode with URL parameter ?testlang=true
  const isTestMode = typeof window !== 'undefined' && 
    new URLSearchParams(window.location.search).get('testlang') === 'true';

  // Detect regional language on mount
  useEffect(() => {
    const detectAndStoreRegional = async () => {
      setIsDetecting(true);
      try {
        const detected = await detectRegionalLanguage();
        // Only use the detected language if we have translations for it
        const validDetected = availableLanguages.includes(detected) ? detected : 'en';
        setRegionalLanguage(validDetected);
        console.log('Detected regional language:', detected, 'Using:', validDetected);
      } catch (error) {
        console.error('Error detecting regional language:', error);
      } finally {
        setIsDetecting(false);
      }
    };
    detectAndStoreRegional();
  }, []);

  const handleClick = async () => {
    console.log('Language switcher clicked. Current language:', language, 'Regional language:', regionalLanguage);
    
    if (isTestMode) {
      setShowTestMenu(!showTestMenu);
      return;
    }
    
    // Toggle between English and regional language
    if (language === 'en') {
      // If currently English and regional language is different, switch to regional
      if (regionalLanguage !== 'en') {
        console.log('Switching from English to regional language:', regionalLanguage);
        setLanguage(regionalLanguage);
      }
    } else {
      // If currently any other language, switch to English
      console.log('Switching to English from:', language);
      setLanguage('en');
    }
  };

  const handleTestLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowTestMenu(false);
  };

  // Determine tooltip text
  const getTooltipText = () => {
    if (isTestMode) return "Test language switcher";
    if (language === 'en' && regionalLanguage !== 'en') {
      return `Switch to ${LANGUAGES[regionalLanguage].name}`;
    }
    return "Switch to English";
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isDetecting}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 relative"
        aria-label="Toggle language"
        title={getTooltipText()}
      >
        <Globe 
          size={20} 
          className={`text-gray-600 ${isDetecting ? 'animate-spin' : ''}`} 
        />
        {/* Language indicator */}
        {!isTestMode && (
          <span className="absolute -top-1 -right-1 text-xs font-semibold bg-gray-800 text-white rounded px-1">
            {language.toUpperCase()}
          </span>
        )}
      </button>
      
      {isTestMode && showTestMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Test Languages</div>
          {availableLanguages.map((langCode) => {
            const lang = LANGUAGES[langCode];
            return (
              <button
                key={lang.code}
                onClick={() => handleTestLanguageSelect(lang.code)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-100 text-sm ${
                  language === lang.code ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                {lang.nativeName} ({lang.name})
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}