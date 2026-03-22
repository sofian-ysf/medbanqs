"use client";

import React, { useState, useEffect, useRef } from "react";

const TrustedCompaniesSection: React.FC = () => {
  // Extended list of companies for the scrolling effect
  const companies = [
    "TheWellness",
    "Nuqoot",
    "TechFlow",
    "HealthPlus",
    "FinanceAI",
    "RetailMax",
    "DataCore",
    "CloudSync",
    "InnovateLab",
    "FutureScale",
    "SmartSolutions",
    "NextGen",
    "AlphaTech",
    "BetaSoft",
    "GammaWorks",
    "DeltaApps",
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  // Animation states for counters
  const [animatedValues, setAnimatedValues] = useState({
    projects: 0,
    satisfaction: 0,
    delivery: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Counter animation function
  const animateValue = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void
  ) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      callback(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate projects counter
            animateValue(0, 100, 2000, (value) => {
              setAnimatedValues((prev) => ({ ...prev, projects: value }));
            });

            // Animate satisfaction counter with slight delay
            setTimeout(() => {
              animateValue(0, 98, 2000, (value) => {
                setAnimatedValues((prev) => ({ ...prev, satisfaction: value }));
              });
            }, 200);

            // Animate delivery counter with slight delay
            setTimeout(() => {
              animateValue(0, 48, 2000, (value) => {
                setAnimatedValues((prev) => ({ ...prev, delivery: value }));
              });
            }, 400);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <p className="text-sm font-bold uppercase tracking-wider text-black mb-4">
            Trusted by innovative teams
          </p>
        </div>

        {/* Scrolling Companies Belt */}
        <div className="relative animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left">
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={`${company}-${index}`}
                  className="flex-shrink-0 mx-8 sm:mx-12"
                >
                  <div className="group flex items-center justify-center h-16 sm:h-20 px-6 sm:px-8">
                    <span className="text-xl sm:text-2xl font-bold text-gray-400 group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                      {company}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section - Moved closer */}
        <div
          ref={statsRef}
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
        >
          <div className="group">
            <div className="text-4xl sm:text-5xl font-black text-brand-purple mb-2 transition-all duration-300">
              {animatedValues.projects}+
            </div>
            <div className="text-gray-600 font-medium">Projects Delivered</div>
          </div>
          <div className="group">
            <div className="text-4xl sm:text-5xl font-black text-brand-purple mb-2 transition-all duration-300">
              {animatedValues.satisfaction}%
            </div>
            <div className="text-gray-600 font-medium">Client Satisfaction</div>
          </div>
          <div className="group">
            <div className="text-4xl sm:text-5xl font-black text-brand-purple mb-2 transition-all duration-300">
              {animatedValues.delivery}hrs
            </div>
            <div className="text-gray-600 font-medium">Average Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompaniesSection;