import React from "react";
import { CheckCircle } from "lucide-react";

interface Audience {
  title: string;
  description: string;
  features: string[];
}

interface AudienceCardProps {
  audience: Audience;
  index: number;
}

const AudienceCard: React.FC<AudienceCardProps> = ({ audience, index }) => {
  return (
    <div
      className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl group"
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-600 transition-colors duration-300 text-black">
        {audience.title}
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed">
        {audience.description}
      </p>

      <ul className="space-y-3">
        {audience.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 text-sm leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudienceCard;