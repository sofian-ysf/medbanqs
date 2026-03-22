"use client";

import React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const ProcessSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("process.steps.research.title"),
      description: t("process.steps.research.description"),
    },
    {
      title: t("process.steps.pricing.title"),
      description: t("process.steps.pricing.description"),
    },
    {
      title: t("process.steps.match.title"),
      description: t("process.steps.match.description"),
    },
    {
      title: t("process.steps.management.title"),
      description: t("process.steps.management.description"),
    },
    {
      title: t("process.steps.optimization.title"),
      description: t("process.steps.optimization.description"),
    },
    {
      title: t("process.steps.partnership.title"),
      description: t("process.steps.partnership.description"),
    },
  ];

  return (
    <section id="process" className="process-section">
      <div className="process-container">
        <div className="process-header">
          <div className="process-eyebrow">
            {t("process.eyebrow")}
          </div>
          <h2 className="process-title">
            {t("process.title")}
          </h2>
          <p className="process-subtitle">
            {t("process.subtitle")}
          </p>
        </div>
        
        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="process-step-number">
                {index + 1}
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;