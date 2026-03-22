"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import AnimatedTypewriter from "./AnimatedTypeWriter";
import FintechDemo from "./FintechDemo";
import { useTranslation } from "@/contexts/TranslationContext";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = Math.max(0, Math.min(scrollY * 0.3, 200));

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        transform: `translateY(-${parallaxOffset}px)`,
      }}
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
              <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
                <span>{t("hero.mainTitle.line1")}</span>{" "}
                <span>{t("hero.mainTitle.line2")}</span>{" "}
                <div className="sm:block">
                  <AnimatedTypewriter
                    words={t("hero.mainTitle.typewriterWords")}
                  />
                </div>
              </h2>
            </div>

            <div
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                {t("hero.tagline")}
              </p>
            </div>

            <div
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <button className="w-full sm:w-auto group bg-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white flex items-center justify-center">
                  {t("hero.startBuilding")}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    size={20}
                  />
                </button>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <Play className="mr-2" size={20} />
                  {t("hero.scheduleDemo")}
                </button>
              </div>
            </div>

            {/* Mobile Static Demo - Show below buttons on mobile */}
            <div className="lg:hidden mt-8">
              <div
                className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
                style={{ transitionDelay: "800ms" }}
              >
                <div className="max-w-sm mx-auto">
                  <div className="mb-3 text-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Fintech Demo
                    </h3>
                    <p className="text-xs text-gray-600">
                      Real-time fraud detection & risk assessment
                    </p>
                  </div>

                  {/* Static Phone Screen with 3 Messages */}
                  <div
                    className="bg-gray-900 rounded-2xl p-3 mx-auto"
                    style={{ width: "280px", height: "400px" }}
                  >
                    {/* Phone Header */}
                    <div className="bg-black rounded-t-xl h-8 flex items-center justify-center relative">
                      <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
                      <div className="absolute right-2 flex gap-1">
                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>

                    {/* Phone Screen */}
                    <div className="bg-white h-full rounded-b-xl overflow-hidden">
                      <div className="h-full flex flex-col">
                        {/* App Header */}
                        <div className="bg-emerald-600 text-white p-3 text-center">
                          <h4 className="font-semibold text-sm">
                            Fintech AI Assistant
                          </h4>
                        </div>

                        {/* Chat Messages - Static 3 messages */}
                        <div className="flex-1 p-3 space-y-4 bg-gray-50">
                          {/* Client Message */}
                          <div className="flex justify-end">
                            <div className="bg-emerald-500 text-white p-3 rounded-lg max-w-xs">
                              <p className="text-sm">
                                Suspicious $5,000 wire transfer flagged by our
                                system. Need immediate risk assessment.
                              </p>
                            </div>
                          </div>

                          {/* AI Agent Response */}
                          <div className="flex justify-start">
                            <div className="bg-white border p-3 rounded-lg max-w-xs shadow-sm">
                              <div className="flex items-center mb-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-xs font-medium text-gray-600">
                                  Risk Manager
                                </span>
                              </div>
                              <p className="text-sm text-gray-800">
                                Customer verified via phone. Transaction is
                                legitimate. Approve and update risk model.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Demo (Desktop only) */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: "600ms" }}
            >
              <FintechDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;