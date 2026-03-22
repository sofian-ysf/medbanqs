"use client";

import { usePathname } from 'next/navigation';

interface ConditionalNavFooterProps {
  children: React.ReactNode;
}

export default function ConditionalNavFooter({ 
  children,
}: ConditionalNavFooterProps) {
  // Since we only have the landing page, just render children
  return <>{children}</>;
}