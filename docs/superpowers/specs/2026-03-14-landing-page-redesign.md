# MasterMLA Landing Page Redesign

## Overview

Complete redesign of the MasterMLA landing page to match PreRegExamPrep styling, remove all AI mentions, and optimize for conversion across all device types.

## Goals

1. Match PreRegExamPrep's minimal, warm, professional aesthetic
2. Remove ALL AI-related content and messaging from the entire repository
3. Optimize for conversion (signup/pricing/demo)
4. Ensure responsive design for mobile, tablet, and desktop
5. Simplify component architecture with clean, maintainable code

## Design Decisions

| Decision | Choice |
|----------|--------|
| Design Direction | Minimal & Warm (PreRegExamPrep style) |
| Color Palette | Warm cream #fbfaf4, near-black #1a1a1a, green #22c55e |
| Page Sections | 8 sections (expanded, conversion-focused) |
| Hero Layout | Centered Focus |
| Navbar Style | Single Centered Pill |
| Demo Section | Interactive Question Card |
| Implementation | Clean Slate Rebuild |

## Color Palette

```
Background (warm):  #fbfaf4
Background (white): #ffffff
Text (primary):     #1a1a1a
Text (secondary):   #4a4a4a
Text (muted):       #999999
Success/CTA:        #22c55e
Border:             rgba(0,0,0,0.06)
```

## Page Structure

### 1. Navigation (Single Centered Pill)

- Fixed position, z-index 1000
- Single pill containing: Logo + Nav Links + Divider + Auth buttons
- Glassmorphism: `background: rgba(255,255,255,0.9); backdrop-filter: blur(20px)`
- Border-radius: 50px (pill shape)
- Box-shadow: `0 2px 8px rgba(0,0,0,0.06)`
- Mobile: Logo + hamburger, slide-out menu from right (300ms animation)

**Nav Items:**
- Features
- Pricing
- Blog
- Log in
- Sign Up (primary button)

### 2. Hero Section (Centered Focus)

- Min-height: `calc(100vh - 120px)`
- Background: gradient from #fbfaf4 to #fff
- Content centered, max-width 800px

**Elements (top to bottom):**
1. Trust badge: "Trusted by 5,000+ medical students"
2. H1: "UKMLA Questions & Practice Tests 2025"
3. Subheading: "Thoughtfully designed practice questions with detailed explanations to help you pass with confidence."
4. Dual CTAs: "Get Started" (primary) + "Take Demo" (secondary)
5. Stats row: 4.8/5 Rating | 94% Pass Rate | 5,000+ Questions | 5,000+ Students

### 3. Institutions Belt

- Background: #fbfaf4
- Horizontally scrolling university logos
- Logos: UCL, Manchester, Nottingham, King's College, etc.
- Auto-scroll animation with pause on hover

### 4. Interactive Demo

- Background: #ffffff
- Section header: "Try a Sample Question"
- Single question card with:
  - Category badge + question count
  - Question text
  - 4 selectable answer options
  - Correct answer highlighted in green
- CTA: "Try More Questions"

### 5. Features + Testimonials

- Background: #fbfaf4
- 3-column grid (stacks on mobile):
  1. Expert Questions - "5,000+ UKMLA-style questions"
  2. Progress Tracking - "See your improvement"
  3. Detailed Explanations - "Learn from every question"
- Testimonial carousel below with navigation arrows

### 6. Pricing

- Background: #ffffff
- 3 plan cards side-by-side (stack on mobile):
  1. 2 Months - £25
  2. 6 Months - £40 (Most Popular, green border)
  3. Lifetime - £70
- Each card: Plan name, price, "Get Access" button

### 7. FAQ Accordion

- Background: #fbfaf4
- Max-width: 700px centered
- Expandable items with + / - indicators
- Smooth expand/collapse animation

**Questions:**
- What is UKMLA?
- How many questions are included?
- Is there a money-back guarantee?
- Can I access on mobile?
- How do I cancel?
- What payment methods do you accept?

### 8. Blog Preview + Final CTA

**Blog Preview:**
- 3-column grid of latest blog posts
- Card: Image + Title + Excerpt + Read More

**Final CTA:**
- Background: #fbfaf4
- Headline: "Ready to pass your UKMLA?"
- Subtext: "Join 5,000+ students who've already started preparing."
- Dual CTAs: "Get Started" + "Take Demo"
- Trust badges: Secure payment, Money-back guarantee

## Components to Create

| Component | Purpose |
|-----------|---------|
| `PillNavigation.tsx` | Single centered pill navbar |
| `HeroSection.tsx` | Centered hero with CTAs and stats |
| `InstitutionsBelt.tsx` | Scrolling university logos |
| `InteractiveDemo.tsx` | Sample question experience |
| `FeaturesGrid.tsx` | 3-column feature cards |
| `TestimonialCarousel.tsx` | Sliding testimonials |
| `PricingCards.tsx` | 3 pricing plan cards |
| `FAQAccordion.tsx` | Expandable FAQ items |
| `BlogPreview.tsx` | Latest 3 blog post cards |
| `FinalCTA.tsx` | Closing conversion section |

## Components to Delete

- `ShowcasesSection.tsx` (AI demos)
- `SeamlessScrollSection.tsx` (AI features)
- `SeamlessTextComponents.tsx` (AI content)
- `UKMLADemo.tsx` (AI chat)
- `AnimatedTypeWriter.tsx` (includes "With AI")
- `ProcessSection.tsx` (unused, has AI refs)

## AI Removal Checklist

1. Delete AI-heavy components listed above
2. Remove from `app/layout.tsx`:
   - Lines 136-141: AI meta tags (`ai-content-type`, `ai-features`, `ai-capability`)
3. Update `HeroSection.tsx`: Remove "AI-powered" language
4. Grep entire codebase for "AI", "artificial intelligence", "machine learning"
5. Update SEO structured data in `utils/seo-structured-data.ts`
6. Check all blog JSON files for AI references

## Responsive Breakpoints

```
Mobile:  0 - 640px
Tablet:  641px - 1024px
Desktop: 1025px+

Container max-width: 1200px
```

## Mobile Optimizations

- All grids stack to single column
- Touch targets minimum 44px
- Font scaling: sm → base → lg
- Hamburger menu with slide-out (300ms)
- Simplified hero (remove some stats on smallest screens)
- Pricing cards stack vertically
- Full-width CTAs on mobile

## Typography

- Font: Poppins (already configured)
- H1: 32px mobile → 48px desktop, weight 700
- H2: 24px mobile → 36px desktop, weight 600
- Body: 14px mobile → 16px desktop, weight 400
- Small: 12px, weight 400

## Animations

- Nav scroll: Enhanced shadow on scroll
- Buttons: `transform: translateY(-1px)` on hover
- Cards: `transform: translateY(-2px)` on hover
- Accordion: Smooth height transition (200ms)
- Mobile menu: Slide from right (300ms)

## Files to Modify

| File | Changes |
|------|---------|
| `app/page.tsx` | Replace all section imports with new components |
| `app/layout.tsx` | Remove AI meta tags |
| `tailwind.config.js` | Add warm color palette |
| `app/globals.css` | Add pill styles, glassmorphism utilities |

## Success Criteria

1. No AI mentions anywhere in the repository
2. Design matches PreRegExamPrep aesthetic
3. Lighthouse mobile score > 90
4. All sections render correctly on mobile, tablet, desktop
5. Clear conversion path: Hero CTA → Demo → Pricing → Signup
