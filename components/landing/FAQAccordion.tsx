"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is UKMLA?",
    answer: "The UK Medical Licensing Assessment (UKMLA) is a two-part exam that all medical students must pass to practice medicine in the UK. It consists of the Applied Knowledge Test (AKT) and the Clinical and Professional Skills Assessment (CPSA).",
  },
  {
    question: "How many questions are included?",
    answer: "MasterMLA includes over 5,000 UKMLA-style practice questions covering all topics in the MLA content map. New questions are added regularly based on the latest guidelines.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 7-day money-back guarantee. If you're not satisfied with MasterMLA for any reason, contact us within 7 days for a full refund.",
  },
  {
    question: "Can I access MasterMLA on mobile?",
    answer: "Absolutely! MasterMLA is fully responsive and works seamlessly on desktop, tablet, and mobile devices. Study anywhere, anytime.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards through our secure payment processor, Stripe. We also support Apple Pay and Google Pay.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-warm-bg">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-dark-secondary">
            Everything you need to know about MasterMLA.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-dark-text pr-4">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-dark-muted flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-dark-muted flex-shrink-0" />
                )}
              </button>
              <div
                className={`faq-content ${openIndex === index ? "open" : ""}`}
              >
                <div className="px-5 pb-5 text-dark-secondary">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
