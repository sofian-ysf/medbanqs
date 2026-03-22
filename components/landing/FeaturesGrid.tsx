import React from "react";
import { BookOpen, BarChart3, FileText } from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Expert-Crafted Questions",
    description: "5,000+ UKMLA-style questions written by medical professionals and exam experts.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Track your performance across topics and see your improvement over time.",
  },
  {
    icon: FileText,
    title: "Detailed Explanations",
    description: "Learn from every question with comprehensive explanations and clinical reasoning.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 px-4 bg-warm-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
            Everything you need to pass
          </h2>
          <p className="text-lg text-dark-secondary max-w-2xl mx-auto">
            Comprehensive preparation tools designed specifically for UKMLA success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl card-hover"
            >
              <div className="w-12 h-12 bg-warm-bg rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-dark-text" />
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">
                {feature.title}
              </h3>
              <p className="text-dark-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
