'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustedCompaniesSection from "@/components/TrustedCompaniesSection";
import ProcessSection from "@/components/ProcessSection";
import SeamlessScrollSection from "@/components/SeamlessScrollSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import AnimationWrapper from "@/components/AnimationWrapper";
import FloatingButtons from "@/components/FloatingButtons";

import {
  SeamlessSecretSauceText,
  SeamlessBriefGeneratorText,
  SeamlessPricingText,
  SeamlessStatsText,
  SeamlessQualityObsessionText,
} from "@/components/SeamlessTextComponents";

import {
  SecretSauceMedia,
  BriefGeneratorMedia,
  PricingMedia,
  StatsMedia,
  QualityObsessionMedia,
} from "@/components/MediaWrappers";
import BlogsSection from "@/components/BlogsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import ShowcasesSection from "@/components/ShowcasesSection";

export default function Home() {
  const router = useRouter();

  const handleStartProject = (projectDescription: string) => {
    // Navigate to brief generator with the project description
    router.push(`/brief-generator?description=${encodeURIComponent(projectDescription)}`);
  };

  const handleScheduleDemo = () => {
    router.push('/demo-booking');
  };

  // Seamless scroll sections with Quality Obsession replacing Case Studies
  const seamlessScrollSections = [
    {
      textContent: <SeamlessSecretSauceText />,
      mediaContent: <SecretSauceMedia />,
    },
    {
      textContent: <SeamlessBriefGeneratorText />,
      mediaContent: <BriefGeneratorMedia />,
    },
    {
      textContent: <SeamlessPricingText />,
      mediaContent: <PricingMedia />,
    },
    {
      textContent: <SeamlessStatsText />,
      mediaContent: <StatsMedia />,
    },
    {
      textContent: <SeamlessQualityObsessionText />,
      mediaContent: <QualityObsessionMedia />,
    },
  ];

  return (
    <AnimationWrapper>
      <div className="min-h-screen bg-white text-black">
        <Navigation />
        <HeroSection />
        <TrustedCompaniesSection />
        <ShowcasesSection />
        <ProcessSection />
        <SeamlessScrollSection sections={seamlessScrollSections} />
        <BlogsSection />
        <CTASection />
        <FloatingButtons 
          onStartProject={handleStartProject}
          onScheduleDemo={handleScheduleDemo}
        />
      </div>
    </AnimationWrapper>
  );
}