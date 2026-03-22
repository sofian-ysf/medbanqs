import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "2 Months",
    price: "£25",
    description: "Perfect for focused revision",
    features: ["5,000+ questions", "Detailed explanations", "Progress tracking", "Mobile access"],
    popular: false,
  },
  {
    name: "6 Months",
    price: "£40",
    description: "Most popular choice",
    features: ["Everything in 2 Months", "Extended access", "Priority support", "Mock exams"],
    popular: true,
  },
  {
    name: "Lifetime",
    price: "£70",
    description: "One-time payment, forever access",
    features: ["Everything in 6 Months", "Lifetime updates", "All future content", "VIP support"],
    popular: false,
  },
];

const PricingCards = () => {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-dark-secondary">
            Choose the plan that works best for your preparation timeline.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-6 ${
                plan.popular
                  ? "border-2 border-success ring-4 ring-success/10"
                  : "border border-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-success text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-dark-text mb-1">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-dark-text mb-2">
                  {plan.price}
                </div>
                <p className="text-sm text-dark-muted">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-dark-secondary">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/auth"
                className={`block w-full py-3 rounded-full text-center font-medium transition-all ${
                  plan.popular
                    ? "bg-success text-white hover:bg-success-dark"
                    : "pill-btn pill-btn-secondary"
                }`}
              >
                Get Access
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-dark-muted">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            Secure payment via Stripe
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            7-day money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            Instant access
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
