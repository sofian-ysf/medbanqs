"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedTypewriter from "./AnimatedTypeWriter";
import UKMLADemo from "./UKMLADemo";

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = Math.max(0, Math.min(scrollY * 0.3, 200));

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-8 sm:pb-0"
      style={{
        transform: `translateY(-${parallaxOffset}px)`,
      }}
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight">
                <span className="block sm:inline">UKMLA</span>{" "}
                <span className="block sm:inline">Success</span>{" "}
                <div className="block mt-2 sm:mt-0">
                  <AnimatedTypewriter
                    words={["Made Simple", "For You", "For Excellence"]}
                  />
                </div>
              </h1>
            </div>

            <div
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                Master UKMLA with 5,000+ medical questions, expert explanations, and personalized study plans. Join 5,000+ medical students achieving 94% pass rates.
              </p>
            </div>

            <div
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex justify-center lg:justify-start px-4 sm:px-0">
                <a href="/pricing" className="group bg-black px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white flex items-center justify-center w-full sm:w-auto max-w-xs">
                  Get Started
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    size={18}
                  />
                </a>
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
                      UKMLA Demo
                    </h3>
                    <p className="text-xs text-gray-600">
                      Smart exam prep & instant feedback
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
                        <div style={{ backgroundColor: '#BAC4C6' }} className="text-gray-900 p-3 text-center">
                          <h4 className="font-semibold text-sm">
                            UKMLA Study Assistant
                          </h4>
                        </div>

                        {/* Chat Messages - Static 3 messages */}
                        <div className="flex-1 p-3 space-y-4 bg-gray-50">
                          {/* Client Message */}
                          <div className="flex justify-end">
                            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs text-right">
                              <p className="text-xs">
                                What's the first-line treatment for Type 2 diabetes with HbA1c of 58?
                              </p>
                            </div>
                          </div>

                          {/* Expert Response */}
                          <div className="flex justify-start">
                            <div className="bg-white border p-3 rounded-lg max-w-xs shadow-sm">
                              <div className="flex items-center mb-1">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-xs font-medium text-gray-600">
                                  Medical Tutor
                                </span>
                              </div>
                              <p className="text-xs text-gray-800 text-left">
                                Lifestyle modifications first per NICE NG28. Studies show 65% achieve target with diet alone.
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

          {/* Right side - Demo - Desktop Only */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: "600ms" }}
            >
              <UKMLADemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;