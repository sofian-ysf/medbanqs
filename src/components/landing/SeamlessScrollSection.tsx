"use client";

import React, { useRef, useEffect, useState } from "react";

interface Section {
  textContent: React.ReactNode;
  mediaContent: React.ReactNode;
}

interface SeamlessScrollSectionProps {
  sections: Section[];
}

const SeamlessScrollSection: React.FC<SeamlessScrollSectionProps> = ({
  sections,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0); // Start with first section active
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Calculate scroll velocity
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = currentTime - lastScrollTime.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      if (timeDelta > 0) {
        const velocity = scrollDelta / timeDelta;
        setScrollVelocity(Math.min(velocity * 10, 5)); // Scale and cap velocity
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;

      const windowHeight = window.innerHeight;

      let newActiveSection = -1;
      let bestVisibility = 0;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          const sectionHeight = rect.height;

          const visibleTop = Math.max(0, Math.min(windowHeight, sectionBottom));
          const visibleBottom = Math.max(
            0,
            Math.min(windowHeight, windowHeight - sectionTop)
          );
          const visibleHeight = Math.max(
            0,
            visibleTop - Math.max(0, sectionTop)
          );

          const visibilityPercentage = visibleHeight / sectionHeight;

          if (
            visibilityPercentage > 0.7 &&
            visibilityPercentage > bestVisibility
          ) {
            bestVisibility = visibilityPercentage;
            newActiveSection = index;
          }
        }
      });

      setActiveSection(newActiveSection);
    };

    // Only apply scroll behavior on desktop
    if (window.innerWidth >= 1024) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial call
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Calculate transition duration based on scroll velocity
  const getTransitionDuration = (): number => {
    const baseSpeed = 800; // Base transition speed in ms
    const velocityFactor = Math.max(0.3, 1 - scrollVelocity * 0.15);
    return baseSpeed * velocityFactor;
  };

  const isQualityObsessionActive = activeSection === sections.length - 1;

  return (
    <div ref={containerRef} className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Simple stack layout */}
        <div className="block lg:hidden">
          <div className="space-y-16 sm:space-y-20">
            {sections.map((section, index) => (
              <div key={index} className="py-8 sm:py-12">
                <div className="space-y-20 sm:space-y-12">
                  {/* Text content */}
                  <div>{section.textContent}</div>

                  {/* Media content */}
                  <div className="flex justify-center">
                    {section.mediaContent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Enhanced sticky layout */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-[60rem]">
              {sections.map((section, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className="py-20"
                  style={{
                    padding: "4rem 0rem",
                    margin: "0rem 0rem",
                  }}
                >
                  {section.textContent}
                </div>
              ))}
            </div>

            <div
              className="lg:sticky lg:top-20 lg:h-screen lg:flex opacity-100"
              style={{
                alignItems: isQualityObsessionActive ? "center" : "flex-start",
                paddingTop: isQualityObsessionActive ? "0rem" : "4rem",
              }}
            >
              <div className="relative w-full h-[32rem] overflow-hidden">
                {sections.map((section, index) => {
                  const isActive = index === activeSection;
                  const isPrevious = index < activeSection;
                  const transitionDuration = getTransitionDuration();

                  let transformClass = "";
                  let opacityClass = "";

                  if (isActive) {
                    transformClass = "translate-x-0";
                    opacityClass = "opacity-100";
                  } else if (isPrevious) {
                    transformClass = "translate-x-[-100%]";
                    opacityClass = "opacity-0";
                  } else {
                    transformClass = "translate-x-full";
                    opacityClass = "opacity-0";
                  }

                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all ease-in-out ${transformClass} ${opacityClass} ${
                        isActive ? "z-10" : "z-0"
                      } ${!isActive ? "pointer-events-none" : ""}`}
                      style={{
                        transitionDuration: `${transitionDuration}ms`,
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-6">
                        {section.mediaContent}
                      </div>
                    </div>
                  );
                })}
                {activeSection === -1 && (
                  <div className="absolute inset-0 opacity-0 z-0">
                    {/* No loading state needed since we start with section 0 */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeamlessScrollSection;
