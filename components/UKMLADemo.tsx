"use client";

import React from "react";

const UKMLADemo: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-3 text-center">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          UKMLA Demo
        </h3>
        <p className="text-xs text-gray-600">
          Smart exam prep & instant feedback
        </p>
      </div>

      {/* Static Phone Screen with 3 Messages */}
      <div
        className="bg-gray-900 rounded-2xl p-3 mx-auto"
        style={{ width: "320px", height: "500px" }}
      >
        {/* Phone Header */}
        <div className="bg-black rounded-t-xl h-8 flex items-center justify-center relative">
          <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
          <div className="absolute right-2 flex gap-1">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Phone Screen */}
        <div className="bg-white h-full rounded-b-xl overflow-hidden">
          <div className="h-full flex flex-col">
            {/* App Header */}
            <div style={{ backgroundColor: '#BAC4C6' }} className="text-gray-900 p-3 text-center">
              <h4 className="font-semibold text-sm">
                UKMLA Study Assistant
              </h4>
            </div>

            {/* Chat Messages - Static 3 messages */}
            <div className="flex-1 p-4 space-y-4 bg-gray-50 overflow-y-auto">
              {/* Client Message */}
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs text-right">
                  <p className="text-sm">
                    What's the first-line treatment for Type 2 diabetes with HbA1c of 58?
                  </p>
                </div>
              </div>

              {/* Expert Response */}
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-lg max-w-xs shadow-sm">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-xs font-medium text-gray-600">
                      Medical Tutor
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 text-left">
                    Lifestyle modifications first per NICE NG28. Studies show 65% achieve target with diet alone.
                  </p>
                </div>
              </div>

              {/* Follow-up Question */}
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs text-right">
                  <p className="text-sm">
                    What about if lifestyle changes fail after 3 months?
                  </p>
                </div>
              </div>

              {/* Expert Response */}
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-lg max-w-xs shadow-sm">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-xs font-medium text-gray-600">
                      Medical Tutor
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 text-left">
                    Start metformin 500mg BD, titrate up. Check renal function first. Key UKMLA topic!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UKMLADemo;
