# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild MasterMLA landing page with PreRegExamPrep styling, remove all AI mentions, optimize for conversion across all devices.

**Architecture:** Clean slate rebuild with new components. Delete AI-heavy legacy components. Create 10 new focused components matching PreRegExamPrep patterns. Mobile-first responsive design with warm cream color palette.

**Tech Stack:** Next.js 14, React, Tailwind CSS, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-14-landing-page-redesign.md`

---

## File Structure

### Files to Create

| File | Responsibility |
|------|----------------|
| `components/landing/PillNavigation.tsx` | Single centered pill navbar with glassmorphism |
| `components/landing/HeroSection.tsx` | Centered hero with trust badge, headline, CTAs, stats |
| `components/landing/InstitutionsBelt.tsx` | Scrolling university logos |
| `components/landing/InteractiveDemo.tsx` | Sample question card experience |
| `components/landing/FeaturesGrid.tsx` | 3-column feature cards |
| `components/landing/TestimonialCarousel.tsx` | Sliding testimonials with arrows |
| `components/landing/PricingCards.tsx` | 3 pricing plan cards |
| `components/landing/FAQAccordion.tsx` | Expandable FAQ items |
| `components/landing/BlogPreview.tsx` | Latest 3 blog post cards |
| `components/landing/FinalCTA.tsx` | Closing conversion section |
| `styles/landing.css` | Landing page specific styles (pill, glassmorphism) |

### Files to Modify

| File | Changes |
|------|---------|
| `app/page.tsx` | Replace all imports with new landing components |
| `app/layout.tsx` | Remove AI meta tags (lines 136-141) |
| `app/globals.css` | Add warm color CSS variables |
| `tailwind.config.js` | Add warm cream color palette |

### Files to Delete

| File | Reason |
|------|--------|
| `components/ShowcasesSection.tsx` | AI demos |
| `components/SeamlessScrollSection.tsx` | AI features |
| `components/SeamlessTextComponents.tsx` | AI content |
| `components/UKMLADemo.tsx` | AI chat interface |
| `components/AnimatedTypeWriter.tsx` | Contains "With AI" |
| `components/ProcessSection.tsx` | Unused, has AI refs |
| `components/MediaWrappers.tsx` | Used by SeamlessScrollSection |

---

## Chunk 1: Setup and AI Removal

### Task 1: Update Tailwind Config with Warm Colors

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Read current tailwind config**

- [ ] **Step 2: Add warm color palette**

Add to `theme.extend.colors`:

```javascript
warm: {
  bg: '#fbfaf4',
  card: '#ffffff',
},
dark: {
  text: '#1a1a1a',
  secondary: '#4a4a4a',
  muted: '#999999',
},
success: {
  DEFAULT: '#22c55e',
  dark: '#16a34a',
},
```

Add to `theme.extend.animation`:

```javascript
animation: {
  marquee: 'marquee 30s linear infinite',
},
keyframes: {
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
},
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: add warm color palette to tailwind config"
```

---

### Task 2: Add Landing Page CSS Utilities

**Files:**
- Create: `styles/landing.css`
- Modify: `app/globals.css`

- [ ] **Step 1: Create landing.css with pill and glassmorphism styles**

```css
/* Pill Navigation Styles */
.pill-nav {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.pill-nav.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
}

.pill-btn {
  border-radius: 9999px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.pill-btn:hover {
  transform: translateY(-1px);
}

.pill-btn-primary {
  background: #1a1a1a;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.pill-btn-primary:hover {
  background: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pill-btn-secondary {
  background: rgba(0, 0, 0, 0.05);
  color: #1a1a1a;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.pill-btn-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.15);
}

/* Mobile Menu */
.mobile-menu {
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-overlay {
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-overlay.open {
  opacity: 1;
}

/* Card Hover */
.card-hover {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* FAQ Accordion */
.faq-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.faq-content.open {
  max-height: 500px;
}
```

- [ ] **Step 2: Import landing.css in globals.css**

Add at end of `app/globals.css`:

```css
@import '../styles/landing.css';
```

- [ ] **Step 3: Commit**

```bash
git add styles/landing.css app/globals.css
git commit -m "feat: add landing page CSS utilities"
```

---

### Task 3: Remove AI Meta Tags from Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Read current layout.tsx**

- [ ] **Step 2: Remove AI meta tags (lines ~136-141)**

Delete these lines:
```tsx
<meta name="ai-content-type" content="medical-education-platform" />
<meta name="ai-features" content="AI-powered-explanations,personalized-study-plans,performance-analytics" />
<meta name="ai-capability" content="question-answering,adaptive-learning,score-prediction" />
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "chore: remove AI meta tags from layout"
```

---

### Task 4: Delete Legacy AI Components

**Files:**
- Delete: `components/ShowcasesSection.tsx`
- Delete: `components/SeamlessScrollSection.tsx`
- Delete: `components/SeamlessTextComponents.tsx`
- Delete: `components/UKMLADemo.tsx`
- Delete: `components/AnimatedTypeWriter.tsx`
- Delete: `components/ProcessSection.tsx`
- Delete: `components/MediaWrappers.tsx`

- [ ] **Step 1: Delete all legacy AI components**

```bash
rm components/ShowcasesSection.tsx
rm components/SeamlessScrollSection.tsx
rm components/SeamlessTextComponents.tsx
rm components/UKMLADemo.tsx
rm components/AnimatedTypeWriter.tsx
rm components/ProcessSection.tsx
rm components/MediaWrappers.tsx
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: delete legacy AI-heavy components"
```

---

## Chunk 2: Navigation Component

### Task 5: Create PillNavigation Component

**Files:**
- Create: `components/landing/PillNavigation.tsx`

- [ ] **Step 1: Create the component directory**

```bash
mkdir -p components/landing
```

- [ ] **Step 2: Create PillNavigation.tsx**

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, Settings, LogOut, CreditCard, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

const NAV_ITEMS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

const PillNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  // Hide nav on dashboard pages when logged in
  const hideNavPages = ["/dashboard", "/questions", "/review-mistakes"];
  if (user && hideNavPages.some(page => pathname.startsWith(page))) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 py-4 px-4">
        <div className="flex justify-center">
          <div className={`pill-nav ${isScrolled ? "scrolled" : ""} px-3 py-1.5 flex items-center gap-5`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/mastermla-logo.png" alt="MasterMLA" className="h-7 w-7 rounded-md" />
              <span className="font-semibold text-dark-text hidden sm:block">MasterMLA</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm text-dark-secondary hover:text-dark-text hover:bg-black/5 rounded-full transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-black/10" />

            {/* Auth Buttons */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {getUserDisplayName().slice(0, 2).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4 text-dark-secondary" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-dark-text">{getUserDisplayName()}</p>
                      <p className="text-xs text-dark-muted">{user.email}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-dark-secondary hover:bg-gray-50">
                      <BookOpen className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/subscription" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-dark-secondary hover:bg-gray-50">
                      <CreditCard className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>
                    <Link href="/account-settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-dark-secondary hover:bg-gray-50">
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth" className="px-4 py-2 text-sm text-dark-secondary hover:text-dark-text transition-colors">
                  Log in
                </Link>
                <Link href="/auth" className="pill-btn pill-btn-primary px-5 py-2 text-sm font-medium">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 mobile-overlay open md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 mobile-menu ${isMenuOpen ? "open" : ""} md:hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <img src="/mastermla-logo.png" alt="MasterMLA" className="h-7 w-7 rounded-md" />
            <span className="font-semibold text-dark-text">MasterMLA</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-dark-text font-medium hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          {user ? (
            <div className="space-y-3">
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-dark-text">{getUserDisplayName()}</p>
                <p className="text-xs text-dark-muted">{user.email}</p>
              </div>
              <Link href="/dashboard" className="block w-full pill-btn pill-btn-primary py-3 text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="block w-full py-3 text-center text-red-600 font-medium">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/auth" className="block w-full pill-btn pill-btn-primary py-3 text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
              <Link href="/auth" className="block w-full pill-btn pill-btn-secondary py-3 text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Log in
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PillNavigation;
```

- [ ] **Step 3: Commit**

```bash
git add components/landing/PillNavigation.tsx
git commit -m "feat: add PillNavigation component with glassmorphism"
```

---

## Chunk 3: Hero and Institutions

### Task 6: Create HeroSection Component

**Files:**
- Create: `components/landing/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection.tsx**

```tsx
import React from "react";
import Link from "next/link";

const STATS = [
  { value: "4.8/5", label: "Rating" },
  { value: "94%", label: "Pass Rate" },
  { value: "5,000+", label: "Questions" },
  { value: "5,000+", label: "Students" },
];

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-warm-bg to-white pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Trust Badge */}
        <div className="mb-6">
          <span className="inline-block bg-black/5 px-4 py-2 rounded-full text-sm text-dark-secondary">
            Trusted by 5,000+ medical students
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-text leading-tight mb-6">
          UKMLA Questions &<br />Practice Tests 2025
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-dark-secondary max-w-xl mx-auto mb-8">
          Thoughtfully designed practice questions with detailed explanations to help you pass with confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/auth"
            className="pill-btn pill-btn-primary px-8 py-3 text-base font-medium w-full sm:w-auto text-center"
          >
            Get Started
          </Link>
          <Link
            href="#demo"
            className="pill-btn pill-btn-secondary px-8 py-3 text-base font-medium w-full sm:w-auto text-center"
          >
            Take Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-dark-text">{stat.value}</div>
              <div className="text-sm text-dark-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/HeroSection.tsx
git commit -m "feat: add HeroSection component with centered layout"
```

---

### Task 7: Create InstitutionsBelt Component

**Files:**
- Create: `components/landing/InstitutionsBelt.tsx`

- [ ] **Step 1: Create InstitutionsBelt.tsx**

```tsx
import React from "react";

const INSTITUTIONS = [
  "University College London",
  "University of Manchester",
  "University of Nottingham",
  "King's College London",
  "University of Bath",
  "Cardiff University",
  "University of Brighton",
  "Queen's University Belfast",
  "Keele University",
];

const InstitutionsBelt = () => {
  return (
    <section className="bg-warm-bg py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm text-dark-muted mb-8">
          Students from top UK medical schools trust MasterMLA
        </p>

        {/* Scrolling Belt - uses Tailwind animation */}
        <div className="relative">
          <div className="flex gap-12 animate-marquee">
            {[...INSTITUTIONS, ...INSTITUTIONS].map((name, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-6 py-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <span className="text-sm font-medium text-dark-secondary whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionsBelt;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/InstitutionsBelt.tsx
git commit -m "feat: add InstitutionsBelt component with scroll animation"
```

---

## Chunk 4: Demo and Features

### Task 8: Create InteractiveDemo Component

**Files:**
- Create: `components/landing/InteractiveDemo.tsx`

- [ ] **Step 1: Create InteractiveDemo.tsx**

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

const DEMO_QUESTION = {
  category: "Cardiology",
  question: "A 55-year-old man presents with central chest pain on exertion, relieved by rest. ECG shows ST depression in leads V4-V6. What is the most appropriate initial investigation?",
  options: [
    { id: "a", text: "Immediate coronary angiography" },
    { id: "b", text: "Troponin levels" },
    { id: "c", text: "Exercise stress test" },
    { id: "d", text: "Discharge with GP follow-up" },
  ],
  correctAnswer: "b",
  explanation: "Troponin levels should be measured first to rule out acute coronary syndrome. This is a time-sensitive investigation that guides immediate management.",
};

const InteractiveDemo = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id: string) => {
    if (showResult) return;
    setSelectedAnswer(id);
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === DEMO_QUESTION.correctAnswer;

  return (
    <section id="demo" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-sm text-dark-muted uppercase tracking-wider">
            Try a Sample Question
          </span>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-warm-bg rounded-full text-sm text-dark-secondary">
              {DEMO_QUESTION.category}
            </span>
            <span className="text-sm text-dark-muted">Question 1 of 3</span>
          </div>

          {/* Question Text */}
          <p className="text-lg text-dark-text mb-6 leading-relaxed">
            {DEMO_QUESTION.question}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {DEMO_QUESTION.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrectOption = option.id === DEMO_QUESTION.correctAnswer;

              let optionClass = "bg-gray-50 hover:bg-gray-100 border-transparent";
              if (showResult) {
                if (isCorrectOption) {
                  optionClass = "bg-green-50 border-green-500 text-green-800";
                } else if (isSelected && !isCorrectOption) {
                  optionClass = "bg-red-50 border-red-500 text-red-800";
                }
              } else if (isSelected) {
                optionClass = "bg-blue-50 border-blue-500";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${optionClass} ${!showResult && "cursor-pointer"}`}
                >
                  <span className="font-medium">{option.id.toUpperCase()})</span> {option.text}
                  {showResult && isCorrectOption && <span className="ml-2">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
              <p className="text-sm font-medium mb-1">
                {isCorrect ? "Correct!" : "Not quite right"}
              </p>
              <p className="text-sm text-dark-secondary">
                {DEMO_QUESTION.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showResult ? (
              <>
                <button
                  onClick={handleReset}
                  className="pill-btn pill-btn-secondary px-6 py-3 text-sm font-medium"
                >
                  Try Again
                </button>
                <Link
                  href="/auth"
                  className="pill-btn pill-btn-primary px-6 py-3 text-sm font-medium text-center"
                >
                  Try More Questions
                </Link>
              </>
            ) : (
              <p className="text-sm text-dark-muted text-center">
                Select an answer to see the explanation
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/InteractiveDemo.tsx
git commit -m "feat: add InteractiveDemo component with question card"
```

---

### Task 9: Create FeaturesGrid Component

**Files:**
- Create: `components/landing/FeaturesGrid.tsx`

- [ ] **Step 1: Create FeaturesGrid.tsx**

```tsx
import React from "react";
import { BookOpen, BarChart3, FileText } from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Expert-Crafted Questions",
    description: "5,000+ UKMLA-style questions written by medical professionals and exam experts.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Track your performance across topics and see your improvement over time.",
  },
  {
    icon: FileText,
    title: "Detailed Explanations",
    description: "Learn from every question with comprehensive explanations and clinical reasoning.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 px-4 bg-warm-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
            Everything you need to pass
          </h2>
          <p className="text-lg text-dark-secondary max-w-2xl mx-auto">
            Comprehensive preparation tools designed specifically for UKMLA success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl card-hover"
            >
              <div className="w-12 h-12 bg-warm-bg rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-dark-text" />
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">
                {feature.title}
              </h3>
              <p className="text-dark-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/FeaturesGrid.tsx
git commit -m "feat: add FeaturesGrid component with 3-column layout"
```

---

### Task 10: Create TestimonialCarousel Component

**Files:**
- Create: `components/landing/TestimonialCarousel.tsx`

- [ ] **Step 1: Create TestimonialCarousel.tsx**

```tsx
"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "MasterMLA helped me pass on my first attempt! The questions were so similar to the actual exam.",
    author: "Sarah M.",
    institution: "UCL Graduate",
  },
  {
    quote: "The detailed explanations really helped me understand the reasoning behind each answer.",
    author: "James K.",
    institution: "Manchester Graduate",
  },
  {
    quote: "I improved my score by 20% in just two months of practice. Highly recommend!",
    author: "Priya S.",
    institution: "King's College Graduate",
  },
  {
    quote: "The progress tracking kept me motivated throughout my preparation.",
    author: "Ahmed R.",
    institution: "Nottingham Graduate",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-text">
            What our students say
          </h2>
        </div>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-warm-bg rounded-2xl p-8 text-center">
            <p className="text-lg text-dark-text italic mb-6">
              "{TESTIMONIALS[currentIndex].quote}"
            </p>
            <p className="font-medium text-dark-text">
              {TESTIMONIALS[currentIndex].author}
            </p>
            <p className="text-sm text-dark-muted">
              {TESTIMONIALS[currentIndex].institution}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-dark-secondary" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-dark-text" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-dark-secondary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/TestimonialCarousel.tsx
git commit -m "feat: add TestimonialCarousel component with navigation"
```

---

## Chunk 5: Pricing, FAQ, Blog, CTA

### Task 11: Create PricingCards Component

**Files:**
- Create: `components/landing/PricingCards.tsx`

- [ ] **Step 1: Create PricingCards.tsx**

```tsx
import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "2 Months",
    price: "£25",
    description: "Perfect for focused revision",
    features: ["5,000+ questions", "Detailed explanations", "Progress tracking", "Mobile access"],
    popular: false,
  },
  {
    name: "6 Months",
    price: "£40",
    description: "Most popular choice",
    features: ["Everything in 2 Months", "Extended access", "Priority support", "Mock exams"],
    popular: true,
  },
  {
    name: "Lifetime",
    price: "£70",
    description: "One-time payment, forever access",
    features: ["Everything in 6 Months", "Lifetime updates", "All future content", "VIP support"],
    popular: false,
  },
];

const PricingCards = () => {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-dark-secondary">
            Choose the plan that works best for your preparation timeline.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-6 ${
                plan.popular
                  ? "border-2 border-success ring-4 ring-success/10"
                  : "border border-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-success text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-dark-text mb-1">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-dark-text mb-2">
                  {plan.price}
                </div>
                <p className="text-sm text-dark-muted">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-dark-secondary">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/auth"
                className={`block w-full py-3 rounded-full text-center font-medium transition-all ${
                  plan.popular
                    ? "bg-success text-white hover:bg-success-dark"
                    : "pill-btn pill-btn-secondary"
                }`}
              >
                Get Access
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-dark-muted">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            Secure payment via Stripe
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            7-day money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            Instant access
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/PricingCards.tsx
git commit -m "feat: add PricingCards component with 3 plans"
```

---

### Task 12: Create FAQAccordion Component

**Files:**
- Create: `components/landing/FAQAccordion.tsx`

- [ ] **Step 1: Create FAQAccordion.tsx**

```tsx
"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is UKMLA?",
    answer: "The UK Medical Licensing Assessment (UKMLA) is a two-part exam that all medical students must pass to practice medicine in the UK. It consists of the Applied Knowledge Test (AKT) and the Clinical and Professional Skills Assessment (CPSA).",
  },
  {
    question: "How many questions are included?",
    answer: "MasterMLA includes over 5,000 UKMLA-style practice questions covering all topics in the MLA content map. New questions are added regularly based on the latest guidelines.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 7-day money-back guarantee. If you're not satisfied with MasterMLA for any reason, contact us within 7 days for a full refund.",
  },
  {
    question: "Can I access MasterMLA on mobile?",
    answer: "Absolutely! MasterMLA is fully responsive and works seamlessly on desktop, tablet, and mobile devices. Study anywhere, anytime.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards through our secure payment processor, Stripe. We also support Apple Pay and Google Pay.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-warm-bg">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-dark-secondary">
            Everything you need to know about MasterMLA.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-dark-text pr-4">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-dark-muted flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-dark-muted flex-shrink-0" />
                )}
              </button>
              <div
                className={`faq-content ${openIndex === index ? "open" : ""}`}
              >
                <div className="px-5 pb-5 text-dark-secondary">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/FAQAccordion.tsx
git commit -m "feat: add FAQAccordion component with expand/collapse"
```

---

### Task 13: Create BlogPreview Component

**Files:**
- Create: `components/landing/BlogPreview.tsx`

- [ ] **Step 1: Create BlogPreview.tsx**

```tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// This will pull from actual blog data in production
const PREVIEW_POSTS = [
  {
    slug: "ukmla-exam-preparation-guide",
    title: "UKMLA Exam Preparation Guide",
    excerpt: "Everything you need to know about preparing for the UK Medical Licensing Assessment.",
    category: "Exam Prep",
  },
  {
    slug: "top-study-strategies",
    title: "Top Study Strategies for Medical Students",
    excerpt: "Proven techniques to maximize your revision efficiency and retention.",
    category: "Study Tips",
  },
  {
    slug: "common-exam-mistakes",
    title: "Common UKMLA Mistakes to Avoid",
    excerpt: "Learn from others' experiences and avoid these frequent pitfalls.",
    category: "Exam Prep",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-dark-text mb-2">
              From the blog
            </h2>
            <p className="text-dark-secondary">
              Tips, guides, and insights for your UKMLA preparation.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-dark-text font-medium hover:gap-3 transition-all"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PREVIEW_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="bg-warm-bg rounded-xl h-40 mb-4 group-hover:bg-gray-100 transition-colors" />
              <span className="text-xs text-dark-muted uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="font-semibold text-dark-text mt-1 mb-2 group-hover:text-dark-secondary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-dark-secondary line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-dark-text font-medium"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/BlogPreview.tsx
git commit -m "feat: add BlogPreview component with 3-column grid"
```

---

### Task 14: Create FinalCTA Component

**Files:**
- Create: `components/landing/FinalCTA.tsx`

- [ ] **Step 1: Create FinalCTA.tsx**

```tsx
import React from "react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-20 px-4 bg-warm-bg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
          Ready to pass your UKMLA?
        </h2>
        <p className="text-lg text-dark-secondary mb-8">
          Join 5,000+ students who've already started preparing with MasterMLA.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/auth"
            className="pill-btn pill-btn-primary px-8 py-3 text-base font-medium w-full sm:w-auto text-center"
          >
            Get Started
          </Link>
          <Link
            href="#demo"
            className="pill-btn pill-btn-secondary px-8 py-3 text-base font-medium w-full sm:w-auto text-center"
          >
            Take Demo
          </Link>
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-dark-secondary">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure payment
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            7-day money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Instant access
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/FinalCTA.tsx
git commit -m "feat: add FinalCTA component with trust elements"
```

---

## Chunk 6: Integration and Cleanup

### Task 15: Update Main Page with New Components

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read current page.tsx**

- [ ] **Step 2: Replace with new landing page**

```tsx
import PillNavigation from "@/components/landing/PillNavigation";
import HeroSection from "@/components/landing/HeroSection";
import InstitutionsBelt from "@/components/landing/InstitutionsBelt";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import TestimonialCarousel from "@/components/landing/TestimonialCarousel";
import PricingCards from "@/components/landing/PricingCards";
import FAQAccordion from "@/components/landing/FAQAccordion";
import BlogPreview from "@/components/landing/BlogPreview";
import FinalCTA from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <PillNavigation />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <InstitutionsBelt />
        <InteractiveDemo />
        <FeaturesGrid />
        <TestimonialCarousel />
        <PricingCards />
        <FAQAccordion />
        <BlogPreview />
        <FinalCTA />
      </main>
      {/* Footer is rendered in layout.tsx */}
    </>
  );
}
```

Note: The Footer component is already included in `app/layout.tsx` and will render automatically.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: integrate all new landing page components"
```

---

### Task 16: Update SEO Structured Data

**Files:**
- Modify: `utils/seo-structured-data.ts`

- [ ] **Step 1: Read current file**

- [ ] **Step 2: Remove AI-related content from schemas**

Remove or update any references to:
- "AI-powered explanations"
- "AI tutor"
- "machine learning"
- "adaptive learning" (if AI-related)

Update `softwareApplicationSchema.featureList` to remove AI mentions:
```typescript
featureList: [
  "5,000+ UKMLA practice questions",
  "Detailed explanations",
  "Personalized study plans",
  "Performance analytics",
  "Mock exams",
  "Spaced repetition flashcards",
  "Progress tracking",
  "Mobile responsive"
]
```

- [ ] **Step 3: Commit**

```bash
git add utils/seo-structured-data.ts
git commit -m "chore: remove AI references from SEO structured data"
```

---

### Task 17: Update Blog JSON Files

**Files:**
- Modify: `data/blogs/*.json`

- [ ] **Step 1: Search for AI references in blog files**

```bash
grep -l -i "AI\|artificial intelligence\|machine learning" data/blogs/*.json
```

- [ ] **Step 2: Update each blog file found**

For each file, replace AI-related phrases:
- "AI-powered" → "expert-crafted" or "comprehensive"
- "AI explanations" → "detailed explanations"
- "machine learning" → remove or replace with "adaptive"

- [ ] **Step 3: Commit**

```bash
git add data/blogs/
git commit -m "chore: remove AI references from blog content"
```

---

### Task 18: Final AI Grep and Verify

**Files:**
- Various files across codebase

- [ ] **Step 1: Search for remaining AI references**

```bash
grep -r -i "artificial intelligence\|AI-powered\|AI powered\|machine learning\|ai tutor\|ai assistant" --include="*.tsx" --include="*.ts" --include="*.json" . | grep -v node_modules
```

- [ ] **Step 2: If matches found, update specific files**

Expected files that may have matches (update if found):
- `components/SEOContent.tsx` - update hidden SEO text
- `utils/constants.ts` - update any AI references
- Any remaining component files

- [ ] **Step 3: Verify clean**

```bash
grep -r -i "\bAI\b" --include="*.tsx" --include="*.ts" . | grep -v "node_modules" | grep -v ".git"
```

Expected: No matches or only false positives (e.g., "WAIT", "AGAIN")

- [ ] **Step 4: Commit cleanup**

```bash
git add -A
git commit -m "chore: final AI reference cleanup"
```

---

### Task 19: Test and Verify

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 2: Run development server**

```bash
npm run dev
```

Expected: Server starts on localhost:3000 without errors

- [ ] **Step 3: Test responsive layouts**

Open Chrome DevTools, test at each breakpoint:
- Mobile (375px): All sections stack vertically, hamburger menu visible, CTAs full-width
- Tablet (768px): Features grid 2-column, pricing cards 2-column
- Desktop (1280px): Full 3-column grids, pill nav fully visible

Verification: Take screenshots at each breakpoint

- [ ] **Step 4: Test all interactive elements**

| Element | Test | Expected Result |
|---------|------|-----------------|
| Nav links | Click each | Navigate to correct page |
| Mobile hamburger | Click | Menu slides in from right |
| Mobile close | Click X or overlay | Menu closes |
| Demo question | Click option B | Shows green correct state + explanation |
| Demo reset | Click "Try Again" | Resets to initial state |
| Testimonial arrows | Click left/right | Slides to prev/next testimonial |
| FAQ items | Click question | Expands to show answer |
| CTA buttons | Click "Get Started" | Navigate to /auth |

- [ ] **Step 5: Run production build**

```bash
npm run build
```

Expected: Build completes without errors

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete landing page redesign

- New PreRegExamPrep-style design with warm colors
- Single centered pill navigation
- 8 conversion-optimized sections
- Mobile-first responsive design
- All AI references removed"
```

---

## Summary

**Total Tasks:** 19
**Estimated Time:** 2-3 hours

**Components Created:**
1. PillNavigation
2. HeroSection
3. InstitutionsBelt
4. InteractiveDemo
5. FeaturesGrid
6. TestimonialCarousel
7. PricingCards
8. FAQAccordion
9. BlogPreview
10. FinalCTA

**Key Changes:**
- Warm cream color palette (#fbfaf4)
- Single centered pill navigation with glassmorphism
- All AI references removed
- Mobile-first responsive design
- Conversion-optimized section flow
