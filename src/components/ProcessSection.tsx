"use client";

import React, { useRef, useEffect, useState } from "react";

interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [isTimelineActive, setIsTimelineActive] = useState(false);
  const [showMagicBanner, setShowMagicBanner] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const processSteps: ProcessStep[] = [
    {
      number: "1",
      icon: "🧠",
      title: "AI Research & Strategy",
      description:
        "Share your idea. Our AI analyzes market data, competitor insights, and creates comprehensive technical briefs in minutes.",
      highlight: "comprehensive technical briefs in minutes",
    },
    {
      number: "2",
      icon: "💎",
      title: "Transparent Fixed Pricing",
      description:
        "Get instant quotes that include everything. Save 70% compared to traditional teams while getting better ROI.",
      highlight: "Save 70% compared to traditional teams",
    },
    {
      number: "3",
      icon: "🎯",
      title: "Perfect Team Match",
      description:
        "Access world-class talent you couldn't hire directly. We match the best AI tools and human experts for your project.",
      highlight: "the best AI tools and human experts",
    },
    {
      number: "4",
      icon: "🤖",
      title: "24/7 AI Management",
      description:
        "Experience seamless coordination. Test @moccet in Slack to see how AI transforms project management forever.",
      highlight: "Test @moccet in Slack",
    },
    {
      number: "5",
      icon: "📈",
      title: "Continuous Optimization",
      description:
        "AI Business Analyst maximizes ROI by analyzing real-time data. Get insights that drive exponential growth.",
      highlight: "drive exponential growth",
    },
    {
      number: "6",
      icon: "🚀",
      title: "Long-term Partnership",
      description:
        "Machine learning builds your unique profile. Each project gets smarter, making us your growth partner, not a vendor.",
      highlight: "your growth partner, not a vendor",
    },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || !timelineRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if we're in the timeline section - more restrictive viewport check
      const isInTimelineViewport =
        containerRect.top <= -15 && containerRect.bottom >= windowHeight * 0.8;

      if (!isInTimelineViewport) {
        setIsTimelineActive(false);
        return;
      }

      // Constants for layout
      const STEP_WIDTH = 390;
      const VIEWPORT_WIDTH = window.innerWidth;
      const TIMELINE_PADDING = 18;

      // Calculate translation
      const visibleWidth = VIEWPORT_WIDTH - 2 * TIMELINE_PADDING;
      const stepsVisible = Math.floor(visibleWidth / STEP_WIDTH);
      const totalStepsToScroll = Math.max(
        processSteps.length - stepsVisible,
        0
      );

      if (totalStepsToScroll === 0) {
        setIsTimelineActive(false);
        setShowMagicBanner(true);
        return;
      }

      // Get current progress
      const currentProgress = timelineProgress;
      const delta = e.deltaY > 0 ? 0.02 : -0.02; // Slower scroll speed (was 0.05)
      const newProgress = Math.max(0, Math.min(1, currentProgress + delta));

      // Always hijack scroll when in timeline area, unless:
      // - Scrolling down and already at 100% progress
      // - Scrolling up and already at 0% progress
      const shouldHijackScroll = !(
        (e.deltaY > 0 && currentProgress >= 1) ||
        (e.deltaY < 0 && currentProgress <= 0)
      );

      if (shouldHijackScroll) {
        e.preventDefault();
        setIsTimelineActive(true);
        setTimelineProgress(newProgress);

        // Apply transform
        const currentStep = newProgress * totalStepsToScroll;
        const translateX = -currentStep * STEP_WIDTH;
        timelineRef.current.style.transform = `translateX(${translateX}px)`;
        setActiveStep(
          Math.min(Math.floor(currentStep), processSteps.length - 1)
        );
      }

      // Update banner visibility - once shown, keep it visible
      if (newProgress >= 1) {
        setShowMagicBanner(true);
      }
      // Don't hide banner when scrolling back - once timeline is completed, banner stays
    };

    const handleScroll = () => {
      if (!containerRef.current || !timelineRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Reset timeline when scrolling away from top
      if (containerRect.top > 0) {
        setTimelineProgress(0);
        setIsTimelineActive(false);
        // Only hide banner when completely scrolling away from timeline section
        setShowMagicBanner(false);
        timelineRef.current.style.transform = `translateX(0px)`;
        setActiveStep(0);
      }

      // When scrolling away from bottom, keep banner visible
      if (containerRect.bottom < windowHeight * 0.3) {
        setIsTimelineActive(false);
        // Don't hide banner when scrolling past timeline
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [processSteps.length, timelineProgress]);

  // Remove scroll locking for now - keep it simple like the original
  // useEffect(() => {
  //   if (isTimelineActive) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isTimelineActive]);

  // Mobile scroll handler
  useEffect(() => {
    const handleMobileScroll = () => {
      if (!mobileScrollRef.current) return;

      const scrollContainer = mobileScrollRef.current;
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = scrollContainer.offsetWidth;
      const currentIndex = Math.round(scrollLeft / cardWidth);

      setMobileActiveIndex(currentIndex);
    };

    const mobileContainer = mobileScrollRef.current;
    if (mobileContainer) {
      mobileContainer.addEventListener("scroll", handleMobileScroll);
      return () =>
        mobileContainer.removeEventListener("scroll", handleMobileScroll);
    }
  }, []);

  const formatDescription = (description: string, highlight: string) => {
    const parts = description.split(highlight);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="font-semibold text-black bg-gradient-to-r from-green-400 to-green-400 bg-no-repeat bg-left-bottom bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-all duration-500">
            {highlight}
          </span>
          {parts[1]}
        </>
      );
    }
    return description;
  };

  return (
    <>
      {/* Desktop Timeline Section with Header */}
      <section
        ref={containerRef}
        className="relative hidden lg:block bg-white pt-16 sm:pt-24"
      >
        {/* Sticky container */}
        <div className="sticky top-0 min-h-screen flex flex-col justify-center overflow-hidden py-8 pb-16 sm:pb-24">
          {/* Header at top */}
          <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
            <div className="text-center max-w-4xl mx-auto animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                The Process
              </p>
              <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
                Six steps to transform
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                How we turn your vision into reality with AI-powered efficiency
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Timeline container with connecting line */}
            <div className="relative overflow-hidden">
              {/* Progress indicators */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-20 flex gap-2 z-30">
                {processSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index <= activeStep ? "bg-black scale-125" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Main timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0"></div>

              <div
                ref={timelineRef}
                className="flex items-center transition-transform duration-300 ease-out relative z-10"
                style={{ width: `${processSteps.length * 390}px` }}
              >
                {processSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className="flex-shrink-0 w-96 mx-6 relative"
                  >
                    {/* Step card */}
                    <div className="group relative bg-white rounded-3xl p-8 sm:p-10 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] h-80 mt-12 border border-gray-200">
                      {/* Background overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Large number in background */}
                      <span className="absolute top-8 sm:top-10 right-8 sm:right-10 text-6xl sm:text-7xl font-black text-gray-200 leading-none transition-all duration-300 group-hover:scale-110 group-hover:text-gray-300 pointer-events-none select-none">
                        {step.number}
                      </span>

                      {/* Icon */}
                      <div className="relative z-10 w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all duration-300 group-hover:rotate-[-10deg] group-hover:scale-110">
                        {step.icon}
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {formatDescription(step.description, step.highlight)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Banner at bottom */}
          <div
            className={`w-full px-4 sm:px-6 lg:px-8 mt-8 transition-all duration-1000 ${
              showMagicBanner
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ marginTop: "7rem" }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="relative bg-black text-white rounded-[32px] p-8 sm:p-12 text-center overflow-hidden">
                {/* Animated background effect */}
                <div className="absolute inset-[-50%] bg-radial-gradient opacity-50 animate-pulse-slow pointer-events-none"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Experience the magic yourself
                  </h3>
                  <p className="text-base sm:text-lg opacity-80 mb-6">
                    Add @moccet to Slack and see AI project management in action
                  </p>
                  <button 
                    onClick={() => window.location.href = 'https://slack.com/oauth/v2/authorize?state=f2e4f196-dd30-4009-9c9b-b6d180639202&client_id=8991739820066.8984789928742&scope=app_mentions:read,chat:write,files:read,channels:history,channels:join,channels:read,commands&user_scope=&redirect_uri=https://a5a1-69-181-53-148.ngrok-free.app/slack/oauth_redirect'}
                    className="group inline-flex items-center gap-3 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <span>Add to Slack</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Swipeable Section */}
      <section className="py-8 bg-white lg:hidden">
        {/* Header for mobile */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              The Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight tracking-tight">
              Six steps to transform
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              How we turn your vision into reality with AI-powered efficiency
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Progress indicators for mobile */}
          <div className="flex justify-center gap-2 mb-8">
            {processSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === mobileActiveIndex
                    ? "bg-black scale-125"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Swipeable cards container */}
          <div
            ref={mobileScrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-4 px-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex-shrink-0 w-[85vw] max-w-sm snap-center"
                >
                  <div className="group relative bg-white rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-xl border border-gray-200 h-80">
                    {/* Background overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Large number in background */}
                    <span className="absolute top-6 right-6 text-5xl font-black text-gray-200 leading-none transition-all duration-300 group-hover:scale-110 group-hover:text-gray-300 pointer-events-none select-none">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="relative z-10 w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center text-xl mb-4 transition-all duration-300 group-hover:rotate-[-10deg] group-hover:scale-110">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-3 text-black">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {formatDescription(step.description, step.highlight)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swipe hint */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">← Swipe to explore steps →</p>
          </div>
        </div>

        {/* Demo Banner for mobile */}
        <div className="px-4 sm:px-6 lg:px-8 mt-12">
          <div className="relative bg-black text-white rounded-[32px] p-8 sm:p-12 text-center overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-[-50%] bg-radial-gradient opacity-50 animate-pulse-slow pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Experience the magic yourself
              </h3>
              <p className="text-base sm:text-lg opacity-80 mb-6">
                Add @moccet to Slack and see AI project management in action
              </p>
              <button 
                onClick={() => window.location.href = 'https://slack.com/oauth/v2/authorize?state=f2e4f196-dd30-4009-9c9b-b6d180639202&client_id=8991739820066.8984789928742&scope=app_mentions:read,chat:write,files:read,channels:history,channels:join,channels:read,commands&user_scope=&redirect_uri=https://a5a1-69-181-53-148.ngrok-free.app/slack/oauth_redirect'}
                className="group inline-flex items-center gap-3 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <span>Add to Slack</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .bg-radial-gradient {
            background: radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 70%
            );
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </>
  );
};

export default ProcessSection;