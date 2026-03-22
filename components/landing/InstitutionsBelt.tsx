import React from "react";

const INSTITUTIONS = [
  "University College London",
  "University of Manchester",
  "University of Nottingham",
  "King's College London",
  "University of Bath",
  "Cardiff University",
  "University of Brighton",
  "Queen's University Belfast",
  "Keele University",
];

const InstitutionsBelt = () => {
  return (
    <section className="bg-warm-bg py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm text-dark-muted mb-8">
          Students from top UK medical schools trust MasterMLA
        </p>

        {/* Scrolling Belt - uses Tailwind animation */}
        <div className="relative">
          <div className="flex gap-12 animate-marquee">
            {[...INSTITUTIONS, ...INSTITUTIONS].map((name, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-6 py-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <span className="text-sm font-medium text-dark-secondary whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionsBelt;
