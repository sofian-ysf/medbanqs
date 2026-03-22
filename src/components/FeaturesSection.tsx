"use client";

import React from "react";
import { getIconComponent } from "@/utils/helpers";
import { PLATFORM_FEATURES } from "@/utils/constants";
import { Laptop } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

interface Feature {
  iconName: string;
  iconColor: string;
  title: string;
  description: string;
}

const WireConnection: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  index: number;
}> = ({ startX, startY, endX, endY, index }) => {
  // Create paths with only 90-degree turns
  const createRightAnglePath = () => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Different routing patterns based on card position
    let pathData = `M ${startX} ${startY}`;

    if (index === 0) {
      // Top card: Up, Right, Up
      pathData += ` L ${startX} ${startY - 120}`;
      pathData += ` L ${startX + 60} ${startY - 120}`;
      pathData += ` L ${endX} ${endY}`;
    } else if (index === 1) {
      // Top-right card: Right, Up, Right
      pathData += ` L ${startX + 100} ${startY}`;
      pathData += ` L ${startX + 100} ${startY - 80}`;
      pathData += ` L ${endX} ${endY}`;
    } else if (index === 2) {
      // Bottom-right card: Right, Down, Right
      pathData += ` L ${startX + 100} ${startY}`;
      pathData += ` L ${startX + 100} ${startY + 80}`;
      pathData += ` L ${endX} ${endY}`;
    } else if (index === 3) {
      // Bottom card: Down, Left, Down
      pathData += ` L ${startX} ${startY + 120}`;
      pathData += ` L ${startX - 60} ${startY + 120}`;
      pathData += ` L ${endX} ${endY}`;
    } else if (index === 4) {
      // Bottom-left card: Left, Down, Left
      pathData += ` L ${startX - 100} ${startY}`;
      pathData += ` L ${startX - 100} ${startY + 80}`;
      pathData += ` L ${endX} ${endY}`;
    } else if (index === 5) {
      // Top-left card: Left, Up, Left
      pathData += ` L ${startX - 100} ${startY}`;
      pathData += ` L ${startX - 100} ${startY - 80}`;
      pathData += ` L ${endX} ${endY}`;
    }

    return pathData;
  };

  const pathData = createRightAnglePath();

  return (
    <g
      className="animate-on-scroll opacity-0 transition-opacity duration-1000"
      style={{ transitionDelay: `${500 + index * 150}ms` }}
    >
      {/* Main wire */}
      <path
        d={pathData}
        stroke="#4a4a4a"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

const HubFeatureCard: React.FC<{
  feature: Feature;
  position: string;
  index: number;
}> = ({ feature, position, index }) => {
  const IconComponent = getIconComponent(feature.iconName);

  return (
    <div
      className={`absolute ${position} animate-on-scroll opacity-0 transition-all duration-1000`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Feature Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl group transition-all duration-300 min-w-[280px] max-w-[320px] relative z-10">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
            {IconComponent && (
              <IconComponent
                className="text-purple-600 group-hover:text-white transition-colors duration-300"
                size={24}
              />
            )}
          </div>
          <h3 className="text-lg font-bold group-hover:text-purple-600 transition-colors duration-300 text-black">
            {feature.title}
          </h3>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const MobileFeatureCard: React.FC<{
  feature: Feature;
  index: number;
}> = ({ feature, index }) => {
  const IconComponent = getIconComponent(feature.iconName);

  return (
    <div
      className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl group"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
          {IconComponent && (
            <IconComponent
              className="text-purple-600 group-hover:text-white transition-colors duration-300"
              size={24}
            />
          )}
        </div>
        <h3 className="text-lg font-bold group-hover:text-purple-600 transition-colors duration-300 text-black">
          {feature.title}
        </h3>
      </div>
      <p className="text-gray-600 leading-relaxed text-sm">
        {feature.description}
      </p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  
  // Map features with translated content
  const translatedFeatures = PLATFORM_FEATURES.map((feature, index) => {
    const featureKey = ['smartCoordination', 'realtimeDashboard', 'outcomeBasedPricing', 'expertNetwork', 'enterpriseSolutions', 'seamlessIntegrations'][index];
    return {
      ...feature,
      title: t(`features.${featureKey}.title`),
      description: t(`features.${featureKey}.description`)
    };
  });
  const positions = [
    "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full",
    "top-1/4 right-0 transform translate-x-full -translate-y-1/2",
    "bottom-1/4 right-0 transform translate-x-full translate-y-1/2",
    "bottom-0 left-1/3 transform -translate-x-1/2 translate-y-full",
    "bottom-1/4 left-0 transform -translate-x-full translate-y-1/2",
    "top-1/4 left-0 transform -translate-x-full -translate-y-1/2",
  ];

  // Define wire endpoints relative to the center (400, 300 in our 800x600 viewBox)
  const wireEndpoints = [
    { x: 459, y: 120 }, // Top
    { x: 650, y: 218 }, // Top-right
    { x: 650, y: 380 }, // Bottom-right
    { x: 340, y: 490 }, // Bottom
    { x: 150, y: 380 }, // Bottom-left
    { x: 150, y: 218 }, // Top-left
  ];

  const centerPoint = { x: 400, y: 300 };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
            {t('features.eyebrow')}
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Desktop Hub Layout - Hidden on mobile */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center min-h-[900px] overflow-visible">
            {/* SVG for Wire Connections */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-5"
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Wire connections */}
              {wireEndpoints.map((endpoint, index) => (
                <WireConnection
                  key={index}
                  startX={centerPoint.x}
                  startY={centerPoint.y}
                  endX={endpoint.x}
                  endY={endpoint.y}
                  index={index}
                />
              ))}
            </svg>

            {/* Central Hub */}
            <div className="relative z-20 animate-on-scroll opacity-0 transform scale-95 transition-all duration-1000 delay-300">
              <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-black-200">
                <div className="w-full h-32 bg-white rounded-lg flex items-center justify-center">
                  <Laptop className="text-purple-600" size={80} />
                </div>
                <div className="text-center">
                  <h3 className="text-black font-bold text-xl mb-2">moccet</h3>
                  <p className="text-gray-600 text-sm">
                    {t('features.hubLabel')}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            {translatedFeatures.slice(0, 6).map((feature, index) => (
              <HubFeatureCard
                key={index}
                feature={feature}
                position={positions[index]}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout - Vertical grid */}
        <div className="lg:hidden">
          {/* Mobile Feature Cards Grid */}
          <div className="space-y-6">
            {translatedFeatures.slice(0, 6).map((feature, index) => (
              <MobileFeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* Additional features if there are more than 6 */}
        {translatedFeatures.length > 6 && (
          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translatedFeatures.slice(6).map((feature, index) => (
              <div
                key={index + 6}
                className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl group"
                style={{ transitionDelay: `${(index + 6) * 100}ms` }}
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {(() => {
                    const IconComponent = getIconComponent(feature.iconName);
                    return (
                      IconComponent && (
                        <IconComponent className="text-purple-600" size={40} />
                      )
                    );
                  })()}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300 text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
