'use client';

import React from 'react';
import { TranslationProvider } from '@/contexts/TranslationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      {children}
    </TranslationProvider>
  );
}