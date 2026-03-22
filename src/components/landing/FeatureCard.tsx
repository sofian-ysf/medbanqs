"use client";

import React from "react";
import { getIconComponent } from "@/utils/helpers";
import { LucideIcon } from "lucide-react";

interface Feature {
  iconName: string;
  iconColor: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const IconComponent = getIconComponent(feature.iconName);

  return (
    <div
      className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl group"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {IconComponent && (
          <IconComponent className="text-purple-600" size={40} />
        )}
      </div>

      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300 text-black">
        {feature.title}
      </h3>

      <p className="text-gray-600 leading-relaxed text-sm">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;