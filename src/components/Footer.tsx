"use client";

import React from "react";
import FooterSection from "./FooterSection";
import { useTranslation } from "@/contexts/TranslationContext";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const handleEmailClick = () => {
    window.location.href = `mailto:hello@moccet.com`;
  };

  const footerSections = [
    {
      title: t('footer.sections.product.title'),
      links: [
        { key: 'howItWorks', label: t('footer.sections.product.links.howItWorks') },
        { key: 'features', label: t('footer.sections.product.links.features') },
        { key: 'aiTools', label: t('footer.sections.product.links.aiTools') },
        { key: 'pricing', label: t('footer.sections.product.links.pricing') },
      ],
    },
    {
      title: t('footer.sections.resources.title'),
      links: [
        { key: 'documentation', label: t('footer.sections.resources.links.documentation') },
        { key: 'apiReference', label: t('footer.sections.resources.links.apiReference') },
        { key: 'caseStudies', label: t('footer.sections.resources.links.caseStudies') },
        { key: 'blog', label: t('footer.sections.resources.links.blog') },
        { key: 'supportCenter', label: t('footer.sections.resources.links.supportCenter') },
      ],
    },
    {
      title: t('footer.sections.company.title'),
      links: [
        { key: 'aboutUs', label: t('footer.sections.company.links.aboutUs') },
        { key: 'careers', label: t('footer.sections.company.links.careers') },
        { key: 'partners', label: t('footer.sections.company.links.partners') },
        { key: 'contact', label: t('footer.sections.company.links.contact') },
        { key: 'pressKit', label: t('footer.sections.company.links.pressKit') },
      ],
    },
  ];

  return (
    <footer className="py-8 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section - takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <img
              src="/moccet-white.png"
              alt="Moccet"
              className="h-6 w-auto pr-2 mb-6"
            />
            <p className="text-gray-400 leading-relaxed max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-white border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center flex-wrap gap-6">
            <p className="text-gray-500 text-sm">
              {t('footer.legal.copyright')}
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-gray-500 hover:text-white text-sm transition-colors duration-150"
              >
                {t('footer.legal.privacy')}
              </a>
              <a
                href="/terms"
                className="text-gray-500 hover:text-white text-sm transition-colors duration-150"
              >
                {t('footer.legal.terms')}
              </a>
              <a
                href="/security"
                className="text-gray-500 hover:text-white text-sm transition-colors duration-150"
              >
                {t('footer.legal.security')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;