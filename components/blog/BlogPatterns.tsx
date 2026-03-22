import React from 'react';

// Medical-themed SVG patterns for blog cards
export const BlogPatterns = [
  // Pattern 1: DNA Helix
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 Q100 60 150 20" stroke="currentColor" strokeWidth="2" opacity="0.3" fill="none"/>
      <path d="M50 60 Q100 100 150 60" stroke="currentColor" strokeWidth="2" opacity="0.4" fill="none"/>
      <path d="M50 100 Q100 140 150 100" stroke="currentColor" strokeWidth="2" opacity="0.3" fill="none"/>
      <path d="M50 140 Q100 180 150 140" stroke="currentColor" strokeWidth="2" opacity="0.4" fill="none"/>
      <circle cx="50" cy="20" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="150" cy="20" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="100" cy="60" r="4" fill="currentColor" opacity="0.8"/>
      <circle cx="50" cy="100" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="150" cy="100" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="100" cy="140" r="4" fill="currentColor" opacity="0.8"/>
      <circle cx="50" cy="180" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="150" cy="180" r="4" fill="currentColor" opacity="0.6"/>
    </svg>
  ),

  // Pattern 2: Stethoscope Abstract
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="80" r="40" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>
      <path d="M60 80 Q100 120 140 80" stroke="currentColor" strokeWidth="2" opacity="0.4" fill="none"/>
      <circle cx="100" cy="140" r="15" fill="currentColor" opacity="0.2"/>
      <circle cx="100" cy="140" r="8" fill="currentColor" opacity="0.4"/>
      <line x1="100" y1="120" x2="100" y2="125" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      <ellipse cx="70" cy="60" rx="8" ry="12" fill="currentColor" opacity="0.3" transform="rotate(-20 70 60)"/>
      <ellipse cx="130" cy="60" rx="8" ry="12" fill="currentColor" opacity="0.3" transform="rotate(20 130 60)"/>
    </svg>
  ),

  // Pattern 3: Neural Network
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.8"/>
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.6"/>
      <circle cx="150" cy="50" r="6" fill="currentColor" opacity="0.6"/>
      <circle cx="50" cy="150" r="6" fill="currentColor" opacity="0.6"/>
      <circle cx="150" cy="150" r="6" fill="currentColor" opacity="0.6"/>
      <circle cx="30" cy="100" r="5" fill="currentColor" opacity="0.4"/>
      <circle cx="170" cy="100" r="5" fill="currentColor" opacity="0.4"/>
      <circle cx="100" cy="30" r="5" fill="currentColor" opacity="0.4"/>
      <circle cx="100" cy="170" r="5" fill="currentColor" opacity="0.4"/>
      <line x1="100" y1="100" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="100" x2="150" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="100" x2="50" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="100" x2="150" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="100" x2="30" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="100" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="100" y1="100" x2="100" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="100" y1="100" x2="100" y2="170" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    </svg>
  ),

  // Pattern 4: Heartbeat ECG
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 100 L40 100 L50 80 L60 120 L70 90 L80 110 L90 100 L200 100" 
            stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M0 130 L30 130 L40 110 L50 150 L60 120 L70 140 L80 130 L200 130" 
            stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <path d="M0 70 L35 70 L45 50 L55 90 L65 60 L75 80 L85 70 L200 70" 
            stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <circle cx="50" cy="80" r="3" fill="currentColor" opacity="0.6"/>
      <circle cx="70" cy="90" r="3" fill="currentColor" opacity="0.6"/>
      <circle cx="60" cy="120" r="3" fill="currentColor" opacity="0.6"/>
    </svg>
  ),

  // Pattern 5: Molecular Structure
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,40 140,70 140,130 100,160 60,130 60,70" 
               stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <circle cx="100" cy="40" r="8" fill="currentColor" opacity="0.6"/>
      <circle cx="140" cy="70" r="8" fill="currentColor" opacity="0.6"/>
      <circle cx="140" cy="130" r="8" fill="currentColor" opacity="0.6"/>
      <circle cx="100" cy="160" r="8" fill="currentColor" opacity="0.6"/>
      <circle cx="60" cy="130" r="8" fill="currentColor" opacity="0.6"/>
      <circle cx="60" cy="70" r="8" fill="currentColor" opacity="0.6"/>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.3"/>
      <line x1="100" y1="40" x2="100" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <line x1="140" y1="70" x2="100" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <line x1="60" y1="70" x2="100" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    </svg>
  ),

  // Pattern 6: Medical Cross Grid
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="85" y="40" width="30" height="120" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="85" width="120" height="30" fill="currentColor" opacity="0.2"/>
      <rect x="85" y="85" width="30" height="30" fill="currentColor" opacity="0.4"/>
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="150" cy="50" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="50" cy="150" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="150" cy="150" r="3" fill="currentColor" opacity="0.5"/>
    </svg>
  ),

  // Pattern 7: Cell Division
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="35" fill="currentColor" opacity="0.2"/>
      <circle cx="120" cy="120" r="35" fill="currentColor" opacity="0.2"/>
      <circle cx="80" cy="80" r="20" fill="currentColor" opacity="0.3"/>
      <circle cx="120" cy="120" r="20" fill="currentColor" opacity="0.3"/>
      <circle cx="80" cy="80" r="8" fill="currentColor" opacity="0.5"/>
      <circle cx="120" cy="120" r="8" fill="currentColor" opacity="0.5"/>
      <path d="M80 80 Q100 100 120 120" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none"/>
      <circle cx="60" cy="140" r="15" fill="currentColor" opacity="0.15"/>
      <circle cx="140" cy="60" r="15" fill="currentColor" opacity="0.15"/>
    </svg>
  ),

  // Pattern 8: Pulse Wave
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 100 Q50 60, 80 100 T140 100 T200 100" 
            stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M20 120 Q50 80, 80 120 T140 120 T200 120" 
            stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <path d="M20 80 Q50 40, 80 80 T140 80 T200 80" 
            stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <circle cx="50" cy="60" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="110" cy="100" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="170" cy="100" r="4" fill="currentColor" opacity="0.5"/>
      <ellipse cx="100" cy="100" rx="60" ry="30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2"/>
    </svg>
  ),

  // Pattern 9: Medical Equipment Abstract
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="40" width="40" height="80" rx="20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <circle cx="100" cy="140" r="20" fill="currentColor" opacity="0.2"/>
      <circle cx="100" cy="140" r="10" fill="currentColor" opacity="0.4"/>
      <line x1="100" y1="120" x2="100" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      <path d="M70 60 L130 60" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <path d="M70 80 L130 80" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <path d="M70 100 L130 100" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <circle cx="60" cy="40" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="140" cy="40" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="100" cy="20" r="3" fill="currentColor" opacity="0.5"/>
    </svg>
  ),

  // Pattern 10: Chromosome Pairs
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="70" cy="100" rx="15" ry="40" fill="currentColor" opacity="0.3" transform="rotate(-15 70 100)"/>
      <ellipse cx="130" cy="100" rx="15" ry="40" fill="currentColor" opacity="0.3" transform="rotate(15 130 100)"/>
      <circle cx="70" cy="100" r="5" fill="currentColor" opacity="0.6"/>
      <circle cx="130" cy="100" r="5" fill="currentColor" opacity="0.6"/>
      <path d="M70 60 Q100 50 130 60" stroke="currentColor" strokeWidth="2" opacity="0.4" fill="none"/>
      <path d="M70 140 Q100 150 130 140" stroke="currentColor" strokeWidth="2" opacity="0.4" fill="none"/>
    </svg>
  ),

  // Pattern 11: Synaptic Connection
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="100" r="20" fill="currentColor" opacity="0.3"/>
      <circle cx="150" cy="100" r="20" fill="currentColor" opacity="0.3"/>
      <path d="M70 100 L130 100" stroke="currentColor" strokeWidth="3" opacity="0.4"/>
      <circle cx="90" cy="100" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="110" cy="100" r="4" fill="currentColor" opacity="0.6"/>
      <path d="M50 80 Q100 70 150 80" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M50 120 Q100 130 150 120" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    </svg>
  ),

  // Pattern 12: Blood Cells Flow
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="80" rx="20" ry="12" fill="currentColor" opacity="0.3" transform="rotate(-20 60 80)"/>
      <ellipse cx="100" cy="100" rx="20" ry="12" fill="currentColor" opacity="0.4" transform="rotate(10 100 100)"/>
      <ellipse cx="140" cy="120" rx="20" ry="12" fill="currentColor" opacity="0.3" transform="rotate(-30 140 120)"/>
      <ellipse cx="80" cy="140" rx="20" ry="12" fill="currentColor" opacity="0.35" transform="rotate(25 80 140)"/>
      <ellipse cx="120" cy="60" rx="20" ry="12" fill="currentColor" opacity="0.35" transform="rotate(-10 120 60)"/>
    </svg>
  ),

  // Pattern 13: Antibody Y-Shape
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 140 L100 100 L70 50" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.4"/>
      <path d="M100 100 L130 50" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.4"/>
      <circle cx="70" cy="50" r="8" fill="currentColor" opacity="0.5"/>
      <circle cx="130" cy="50" r="8" fill="currentColor" opacity="0.5"/>
      <circle cx="100" cy="140" r="6" fill="currentColor" opacity="0.5"/>
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.6"/>
      <ellipse cx="55" cy="40" rx="5" ry="8" fill="currentColor" opacity="0.3" transform="rotate(-30 55 40)"/>
      <ellipse cx="145" cy="40" rx="5" ry="8" fill="currentColor" opacity="0.3" transform="rotate(30 145 40)"/>
    </svg>
  ),

  // Pattern 14: Lung Alveoli
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="25" fill="currentColor" opacity="0.2"/>
      <circle cx="75" cy="90" r="15" fill="currentColor" opacity="0.3"/>
      <circle cx="125" cy="90" r="15" fill="currentColor" opacity="0.3"/>
      <circle cx="100" cy="125" r="15" fill="currentColor" opacity="0.3"/>
      <circle cx="85" cy="115" r="12" fill="currentColor" opacity="0.25"/>
      <circle cx="115" cy="115" r="12" fill="currentColor" opacity="0.25"/>
      <circle cx="100" cy="75" r="12" fill="currentColor" opacity="0.25"/>
    </svg>
  ),

  // Pattern 15: Microscope View
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25"/>
      <circle cx="85" cy="85" r="12" fill="currentColor" opacity="0.4"/>
      <circle cx="115" cy="95" r="10" fill="currentColor" opacity="0.35"/>
      <circle cx="100" cy="120" r="8" fill="currentColor" opacity="0.4"/>
      <circle cx="90" cy="110" r="6" fill="currentColor" opacity="0.3"/>
      <line x1="30" y1="100" x2="40" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <line x1="160" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <line x1="100" y1="30" x2="100" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <line x1="100" y1="160" x2="100" y2="170" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
    </svg>
  ),

  // Pattern 16: Virus Structure
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="30" fill="currentColor" opacity="0.3"/>
      <circle cx="100" cy="70" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="100" cy="130" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="70" cy="100" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="130" cy="100" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="80" cy="80" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="120" cy="80" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="80" cy="120" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="120" cy="120" r="5" fill="currentColor" opacity="0.5"/>
      <line x1="100" y1="70" x2="100" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <line x1="100" y1="130" x2="100" y2="150" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <line x1="70" y1="100" x2="50" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <line x1="130" y1="100" x2="150" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
    </svg>
  ),

  // Pattern 17: Kidney Nephron
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 60 Q100 40 140 60 L140 120 Q100 140 60 120 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" opacity="0.4"/>
      <circle cx="100" cy="90" r="15" fill="currentColor" opacity="0.3"/>
      <path d="M100 105 Q120 120 100 140" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <circle cx="100" cy="140" r="5" fill="currentColor" opacity="0.5"/>
    </svg>
  ),

  // Pattern 18: Eye Iris
  () => (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <circle cx="100" cy="100" r="25" fill="currentColor" opacity="0.4"/>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.6"/>
      <path d="M75 100 L125 100" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M100 75 L100 125" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M82 82 L118 118" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <path d="M118 82 L82 118" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    </svg>
  ),
];

// Color palette for blog cards - muted, sophisticated tones
export const blogCardColors = [
  '#ABC09F', // Sage green (from top left)
  '#BAC4C6', // Cool gray-blue (from top middle)
  '#D3C6A3', // Warm beige/tan (from top right)
  '#AB9189', // Dusty rose/mauve (from middle left)
  '#C6BAC6', // Soft lavender (from middle middle)
  '#ABC09F', // Sage green (from middle right)
  '#B5C4CC', // Blue-gray (from bottom left)
  '#D3C6A3', // Warm beige (from bottom middle)
  '#BCA5A0', // Muted terracotta (from bottom right)
];