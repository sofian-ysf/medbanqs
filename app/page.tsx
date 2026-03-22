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
