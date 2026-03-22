"use client";

import React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const TrustedCompaniesSection: React.FC = () => {
  const { t } = useTranslation();
  const companies = ["TheWellness", "Nuqoot", "TechFlow", "HealthVault"];

  return (
    <section className="trusted-companies-section">
      <div className="trusted-companies-container">
        <div className="trusted-companies-header">
          <p className="trusted-companies-text">{t("trustedCompanies.title")}</p>
        </div>
        <div className="trusted-companies-grid">
          {companies.map((company, index) => (
            <div
              key={index}
              className="trusted-company-item"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompaniesSection;