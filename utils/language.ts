export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ar' | 'ja' | 'pt' | 'ru' | 'hi' | 'ko' | 'it' | 'nl' | 'pl' | 'tr';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

export const LANGUAGES: Record<Language, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  nl: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  pl: { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
};

export const DEFAULT_LANGUAGE: Language = 'en';

// Country to language mapping
const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  // Americas
  'US': 'en', 'CA': 'en', 'MX': 'es', 'BR': 'pt', 'AR': 'es', 'CL': 'es', 'CO': 'es', 'PE': 'es',
  'VE': 'es', 'EC': 'es', 'BO': 'es', 'PY': 'es', 'UY': 'es', 'GT': 'es', 'HN': 'es', 'SV': 'es',
  'NI': 'es', 'CR': 'es', 'PA': 'es', 'DO': 'es', 'CU': 'es', 'PR': 'es',
  // Europe
  'GB': 'en', 'FR': 'fr', 'DE': 'de', 'ES': 'es', 'IT': 'it', 'NL': 'nl', 'PL': 'pl', 'RU': 'ru', 'TR': 'tr',
  'BE': 'fr', 'CH': 'de', 'AT': 'de', 'PT': 'pt', 'IE': 'en', 'LU': 'fr', 'MC': 'fr',
  // Asia
  'CN': 'zh', 'JP': 'ja', 'KR': 'ko', 'IN': 'hi', 'SA': 'ar', 'AE': 'ar', 'EG': 'ar',
  'SG': 'en', 'MY': 'en', 'TH': 'en', 'VN': 'en', 'PH': 'en', 'ID': 'en',
  // Oceania
  'AU': 'en', 'NZ': 'en',
  // Africa
  'ZA': 'en', 'NG': 'en', 'KE': 'en', 'MA': 'fr', 'DZ': 'fr', 'TN': 'fr',
};

// Timezone to country mapping for common timezones
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  // Americas
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Los_Angeles': 'US',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA',
  'America/Mexico_City': 'MX', 'America/Sao_Paulo': 'BR',
  'America/Buenos_Aires': 'AR', 'America/Santiago': 'CL',
  // Europe
  'Europe/London': 'GB', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL',
  'Europe/Warsaw': 'PL', 'Europe/Moscow': 'RU', 'Europe/Istanbul': 'TR',
  // Asia
  'Asia/Shanghai': 'CN', 'Asia/Tokyo': 'JP', 'Asia/Seoul': 'KR',
  'Asia/Kolkata': 'IN', 'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA',
  'Africa/Cairo': 'EG', 'Asia/Jerusalem': 'IL', 'Asia/Singapore': 'SG',
  // Oceania
  'Australia/Sydney': 'AU', 'Pacific/Auckland': 'NZ',
  // Africa
  'Africa/Johannesburg': 'ZA', 'Africa/Lagos': 'NG', 'Africa/Nairobi': 'KE',
};

function detectCountryFromTimezone(): string | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('Detected timezone:', timezone);
    return TIMEZONE_TO_COUNTRY[timezone] || null;
  } catch (error) {
    console.log('Timezone detection failed:', error);
    return null;
  }
}

async function tryAlternativeGeoServices(): Promise<string | null> {
  // Try alternative free IP geolocation services
  const services = [
    {
      url: 'https://geolocation-db.com/json/',
      extractor: (data: any) => data.country_code
    },
    {
      url: 'http://ip-api.com/json/?fields=countryCode',
      extractor: (data: any) => data.countryCode
    },
    {
      url: 'https://api.country.is/',
      extractor: (data: any) => data.country
    }
  ];

  for (const service of services) {
    try {
      const response = await fetch(service.url);
      if (response.ok) {
        const data = await response.json();
        const country = service.extractor(data);
        if (country) {
          console.log('Alternative geo service detected country:', country);
          return country;
        }
      }
    } catch (error) {
      console.log(`Service ${service.url} failed:`, error);
      // Continue to next service
    }
  }
  
  return null;
}

export async function detectRegionalLanguage(): Promise<Language> {
  // 1. Try primary IP geolocation service first (with timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      if (data.country_code && COUNTRY_TO_LANGUAGE[data.country_code]) {
        console.log('IP geolocation detected country:', data.country_code);
        return COUNTRY_TO_LANGUAGE[data.country_code];
      }
    }
  } catch (error) {
    console.log('Primary IP geolocation failed:', error);
  }

  // 2. Try alternative geo services
  const altCountry = await tryAlternativeGeoServices();
  if (altCountry && COUNTRY_TO_LANGUAGE[altCountry]) {
    return COUNTRY_TO_LANGUAGE[altCountry];
  }

  // 3. Fallback to timezone-based detection
  const timezoneCountry = detectCountryFromTimezone();
  if (timezoneCountry && COUNTRY_TO_LANGUAGE[timezoneCountry]) {
    console.log('Using timezone-based detection, country:', timezoneCountry);
    return COUNTRY_TO_LANGUAGE[timezoneCountry];
  }
  
  // 4. Final fallback to browser language detection
  console.log('All region detection methods failed, using browser language');
  return detectBrowserLanguage();
}

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language.split('-')[0];
  
  // Direct match
  if (browserLang in LANGUAGES) {
    return browserLang as Language;
  }
  
  // Try full locale match for country-specific
  const fullLocale = navigator.language;
  const country = fullLocale.split('-')[1]?.toUpperCase();
  if (country && COUNTRY_TO_LANGUAGE[country]) {
    return COUNTRY_TO_LANGUAGE[country];
  }
  
  return DEFAULT_LANGUAGE;
}

export function detectUserLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  // Check localStorage first
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage && savedLanguage in LANGUAGES) {
    return savedLanguage as Language;
  }
  
  // Then check browser language
  return detectBrowserLanguage();
}

export function saveLanguagePreference(language: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language);
  }
}

export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  // Always return 'ltr' - no UI flipping for any language including Arabic
  return 'ltr';
}