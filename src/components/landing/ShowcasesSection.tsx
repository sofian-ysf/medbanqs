"use client";

import React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const ShowcasesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="showcases-section">
      <div className="showcases-container">
        <div className="showcases-header">
          <h2 className="showcases-title">
            {t("showcases.title")}
          </h2>
          <p className="showcases-subtitle">
            {t("showcases.subtitle")}
          </p>
        </div>
        
        <div className="showcases-grid">
          <div className="showcase-card">
            <div className="showcase-icon">🏥</div>
            <h3 className="showcase-card-title">{t("showcases.healthcare.title")}</h3>
            <p className="showcase-card-description">{t("showcases.healthcare.mobileDescription")}</p>
          </div>
          
          <div className="showcase-card">
            <div className="showcase-icon">📊</div>
            <h3 className="showcase-card-title">{t("showcases.businessAnalyst.title")}</h3>
            <p className="showcase-card-description">{t("showcases.businessAnalyst.mobileDescription")}</p>
          </div>
          
          <div className="showcase-card">
            <div className="showcase-icon">🧠</div>
            <h3 className="showcase-card-title">{t("showcases.alwaysLearning.title")}</h3>
            <p className="showcase-card-description">{t("showcases.alwaysLearning.mobileDescription")}</p>
          </div>
          
          <div className="showcase-card">
            <div className="showcase-icon">🤖</div>
            <h3 className="showcase-card-title">{t("showcases.autonomous.title")}</h3>
            <p className="showcase-card-description">{t("showcases.autonomous.mobileDescription")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcasesSection;