"use client";

import React, { useState, useRef } from "react";
import EcommerceDemo from "./EcommerceDemo";
import MarketingDemo from "./MarketingDemo";
import SoftwareDevDemo from "./SoftwareDevDemo";
import HealthcareDemo from "./HealthcareDemo";

interface CompanyType {
  id: string;
  label: string;
  description: string;
  component: React.ComponentType;
}

const ShowcasesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const scrollToDemo = () => {
    if (demoRef.current) {
      demoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Small delay to ensure state update happens before scroll
    setTimeout(() => {
      scrollToDemo();
    }, 100);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = companyTypes.findIndex(
        (company) => company.id === activeTab
      );

      if (isLeftSwipe && currentIndex < companyTypes.length - 1) {
        // Swipe left - next demo
        setActiveTab(companyTypes[currentIndex + 1].id);
      } else if (isRightSwipe && currentIndex > 0) {
        // Swipe right - previous demo
        setActiveTab(companyTypes[currentIndex - 1].id);
      }
    }
  };

  const companyTypes: CompanyType[] = [
    {
      id: "healthcare",
      label: "Healthcare Company",
      description:
        "HIPAA-compliant patient management with real-time monitoring",
      component: HealthcareDemo,
    },
    {
      id: "ecommerce",
      label: "E-commerce Company",
      description: "Conversion optimization and supply chain management",
      component: EcommerceDemo,
    },
    {
      id: "marketing",
      label: "Marketing Agency",
      description: "Viral campaign creation with performance optimization",
      component: MarketingDemo,
    },
    {
      id: "software",
      label: "Software House",
      description: "Scalable development with automated testing and deployment",
      component: SoftwareDevDemo,
    },
  ];

  const activeCompany = companyTypes.find(
    (company) => company.id === activeTab
  );
  const ActiveComponent = activeCompany?.component;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gray-900 leading-tight">
            See moccet in action
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Watch AI agents and human experts collaborate to solve real business
            challenges across different industries
          </p>
          {/* Company Type Selector */}
          <div className="mb-8">
            <p className="text-base text-gray-500 mb-6">I am a</p>

            {/* Desktop Tabs */}
            <div
              className="hidden md:flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
              style={{ marginBottom: "0" }}
            >
              {companyTypes.map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleTabClick(company.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeTab === company.id
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {company.label}
                </button>
              ))}
            </div>

            {/* Mobile Single Tab */}
            <div className="md:hidden flex justify-center">
              <div className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium">
                {activeCompany?.label}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Display - Always show with fade-in animation */}
        <div className="relative mt-16" ref={demoRef}>
          <div
            className={`transition-all duration-500 ${
              activeTab
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4 pointer-events-none"
            }`}
          >
            {/* Desktop Demo */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl p-8 lg:p-12">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>

            {/* Mobile Demo - Static version with preview messages */}
            <div className="md:hidden">
              <div className="flex justify-center">
                <div
                  className="w-full max-w-sm"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="mb-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {activeCompany?.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {activeCompany?.description}
                      </p>
                    </div>

                    {/* Static Demo Preview */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {activeTab === "healthcare" && (
                        <>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                Patient John Doe needs urgent follow-up.
                                Scheduling available slots...
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 justify-end">
                            <div className="bg-blue-100 p-2 rounded-lg shadow-sm max-w-xs">
                              <p className="text-xs text-gray-700">
                                Schedule for tomorrow 2 PM. Notify patient via
                                SMS.
                              </p>
                            </div>
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              Dr
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                ✓ Appointment confirmed. Patient notified. HIPAA
                                logs updated.
                              </p>
                            </div>
                          </div>
                        </>
                      )}

                      {activeTab === "ecommerce" && (
                        <>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                Cart abandonment detected. Sending personalized
                                discount...
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 justify-end">
                            <div className="bg-purple-100 p-2 rounded-lg shadow-sm max-w-xs">
                              <p className="text-xs text-gray-700">
                                Make it 15% off and include free shipping.
                              </p>
                            </div>
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              MK
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                ✓ Email sent. Customer returned and completed
                                purchase!
                              </p>
                            </div>
                          </div>
                        </>
                      )}

                      {activeTab === "marketing" && (
                        <>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                Campaign performance: CTR 3.2%, engagement up
                                45%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 justify-end">
                            <div className="bg-pink-100 p-2 rounded-lg shadow-sm max-w-xs">
                              <p className="text-xs text-gray-700">
                                Great! Scale this creative and test video
                                format.
                              </p>
                            </div>
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              CM
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                ✓ Budget increased 2x. Video variants A/B
                                testing now.
                              </p>
                            </div>
                          </div>
                        </>
                      )}

                      {activeTab === "software" && (
                        <>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                Build failed: dependency conflict in
                                package.json
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 justify-end">
                            <div className="bg-indigo-100 p-2 rounded-lg shadow-sm max-w-xs">
                              <p className="text-xs text-gray-700">
                                Update to latest compatible versions and
                                rebuild.
                              </p>
                            </div>
                            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              Dev
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
                              <p className="text-xs text-gray-700">
                                ✓ Dependencies updated. Build successful. Tests
                                passing.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Dots with swipe hint */}
              <div className="flex flex-col items-center mt-6 gap-3">
                <div className="flex gap-2">
                  {companyTypes.map((company) => (
                    <button
                      key={company.id}
                      onClick={() => handleTabClick(company.id)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeTab === company.id
                          ? "bg-gray-900 w-6"
                          : "bg-gray-300"
                      }`}
                      aria-label={`View ${company.label} demo`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span>←</span> Swipe to see other demos <span>→</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ShowcasesSection;