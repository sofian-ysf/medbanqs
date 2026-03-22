'use client';

import React from 'react';
import Link from 'next/link';

interface MoccetLogoProps {
  className?: string;
  imageClassName?: string;
  href?: string;
}

export default function MoccetLogo({ 
  className = '', 
  imageClassName = 'h-8 w-auto', 
  href = '/' 
}: MoccetLogoProps) {
  return (
    <Link href={href} className={`cursor-pointer ${className}`}>
      <img 
        src="/moccet-logo.png" 
        alt="moccet" 
        className={imageClassName}
      />
    </Link>
  );
}