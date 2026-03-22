"use client";

import React from "react";
import Link from "next/link";

interface FooterSectionData {
  title: string;
  links: { key: string; label: string }[];
}

interface FooterSectionProps {
  section: FooterSectionData;
}

const FooterSection: React.FC<FooterSectionProps> = ({ section }) => {
  const getRouteFromKey = (key: string): string => {
    const routeMap: Record<string, string> = {
      // Product
      'howItWorks': '/learn-more-approach',
      'features': '/features',
      'aiTools': '/ai-agents', 
      'pricing': '/pricing',
      // Resources
      'documentation': '/documentation',
      'apiReference': '/API-reference',
      'caseStudies': '/case-studies',
      'blog': '/case-studies',
      'supportCenter': '/support',
      // Company  
      'aboutUs': '/about',
      'careers': '/careers',
      'partners': '/partners',
      'contact': '/contact-us',
      'pressKit': '/press'
    };
    return routeMap[key] || '/';
  };

  return (
    <div>
      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 opacity-60">
        {section.title}
      </h4>
      <ul className="space-y-3">
        {section.links.map((link, linkIndex) => (
          <li key={linkIndex}>
            <Link
              href={getRouteFromKey(link.key)}
              className="text-gray-400 hover:text-white text-sm transition-all duration-150 hover:translate-x-1 inline-block"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;