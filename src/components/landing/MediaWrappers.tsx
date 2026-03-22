"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Shield, Bug, FileCheck, Clock } from "lucide-react";

interface ChatMessage {
  id: number;
  avatar: string;
  avatarColor: string;
  message: string;
  isUser: boolean;
}

interface FormData {
  title: string;
  description: string;
  timeline: string;
  budget: string;
}

interface TeamMember {
  name: string;
  role: string;
  status: string;
  avatar: string;
  avatarColor: string;
}

interface TechStack {
  name: string;
  color: string;
}

interface Stat {
  number: string;
  label: string;
  color: string;
}

interface CaseStudy {
  title: string;
  category: string;
  deliveryTime: string;
  costSavings: string;
  categoryColor: string;
}

interface QualityMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  status: "completed" | "in-progress" | "pending";
}

interface CodeQualityCheck {
  check: string;
  status: "passed" | "warning" | "error";
  details: string;
}

// Mobile-optimized Chat Interface
const MobileChatInterface: React.FC = () => {
  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      avatar: "A",
      avatarColor: "bg-brand-purple",
      message:
        "I've analyzed the healthcare API requirements. Recommending FHIR standards for HIPAA compliance.",
      isUser: false,
    },
    {
      id: 2,
      avatar: "J",
      avatarColor: "bg-black",
      message: "Can you ensure Epic and Cerner integration?",
      isUser: true,
    },
    {
      id: 3,
      avatar: "A",
      avatarColor: "bg-brand-purple",
      message:
        "Already drafted API endpoints for both systems. Working on OAuth 2.0 auth flow.",
      isUser: false,
    },
    {
      id: 4,
      avatar: "D",
      avatarColor: "bg-brand-purple",
      message:
        "Database schema completed with sharded collections for patient data security.",
      isUser: false,
    },
  ];

  return (
    <div className="w-full h-full opacity-100">
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg h-full w-full">
        <div className="bg-black px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="ml-3 text-sm text-white">
              healthcare-api-project
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3 bg-gray-50 flex-1 overflow-y-auto">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${
                message.isUser ? "justify-end" : ""
              }`}
            >
              {!message.isUser && (
                <div
                  className={`w-6 h-6 ${message.avatarColor} rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white`}
                >
                  {message.avatar}
                </div>
              )}

              <div
                className={`rounded-xl px-3 py-2 max-w-xs text-sm ${
                  message.isUser
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-200"
                }`}
              >
                <p className="leading-relaxed">{message.message}</p>
              </div>

              {message.isUser && (
                <div
                  className={`w-6 h-6 ${message.avatarColor} rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white`}
                >
                  {message.avatar}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const projectTypes = ["Mobile App", "Web App", "E-commerce", "AI Integration"];

const timelineOptions = [
  { label: "48 hours", value: 0 },
  { label: "1 week", value: 1 },
  { label: "2 weeks", value: 2 },
  { label: "1 month", value: 3 },
];

const budgetOptions = [
  { label: "$1k–$5k", value: 0 },
  { label: "$5k–$10k", value: 1 },
  { label: "$10k–$20k", value: 2 },
  { label: "$20k+", value: 3 },
];

const MobileBriefGenerator: React.FC = () => {
  const [title, setTitle] = useState("AI-Enhanced E-commerce Platform");
  const [description, setDescription] = useState(
    "Create an e-commerce platform with personalized product recommendations..."
  );
  const [types, setTypes] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState(1);

  const toggleType = (type: string) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = () => {
    console.log({
      title,
      description,
      types,
      timeline: timelineOptions[selectedTimeline].label,
      budget: budgetOptions[selectedBudget].label,
    });
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-lg h-full w-full flex flex-col">
        <h3 className="text-lg font-bold mb-4 text-center text-black">
          AI Brief Generator
        </h3>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #000000;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .slider::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #000000;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}</style>

        <div className="flex-1 flex flex-col space-y-3 min-h-0">
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter project title..."
            />
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <label className="block text-sm font-medium mb-1 text-gray-700 flex-shrink-0">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none flex-1 min-h-0 overflow-hidden"
              placeholder="Describe your project..."
            />
          </div>

          <div className="flex-shrink-0">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Project Type
            </p>
            <div className="flex flex-wrap gap-1">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-2 py-1 rounded-full border transition-colors whitespace-nowrap text-xs ${
                    types.includes(type)
                      ? "bg-purple-600 border-transparent text-white"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-shrink-0">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Timeline</p>
              <div className="px-1">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={selectedTimeline}
                    onChange={(e) =>
                      setSelectedTimeline(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #000000 0%, #000000 ${
                        (selectedTimeline / 3) * 100
                      }%, #e5e7eb ${
                        (selectedTimeline / 3) * 100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                  <div className="text-xs text-center mt-1">
                    <span className="text-black font-medium">
                      {timelineOptions[selectedTimeline].label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Budget</p>
              <div className="px-1">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={selectedBudget}
                    onChange={(e) =>
                      setSelectedBudget(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #000000 0%, #000000 ${
                        (selectedBudget / 3) * 100
                      }%, #e5e7eb ${
                        (selectedBudget / 3) * 100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                  <div className="text-xs text-center mt-1">
                    <span className="text-black font-medium">
                      {budgetOptions[selectedBudget].label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center flex-shrink-0">
            No email required. 100% free to use.
          </p>

          <button
            onClick={handleGenerate}
            className="w-full bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 text-sm flex-shrink-0"
          >
            GENERATE BRIEF
          </button>
        </div>
      </div>
    </div>
  );
};

// Mobile-optimized Project Dashboard
const MobileProjectDashboard: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "AI Agent Alex",
      role: "Backend Development",
      status: "active",
      avatar: "A",
      avatarColor: "bg-brand-purple",
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Design",
      status: "completed",
      avatar: "S",
      avatarColor: "bg-black",
    },
    {
      name: "AI Agent Dana",
      role: "Database Setup",
      status: "completed",
      avatar: "D",
      avatarColor: "bg-brand-purple",
    },
  ];

  const techStack: TechStack[] = [
    {
      name: "React",
      color: "bg-black/20 text-black border border-brand-purple",
    },
    { name: "Node.js", color: "bg-black/20 text-black border border-black" },
    {
      name: "AI Integration",
      color: "bg-black/20 text-black border border-brand-purple",
    },
  ];

  const getStatusIcon = (status: string) => {
    if (status === "completed") {
      return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
    }
    return (
      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-lg h-full overflow-y-auto w-full">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-black">
            Project Dashboard
          </h3>

          <div className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2 text-black text-sm">
                E-commerce Platform Development
              </h4>

              <div className="flex flex-wrap gap-1 mb-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={`${tech.color} px-2 py-1 rounded text-xs font-medium`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-black">Overall Progress</span>
                  <span className="text-black">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all duration-1000"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-600 mb-3">
                <span>Started: Dec 1</span>
                <span>Due: Dec 15</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium text-black mb-2">
                Team Members
              </h5>
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 ${member.avatarColor} rounded-full flex items-center justify-center text-xs font-bold text-white`}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-black">
                        {member.name}
                      </div>
                      <div className="text-xs text-gray-600">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(member.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile-optimized Stats Component
const MobileStats: React.FC = () => {
  const stats: Stat[] = [
    {
      number: "10×",
      label: "Faster project delivery",
      color: "text-black",
    },
    {
      number: "70%",
      label: "Average cost savings",
      color: "text-black",
    },
    {
      number: "100%",
      label: "Client Satisfaction rate",
      color: "text-black",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 gap-3 h-full w-full">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center"
          >
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.number}
            </div>
            <div className="text-gray-600 text-sm leading-relaxed">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile-optimized Quality Dashboard
const MobileQualityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"metrics" | "checks" | "security">(
    "metrics"
  );

  const qualityMetrics: QualityMetric[] = [
    {
      label: "Code Coverage",
      value: "98.5%",
      icon: <Shield className="w-4 h-4" />,
      status: "completed",
    },
    {
      label: "Security Score",
      value: "A+",
      icon: <Shield className="w-4 h-4" />,
      status: "completed",
    },
    {
      label: "Performance",
      value: "95/100",
      icon: <Clock className="w-4 h-4" />,
      status: "completed",
    },
    {
      label: "Documentation",
      value: "100%",
      icon: <FileCheck className="w-4 h-4" />,
      status: "completed",
    },
  ];

  const codeChecks: CodeQualityCheck[] = [
    {
      check: "AI Security Scan",
      status: "passed",
      details: "0 vulnerabilities found",
    },
    {
      check: "Code Standards",
      status: "passed",
      details: "ESLint + Prettier applied",
    },
    {
      check: "Performance Tests",
      status: "passed",
      details: "< 100ms response time",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
      case "completed":
        return "text-black border-black-50";
      case "warning":
      case "in-progress":
        return "text-black border-black-50";
      case "error":
      case "pending":
        return "text-black border-black-50";
      default:
        return "text-black border-black-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
      case "completed":
        return <CheckCircle className="w-3 h-3 text-green-600" />;
      case "warning":
      case "in-progress":
        return <Clock className="w-3 h-3 text-yellow-600" />;
      case "error":
      case "pending":
        return <Bug className="w-3 h-3 text-red-600" />;
      default:
        return <CheckCircle className="w-3 h-3 text-gray-600" />;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-lg h-full w-full flex flex-col">
        <h3 className="text-lg font-bold mb-4 text-center text-black">
          Quality Assurance Dashboard
        </h3>

        {/* Tab Navigation */}
        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("metrics")}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-200 ${
              activeTab === "metrics"
                ? "bg-white text-black shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab("checks")}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-200 ${
              activeTab === "checks"
                ? "bg-white text-black shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            AI Checks
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-200 ${
              activeTab === "security"
                ? "bg-white text-black shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "metrics" && (
            <div className="grid grid-cols-2 gap-3">
              {qualityMetrics.map((metric, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getStatusColor(
                    metric.status
                  )} text-center`}
                >
                  <div className="flex items-center justify-center mb-2">
                    {metric.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-xs">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "checks" && (
            <div className="space-y-3">
              {codeChecks.map((check, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    <div>
                      <div className="text-sm font-medium text-black">
                        {check.check}
                      </div>
                      <div className="text-xs text-gray-600">
                        {check.details}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">
                    OWASP Compliance
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Data Encryption</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">
                    Input Validation
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-800 mb-1">
                  AI Security Analysis
                </div>
                <div className="text-xs text-blue-700">
                  Our AI continuously monitors for vulnerabilities and suggests
                  fixes in real-time
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Last scan: 2 min ago</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile-optimized Case Studies
const MobileCaseStudies: React.FC = () => {
  const caseStudies: CaseStudy[] = [
    {
      title: "Coffee Spot Finder App",
      category: "Mobile App",
      deliveryTime: "48 hrs",
      costSavings: "70%",
      categoryColor: "text-black",
    },
    {
      title: "FitConnect Platform",
      category: "Web Application",
      deliveryTime: "5 days",
      costSavings: "65%",
      categoryColor: "text-black",
    },
    {
      title: "Healthcare API Integration",
      category: "API Development",
      deliveryTime: "1 week",
      costSavings: "60%",
      categoryColor: "text-black",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="space-y-3 h-full flex flex-col w-full">
        {caseStudies.map((study, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1"
          >
            <span
              className={`text-xs font-semibold ${study.categoryColor} mb-2 block`}
            >
              {study.category}
            </span>
            <h3 className="text-lg font-bold mb-3 text-black">{study.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-brand-purple">
                  {study.deliveryTime}
                </div>
                <div className="text-xs text-gray-600">Delivery Time</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">
                  {study.costSavings}
                </div>
                <div className="text-xs text-gray-600">Cost Savings</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Check if mobile function
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Enhanced wrapper component to completely disable scroll animations
const NoScrollAnimationWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="seamless-media-wrapper opacity-100 transform-none">
      <style jsx>{`
        .seamless-media-wrapper,
        .seamless-media-wrapper * {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
        }

        .seamless-media-wrapper .animate-on-scroll {
          opacity: 1 !important;
          transform: translateY(0) !important;
          animation: none !important;
          transition: none !important;
        }

        .seamless-media-wrapper .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .seamless-media-wrapper [class*="animate-"] {
          animation: none !important;
        }

        .seamless-media-wrapper [style*="animation"] {
          animation: none !important;
        }

        .seamless-media-wrapper [style*="transition"] {
          transition: none !important;
        }
      `}</style>
      {children}
    </div>
  );
};

// Constant media container dimensions for mobile
const MOBILE_CONTAINER_WIDTH = "320px";

// Desktop container width - increased for better visibility
const DESKTOP_CONTAINER_WIDTH = "580px";

// Export components with responsive container behavior
export const SecretSauceMedia: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <NoScrollAnimationWrapper>
      <div
        className="opacity-100 flex items-center justify-center"
        style={
          isMobile
            ? { width: MOBILE_CONTAINER_WIDTH, height: "auto" }
            : { width: DESKTOP_CONTAINER_WIDTH, height: "auto" }
        }
      >
        <div className="w-full h-auto">
          <MobileChatInterface />
        </div>
      </div>
    </NoScrollAnimationWrapper>
  );
};

export const BriefGeneratorMedia: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <NoScrollAnimationWrapper>
      <div
        className="opacity-100 flex items-center justify-center"
        style={
          isMobile
            ? { width: MOBILE_CONTAINER_WIDTH, height: "auto" }
            : { width: DESKTOP_CONTAINER_WIDTH, height: "auto" }
        }
      >
        <div className="w-full h-auto">
          <MobileBriefGenerator />
        </div>
      </div>
    </NoScrollAnimationWrapper>
  );
};

export const PricingMedia: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <NoScrollAnimationWrapper>
      <div
        className="opacity-100 flex items-center justify-center"
        style={
          isMobile
            ? { width: MOBILE_CONTAINER_WIDTH, height: "auto" }
            : { width: DESKTOP_CONTAINER_WIDTH, height: "auto" }
        }
      >
        <div className="w-full h-auto">
          <MobileProjectDashboard />
        </div>
      </div>
    </NoScrollAnimationWrapper>
  );
};

export const StatsMedia: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <NoScrollAnimationWrapper>
      <div
        className="opacity-100 flex items-center justify-center"
        style={
          isMobile
            ? { width: MOBILE_CONTAINER_WIDTH, height: "auto" }
            : { width: DESKTOP_CONTAINER_WIDTH, height: "auto" }
        }
      >
        <div className="w-full h-auto">
          <MobileStats />
        </div>
      </div>
    </NoScrollAnimationWrapper>
  );
};

export const QualityObsessionMedia: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <NoScrollAnimationWrapper>
      <div
        className="opacity-100 flex items-center justify-center"
        style={
          isMobile
            ? { width: MOBILE_CONTAINER_WIDTH, height: "auto" }
            : { width: DESKTOP_CONTAINER_WIDTH, height: "auto" }
        }
      >
        <div className="w-full h-auto">
          <MobileQualityDashboard />
        </div>
      </div>
    </NoScrollAnimationWrapper>
  );
};

export const CaseStudiesMedia: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <NoScrollAnimationWrapper>
      <div
        className="opacity-100 flex items-center justify-center"
        style={
          isMobile
            ? { width: MOBILE_CONTAINER_WIDTH, height: "auto" }
            : { width: DESKTOP_CONTAINER_WIDTH, height: "auto" }
        }
      >
        <div className="w-full h-auto">
          <MobileCaseStudies />
        </div>
      </div>
    </NoScrollAnimationWrapper>
  );
};
